/**
 * Course Mastery's daily limit follows the learner's own calendar day, and
 * switching time zones can't stack extra days.
 */

import { expect, test } from "@playwright/test"

import { examAttemptsLeft } from "../../../src/lib/courses/rules"
import { dayInZone, midnightInZone } from "../../../src/lib/utils/date"

const at = (iso: string) => new Date(iso)

test.describe("learner day", () => {
  test("is the calendar day in the learner's zone", () => {
    // 03:00 UTC is still the evening before in New York
    const now = at("2026-11-14T03:00:00Z")
    expect(dayInZone("America/New_York", now)).toBe("2026-11-13")
    expect(midnightInZone("America/New_York", now).toISOString()).toBe(
      "2026-11-13T05:00:00.000Z"
    )
    expect(midnightInZone("America/New_York", now, 1).toISOString()).toBe(
      "2026-11-14T05:00:00.000Z"
    )
  })

  test("handles a DST change overnight", () => {
    // Europe/Berlin leaves summer time on 2026-10-25
    expect(
      midnightInZone("Europe/Berlin", at("2026-10-24T12:00:00Z"), 1)
    ).toEqual(at("2026-10-24T22:00:00Z"))
    expect(
      midnightInZone("Europe/Berlin", at("2026-10-25T12:00:00Z"), 1)
    ).toEqual(at("2026-10-25T23:00:00Z"))
  })
})

test.describe("examAttemptsLeft", () => {
  const todayStart = at("2026-11-13T05:00:00Z")
  const tomorrowStart = at("2026-11-14T05:00:00Z")
  const now = at("2026-11-13T20:00:00Z")

  test("two a day, reopening at the learner's midnight", () => {
    expect(examAttemptsLeft([], todayStart, tomorrowStart, now).left).toBe(2)
    const used = [at("2026-11-13T10:00:00Z"), at("2026-11-13T11:00:00Z")]
    expect(examAttemptsLeft(used, todayStart, tomorrowStart, now)).toEqual({
      left: 0,
      retryAt: tomorrowStart,
    })
  })

  test("yesterday's attempts don't count against today", () => {
    const late = [at("2026-11-13T03:00:00Z"), at("2026-11-13T04:00:00Z")]
    expect(examAttemptsLeft(late, todayStart, tomorrowStart, now).left).toBe(2)
  })

  test("no more than four in any 24 hours, whatever the zone says", () => {
    const four = [
      at("2026-11-13T01:00:00Z"),
      at("2026-11-13T02:00:00Z"),
      at("2026-11-13T06:00:00Z"),
      at("2026-11-13T07:00:00Z"),
    ]
    // A zone switch makes it look like a fresh day
    const freshStart = at("2026-11-13T19:00:00Z")
    expect(examAttemptsLeft(four, freshStart, tomorrowStart, now)).toEqual({
      left: 0,
      retryAt: at("2026-11-14T01:00:00Z"),
    })
  })
})
