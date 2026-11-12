import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';
import { auditMarkup, dedupeAnchors } from './config/auditMarkup';
import { getLocaleFromPathname, stripLocalePrefix } from './i18n';
import { localizeHtml } from './i18n/html-localization.mjs';
import fi from './i18n/catalogs/fi.json';
import es from './i18n/catalogs/es.json';
import fr from './i18n/catalogs/fr.json';
import nl from './i18n/catalogs/nl.json';
import uk from './i18n/catalogs/uk.json';
import { SITE_ORIGIN } from './config/seo';

const catalogs = { fi, es, fr, nl, uk };

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  const destination = resolveCheckoutPathRedirect(url.pathname);
  if (destination) {
    return context.redirect(destination, 302);
  }

  const locale = getLocaleFromPathname(url.pathname);
  const barePath = stripLocalePrefix(url.pathname);
  context.locals.locale = locale;
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  let html = auditMarkup(await response.text(), barePath, locale);
  if (locale !== 'en') html = localizeHtml(html, locale, catalogs[locale], { origin: SITE_ORIGIN });
  if (locale !== 'en') html = dedupeAnchors(html);
  headers.set('Content-Language', locale);
  return new Response(html, { status: response.status, headers });
});
