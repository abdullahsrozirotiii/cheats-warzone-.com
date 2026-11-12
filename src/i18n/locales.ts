/**
 * Supported site languages. English stays on the unprefixed routes.
 */

export type LocaleCode = 'en' | 'fi' | 'es' | 'fr' | 'nl' | 'uk';

export type ConversionTier = 'default';

export interface LocaleDefinition {
  code: LocaleCode;
  hreflang: string;
  ogLocale: string;
  name: string;
  nativeName: string;
  country: string;
  rank: number;
  tier: ConversionTier;
  pathPrefix: string;
}

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const LOCALES: LocaleDefinition[] = [
  {
    code: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    name: 'English',
    nativeName: 'English',
    country: 'United States / UK / Global EN',
    rank: 0,
    tier: 'default',
    pathPrefix: '',
  },
  { code: 'fi', hreflang: 'fi', ogLocale: 'fi_FI', name: 'Finnish', nativeName: 'Suomi', country: 'Finland', rank: 1, tier: 'default', pathPrefix: '/fi' },
  { code: 'es', hreflang: 'es', ogLocale: 'es_ES', name: 'Spanish', nativeName: 'Español', country: 'Spain / Argentina', rank: 2, tier: 'default', pathPrefix: '/es' },
  { code: 'fr', hreflang: 'fr', ogLocale: 'fr_BE', name: 'French', nativeName: 'Français', country: 'Belgium', rank: 3, tier: 'default', pathPrefix: '/fr' },
  { code: 'nl', hreflang: 'nl', ogLocale: 'nl_BE', name: 'Dutch', nativeName: 'Nederlands', country: 'Belgium', rank: 4, tier: 'default', pathPrefix: '/nl' },
  { code: 'uk', hreflang: 'uk', ogLocale: 'uk_UA', name: 'Ukrainian', nativeName: 'Українська', country: 'Ukraine', rank: 5, tier: 'default', pathPrefix: '/uk' },
];

export const LOCALE_BY_CODE = Object.fromEntries(
  LOCALES.map((locale) => [locale.code, locale]),
) as Record<LocaleCode, LocaleDefinition>;

export const NON_DEFAULT_LOCALES = LOCALES.filter(locale => locale.code !== DEFAULT_LOCALE);
export const FULL_LOCALES: LocaleCode[] = NON_DEFAULT_LOCALES.map(locale => locale.code);
export const MEDIUM_LOCALES: LocaleCode[] = [];
export const LIGHT_LOCALES: LocaleCode[] = [];

export function isLocaleCode(value: string): value is LocaleCode {
  return Object.prototype.hasOwnProperty.call(LOCALE_BY_CODE, value);
}
