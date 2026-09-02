# Site search on ethereum.org

TL;DR: site search runs on a self-hosted [Typesense](https://typesense.org/) instance, indexed by DocSearch, with one collection per locale. It replaced Algolia DocSearch, which was sponsored rather than self-hosted.

## How the index is built

`typesense/docsearch-scraper` crawls production ethereum.org from each locale's sitemap and extracts one record per content block, keyed by the headings above it. The crawl is driven by `typesense/scraper-config.json` -- selectors for each heading level, elements to strip, and the field definitions the collection is created with.

Every locale is its own collection (`ethereumorg-en`, `ethereumorg-ja`, …) rather than one combined index. A combined crawl took roughly 16 hours; per-locale crawls run in parallel and finish in about 25 minutes each, and a failure in one locale can't hold up the other 24.

Indexing runs from `.github/workflows/typesense-index.yml`: on a Netlify `deploy-succeeded` dispatch, and weekly on Friday evening as a safety net. It can also be run by hand from the Actions tab for one locale, a few, or all of them.

## What the crawler sees

- Translated pages are separated by collection, and additionally carry a `language` field, so a search never mixes locales.
- `aside`, `nav`, `footer` and `style` elements are stripped before indexing. Semantic markup therefore doubles as a way to keep content out of search -- wrapping a callout, banner or quiz in `aside` excludes it.
- Ranking hints reach the index as `docsearch:*` meta tags emitted by `src/lib/utils/metadata.ts`. The scraper copies any tag with that prefix onto every record it extracts from the page, which is how `pagerank` and `category` get in.

## Publishing is gated

The scraper crawls into a staging collection. A separate promote step swaps the live alias onto it only if the new index passes a size check, has a sortable `pagerank`, and returns documents for its own language. A refused promotion leaves the previous index serving, so a bad crawl degrades freshness rather than breaking search.

Pinned results live in `typesense/curation.json` as query-to-URL mappings, in the repo rather than in a dashboard. Document ids change on every crawl, so pins are re-resolved against the new collection each time it is published.

## Resources

- Operator runbook, secrets and local commands: [`typesense/README.md`](../typesense/README.md)
- [Typesense documentation](https://typesense.org/docs/)
- [typesense-docsearch-scraper](https://github.com/typesense/typesense-docsearch-scraper)
