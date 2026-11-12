import type { BlogPostFull } from './types';

/** Slugs with full editorial bodies — skip auto-appended SEO boilerplate. */
const FULL_EDITORIAL_SLUGS = new Set([
  'cheats-features',
  'ricochet-safety',
  'esp-aimbot',
  'cheat-settings',
  'warzone-esp',
  'wallhack-esp',
  'aimbot-fov',
  'silent-aim',
  'triggerbot-aimbot',
  'esp-colors',
  'undetected-cheats',
  'warzone-radar',
  'recoil-aimbot',
  'anticheat-faq',
  'get-cheats',
  'console-cheats',
  'warzone-codes',
]);

export function expandBlogPost(post: BlogPostFull): BlogPostFull {
  if (FULL_EDITORIAL_SLUGS.has(post.slug)) {
    return post;
  }
  return post;
}
