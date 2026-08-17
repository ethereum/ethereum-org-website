/**
 * Spend bounds (src/scripts/intl-pipeline/lib/llm/cost-meter.ts).
 *
 * The per-file+locale byte budget is the primary bound; the run fuse is the
 * backstop. Both exist because run 31149083965 had neither.
 */

import { expect, test } from "@playwright/test"

import {
  MAX_CHUNK_BYTES,
  MAX_PROMPT_BYTES,
} from "../../../src/scripts/intl-pipeline/constants"
import {
  assertRunFuse,
  createFileBudget,
  estimatedCostUsd,
  FileBudgetExceededError,
  recordUsage,
  reserveForCall,
  resetMeter,
  RunFuseExceededError,
  usageTotals,
} from "../../../src/scripts/intl-pipeline/lib/llm/cost-meter"

test.describe("Per-file spend budget", () => {
  // learn-quizzes.json at the incident: 135,509 bytes of English, of which
  // 42,689 bytes across 488 keys were new -- ~98,304 wire bytes with the
  // <SECTION> envelope, i.e. 3 chunks of translatable content.
  const TRANSLATABLE_WIRE_BYTES = 98_304

  test("budget is chunks-of-changed-content x the per-call ceiling", () => {
    const budget = createFileBudget(
      "learn-quizzes.json (ar)",
      TRANSLATABLE_WIRE_BYTES
    )
    expect(budget.limitBytes).toBe(
      Math.ceil(TRANSLATABLE_WIRE_BYTES / MAX_CHUNK_BYTES) * MAX_PROMPT_BYTES
    )
  })

  test("budget ignores file size: a tiny change in a huge file gets one chunk", () => {
    const budget = createFileBudget("page-huge.json (de)", 200)
    expect(budget.limitBytes).toBe(MAX_PROMPT_BYTES)
  })

  test("the measured post-fix plan fits with headroom", () => {
    const budget = createFileBudget(
      "learn-quizzes.json (ar)",
      TRANSLATABLE_WIRE_BYTES
    )
    // 3 batches of 49,188 / 48,992 / 45,941 bytes, measured against the real files
    expect(() =>
      budget.assertProjected(144_121, "3 incremental batch(es)")
    ).not.toThrow()
  })

  test("the 2026-08-07 plan is refused before any call is sent", () => {
    const budget = createFileBudget(
      "learn-quizzes.json (ar)",
      TRANSLATABLE_WIRE_BYTES
    )
    expect(() =>
      budget.assertProjected(488 * 128_801, "488 incremental batch(es)")
    ).toThrow(FileBudgetExceededError)
  })

  test("error names the file, the ask, and the budget", () => {
    const budget = createFileBudget(
      "learn-quizzes.json (ar)",
      TRANSLATABLE_WIRE_BYTES
    )
    let message = ""
    try {
      budget.assertProjected(488 * 128_801, "488 incremental batch(es)")
    } catch (err) {
      message = err instanceof Error ? err.message : String(err)
    }
    expect(message).toContain("learn-quizzes.json (ar)")
    expect(message).toContain("488 incremental batch(es)")
    expect(message).toContain("3 chunk(s)")
  })

  test("spending trips the budget mid-loop even if the plan looked fine", () => {
    const budget = createFileBudget("some-file.json (ta)", 1_000)
    expect(() => budget.spend(MAX_PROMPT_BYTES, "batch 1/2")).not.toThrow()
    expect(() => budget.spend(MAX_PROMPT_BYTES, "batch 2/2")).toThrow(
      FileBudgetExceededError
    )
  })

  test("zero translatable bytes still gets one chunk of budget", () => {
    expect(createFileBudget("tiny.json (de)", 0).limitBytes).toBe(
      MAX_PROMPT_BYTES
    )
  })
})

test.describe("Run fuse", () => {
  test.beforeEach(() => resetMeter(10))

  test("estimates cost from token rates when the provider reports none", () => {
    recordUsage(1_000_000, 1_000_000)
    expect(estimatedCostUsd()).toBeCloseTo(14, 6)
  })

  test("prefers the provider's own cost figure when present", () => {
    recordUsage(1_000_000, 1_000_000, 0.42)
    expect(estimatedCostUsd()).toBeCloseTo(0.42, 6)
  })

  test("accumulates calls and tokens across requests", () => {
    recordUsage(500_000, 0)
    recordUsage(500_000, 0)
    const totals = usageTotals()
    expect(totals.calls).toBe(2)
    expect(totals.inputTokens).toBe(1_000_000)
    expect(totals.costUsd).toBeCloseTo(2, 6)
  })

  test("allows calls while under the fuse", () => {
    recordUsage(4_000_000, 0) // $8 of a $10 fuse
    expect(() => assertRunFuse("next call")).not.toThrow()
  })

  test("blocks the call that would cross the fuse", () => {
    recordUsage(5_000_000, 0)
    expect(() => assertRunFuse("learn-quizzes.json lang=ta")).toThrow(
      RunFuseExceededError
    )
  })

  test("concurrent in-flight calls cannot all clear a fuse one of them blows", () => {
    // Spend is recorded when a call resolves, so without reservations every
    // concurrent request sees $0 spent and passes. 16 is the default
    // GEMINI_CONCURRENCY.
    resetMeter(1)
    let admitted = 0
    for (let i = 0; i < 16; i++) {
      try {
        reserveForCall(`call ${i}`)
        admitted += 1
      } catch {
        break
      }
    }
    expect(admitted).toBeLessThan(16)
  })

  test("settling a call releases its reservation", () => {
    resetMeter(1)
    const settle = reserveForCall("call 1")
    settle(0)
    // With the reservation released and nothing recorded, the fuse is clear again
    expect(() => assertRunFuse("call 2")).not.toThrow()
  })

  test("the 2026-08-07 call pattern trips the fuse in the first minutes", () => {
    // 11,712 calls x ~48.6k input tokens. The fuse fires after ~100 calls
    // rather than billing all of them.
    let calls = 0
    for (let i = 0; i < 11_712; i++) {
      try {
        assertRunFuse(`call ${i}`)
      } catch {
        break
      }
      recordUsage(48_640, 40)
      calls += 1
    }
    expect(calls).toBeLessThan(120)
    expect(estimatedCostUsd()).toBeLessThan(11)
  })
})
