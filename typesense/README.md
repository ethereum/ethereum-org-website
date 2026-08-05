# Typesense DocSearch scraper

Config for the [`typesense-docsearch-scraper`](https://github.com/typesense/typesense-docsearch-scraper)
that populates the Typesense collection powering site search on the
`test/typesense-search-eval` branch. This is the Typesense analog of the Algolia
DocSearch crawler config described in `../docs/site-search.md` (which lives in
Algolia's dashboard, not in this repo).

## What this does

Crawls production `ethereum.org` for **en / ar / zh** (the eval locale set) and
writes records into a single Typesense collection (`ethereumorg`), so the app can
filter with `filter_by: language:=<locale>`.

The `language` field is populated from the `<meta name="docsearch:language">` tag
that `src/lib/utils/metadata.ts` emits on every page — the scraper copies any
`docsearch:*` meta into every record it extracts. **This tag must be live on
production before a scrape can pick it up.**

> Do **not** assume `language` is derived from `<html lang="">`. That is a feature
> of Algolia's *hosted* crawler (what `docs/site-search.md` describes), not of the
> self-hosted `docsearch-scraper` this is a fork of. An earlier version of this
> file claimed otherwise, which is why the field sat empty across two scrapes.

## Running (on the Typesense host)

The scraper needs the **admin / bootstrap API key** (write access) — NOT the
search key the app uses. Run it where it can reach the Typesense instance:

```bash
docker run -it \
  -e TYPESENSE_API_KEY="<ADMIN_KEY>" \
  -e TYPESENSE_HOST="<host>" \
  -e TYPESENSE_PORT="443" \
  -e TYPESENSE_PROTOCOL="https" \
  -e CONFIG="$(cat docsearch-scraper-config.json | jq -r tostring)" \
  typesense/docsearch-scraper:0.11.0
```

`index_name` here must match `NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME` in the app.

## Before trusting eval numbers — verify

1. **Records exist & are language-tagged.** After a run:
   ```bash
   curl "https://<host>/collections/ethereumorg" -H "X-TYPESENSE-API-KEY: <ADMIN_KEY>"
   curl "https://<host>/collections/ethereumorg/documents/search?q=*&query_by=hierarchy.lvl1&filter_by=language:=ar&per_page=1" \
     -H "X-TYPESENSE-API-KEY: <SEARCH_KEY>"
   ```
   If `language` is empty/missing, the app's `filter_by: language:=<locale>`
   returns zero results — fall back to per-locale collections (see below).
2. **Selectors capture real content.** The `selectors` below are a starting
   point ported from the Algolia removal rules (`nav/aside/footer/style/header`
   excluded). Tune `lvl0`–`lvl4`/`text` against the live DOM so the indexed text
   matches what Algolia indexes — otherwise the relevance comparison is unfair.

## Fallback: per-locale collections

If language auto-detection doesn't work, scrape each locale into its own
collection (`ethereumorg_en`, `_ar`, `_zh`) with a per-collection tokenization
`locale` (esp. `zh` for CJK segmentation), and switch the app to select the
collection by locale instead of filtering. This is also the better option if
Chinese relevance is weak. See `docs/plans/typesense-search-eval.md`.
