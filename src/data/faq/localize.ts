import type { LocaleCode } from '../../i18n/locales';
import type { SiteFaqItem } from '../faqData';
import { faqData } from '../faqData';

export function localizeFaqItem(item: SiteFaqItem, _locale: LocaleCode = 'en'): SiteFaqItem {
  return item;
}

export function getLocalizedFaqs(_locale: LocaleCode = 'en'): SiteFaqItem[] {
  return faqData;
}
