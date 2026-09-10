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

## What the modal shows beyond page results

Three behaviours live in the app rather than the index, in `src/components/Search/SearchModal.tsx`.

**A page leads its own sections.** Results are grouped by page, and where the index returns only sections of one, a row for the page itself is synthesised from the heading every record carries. Without it a search can offer three anchors into a page it never offered on its own.

**Some pages are withheld.** The homepage, because what the crawler extracts from it is hero copy that appears more fully on the pages it links to. The glossary, unless searched for by name -- every entry is a one-word heading, which is an exact match for any one-word query and outranks the page actually about the term.

**A `0x` value or an ENS-style name gets block explorers instead.** Site content cannot answer it. Which networks appear comes from `src/data/networks/networks.ts`; see the runbook. We never probe explorers to find which chain a value belongs to, since that would hand the reader's address to every one of them on each keystroke -- all networks are offered and the reader picks.

## Patches to the search library

`patches/typesense-docsearch-react.patch` changes two constants the package gives no way to configure. Both are load-bearing; a version bump must re-verify them, and `tests/unit/search/explorer-query.spec.ts` fails if the first stops applying.

- `MAX_QUERY_SIZE` 64 to 512. It is enforced twice -- as the input's `maxLength` and as a slice on every keystroke -- so a 66-character transaction hash was silently truncated and never matched.
- `groupBy` gains a per-item opt-out. It caps every section at five rows as a stand-in for `distinct`, which is right for content results but silently dropped four of the nine explorer rows.

## Resources

- Operator runbook, secrets and local commands: [`typesense/README.md`](../typesense/README.md)
- [Typesense documentation](https://typesense.org/docs/)
- [typesense-docsearch-scraper](https://github.com/typesense/typesense-docsearch-scraper)
