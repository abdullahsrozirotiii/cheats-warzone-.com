import type { ImageMetadata } from 'astro';

/**
 * Local images under src/assets for astro:assets Picture/Image optimization.
 * Public path `/images/foo.jpg` maps to `src/assets/images/foo.jpg`.
 */
const assetModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpeg,jpg,png,webp,gif}',
  { eager: true },
);

const byPublicPath = new Map<string, ImageMetadata>();

for (const [modulePath, mod] of Object.entries(assetModules)) {
  const meta = mod.default;
  if (!meta) continue;

  const normalized = modulePath.replace(/\\/g, '/');
  const assetsIdx = normalized.indexOf('/src/assets/');
  if (assetsIdx === -1) continue;

  const relative = normalized.slice(assetsIdx + '/src/assets/'.length);
  // images/foo.jpg → /images/foo.jpg ; logo.png → /logo.png
  byPublicPath.set(`/${relative}`, meta);
  if (relative.startsWith('images/')) {
    byPublicPath.set(`/${relative}`, meta);
  }
}

/** Normalize `/images/foo.jpg` or `images/foo.jpg` to a map key. */
function normalizePublicSrc(src: string): string {
  if (!src) return src;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
  return src.startsWith('/') ? src : `/${src}`;
}

/** Resolve a site public path to an Astro ImageMetadata import when available. */
export function resolveLocalImage(src: string): ImageMetadata | undefined {
  const key = normalizePublicSrc(src);
  return byPublicPath.get(key);
}
