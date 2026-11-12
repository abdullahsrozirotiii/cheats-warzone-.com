import { PRODUCT_BASE } from '../config/site';
import { blogPathRedirects, forumPathRedirects, SITE_PATH_REDIRECTS } from '../config/slug-map';

/** Normalize internal paths to match trailingSlash: 'always' and canonical URLs. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

/** Former /cheats/* URLs → current routes (301 targets match astro.config + scripts/redirects.mjs). */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/products': PRODUCT_BASE,
  '/products/': PRODUCT_BASE,
  '/cheats': PRODUCT_BASE,
  '/cheats/': PRODUCT_BASE,
  '/cheats/lite': `${PRODUCT_BASE}aimbot-esp/`,
  '/cheats/lite/': `${PRODUCT_BASE}aimbot-esp/`,
  '/cheats/pro': `${PRODUCT_BASE}aimbot-esp/`,
  '/cheats/pro/': `${PRODUCT_BASE}aimbot-esp/`,
  '/cheats/elite': `${PRODUCT_BASE}aimbot-esp/`,
  '/cheats/elite/': `${PRODUCT_BASE}aimbot-esp/`,
  '/cheats/compare': '/warzone-blog/cheats-features/',
  '/cheats/compare/': '/warzone-blog/cheats-features/',
  '/products/warzone-cheats/lite': `${PRODUCT_BASE}aimbot-esp/`,
  '/products/warzone-cheats/lite/': `${PRODUCT_BASE}aimbot-esp/`,
  '/products/warzone-cheats/pro': `${PRODUCT_BASE}aimbot-esp/`,
  '/products/warzone-cheats/pro/': `${PRODUCT_BASE}aimbot-esp/`,
  '/products/warzone-cheats/skin-changer': `${PRODUCT_BASE}unlock-all/`,
  '/products/warzone-cheats/skin-changer/': `${PRODUCT_BASE}unlock-all/`,
  '/products/warzone-cheats/hwid-spoofer': PRODUCT_BASE,
  '/products/warzone-cheats/hwid-spoofer/': PRODUCT_BASE,
  '/products/warzone-cheats/account-recovery': `${PRODUCT_BASE}ugc/`,
  '/products/warzone-cheats/account-recovery/': `${PRODUCT_BASE}ugc/`,
  '/contact': '/warzone-support/',
  '/contact/': '/warzone-support/',
  ...SITE_PATH_REDIRECTS,
  ...blogPathRedirects(),
  ...forumPathRedirects(),
};

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = LEGACY_PATH_MAP[pathname] ?? pathname;

  return withTrailingSlash(pathname) + hash;
}

export const ROUTES = {
  home: '/',
  blog: '/warzone-blog/',
  forum: '/warzone-forum/',
  products: PRODUCT_BASE,
  productsElite: `${PRODUCT_BASE}aimbot-esp/`,
  productsUtilities: `${PRODUCT_BASE}utilities/`,
  faq: '/warzone-faq/',
  terms: '/warzone-terms/',
  about: '/warzone-about/',
  support: '/warzone-support/',
  privacy: '/warzone-privacy/',
} as const;

export function blogPostPath(slug: string): string {
  return `/warzone-blog/${slug}/`;
}

/** @deprecated Use productPath — cheat tier pages live under products. */
export function cheatPath(slug: string): string {
  return productPath(slug);
}

export function productPath(slug: string): string {
  return `${PRODUCT_BASE}${slug}/`;
}
