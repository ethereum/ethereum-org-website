# Lane: code

Run `/code-review` at **medium** effort.

For a bug fix, list every code path that produces the symptom, not only the one the PR names. A path the fix misses is `should fix`. Trust the code over `docs/solutions/` notes.

For a new page: `getMetadata` gets `slug` = the route path, JSON-LD sits in a colocated `page-jsonld.tsx`, a `noIndex` page is in `EXCLUDED_PATHS` in `app/sitemaps/sitemap.ts`, `getAppPageContributorInfo` gets the folder path, and some existing page links to it.

Load the skill for the area the PR changes and check against it: `design-system` for UI, `data-layer` for `src/data-layer/` and `src/lib/data/`, `performance` for images, caching, rendering mode or bundle size.

Report bar: `should fix` or higher needs a concrete wrong behaviour.
