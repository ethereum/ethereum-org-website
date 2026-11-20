/**
 * Streak days are local calendar days, read in both the zone of the last
 * lesson and the current one so travel never costs a streak.
 */

import { expect, test } from "@playwright/test"

import {
  extendStreak,
  type Streak,
  streakStatus,
} from "../../../src/components/Courses/streak"

// `getTimezoneOffset` values: minutes behind UTC
const NEW_YORK = 300
const TOKYO = -540
const UTC = 0

const at = (iso: string) => new Date(iso)

const lessonAt = (iso: string, offset: number, count = 3): Streak =>
  extendStreak({ count: count - 1, lastDay: null }, at(iso), offset).streak

test.describe("streakStatus", () => {
  // Monday 2 November 2026, 20:00 in New York
  const monday = lessonAt("2026-11-03T01:00:00Z", NEW_YORK)

  test("records the local day", () => {
    expect(monday.lastDay).toBe("2026-11-02")
  })

  test("same zone: same day, next day, missed day", () => {
    expect(streakStatus(monday, at("2026-11-03T04:00:00Z"), NEW_YORK)).toBe(
      "today"
    )
    expect(streakStatus(monday, at("2026-11-03T18:00:00Z"), NEW_YORK)).toBe(
      "continues"
    )
    expect(streakStatus(monday, at("2026-11-05T01:00:00Z"), NEW_YORK)).toBe(
      "lapsed"
    )
  })

  test("flying east past a skipped local day keeps the streak", () => {
    // Monday 01:00 New York, then Wednesday 00:30 Tokyo (Tuesday in New York)
    const early = lessonAt("2026-11-02T06:00:00Z", NEW_YORK)
    expect(streakStatus(early, at("2026-11-03T15:30:00Z"), TOKYO)).toBe(
      "continues"
    )
  })

  test("flying west counts the next local day as a new day", () => {
    // Tuesday 09:00 Tokyo is Monday evening in New York
    const tokyo = lessonAt("2026-11-03T00:00:00Z", TOKYO)
    expect(streakStatus(tokyo, at("2026-11-03T03:00:00Z"), NEW_YORK)).toBe(
      "today"
    )
    expect(streakStatus(tokyo, at("2026-11-03T15:00:00Z"), NEW_YORK)).toBe(
      "continues"
    )
  })

  test("a real gap still lapses after travel", () => {
    const early = lessonAt("2026-11-02T06:00:00Z", NEW_YORK)
    expect(streakStatus(early, at("2026-11-05T03:00:00Z"), TOKYO)).toBe(
      "lapsed"
    )
  })

  test("progress saved before timestamps falls back to the day key", () => {
    const legacy: Streak = { count: 4, lastDay: "2026-11-02" }
    expect(streakStatus(legacy, at("2026-11-03T12:00:00Z"), UTC)).toBe(
      "continues"
    )
    expect(streakStatus(legacy, at("2026-11-04T12:00:00Z"), UTC)).toBe("lapsed")
  })
})

test.describe("extendStreak", () => {
  test("counts once per day, resets after a gap", () => {
    const first = extendStreak(
      { count: 0, lastDay: null },
      at("2026-11-02T12:00:00Z"),
      UTC
    )
    expect(first).toMatchObject({ extended: true, streak: { count: 1 } })

    const again = extendStreak(first.streak, at("2026-11-02T18:00:00Z"), UTC)
    expect(again).toMatchObject({ extended: false, streak: { count: 1 } })

    const next = extendStreak(again.streak, at("2026-11-03T09:00:00Z"), UTC)
    expect(next).toMatchObject({ extended: true, streak: { count: 2 } })

    const lapsed = extendStreak(next.streak, at("2026-11-06T09:00:00Z"), UTC)
    expect(lapsed).toMatchObject({ extended: true, streak: { count: 1 } })
  })
})
