import fs from 'node:fs';
import sharp from 'sharp';
import path from 'node:path';

const outDir = path.join('public/images/brand');
const pngMaster = path.join(outDir, 'warzone-logo.png');
const webpMaster = path.join(outDir, 'warzone-logo-480.webp');
const inPath = fs.existsSync(pngMaster) ? pngMaster : webpMaster;

if (!fs.existsSync(inPath)) {
  console.log('Brand logo: no warzone-logo.png or warzone-logo-480.webp — skip.');
  process.exit(0);
}

for (const w of [240, 480]) {
  const out = path.join(outDir, `warzone-logo-${w}.webp`);
  if (path.resolve(inPath) === path.resolve(out)) {
    console.log(`Keep ${path.relative(process.cwd(), out)} (source master).`);
    continue;
  }
  await sharp(inPath)
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(out);
  console.log('Wrote', out);
}
