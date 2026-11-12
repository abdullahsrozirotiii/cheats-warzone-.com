import type { LocaleCode } from '../../i18n/locales';
import type { ForumPost } from '../forum';

export function localizeForumPost(post: ForumPost, _locale: LocaleCode = 'en'): ForumPost {
  return post;
}

export function localizeForumPosts(posts: ForumPost[], _locale: LocaleCode = 'en'): ForumPost[] {
  return posts;
}
