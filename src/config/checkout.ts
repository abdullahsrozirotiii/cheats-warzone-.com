import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets.
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  warzone: 'warzone',
  hwidSpoofer: 'hwid-spoofer',
  skinChanger: 'skin-changer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Public Warzone checkout. */
export const WARZONE_BUY_URL = CHECKOUT_URLS.warzone;

const CHECKOUT_BY_PRODUCT_SLUG: Record<string, string> = {
  'aimbot-esp': CHECKOUT_URLS.warzone,
  lite: CHECKOUT_URLS.warzone,
  pro: CHECKOUT_URLS.warzone,
  elite: CHECKOUT_URLS.warzone,
  'hwid-spoofer': CHECKOUT_URLS.hwidSpoofer,
  ugc: CHECKOUT_URLS.ugc,
  'unlock-all': CHECKOUT_URLS.skinChanger,
  'skin-changer': CHECKOUT_URLS.skinChanger,
};

const AFFILIATE_CHECKOUT_URLS = new Set(Object.values(CHECKOUT_URLS));

/** Checkout href used by buy buttons (visible affiliate link, same tab). */
export function checkoutPath(product: CheckoutProduct = 'warzone'): string {
  return CHECKOUT_URLS[product];
}

/** Default product checkout CTA. */
export const PRIMARY_CHECKOUT_PATH = WARZONE_BUY_URL;

/** Map internal product slugs to the correct Zadeyo checkout link. */
export function checkoutForSlug(slug: string): string {
  return CHECKOUT_BY_PRODUCT_SLUG[slug] ?? CHECKOUT_URLS.warzone;
}

/** Resolve blog CTA or legacy href values to a checkout link. */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    if (href.startsWith('/go/')) {
      const slug = href.replace(/^\/go\//, '').replace(/\/$/, '');
      const product = CHECKOUT_SLUG_TO_PRODUCT[slug];
      if (product) return CHECKOUT_URLS[product];
      return WARZONE_BUY_URL;
    }
    return href.startsWith('/') ? href : `/${href}`;
  }

  if (AFFILIATE_CHECKOUT_URLS.has(href)) return href;

  for (const [, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return url;
    }
  }

  if (
    href.includes('%2Fproducts%2Fcloud-dma') ||
    href.includes('/products/cloud-dma') ||
    href.includes('/go/ZOBIA') ||
    href.includes('levocheats.com/go/ZOBIA')
  ) {
    return WARZONE_BUY_URL;
  }

  return href;
}
