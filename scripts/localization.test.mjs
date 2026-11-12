import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';
import { extractTranslationStrings, isTranslatable, localizeHtml, supportedLanguages } from '../src/i18n/html-localization.mjs';

const catalogs = Object.fromEntries(supportedLanguages.map(lang => [lang, JSON.parse(fs.readFileSync(`src/i18n/catalogs/${lang}.json`, 'utf8'))]));
const source = JSON.parse(fs.readFileSync('src/i18n/catalogs/source.json', 'utf8'));
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
function nodes(html) {
  const all = [];
  function visit(node) { all.push(node); for (const child of node.childNodes ?? []) visit(child); }
  visit(parse(html));
  return all;
}

test('every source string has a nonempty local translation in all five languages', () => {
  for (const lang of supportedLanguages) for (const key of source) assert(catalogs[lang][key]?.trim(), `${lang}: ${key}`);
});

test('translation preserves code, IDs, assets, checkout URLs, filter keys, and language links', () => {
  const code = 'window.label = "Buy now"; window.counter = 1 < 2;';
  const html = `<html lang="en"><head><title>Products</title></head><body><script>${code}</script><a id="buy" href="https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fwarzone">Buy now</a><a href="/warzone-blog/" data-blog-filter="Products">Products</a><a href="/fi/warzone-blog/" data-language-link lang="fi">Suomi</a><img src="/images/producthome.jpg" alt="Products"><code>Buy now</code></body></html>`;
  for (const lang of supportedLanguages) {
    const translated = localizeHtml(html, lang, catalogs[lang]);
    assert(translated.includes(`<script>${code}</script>`));
    assert(translated.includes('data-blog-filter="Products"'));
    assert(translated.includes('id="buy" href="https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fwarzone"'));
    assert(translated.includes(`href="/${lang}/warzone-blog/"`));
    assert(translated.includes('href="/fi/warzone-blog/" data-language-link="" lang="fi">Suomi</a>'));
    assert(translated.includes('src="/images/producthome.jpg"'));
    assert(translated.includes('<code>Buy now</code>'));
    assert(translated.includes(`<title>${catalogs[lang].Products}</title>`));
  }
});

test('structured data and dynamic checkout labels translate without changing schema keys or plan IDs', () => {
  const html = '<html><head><script type="application/ld+json">{"@type":"WebPage","name":"Products","inLanguage":"en","url":"https://cheats-warzone.com/warzone-blog/"}</script></head><body><div data-plans=\'{"id":"monthly","label":"Monthly","priceUsd":35,"priceNote":"USD / 31 days"}\'></div></body></html>';
  for (const lang of supportedLanguages) {
    const all = nodes(localizeHtml(html, lang, catalogs[lang]));
    const json = JSON.parse(all.find(node => node.tagName === 'script').childNodes[0].value);
    assert.deepEqual(json, { '@type': 'WebPage', name: catalogs[lang].Products, inLanguage: lang, url: `https://cheats-warzone.com/${lang}/warzone-blog/` });
    const plan = JSON.parse(attr(all.find(node => attr(node, 'data-plans')), 'data-plans'));
    assert.equal(plan.id, 'monthly');
    assert.equal(plan.label, catalogs[lang].Monthly);
    assert.equal(plan.priceUsd, 35);
  }
});

test('missing translations fail explicitly while English stays unchanged', () => {
  const html = '<html lang="en"><body><p>A new untranslated sentence.</p></body></html>';
  assert.throws(() => localizeHtml(html, 'fi', {}), /Missing fi translation/);
  assert.equal(localizeHtml(html, 'en', {}), html);
});

test('all generated localized pages have native content, valid internal language links, and matching SEO URLs', () => {
  let checked = 0;
  function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
  for (const lang of supportedLanguages) {
    const pages = walk(`dist/${lang}`).filter(file => file.endsWith('.html'));
    assert(pages.length >= 56, `${lang}: missing translated pages`);
    for (const file of pages) {
      const html = fs.readFileSync(file, 'utf8');
      assert(!/translate\.google|translate_a\/single|translate\.googleapis/.test(html));
      const all = nodes(html);
      assert.equal(attr(all.find(node => node.tagName === 'html'), 'lang'), lang, file);
      const canonical = all.find(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical');
      assert(attr(canonical, 'href').includes(`/${lang}/`), file);
      const languageLinks = all.filter(node => node.tagName === 'a' && attr(node, 'data-language-link') !== undefined);
      assert.equal(languageLinks.length, 6, file);
      assert.equal(languageLinks.filter(node => attr(node, 'aria-current') === 'true').length, 1, file);
      assert.equal(attr(languageLinks.find(node => attr(node, 'aria-current') === 'true'), 'lang'), lang);
      for (const link of languageLinks) {
        const target = new URL(attr(link, 'href'), 'https://cheats-warzone.com');
        const pathname = target.pathname;
        const localFile = pathname === '/404/' ? 'dist/404.html' : path.join('dist', pathname, 'index.html');
        assert(fs.existsSync(localFile), `${file}: language destination missing: ${pathname}`);
      }
      checked++;
    }
  }
  assert(checked >= 280);
});
