---
name: seo
description: Diagnose and fix SEO issues on ethereum.org — structured data / JSON-LD, hreflang reciprocity, sitemap coverage, canonical URLs, metadata, crawlability of nav and modal-gated content, robots / noindex, and llms.txt. Make sure to use this skill whenever the user mentions Googlebot, Bingbot, Screaming Frog, Rich Results Test, schema.org, JSON-LD, hreflang, canonical, sitemap, robots.txt, noindex, llms.txt, crawlability, indexing, or SEO — and also for softer phrasings like "Google isn't indexing our pages", "search results show the wrong locale", "the SEO audit flagged X", "structured data validation failed", "our nav isn't crawlable", "add this route to the sitemap", or any ask to audit discoverability. For page speed / Core Web Vitals (LCP, INP, CLS, TTFB, bundle size) use the `performance` skill instead — this skill is strictly about discoverability, indexing, and structured data.
---

# SEO Skill — ethereum.org

A project-specific playbook for SEO work on the ethereum.org Next.js App Router site. Every recipe below is backed by a shipped PR or a lesson from a reverted one. If a problem looks novel, check here first — the pattern probably already exists.

For the exhaustive PR + SHA index, see `references/recipe-index.md`. To run the production verification checklist, see `scripts/verify-seo.sh`.

## Start here — what bucket is the problem in?

Most "SEO bugs" on this site fall into one of eight buckets. Identify the bucket before writing code; the fixes are narrow and unrelated.

| You see / hear…                                                     | Bucket                          | Go to |
|---------------------------------------------------------------------|---------------------------------|-------|
| Screaming Frog flags hreflang reciprocity failures                  | Hreflang build-race             | §3    |
| Rich Results Test shows "missing" or truncated JSON-LD              | JSON-LD per-script size         | §2    |
| JSON-LD validator complains (missing publisher, relative URL, etc.) | JSON-LD canonical schemas       | §2    |
| A new page / dynamic route isn't in `/sitemap.xml`                  | Sitemap coverage                | §4    |
| "View source" shows no nav links; Googlebot can't crawl nav         | Nav unmounts / lazy mobile menu | §5    |
| Staging / deploy-preview URLs showing up in Google                  | `IS_PRODUCTION_DEPLOY` gating   | §6    |
| Untranslated locale page competing with EN in search                | Canonical fallback + robots     | §6    |
| AI agents (ChatGPT, Claude, Perplexity) can't find content          | `llms.txt`                      | refs  |
| Hundreds of 4xx from `/developers/tools/*` external links           | Dirty upstream URL data         | refs  |

Before writing any fix, verify the symptom with a real bot request — many reported "bugs" turn out to be tool display issues, not data problems. See §7.

## 1. Where each concern lives in the codebase

The rule of thumb: **every SEO surface has exactly one owner.** Plumb through the owner rather than duplicating logic elsewhere — duplication is what caused the hreflang reciprocity bug in the first place (§3).

| Concern                                                   | File                                                   |
|-----------------------------------------------------------|--------------------------------------------------------|
| `<title>`, description, canonical, hreflang, robots, OG   | `src/lib/utils/metadata.ts` → `getMetadata()`          |
| Per-page structured data                                  | `app/[locale]/**/page-jsonld.tsx`                      |
| Shared JSON-LD entities (base graph, references, orgs, persons) | `src/lib/jsonld/` (`constants.ts`, `references.ts`, `organizations.ts`, `persons.ts`, `utils.ts`) |
| JSON-LD renderer (accepts array or object)                | `src/components/PageJsonLD.tsx`                        |
| Sitemap (per-locale shards + `<sitemapindex>` router)     | `app/sitemaps/sitemap.ts` + `app/sitemap.xml/route.ts` |
| Translated-locale lookup (feeds metadata AND sitemap)     | `src/lib/i18n/translationRegistry.ts`                  |
| Namespace translation status                              | `src/lib/i18n/translationStatus.ts`                    |
| Server-rendered crawlable nav                             | `src/components/Nav/CrawlableNav.tsx`                  |
| Nav data source (powers both interactive + crawlable nav) | `src/lib/nav/buildNavigation.ts`                       |
| Production-deploy gating flag                             | `src/lib/constants.ts` → `IS_PRODUCTION_DEPLOY`        |
| AI-agent discoverability (auto-generated, `force-static`) | `app/llms.txt/route.ts` + `app/developers/docs/llms.txt/route.ts` + `src/lib/llms-txt/` |
| Locale-aware `.md` rewrites                               | `next.config.js`                                       |

If you add a new page type, a new nav surface, or a new structured-data schema, plumb it through these files. Don't create parallel paths.

## 2. Structured data / JSON-LD

Structured data bugs cluster around three themes: entity duplication, per-script size, and wrong schema type.

### Why the canonical-schema-and-reference pattern exists

Every page publishes `Organization` nodes for the Ethereum Foundation (as `publisher` and `reviewedBy`) and for the Ethereum Community (as default `author`). Inlining these objects on every page creates two problems: search engines see them as separate entities on every page (hurts the knowledge-graph signal), and the JSON-LD payload inflates until tools truncate it.

The pattern (shipped in PR #17955; refactored into the `src/lib/jsonld/` module since):

```ts
import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

// Spread the shared base nodes (EF org, Community org, WebSite) into @graph once:
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...BASE_GRAPH_NODES,
    {
      "@type": "WebPage",
      author: [REFERENCE.ETHEREUM_COMMUNITY],   // { "@id": "..." }
      isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
      // publisher / reviewedBy: REFERENCE.ETHEREUM_FOUNDATION, etc.
    },
  ],
}
```

`REFERENCE.*` are stable `@id` pointers (`ETHEREUM_FOUNDATION` → `https://ethereum.foundation/#organization`, `ETHEREUM_COMMUNITY` → `https://ethereum.org/#community-organization`, `ETHEREUM_ORG_WEBSITE` → `https://ethereum.org/#website`); the full objects live once in `BASE_GRAPH_NODES` (`constants.ts`). For per-person/-org authorship use `personReference` / `organizationReference` / `resolveAuthorsFromFrontmatter` from `@/lib/jsonld/utils` against the `KNOWN_PERSONS` / `KNOWN_ORGANIZATIONS` registries. When a new shared entity emerges, add it to the `src/lib/jsonld/` module with an `@id` from day one. There is no barrel export — import from the specific file.

### Why multiple `<script>` tags beat one big `@graph`

Google's Rich Results Test and several third-party crawlers truncate very large `<script type="application/ld+json">` blocks when rendering their previews. On `/community/events/` a 14.7 KB block with 23 graph nodes looked "broken" in Rich Results but was actually complete in the HTML (PR #17863). The fix was splitting into 8 separate `<script>` blocks — one per conceptual schema.

`PageJsonLD` already supports this — pass an array and it renders one `<script>` per entry. Aim for each script under ~5 KB. When you're staring at a "missing fields" complaint from a validator, first count scripts and byte sizes before concluding data is actually missing.

### Schema type selection (the ones that matter here)

| Content type          | Schema                                    |
|-----------------------|-------------------------------------------|
| Apps page             | `WebApplication` (not `SoftwareApplication`) |
| Community hub         | `Place` with `address` + `geo`            |
| Event                 | `Event` with `startDate` + `Place` location |
| Wallet listing        | `CollectionPage`                          |
| Tutorials / courses   | `Course` with `provider`                  |
| Video detail          | `VideoObject`                             |
| Video listing         | `ItemList` of page URLs (not full VideoObjects — re-emitting them fails validation) |

### Authorship

Individual authors live in the `KNOWN_AUTHORS` registry. Pages opt in by adding `authors: [slug, ...]` to their frontmatter. Unknown authors fall back to `ethereumCommunityReference`. Add `sameAs: [wikipedia-url, ...]` to author entries for high-profile contributors — it boosts entity disambiguation.

### Always use absolute URLs + trim long descriptions

Relative paths in JSON-LD validate locally but confuse aggregators at scale. Use `getFullUrl(locale, slug)`. Long markdown bodies pasted into `description` fields also trip validation — truncate to a reasonable length (~160–300 chars).

### Validation workflow

Paste the output of `curl -sL https://<preview>/en/<slug>/` into the Google Rich Results Test and the Schema.org validator. If Rich Results shows truncation, that's almost always the per-script-size issue — not missing data.

## 3. Hreflang & i18n alternates

### The root-cause story

Screaming Frog flagged that `/guides/<x>/` in many locales listed `/id/` as an alternate, but the `/id/` page didn't reciprocate. The instinct is "fix the logic" — but spot-checks on production showed alternates were actually symmetrical *at check time*.

The real cause: `getTranslatedLocales(slug)` checks translation files via `existsSync`. When HTML `<link rel="alternate">` emission and the sitemap shards (`app/sitemaps/sitemap.ts`) call this separately during a build where translation files are still being written, the two callers can see different results. It looks like a logic bug; it's a build-time race.

The fix (PR #17864) is a module-level `Map<string, string[]>` cache in `translationRegistry.ts` and a parallel one in `translationStatus.ts` for `areNamespacesTranslated`. One build, one answer — same cache instance, consistent for every caller.

**Practical implication:** if you write a new caller that asks "is this slug translated in locale X?", always go through `getTranslatedLocales()`. Calling `existsSync` yourself re-introduces drift.

### How alternates are actually emitted

- **HTML `<link rel="alternate">`** comes from `getMetadata`, populated only when the current page is translated in the current locale. If not translated, the page gets canonical → EN and no `languages` block.
- **Sitemap alternates** come from the per-locale sitemap shards (`app/sitemaps/sitemap.ts`). Each shard emits **one `<url>` entry per URL**, each with its own `alternates.languages` map. Every URL in a group shares an identical alternates set (`x-default` + translated locales only).

Both sources route through `getTranslatedLocales()` — which is what keeps them in sync.

### Keep `next-intl` middleware `alternateLinks` off

It duplicates and sometimes mis-generates hreflang links (hotfix PR #16774). If you touch i18n middleware config, verify this flag stays false.

### When adding / renaming a locale

Update `i18n.config.json`, re-check `LOCALES_CODES`, and update the regex in `next.config.js` that constrains the `.md` rewrite rules — if the locale alternation in the regex goes out of date, the wrong locale's markdown gets served.

## 4. Sitemap

The sitemap is **sharded one document per locale** — a single combined file is ~51 MB / 17.5k URLs, over Google's 50 MB per-file limit. `app/sitemaps/sitemap.ts` (`force-static`) emits `generateSitemaps()` returning one `{ id: locale }` per `LOCALES_CODES`, served at `/sitemaps/sitemap/<locale>.xml`; `app/sitemap.xml/route.ts` is the `<sitemapindex>` router that enumerates the shards at the reserved `/sitemap.xml` path.

Each shard builds entries by:
1. Discovering all MD page slugs (`getPostSlugs`).
2. Adding static intl paths (`getStaticPagePaths`).
3. Adding dynamic intl paths (`getDynamicIntlPagePaths` — dev-tool categories, app categories, individual apps).
4. Adding video detail pages (`getVideoSlugs`).
5. Deduping via a `seenUrls` Set.

Both routes are `force-static` on purpose: the transitive data-layer dependency (finite-revalidate getters) would otherwise opt them into ISR, which on Netlify re-renders in the serverless function where `public/content` is excluded — yielding empty slugs and a truncated sitemap. Don't add `revalidate`; freshness rides the deploy cadence.

### Why dynamic routes need manual registration

`generateStaticParams()` routes aren't in `getStaticPagePaths()` — the sitemap wouldn't know about them. Register new dynamic routes by extending `getDynamicIntlPagePaths()` in `translationRegistry.ts`. Prior examples: PR #17788 added apps + app categories; earlier commits added dev-tool categories.

### Only emit URLs for translated locales

The sitemap should never list a locale that doesn't actually serve a page — that would tell search engines pages exist when they don't, and pairs badly with the noindex-untranslated rule (§6). Because sitemap generation routes through `getAllPagesWithTranslations()`, this is automatic — keep it that way.

Don't hand-maintain slug lists in the sitemap. Derive from the registry so new pages are picked up for free.

## 5. Crawlability — nav and modal-gated links

### Why the site's nav was invisible to Googlebot

Desktop: Radix `NavigationMenu.Content` unmounts inactive dropdown content. Googlebot never hovers → dropdown links never appear in the initial HTML.
Mobile: `MobileMenuContent` is lazy-loaded **and** gated by a `hasBeenOpened` state. Double barrier.

### Why the shipped fix is a hidden sibling `<nav>`, not `forceMount`

PR #17928 added `src/components/Nav/CrawlableNav.tsx` — a server component that:
- renders `<nav inert class="sr-only">` as a **sibling** of the interactive nav (not a child: `<nav>` in `<nav>` is invalid HTML),
- recurses `buildNavigation(t)` (the same data source as the interactive nav, so links can't drift),
- emits plain `<a>` tags with `Link` from `@/i18n/navigation` for locale prefixing.

The alternative — `forceMount` on Radix dropdowns — was attempted in a parallel PR (#17564) and rejected. It balloons the RSC payload, duplicates keyboard listeners, and eagerly pulls data that the interactive nav only loads on demand. The hidden-sibling approach is strictly additive, zero JS, ~3–4 KB extra HTML.

`sr-only` + `inert` together mean: off-screen visually, out of the tab order, and invisible to screen readers (the visible interactive nav already provides the a11y surface). Crawlers do follow `sr-only` links; `inert` doesn't block them.

### Rule for new nav surfaces

If you add a new nav surface, route it through `buildNavigation()`. `CrawlableNav` will pick it up automatically. Building a parallel nav bypasses the crawlability guarantee.

### Modal-gated links need their own sr-only fallback

If a page exposes important destinations only via a modal / persona picker / CTA click (crawlers don't interact), add a server-rendered `sr-only` list of those URLs somewhere in the page body. Pattern shipped in commit `d018cc9c86`.

### Link graph matters

Moving a link from **body prose → nav → footer → modal** drops its PageRank weight at each step. When restructuring a hub page, keep key internal links in body content — that's where they carry the most weight. The homepage 2026 redesign has an outstanding concern here: several top-level sections now only appear in footer/modal, which the next design iteration should address.

## 6. Metadata, canonical, robots, noindex

`getMetadata({ locale, slug, title, description?, twitterDescription?, image?, author?, noIndex?, translatedLocales? })` in `src/lib/utils/metadata.ts` is the single supported way to emit page metadata.

Its behavior:

- **`canonical`** — points at the default-locale URL when the current page isn't translated in the current locale (prevents duplicate content between EN and an untranslated clone).
- **`alternates.languages`** — emitted only when the current page is translated, with `x-default` plus every translated locale.
- **OG + Twitter** — both read from the same `title` / `description` / `image`.
- **`robots`** — cascade:
  1. `{ index: false, follow: false }` when `!IS_PRODUCTION_DEPLOY` (deploy previews, staging).
  2. `{ index: false }` when `noIndex: true` is explicitly passed.
  3. `{ index: false, follow: true }` when the page is not translated in the current locale (PR #16601 — keeps the untranslated clone out of search while still passing link juice).
  4. No `robots` block otherwise (relies on site defaults = indexable).

### Always go through `getMetadata`

Hand-rolling a `Metadata` object or injecting `<meta name="robots">` via JSX conflicts with `generateMetadata`'s output and can silently break the above cascade. Even one-off pages should call `getMetadata` and pass `noIndex: true` if needed.

### `IS_PRODUCTION_DEPLOY` is derived from deploy context, not URL

Several earlier fixes tried to derive production-ness from the URL; all failed at edge cases. The current derivation uses Netlify's `CONTEXT` env var. Don't regress to URL checks.

### OG image fallbacks

`imageForSlug` in `metadata.ts` maps top-level sections (`developers`, `roadmap`, `guides`, `community`, `staking`, `10years`) to section-specific OG images. Prefer adding a section entry over hardcoding an image per page.

## 7. Production verification — check bots see what you think they see

Most SEO fixes are one curl command away from being verifiable. The skill bundles `scripts/verify-seo.sh` — it runs the canonical/alternate, robots, sitemap, JSON-LD, and Googlebot parity checks against a given URL. Use it on a deploy preview before calling a fix done.

```bash
.claude/skills/seo/scripts/verify-seo.sh https://<preview-url>/en/<slug>/
```

### The three most-missed gotchas

1. **`/en/*` is stripped to `/*`.** Default-locale paths 301 to locale-less URLs. Always use `curl -L`. Missing `-L` has led to "page is 404" misdiagnoses.
2. **Deploy previews legitimately `noindex`.** Seeing `noindex` on a preview is not a bug — it's `IS_PRODUCTION_DEPLOY` doing its job. Re-check on staging or prod.
3. **Rich Results "truncation" is usually display, not data.** Count `<script>` tags and their byte sizes before concluding JSON-LD is incomplete.

### Don't declare a fix complete without…

- A `curl -A "Googlebot/2.1" -L` verification on the deploy preview.
- A before/after number. "Screaming Frog reciprocity failures 127 → 0" is a fix. "Looks right to me" is not.
- For JSON-LD changes: both Rich Results and Schema.org validators passing, per-script size under ~5 KB.
- For hreflang changes: at least 3 locale pairs verified reciprocal on the preview.
- For sitemap changes: the new URL(s) visible in `/sitemap.xml`.
- For nav changes: `curl -sL | grep -c 'class="sr-only"'` returning the expected link count.

## 8. Common false-alarm patterns

These look like bugs but usually aren't:

| Symptom                                                   | Why it's often fine                                           |
|-----------------------------------------------------------|---------------------------------------------------------------|
| Rich Results Test shows "missing fields" on valid JSON-LD | Per-script display truncation (§2)                            |
| Screaming Frog flags hreflang reciprocity                 | Build-time race, not a logic bug — re-verify on prod (§3)     |
| Deploy preview has `noindex`                              | `IS_PRODUCTION_DEPLOY=false` — expected (§6)                  |
| `curl` returns a 404 for `/en/<slug>/`                    | Forgot `-L`; default locale is stripped (§7)                  |
| Google says "not indexed" on a new page                   | Check sitemap coverage (§4) before blaming anything else      |

## 9. When touching A/B tests

A/B variant assignment must not change what bots see. An earlier attempt (`b6db9a5547`) to "serve original variant to bots" introduced dynamic-rendering side effects and was reverted. The current contract: variant assignment is deterministic from IP + UA fingerprint (Matomo), and the SEO-visible HTML is the original variant. Don't gate SEO-critical surfaces — JSON-LD, canonical, structured data, nav — inside an A/B variant.

## Further reading

- `references/recipe-index.md` — the full PR + SHA index for every pattern in this skill (and related ones not deep-linked above: data-layer URL normalization, llms.txt maintenance, dev-tools URL cleanup, noindex subdomains, Safari telephone-format meta, redirect config, KNOWN_AUTHORS wiring).
- `references/data-layer-normalization.md` — the fetch-boundary URL cleanup pattern that eliminated ~93% of site-wide 4xx errors.
- `references/llms-txt.md` — how the auto-generated `llms.txt` routes work.
- Repo memory: `~/.claude/projects/-home-pablop-eth-ethereum-org-website/memory/` — project-level notes across sessions.
- Past solutions: `docs/solutions/` — grep by frontmatter tags `seo`, `hreflang`, `jsonld`, `sitemap`, `canonical`.

One convention from repo memory worth repeating: audit/plan docs (e.g. `docs/homepage-2026-seo-audit.md`) are local working artifacts, not committed files. Checked-in docs live in `docs/solutions/<category>/` with frontmatter and describe already-solved problems.
