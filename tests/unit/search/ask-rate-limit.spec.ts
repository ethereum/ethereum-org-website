import { expect, test } from "@playwright/test"

import { takeAskAllowance } from "@/lib/utils/ask"

// No `localStorage` in the unit environment, so every run exercises the in-memory
// fallback -- which is the path a reader with storage blocked takes.
test.describe("takeAskAllowance", () => {
  test("allows five in a minute and holds the sixth", () => {
    const start = 1_000_000
    for (let ask = 0; ask < 5; ask += 1) {
      expect(takeAskAllowance(start + ask).allowed, `ask ${ask + 1}`).toBe(true)
    }
    const held = takeAskAllowance(start + 5)
    expect(held.allowed).toBe(false)
    expect(held.retryAfter).toBeGreaterThan(0)
    expect(held.retryAfter).toBeLessThanOrEqual(60)
  })

  test("the window slides, so asking again later is allowed", () => {
    const later = 2_000_000
    for (let ask = 0; ask < 5; ask += 1) takeAskAllowance(later + ask)
    expect(takeAskAllowance(later + 5).allowed).toBe(false)
    // One minute past the oldest ask, it is out of the window.
    expect(takeAskAllowance(later + 60_001).allowed).toBe(true)
  })

  test("a held ask does not spend an allowance", () => {
    const start = 3_000_000
    for (let ask = 0; ask < 5; ask += 1) takeAskAllowance(start + ask)
    // Hitting the limit repeatedly must not push the window forward, or the wait would
    // never end for someone holding a key down.
    const first = takeAskAllowance(start + 10).retryAfter
    const again = takeAskAllowance(start + 20).retryAfter
    expect(again).toBeLessThanOrEqual(first)
  })
})
