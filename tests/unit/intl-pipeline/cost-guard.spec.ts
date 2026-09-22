/**
 * Spend bounds (src/scripts/intl-pipeline/lib/llm/cost-meter.ts).
 *
 * The per-file+locale byte budget is the primary bound; the run fuse is the
 * backstop. Both exist because run 31149083965 had neither.
 */

import { expect, test } from "@playwright/test"

import {
  INPUT_RATE_USD_PER_1M,
  MAX_CHUNK_BYTES,
  MAX_PROMPT_BYTES,
  OUTPUT_RATE_USD_PER_1M,
  REASONING_TOKENS_PER_CALL,
} from "../../../src/scripts/intl-pipeline/constants"
import {
  assertRunFuse,
  callReserveUsd,
  createFileBudget,
  estimatedCostUsd,
  FileBudgetExceededError,
  minimumFuseUsd,
  recordUsage,
  reserveForCall,
  resetMeter,
  RunFuseExceededError,
  usageTotals,
} from "../../../src/scripts/intl-pipeline/lib/llm/cost-meter"
import {
  isIrreducibleChunk,
  planIncrementalBatches,
} from "../../../src/scripts/intl-pipeline/lib/llm/plan"

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

test.describe("Irreducible content", () => {
  test("a chunk past the chunk budget is irreducible", () => {
    expect(isIrreducibleChunk(MAX_CHUNK_BYTES + 1)).toBe(true)
    expect(isIrreducibleChunk(MAX_CHUNK_BYTES)).toBe(false)
  })

  test("a single oversized section plans as irreducible and is not refused", () => {
    // public/content/developers/docs/evm/opcodes/index.md has one 67,968-byte
    // section (the opcode table) that no chunker can split. Before the ceiling
    // honoured irreducibility it was untranslatable in every mode.
    const oversized = "x".repeat(70_000)
    const plan = planIncrementalBatches({
      filePath: "big.md",
      fileType: "markdown",
      locale: "de",
      languageName: "German",
      englishContent: `## Big {#big}\n\n${oversized}`,
      localeContent: `## Big {#big}\n\nalt`,
      sectionIds: ["big"],
      glossaryTerms: new Map(),
    })
    expect(plan).not.toBeNull()
    expect(plan!.batches).toHaveLength(1)
    expect(plan!.batches[0].bytes).toBeGreaterThan(MAX_PROMPT_BYTES)
    expect(plan!.batches[0].irreducible).toBe(true)
    expect(plan!.batches[0].overCeiling).toBe(false)
  })

  test("splittable content never plans over the per-call ceiling", () => {
    // 60 sections of 4KB: the batcher must split them rather than emit a batch
    // the choke point would refuse.
    const sections = Array.from(
      { length: 60 },
      (_, i) => `## Section ${i} {#s-${i}}\n\n${"y".repeat(4_000)}`
    ).join("\n\n")
    const plan = planIncrementalBatches({
      filePath: "many.md",
      fileType: "markdown",
      locale: "de",
      languageName: "German",
      englishContent: sections,
      localeContent: sections,
      sectionIds: Array.from({ length: 60 }, (_, i) => `s-${i}`),
      glossaryTerms: new Map(),
    })!
    expect(plan.batches.length).toBeGreaterThan(1)
    for (const b of plan.batches) {
      expect(b.overCeiling).toBe(false)
      if (!b.irreducible) expect(b.bytes).toBeLessThanOrEqual(MAX_PROMPT_BYTES)
    }
  })

  test("a realistic glossary is absorbed by tightening, not refused", () => {
    // 184 terms is the heaviest real case measured (learn-quizzes.json / ar,
    // 16.4KB of prompt). The planner must fit it by making batches smaller.
    const glossary = new Map<string, string>()
    for (let i = 0; i < 184; i++) {
      glossary.set(
        `term-number-${i}-english-phrase`,
        `translation ${i} with an explanatory note for translators`
      )
    }
    const body = Array.from(
      { length: 20 },
      (_, i) => `## S${i} {#s-${i}}\n\n${"z".repeat(2_000)}`
    ).join("\n\n")
    const plan = planIncrementalBatches({
      filePath: "normal.md",
      fileType: "markdown",
      locale: "ar",
      languageName: "Arabic",
      englishContent: body,
      localeContent: body,
      sectionIds: Array.from({ length: 20 }, (_, i) => `s-${i}`),
      glossaryTerms: glossary,
    })!
    for (const b of plan.batches) {
      expect(b.overCeiling).toBe(false)
      expect(b.bytes).toBeLessThanOrEqual(MAX_PROMPT_BYTES)
    }
  })

  test("overhead leaving no room for content fails loudly", () => {
    // Overhead past (ceiling - context cap - MIN_CONTENT_BUDGET_BYTES) cannot be
    // absorbed by tightening. Refusing is correct; fanning out into tiny calls
    // is the incident's shape.
    const glossary = new Map<string, string>()
    for (let i = 0; i < 500; i++) {
      glossary.set(
        `term-number-${i}-english-phrase-with-extra-length`,
        `a deliberately long translation ${i} with an explanatory note that pads the glossary block substantially`
      )
    }
    const body = Array.from(
      { length: 20 },
      (_, i) => `## S${i} {#s-${i}}\n\n${"z".repeat(2_000)}`
    ).join("\n\n")
    expect(() =>
      planIncrementalBatches({
        filePath: "crowded.md",
        fileType: "markdown",
        locale: "ar",
        languageName: "Arabic",
        englishContent: body,
        localeContent: body,
        sectionIds: Array.from({ length: 20 }, (_, i) => `s-${i}`),
        glossaryTerms: glossary,
      })
    ).toThrow(/per-call ceiling/)
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

test.describe("In-flight reservation is sized from the prompt", () => {
  test.beforeEach(() => resetMeter(100))

  test("reservation is priced from the prompt, not the ceiling", () => {
    // Prompt tokens in, the same out, plus the per-call reasoning.
    const priced = (bytes: number) =>
      (bytes / 3 / 1_000_000) * INPUT_RATE_USD_PER_1M +
      ((bytes / 3 + REASONING_TOKENS_PER_CALL) / 1_000_000) *
        OUTPUT_RATE_USD_PER_1M
    expect(callReserveUsd(8_192)).toBeCloseTo(priced(8_192), 6)
    expect(callReserveUsd(MAX_PROMPT_BYTES)).toBeCloseTo(
      priced(MAX_PROMPT_BYTES),
      6
    )
    // An 8KB incremental prompt reserves well under a third of the ceiling
    expect(callReserveUsd(8_192)).toBeLessThan(
      callReserveUsd(MAX_PROMPT_BYTES) / 3
    )
  })

  test("a settled reservation is released", () => {
    const one = callReserveUsd(8_192)
    resetMeter(one * 1.5)
    const first = reserveForCall("first", 8_192)
    reserveForCall("second", 8_192)
    // Two in flight exceed a fuse sized for one and a half
    expect(() => assertRunFuse("third")).toThrow(RunFuseExceededError)
    first(0)
    expect(() => assertRunFuse("third after one settled")).not.toThrow()
  })

  test("run 35252423844: a $5 fuse at concurrency 16 no longer trips on reservations", () => {
    resetMeter(5)
    // 16 incremental calls of ~16KB in flight, nothing spent yet
    const settles = Array.from({ length: 16 }, (_, i) =>
      reserveForCall(`call ${i}`, 16_803)
    )
    expect(() => assertRunFuse("17th call")).not.toThrow()
    settles.forEach((s) => s(0))
  })

  test("a fuse below one minimal wave is rejected up front", () => {
    expect(minimumFuseUsd(16)).toBeGreaterThan(0)
    expect(minimumFuseUsd(16)).toBeLessThan(5)
    expect(minimumFuseUsd(32)).toBe(2 * minimumFuseUsd(16))
  })

  test("the abort message counts calls in flight", () => {
    resetMeter(0.01)
    reserveForCall("first", 65_536)
    let message = ""
    try {
      assertRunFuse("second")
    } catch (err) {
      message = err instanceof Error ? err.message : String(err)
    }
    expect(message).toContain("reserved for 1 call(s) in flight")
  })
})
