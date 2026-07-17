---
name: performance
description: Performance patterns and anti-patterns for ethereum.org covering TTFB, LCP, INP, CLS, bundle size, build memory, and RSC payload. Use when diagnosing a perf regression or reviewing proposed code changes for perf landmines.
user-invocable: false
---

# Performance Knowledge

Knowledge base. No runtime actions; authoring conventions for maintainers below. Read the relevant `references/*.md` files directly via the Read tool.

## Two entry points

- **Diagnosing** an existing regression → `references/diagnose-table.md` (symptom → bucket).
- **Reviewing** a proposed change before merge → `references/review-checklist.md` (diff pattern → rules to load).

Both flows always also load `references/anti-patterns.md`.

## File map

| Topic                           | File                             |
| ------------------------------- | -------------------------------- |
| Symptom → bucket routing        | `references/diagnose-table.md`   |
| Diff pattern → rules routing    | `references/review-checklist.md` |
| TTFB, edge caching, CDN         | `references/edge-caching.md`     |
| Bundle size, code splitting     | `references/bundle.md`           |
| Build OOM, ENOSPC, file tracing | `references/build.md`            |
| RSC payload, HTML size          | `references/rsc.md`              |
| INP, main-thread work           | `references/inp.md`              |
| LCP, images                     | `references/images.md`           |
| Cross-cutting anti-patterns     | `references/anti-patterns.md`    |

For data-fetching patterns (Trigger.dev tasks, Netlify Blobs, `src/lib/data` caching, internal `/api/*` routes, fetcher retries), use the `data-layer` skill instead.

## Conventions for adding rules

- One topic per file; no content duplication across files.
- Cite a PR (`PR #N`) when a rule comes from a specific shipped change. Add a SHA only when no PR exists.
- Forward-looking ("do this, avoid that"). Keep entries prescriptive — no postmortems or incident narratives.
- New review check? Add a row to `review-checklist.md` AND the matching bucket file. Don't restate the rule inline.
