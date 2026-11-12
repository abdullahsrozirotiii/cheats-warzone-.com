import fs from 'node:fs';
import path from 'node:path';

/**
 * Drop heavy source JPEG/PNG from dist when responsive WebP/AVIF variants exist.
 * Keeps small brand assets; never deletes the sized *-N.webp / *-N.avif files.
 */
const distImages = path.resolve('dist/images');
let removed = 0;
let bytes = 0;

function hasSizedVariants(dir, base) {
  return (
    fs.existsSync(path.join(dir, `${base}-640.webp`)) ||
    fs.existsSync(path.join(dir, `${base}-960.webp`)) ||
    fs.existsSync(path.join(dir, `${base}-1280.webp`))
  );
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    if (/-\d+\.(png|jpe?g)$/i.test(entry.name)) continue;

    // Keep hero + product preview originals — pages reference these paths directly.
    if (
      /^(herobackground|bloghero|aimbotproduct|playerproduct|gadegtespproduct|misc|producthome|product-bots-esp|product-keybinds|product-config|product-skin-preview|product-colors)\.(png|jpe?g)$/i.test(
        entry.name,
      )
    ) {
      continue;
    }

    const base = entry.name.replace(/\.(png|jpe?g)$/i, '');
    if (!hasSizedVariants(dir, base)) continue;

    const stat = fs.statSync(full);
    // Keep tiny icons if any; prune everything that has webp siblings.
    if (stat.size < 12_000) continue;

    bytes += stat.size;
    fs.unlinkSync(full);
    removed += 1;
  }
}

walk(distImages);
console.log(
  `Pruned ${removed} source raster(s) from dist/images (${(bytes / 1024 / 1024).toFixed(1)} MB).`,
);
