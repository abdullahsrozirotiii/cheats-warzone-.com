/** Authoring tool only. Builds use the checked-in catalogs and never call a service. */
import fs from 'node:fs';
import path from 'node:path';
import { extractTranslationStrings, supportedLanguages } from '../src/i18n/html-localization.mjs';
import { glossary } from '../src/i18n/catalogs/glossary.mjs';

function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
const pages = walk('dist').filter(file => file.endsWith('.html') && !/^dist[\\/](?:fi|es|fr|nl|uk)[\\/]/.test(file));
const allStrings = pages.flatMap(file => extractTranslationStrings(fs.readFileSync(file, 'utf8')));
const strings = [...new Set(allStrings)].sort();
const sourceFile = 'src/i18n/catalogs/source.json';
fs.writeFileSync(sourceFile, JSON.stringify(strings, null, 2) + '\n');
console.log(`${pages.length} pages, ${strings.length} unique strings, ${strings.join('').length} characters.`);
if (process.argv.includes('--extract-only')) process.exit(0);

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function translate(text, language) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.search = new URLSearchParams({ client: 'gtx', sl: 'en', tl: language, dt: 't', q: text }).toString();
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw new Error(`Translation service returned ${response.status}`);
      const data = await response.json();
      const result = data[0].map(part => part[0] ?? '').join('');
      if (!result.trim()) throw new Error('Empty translation');
      return result;
    } catch (error) {
      if (attempt === 4) throw error;
      await pause(1000 * 2 ** attempt);
    }
  }
}

for (const language of supportedLanguages) {
  const file = `src/i18n/catalogs/${language}.json`;
  const catalog = { ...JSON.parse(fs.readFileSync(file, 'utf8')), ...glossary[language] };
  const missing = strings.filter(text => !catalog[text]?.trim());
  // Numbered line markers keep entries separate and permit validation after batching.
  const batches = [];
  let batch = [];
  let length = 0;
  for (const text of missing) {
    if (length + text.length > 3200 && batch.length) { batches.push(batch); batch = []; length = 0; }
    batch.push(text); length += text.length + 15;
  }
  if (batch.length) batches.push(batch);
  let completed = 0;
  async function worker() {
    while (batches.length) {
      const entries = batches.shift();
      const input = entries.map((text, index) => `[[${index}]] ${text}`).join('\n');
      const result = await translate(input, language);
      const pieces = [...result.matchAll(/\[\[\s*(\d+)\s*\]\]\s*([\s\S]*?)(?=\[\[\s*\d+\s*\]\]|$)/g)];
      if (pieces.length === entries.length && pieces.every((piece, index) => Number(piece[1]) === index && piece[2].trim())) {
        pieces.forEach((piece, index) => { catalog[entries[index]] = piece[2].trim(); });
      } else {
        for (const entry of entries) catalog[entry] = (await translate(entry, language)).trim();
      }
      completed += entries.length;
      fs.writeFileSync(file, JSON.stringify(Object.fromEntries(Object.entries(catalog).sort(([a], [b]) => a.localeCompare(b))), null, 2) + '\n');
      console.log(`${language}: ${completed}/${missing.length} strings saved`);
      await pause(100);
    }
  }
  await Promise.all([worker(), worker()]);
  fs.writeFileSync(file, JSON.stringify({ ...catalog, ...glossary[language] }, null, 2) + '\n');
}
