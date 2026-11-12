/**
 * One-shot slug migration: 2-keyword slugs + warzone-* top-level paths.
 * Run: node scripts/apply-slug-migration.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const BLOG_SLUG_REDIRECTS = {
  'warzone-cheats-features': 'cheats-features',
  'warzone-ricochet-safety': 'ricochet-safety',
  'warzone-esp-aimbot': 'esp-aimbot',
  'warzone-cheat-settings': 'cheat-settings',
  'warzone-esp-guide': 'warzone-esp',
  'warzone-wallhack-vs-esp': 'wallhack-esp',
  'warzone-aimbot-fov-smooth': 'aimbot-fov',
  'warzone-silent-aim-explained': 'silent-aim',
  'warzone-triggerbot-vs-aimbot': 'triggerbot-aimbot',
  'warzone-esp-colors-distance': 'esp-colors',
  'warzone-cheat-undetected-status': 'undetected-cheats',
  'warzone-radar-hack-guide': 'warzone-radar',
  'warzone-recoil-script-aimbot': 'recoil-aimbot',
  'warzone-anti-cheat-faq': 'anticheat-faq',
  'how-to-get-warzone-cheats': 'get-cheats',
  'warzone-console-cheating': 'console-cheats',
  'warzone-2-cheats-and-codes': 'warzone-codes',
};

const FORUM_SLUG_REDIRECTS = {
  'what-does-warzone-map-awareness-include': 'map-awareness',
  'how-to-set-up-map-overlay': 'map-overlay',
  'what-zoom-settings-are-comfortable': 'zoom-settings',
  'how-to-tune-script-delay-settings': 'script-settings',
  'warzone-aimbot-and-recoil': 'aimbot-recoil',
  'what-is-in-the-elite-tier': 'elite-tier',
  'how-do-lite-and-pro-differ': 'lite-pro',
  'what-to-know-about-skin-changer': 'skin-changer',
  'what-to-do-if-vac-cannot-verify': 'ricochet-verify',
  'how-does-an-external-loader-work': 'external-loader',
  'how-to-check-stream-proof-capture': 'stream-proof',
  'what-to-do-after-hwid-change': 'hwid-change',
  'what-to-check-before-installing-tools': 'install-tools',
  'does-warzone-have-anti-cheat-forum': 'warzone-anticheat',
  'how-to-get-warzone-cheats-forum': 'get-cheats',
  'can-console-players-cheat-warzone': 'console-cheats',
  'warzone-2-cheats-and-codes-forum': 'warzone-codes',
  'are-warzone-streamers-cheating-forum': 'streamer-cheats',
  'how-to-choose-warzone-product-tier': 'product-tier',
  'what-to-ask-before-buying-warzone': 'before-buying',
  'where-warzone-setup-questions-go': 'setup-questions',
  'practice-warzone-site-setups': 'site-setups',
  'what-to-check-after-a-warzone-patch': 'patch-checklist',
  'warzone-aim-and-recoil': 'aim-recoil',
  'warzone-settings-before-launch': 'launch-settings',
};

const SITE_PATH_REPLACEMENTS = [
  ['/products/warzone-cheats/elite/', '/products/warzone-cheats/aimbot-esp/'],
  ['/products/warzone-cheats/elite', '/products/warzone-cheats/aimbot-esp/'],
];

const EXT = new Set(['.ts', '.tsx', '.astro', '.mjs', '.js', '.css', '.md']);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(name))) files.push(full);
  }
  return files;
}

function replaceAll(text, pairs) {
  let out = text;
  for (const [from, to] of pairs) {
    if (!from) continue;
    out = out.split(from).join(to);
  }
  return out;
}

function buildReplacementPairs() {
  const pairs = [];

  // Blog post URLs (longest first)
  const blogOldSlugs = Object.keys(BLOG_SLUG_REDIRECTS).sort((a, b) => b.length - a.length);
  for (const oldSlug of blogOldSlugs) {
    const newSlug = BLOG_SLUG_REDIRECTS[oldSlug];
    pairs.push([`/blog/${oldSlug}/`, `/warzone-blog/${newSlug}/`]);
    pairs.push([`/blog/${oldSlug}`, `/warzone-blog/${newSlug}/`]);
    pairs.push([`'${oldSlug}'`, `'${newSlug}'`]);
    pairs.push([`"${oldSlug}"`, `"${newSlug}"`]);
  }

  // Forum thread URLs
  const forumOld = Object.keys(FORUM_SLUG_REDIRECTS).sort((a, b) => b.length - a.length);
  for (const oldSlug of forumOld) {
    const newSlug = FORUM_SLUG_REDIRECTS[oldSlug];
    pairs.push([`/forum/${oldSlug}/`, `/warzone-forum/${newSlug}/`]);
    pairs.push([`/forum/${oldSlug}`, `/warzone-forum/${newSlug}/`]);
  }

  pairs.push(...SITE_PATH_REPLACEMENTS);

  // Top-level site paths (after blog/forum post paths)
  pairs.push(['/blog/', '/warzone-blog/']);
  pairs.push(['/forum/', '/warzone-forum/']);
  pairs.push(['/faq/', '/warzone-faq/']);
  pairs.push(['/support/', '/warzone-support/']);
  pairs.push(['/about/', '/warzone-about/']);
  pairs.push(['/privacy/', '/warzone-privacy/']);
  pairs.push(['/terms/', '/warzone-terms/']);

  pairs.push(["product.slug !== 'elite'", "product.slug !== 'aimbot-esp'"]);
  pairs.push(["? ['elite']", "? ['aimbot-esp']"]);
  pairs.push(['`${productHub.path}elite/`', '`${productHub.path}aimbot-esp/`']);

  return pairs;
}

function patchProductsFile(text) {
  const renames = [
    [/export const productRelatedBlogSlugs[\s\S]*?\n  elite: \[/m, (m) => m.replace('  elite: [', "  'aimbot-esp': [")],
    [/const tierAbout[\s\S]*?\n  elite: \[/m, (m) => m.replace(/\n  elite: \[/, "\n  'aimbot-esp': [")],
    [/const tierBodies[\s\S]*?\n  elite: \[/m, (m) => m.replace(/\n  elite: \[/, "\n  'aimbot-esp': [")],
    [/const productContent[\s\S]*?\n  elite: \{/m, (m) => m.replace(/\n  elite: \{/, "\n  'aimbot-esp': {")],
    [/case 'elite':/g, "case 'aimbot-esp':"],
    [/\$\{productBase\}elite\//g, '${productBase}aimbot-esp/'],
  ];
  let out = text;
  for (const [re, repl] of renames) {
    out = typeof repl === 'function' ? out.replace(re, repl) : out.replace(re, repl);
  }
  return out;
}

const files = walk(path.join(ROOT, 'src')).concat(
  path.join(ROOT, 'astro.config.mjs'),
  path.join(ROOT, 'scripts', 'redirects.mjs'),
  path.join(ROOT, 'functions', '_middleware.js'),
);

const pairs = buildReplacementPairs();
let changed = 0;

const SKIP_FILES = new Set([
  path.join(ROOT, 'src', 'config', 'slug-map.ts'),
  path.join(ROOT, 'scripts', 'slug-redirect-pairs.mjs'),
]);

for (const file of files) {
  if (!fs.existsSync(file) || SKIP_FILES.has(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  text = replaceAll(text, pairs);
  if (file.endsWith('products.ts')) text = patchProductsFile(text);
  if (text !== before) {
    fs.writeFileSync(file, text);
    changed++;
    console.log('updated', path.relative(ROOT, file));
  }
}

console.log(`\nDone. ${changed} files updated.`);
