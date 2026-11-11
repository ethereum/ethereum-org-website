import { expect, test } from "@playwright/test"

import {
  levelFor,
  levelProgress,
  LEVELS_PER_TIER,
  TIERS,
} from "../../../src/components/Courses/levels"

test.describe("levels", () => {
  test("starts at wei I", () => {
    expect(levelFor(0)).toMatchObject({ number: 1, tier: "wei", step: 1 })
  })

  test("each tier floor starts that tier's first level", () => {
    TIERS.forEach(({ id, floor }, i) => {
      expect(levelFor(floor)).toMatchObject({
        tier: id,
        step: 1,
        number: i * LEVELS_PER_TIER + 1,
      })
      if (floor > 0) expect(levelFor(floor - 1).tier).not.toBe(id)
    })
  })

  test("levels only go up with XP", () => {
    let last = 0
    for (let xp = 0; xp <= 12_000; xp += 7) {
      const { number } = levelFor(xp)
      expect(number).toBeGreaterThanOrEqual(last)
      last = number
    }
    expect(last).toBe(TIERS.length * LEVELS_PER_TIER)
  })

  test("progress runs 0 to 1 within a level, and is full at the top", () => {
    const level = levelFor(50)
    expect(levelProgress(level.floor)).toBe(0)
    expect(levelProgress(level.next! - 1)).toBeLessThan(1)
    expect(levelProgress(1_000_000)).toBe(1)
  })
})
