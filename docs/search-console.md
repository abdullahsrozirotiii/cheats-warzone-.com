# Search Console workflow (cheats-warzone.com)

## Domain & canonicals

1. Deploy the site (e.g. Cloudflare Pages).
2. When ready, add `cheats-warzone.com` (and optionally `www`) in **Pages → Custom domains**. Let Cloudflare manage TLS.
3. Prefer the canonical host `cheats-warzone.com`. Set a single **www → cheats-warzone.com** 301 (never both directions). See `npm run cf:www-redirect` or [Cloudflare’s www redirect guide](https://developers.cloudflare.com/pages/how-to/www-redirect/).
4. Leave build env unset for production so canonicals/sitemap use `https://cheats-warzone.com`. Optional: set `PUBLIC_SITE_URL` only on preview builds if you want preview-specific tags.
5. After DNS is live, submit `https://cheats-warzone.com/sitemap.xml` in Search Console.

## Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `cheats-warzone.com` if it is not already there.
2. Under **Sitemaps**, submit: `https://cheats-warzone.com/sitemap.xml`
