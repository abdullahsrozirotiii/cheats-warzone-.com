import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

/** New slug → original asset basename under /images/blog/ */
const IMAGE_BY_SLUG = {
  'cheats-features': 'warzone-cheats-features.jpeg',
  'ricochet-safety': 'warzone-ricochet-safety.jpeg',
  'esp-aimbot': 'warzone-esp-aimbot.jpeg',
  'cheat-settings': 'warzone-cheat-settings.jpg',
  'warzone-esp': 'warzone-esp-guide.jpeg',
  'wallhack-esp': 'warzone-wallhack-vs-esp.jpg',
  'aimbot-fov': 'warzone-aimbot-fov-smooth.jpg',
  'silent-aim': 'warzone-silent-aim-explained.jpg',
  'triggerbot-aimbot': 'warzone-triggerbot-vs-aimbot.jpeg',
  'esp-colors': 'warzone-esp-colors-distance.jpeg',
  'undetected-cheats': 'warzone-cheat-undetected-status.jpeg',
  'warzone-radar': 'warzone-radar-hack-guide.jpeg',
  'recoil-aimbot': 'warzone-recoil-script-aimbot.jpeg',
  'anticheat-faq': 'warzone-ricochet-safety.jpeg',
  'get-cheats': 'warzone-cheats-features.jpeg',
  'console-cheats': 'warzone-esp-guide.jpeg',
  'warzone-codes': 'warzone-cheat-undetected-status.jpeg',
};

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(ts|astro|mjs)$/.test(name)) files.push(full);
  }
  return files;
}

for (const file of walk(path.join(ROOT, 'src'))) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  text = text.replace(/\/images\/warzone-blog\//g, '/images/blog/');
  text = text.replace(/\/images\/blog\/[^'"]+\/\.(jpe?g|png|webp|avif)/gi, (bad) => bad); // noop marker
  for (const [slug, basename] of Object.entries(IMAGE_BY_SLUG)) {
    const img = `/images/blog/${basename}`;
    text = text.replace(
      new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?image:\\s*)'[^']+'`, 'g'),
      `$1'${img}'`,
    );
  }
  if (text !== before) fs.writeFileSync(file, text);
}

// Fix blog.ts module paths
const blogTs = path.join(ROOT, 'src', 'data', 'blog.ts');
let blog = fs.readFileSync(blogTs, 'utf8');
blog = blog.replace(/\.\/warzone-blog\//g, './blog/');
fs.writeFileSync(blogTs, blog);

console.log('Fixed blog image paths and blog.ts imports.');
