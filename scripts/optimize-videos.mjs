import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const videosDir = path.join(root, 'public', 'videos');
const postersDir = path.join(root, 'public', 'images', 'posters');

const targets = [
  { file: 'blog-hero.mp4', poster: 'blog-hero-poster', maxHeight: 720 },
];

function findFfmpeg() {
  const candidates = ['ffmpeg', 'ffmpeg.exe'];
  for (const bin of candidates) {
    const probe = spawnSync(bin, ['-version'], { encoding: 'utf8' });
    if (probe.status === 0) return bin;
  }
  return null;
}

function run(bin, args) {
  const result = spawnSync(bin, args, { encoding: 'utf8' });
  if (resultStatus(result) !== 0) {
    throw new Error(result.stderr || result.stdout || `ffmpeg failed: ${args.join(' ')}`);
  }
}

function resultStatus(result) {
  return typeof result.status === 'number' ? result.status : 1;
}

async function safeToFile(sharpPipeline, dest) {
  const tmp = `${dest}.tmp`;
  await sharpPipeline.toFile(tmp);
  fs.rmSync(dest, { force: true });
  fs.renameSync(tmp, dest);
}

async function writePosterFromFrame(framePath, outBase) {
  fs.mkdirSync(postersDir, { recursive: true });
  const webpOut = path.join(postersDir, `${outBase}.webp`);
  const placeholderOut = path.join(postersDir, `${outBase}-placeholder.webp`);

  await safeToFile(
    sharp(framePath, { failOn: 'none' })
      .resize({ width: 1280, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 92, effort: 6, smartSubsample: true }),
    webpOut,
  );

  await safeToFile(
    sharp(framePath, { failOn: 'none' })
      .resize({ width: 48, withoutEnlargement: true })
      .blur(1)
      .webp({ quality: 55, effort: 4 }),
    placeholderOut,
  );

  console.log(`Wrote ${path.relative(root, webpOut)}`);
  console.log(`Wrote ${path.relative(root, placeholderOut)}`);
}

async function fallbackPosters() {
  // No ffmpeg: use existing stills so videos never show a blank hole.
  const fallbacks = [{ src: 'public/images/herobackground-1280.webp', poster: 'blog-hero-poster' }];
  fs.mkdirSync(postersDir, { recursive: true });
  for (const item of fallbacks) {
    const input = path.join(root, item.src);
    if (!fs.existsSync(input)) continue;
    await writePosterFromFrame(input, item.poster);
  }
}

async function main() {
  if (!fs.existsSync(videosDir)) {
    console.log('No public/videos directory — skip.');
    return;
  }

  const ffmpeg = findFfmpeg();
  if (!ffmpeg) {
    console.warn('ffmpeg not found — writing still posters only (videos unchanged).');
    await fallbackPosters();
    return;
  }

  const tmpDir = path.join(root, '.tmp-video-opt');
  fs.mkdirSync(tmpDir, { recursive: true });

  for (const target of targets) {
    const input = path.join(videosDir, target.file);
    if (!fs.existsSync(input)) continue;

    const frame = path.join(tmpDir, `${target.poster}.jpg`);
    run(ffmpeg, [
      '-y',
      '-ss',
      '0.4',
      '-i',
      input,
      '-frames:v',
      '1',
      '-q:v',
      '2',
      frame,
    ]);
    await writePosterFromFrame(frame, target.poster);

    const optimized = path.join(tmpDir, target.file);
    // High-quality H.264 (CRF 20 ≈ visually lossless on web), faststart for instant start.
    run(ffmpeg, [
      '-y',
      '-i',
      input,
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '20',
      '-profile:v',
      'high',
      '-pix_fmt',
      'yuv420p',
      '-vf',
      `scale=-2:'min(${target.maxHeight},ih)'`,
      '-an',
      '-movflags',
      '+faststart',
      optimized,
    ]);

    const webmOut = path.join(tmpDir, target.file.replace(/\.mp4$/i, '.webm'));
    run(ffmpeg, [
      '-y',
      '-i',
      input,
      '-c:v',
      'libvpx-vp9',
      '-b:v',
      '0',
      '-crf',
      '32',
      '-row-mt',
      '1',
      '-vf',
      `scale=-2:'min(${target.maxHeight},ih)'`,
      '-an',
      webmOut,
    ]);

    const before = fs.statSync(input).size;
    const after = fs.statSync(optimized).size;
    if (after < before * 0.98) {
      fs.copyFileSync(optimized, input);
      console.log(
        `Optimized ${target.file}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB`,
      );
    } else {
      console.log(`Kept original ${target.file} (re-encode not smaller).`);
    }

    if (fs.existsSync(webmOut)) {
      const webmDest = path.join(videosDir, target.file.replace(/\.mp4$/i, '.webm'));
      const webmBytes = fs.statSync(webmOut).size;
      const mp4Bytes = fs.statSync(input).size;
      if (webmBytes < mp4Bytes * 0.9) {
        fs.copyFileSync(webmOut, webmDest);
        console.log(
          `Wrote ${path.relative(root, webmDest)} (${(webmBytes / 1024 / 1024).toFixed(2)}MB)`,
        );
      }
    }
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('Video optimization complete.');
}

await main();
