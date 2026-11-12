export const supportedLanguages: string[];
export function isTranslatable(value: string): boolean;
export function extractTranslationStrings(html: string): string[];
export function localizeHtml(html: string, locale: string, catalog: Record<string, string>, options?: { origin?: string }): string;
