/**
 * Course Mastery's daily limit follows the learner's own calendar day, and
 * switching time zones can't stack extra days. Attempts close after a while,
 * answers compare as sets, and the key must grade every question.
 */

import { expect, test } from "@playwright/test"

import type { Course } from "../../../src/data/courses"
import { examKeyCovers } from "../../../src/lib/courses/exam-key"
import {
  EXAM_ATTEMPT_TTL_MS,
  examAttemptExpired,
  examAttemptsLeft,
  resumableAttempt,
  samePicks,
} from "../../../src/lib/courses/rules"
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

test.describe("samePicks", () => {
  test("ignores order", () => {
    expect(samePicks(["a", "b"], ["b", "a"])).toBe(true)
  })

  test("a repeated pick can't stand in for a missing one", () => {
    expect(samePicks(["a", "a"], ["a", "b"])).toBe(false)
    expect(samePicks(["a", "b"], ["a", "a"])).toBe(false)
  })

  test("needs every right option and nothing else", () => {
    expect(samePicks(["a"], ["a", "b"])).toBe(false)
    expect(samePicks(["a", "b", "c"], ["a", "b"])).toBe(false)
    expect(samePicks([], ["a"])).toBe(false)
  })
})

test.describe("attempt time limit", () => {
  const start = at("2026-11-13T10:00:00Z")
  const later = (ms: number) => new Date(start.getTime() + ms)

  test("open until the time limit, closed from it", () => {
    expect(examAttemptExpired(start, later(EXAM_ATTEMPT_TTL_MS - 1))).toBe(
      false
    )
    expect(examAttemptExpired(start, later(EXAM_ATTEMPT_TTL_MS))).toBe(true)
  })

  test("resumes the latest open attempt, never a finished or expired one", () => {
    const now = later(60_000)
    const attempts = [
      { id: "old", startedAt: later(-EXAM_ATTEMPT_TTL_MS), finishedAt: null },
      { id: "done", startedAt: later(30_000), finishedAt: now },
      { id: "open", startedAt: start, finishedAt: null },
    ]
    expect(resumableAttempt(attempts, now)?.id).toBe("open")
    expect(resumableAttempt(attempts.slice(0, 2), now)).toBeUndefined()
  })

  test("picks the same one of two started at once, in any order", () => {
    const twins = [
      { id: "b", startedAt: start, finishedAt: null },
      { id: "a", startedAt: start, finishedAt: null },
    ]
    const now = later(1000)
    expect(resumableAttempt(twins, now)?.id).toBe("b")
    expect(resumableAttempt([...twins].reverse(), now)?.id).toBe("b")
  })

  test("an expired attempt still counts toward the day", () => {
    const todayStart = at("2026-11-13T05:00:00Z")
    const tomorrowStart = at("2026-11-14T05:00:00Z")
    const started = [start, later(-60_000)]
    const now = later(EXAM_ATTEMPT_TTL_MS * 2)
    expect(
      resumableAttempt(
        started.map((startedAt, i) => ({
          id: `${i}`,
          startedAt,
          finishedAt: null,
        })),
        now
      )
    ).toBeUndefined()
    expect(examAttemptsLeft(started, todayStart, tomorrowStart, now).left).toBe(
      0
    )
  })
})

test.describe("examKeyCovers", () => {
  const course = {
    id: "demo",
    exam: [
      { id: "one", options: ["a", "b"] },
      { id: "many", options: ["x", "y", "z"], multi: true },
    ],
  } as unknown as Course

  test("a key for every question, with real options, covers the course", () => {
    expect(
      examKeyCovers({ demo: { one: ["a"], many: ["x", "z"] } }, course)
    ).toBe(true)
  })

  test("a missing answer, unknown option or extra pick doesn't", () => {
    expect(examKeyCovers({ demo: { one: ["a"] } }, course)).toBe(false)
    expect(examKeyCovers({ demo: { one: ["c"], many: ["x"] } }, course)).toBe(
      false
    )
    expect(
      examKeyCovers({ demo: { one: ["a", "b"], many: ["x"] } }, course)
    ).toBe(false)
    expect(examKeyCovers({}, course)).toBe(false)
  })
})
