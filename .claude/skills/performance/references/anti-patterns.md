# Cross-cutting anti-patterns

These look right but aren't. Load alongside the bucket-specific file for any review or diagnose pass.

| Looks like…                                                  | Actually…                                                                  |
|--------------------------------------------------------------|----------------------------------------------------------------------------|
| Adding `CDN-Cache-Control` to fix TTFB                       | Netlify strips them; CF ignores due to `max-age=0`.                        |
| Using `unstable_cache` in MDX routes                         | Triggers ISR → runtime 404s. See `edge-caching.md`.                        |
| `` await import(`.../${locale}/${ns}.json`) ``               | Webpack enumerates all combinations → OOM. Use `fs.readFile`.              |
| Adding a `useSession` / `cookies()` in root layout           | Every route becomes dynamic. Edge caching dies silently.                   |
| `priority: true` via `getImageProps()` on manual `<picture>` | `fetchPriority` attribute is not set; add it manually.                     |
| Bumping `revalidate` to hourly to "fix staleness"            | Increases edge miss rate. Keep daily; add client `/api/*` for freshness.   |
| Mocking DB/content in perf tests                             | Perf wins must be measured against real prod build (`pnpm build && start`).|
| Removing `common.json` keys without audit                    | Unused-lookups throw at runtime. Use `scripts/audit-common-translations.ts`.|
