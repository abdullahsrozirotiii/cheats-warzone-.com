/** Checkout destinations — Warzone suite + utility products on Zadeyo. */
export const CHECKOUT_URLS = {
  warzone: 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fwarzone',
  hwidSpoofer: 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fhwid-spoofer',
  skinChanger: 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fskin-changer',
  ugc: 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fugc',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/warzone', CHECKOUT_URLS.warzone],
  ['/go/warzone/', CHECKOUT_URLS.warzone],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
