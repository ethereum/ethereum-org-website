/**
 * Deterministic-failure quarantine (src/scripts/intl-pipeline/lib/quarantine.ts).
 *
 * The daily cron retried the same five refused pairs every morning for two
 * weeks and went red each time they were the only stale pairs. The quarantine
 * exists so a failure that will not change on retry is recorded once, skipped
 * while its English is unchanged, and retried when the entry expires.
 */

import { expect, test } from "@playwright/test"

import {
  QUARANTINE_MAX_TTL_DAYS,
  QUARANTINE_TTL_DAYS,
} from "../../../src/scripts/intl-pipeline/constants"
import {
  classifyFailure,
  Quarantine,
} from "../../../src/scripts/intl-pipeline/lib/quarantine"
import { shouldAbortRun } from "../../../src/scripts/intl-pipeline/lib/workflows/utils"

const DAY = 86_400_000
const clock = (start = Date.UTC(2026, 8, 17)) => {
  let t = start
  return {
    now: () => new Date(t),
    advance: (days: number) => (t += days * DAY),
  }
}

test.describe("classifyFailure", () => {
  const cases: Array<[string, ReturnType<typeof classifyFailure>]> = [
    [
      "Gemini returned no content (finishReason=RECITATION). This file/language combination may be triggering content filters.",
      "refusal",
    ],
    [
      "Gemini returned no content (finishReason=PROHIBITED_CONTENT).",
      "refusal",
    ],
    ['Gemini refusal: "I cannot translate this"', "refusal"],
    [
      "Output validation failed after 3 attempts: Suspiciously short: 381 chars vs 1571 English chars",
      "validation",
    ],
    [
      "[cost-guard] public/content/x/index.md (de): 3 incremental batch(es) needs 200,000 prompt bytes, over the 65,536-byte budget",
      "budget",
    ],
    [
      "[cost-guard] x.md (de): incremental batching produced 300 batches for 2 changed section(s), over the 32 cap. Refusing to send",
      "budget",
    ],
    [
      "[gate] public/x/index.md: 2 check(s) failed -- structure heading-anchor",
      "gate",
    ],
    [
      "Failed to parse incremental translation response: Unexpected token",
      "parse",
    ],
    [
      "[de] x.md: 2 jsx-attr leaf(s) failed to translate; aborting before manifest stamp",
      "parse",
    ],
    // Transient, or not about the pair: never quarantined
    [
      "[cost-guard] aborting run: $0.42 spent across 10 call(s) plus $4.59 reserved for calls in flight reached the $5.00 fuse.",
      null,
    ],
    ["This operation was aborted", null],
    [
      '{"error":{"code":503,"message":"This model is currently experiencing high demand"}}',
      null,
    ],
    ["Failed to create blob for x.md (403): {}", null],
    ["fetch failed", null],
    ["Failed to update ref after squash (422): not a fast forward", null],
  ]
  for (const [message, expected] of cases) {
    test(`${expected ?? "transient"}: ${message.slice(0, 50)}`, () => {
      expect(classifyFailure(message)).toBe(expected)
    })
  }
})

test.describe("Quarantine", () => {
  const pair = {
    file: "public/content/x/index.md",
    locale: "fr",
    englishHash: "aaaa",
  }

  test("a refusal quarantines on the first strike and blocks the pair", () => {
    const c = clock()
    const q = new Quarantine(c.now)
    const { active, entry } = q.record({
      ...pair,
      class: "refusal",
      reason: "RECITATION",
    })
    expect(active).toBe(true)
    expect(entry.attempts).toBe(1)
    expect(q.active(pair.file, pair.locale, pair.englishHash)?.class).toBe(
      "refusal"
    )
  })

  test("parse and gate failures need two strikes", () => {
    const c = clock()
    const q = new Quarantine(c.now)
    expect(q.record({ ...pair, class: "gate", reason: "anchors" }).active).toBe(
      false
    )
    expect(q.active(pair.file, pair.locale, pair.englishHash)).toBeNull()
    expect(q.record({ ...pair, class: "gate", reason: "anchors" }).active).toBe(
      true
    )
    expect(q.active(pair.file, pair.locale, pair.englishHash)).not.toBeNull()
  })

  test("an English change releases the pair and resets the count", () => {
    const c = clock()
    const q = new Quarantine(c.now)
    q.record({ ...pair, class: "refusal", reason: "RECITATION" })
    expect(q.active(pair.file, pair.locale, "bbbb")).toBeNull()
    const again = q.record({
      ...pair,
      englishHash: "bbbb",
      class: "refusal",
      reason: "RECITATION",
    })
    expect(again.entry.attempts).toBe(1)
  })

  test("entries expire, and a repeat after expiry doubles the hold", () => {
    const c = clock()
    const q = new Quarantine(c.now)
    q.record({ ...pair, class: "refusal", reason: "RECITATION" })
    c.advance(QUARANTINE_TTL_DAYS - 1)
    expect(q.active(pair.file, pair.locale, pair.englishHash)).not.toBeNull()
    c.advance(2)
    expect(q.active(pair.file, pair.locale, pair.englishHash)).toBeNull()

    const { entry } = q.record({
      ...pair,
      class: "refusal",
      reason: "RECITATION",
    })
    expect(entry.attempts).toBe(2)
    const holdDays =
      (new Date(entry.expiresAt).getTime() - c.now().getTime()) / DAY
    expect(holdDays).toBe(QUARANTINE_TTL_DAYS * 2)
  })

  test("the hold never exceeds the cap", () => {
    const c = clock()
    const q = new Quarantine(c.now)
    let entry = q.record({ ...pair, class: "refusal", reason: "r" }).entry
    for (let i = 0; i < 10; i++) {
      entry = q.record({ ...pair, class: "refusal", reason: "r" }).entry
    }
    const holdDays =
      (new Date(entry.expiresAt).getTime() - c.now().getTime()) / DAY
    expect(holdDays).toBe(QUARANTINE_MAX_TTL_DAYS)
  })

  test("a success clears the entry", () => {
    const q = new Quarantine(clock().now)
    q.record({ ...pair, class: "refusal", reason: "r" })
    q.clear(pair.file, pair.locale)
    expect(q.active(pair.file, pair.locale, pair.englishHash)).toBeNull()
    expect(q.size).toBe(0)
  })

  test("round-trips through JSON and reports changes", () => {
    const c = clock()
    const q = new Quarantine(c.now)
    expect(q.changed).toBe(false)
    q.record({ ...pair, class: "validation", reason: "short" })
    q.record({ ...pair, locale: "de", class: "refusal", reason: "r" })
    expect(q.changed).toBe(true)

    const restored = Quarantine.fromJson(q.toJson(), c.now)
    expect(restored.size).toBe(2)
    expect(restored.changed).toBe(false)
    expect(restored.active(pair.file, "de", pair.englishHash)?.reason).toBe("r")
    expect(restored.list().map((e) => e.locale)).toEqual(["de", "fr"])
  })
})

test.describe("all-failed abort", () => {
  test("aborts when every task failed and none was quarantined", () => {
    expect(
      shouldAbortRun({
        unhandledFailures: 3,
        translatedFiles: 0,
        stampedManifests: false,
      })
    ).toBe(true)
  })

  // The quarantine file is bookkeeping, not output: a run where every task
  // failed on a first-strike gate or parse still records entries (so
  // quarantine.changed is true) while those failures stay retryable. Counting
  // that commit as output would exit green with a PR holding only
  // quarantine.json -- exactly the case the abort exists for.
  test("a first-strike failure still aborts even though it was recorded", () => {
    const q = new Quarantine()
    const { active } = q.record({
      file: "public/content/x/index.md",
      locale: "de",
      englishHash: "aaaa",
      class: "gate",
      reason: "anchors",
    })
    expect(active).toBe(false)
    expect(q.changed).toBe(true)
    expect(
      shouldAbortRun({
        unhandledFailures: 1,
        translatedFiles: 0,
        stampedManifests: false,
      })
    ).toBe(true)
  })

  test("does not abort when the only failures are quarantined", () => {
    expect(
      shouldAbortRun({
        unhandledFailures: 0,
        translatedFiles: 0,
        stampedManifests: false,
      })
    ).toBe(false)
  })

  test("does not abort when real work landed alongside failures", () => {
    expect(
      shouldAbortRun({
        unhandledFailures: 2,
        translatedFiles: 5,
        stampedManifests: false,
      })
    ).toBe(false)
    expect(
      shouldAbortRun({
        unhandledFailures: 2,
        translatedFiles: 0,
        stampedManifests: true,
      })
    ).toBe(false)
  })
})
