# Fumadocs PoC — Progress Log

Chronological log of the PoC session. For the architectural evaluation, see
[`fumadocs-evaluation.md`](./fumadocs-evaluation.md).

## End state

**Full-scope PoC**: all 326 English markdown pages under `public/content/**`
(translations excluded) compile and render through Fumadocs at
`/en/poc-fumadocs/<…>/`. Production build green; cold-build cost is +10 s
(+10 %) over baseline for +326 prerendered routes (+29 %). See the
*Full-scope expansion* section below for measurements.

Earlier narrow scope (preserved in this log for context):
- 57 tutorials at `/en/poc-fumadocs/developers/tutorials/<slug>/`
- Whitepaper at `/en/poc-fumadocs/whitepaper/`
- Index at `/en/poc-fumadocs/`

Existing routes (`/en/developers/tutorials/...`, `/en/whitepaper/`) unaffected.

**Dev warm-cache timing (whitepaper, 3-run avg):**
| | PoC | Existing |
|---|---|---|
| Time | ~600 ms | ~1800 ms |

PoC is ~3× faster on warm requests because MDX is compiled to JS at build, not per-request.

## Files added / changed

```
source.config.ts                                  # NEW — collections + preset wiring
src/lib/poc-fumadocs/source.ts                    # NEW — loader instances
src/lib/poc-fumadocs/rehypeImgForFumadocs.ts      # NEW — rehypeImg adapter
app/[locale]/poc-fumadocs/[[...slug]]/page.tsx    # NEW — route
next.config.js                                    # MODIFIED — wrap + rule preservation
.gitignore                                        # MODIFIED — +.source/
package.json + pnpm-lock.yaml                     # MODIFIED — +fumadocs-mdx, +fumadocs-core (devDeps)
```

Generated (gitignored): `.source/{server,browser,dynamic}.ts`, `.source/source.config.mjs`.

## Session timeline (problems and fixes)

### 1. Setup
- Installed `fumadocs-mdx@15.0.2` + `fumadocs-core@16.8.9` as devDeps. Zod 4 peer warning (we have 3.25.76) — sidestepped by skipping Zod-based schemas.
- Wrote `source.config.ts` with `defineDocs({...})` pointing at `public/content/developers/tutorials`.
- Wired `createMDX()` into `next.config.js`.

### 2. First failure: yaml loader collision
`defineDocs` registers a meta collection whose webpack/turbopack `*.yaml` loader shadows our existing `yaml-loader` rule (used for `src/data/*.yaml`). Build broke on `developer-docs-links.yaml`.

**Fix:** switched to `defineCollections({type: 'doc'})` (no meta collection) and re-applied our `*.yaml` turbopack rule *after* Fumadocs in `next.config.js`.

### 3. Second failure: `Invalid tag: ---` on every tutorial
Hypothesis at first: MDX 3 rejecting our content (legacy v1 patterns, `<sup>` HTML, Crowdin-mangled syntax). Documented as a real migration cost.

**Real cause:** turbopack matched our `*.md` raw-loader rule over Fumadocs' `*.{md,mdx}` rule (literal pattern beats brace pattern). Files arrived as raw strings; React tried to render the whole file as a JSX tag named after the file contents.

**Fix:** delete `*.md` from `cfg.turbopack.rules` before Fumadocs wraps the config. After this, *all 58 pages compiled cleanly* with no MDX content changes needed. The "MDX strictness" blocker dissolved.

### 4. Heading IDs were rendered literally
`{#kebab-id}` syntax appeared as text in headings.

**Fix:** added `remark-heading-id` to the collection's `mdxOptions.remarkPlugins`.

### 5. Images broke (`width "NaN"`)
Our `MdComponents.img` expects width/height props. Markdown produced bare `<img src="./x.png">`.

**Fix:** wrote `src/lib/poc-fumadocs/rehypeImgForFumadocs.ts` — thin adapter that derives `dir`/`srcPath`/`locale` from `vfile.path` per file, then delegates to our existing `rehypeImg`. Result: Next.js `<Image>`, srcset, blur placeholders, all working.

### 6. TOC empty
We had passed `remarkPlugins: [remarkHeadingId]` directly, which replaced Fumadocs' default preset (TOC extraction, code highlighting, image transform).

**Fix:** wrap with `applyMdxPreset({...})` explicitly. Found via reading `build-DPafU2lu.js` — when `collection.mdxOptions` is set, the preset is *not* auto-applied. After preset: TOC populated.

### 7. `Dynamic href \`[object Object]\`` from Link
Default preset's `remarkImage` with `useImport: true` rewrites `![](./x.png)` into ES module imports — clashes with our `rehypeImgForFumadocs`.

**Fix:** `remarkImageOptions: false` in the preset call.

### 8. ShikiError: Language `yul` not found
Preset's `rehypeCode` (Shiki) doesn't know our exotic langs (`yul`, `zokrates`, etc). Our existing pipeline highlights via `pre`/`code` component overrides, not at compile time.

**Fix:** `rehypeCodeOptions: false`.

### 9. RSC component-serialize errors (false alarm)
Initially we saw "Functions cannot be passed directly to Client Components" when passing our mixed `mdComponents` (server + client) to `<MDXContent components={...} />`. Hypothesized as a real blocker requiring an MDXProvider client boundary.

**Real cause:** side-effect of issue #3. Once MDX was actually compiling instead of arriving as raw strings, components wired straight through with no provider boundary needed.

### 10. JSX components silently stripped
Files like `<Emoji>`, `<Alert>`, `<WhitepaperBridge>` disappear from rendered output. 17/57 tutorials use these; whitepaper has `<WhitepaperBridge />` on line 10.

**Cause:** Fumadocs derives MDX `format` from file extension (`.md` → markdown mode, `.mdx` → JSX mode). Our files are `.md`. The setting in `mdxOptions.format` is overridden by the file-extension check in `build-mdx-DeW1GoVI.js`.

**Status:** documented in evaluation, **not fixed**. Workaround would be renaming `.md` to `.mdx` (one mechanical PR across all content) or patching Fumadocs' extension check via a plugin's `doc.vfile` hook.

### 11. Type errors after the runtime worked
TypeScript flagged 3 errors:
- `Source<{..., metaData: never}>` not assignable to `loader()`'s `ResolvedInput`
- `page.data.body` / `page.data.toc` missing on `PageData`

**Fix:** added a minimal Standard Schema (`StandardSchemaV1`) in `source.config.ts` for `Frontmatter`. No runtime validation (frontmatter parsing already happens upstream), but it gives `DocCollectionEntry<>` a proper `Frontmatter` type so the inferred Source satisfies `pageData extends PageData`. Removed the `@ts-ignore` on the `.source/server` import. Types flow through cleanly. `tsc --noEmit` passes on the whole repo.

### 12. Whitepaper added for comparison
Added a second `defineCollections` for `public/content/whitepaper`. Page route resolves slug prefix `["whitepaper", ...]` to the whitepaper source. 38 TOC entries, 6 optimized images, ~3× warm-fetch speedup over existing route.

## Key insight from the session

The first evaluation report listed three "migration blockers" (MDX strictness, RSC component serialization, i18n layout). Two of the three turned out to be **misdiagnosed**. The actual blocker was a single-line turbopack rule precedence issue — fix that and 58 pages render with full image, TOC, and component-override parity.

The real remaining costs are:
1. `.md` → `.mdx` rename to enable embedded JSX components.
2. i18n adapter (Fumadocs' sibling-suffix translations vs our `translations/<locale>/<slug>/` layout).
3. Build perf at scale — 8,052 files vs the 58 we measured.

## Full-scope expansion: all 326 English md pages

After validating the narrow PoC (57 tutorials + whitepaper), the PoC was
expanded to compile **every English markdown page** under `public/content/**`
(translations excluded) through one Fumadocs collection. Goal: see what a full
production build looks like with the entire EN tree going through Fumadocs.

### Setup change

`source.config.ts` now declares one collection instead of two:

```ts
export const content = defineCollections({
  type: "doc",
  dir: "public/content",
  files: ["**/*.md", "**/*.mdx", "!translations/**"],
  schema: frontmatterSchema,
  mdxOptions: sharedMdxOptions,
})
```

The route at `app/[locale]/poc-fumadocs/[[...slug]]/page.tsx` uses a single
`contentSource` loader, so any `public/content/<a>/<b>/.../index.md` renders at
`/en/poc-fumadocs/<a>/<b>/.../`. `generateStaticParams` returns 326 paths.

### New issue: rehype-toc chokes on `raw` hast nodes

Six files (~2% of EN) failed the bundler with
`Error: Cannot handle unknown node 'raw'` from `hast-util-to-estree`, called
inside Fumadocs' `rehype-toc`. Cause: all six had headings with inline JSX —
`<Emoji text=":one:" />`, `<sup>`, `<Emoji text="🦓" />` — which in `.md`
mode parse as raw HTML. The hast `raw` node has no estree handler.

Failing files:
- `roadmap/merge/issuance/index.md` — `<sup>` in paragraph + `<Emoji>` heading
- `roadmap/fusaka/index.md` — `<Emoji>` headings
- `contributing/design/index.md` — `<Emoji>` headings
- `community/get-involved/index.md` — `<Emoji>` headings
- `ethereum-forks/index.md` — `<Emoji>` heading
- `developers/docs/networks/index.md` — `<Emoji>` headings

Fix: a 15-line `rehypeStripRaw` plugin removes `raw` nodes from the hast tree
before `rehype-toc` runs. Plugin-ordering catch: Fumadocs' preset resolver
appends user-returned plugins AFTER the preset's own (rehype-toc included).
To run *before* rehype-toc, prepend in the resolver:
`rehypePlugins: (v) => [rehypeStripRaw, ...v, rehypeImgForFumadocs]`.

After this fix, **all 326 EN pages compile and render** through the PoC route.

### Build measurements (cold, FUMADOCS_POC=1 vs 0)

Cold builds (`rm -rf .next` between runs), `LIMIT_CPUS=8`,
`NODE_OPTIONS=--max-old-space-size=8192`, Next.js 16.2.3 Turbopack.

|                       | Baseline (FUMADOCS_POC=0) | PoC (FUMADOCS_POC=1) | Δ                    |
|-----------------------|---------------------------|----------------------|----------------------|
| Routes prerendered    | 1140                      | 1466                 | +326 (+29%)          |
| Compile               | 26.6 s                    | 38.8 s               | +12.2 s              |
| TypeScript            | 21.5 s                    | 18.3 s               | within noise         |
| Static generation     | 50 s / 1140 pages         | 50 s / 1466 pages    | same wall, +29% pages |
| Total wall time       | 1 m 42 s                  | 1 m 52 s             | +10 s (+10%)         |
| `.next` size          | 1.6 GB                    | 1.9 GB               | +300 MB (+19%)       |
| `.source/` size       | —                         | 124 KB               | —                    |

Caveats: the PoC adds 326 routes *on top of* the existing pipeline (both render
the EN tree in parallel). A real migration would replace, not duplicate — so
the .next-size delta isn't representative of post-migration steady state.

Key observation: **static-gen wall time was identical (50 s) despite the PoC
producing 326 more pages**. The fumadocs pages are essentially free at gen time
because they're already compiled to JS modules in `.source/`. The +12 s
compile delta is the entire per-page cost, paid once.

### What this means for the migration math

Original eval flagged build perf at scale as a Go/No-Go gate:
> "PoC compiles 57 files; the full 8,052 is two orders of magnitude larger.
> Need to measure cold `next build` time with all content vs. today."

Measured cost: **+12 s of compile for 326 EN pages ≈ 37 ms/page** at the MDX
compile step. Even if the full 8,052 (25 locales × 326) goes through fumadocs
linearly, that's ~5 min of MDX compile — but locales would more realistically
ship pre-compiled, or share compiled JS across locales (an i18n adapter
decision). Per-page cost is the right way to extrapolate, not raw file count.

The original concern that "if build time doubles, that offsets the
runtime-correctness win" doesn't materialize here — at full EN scope the
delta is +10 s on a 102 s baseline.

### Residual issues at full scope

1. **JSX components silently stripped in `.md` mode** — 58/326 EN files use
   `<Card>`, `<Alert>`, `<Emoji>`, `<EnvWarningBanner>`, `<WhitepaperBridge>`,
   `<YouTube>`, etc. and would render with those components missing.
   Resolution path: rename `.md` → `.mdx` (mechanical PR).
2. **Inline HTML in markdown** (`<sup>`, `<dl>`, etc.) requires the
   `rehypeStripRaw` workaround above OR `.md` → `.mdx` rename + a proper
   MDX parse. After rename, `<sup>` would be valid JSX and the strip-raw
   adapter goes away.
3. **i18n adapter** — unchanged from the original eval. PoC is English-only.
   Either restructure `translations/<locale>/<slug>/index.md` to sibling-suffix
   (large intl-pipeline change) or write a custom `Source` adapter
   (~150 LOC).
4. **Build duplication** — the PoC compiles every EN file twice (existing
   pipeline + fumadocs). A real migration replaces the existing route's
   `getPageData` path with `contentSource.getPage()`, reclaiming the 1140
   non-fumadocs routes that today still go through `[...slug]/page.tsx`.

### Updated recommendation

The full-scope PoC strengthens the original recommendation:

1. **`.md` → `.mdx` rename** (one mechanical PR). Removes 18% silent-strip
   and eliminates the rehype-raw workaround.
2. **End-to-end cutover of one layout** (tutorials, 57 EN files × 25 locales).
   Now that the i18n adapter is the only open question, that's the first
   real migration step.
3. **Measure full multi-locale build** before broader rollout. The +12 s for
   EN-only is encouraging but doesn't yet model the locale matrix cost.

The PoC has now answered every question the original eval flagged as a
go/no-go gate except #3 (i18n adapter). Build perf is not a blocker.

## Cutover: replace `[locale]/[...slug]/page.tsx` with Fumadocs

Goal: make Fumadocs serve the same URLs as today (`/<locale>/<…slug>/`) by
fully replacing the existing catch-all instead of running as a parallel
PoC route. Scope is intentionally PoC-level (EN-only, no layout wrapper).

### Changes

- `src/lib/poc-fumadocs/source.ts` — `baseUrl: "/poc-fumadocs"` → `baseUrl: "/"`.
- `app/[locale]/[...slug]/page.tsx` — replaced. Returns `notFound()` for
  `locale !== "en"`. Uses `contentSource.getPage(slug)` for EN.
  `generateStaticParams` hands back English-only paths.
- Deleted `app/[locale]/[...slug]/page-jsonld.tsx` (no longer wired in).
- Deleted `app/[locale]/poc-fumadocs/` — the parallel PoC URL prefix is gone.

### Cold-build measurements after cutover

|                   | Baseline (FUMADOCS_POC=0) | Dual-pipeline PoC (FUMADOCS_POC=1, parallel route) | Cutover (FUMADOCS_POC=1, replaces `[...slug]`) |
|-------------------|---------------------------|----------------------------------------------------|------------------------------------------------|
| Routes            | 1140                      | 1466                                               | 604                                            |
| Compile           | 26.6 s                    | 38.8 s                                             | 26.8 s                                         |
| TypeScript        | 21.5 s                    | 18.3 s                                             | 19.4 s                                         |
| Static generation | 50 s                      | 50 s                                               | **11.4 s**                                     |
| Total wall        | 1 m 42 s                  | 1 m 52 s                                           | **1 m 2 s**                                    |
| `.next` size      | 1.6 GB                    | 1.9 GB                                             | 822 MB                                         |

Important caveat: route count drops from 1140 → 604 because non-EN locales
404 at the catch-all (24 locales' worth of static paths removed). The 4×
static-gen speed-up is partly fumadocs pages being free at gen time, partly
fewer pages to generate. After the i18n adapter lands and non-EN locales come
back, route count will rise and gen time will follow — though still benefiting
from the pre-compiled pages.

### Feature parity gaps (intentional, PoC-scope)

The replacement route is intentionally minimal. Things the old route did that
this version drops:

| Feature | Where it lived | Reattach plan |
|---|---|---|
| Layout selection (`docs` / `tutorial` / `static` / `upgrade` / …) | `getLayoutFromSlug` + `layoutMapping` | Decide per-collection in `source.config.ts` or per-page via `frontmatter.template`; wrap output in `Layout`. |
| `I18nProvider` + scoped messages | `pick(allMessages, requiredNamespaces)` | Re-add once non-EN locales are restored. |
| JSON-LD | `SlugJsonLD` component | Re-add as a thin component reading `page.data` frontmatter. |
| Contributors / reading-time / `lastEditLocaleTimestamp` | filesystem + git scan in `getPageData` | Port as a Fumadocs plugin `doc.frontmatter` hook, or precompute at content-source time. |
| GFI scope (`getGFIs()` injected as `gfissues`) | data-layer | Re-add per layout that needs it. |
| Dynamic frontmatter `published` formatting | `dateToString` | Add to the rendering layer. |
| 24 non-English locales for catch-all routes | `getPostSlugs` enumerated all locales | i18n adapter (still the open gate). |

### How to back out

```bash
git restore app/[locale]/[...slug]/page.tsx
git restore --staged app/[locale]/[...slug]/page-jsonld.tsx
git checkout HEAD -- app/[locale]/[...slug]/page-jsonld.tsx   # if deleted
# baseUrl back to "/poc-fumadocs" in src/lib/poc-fumadocs/source.ts if you
# want to keep PoC alongside the existing route.
```

## How to reproduce

```bash
pnpm install
npx fumadocs-mdx     # generates .source/
pnpm dev
# Visit:
#   http://localhost:3000/en/poc-fumadocs/                     -> index
#   http://localhost:3000/en/poc-fumadocs/whitepaper/          -> whitepaper
#   http://localhost:3000/en/poc-fumadocs/<tutorial-slug>/     -> any tutorial
#   http://localhost:3000/en/whitepaper/                       -> existing route (for comparison)
```

To remove: revert `next.config.js`, delete `source.config.ts`, `.source/`, `src/lib/poc-fumadocs/`, `app/[locale]/poc-fumadocs/`, `docs/poc/`, then `pnpm remove fumadocs-mdx fumadocs-core`.
