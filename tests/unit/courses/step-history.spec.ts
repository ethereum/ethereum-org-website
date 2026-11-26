import { expect, test } from "@playwright/test"

import {
  mergeStepResults,
  stepHistoryKey,
} from "../../../src/components/Courses/step-history"

const first = new Date("2026-11-10T09:00:00Z")
const later = new Date("2026-11-12T18:30:00Z")

test.describe("step history", () => {
  test("records a first run", () => {
    const history = mergeStepResults(
      undefined,
      "wallets",
      "keys",
      { q1: true, q2: false },
      first
    )
    expect(history[stepHistoryKey("wallets", "keys", "q1")]).toEqual({
      seen: 1,
      missed: 0,
      lastAt: first.toISOString(),
      lastCorrect: true,
    })
    expect(history["wallets/keys/q2"]).toMatchObject({
      seen: 1,
      missed: 1,
      lastCorrect: false,
    })
  })

  test("accumulates runs and keeps other steps", () => {
    const once = mergeStepResults(
      undefined,
      "wallets",
      "keys",
      { q1: false, q2: true },
      first
    )
    const twice = mergeStepResults(once, "wallets", "keys", { q1: true }, later)
    expect(twice["wallets/keys/q1"]).toEqual({
      seen: 2,
      missed: 1,
      lastAt: later.toISOString(),
      lastCorrect: true,
    })
    expect(twice["wallets/keys/q2"]).toEqual(once["wallets/keys/q2"])
  })

  test("does not mutate the previous history", () => {
    const once = mergeStepResults(undefined, "a", "b", { s: true }, first)
    const snapshot = structuredClone(once)
    mergeStepResults(once, "a", "b", { s: false }, later)
    expect(once).toEqual(snapshot)
  })
})
