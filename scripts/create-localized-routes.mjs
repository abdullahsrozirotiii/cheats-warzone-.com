import fs from 'node:fs';
import path from 'node:path';

// Reuse each English page component so layouts and behavior stay in sync.
const staticPages = ['index.astro', '404.astro', 'warzone-about.astro', 'warzone-faq.astro', 'warzone-privacy.astro', 'warzone-reviews.astro', 'warzone-support.astro', 'warzone-terms.astro', 'warzone-blog/index.astro', 'warzone-forum/index.astro', 'products/warzone-cheats/index.astro'];
const dynamicPages = [
  ['warzone-blog/[slug].astro', 'data/blog', 'getAllBlogSlugs', 'getAllBlogSlugs()'],
  ['products/warzone-cheats/[slug].astro', 'data/products', 'getAllProductSlugs', 'getAllProductSlugs()'],
  ['warzone-forum/[slug].astro', 'data/forum', 'forumPosts', 'forumPosts.map(post => post.slug)'],
];
const relative = (dir, file) => { const rel = path.relative(dir, file).replaceAll('\\', '/'); return rel.startsWith('.') ? rel : `./${rel}`; };
for (const [page, dataFile, name, slugs] of [...staticPages.map(page => [page]), ...dynamicPages]) {
  const target = path.join('src/pages/[lang]', page);
  const dir = path.dirname(target);
  fs.mkdirSync(dir, { recursive: true });
  const dataImport = dataFile ? `import { ${name} } from '${relative(dir, `src/${dataFile}`)}';\n` : '';
  const paths = dataFile ? `nativeStaticPaths(${slugs})` : 'nativeStaticPaths()';
  fs.writeFileSync(target, `---\nimport Page from '${relative(dir, `src/pages/${page}`)}';\nimport { nativeStaticPaths } from '${relative(dir, 'src/i18n/routing')}';\n${dataImport}\nexport function getStaticPaths() {\n  return ${paths};\n}\n---\n<Page />\n`);
}
console.log('Created shared localized page routes.');
