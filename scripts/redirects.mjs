import { SLUG_PATH_REDIRECTS } from './slug-redirect-pairs.mjs';

const LOCALE_PREFIXES = ['/pt', '/ru', '/tr', '/de', '/pl', '/fr', '/es'];

/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/warzone-blog/'],
  ['/about', '/warzone-about/'],
  ['/contact', '/warzone-support/'],
  ['/contact/', '/warzone-support/'],
  ['/support', '/warzone-support/'],
  ['/privacy', '/warzone-privacy/'],
  ['/terms', '/warzone-terms/'],
  ['/faq', '/warzone-faq/'],
  ['/forum', '/warzone-forum/'],
  ['/products', '/products/warzone-cheats/'],
  ['/products/', '/products/warzone-cheats/'],
  ['/cheats', '/products/warzone-cheats/'],
  ['/cheats/', '/products/warzone-cheats/'],
  ['/cheats/lite', '/products/warzone-cheats/aimbot-esp/'],
  ['/cheats/lite/', '/products/warzone-cheats/aimbot-esp/'],
  ['/cheats/pro', '/products/warzone-cheats/aimbot-esp/'],
  ['/cheats/pro/', '/products/warzone-cheats/aimbot-esp/'],
  ['/cheats/elite', '/products/warzone-cheats/aimbot-esp/'],
  ['/cheats/elite/', '/products/warzone-cheats/aimbot-esp/'],
  ['/cheats/compare', '/warzone-blog/cheats-features/'],
  ['/cheats/compare/', '/warzone-blog/cheats-features/'],
  // Current product aliases
  ['/products/warzone-cheats', '/products/warzone-cheats/'],
  ['/products/warzone-cheats/utilities', '/products/warzone-cheats/utilities/'],
  ['/products/warzone-cheats/lite', '/products/warzone-cheats/aimbot-esp/'],
  ['/products/warzone-cheats/lite/', '/products/warzone-cheats/aimbot-esp/'],
  ['/products/warzone-cheats/pro', '/products/warzone-cheats/aimbot-esp/'],
  ['/products/warzone-cheats/pro/', '/products/warzone-cheats/aimbot-esp/'],
  ['/products/warzone-cheats/skin-changer', '/products/warzone-cheats/unlock-all/'],
  ['/products/warzone-cheats/skin-changer/', '/products/warzone-cheats/unlock-all/'],
  ['/products/warzone-cheats/account-recovery', '/products/warzone-cheats/ugc/'],
  ['/products/warzone-cheats/account-recovery/', '/products/warzone-cheats/ugc/'],
  ...SLUG_PATH_REDIRECTS,
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

function resolvePathRedirectInner(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    const withSlash = `${pathname}/`;
    const mapped = PATH_REDIRECTS.get(withSlash);
    if (mapped) return mapped;
  }

  return null;
}

export function resolvePathRedirect(pathname) {
  const direct = resolvePathRedirectInner(pathname);
  if (direct) return direct;

  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      const rest = pathname.slice(prefix.length) || '/';
      const mapped = resolvePathRedirectInner(rest);
      if (mapped) {
        return `${prefix}${mapped.startsWith('/') ? mapped : `/${mapped}`}`;
      }
    }
  }

  return null;
}
