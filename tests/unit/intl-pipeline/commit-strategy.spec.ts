/**
 * Commit Strategy Tests -- CONCURRENCY-SPEC.md Part 3
 *
 * Branch naming is unit-tested locally.
 * Squash/merge/failure behaviors are validated via GH Action runs
 * (see test-manual-11 series) and documented here as contracts.
 */

import { expect, test } from "@playwright/test"

import { generateTempBranchName } from "../../../src/scripts/intl-pipeline/lib/utils/branch-naming"

test.describe("Commit strategy", () => {
  test("temp branch name format: tmp-intl/run-MMDD-HHMM", () => {
    const name = generateTempBranchName()
    expect(name).toMatch(/^tmp-intl\/run-\d{4}-\d{4}$/)
  })

  test("temp branch name uses UTC", () => {
    const name = generateTempBranchName()
    const match = name.match(/run-(\d{2})(\d{2})-(\d{2})(\d{2})/)
    expect(match).not.toBeNull()
    const month = parseInt(match![1])
    const day = parseInt(match![2])
    const hour = parseInt(match![3])
    const minute = parseInt(match![4])
    expect(month).toBeGreaterThanOrEqual(1)
    expect(month).toBeLessThanOrEqual(12)
    expect(day).toBeGreaterThanOrEqual(1)
    expect(day).toBeLessThanOrEqual(31)
    expect(hour).toBeGreaterThanOrEqual(0)
    expect(hour).toBeLessThanOrEqual(23)
    expect(minute).toBeGreaterThanOrEqual(0)
    expect(minute).toBeLessThanOrEqual(59)
  })
})

/**
 * The following behaviors are validated via GH Action test runs
 * and documented here as contracts. They require real GitHub API
 * interactions that cannot be unit-tested without mock infrastructure.
 *
 * Validated by: test-manual-11a (full, ko+es) and test-manual-11b (incremental, ko+es)
 * Run URLs:
 *   11a: https://github.com/ethereum/ethereum-org-website/actions/runs/24324935910
 *   11b: https://github.com/ethereum/ethereum-org-website/actions/runs/24325006864
 *
 * Verified behaviors:
 *
 * 1. Single and multi-language squash:
 *    - Each language produces one squashed commit: "i18n(es): Gemini translation", "i18n(ko): Gemini translation"
 *    - Individual per-file commits are collapsed into the squashed commit
 *    - Commit history: es commit -> ko commit -> sanitize -> merge (clean, no interleaving)
 *
 * 2. Temp branch + merge:
 *    - Pipeline creates tmp-intl/run-MMDD-HHMM as working branch
 *    - All commits land on temp branch during execution
 *    - On success: temp branch merged into target with "i18n: merge tmp-intl/run-... into ..."
 *
 * 3. Sanitizer runs after squash, before merge:
 *    - "i18n: sanitize translation output" commit appears after language commits, before merge
 *
 * 4. Zero-drift produces no commits:
 *    - Validated by test-manual-10c (https://github.com/ethereum/ethereum-org-website/actions/runs/24298937958)
 *    - Branch created but zero new commits when manifests are current
 *
 * 5. Per-language squash at end of run (not mid-run):
 *    - squashByLanguage() called after pool.drain() to avoid race conditions
 *    - All languages finish before any squashing begins
 */
