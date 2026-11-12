/** Production domain (custom domain on Cloudflare Pages). */
export const SITE_DOMAIN = 'cheats-warzone.com';

/**
 * Absolute site origin used for canonical, Open Graph, JSON-LD, RSS, sitemap.
 * - Default: https://cheats-warzone.com
 * - Override at build time with PUBLIC_SITE_URL for preview-only SEO tags
 * Internal links stay relative so temp Pages URLs and the custom domain both work without redirects.
 */
function resolveSiteUrl(): string {
  const fromEnv =
    typeof import.meta !== 'undefined' && typeof import.meta.env?.PUBLIC_SITE_URL === 'string'
      ? import.meta.env.PUBLIC_SITE_URL.trim()
      : '';
  if (fromEnv) return fromEnv.replace(/\/+$/, '');
  return `https://${SITE_DOMAIN}`;
}

export const SITE_URL = resolveSiteUrl();
export const PRODUCT_BASE = '/products/warzone-cheats/';
export const TITLE_PREFIX = 'Warzone Cheats & Hacks';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;

export const DISCORD_INVITE_URL = 'https://discord.com/invite/Vu85F8auQS';
