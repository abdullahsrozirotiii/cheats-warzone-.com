import { getImage } from 'astro:assets';
import { resolveLocalImage } from './imageAssets';
import { HERO_BG_QUALITY, IMAGE_QUALITY } from './optimizedImage';
import {
  avifSrc,
  defaultWebpSrc,
  publicAssetExists,
  responsiveAvifSrcSet,
  responsiveSrcSet,
} from './responsiveImage';

export interface ImagePreload {
  href: string;
  type: 'image/avif' | 'image/webp' | 'image/jpeg' | 'image/png';
  imagesrcset?: string;
  imagesizes?: string;
}

/**
 * Build a matching `<link rel="preload">` for the optimized image the page will paint.
 * Prefers astro:assets output when the source lives under src/assets.
 */
export async function buildImagePreload(
  publicSrc: string,
  widths: readonly number[],
  sizes: string,
  preferredWidth?: number,
): Promise<ImagePreload | null> {
  const asset = resolveLocalImage(publicSrc);
  const width = preferredWidth ?? widths[Math.min(1, widths.length - 1)] ?? widths[0] ?? 640;

  if (asset) {
    const entries = await Promise.all(
      widths.map(async (w) => {
        const isHeroBg = /herobackground|bloghero/i.test(publicSrc);
        const img = await getImage({
          src: asset,
          width: w,
          format: 'avif',
          quality: isHeroBg ? HERO_BG_QUALITY : IMAGE_QUALITY,
        });
        return { w, src: img.src };
      }),
    );
    const preferred = entries.find((e) => e.w === width) ?? entries[entries.length - 1] ?? entries[0];
    if (!preferred) return null;
    return {
      href: preferred.src,
      type: 'image/avif',
      imagesrcset: entries.map((e) => `${e.src} ${e.w}w`).join(', '),
      imagesizes: sizes,
    };
  }

  const avifSet = responsiveAvifSrcSet(publicSrc, widths);
  if (avifSet) {
    const href = avifSrc(publicSrc, width);
    if (publicAssetExists(href)) {
      return { href, type: 'image/avif', imagesrcset: avifSet, imagesizes: sizes };
    }
  }

  const webpSet = responsiveSrcSet(publicSrc, widths, 'webp');
  const href = defaultWebpSrc(publicSrc, widths);
  if (!publicAssetExists(href) && !webpSet) return null;
  return {
    href,
    type: 'image/webp',
    imagesrcset: webpSet,
    imagesizes: sizes,
  };
}
