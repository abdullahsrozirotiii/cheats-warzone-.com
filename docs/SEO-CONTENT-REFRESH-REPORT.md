# SEO & content refresh report (cheats-warzone.com)

**Date:** 2026-03-26  
**Scope:** On-page SEO, blog rewrite from warzonecheat.net mapping, forum copy, boilerplate trim — no layout or new routes.

## Mapping doc

- `docs/warzonecheat-to-blog-slug-map.md` — 9 articles mapped to existing slugs; 4 DMA posts skipped (no new pages).

## Meta / H1 updates (priority routes)

| Route | Change summary |
|-------|----------------|
| `/` | Hero subtitle refreshed (Humanizer, radar, blog CTA); catalogs synced for `hero.subtitle`. |
| `/products/warzone-cheats/utilities/` | Title → Warzone Cheats Utilities; description lists HWID, UGC, Skin Changer. |
| `/warzone-about/` | Title → About **Warzone Cheats** (audit + PAGE_SEO). |
| `/warzone-support/` | PAGE_SEO title → Warzone Cheats Support; audit H1 aligned. |
| `/warzone-reviews/` | Fixed truncated title/H1 → Warzone Cheats Reviews – PC Buyer Ratings 2026. |
| Blog routes | New PAGE_SEO entries: `warzone-esp`, `ricochet-safety`, `warzone-radar`; refreshed `esp-aimbot`, `esp-colors`, `get-cheats`, `console-cheats`. |
| Forum | PAGE_SEO for `what-to-ask-before-buying-warzone`, `what-to-check-after-a-warzone-patch`. |

## Blog slugs updated (body/title/desc)

| Slug | Source inspiration | Notes |
|------|-------------------|--------|
| `cheats-features` | lite-vs-pro | Single-product module map; tier/pricing lines removed. |
| `warzone-esp` | esp-ranked-setup | Ranked ESP setup, trios focus. |
| `esp-aimbot` | soft-aim | Soft aim / Humanizer vs classic aimbot. |
| `cheat-settings` | elite-tier-guide | Menu labels, stream-proof, no Elite tier CTAs. |
| `ricochet-safety` | patch-day | Patch-day checklist block added. |
| `esp-colors` | stream-proof-setup | Colors + stream-proof section. |
| `warzone-radar` | trios-radar | Trios rotation examples. |
| `recoil-aimbot` | no-recoil-meta | Meta AR loadout discipline. |
| `get-cheats` | spoofer-guide | HWID / spoofer utility angle; Cloud DMA checklist removed. |

Authors on blog posts: **Warzone Cheats** (was WarzoneCheats).

## Boilerplate removed

- `src/data/blog/seoExpand.ts` — auto-append disabled for all 17 slugs (`FULL_EDITORIAL_SLUGS`).
- `src/data/blog/keywordSections.ts` — all slug clusters return `[]`.

## Forum

- `expandForumPost` shortened (2 paragraphs + 1 editor comment); pricing removed.
- Tier threads (`elite-tier`, `lite-pro`, `aim-recoil`) reframed to single product + utilities.
- Removed Cloud DMA requirement language from setup thread.

## Images / alt

- Blog hero alt unchanged: title-based pattern in `warzone-blog/[slug].astro` (includes “Warzone cheats” prefix when needed).

## Build & i18n

- `npx astro build` — **354 pages** OK.
- `node scripts/prepare-translations.mjs --extract-only` + `sync-domain-catalog-keys.mjs`; hero subtitle added to fi/es/fr/nl/uk catalogs (English fallback until professional translate run).

## Remaining issues

- Locale catalogs use English fallback for new blog/forum strings; run `prepare-translations.mjs` (network) for real translations if desired.
- Legal/about long-form copy still mentions **WarzoneCheats** entity name where formal.
- Legacy redirect URLs (`/cheats/lite`, `/products/.../lite`) still exist as redirects — not part of this copy pass.
- Forum slugs `elite-tier` / `lite-pro` kept for URL stability; titles/content de-emphasize tiers.
