import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

/** Display slots up to 2x retina for common layouts + full-bleed hero. */
const widths = [320, 400, 512, 640, 960, 1280, 1920];

const dirs = ['public/images', 'public/images/gameplay', 'public/images/blog', 'public/images/products'];

async function safeToFile(sharpPipeline, dest) {
  const tmp = `${dest}.tmp`;
  await sharpPipeline.toFile(tmp);
  fs.rmSync(dest, { force: true });
  fs.renameSync(tmp, dest);
}

/**
 * Top-tier look + instant loads:
 * - AVIF (primary): cq 80 ≈ photographic “visually lossless”, typically ~5–10× smaller than q100 WebP
 * - WebP (fallback): q 92 + max effort — sharp at display sizes, Safari-safe
 * - Tiny LQIP placeholder for zero-delay first paint while full image streams in
 */
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
    // Hero/full-bleed backgrounds can use slightly stronger compression (LCP-critical).
    const isHeroBg = /herobackground|bloghero/i.test(baseName);
    const webpQuality = isHeroBg ? 62 : 82;
    const avifQuality = isHeroBg ? 45 : 68;

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

    const avifOut = path.join(baseDir, `${baseName}-${width}.avif`);
    await safeToFile(
      pipeline().avif({ quality: avifQuality, effort: 7, chromaSubsampling: '4:2:0' }),
      avifOut,
    );

    const webpBytes = fs.statSync(webpOut).size;
    const avifBytes = fs.statSync(avifOut).size;
    if (avifBytes >= webpBytes * 0.95) {
      fs.unlinkSync(avifOut);
      console.log(`Skipped AVIF ${path.relative(root, avifOut)} (not smaller than WebP)`);
    } else {
      console.log(
        `Wrote ${path.relative(root, avifOut)} (${Math.round((1 - avifBytes / webpBytes) * 100)}% smaller)`,
      );
    }
  }
}

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((file) => /\.(png|jpe?g)$/i.test(file) && !/-\d+\.(webp|avif)$/i.test(file));

  // Prefer PNG when the same basename exists as JPEG (avoids overwriting variants).
  const byBase = new Map();
  for (const file of files) {
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    const prev = byBase.get(base);
    if (!prev || /\.png$/i.test(file)) byBase.set(base, file);
  }

  for (const file of byBase.values()) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    await writeVariants(input, dir, base);
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete (WebP q92 + smart AVIF + LQIP).');
