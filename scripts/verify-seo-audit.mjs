import fs from 'node:fs';
import assert from 'node:assert/strict';
const paths = ['/', '/warzone-blog/', '/warzone-about/', '/warzone-faq/', '/warzone-blog/aimbot-fov/', '/products/warzone-cheats/', '/products/warzone-cheats/aimbot-esp/', '/warzone-forum/', '/warzone-support/', '/warzone-blog/cheats-features/'];
const decode = s => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const text = s => decode(s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
const compact = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const titles = new Set();
for (const path of paths) {
  const html = fs.readFileSync(`dist${path}index.html`, 'utf8');
  const title = text(html.match(/<title>(.*?)<\/title>/s)[1]);
  assert(!titles.has(title)); titles.add(title);
  if (['/', '/warzone-blog/', '/warzone-about/', '/warzone-faq/', '/warzone-blog/aimbot-fov/'].includes(path)) {
    assert(title.length >= 40 && title.length <= 60, `Title length: ${path}`);
    const words = title.toLowerCase().match(/[a-z0-9]+/g);
    assert.equal(new Set(words).size, words.length, `Repeated title words: ${path}`);
  }
  assert(html.includes(`rel="canonical" href="https://cheats-warzone.com${path}"`));
  const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  const labels = [...mainHtml.matchAll(/<a\b[^>]*href="(\/[^"\s]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => text(m[2]).toLowerCase()).filter(Boolean);
  assert.equal(new Set(labels).size, labels.length, `Duplicate anchors: ${path}`);
  console.log(path);
  const keyword = ({ '/': 'warzone cheats', '/warzone-blog/': 'guides', '/warzone-about/': 'warzone cheats', '/warzone-faq/': 'warzone' })[path];
  if (keyword) {
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
    const first100 = text(main).split(/\s+/).slice(0, 100).join(' ').toLowerCase();
    const headings = [...main.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/g)].map(m => text(m[1]).toLowerCase());
    const alts = [...main.matchAll(/<img\b[^>]*alt="([^"]*)"/g)].map(m => text(m[1]).toLowerCase());
    console.log('  keyword placement:', JSON.stringify({ first100: first100.includes(keyword), subheading: headings.some(h => h.includes(keyword)), image: alts.some(a => a.includes(keyword)) }));
    assert(first100.includes(keyword));
    assert(headings.some(h => compact(h).includes(compact(keyword))));
    assert(title.toLowerCase().indexOf(keyword) < title.length / 2);
    // FAQ intentionally has no hero image.
    if (path !== '/warzone-faq/') assert(alts.some(a => a.includes(keyword)));
  }
  for (const [kind, pattern] of [['title', /<title>(.*?)<\/title>/s], ['H1', /<h1\b[^>]*>(.*?)<\/h1>/s], ['description', /<meta name="description" content="([^"]*)"/]]) {
    const value = text(html.match(pattern)?.[1] || '');
    console.log(`  ${kind} (${value.length}): ${value}`);
  }
}
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
for (const location of locations) {
  const url = new URL(location);
  assert.equal(url.origin, 'https://cheats-warzone.com');
  const html = fs.readFileSync(`dist${url.pathname}index.html`, 'utf8');
  assert(!html.includes('noindex'));
  assert(!html.includes('http-equiv="refresh"'));
  assert(html.includes(`rel="canonical" href="${location}"`));
}
assert(fs.readFileSync('dist/robots.txt', 'utf8').includes('Sitemap: https://cheats-warzone.com/sitemap.xml'));
console.log(`Verified ${paths.length} audited pages and ${locations.length} sitemap entries.`);
