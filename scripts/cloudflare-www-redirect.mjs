/**
 * Ensures www → cheats-warzone.com 301 on Cloudflare (Pages cannot do host redirects in `_redirects`).
 *
 * Official recipe: https://developers.cloudflare.com/pages/how-to/www-redirect/
 *
 * Env (optional automation):
 *   CLOUDFLARE_API_TOKEN    Account Bulk Redirects + Zone DNS Edit
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_ZONE_ID      optional (auto-resolved from WARZONE_SITE_HOST)
 */
import { WARZONE_SITE_HOST } from './site-url.mjs';

const SITE_HOST = process.env.SITE_DOMAIN?.trim() || WARZONE_SITE_HOST;
const WWW = `www.${SITE_HOST}`;
const TARGET = `https://${SITE_HOST}`;
const LIST_NAME = `${SITE_HOST.replace(/\./g, '-')}-www-to-warzone-site`;
const DUMMY_IP = '192.0.2.1';

const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();

function printManualSteps() {
  console.log(`
www → ${SITE_HOST} is not configurable from Pages \`_redirects\` (absolute hosts are rejected).

Do this once in the Cloudflare dashboard:

1) Bulk Redirects → Create list "${LIST_NAME}"
   Source:  ${WWW}
   Target:  ${TARGET}
   Status:  301
   Enable:  Preserve query string, Subpath matching, Preserve path suffix

2) Create a Bulk Redirect rule that uses that list.

3) DNS → ${WWW}
   Type A → ${DUMMY_IP} (Proxied/orange cloud)
   (If www is already a Pages custom domain CNAME, keep it and rely on functions/_middleware.js instead.)

Verify:
  curl -sI https://${WWW}/ | findstr /I Location
  → Location: ${TARGET}/
`);
}

if (!token || !accountId) {
  printManualSteps();
  console.log('Or set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID and re-run: npm run cf:www-redirect');
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

async function cf(method, path, body) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.success) {
    const msg = (json.errors || []).map((e) => e.message).join('; ') || res.statusText;
    throw new Error(`${method} ${path}: ${msg}`);
  }
  return json.result;
}

async function waitOp(operationId) {
  for (let i = 0; i < 30; i++) {
    const op = await cf('GET', `/accounts/${accountId}/rules/lists/bulk_operations/${operationId}`);
    if (op.status === 'completed') return;
    if (op.status === 'failed') throw new Error(`List operation failed: ${op.error || 'unknown'}`);
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('Timed out waiting for list operation');
}

let zoneId = process.env.CLOUDFLARE_ZONE_ID?.trim();
if (!zoneId) {
  const zones = await cf('GET', `/zones?name=${encodeURIComponent(SITE_HOST)}`);
  zoneId = zones?.[0]?.id;
  if (!zoneId) throw new Error(`No zone for ${SITE_HOST}`);
}

const lists = await cf('GET', `/accounts/${accountId}/rules/lists?kind=redirect`);
let list = (Array.isArray(lists) ? lists : []).find((item) => item.name === LIST_NAME);
if (!list) {
  list = await cf('POST', `/accounts/${accountId}/rules/lists`, {
    name: LIST_NAME,
    description: `www → ${SITE_HOST} (Warzone site)`,
    kind: 'redirect',
  });
}

const items = await cf('GET', `/accounts/${accountId}/rules/lists/${list.id}/items?per_page=100`);
const itemRows = Array.isArray(items) ? items : items?.items || [];
const hasWww = itemRows.some((item) => item.redirect?.source_url === WWW || item.redirect?.source_url === `${WWW}/`);

if (!hasWww) {
  const op = await cf('POST', `/accounts/${accountId}/rules/lists/${list.id}/items`, [
    {
      redirect: {
        source_url: WWW,
        target_url: TARGET,
        status_code: 301,
        preserve_query_string: true,
        include_subdomains: false,
        subpath_matching: true,
        preserve_path_suffix: true,
      },
    },
  ]);
  if (op?.operation_id) await waitOp(op.operation_id);
}

// Ensure DNS www is proxied dummy IP (Bulk Redirect entry point) unless it is Pages.
const dns = await cf('GET', `/zones/${zoneId}/dns_records?name=${encodeURIComponent(WWW)}`);
const records = Array.isArray(dns) ? dns : [];
const wwwRecord = records[0];
if (!wwwRecord) {
  await cf('POST', `/zones/${zoneId}/dns_records`, {
    type: 'A',
    name: 'www',
    content: DUMMY_IP,
    proxied: true,
  });
  console.log(`DNS: created www A ${DUMMY_IP} (proxied)`);
} else if (wwwRecord.type === 'CNAME' && String(wwwRecord.content).includes('pages.dev')) {
  console.log('DNS: www is Pages CNAME — middleware handles redirect after deploy.');
} else if (!(wwwRecord.type === 'A' && wwwRecord.content === DUMMY_IP && wwwRecord.proxied)) {
  await cf('PATCH', `/zones/${zoneId}/dns_records/${wwwRecord.id}`, {
    type: 'A',
    name: 'www',
    content: DUMMY_IP,
    proxied: true,
  });
  console.log(`DNS: updated www → A ${DUMMY_IP} (proxied)`);
}

console.log(`Bulk redirect list "${LIST_NAME}" includes ${WWW} → ${TARGET}.`);
console.log(
  'If curl still shows 522, add a Bulk Redirect *rule* in the dashboard that uses this list (API ruleset wiring varies by account).',
);
printManualSteps();
