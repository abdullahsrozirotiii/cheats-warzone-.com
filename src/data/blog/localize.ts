import type { LocaleCode } from '../../i18n/locales';
import type { BlogPostFull } from './types';

export function localizeBlogPost(post: BlogPostFull, _locale: LocaleCode = 'en'): BlogPostFull {
  return post;
}

export function localizeBlogPosts(posts: BlogPostFull[], _locale: LocaleCode = 'en'): BlogPostFull[] {
  return posts;
}
