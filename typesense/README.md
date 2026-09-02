# Typesense search index

Search is served from a self-hosted Typesense instance, one collection per locale
(`ethereumorg-en`, `ethereumorg-ja`, …). Collections are rebuilt by
`.github/workflows/typesense-index.yml`, on a Netlify `deploy-succeeded` dispatch and
weekly on Friday evening (22:00 UTC) as a safety net.

Run it by hand from the Actions tab. The `locales` input takes a comma- or
space-separated list (`ja,ar`); leave it blank to rebuild all 25. Locales run five at a
time -- enough parallelism to finish in about two hours, gentle enough on production
ethereum.org and on the shared Typesense box.

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

## When promotion is refused

A refusal exits non-zero, so the workflow job fails and the Sentry check-in reports
`error` for that locale's environment. The other locales are unaffected. Check that the
Sentry alert rule fires on _error_ check-ins and not only on missed ones -- the check-in
does arrive, it just carries a failure.

**Curation is skipped as well**, because the step never runs. That is correct on its own
-- the alias did not move, and the collection still serving has its curation set attached
-- but it means a manual promote has to be followed by a manual curate.

Only shrinkage is gated. An index that grows is promoted without comment; the floor exists
to catch a truncated crawl, not to notice change.

The staged collection survives a refusal (`prune` runs only after a successful swap), so
the same index can be re-checked and published by hand:

```sh
# why it refused -- re-runs every check, touches nothing
pnpm typesense:promote -- --locale ja --dry-run

# a legitimate shrink: lower the floor for this run only, then pin
pnpm typesense:promote -- --locale ja --min-ratio 0.7
pnpm typesense:curate  -- --locale ja
```

The refusal log already names each failed gate and the document counts, so the dry run is
mostly for confirming a fix.

`--force` is narrower than it sounds: it bypasses the size ratio and the hit@1 floor, but
not the structural checks. A missing or unsortable `pagerank`, or zero documents tagged
for the locale, refuses either way -- an index that would silently break ranking cannot be
forced through.

Repeated refusals leave staged collections behind, and Typesense holds its indexes in
memory. The next successful promote for that locale prunes them, so this self-corrects --
but a locale that refuses several runs in a row is worth looking at.

Recovering from the Actions tab is not possible today: re-running the workflow re-crawls
and meets the same gate. The commands above need the admin key locally.

## curation.json

Query to ordered list of paths. Paths are locale-agnostic (brand names read the same in
every language, and ethereum.org uses English slugs throughout), so
`/wallets/find-wallet/metamask/` becomes `/ja/wallets/find-wallet/metamask/` for Japanese.

Curation **cannot** be entered in a dashboard. Typesense pins by document id, and the
scraper assigns ids as sequential counters that change on every crawl -- dashboard pins
would silently stop matching after the next run. Storing URLs here and resolving them at
promote time is what keeps them working.

## CORS

The Typesense server must run with `--enable-cors`. The browser queries it directly, and
without an `Access-Control-Allow-Origin` header the response is discarded client-side --
the server returns 200, so the modal shows no results and nothing errors visibly.

Origin restriction buys nothing here: the search key ships in the browser bundle by
design, so the same query works from `curl` regardless. The key's scope is the real
control. An allowlist would also break on every new deploy-preview subdomain.

## Secrets

GitHub Actions secrets, which are separate from Netlify's environment variables.

| Secret                 | Used for                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TYPESENSE_URL`        | full origin. The scraper's `TYPESENSE_HOST` is derived from it, so the two can't disagree                                                               |
| `TYPESENSE_ADMIN_KEY`  | collections, aliases, document import, curation                                                                                                         |
| `TYPESENSE_SEARCH_KEY` | queries; the admin key cannot search                                                                                                                    |
| `SENTRY_DSN`           | cron check-ins, one monitor environment per locale. Optional -- if unset the check-in steps no-op, so monitoring can never be the reason indexing fails |

## Local runs

```sh
pnpm typesense:promote -- --locale en --dry-run
pnpm typesense:curate  -- --locale en --dry-run
pnpm typesense:promote -- --all
```
