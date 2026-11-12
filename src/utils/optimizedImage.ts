import { getImage } from 'astro:assets';
import { resolveLocalImage } from './imageAssets';
import {
  avifSrc,
  defaultWebpSrc,
  hasPublicModernVariants,
  publicAssetExists,
  responsiveAvifSrcSet,
  responsiveSrcSet,
  webpSrc,
} from './responsiveImage';

/** Default stills (cards, gallery). */
export const IMAGE_QUALITY = 72;
/** Blog article heroes — sharper encode; srcset keeps mobile light. */
export const BLOG_HERO_QUALITY = 85;
/** Full-bleed LCP backgrounds — stronger compression for Speed Index. */
export const HERO_BG_QUALITY = 48;
/** Small UI logos. */
export const LOGO_QUALITY = 80;

export interface OptimizedSources {
  avifSrcSet?: string;
  webpSrcSet?: string;
  /** Preferred `<img src>` (smallest WebP or Astro WebP). */
  imgSrc: string;
  /** Original public path fallback. */
  fallbackSrc: string;
}

/**
 * Build AVIF/WebP srcsets for a public path.
 * Prefers astro:assets when the file exists under `src/assets`.
 */
export async function buildOptimizedSources(
  publicSrc: string,
  widths: readonly number[],
): Promise<OptimizedSources> {
  if (hasPublicModernVariants(publicSrc, widths)) {
    const avifSrcSet = responsiveAvifSrcSet(publicSrc, widths);
    const webpSrcSet = responsiveSrcSet(publicSrc, widths, 'webp');
    const imgSrc = defaultWebpSrc(publicSrc, widths);
    return {
      avifSrcSet,
      webpSrcSet,
      imgSrc,
      fallbackSrc: imgSrc,
    };
  }

  const asset = resolveLocalImage(publicSrc);

  if (asset) {
    const avifEntries = await Promise.all(
      widths.map(async (w) => {
        const img = await getImage({
          src: asset,
          width: w,
          format: 'avif',
          quality: IMAGE_QUALITY,
        });
        return { w, src: img.src };
      }),
    );
    const webpEntries = await Promise.all(
      widths.map(async (w) => {
        const img = await getImage({
          src: asset,
          width: w,
          format: 'webp',
          quality: IMAGE_QUALITY,
        });
        return { w, src: img.src };
      }),
    );

    const smallestWebp = webpEntries[0] ?? webpEntries[webpEntries.length - 1];
    const imgSrc = smallestWebp?.src ?? defaultWebpSrc(publicSrc, widths);
    return {
      avifSrcSet: avifEntries.map((e) => `${e.src} ${e.w}w`).join(', '),
      webpSrcSet: webpEntries.map((e) => `${e.src} ${e.w}w`).join(', '),
      imgSrc,
      fallbackSrc: imgSrc,
    };
  }

  const avifSrcSet = responsiveAvifSrcSet(publicSrc, widths);
  const webpSrcSet = responsiveSrcSet(publicSrc, widths, 'webp');
  const imgSrc = defaultWebpSrc(publicSrc, widths);
  return {
    avifSrcSet,
    webpSrcSet,
    imgSrc,
    fallbackSrc: imgSrc,
  };
}

/** Synchronous public-folder fallback (no astro:assets). */
export function buildPublicSources(
  publicSrc: string,
  widths: readonly number[],
): OptimizedSources {
  const imgSrc = defaultWebpSrc(publicSrc, widths);
  return {
    avifSrcSet: responsiveAvifSrcSet(publicSrc, widths),
    webpSrcSet: responsiveSrcSet(publicSrc, widths, 'webp'),
    imgSrc,
    fallbackSrc: imgSrc,
  };
}

export function webpVariantExists(publicSrc: string, width: number): boolean {
  return publicAssetExists(webpSrc(publicSrc, width));
}

export function avifVariantExists(publicSrc: string, width: number): boolean {
  return publicAssetExists(avifSrc(publicSrc, width));
}
