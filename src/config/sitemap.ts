import fs from 'node:fs';
import path from 'node:path';
import type { SitemapItem } from '@astrojs/sitemap';
import { blogPosts } from '../data/blog';
import { parseBlogDate } from '../utils/schema';
import { FULL_LOCALES } from '../i18n/locales';

const root = process.cwd();

const blogLastmod = new Map(
  blogPosts.flatMap((post) => {
    const iso = parseBlogDate(post.date);
    const enPath = `/warzone-blog/${post.slug}/`;
    return [
      [enPath, iso] as const,
      ...FULL_LOCALES.map((locale) => [`/${locale}${enPath}`, iso] as const),
    ];
  }),
);

const localeCodes = new Set<string>(FULL_LOCALES);

function canonicalPathname(pathname: string): string {
  let path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && localeCodes.has(segments[0]!)) {
    const rest = segments.slice(1);
    path = rest.length ? `/${rest.join('/')}/` : '/';
  }
  return path;
}

/** Map canonical paths to primary source files for stable per-URL lastmod. */
const routeSourceFiles: Record<string, string> = {
  '/': 'src/pages/index.astro',
  '/warzone-blog/': 'src/pages/warzone-blog/index.astro',
  '/warzone-forum/': 'src/pages/warzone-forum/index.astro',
  '/warzone-faq/': 'src/pages/warzone-faq.astro',
  '/warzone-about/': 'src/pages/warzone-about.astro',
  '/warzone-support/': 'src/pages/warzone-support.astro',
  '/warzone-reviews/': 'src/pages/warzone-reviews.astro',
  '/warzone-privacy/': 'src/pages/warzone-privacy.astro',
  '/warzone-terms/': 'src/pages/warzone-terms.astro',
  '/products/warzone-cheats/': 'src/pages/products/warzone-cheats/index.astro',
  '/products/warzone-cheats/aimbot-esp/': 'src/pages/products/warzone-cheats/[slug].astro',
};

const sharedLastmod = (() => {
  const files = ['src/data/products.ts', 'src/i18n/en.ts', 'src/config/pageSeo.ts'];
  let latest = 0;
  for (const rel of files) {
    try {
      latest = Math.max(latest, fs.statSync(path.join(root, rel)).mtimeMs);
    } catch {
      /* optional paths */
    }
  }
  return new Date(latest || Date.now()).toISOString();
})();

function lastmodForPath(pathname: string): string {
  const canonical = canonicalPathname(pathname);
  if (blogLastmod.has(pathname)) return blogLastmod.get(pathname)!;
  if (blogLastmod.has(canonical)) return blogLastmod.get(canonical)!;
  const rel = routeSourceFiles[canonical] ?? routeSourceFiles[pathname];
  if (rel) {
    try {
      return fs.statSync(path.join(root, rel)).mtime.toISOString();
    } catch {
      /* fall through */
    }
  }
  if (canonical.startsWith('/products/')) {
    try {
      return fs.statSync(path.join(root, 'src/data/products.ts')).mtime.toISOString();
    } catch {
      return sharedLastmod;
    }
  }
  if (canonical.startsWith('/warzone-forum/')) {
    try {
      return fs.statSync(path.join(root, 'src/data/forum.ts')).mtime.toISOString();
    } catch {
      return sharedLastmod;
    }
  }
  return sharedLastmod;
}

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (path.includes('/404') || path.startsWith('/go/') || path.includes('/rss.xml')) {
    return undefined;
  }

  item.lastmod = lastmodForPath(path);

  if (path === '/') {
    item.priority = 1;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/warzone-blog/') {
    item.priority = 0.9;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/warzone-forum/') {
    item.priority = 0.8;
    item.changefreq = 'daily';
    return item;
  }

  if (path.startsWith('/warzone-forum/')) {
    item.priority = 0.6;
    item.changefreq = 'weekly';
    return item;
  }

  if (path.startsWith('/warzone-blog/')) {
    item.priority = 0.7;
    item.changefreq = 'monthly';
    return item;
  }

  if (path === '/products/warzone-cheats/') {
    item.priority = 0.95;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/products/warzone-cheats/aimbot-esp/') {
    item.priority = 0.9;
    item.changefreq = 'weekly';
    return item;
  }

  if (path.startsWith('/products/')) {
    item.priority = 0.8;
    item.changefreq = 'weekly';
    return item;
  }

  if (
    path === '/warzone-about/' ||
    path === '/warzone-support/' ||
    path === '/warzone-privacy/' ||
    path === '/warzone-terms/' ||
    path === '/warzone-faq/'
  ) {
    item.priority = 0.5;
    item.changefreq = 'yearly';
    return item;
  }

  item.priority = 0.6;
  item.changefreq = 'monthly';
  return item;
}
