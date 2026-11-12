/**
 * Host + path redirects for Cloudflare Pages.
 * `_redirects` cannot use absolute hosts, and Pages skips `_redirects` when
 * Functions handle the request — keep both behaviors here.
 */
import { resolvePathRedirect } from '../scripts/redirects.mjs';
import { resolveCheckoutPathRedirect } from '../src/config/checkout-redirects.mjs';
import { WARZONE_SITE_HOST } from '../scripts/site-url.mjs';

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Redirect www to canonical Warzone site host (cheats-warzone.com)
  if (url.hostname === `www.${WARZONE_SITE_HOST}`) {
    url.hostname = WARZONE_SITE_HOST;
    return Response.redirect(url.toString(), 301);
  }

  const pathname = url.pathname;
  const checkout = resolveCheckoutPathRedirect(pathname);
  if (checkout) {
    return Response.redirect(checkout, 302);
  }

  const pathRedirect = resolvePathRedirect(pathname);
  if (pathRedirect) {
    const dest = new URL(pathRedirect, `https://${WARZONE_SITE_HOST}`);
    dest.search = url.search;
    dest.hash = url.hash;
    return Response.redirect(dest.toString(), 301);
  }

  return context.next();
}
