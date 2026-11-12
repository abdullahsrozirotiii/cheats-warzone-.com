import sharp from 'sharp';
import path from 'node:path';

const inPath = path.join('public/images/brand/warzone-logo.png');
const outDir = path.join('public/images/brand');

for (const w of [240, 480]) {
  const out = path.join(outDir, `warzone-logo-${w}.webp`);
  await sharp(inPath)
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(out);
  console.log('Wrote', out);
}
