import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

/** Display slots up to 2x retina for common layouts (skip 1920 — not referenced). */
const widths = [320, 400, 512, 640, 960, 1280];

const outputDirs = ['public/images', 'public/images/blog', 'public/images/products'];

/** Master JPEG/PNG live outside `public/` so they are not deployed. */
const masterDirs = [
  { in: 'media-masters/images', out: 'public/images' },
  { in: 'media-masters/images/blog', out: 'public/images/blog' },
  { in: 'media-masters/images/products', out: 'public/images/products' },
  // Legacy: still accept masters sitting in public until migrated.
  { in: 'public/images', out: 'public/images' },
  { in: 'public/images/blog', out: 'public/images/blog' },
  { in: 'public/images/products', out: 'public/images/products' },
];

async function safeToFile(sharpPipeline, dest) {
  const tmp = `${dest}.tmp`;
  await sharpPipeline.toFile(tmp);
  fs.rmSync(dest, { force: true });
  fs.renameSync(tmp, dest);
}

async function writeVariants(input, baseDir, baseName) {
  const placeholderOut = path.join(baseDir, `${baseName}-placeholder.webp`);
  await safeToFile(
    sharp(input, { failOn: 'none' })
      .resize({ width: 32, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
      .blur(1)
      .webp({ quality: 50, effort: 4 }),
    placeholderOut,
  );
  console.log(`Wrote ${path.relative(root, placeholderOut)}`);

  for (const width of widths) {
    const pipeline = () =>
      sharp(input, { failOn: 'none' }).resize({
        width,
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      });

    const webpOut = path.join(baseDir, `${baseName}-${width}.webp`);
    const isHeroBg = /herobackground|bloghero/i.test(baseName);
    const webpQuality = isHeroBg ? 62 : 82;

    await safeToFile(
      pipeline().webp({
        quality: webpQuality,
        alphaQuality: 100,
        effort: 6,
        smartSubsample: true,
      }),
      webpOut,
    );
    console.log(`Wrote ${path.relative(root, webpOut)}`);
  }
}

async function optimizeFromMasters(masterRelative, outRelative) {
  const masterDir = path.join(root, masterRelative);
  if (!fs.existsSync(masterDir)) return;

  const outDir = path.join(root, outRelative);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs
    .readdirSync(masterDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((file) => /\.(png|jpe?g)$/i.test(file) && !/-\d+\.(webp|avif)$/i.test(file));

  const byBase = new Map();
  for (const file of files) {
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    const prev = byBase.get(base);
    if (!prev || /\.png$/i.test(file)) byBase.set(base, file);
  }

  for (const file of byBase.values()) {
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    if (/(^|\b)(bloghero|herobackground)$/i.test(base)) continue;

    const input = path.join(masterDir, file);
    await writeVariants(input, outDir, base);
  }
}

for (const { in: masterRelative, out: outRelative } of masterDirs) {
  await optimizeFromMasters(masterRelative, outRelative);
}

/** Remove deploy-only cruft (AVIF, unused hero masters, 1920px slots). */
function prunePublicArtifacts() {
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (
        /\.avif$/i.test(entry.name) ||
        /-1920\.webp$/i.test(entry.name) ||
        /^(bloghero|herobackground)/i.test(entry.name)
      ) {
        fs.rmSync(full, { force: true });
      }
    }
  }
  for (const relative of outputDirs) {
    walk(path.join(root, relative));
  }
}

prunePublicArtifacts();
console.log('Image optimization complete (WebP + LQIP only).');
