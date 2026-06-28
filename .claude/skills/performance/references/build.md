# Build-time: memory, disk, tracing

## `fs.readFile` > `await import()` for bundler-invisible content (PR #17589)

When loading content with a variable path (i18n JSON by locale, markdown by slug), dynamic `import()` forces webpack/Turbopack to enumerate every possible chunk — 3000+ chunks across locales × namespaces.

```ts
// Bad — webpack enumerates all locale×namespace combinations
const messages = await import(`../intl/${locale}/${namespace}.json`)

// Good — invisible to module graph
const messages = JSON.parse(await fs.readFile(
  path.join(process.cwd(), "src/intl", locale, `${namespace}.json`),
  "utf8"
))
```

Same fix applied to tutorial MD under Turbopack (SHA `30e0ecc6b`, 143k+ file trace).

## Netlify build failures

**OOM during webpack compile** → apply `fs.readFile` pattern above; verify with `NODE_OPTIONS="--max-old-space-size=8192"` locally.

**ENOSPC (disk full)** → `.next/cache` is ~4GB webpack cache that Netlify never reuses. Fix in `netlify.toml`:

```toml
command = "pnpm build && rm -rf .next/cache"
```

(PR #17971, SHA `12c01e79f`). Also check if `.next/server/.segments/` (Next.js 16+) is inflating — it duplicates into `.next/standalone/`.

**Missing files at runtime** → force into serverless bundle via `outputFileTracingIncludes`:

```ts
// next.config.js
outputFileTracingIncludes: {
  "/**/*": ["./src/data/**/*"],
}
```

(SHA `f1425bdb4`).

**Large static assets bloating function** → move to `public/` and reference as URL (SHA `11e38234b` — 47MB mp3 reduction). Also exclude via `outputFileTracingExcludes`.

## Turbopack-specific

Both rules apply to Turbopack only — webpack handles these cases correctly.

- `turbopackIgnore` comments **only work on actual `import()` call sites**, not on helper wrappers that call them. Move the magic comment to where the dynamic `import()` actually appears, or remove the wrapper (SHA `3fdc233616`).
- Turbopack file-tracing warnings only resolve **inline string literals** in dynamic import paths. If the path is built from variables (e.g. `${baseDir}/${file}`), Turbopack can't see the target — inline the constant or split the dynamic segment so the literal portion is visible.
