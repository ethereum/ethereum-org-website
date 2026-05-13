# Fumadocs PoC — Progress Log

Chronological log of the PoC session. For the architectural evaluation, see
[`fumadocs-evaluation.md`](./fumadocs-evaluation.md).

## End state

- All 326 EN markdown pages compile and render via Fumadocs at the live
  catch-all `/[locale]/[...slug]`.
- **Catch-all and three hub routes (videos, video detail, tutorials)
  source frontmatter from compiled `.source/` modules — zero `public/content/`
  filesystem reads at request time.** This is the architectural change that
  fixes the ISR 404 class of bugs documented in
  `docs/solutions/integration-issues/netlify-isr-404-async-server-components.md`
  (see *ISR-fix verification* below).
- Per-locale collections for all 25 locales exist; the route picks the
  source by `params.locale` and falls back to EN with
  `contentNotTranslated={true}` when a translation is missing.
- **Currently deployed: 12-locale subset** (`en,es,de,fr,zh,ja,ko,it,
  pt-br,ru,vi,hi`). 6 locales builds green in ~4 min; 12 OOMs the current
  Netlify container; 25 also OOMs. The container is ~10.7 GB / 6 CPU
  (smaller than the 36 GB Enterprise tier the org should have access to) —
  a billing/entitlement question, see *Memory budget* below.
- Some feature parity gaps remain (see *Feature parity gaps*).

## Files added / changed

```
source.config.ts                                # 25 collections, async:true
src/lib/poc-fumadocs/source.ts                  # per-locale loader map
src/lib/poc-fumadocs/videos.ts                  # fumadocs-backed video helpers
src/lib/poc-fumadocs/tutorials.ts               # fumadocs-backed tutorials helpers
src/lib/poc-fumadocs/rehypeImgForFumadocs.ts    # rehypeImg adapter (skip plaiceholder for non-EN)
src/lib/poc-fumadocs/rehypeStripRaw.ts          # strip raw hast before rehype-toc
src/lib/poc-fumadocs/toc.ts                     # fumadocs TOC → CItems shape
app/[locale]/[...slug]/page.tsx                 # REPLACED — fumadocs-backed, no importMd
app/[locale]/videos/page.tsx                    # MODIFIED — uses fumadocs helpers
app/[locale]/videos/[slug]/page.tsx             # MODIFIED — uses fumadocs helpers
app/[locale]/developers/tutorials/page.tsx      # MODIFIED — uses fumadocs helper
src/components/Videos/VideoWatch/index.tsx      # MODIFIED — uses fumadocs helpers
src/lib/md/rehypeImg.ts                         # MODIFIED — +skipPlaceholders option
src/lib/data/index.ts                           # +getISRTestAppsData (60s revalidate)
src/components/Content/apps/CategoryAppsGrid.tsx  # MODIFIED — uses ISR test getter
next.config.js                                  # MODIFIED — preset env guard + rules
netlify.toml                                    # MODIFIED — locale subset + recon block
package.json                                    # +fumadocs-mdx, +fumadocs-core, postinstall
.gitignore                                      # .source/ checked in (race workaround)
.source/                                        # NEW — committed
```

## ISR-fix verification

The whole reason for this refactor was to fix the ISR 404 class of bugs
documented in
`docs/solutions/integration-issues/netlify-isr-404-async-server-components.md`:
catch-all pages that embed `unstable_cache`-revalidated async server
components (e.g. gaming's `<CategoryAppsGrid>`) 404 on Netlify after the
cache TTL expires, because the serverless function can't read
`public/content/*.md` at runtime.

**Setup:** swapped the gaming page back into ISR via a 60s revalidate
getter (`getISRTestAppsData`). With the legacy route, that's the bug.
With the fumadocs route — which now sources frontmatter from `page.data`
and never calls `importMd()` — it should pass.

**Probe:** after `curl /api/revalidate?path=/en/gaming/`, the cache state
flipped exactly as predicted:

| Signal | Before revalidate | After revalidate |
|---|---|---|
| HTTP | 200 | 200 |
| etag | `W/"npqvazvo5f8juv"` | `W/"17mx9kszo6r8k3z"` (new) |
| x-nextjs-date | build-time | fresh render (~7 min later) |
| cache-status | `Next.js; hit` | `Netlify Durable; fwd=stale; ttl=…; stored` |

The `stored` line is the smoking gun — Netlify's Durable cache missed,
the serverless function re-executed the page render, and the output was
stored fresh. Function logs across that window show **zero** `ENOENT`
errors on `public/content/gaming/...`. With the legacy route this is
exactly where the 404 fires.

The unrelated `/videos` ENOENT noise that was in earlier logs is now
gone too: the hub routes (videos / video detail / tutorials / VideoWatch)
have been migrated to fumadocs-backed helpers (`src/lib/poc-fumadocs/
{videos,tutorials}.ts`) so they don't `readdir(public/content/...)` at
request time either. Same class of bug, same fix.

## Memory budget

The OOM-vs-locale-count curve so far, on Netlify:

| Locales | Wall | Outcome |
|---|---|---|
| 1 (EN) | 1 m 22 s | green |
| 6 (en,es,de,fr,zh,ja) | ~4 min | green |
| 12 (+ko,it,pt-br,ru,vi,hi) | unknown | OOM (SIGKILL) |
| 25 (all) | 57 min | OOM (SIGKILL) |

A recon block in `netlify.toml` prints the actual container limits at
build start. Captured numbers:

```
MemTotal:    10.7 GB
CPUs:        6
NODE_OPTIONS: --max-old-space-size=10240
```

So the container is ~10.7 GB / 6 CPU with a 10 GB V8 heap cap — **not**
the 36 GB / 10 CPU Enterprise High-Performance tier the org reportedly
has access to. `nf_team_business` plan, no per-site `build_resource_class`
override applied. The "Killed" signature (vs. a JS heap-exhaustion
exception) means total RSS (Node heap + Sharp native + worker threads)
is crossing the container ceiling, not V8 specifically.

Once the entitlement is applied to this site, the projection is that
25 locales fit on 36 GB with ~10-15 min wall.

Open levers if Enterprise isn't on the table:

- **Split-build per locale group** — 5 groups × 5 locales × ~4 min each,
  parallel Netlify branches, recombined at deploy. Real engineering
  project (~1-2 weeks).
- **Move plaiceholder out of MDX compile** — separate pre-build step that
  writes a static JSON, rehypeImg only looks up. Won't fix turbopack's
  own memory growth, but bounds Sharp's native allocations cleanly.
- **Webpack fallback** — `--no-turbo`. Slower, different allocation
  profile, may or may not fit. Not validated.

Already applied:
- **`async: true` on every collection** — lazy body imports, eager
  frontmatter only.
- **Skip plaiceholder/Sharp for non-EN locales** in `rehypeImgForFumadocs`.
  Translations reuse EN's image tree, so the 24 redundant Sharp passes
  produce no new output. Didn't fix the OOM by itself — turbopack's own
  chunk graph is the dominant memory consumer.

## Tier-1 + diagnostics (commit `aa66bc1095`)

Tier-1 fixes applied: Sentry source-maps off, `typescript.ignoreBuildErrors`,
`serverSourceMaps: false`, `productionBrowserSourceMaps: false` (explicit),
`LIMIT_CPUS=1`, `NODE_OPTIONS=--max-old-space-size=8192 --max-semi-space-size=64`.
Diagnostics: `next build --experimental-debug-memory-usage` + 15 s
free/top-RSS sampler.

**Result: OOM at t=139 s during compile.** The log makes the cause
unambiguous:

| t | PID 2570 RSS | V8 heap used | System used / avail |
|---|---|---|---|
| 0 s | 158 MB | 39 MB | 1.1 / 9.7 GB |
| 15 s | 2754 MB | — | 5.2 / 5.8 GB |
| 30 s | 5955 MB | 34 MB | 9.7 / 1.3 GB |
| 45 s | 7132 MB | — | 10.9 / 0.1 GB |
| 89 s | 7211 MB | 34 MB | 10.9 / 0.1 GB |
| 139 s | SIGKILL | | |

**V8 heap stays at ~34 MB the entire time** (0.41 % of the 8 GB cap).
The 7 GB RSS that fills the container is **native** memory inside the
main `next build` process — Turbopack's Rust-side module graph. None of
the Tier-1 levers reach that layer; they target V8 heap (Sentry source
maps, TS check, server source maps, `cpus`, V8 cap), so it's expected
that they didn't move the needle here. They're still applied because
each is independently cheap, but the OOM driver is the module graph.

The SIGKILL happens *before* "Collecting page data" — i.e. compile
itself doesn't fit, so `cpus = 1` (which only affects static-page
generation concurrency) can never help.

## Tier-2: JSON-manifest frontmatter (this run)

The fumadocs-mdx generator emits **8,052 eager imports** of the form
`import { frontmatter as __fd_glob_N } from "<path>?only=frontmatter"`
in `.source/server.ts` (plus 8,052 lazy `?collection=…` body imports).
Each `?only=frontmatter` virtual module becomes its own entry in the
turbopack chunk graph and is resolved + parsed at compile time. That's
the 7 GB of native RSS.

Fix: `src/lib/poc-fumadocs/inline-frontmatter.mjs` post-processes
`.source/server.ts` to replace each `import … from "<file>?only=frontmatter"`
with an inline `const __fd_glob_N = {…fm}` literal. Frontmatter is
parsed once at postinstall time via gray-matter and embedded as JSON.
The 25 `create.docLazy` calls keep referencing the same constants by
name, so the source-tree shape and the route's `page.data` contract are
unchanged. **Lazy body imports are preserved** — bodies still compile
on-demand at first request.

| | Before | After |
|---|---|---|
| eager `?only=frontmatter` virtual modules | 8,052 | 0 |
| lazy `?collection=` body chunks | 8,052 | 8,052 |
| `.source/server.ts` size | 3.1 MB / 8,109 lines | 5.3 MB / 50,706 lines |
| `.source/server.ts` cost in turbopack graph | resolve + parse 8 k modules eagerly | parse one 5.3 MB JS file once |

`postinstall` runs `fumadocs-mdx && node …inline-frontmatter.mjs`, so
fresh installs auto-patch. The patched file is committed alongside
`.source/server.ts` (the same race-workaround as before).

Tier-1 levers stay in place; they were not the cause but each remains a
small independent win and a hedge against the next bottleneck.

## Tier-2 outcome + Tier-3: scope static-gen to EN

Tier-2 build (commit `224614bded`) ran for **7 minutes** before SIGKILL
(vs 2 m 19 s previously). The curve shows the inline-frontmatter patch
fixed compile — RSS still spikes to 7 GB at 45 s, but the build now
moves *past* compile and runs static-page generation. The kill happens
during static-gen / finalization:

| t | PID-2564 RSS | likely phase |
|---|---|---|
| 45 s | 7076 MB | compile peak |
| 62–119 s | 7140 MB | compile finishing / collecting page data |
| 144 s | 7401 MB | static-gen starts (slow ramp begins) |
| 309 s | 7942 MB | mid-gen |
| 389 s | 8041 MB | late gen |
| 406 s | **8673 MB** | sudden +632 MB jump — finalization |
| 428 s | SIGKILL | |

Main process accumulates ~1.5 GB across the ~5 min static-gen window,
plus another +600 MB spike at finalization. Math: 8,213 routes ×
~200 KB output (HTML + RSC payload) ≈ 1.6 GB — matches the climb. Body
chunks loaded lazily per render also stay in the bundler's module cache
on the main side.

Fix: keep compile at 25 locales (needed so on-demand renders have body
chunks in the function bundle), but **only pre-render EN at build time**.
Translations are still served — they render on first request and
Netlify Durable caches the result.

| | Before | After |
|---|---|---|
| `generateStaticParams` count | 8,213 | ~326 (EN only) |
| static-gen RSS accumulation | ~1.6 GB | ~65 MB |
| compile cost | 7 GB (unchanged) | 7 GB |
| projected peak RSS | ~8.7 GB → SIGKILL | ~7.2 GB → fits |

Mechanics:

- `src/lib/poc-fumadocs/source.ts` exposes `prerenderLocaleParams()` that
  honours `NEXT_PUBLIC_PRERENDER_LOCALES`. Unset = pre-render all.
- `app/[locale]/[...slug]/page.tsx` uses it in `generateStaticParams`
  and sets `export const dynamicParams = true` so locales outside the
  pre-render set are rendered on-demand.
- `netlify.toml` sets `NEXT_PUBLIC_PRERENDER_LOCALES=en`. Bump up as
  headroom allows.

No ISR-404 regress: the on-demand render path reads frontmatter from
inline constants in `.source/server.ts` and loads body via the
pre-compiled lazy chunks that *are* in the function bundle — never from
`public/content/` at request time.

Tier-4 levers if static-gen still overflows even at 326 EN-only routes:

- **`fumadocs dynamic: true`** — runtime MDX compile, zero build-time
  body compilation. Tradeoff: cold-route TTFB; needs `public/content/`
  re-added to function bundle (re-opens ISR-404 risk for routes using
  data-layer fetchers).
- **Webpack A/B** — `next build --webpack`, `experimental.webpackMemoryOptimizations: true`.
- **Split-build per locale group** — the previous fallback.

## Feature parity gaps (intentional, PoC-scope)

| Feature | Reattach plan |
|---|---|
| `I18nProvider` + scoped messages | done |
| JSON-LD on catch-all | done (reads `page.data` frontmatter) |
| Per-page layout selection | done (per-page via `frontmatter.template`) |
| Reading-time | **stub** (`{ minutes: 5 }`); real fix is a remark plugin |
| Video transcript in JSON-LD | dropped; needs `includeProcessedMarkdown: true` |
| Contributors / `lastEditLocaleTimestamp` | done (via `getStaticGitHubContributors`, already safe) |
| Tutorials' `timeToRead` | **stub** (5 min) — same fix as catch-all reading-time |

## Known content-tree quirks surfaced by the run

1. **Stale image refs in translations** (~29). Translations point at EN
   image paths since renamed. Today's pipeline also 404s on these at
   request time; PoC tolerates by skipping width/height on missing files.
   Real fix is to rerun intl-pipeline.
2. **Malformed YAML frontmatter in `te/videos/ai-agents-interview-luna`** —
   duplicate `title:` prefix; cleaned. A pre-merge YAML lint on
   `translations/**/*.md` would catch this class.
3. **`.md` mode silently strips JSX components** (58/326 EN files use
   `<Card>` / `<Alert>` / `<Emoji>` / etc.). Fumadocs derives MDX `format`
   from extension. Workaround: mechanical `.md` → `.mdx` rename.

## Measurements summary (local, baseline reference)

Cold builds, `LIMIT_CPUS=8`, `NODE_OPTIONS=--max-old-space-size=8192`,
Next.js 16.2.3 Turbopack — measured locally except the Netlify rows.

| Mode | Routes | Compile | Wall | `.next` |
|---|---|---|---|---|
| Baseline (legacy, 25 locales) | 1140 | 26.6 s | 1 m 42 s | 1.6 GB |
| 25-locale full PoC (local) | 8213 | 3.0 min | 6 m 15 s | 8.2 GB |
| Netlify EN-only PoC (deployed) | 388 | 32.5 s | 1 m 22 s | — |
| Netlify 6-locale PoC (deployed) | ~2300 | 45 s | ~4 min | — |

Per-page cost: ~22 ms compile, ~17 ms static-gen across the locale
matrix. Static-gen wall time is roughly constant in route count because
the fumadocs pages are pre-compiled JS modules.

`NEXT_PUBLIC_BUILD_LOCALES` is honoured at three layers: `source.config.ts`
swaps disabled locales' glob to a never-match pattern, `source.ts` filters
the loader map, `allLocaleParams()` iterates only enabled locales.

---

## The `.source/` race and how it was fixed

In `fumadocs-mdx@15.0.2`, `createMDX()` calls its async `init()`
fire-and-forget — `next.config.js` returns before the file generation
completes. At small scale the race is invisible; at 25 collections × 326
files the gap is wide enough that `.source/server.ts` lands on disk with
only ~3 of 25 collections populated. The smoking gun in build logs was
`[MDX] generated files in 12-20ms` vs. the 137-300 ms a clean run takes.

Fix has four pieces, none sufficient alone:

1. **`package.json`** — conditional postinstall: `test -f .source/server.ts
   || fumadocs-mdx`. Regenerates when missing (local cold install), no-ops
   when the committed copy is present (Netlify).
2. **`next.config.js`** — `process.env._FUMADOCS_MDX = "1"` set *before*
   `require("fumadocs-mdx/next")` short-circuits the fire-and-forget init.
3. **`source.config.ts`** — `async: true` on every collection. Lazy
   `() => import()` body refs, eager frontmatter only. Shrinks the eager
   build-graph.
4. **`.source/` is checked in** (gitignore entry replaced with a comment).
   Workaround for the upstream race, not a permanent fix. Regenerate with
   `NEXT_PUBLIC_BUILD_LOCALES=<…> npx fumadocs-mdx` when content changes.

**Upstream issue worth filing:** the race is reproducible at any scale
that pushes init() longer than the time until the first turbopack consumer
reads `.source/server.ts`. Fix is either `await init(...)` in `createMDX`
or an opt-in `createMDX({ sync: true })`.

## How to reproduce

```bash
pnpm install
# postinstall regenerates .source/ if missing; otherwise the committed copy is used.
pnpm dev
# Visit /en/<slug>/ for any EN page — fumadocs serves the catch-all directly.
```

Regenerate `.source/` after content edits:

```bash
NEXT_PUBLIC_BUILD_LOCALES=en npx fumadocs-mdx   # EN-only
npx fumadocs-mdx                                # all 25 locales
```

To remove: revert `next.config.js`, `netlify.toml`, `package.json`, delete
`source.config.ts`, `.source/`, `src/lib/poc-fumadocs/`, `docs/poc/`, then
`pnpm remove fumadocs-mdx fumadocs-core`.
