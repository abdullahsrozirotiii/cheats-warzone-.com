import type { Translations } from './types';
import { DEFAULT_LOCALE, LOCALES, isLocaleCode, type LocaleCode } from './locales';
import { en } from './en';

export function useTranslations(_locale: LocaleCode = DEFAULT_LOCALE): Translations {
  return en;
}

export function stripLocalePrefix(pathname: string): string {
  pathname = pathname.replace(/^\/(fi|es|fr|nl|uk)(?=\/|$)/, '');
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function getLocaleFromPathname(pathname: string): LocaleCode {
  const segment = pathname.split('/')[1];
  return isLocaleCode(segment) ? segment : DEFAULT_LOCALE;
}

export function isEnglishOnlyPath(pathname: string): boolean {
  return /^\/(?:go\/|_astro\/|images\/|fonts\/)|\.[a-z0-9]+(?:$|[?#])/i.test(pathname);
}

export function withLocalePrefix(href: string, locale: LocaleCode = DEFAULT_LOCALE): string {
  if (!href.startsWith('/') || href.startsWith('//') || isEnglishOnlyPath(href)) return href;
  const index = href.search(/[?#]/);
  const pathname = index === -1 ? href : href.slice(0, index);
  const suffix = index === -1 ? '' : href.slice(index);
  return `${locale === 'en' ? '' : `/${locale}`}${stripLocalePrefix(pathname)}${suffix}`;
}

export function isForumPath(pathname: string): boolean {
  const bare = stripLocalePrefix(pathname);
  return (
    bare === '/warzone-forum/' ||
    bare === '/forum/' ||
    bare.startsWith('/warzone-forum/') ||
    bare.startsWith('/forum/')
  );
}

export function switchLocalePath(pathname: string, nextLocale: LocaleCode): string {
  return withLocalePrefix(pathname, nextLocale);
}

export function hreflangAlternates(pathname: string, siteOrigin: string): { hreflang: string; href: string }[] {
  const bare = stripLocalePrefix(pathname);
  const cleanPath = bare === '/' ? '/' : bare.endsWith('/') ? bare : `${bare}/`;
  return [
    ...LOCALES.map(locale => ({ hreflang: locale.hreflang, href: `${siteOrigin}${withLocalePrefix(cleanPath, locale.code)}` })),
    {
      hreflang: 'x-default',
      href: `${siteOrigin}${cleanPath}`,
    },
  ];
}

export function localizeProductShowcaseUrls(
  buyUrl: string,
  detailsUrl: string,
  _locale: LocaleCode,
): { buyUrl: string; detailsUrl: string } {
  return {
    buyUrl,
    detailsUrl,
  };
}

export function localizedBlogCard(
  _slug: string,
  _locale: LocaleCode,
): Pick<Translations['blog']['items'][number], 'title' | 'desc' | 'tag' | 'date' | 'readTime'> | undefined {
  return undefined;
}

export function localizeHref(href: string, _locale: LocaleCode): string {
  return href;
}
