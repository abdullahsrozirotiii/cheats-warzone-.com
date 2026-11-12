import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
/** Production: https://cheats-warzone.com. Preview: set PUBLIC_SITE_URL / SITE to the *.pages.dev URL. */
const site = (process.env.PUBLIC_SITE_URL || process.env.SITE || 'https://cheats-warzone.com').replace(
  /\/+$/,
  '',
);

export default defineConfig({
  site,
  trailingSlash: 'always',
  redirects: {
    '/products/': '/products/warzone-cheats/',
    '/cheats/': '/products/warzone-cheats/',
    '/cheats/lite/': '/products/warzone-cheats/aimbot-esp/',
    '/cheats/pro/': '/products/warzone-cheats/aimbot-esp/',
    '/cheats/elite/': '/products/warzone-cheats/aimbot-esp/',
    '/cheats/compare/': '/warzone-blog/cheats-features/',
    '/products/warzone-cheats/lite/': '/products/warzone-cheats/aimbot-esp/',
    '/products/warzone-cheats/pro/': '/products/warzone-cheats/aimbot-esp/',
    '/products/warzone-cheats/skin-changer/': '/products/warzone-cheats/unlock-all/',
    '/products/warzone-cheats/utilities/': '/products/warzone-cheats/',
    '/products/warzone-cheats/account-recovery/': '/products/warzone-cheats/aimbot-esp/',
    '/contact/': '/warzone-support/',
    '/go/warzone/': 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fwarzone',
    '/go/skin-changer/': 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fskin-changer',
    '/go/ugc/': 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fugc',
    '/go/hwid-spoofer/': 'https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fhwid-spoofer',
    // Slug migrations (/blog/*, old warzone-blog slugs, etc.) → functions/_middleware.js only.
  },
  compressHTML: true,
  prefetch: false,
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      assetsInlineLimit: 0,
    },
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
});
