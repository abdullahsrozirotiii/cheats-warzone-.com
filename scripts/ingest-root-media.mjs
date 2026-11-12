import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const imgDir = path.join(root, 'media-masters', 'images');
const assetsDir = path.join(root, 'media-masters', 'images');

const P = (name) => path.join(root, name);

const blogAssignments = [
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 0m22s].png'), 'blog/warzone-cheats-features.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 0m23s].png'), 'blog/warzone-ricochet-safety.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 0m33s].png'), 'blog/warzone-esp-aimbot.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 0m36s] (1).png'), 'blog/warzone-cheat-settings.jpg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 0m36s].png'), 'blog/warzone-esp-guide.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 0m42s] (1).png'), 'blog/warzone-wallhack-vs-esp.jpg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m00s].png'), 'blog/warzone-aimbot-fov-smooth.jpg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m01s] (1).png'), 'blog/warzone-silent-aim-explained.jpg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m03s].png'), 'blog/warzone-triggerbot-vs-aimbot.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m07s] (2).png'), 'blog/warzone-esp-colors-distance.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m15s].png'), 'blog/warzone-cheat-undetected-status.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m17s].png'), 'blog/warzone-radar-hack-guide.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m18s] (1).png'), 'blog/warzone-recoil-script-aimbot.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m18s] (2).png'), 'blog/warzone-anticheat-faq.jpeg'],
  [P('expurgogrind Joined Aug 15, 2008 - Warzone Cheats - I Used REAL Warzone CHEATS In 2026... (INSANE RESULTS) [-pyA-WUI-Og - 989x556 - 1m19s] (5).png'), 'blog/warzone-get-cheats.jpeg'],
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m29s].png'), 'blog/warzone-console-cheats.jpeg'],
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m44s] (4).png'), 'blog/warzone-warzone-codes.jpeg'],
];

const productAssignments = [
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 1m02s] (1).png'), 'aimbotproduct.jpeg'],
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m46s] (4).png'), 'playerproduct.jpg'],
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m57s].png'), 'gadegtespproduct.jpeg'],
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m58s] (4).png'), 'misc.jpeg'],
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m57s] (3).png'), 'producthome.jpg'],
  [P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m57s] (3).png'), 'product-keybinds.jpeg', { left: 0, top: 0, width: 494, height: 556 }],
];

async function writeMaster(input, relOut, crop) {
  if (!fs.existsSync(input)) {
    console.warn(`Skip missing: ${path.basename(input)}`);
    return;
  }
  const outPublic = path.join(imgDir, relOut);
  fs.mkdirSync(path.dirname(outPublic), { recursive: true });
  const tmpOut = `${outPublic}.tmp`;
  let pipeline = sharp(input, { failOn: 'none' });
  if (crop) {
    pipeline = pipeline.extract(crop);
  }
  const buffer = await pipeline.jpeg({ quality: 92, mozjpeg: true }).toBuffer();
  fs.writeFileSync(tmpOut, buffer);
  fs.rmSync(outPublic, { force: true });
  fs.renameSync(tmpOut, outPublic);
  const assetOut = path.join(assetsDir, relOut);
  fs.mkdirSync(path.dirname(assetOut), { recursive: true });
  const assetTmp = `${assetOut}.tmp`;
  fs.writeFileSync(assetTmp, buffer);
  fs.rmSync(assetOut, { force: true });
  fs.renameSync(assetTmp, assetOut);
  console.log(`Wrote ${relOut}`);
}

for (const [input, relOut] of blogAssignments) {
  await writeMaster(input, relOut);
}

for (const row of productAssignments) {
  const [input, relOut, crop] = row;
  await writeMaster(input, relOut, crop);
}

const imgPath = P('img.png');
await writeMaster(imgPath, 'product-bots-esp.jpeg', { left: 0, top: 0, width: 494, height: 556 });
await writeMaster(imgPath, 'product-config.jpeg', { left: 494, top: 0, width: 495, height: 556 });
await writeMaster(imgPath, 'product-skin-preview.jpeg', { left: 180, top: 60, width: 629, height: 420 });
await writeMaster(P('Rubicorn Igris - I Used The BEST Warzone Cheats On The Market...(SHOCKING REULTS) [VhEdTekhxKE - 989x556 - 0m46s] (4).png'), 'product-colors.jpeg', {
  left: 494,
  top: 0,
  width: 495,
  height: 556,
});

console.log('Ingest complete.');
