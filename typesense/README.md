# Typesense search index

Search is served from a self-hosted Typesense instance, one collection per locale
(`ethereumorg-en`, `ethereumorg-ja`, …). Collections are rebuilt by
`.github/workflows/typesense-index.yml`.

## Why one collection per locale

A single combined index took ~16 hours to crawl, which is past GitHub Actions' 6-hour job
limit and made every locale wait on every other. Per-locale collections run as parallel
matrix jobs of ~25 minutes each, and a failure in one locale can't block or delay the
rest. Each collection can also declare its own tokenization, which is what Chinese
segmentation needs.

## The three steps

1. **Scrape** — `typesense/docsearch-scraper` crawls production ethereum.org into
   `ethereumorg-staging-<locale>`. Ranking hints come from the `docsearch:*` meta tags
   emitted by `src/lib/utils/metadata.ts`; the scraper copies any such tag onto every
   record it extracts.
2. **Promote** (`pnpm typesense:promote`) — swaps the `ethereumorg-<locale>` alias onto
   the new collection, but only if it passes: at least 90% of the live document count,
   a sortable `pagerank` field, and a non-zero count for its own language. On refusal the
   alias is left alone, so search serves slightly stale results rather than none.
3. **Curate** (`pnpm typesense:curate`) — applies the pinned results in
   `typesense/curation.json`.

The scraper would otherwise swap its own alias the moment a crawl ends, with no checks at
all. Scraping to a staging name and promoting separately is what makes the swap
conditional -- the equivalent of Algolia's `safetyChecks.beforeIndexPublishing`.

## curation.json

Query to ordered list of paths. Paths are locale-agnostic (brand names read the same in
every language, and ethereum.org uses English slugs throughout), so
`/wallets/find-wallet/metamask/` becomes `/ja/wallets/find-wallet/metamask/` for Japanese.

Curation **cannot** be entered in a dashboard. Typesense pins by document id, and the
scraper assigns ids as sequential counters that change on every crawl -- dashboard pins
would silently stop matching after the next run. Storing URLs here and resolving them at
promote time is what keeps them working.

## Secrets

| Secret | Used for |
| --- | --- |
| `TYPESENSE_HOST` | hostname, for the scraper container |
| `TYPESENSE_URL` | full origin, for the promote/curate scripts |
| `TYPESENSE_ADMIN_KEY` | collections, aliases, document import, curation |
| `TYPESENSE_SEARCH_KEY` | queries; the admin key cannot search |

## Local runs

```sh
pnpm typesense:promote -- --locale en --dry-run
pnpm typesense:curate  -- --locale en --dry-run
pnpm typesense:promote -- --all
```
