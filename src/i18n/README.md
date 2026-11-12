English is the source language and uses unprefixed URLs. Finnish, Spanish,
French, Dutch, and Ukrainian have internal routes under `/fi/`, `/es/`,
`/fr/`, `/nl/`, and `/uk/`. No translation service runs in the browser or
during a normal build.

The localized routes reuse the original page components. Middleware applies
the checked-in catalogs to their rendered HTML, including article bodies,
reviews, accessible labels, metadata, and structured data. It also keeps
internal links in the selected language. IDs, filter values, scripts, asset
URLs, usernames, and external checkout destinations stay intact.

Catalogs contain machine-assisted drafts with reviewed interface terminology
in `catalogs/glossary.mjs`. Edit the JSON entries directly to improve prose.
Missing entries fail the build so an untranslated page cannot ship silently.

When source copy changes:

1. Set `I18N_SOURCE_BUILD=1` and run `astro build` to build English source pages.
2. Run `node scripts/prepare-translations.mjs --extract-only` to refresh the
   source inventory, then add translations to each catalog. The authoring
   command without `--extract-only` can fetch draft translations if needed;
   it is deliberately excluded from normal build scripts.
3. Run `node scripts/apply-translation-glossary.mjs` after reviewing entries.
4. Unset `I18N_SOURCE_BUILD`, run `astro build`, then
   `node --test scripts/localization.test.mjs`.

The language menu preserves the current page, query parameters, and fragment.
English remains the default; there are no automatic language redirects.
