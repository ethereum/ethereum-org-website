---
title: "Turbopack File Tracer Doesn't Resolve String Constants Imported from Other Modules"
slug: "turbopack-file-tracer-doesnt-fold-cross-module-string-constants"
category: "build-errors"
severity: "low"
symptoms:
  - "Turbopack build emits 'Overly broad patterns' warnings pointing at path.join() calls in the MDX pipeline"
  - "Warning pattern drops the literal path prefix and widens to mostly <dynamic> when the prefix comes from an imported constant"
  - "Pattern match count jumps ~4x (e.g. 28k → 110k files) compared to the same join() with an inlined literal"
components:
  - "src/lib/md/compile.ts"
  - "src/lib/utils/md.ts"
  - "src/lib/i18n/translationRegistry.ts"
  - "next.config.js (turbopack.ignoreIssue)"
tags:
  - "turbopack"
  - "next.js"
  - "file-tracing"
  - "nft"
  - "mdx"
  - "output-file-tracing"
resolved_at: "2026-04-01"
pr: "#17906"
---

# Turbopack File Tracer Doesn't Resolve String Constants Imported from Other Modules

## Problem

Turbopack's file tracer emits "Overly broad patterns can lead to build performance issues and over bundling" warnings on `path.join()` calls that mix a module-level constant with dynamic arguments:

```ts
// src/lib/md/compile.ts
import { CONTENT_DIR, CONTENT_PATH } from "../constants"
// ...
const mdPath = join(CONTENT_PATH, ...slugArray)
const mdDir = join(CONTENT_DIR, ...slugArray)
```

The constants are plain string literals (`CONTENT_DIR = "public/content"`) defined in `src/lib/constants.ts`. Logically the tracer should treat the call as equivalent to `join("public/content", ...slugArray)`, but it does not.

## Root Cause

Next's file-tracing pass (the analyzer behind `outputFileTracing`) uses a local per-file evaluator. It can resolve literals that appear **in the same file** as the `join()` call, but it does **not** follow imports to resolve literals declared in another module. When it sees an imported binding, it treats that argument as unknown — a fully dynamic segment.

Measured in build logs with `ignoreIssue` temporarily disabled:

| Call site | With literal at call site | With imported constant |
|---|---:|---:|
| `src/lib/utils/md.ts:23` — `join(contentRoot, dir)` | 28,040 files matched | 110,708 files matched |
| `src/lib/i18n/translationRegistry.ts` — `join(TRANSLATIONS_DIR, locale, slug, "index.md")` | 25,044 files matched | 39,272 files matched |

Same warning **count** in both variants (the tracer still emits one warning per site), but the **scope** — the set of files the tracer considers in-scope for that site — is dramatically larger with imported constants. The literal prefix `"public/content"` dissolves into `<dynamic>` and the scope balloons to "anywhere under project root."

This is not a bundler-correctness issue. The main Turbopack bundler does fold cross-module literals. It's specifically the file-trace pass (based on Node File Trace) that has a narrower evaluator.

## Resolution

Two changes, both in PR #17906, commit `5f1aae57`:

1. **Inline the literal at the call site** in files that feed `path.join(...)` into `fs`/MDX reads with dynamic suffixes:
   - `src/lib/md/compile.ts` — inline `"/content"` and `"public/content"` instead of importing `CONTENT_PATH`/`CONTENT_DIR`
   - `src/lib/utils/md.ts` — inline `"public/content"` in `getContentRoot()` and in `getTutorialsData()`
   - `src/lib/i18n/translationRegistry.ts` — inline `"public/content/translations"` instead of importing `TRANSLATIONS_DIR`

2. **Suppress the residual warnings** in `next.config.js`:

   ```js
   turbopack: {
     ignoreIssue: [
       { path: "**/src/lib/**", description: /Overly broad patterns/ },
       { path: "**/src/lib/**", title: /Encountered unexpected file/ },
     ],
   }
   ```

   `outputFileTracingExcludes` already prevents these patterns from over-bundling, so the warnings are cosmetic — but narrowing the pattern first (step 1) keeps the tracer's actual walked set small.

## Why not just use `ignoreIssue` alone?

Both steps are needed. `ignoreIssue` only silences the log output — it doesn't change what the tracer walks. Inlining narrows the tracer's scope to the correct subtree (`public/content/**`) instead of the whole project tree. If `ignoreIssue` is ever removed or its matcher tightened, the inlined form is what keeps the warnings manageable.

## Don't revert the inlining

Reviewers may be tempted to replace the inlined `"public/content"` strings with imports of `CONTENT_DIR` for consistency with `videos.ts`, `editPath.ts`, `contributors.ts`, and `fetchGitHubContributors.ts` (which all import the constant). That works in those files because they combine the constant with a **static suffix** — no dynamic spread — so the tracer never widens anyway:

```ts
// fine — static suffix, no dynamic spread
const videosDir = join(process.cwd(), CONTENT_DIR, "videos")
```

The rule:

- **Constant + fully-static suffix** → keep the constant. Tracer is happy.
- **Constant + dynamic spread feeding `fs`/MDX reads** → inline the literal. Otherwise the tracer loses the prefix.

## Related

- Ineffective `turbopackIgnore` magic comments: the comment only works on `import()` / `require()` calls, not on `path.join()` / `fs.readFile()` / `existsSync()`. Removed from `src/lib/md/rehypeImg.ts` in PR #17906, commit `e074b37c`.
- Dynamic `import()` on templated paths was replaced with `fsp.readFile()` for a different reason — the tracer statically matches the template against all files, causing `pnpm dev` to watch tens of thousands of markdown files. See PR #17906, commit `b8af0517`.

## References

- PR #17906 ([refactor: adopt Turbopack as default bundler](https://github.com/ethereum/ethereum-org-website/pull/17906))
- Commit `5f1aae57` (inline path constants and suppress turbopack file-tracing warnings)
- [Next.js outputFileTracing](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
- [`@vercel/nft`](https://github.com/vercel/nft) — the underlying file tracer
