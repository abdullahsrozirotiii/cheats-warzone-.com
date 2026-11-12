import fs from 'node:fs';
import sharp from 'sharp';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'public/images/brand');
const pngMaster = path.join(outDir, 'warzone-logo.png');
const webpMaster = path.join(outDir, 'warzone-logo-480.webp');
const inPath = fs.existsSync(pngMaster) ? pngMaster : webpMaster;

if (!fs.existsSync(inPath)) {
  console.log('Brand logo: no warzone-logo.png or warzone-logo-480.webp — skip.');
  process.exit(0);
}

async function safeToFile(pipeline, dest) {
  const tmp = `${dest}.tmp`;
  await pipeline.toFile(tmp);
  fs.rmSync(dest, { force: true });
  fs.renameSync(tmp, dest);
}

for (const w of [240, 480]) {
  const out = path.join(outDir, `warzone-logo-${w}.webp`);
  if (path.resolve(inPath) === path.resolve(out)) {
    console.log(`Keep ${path.relative(root, out)} (source master).`);
    continue;
  }
  await safeToFile(
    sharp(inPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 }),
    out,
  );
  console.log('Wrote', path.relative(root, out));
}
