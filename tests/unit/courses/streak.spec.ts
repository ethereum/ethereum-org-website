/**
 * Streak days are local calendar days, read in both the zone of the last
 * lesson and the current one so travel never costs a streak.
 */

import { expect, test } from "@playwright/test"

import {
  extendStreak,
  mergeStreaks,
  NO_STREAK,
  type Streak,
  streakDayInZone,
  streakStatus,
} from "../../../src/lib/courses/streak"

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

test.describe("mergeStreaks", () => {
  /** A `count`-day streak whose last lesson was at `iso` */
  const run = (iso: string, count: number): Streak => ({
    ...extendStreak(NO_STREAK, at(iso), NEW_YORK).streak,
    count,
  })
  // Three days ending Thursday 12 November, 19:00 in New York
  const phone = run("2026-11-13T00:00:00Z", 3)

  test("a run that meets the other's end joins it", () => {
    // The next evening, from a browser whose own streak had lapsed
    const laptop = run("2026-11-14T00:00:00Z", 1)
    expect(mergeStreaks(phone, laptop)).toMatchObject({
      count: 4,
      lastDay: "2026-11-13",
    })
    expect(mergeStreaks(laptop, phone).count).toBe(4)
  })

  test("a run inside the other adds nothing", () => {
    const sameDay = run("2026-11-12T23:00:00Z", 2)
    expect(mergeStreaks(phone, sameDay).count).toBe(3)
    expect(mergeStreaks(sameDay, phone).count).toBe(3)
  })

  test("a later run after a missed day stands alone", () => {
    const later = run("2026-11-15T00:00:00Z", 1)
    expect(mergeStreaks(phone, later)).toEqual(later)
    expect(mergeStreaks(later, phone)).toEqual(later)
  })

  test("joining again changes nothing", () => {
    const laptop = run("2026-11-14T00:00:00Z", 1)
    const merged = mergeStreaks(phone, laptop)
    expect(mergeStreaks(merged, phone)).toEqual(merged)
    expect(mergeStreaks(merged, laptop)).toEqual(merged)
    expect(mergeStreaks(laptop, merged)).toEqual(merged)
    expect(mergeStreaks(merged, NO_STREAK)).toEqual(merged)
  })
})

test.describe("streakDayInZone", () => {
  test("the learner's day and that day's offset", () => {
    // 23:30 on Thursday in New York is already Friday in UTC
    expect(
      streakDayInZone("America/New_York", at("2026-11-13T04:30:00Z"))
    ).toMatchObject({ day: "2026-11-12", offset: NEW_YORK })
    expect(
      streakDayInZone("Asia/Tokyo", at("2026-11-12T16:00:00Z"))
    ).toMatchObject({ day: "2026-11-13", offset: TOKYO })
  })

  test("the clocks going back doesn't move the day", () => {
    // Sunday 1 November 2026: New York leaves daylight time at 02:00
    const late = streakDayInZone("America/New_York", at("2026-11-02T04:30:00Z"))
    expect(late.day).toBe("2026-11-01")
  })
})
