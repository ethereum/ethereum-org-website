/**
 * Regression test for run 31149083965 ($1,108, 2026-08-07) against the real
 * files that caused it, read out of git history rather than reconstructed as
 * fixtures. Commit 3c76f545 is the tree that run checked out.
 *
 * Two things must hold: the planner produces a sane plan for that input, and
 * the budget it derives would have refused the plan the old batcher produced.
 */

import { execFileSync } from "child_process"

import { expect, test } from "@playwright/test"

import {
  MAX_BATCHES_PER_FILE,
  MAX_PROMPT_BYTES,
} from "../../../src/scripts/intl-pipeline/constants"
import { FileBudgetExceededError } from "../../../src/scripts/intl-pipeline/lib/llm/cost-meter"
import { extractJsonSections } from "../../../src/scripts/intl-pipeline/lib/llm/incremental-translate"
import { planIncrementalBatches } from "../../../src/scripts/intl-pipeline/lib/llm/plan"

const INCIDENT_SHA = "3c76f545357f4d2d02a6f906d4b647d531be7088"
const FILE = "src/intl/en/learn-quizzes.json"

// What the run actually sent per call, from its logs: 488 batches of ~129KB.
const INCIDENT_BATCHES = 488
const INCIDENT_PROMPT_BYTES = 128_801

function fileAt(sha: string, filePath: string): string {
  return execFileSync("git", ["show", `${sha}:${filePath}`], {
    encoding: "utf-8",
    maxBuffer: 1 << 28,
  })
}

function planIncident(locale: string) {
  const english = fileAt(INCIDENT_SHA, FILE)
  const localeContent = fileAt(
    INCIDENT_SHA,
    `src/intl/${locale}/learn-quizzes.json`
  )

  // Drift for this run was "English keys with no counterpart in the locale
  // file" -- the 488 new quiz strings.
  const localeIds = new Set(extractJsonSections(localeContent).map((s) => s.id))
  const sectionIds = extractJsonSections(english)
    .filter((s) => !localeIds.has(s.id))
    .map((s) => s.id)

  return {
    sectionIds,
    plan: planIncrementalBatches({
      filePath: FILE,
      fileType: "json",
      locale,
      languageName: locale,
      englishContent: english,
      localeContent,
      sectionIds,
      glossaryTerms: new Map(),
    }),
  }
}

test.describe("2026-08-07 incident, replayed on the real files", () => {
  test("the same input still yields 488 changed strings", () => {
    const { sectionIds } = planIncident("ar")
    expect(sectionIds).toHaveLength(488)
  })

  test("planner batches them into a handful of requests, not one each", () => {
    const { plan } = planIncident("ar")
    expect(plan).not.toBeNull()
    expect(plan!.batches.length).toBeLessThan(10)
    expect(plan!.batches.length).toBeLessThanOrEqual(MAX_BATCHES_PER_FILE)
    expect(plan!.translateCount).toBe(488)
  })

  test("every planned prompt fits the per-call ceiling", () => {
    const { plan } = planIncident("ar")
    for (const batch of plan!.batches) {
      expect(batch.bytes).toBeLessThanOrEqual(MAX_PROMPT_BYTES)
    }
  })

  test("the plan is within its budget, so the run would proceed", () => {
    const { plan } = planIncident("ar")
    expect(plan!.overBudget).toBe(false)
    expect(plan!.tooManyBatches).toBe(false)
    expect(plan!.projectedBytes).toBeLessThan(plan!.budget.limitBytes)
  })

  test("that same budget refuses what the run actually sent", () => {
    const { plan } = planIncident("ar")
    expect(() =>
      plan!.budget.assertProjected(
        INCIDENT_BATCHES * INCIDENT_PROMPT_BYTES,
        `${INCIDENT_BATCHES} incremental batch(es)`
      )
    ).toThrow(FileBudgetExceededError)
  })

  test("cost collapses by three orders of magnitude", () => {
    const { plan } = planIncident("ar")
    const incidentBytes = INCIDENT_BATCHES * INCIDENT_PROMPT_BYTES
    expect(plan!.projectedBytes * 100).toBeLessThan(incidentBytes)
  })

  // Non-Latin, Latin, and Indic locales exercise different byte-per-character
  // ratios through the same wire-byte accounting.
  for (const locale of ["ar", "de", "ta"]) {
    test(`bounded for ${locale}`, () => {
      const { plan } = planIncident(locale)
      expect(plan!.overBudget).toBe(false)
      expect(plan!.batches.length).toBeLessThan(10)
    })
  }
})
