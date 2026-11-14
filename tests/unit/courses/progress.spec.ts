/**
 * This browser's progress and the account's combine the same way in both
 * places, and merging again changes nothing.
 */

import { expect, test } from "@playwright/test"

import {
  EMPTY_PROGRESS,
  mergeProgress,
  type ProgressState,
} from "../../../src/lib/courses/progress"
import { XP_EXAM_PASS, XP_LESSON } from "../../../src/lib/courses/rules"

const lesson = (completedAt: string, accuracy = 1) => ({
  completedAt,
  accuracy,
})

const phone: ProgressState = {
  version: 1,
  xp: 25,
  streak: {
    count: 3,
    lastDay: "2026-11-12",
    lastAt: "2026-11-12T18:00:00.000Z",
  },
  bestStreak: 3,
  lessons: {
    "wallets/keys": lesson("2026-11-12T18:00:00.000Z", 0.5),
    "wallets/seed": lesson("2026-11-11T18:00:00.000Z"),
  },
  steps: {
    "wallets/keys/a": {
      seen: 2,
      missed: 1,
      lastAt: "2026-11-12T18:00:00.000Z",
      lastCorrect: true,
    },
  },
}

const laptop: ProgressState = {
  version: 1,
  xp: 10,
  streak: {
    count: 1,
    lastDay: "2026-11-13",
    lastAt: "2026-11-13T09:00:00.000Z",
  },
  lessons: { "wallets/keys": lesson("2026-11-13T09:00:00.000Z", 1) },
  steps: {
    "wallets/keys/a": {
      seen: 1,
      missed: 0,
      lastAt: "2026-11-13T09:00:00.000Z",
      lastCorrect: true,
    },
  },
  exams: { wallets: { best: 0.9, passedAt: "2026-11-13T09:30:00.000Z" } },
}

test.describe("mergeProgress", () => {
  test("joins records, keeping the better or later of each", () => {
    const merged = mergeProgress(phone, laptop)
    expect(merged.lessons["wallets/keys"]).toEqual(
      lesson("2026-11-13T09:00:00.000Z", 1)
    )
    expect(merged.lessons["wallets/seed"]).toBeDefined()
    expect(merged.exams?.wallets.passedAt).toBe("2026-11-13T09:30:00.000Z")
    // More runs behind it wins over a later single run
    expect(merged.steps?.["wallets/keys/a"].seen).toBe(2)
  })

  test("keeps the streak extended last and the longest one reached", () => {
    const merged = mergeProgress(phone, laptop)
    expect(merged.streak.lastDay).toBe("2026-11-13")
    expect(merged.bestStreak).toBe(3)
  })

  test("adds XP only for lessons and trophies the higher total lacks", () => {
    expect(mergeProgress(phone, laptop).xp).toBe(25 + XP_EXAM_PASS)
    expect(mergeProgress(laptop, phone).xp).toBe(25 + XP_EXAM_PASS)
    expect(mergeProgress(EMPTY_PROGRESS, laptop).xp).toBe(10)
    expect(
      mergeProgress(
        { ...EMPTY_PROGRESS, xp: 50 },
        { ...EMPTY_PROGRESS, lessons: { "wallets/keys": lesson("x") } }
      ).xp
    ).toBe(50 + XP_LESSON)
  })

  test("merging the result again changes nothing", () => {
    const merged = mergeProgress(phone, laptop)
    expect(mergeProgress(merged, phone)).toEqual(merged)
    expect(mergeProgress(merged, laptop)).toEqual(merged)
    expect(mergeProgress(phone, merged)).toEqual(merged)
  })
})
