import fs from 'node:fs';
import path from 'node:path';
import { auditMarkup, dedupeAnchors } from '../src/config/auditMarkup.ts';

const LOCALES = new Set(['es', 'fi', 'fr', 'nl', 'uk']);
const root = process.cwd();
const dist = path.join(root, 'dist');

function routeFromHtmlFile(absPath) {
  const rel = path.relative(dist, absPath).replace(/\\/g, '/');
  if (rel === '404.html' || rel === 'offline.html') return undefined;
  if (rel.endsWith('.html') && !rel.endsWith('/index.html') && rel !== 'index.html') return undefined;

  let pathname;
  if (rel === 'index.html') pathname = '/';
  else pathname = `/${rel.replace(/\/index\.html$/, '')}/`;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && LOCALES.has(segments[0])) {
    const locale = segments[0];
    const rest = segments.slice(1);
    const barePath = rest.length ? `/${rest.join('/')}/` : '/';
    return { locale, barePath };
  }
  return { locale: 'en', barePath: pathname };
}

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

if (!fs.existsSync(dist)) {
  console.error('audit-html: dist/ missing — run astro build first.');
  process.exit(1);
}

let updated = 0;
for (const file of walkHtml(dist)) {
  const route = routeFromHtmlFile(file);
  if (!route) continue;
  const html = fs.readFileSync(file, 'utf8');
  let next = auditMarkup(html, route.barePath, route.locale);
  next = dedupeAnchors(next);
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    updated += 1;
  }
}

console.log(`audit-html: processed HTML (${updated} file(s) updated).`);
