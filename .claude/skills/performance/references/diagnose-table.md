# Diagnose: symptom → bucket

Pick the matching row. Load the named reference file. Always also load `anti-patterns.md`.

**For LCP, the bucket is layered.** Work `images.md` → `bundle.md` → `rsc.md` in that order — load all three when LCP is the metric, since hero preload, JS budget, and HTML/RSC weight all contribute.

**For TTFB:** this is almost certainly a CF-caching / devops issue, not an app-side fix. Surface that up front before proposing Netlify header changes — see `edge-caching.md`.

| Symptom                                         | Bucket                          | Reference file        |
|-------------------------------------------------|---------------------------------|-----------------------|
| P75 TTFB > 800ms in field data                  | Edge caching / routing          | `edge-caching.md`     |
| LCP > 2.5s                                      | Images → bundle → RSC (in order)| `images.md`, `bundle.md`, `rsc.md` |
| INP > 200ms on interaction                      | Main-thread / analytics / lists | `inp.md`              |
| CLS > 0.1                                       | Image dimensions / late mounts  | `images.md`           |
| Large HTML payload (>500KB)                     | RSC / translations              | `rsc.md`              |
| Large JS bundle on first load                   | Code splitting / lazy           | `bundle.md`           |
| Netlify build OOM or ENOSPC                     | Build-time / webpack tracing    | `build.md`            |
| Slow page but fast TTFB and small bundle        | Data fetching / cache misses    | _see `data-layer` skill_ |

## Baseline first

Always collect numbers before coding: PSI field data, Sentry LCP/INP P75, `web-vitals` in dev, `pnpm build` output, `.next/` dir sizes. **No before = no after.**

If the regression only reproduces in `pnpm dev`, rebuild with `pnpm build && pnpm start` before believing it.
