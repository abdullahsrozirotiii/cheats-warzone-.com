# Cloudflare Pages — cheats-warzone.com

## Build settings

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repo root) |
| Node.js version | **22.12** or newer (see `package.json` `engines`) |

## What ships

- **`dist/`** — static site from Astro
- **`functions/`** — required; `_middleware.js` handles www→apex, checkout `/go/*`, and legacy path redirects (Pages skips `_redirects` when Functions run — middleware mirrors checkout redirects)

## Environment variables (production)

| Variable | When to set |
|----------|-------------|
| `PUBLIC_SITE_URL` | Optional if defaults in code are `https://cheats-warzone.com`; set on preview branches to `https://<branch>.pages.dev` |
| `INDEXNOW_KEY` | Optional; enables `scripts/indexnow.mjs` post-build ping |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics |

Do **not** configure redirects from `cheatswarzone.net` to this domain unless you add that separately in DNS/Bulk Redirects.

## Custom domain

1. Pages → **Custom domains** → add `cheats-warzone.com`
2. Add `www.cheats-warzone.com` (middleware 301 → apex)
3. DNS: proxied (orange cloud), SSL **Full**

Optional backup for www: `SITE_DOMAIN=cheats-warzone.com npm run cf:www-redirect` (see `scripts/cloudflare-www-redirect.mjs`).

## Local production preview

```bash
npm run build
npm start
```

Opens `http://localhost:3000` serving `dist/` with gzip/brotli and redirect behavior similar to production.

## Checkout affiliate

All buy CTAs and `/go/warzone/` resolve to:

`https://zadeyo.com/go/ABDULLAH?to=%2Fproducts%2Fwarzone`

Configured in `src/config/checkout.ts`, `checkout-redirects.mjs`, `public/_redirects`, and `astro.config.mjs`.
