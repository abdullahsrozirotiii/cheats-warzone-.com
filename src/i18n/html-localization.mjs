import { parse, serialize } from 'parse5';

// Local catalogs cover prose and accessible labels, never executable code or IDs.
const textAttributes = new Set(['alt', 'aria-label', 'aria-description', 'placeholder', 'title', 'data-empty-message', 'data-vote-remove-label']);
const proseKeys = new Set(['name', 'headline', 'description', 'text', 'articleBody', 'caption', 'priceNote', 'label']);
const ignoredElements = new Set(['style', 'code', 'pre', 'svg', 'math']);
const normalize = value => value.replace(/\s+/g, ' ').trim();
export const supportedLanguages = ['fi', 'es', 'fr', 'nl', 'uk'];
export function isTranslatable(value) {
  const text = normalize(value);
  if (!/[a-zA-Z]/.test(text)) return false;
  if (/^(?:https?:\/\/|mailto:|@|d\/|#[\da-f]{3,8}$)/i.test(text)) return false;
  if (/^(?:cheats|warzone|WarzoneCheats|cheatswarzone(?:\.net)?|Call of Duty(?: Warzone)?|Discord|Steam|Battle\.net|Microsoft Store|Windows(?: 10(?:\/11)?| 11)?|Intel|AMD|NVIDIA|TPM|HVCI|RAM|GPU|CPU|FPS|PC|OBS|Streamlabs|RICOCHET|Ricochet|ESP|FOV|MW[23]|BO[67]|Humanizer|Cloud DMA|StreamProof|Xbox|PlayStation|Battle Royale|Resurgence|Ranked|Plunder|Black Ops \d|Modern Warfare \d|WARZONE|Undetected \(4\.9\/5\))$/i.test(text)) return false;
  if (/^[\d\s$.,%/+:—–-]+(?:GB|MB|Hz|ms|m|USD)$/i.test(text)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || /^\S+\.(?:net|com|png|jpg|webp|mp4)$/.test(text)) return false;
  if (/^—\s/.test(text)) return false;
  if (/^Share on (?:X|Facebook)$/.test(text)) return false;
  return true;
}

function processHtml(html, translate, { locale = 'en', origin = 'https://cheats-warzone.com' } = {}) {
  const document = parse(html);
  const localPath = href => {
    if (locale === 'en' || !href.startsWith('/') || href.startsWith('//') || /^\/(?:go|_astro|images|fonts)(?:\/|$)/.test(href) || /\.[a-z0-9]+(?:[?#]|$)/i.test(href)) return href;
    return `/${locale}${href.replace(/^\/(fi|es|fr|nl|uk)(?=\/|$)/, '')}`;
  };
  const localUrl = value => value.startsWith(`${origin}/`) ? origin + localPath(value.slice(origin.length)) : value;
  const json = (value, key = '') => {
    if (typeof value === 'string') {
      if (key === 'inLanguage') return locale;
      if (proseKeys.has(key)) return translate(value);
      return localUrl(value);
    }
    if (Array.isArray(value)) return value.map(item => json(item, key));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, json(item, name)]));
    return value;
  };
  function walk(node, skipText = false) {
    if (node.nodeName === '#text') {
      if (!skipText && node.value.trim()) node.value = translate(node.value);
      return;
    }
    const attrs = node.attrs ?? [];
    const get = name => attrs.find(attr => attr.name === name)?.value;
    const isLanguageLink = get('data-language-link') !== undefined;
    const noLocalize = get('data-no-localize') !== undefined;
    if (node.tagName === 'html') {
      const lang = attrs.find(attr => attr.name === 'lang');
      if (lang) lang.value = locale;
    }
    for (const attr of attrs) {
      if (textAttributes.has(attr.name)) attr.value = translate(attr.value);
      if (attr.name === 'data-plans') {
        try { attr.value = JSON.stringify(json(JSON.parse(attr.value))); } catch { /* Leave non-JSON attributes unchanged. */ }
      }
      if (attr.name === 'href' && !isLanguageLink && get('rel') !== 'alternate') attr.value = localPath(localUrl(attr.value));
      if (attr.name === 'action') attr.value = localPath(attr.value);
      if (attr.name === 'data-forum-messages') attr.value = JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(attr.value)).map(([key, value]) => [key, translate(value)])));
    }
    if (node.tagName === 'meta') {
      const name = get('name') ?? get('property');
      const content = attrs.find(attr => attr.name === 'content');
      if (content && ['description', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image:alt'].includes(name)) content.value = translate(content.value);
      if (content && name === 'og:url') content.value = localUrl(content.value);
    }
    if (node.tagName === 'script') {
      if (get('type') === 'application/ld+json') {
        for (const child of node.childNodes ?? []) if (child.nodeName === '#text') child.value = JSON.stringify(json(JSON.parse(child.value))).replaceAll('<', '\\u003c');
      }
      return;
    }
    const skip = skipText || ignoredElements.has(node.tagName) || isLanguageLink || noLocalize;
    for (const child of node.childNodes ?? []) walk(child, skip);
  }
  walk(document);
  return serialize(document);
}

export function extractTranslationStrings(html) {
  const strings = new Set();
  processHtml(html, value => { if (isTranslatable(value)) strings.add(normalize(value)); return value; });
  return [...strings];
}

export function localizeHtml(html, locale, catalog, options = {}) {
  if (locale === 'en') return html;
  return processHtml(html, value => {
    const key = normalize(value);
    if (!isTranslatable(key)) return value;
    const translated = catalog[key];
    if (translated === undefined) throw new Error(`Missing ${locale} translation: ${key}`);
    return value.replace(/\S[\s\S]*\S|\S/, () => translated);
  }, { ...options, locale });
}
