import type { LocaleCode } from './locales';
import { FULL_LOCALES } from './locales';

export type LocalizedPageKind =
  | 'home'
  | 'products-hub'
  | 'product-elite'
  | 'product-utilities'
  | 'product-detail'
  | 'blog-index'
  | 'blog-post'
  | 'faq'
  | 'support'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'forum';

export function localesForPage(_kind: LocalizedPageKind, _blogSlug?: string): LocaleCode[] {
  return FULL_LOCALES;
}

export function langStaticPaths(_kind: LocalizedPageKind, _blogSlug?: string) {
  return FULL_LOCALES.map(lang => ({ params: { lang } }));
}

/** Source-only builds let editors refresh catalogs before rendering translations. */
export function nativeStaticPaths(slugs?: string[]) {
  if (process.env.I18N_SOURCE_BUILD === '1') return [];
  return slugs
    ? FULL_LOCALES.flatMap(lang => slugs.map(slug => ({ params: { lang, slug } })))
    : FULL_LOCALES.map(lang => ({ params: { lang } }));
}
