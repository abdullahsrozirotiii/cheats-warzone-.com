/**
 * Canonical URL slugs: exactly two SEO keywords per path segment (kebab-case).
 * Old paths 301 via functions/_middleware.js (scripts/redirects.mjs + slug-redirect-pairs.mjs) and astro.config product shortcuts.
 */

/** Blog post slug migrations (old → new). */
export const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  'warzone-cheats-features': 'cheats-features',
  'warzone-ricochet-safety': 'ricochet-safety',
  'warzone-esp-aimbot': 'esp-aimbot',
  'warzone-cheat-settings': 'cheat-settings',
  'warzone-esp-guide': 'warzone-esp',
  'warzone-wallhack-vs-esp': 'wallhack-esp',
  'warzone-aimbot-fov-smooth': 'aimbot-fov',
  'warzone-silent-aim-explained': 'silent-aim',
  'warzone-triggerbot-vs-aimbot': 'triggerbot-aimbot',
  'warzone-esp-colors-distance': 'esp-colors',
  'warzone-cheat-undetected-status': 'undetected-cheats',
  'warzone-radar-hack-guide': 'warzone-radar',
  'warzone-recoil-script-aimbot': 'recoil-aimbot',
  'warzone-anti-cheat-faq': 'anticheat-faq',
  'how-to-get-warzone-cheats': 'get-cheats',
  'warzone-console-cheating': 'console-cheats',
  'warzone-2-cheats-and-codes': 'warzone-codes',
};

/** Forum thread slug migrations (old → new). */
export const FORUM_SLUG_REDIRECTS: Record<string, string> = {
  'what-does-warzone-map-awareness-include': 'map-awareness',
  'how-to-set-up-map-overlay': 'map-overlay',
  'what-zoom-settings-are-comfortable': 'zoom-settings',
  'how-to-tune-script-delay-settings': 'script-settings',
  'warzone-aimbot-and-recoil': 'aimbot-recoil',
  'what-is-in-the-elite-tier': 'elite-tier',
  'how-do-lite-and-pro-differ': 'lite-pro',
  'what-to-know-about-skin-changer': 'skin-changer',
  'what-to-do-if-vac-cannot-verify': 'ricochet-verify',
  'how-does-an-external-loader-work': 'external-loader',
  'how-to-check-stream-proof-capture': 'stream-proof',
  'what-to-do-after-hwid-change': 'hwid-change',
  'what-to-check-before-installing-tools': 'install-tools',
  'does-warzone-have-anti-cheat-forum': 'warzone-anticheat',
  'how-to-get-warzone-cheats-forum': 'get-cheats',
  'can-console-players-cheat-warzone': 'console-cheats',
  'warzone-2-cheats-and-codes-forum': 'warzone-codes',
  'are-warzone-streamers-cheating-forum': 'streamer-cheats',
  'how-to-choose-warzone-product-tier': 'product-tier',
  'what-to-ask-before-buying-warzone': 'before-buying',
  'where-warzone-setup-questions-go': 'setup-questions',
  'practice-warzone-site-setups': 'site-setups',
  'what-to-check-after-a-warzone-patch': 'patch-checklist',
  'warzone-aim-and-recoil': 'aim-recoil',
  'warzone-settings-before-launch': 'launch-settings',
};

/** Top-level site paths (old → new, two keywords in last segment). */
export const SITE_PATH_REDIRECTS: Record<string, string> = {
  '/blog/': '/warzone-blog/',
  '/forum/': '/warzone-forum/',
  '/faq/': '/warzone-faq/',
  '/support/': '/warzone-support/',
  '/about/': '/warzone-about/',
  '/privacy/': '/warzone-privacy/',
  '/terms/': '/warzone-terms/',
  '/products/warzone-cheats/elite/': '/products/warzone-cheats/aimbot-esp/',
};

export function blogPathRedirects(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [oldSlug, newSlug] of Object.entries(BLOG_SLUG_REDIRECTS)) {
    out[`/blog/${oldSlug}/`] = `/warzone-blog/${newSlug}/`;
    out[`/blog/${oldSlug}`] = `/warzone-blog/${newSlug}/`;
    out[`/warzone-blog/${oldSlug}/`] = `/warzone-blog/${newSlug}/`;
    out[`/warzone-blog/${oldSlug}`] = `/warzone-blog/${newSlug}/`;
  }
  return out;
}

export function forumPathRedirects(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [oldSlug, newSlug] of Object.entries(FORUM_SLUG_REDIRECTS)) {
    out[`/forum/${oldSlug}/`] = `/warzone-forum/${newSlug}/`;
    out[`/forum/${oldSlug}`] = `/warzone-forum/${newSlug}/`;
    out[`/warzone-forum/${oldSlug}/`] = `/warzone-forum/${newSlug}/`;
    out[`/warzone-forum/${oldSlug}`] = `/warzone-forum/${newSlug}/`;
  }
  return out;
}
