# Review: diff contains → load this

Mechanical scan of changed code against ethereum.org's perf landmines — patterns that pass normal review but silently regress perf because of decisions in `next.config.js`, our Netlify edge setup, or scars from past incidents. For general Next.js / React hygiene (Server Components first, lazy modals, `next/image`, virtualized lists, `startTransition`), rely on CLAUDE.md and standard tooling.

## How to use

1. List the changed files (`git diff --name-only <base>...HEAD`).
2. Walk the table below, top to bottom. For each row, grep the diff for the pattern.
3. On any hit, load the named reference file and check the change against its rules.
4. Always also load `anti-patterns.md` — it's the cross-cutting list that catches what the table misses.

| Diff contains…                                                       | Load                                                                           |
|----------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Changes under `app/**/layout.tsx` (esp. root layout)                 | `edge-caching.md` — root-layout dynamic hooks kill edge caching                |
| `cookies()` / `headers()` in a server component or route            | `edge-caching.md` — opts the route out of static caching                       |
| `unstable_cache(` on an MDX-rendered route                           | `anti-patterns.md` — triggers ISR + silent 404s on dynamic segments            |
| `import(\`…${` (template-literal dynamic import path)                | `build.md` — Webpack/Turbopack enumerates all combos → Netlify OOM             |
| `getImageProps(` used inside a manual `<picture>`                    | `images.md` — `priority: true` does NOT set `fetchPriority`; add it manually   |
| New file `app/**/page.tsx`                                           | `edge-caching.md`, `rsc.md` — verify `revalidate` strategy + RSC payload       |
| New file under `app/api/`                                            | `edge-caching.md` — TTL strategy, internal-only fetch boundary                 |
| New keys in `src/intl/en/common*.json`                               | `rsc.md` — server-only vs client (`common.json` vs `common-server.json`)       |
| Changes to `next.config.js` / `outputFileTracing*`                   | `build.md` — function bundle size, included paths                              |
| New large static asset (mp3, video, large image)                     | `build.md` — should be in `/public`, excluded from function trace              |
| New import of a heavy lib (chart, syntax highlighter, > 20KB gz)     | `bundle.md` — verify it's lazy-imported via `LazyImports.tsx`                  |
| New data fetcher / cron / blob storage                               | _see `data-layer` skill_                                                       |

If the diff is small or none of the rows apply cleanly, load `anti-patterns.md` alone and scan against it.

For investigating an existing field regression instead of reviewing a diff, use `diagnose-table.md`.
