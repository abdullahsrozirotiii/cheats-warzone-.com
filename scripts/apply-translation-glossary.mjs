import fs from 'node:fs';
import { glossary } from '../src/i18n/catalogs/glossary.mjs';
for (const [language, terms] of Object.entries(glossary)) {
  const file = `src/i18n/catalogs/${language}.json`;
  const catalog = Object.fromEntries(Object.entries({ ...JSON.parse(fs.readFileSync(file, 'utf8')), ...terms }).map(([key, value]) => [key, value.replaceAll('Â©', '©').replaceAll('Â·', '·')]));
  fs.writeFileSync(file, JSON.stringify(Object.fromEntries(Object.entries(catalog).sort(([a], [b]) => a.localeCompare(b))), null, 2) + '\n');
}
console.log('Applied reviewed interface translations.');
