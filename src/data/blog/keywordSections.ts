import type { BlogBlock } from './types';

/** Slug-specific keyword clusters disabled after editorial blog refresh. */
export function getKeywordBlocksForSlug(_slug: string): BlogBlock[] {
  return [];
}
