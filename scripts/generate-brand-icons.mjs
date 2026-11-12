import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const faviconJpg = path.join(root, 'favicon.jpg');
const logoSvg = path.join(publicDir, 'logo.svg');

function input() {
  if (fs.existsSync(faviconJpg)) {
    return sharp(faviconJpg, { failOn: 'none' });
  }
  return sharp(fs.readFileSync(logoSvg));
}

await input().resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
await input().resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'));
await input().resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16.png'));
await input().resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));

console.log('Brand icons generated: apple-touch-icon.png, favicon.ico, favicon-16/32.png');
