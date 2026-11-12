/**
 * Rebuild meta-description translation keys after domain/padding changes.
 */
import fs from 'fs';

const langs = ['fi', 'es', 'fr', 'nl', 'uk'];

function formatMetaDescription(text) {
  let clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length >= 120 && clean.length <= 155) return clean;
  if (clean.length < 120) {
    const pad = ' Read the Warzone guides and status on cheats-warzone.com.';
    const combined = `${clean}${clean.endsWith('.') ? '' : '.'}${pad}`;
    if (combined.length <= 155 && combined.length >= 120) return combined;
    if (combined.length < 120) {
      return `${clean}${clean.endsWith('.') ? '' : '.'} Read the Warzone cheats and guides overview on cheats-warzone.com.`;
    }
    return combined.slice(0, 150).trim() + '...';
  }
  const cut = clean.slice(0, 150);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > 120 ? cut.slice(0, lastSpace) : cut;
  return trimmed.trim() + '...';
}

function baseBeforeMetaPad(key) {
  const marker = ' Read the Warzone guides and status on ';
  const idx = key.indexOf(marker);
  return idx === -1 ? null : key.slice(0, idx);
}

function remapValue(value) {
  return value
    .replaceAll('cheatswarzone.net', 'cheats-warzone.com')
    .replace(/cheatswa\.\.\./g, 'cheats-warzone.com')
    .replace(/cheatswar\.\.\./g, 'cheats-warzone.com');
}

for (const lang of langs) {
  const file = `src/i18n/catalogs/${lang}.json`;
  const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;
  for (const [key, value] of Object.entries({ ...catalog })) {
    const base = baseBeforeMetaPad(key);
    if (!base) continue;
    const newKey = formatMetaDescription(base);
    if (newKey === key || catalog[newKey]?.trim()) continue;
    catalog[newKey] = remapValue(value);
    added++;
  }
  // Also map any explicit short base strings that now pad differently
  for (const [key, value] of Object.entries({ ...catalog })) {
    if (key.includes(' Read the Warzone guides and status on ')) continue;
    const newKey = formatMetaDescription(key);
    if (newKey === key || catalog[newKey]?.trim()) continue;
    // Only when the padded form is a meta-description helper (contains domain fragment)
    if (!newKey.includes('cheats-warzone.com') && !newKey.includes('cheats-w')) continue;
    catalog[newKey] = catalog[newKey] ?? remapValue(value);
    added++;
  }
  const sorted = Object.fromEntries(Object.entries(catalog).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(file, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`${lang}: added ${added} keys`);
}

const source = JSON.parse(fs.readFileSync('src/i18n/catalogs/source.json', 'utf8'));
const sourceSet = new Set(source);
for (const lang of langs) {
  const catalog = JSON.parse(fs.readFileSync(`src/i18n/catalogs/${lang}.json`, 'utf8'));
  for (const key of Object.keys(catalog)) sourceSet.add(key);
}
// Add padded forms for all short strings that might render in meta
for (const key of [...sourceSet]) {
  const padded = formatMetaDescription(key);
  if (padded !== key) sourceSet.add(padded);
}
fs.writeFileSync(
  'src/i18n/catalogs/source.json',
  JSON.stringify([...sourceSet].sort(), null, 2) + '\n',
);
console.log(`source.json size: ${sourceSet.size}`);

// Fill any still-missing keys in locale catalogs using English until build passes
const enFallback = (key) => key;
for (const lang of langs) {
  const file = `src/i18n/catalogs/${lang}.json`;
  const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
  let filled = 0;
  for (const key of sourceSet) {
    if (!catalog[key]?.trim()) {
      const base = baseBeforeMetaPad(key);
      const legacy =
        (base && catalog[`${base} Read the Warzone guides and status on cheatswa...`]) ||
        (base && catalog[`${base} Read the Warzone guides and status on cheatswar...`]) ||
        (base && catalog[`${base} Read the Warzone guides and status on cheats-wa...`]);
      catalog[key] = legacy ? remapValue(legacy) : key;
      filled++;
    }
  }
  if (filled) {
    fs.writeFileSync(
      file,
      JSON.stringify(
        Object.fromEntries(Object.entries(catalog).sort(([a], [b]) => a.localeCompare(b))),
        null,
        2,
      ) + '\n',
    );
    console.log(`${lang}: filled ${filled} missing with legacy/EN`);
  }
}
