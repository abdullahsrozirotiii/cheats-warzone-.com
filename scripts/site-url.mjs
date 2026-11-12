/** Shared site origin for Node build/start scripts (Astro uses src/config/site.ts). */
export const DEFAULT_SITE_DOMAIN = 'cheats-warzone.com';
/** Primary production hostname for the Warzone site (same as DEFAULT_SITE_DOMAIN). */
export const WARZONE_SITE_HOST = DEFAULT_SITE_DOMAIN;
export const DEFAULT_SITE_URL = `https://${DEFAULT_SITE_DOMAIN}`;

/**
 * Production URL for sitemaps/canonicals.
 * Override with PUBLIC_SITE_URL or SITE for preview builds (e.g. https://xxx.pages.dev).
 * Leave unset on Cloudflare Pages production so cheats-warzone.com is used after the custom domain is attached.
 */
export function getSiteUrl() {
  const raw = (process.env.PUBLIC_SITE_URL || process.env.SITE || DEFAULT_SITE_URL).trim();
  return raw.replace(/\/+$/, '') || DEFAULT_SITE_URL;
}

export function getSiteHost() {
  try {
    return new URL(getSiteUrl()).host;
  } catch {
    return DEFAULT_SITE_DOMAIN;
  }
}

/** True for Cloudflare Pages preview deployments (not the production branch). */
export function isPreviewDeploy() {
  const branch = process.env.CF_PAGES_BRANCH?.trim();
  if (!branch) return false;
  const production = (process.env.CF_PAGES_PRODUCTION_BRANCH || 'main').trim();
  return branch !== production;
}

/** Applied to non-production host responses at the edge (Pages middleware). */
export const PREVIEW_X_ROBOTS_TAG = 'noindex, nofollow';

export function normalizeHostname(hostname) {
  return String(hostname ?? '')
    .trim()
    .toLowerCase()
    .replace(/\.$/, '');
}

/** Apex production host — fully indexable (no preview X-Robots-Tag). */
export function isProductionIndexableHost(hostname) {
  return normalizeHostname(hostname) === DEFAULT_SITE_DOMAIN;
}

/** Local dev hosts — no preview header (same as before middleware guard). */
export function isLocalDevHost(hostname) {
  const h = normalizeHostname(hostname);
  return h === 'localhost' || h === '127.0.0.1' || h === '[::1]';
}

/**
 * Whether to set X-Robots-Tag on pass-through asset responses.
 * www is excluded here because it 301s to apex before pass-through.
 */
export function shouldSendPreviewNoindex(hostname) {
  const h = normalizeHostname(hostname);
  if (isProductionIndexableHost(h)) return false;
  if (isLocalDevHost(h)) return false;
  if (h === `www.${DEFAULT_SITE_DOMAIN}`) return false;
  return true;
}
