export type { Translations } from './types';
export { en } from './en';
export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_BY_CODE,
  NON_DEFAULT_LOCALES,
  FULL_LOCALES,
  isLocaleCode,
  type LocaleCode,
  type LocaleDefinition,
} from './locales';
export {
  useTranslations,
  stripLocalePrefix,
  getLocaleFromPathname,
  withLocalePrefix,
  switchLocalePath,
  isEnglishOnlyPath,
  localizeHref,
  hreflangAlternates,
  localizeProductShowcaseUrls,
  localizedBlogCard,
} from './utils';
export { langStaticPaths, localesForPage } from './routing';

/** @deprecated Use useTranslations(locale) in components. */
export { en as t } from './en';

export function avatarSrc(style: string, seed: string) {
  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&size=28&backgroundColor=111215,2d6ee2,1b1c24,e9a82f,0c0c12`;
}
