/**
 * PR-body robustness -- guards against the >65,536-char failure that blocked
 * the pipeline's own PR step on full-tree runs (see PR #18471, which had to be
 * opened by hand). The body must always post: failure lists are capped and the
 * assembled body is clamped under GitHub's limit.
 */

import { expect, test } from "@playwright/test"

// Side-effect import: sets placeholder tokens before the @/scripts import below,
// because config.ts throws on a missing GITHUB_API_TOKEN at import time.
import "./env-shim"

import {
  clampBody,
  generateRunSummary,
  MAX_PR_BODY,
  type RunFailure,
} from "@/scripts/intl-pipeline/lib/workflows/pr-creation"

test.describe("PR body limits", () => {
  test("clampBody leaves short bodies untouched", () => {
    const body = "## short body\n\nnothing to clamp"
    expect(clampBody(body)).toBe(body)
  })

  test("clampBody truncates over-limit bodies, keeps the tail, stays under limit", () => {
    const newest = "### Run: NEWEST -- this must survive"
    const body = "x".repeat(MAX_PR_BODY * 2) + "\n" + newest
    const clamped = clampBody(body)
    expect(clamped.length).toBeLessThanOrEqual(MAX_PR_BODY)
    expect(clamped).toContain(newest) // tail preserved
    expect(clamped).toContain("truncated") // notice prefixed
  })

  test("generateRunSummary lists skipped pairs and how to force them", () => {
    const summary = generateRunSummary(
      ["de"],
      [{ path: "src/intl/de/common.json", content: "{}" }],
      "auto",
      undefined,
      [],
      [
        {
          locale: "zh",
          file: "public/content/whitepaper/index.md",
          class: "validation",
          reason: "Suspiciously short: 378 chars vs 1571 English chars",
          expiresAt: "2026-10-07T05:12:00.429Z",
        },
      ]
    )
    expect(summary).toContain("1 pair(s) skipped")
    expect(summary).toContain("public/content/whitepaper/index.md")
    expect(summary).toContain("validation, until 2026-10-07")
    expect(summary).toContain("mode=full")
  })

  test("a quarantined failure is marked and its rerun forces mode=full", () => {
    const summary = generateRunSummary(["fr"], [], "auto", undefined, [
      {
        locale: "fr",
        file: "public/content/x/index.md",
        message: "Output validation failed after 3 attempts",
        quarantined: true,
      },
    ])
    expect(summary).toContain("_(quarantined)_")
    expect(summary).toContain('-f target_languages="fr" -f mode=full')
  })

  test("generateRunSummary caps a huge failure list and still fits", () => {
    const failures: RunFailure[] = Array.from({ length: 600 }, (_, i) => ({
      locale: "fr",
      file: `public/content/developers/docs/page-${i}/index.md`,
      message: "Gemini returned no content (finishReason=RECITATION).",
    }))
    const summary = generateRunSummary(
      ["fr", "es"],
      [{ path: "public/content/x/index.md", content: "c" }],
      "auto",
      "https://example.com/run/1",
      failures
    )
    expect(summary).toContain("600 task(s) failed (showing first 40)")
    expect(summary).toContain("...and 560 more")
    // Exactly 40 failure bullets and 40 rerun commands are emitted -- not all
    // 600. (A regression that printed the cap text but still looped every
    // failure would slip past a length-only check.)
    const bulletLines = summary
      .split("\n")
      .filter((l) => /^- `public\/content\//.test(l))
    const rerunLines = summary
      .split("\n")
      .filter((l) => l.startsWith("gh workflow run"))
    expect(bulletLines).toHaveLength(40)
    expect(rerunLines).toHaveLength(40)
    // 600 raw failure+rerun lines would blow the limit; the capped summary
    // must comfortably fit even before the final clampBody safety net.
    expect(summary.length).toBeLessThan(MAX_PR_BODY)
  })
})
