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
