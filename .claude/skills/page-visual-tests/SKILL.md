---
name: page-visual-tests
description: Playwright + Chromatic full-page visual tests for ethereum.org. Trigger on "add a page to the visual suite", "the snapshot keeps changing", "chromatic pages", "chromatic playwright", or edits to `tests/visual/`, `playwright.visual.config.ts`, or the `page-visual-tests` job in `.github/workflows/ci.yml`. Skip for Storybook Chromatic (the `visual-tests` job in ci.yml), e2e (`tests/e2e/`), unit (`tests/unit/`).
---

# Page Visual Tests (Playwright + Chromatic)

This repo has two Chromatic projects: Storybook (the `visual-tests` job in `.github/workflows/ci.yml`, which calls `chromaui/action` directly; `pnpm chromatic` still exists for local runs) and **page visual tests** (the `page-visual-tests` job in ci.yml + `pnpm chromatic:pages`). This skill is the second one only.

The Playwright suite captures DOM archives (not PNGs) per page × viewport; Chromatic re-renders them in the cloud to diff. A green local `pnpm test:visual` just means archives were produced — the diff happens after upload.

## Files that matter

- `playwright.visual.config.ts` — visual-only config (3 viewports + `webServer`)
- `playwright.config.ts` — base (e2e + unit; **no `webServer`**)
- `tests/visual/pages.spec.ts` — page list + readiness pattern
- `.github/workflows/ci.yml` — CI (the `page-visual-tests` job)
- `src/components/ui/skeleton.tsx`, `src/components/ui/spinner.tsx` — loading primitives
- `package.json` scripts: `test:visual*`, `chromatic:pages`

## Non-obvious constraints

**Dual Playwright config.** `webServer` lives only in `playwright.visual.config.ts`. Moving it into the base config breaks `pnpm test:unit` and `pnpm test:e2e` in CI — they try to start Next against a missing `.next` build.

**Desktop viewport is 1024, not 1280.** Chromatic caps snapshots at `width × height ≤ 25M` px. The tallest tested pages reach ~22.5k px; 1280 overflows, 1024 fits. Measure `document.documentElement.scrollHeight` before raising the viewport or adding a long page.

**Loading contract: `data-slot="loading"`.** The shared `Skeleton` and `Spinner` primitives carry this attribute. Each test waits until `document.querySelectorAll('[data-slot="loading"]').length === 0` before snapshotting. Any bespoke loader — raw `animate-pulse-light`, a local Skeleton copy, a custom spinner — is invisible to the wait and will silently flake. Fix by routing through the shared primitive or adding `data-slot="loading"` to the bespoke loader's root.

**Imports come from `@chromatic-com/playwright`, not `@playwright/test`.** The two packages re-export `expect` with skewed types, so `expect(...).toHaveCount(0)` misbehaves — prefer `page.waitForFunction` for the loading wait.

**Environment.** `USE_MOCK_DATA=true` and `NEXT_PUBLIC_BUILD_LOCALES` are required at build and test time. The local `test:visual:build` script sets `NEXT_PUBLIC_BUILD_LOCALES=en`; CI's shared build in ci.yml uses `NEXT_PUBLIC_BUILD_LOCALES: "en,es,zh,ar"` because one build artifact serves the e2e, lighthouse, and visual jobs. Paths in the spec are unprefixed (`/wallets/`, not `/en/wallets/`) because `localePrefix: "as-needed"` serves English at the root — adding `/en` would just trigger a redirect.

**Random ordering: `safeShuffle`.** Lodash `shuffle` and `.sort(() => Math.random() - 0.5)` flake snapshots independently of loaders. Wrap them with `safeShuffle` from `src/lib/utils/random.ts` — it returns the list unchanged when `IS_VISUAL_TEST=true`. Current call sites: `wallets.ts`, `apps.ts` (Highlights/Discover/AppOfTheWeek), `src/components/Staking/StakingProductsCardGrid/index.tsx`. The env var is exposed to the client bundle via `next.config.js`'s `env` block; without that, `process.env.IS_VISUAL_TEST` evaluates to `undefined` in client components and the shuffle still runs.

**Use `domcontentloaded`, not `networkidle`.** Analytics and background fetches keep the network perpetually busy.

## Canonical test

```ts
import { takeSnapshot, test } from "@chromatic-com/playwright"

const pages: Array<{ name: string; path: string }> = [
  { name: "Homepage", path: "/" },
  { name: "Docs - Smart Contracts", path: "/developers/docs/smart-contracts/" },
  // ...
]

test.describe("Page Visual Tests", () => {
  for (const { name, path } of pages) {
    test(name, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: "domcontentloaded" })
      await page.waitForFunction(
        () => document.querySelectorAll('[data-slot="loading"]').length === 0
      )
      // FeedbackWidget is dynamic({ ssr: false }); waiting for its button proves
      // hydration finished and dynamic chunks landed — same pattern other
      // ssr:false components (Emoji/Twemoji) rely on to render.
      await page.waitForSelector('[data-testid="feedback-widget-button"]')
      await takeSnapshot(page, testInfo)
    })
  }
})
```

## Common situations

**Adding a page.** Each entry costs three snapshots (one per viewport) against Chromatic's budget, so check whether the page's layout (under `src/layouts/`) is already covered before adding. Scan the page subtree for bespoke loaders — they're the single biggest flake cause — and confirm full-page height stays under the 25M-pixel budget. Local loop: `pnpm test:visual:build` once, then `pnpm test:visual:desktop` for iteration, `pnpm test:visual` for the full sweep.

**Flaky snapshot.** Two main causes. (1) A loader without `data-slot="loading"` — run with `--trace=on` and inspect the `waitForFunction` step; ~0 ms duration means it isn't being waited on. (2) Random ordering — grep the page subtree for `shuffle(`, `Math.random()`, or `.sort(() =>` and route through `safeShuffle`. If dynamic content is drifting, double-check `USE_MOCK_DATA=true` is set in both build and test steps.

**Local `pnpm dev` masks a regression.** `playwright.visual.config.ts` sets `reuseExistingServer: true`, which is correct for CI but means a `pnpm dev` already running on :3000 will be used silently in place of the production build the suite assumes. If a snapshot diff doesn't reproduce in CI, kill the dev server and run `pnpm test:visual:build` to rebuild against the production output before retrying.

**Pixel-limit error.** Measure the page's full-page height at 1024 px; if it exceeds ~24,400 px, the page needs shortening or removal from the suite. Cropping to viewport was considered and rejected — it defeats the below-the-fold regression coverage that justifies using Playwright over Storybook here.

**Works locally, fails in CI.** Usually `HOME: /root` missing from the test step — GitHub Actions overrides `HOME` inside containers, and Playwright can no longer find the browsers baked into the `mcr.microsoft.com/playwright` image. Also check that the image tag matches `@playwright/test` in `package.json`.

Branch: `feat/playwright-chromatic-page-visual-tests` · PR: <https://github.com/ethereum/ethereum-org-website/pull/18009>
