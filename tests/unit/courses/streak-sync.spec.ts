/**
 * A signed-in learner's streak across devices. Each device records the days
 * it finishes a lesson (`recordFinish`, as `useCourseProgress` does); the
 * account works its streak out from every day any device sent, and each
 * device shows that streak plus its own days still on their way. No device
 * can lose another's day, and none counts one twice.
 */

import { expect, test } from "@playwright/test"

import {
  EMPTY_PROGRESS,
  mergeProgress,
  type ProgressState,
  withAccountProgress,
} from "../../../src/lib/courses/progress"
import {
  joiningDays,
  MAX_STREAK_DAYS,
  mergeStreakDays,
  recordFinish,
  recordStreakDay,
  sentStreakDays,
  type StreakDay,
  streakFromDays,
  streakStatus,
  unconfirmedDays,
} from "../../../src/lib/courses/streak"

// `getTimezoneOffset` values: minutes behind UTC
const NEW_YORK = 300
const TOKYO = -540
const UTC = 0

const DAY_MS = 86_400_000
const NOW = new Date("2026-12-31T00:00:00Z")

/** 19:00 in New York on `day` (midnight UTC the day after) */
const evening = (day: string) =>
  new Date(Date.parse(day) + DAY_MS).toISOString()

const plusDays = (day: string, days: number) =>
  new Date(Date.parse(day) + days * DAY_MS).toISOString().slice(0, 10)

/** A device's progress after a lesson at `iso` */
const finish = <T extends ProgressState>(
  progress: T,
  iso: string,
  offset = NEW_YORK
) => recordFinish(progress, new Date(iso), offset).progress

/** A lesson every evening for `count` days from `from` */
const daily = <T extends ProgressState>(
  progress: T,
  from: string,
  count: number
) =>
  Array.from({ length: count }, (_, i) => evening(plusDays(from, i))).reduce(
    (p, iso) => finish(p, iso),
    progress
  )

/** The account once these uploads reached it, as the server answers */
const account = (...uploads: (StreakDay[] | undefined)[]) => {
  const days = uploads.reduce<StreakDay[]>(
    (all, sent) => mergeStreakDays(all, sentStreakDays(sent, NOW)),
    []
  )
  const { streak, best } = streakFromDays(days)
  return { days, state: null, streak, bestStreak: best }
}

test.describe("streaks across devices", () => {
  // Thirty evenings on the phone, 20 October to 18 November
  const phone = daily(EMPTY_PROGRESS, "2026-10-20", 30)

  test("the phone's own streak", () => {
    expect(phone.streak).toMatchObject({ count: 30, lastDay: "2026-11-18" })
    expect(account(phone.days).streak.count).toBe(30)
  })

  test("a laptop whose streak lapsed long ago can't drop the phone's", () => {
    // Offline when the lesson opened, so it awards from its own stale copy
    const stale = daily(EMPTY_PROGRESS, "2026-09-01", 3)
    const laptop = finish(stale, evening("2026-11-19"))
    expect(laptop.streak.count).toBe(1)

    // Once uploaded, the account counts the phone's 30 days and this one
    const after = account(phone.days, laptop.days)
    expect(after.streak).toMatchObject({ count: 31, lastDay: "2026-11-19" })
    expect(after.bestStreak).toBe(31)

    // And the laptop shows the account's streak
    const shown = withAccountProgress(
      laptop,
      after,
      unconfirmedDays(laptop.days, laptop.days)
    )
    expect(shown.streak.count).toBe(31)
    expect(shown.days).toEqual([])

    // Copies merged without the account keep the run too
    expect(mergeProgress(phone, laptop).streak.count).toBe(31)
    expect(mergeProgress(laptop, phone).streak.count).toBe(31)
  })

  test("a laptop that synced when the lesson opened extends the phone's", () => {
    const synced = withAccountProgress(EMPTY_PROGRESS, account(phone.days), [])
    expect(synced.streak.count).toBe(30)
    const { progress, extended } = recordFinish(
      synced,
      new Date(evening("2026-11-19")),
      NEW_YORK
    )
    expect(extended).toBe(true)
    expect(progress.streak.count).toBe(31)
  })

  test("a day not yet uploaded extends the account's streak meanwhile", () => {
    const laptop = finish(EMPTY_PROGRESS, evening("2026-11-19"))
    const shown = withAccountProgress(laptop, account(phone.days), laptop.days)
    expect(shown.streak).toMatchObject({ count: 31, lastDay: "2026-11-19" })
    // An older one waits for the upload instead
    const old = finish(EMPTY_PROGRESS, evening("2026-11-05"))
    expect(
      withAccountProgress(old, account(phone.days), old.days).streak.count
    ).toBe(30)
  })

  test("two devices on the same day count it once", () => {
    // 08:00 on the phone, 20:00 on the laptop, both on the 19th in New York
    const morning = finish(phone, "2026-11-19T13:00:00Z")
    const laptop = withAccountProgress(
      EMPTY_PROGRESS,
      account(morning.days),
      []
    )
    const { progress, extended } = recordFinish(
      laptop,
      new Date("2026-11-20T01:00:00Z"),
      NEW_YORK
    )
    expect(extended).toBe(false)
    expect(progress.streak.count).toBe(31)

    const after = account(morning.days, progress.days)
    expect(after.streak.count).toBe(31)
    expect(after.days.filter(({ day }) => day === "2026-11-19")).toEqual([
      {
        day: "2026-11-19",
        offset: NEW_YORK,
        first: "2026-11-19T13:00:00.000Z",
        last: "2026-11-20T01:00:00.000Z",
      },
    ])
  })

  test("a missed day breaks the streak, and the best stays", () => {
    const gap = finish(phone, evening("2026-11-20"))
    const after = account(gap.days)
    expect(after.streak).toMatchObject({ count: 1, lastDay: "2026-11-20" })
    expect(after.bestStreak).toBe(30)
    expect(
      streakStatus(after.streak, new Date(evening("2026-11-21")), NEW_YORK)
    ).toBe("continues")
    expect(
      streakStatus(after.streak, new Date(evening("2026-11-22")), NEW_YORK)
    ).toBe("lapsed")
  })

  test("a day played offline elsewhere mends the gap once it arrives", () => {
    const gap = finish(phone, evening("2026-11-20"))
    expect(account(gap.days).streak.count).toBe(1)
    const offline = finish(EMPTY_PROGRESS, evening("2026-11-19"))
    expect(account(gap.days, offline.days).streak.count).toBe(32)
  })

  test("sending the same days again changes nothing", () => {
    const once = account(phone.days)
    expect(account(phone.days, phone.days, phone.days)).toEqual(once)
    const shown = withAccountProgress(phone, once, [])
    expect(withAccountProgress(shown, once, [])).toEqual(shown)
  })

  test("an upload confirms only the finishes it carried", () => {
    const sent = finish(phone, "2026-11-19T13:00:00Z").days
    const later = finish(
      finish(phone, "2026-11-19T13:00:00Z"),
      "2026-11-20T01:00:00Z"
    )
    expect(unconfirmedDays(sent, sent)).toEqual([])
    expect(unconfirmedDays(later.days, sent)).toEqual([
      expect.objectContaining({
        day: "2026-11-19",
        last: "2026-11-20T01:00:00.000Z",
      }),
    ])
  })
})

test.describe("streaks across time zones", () => {
  test("flying east past a skipped local day keeps the streak", () => {
    // Monday 01:00 in New York, then Wednesday 00:30 in Tokyo
    const home = finish(EMPTY_PROGRESS, "2026-11-02T06:00:00Z", NEW_YORK)
    const away = finish(home, "2026-11-03T15:30:00Z", TOKYO)
    expect(away.streak.count).toBe(2)
    expect(account(away.days).streak.count).toBe(2)
  })

  test("a browser in another zone doesn't split one evening in two", () => {
    // 20:00 on the phone in New York, 21:00 on a laptop that reports UTC,
    // where it's already the next day
    const phone = finish(EMPTY_PROGRESS, "2026-11-19T01:00:00Z", NEW_YORK)
    const laptop = finish(EMPTY_PROGRESS, "2026-11-19T02:00:00Z", UTC)
    expect(phone.days?.[0].day).toBe("2026-11-18")
    expect(laptop.days?.[0].day).toBe("2026-11-19")
    expect(account(phone.days, laptop.days).streak.count).toBe(1)
  })

  test("moving zones across midnight doesn't skip or repeat a day", () => {
    // 23:00 Monday in New York, then Tuesday evening after flying to Tokyo
    const home = finish(EMPTY_PROGRESS, "2026-11-03T04:00:00Z", NEW_YORK)
    const away = finish(home, "2026-11-03T11:00:00Z", TOKYO)
    expect(away.streak.count).toBe(2)
    expect(account(away.days).streak).toMatchObject({
      count: 2,
      lastDay: "2026-11-03",
      lastOffset: TOKYO,
    })
  })
})

test("the account counts a day the clocks went back in as the browser did", () => {
  // Sunday 1 November in New York: 01:30 on daylight time, 23:30 after the
  // change, then Monday evening
  const sunday = finish(
    finish(EMPTY_PROGRESS, "2026-11-01T05:30:00Z", 240),
    "2026-11-02T04:30:00Z",
    NEW_YORK
  )
  const monday = finish(sunday, "2026-11-03T01:00:00Z", NEW_YORK)
  expect(sunday.days).toHaveLength(1)
  expect(account(sunday.days).streak.count).toBe(sunday.streak.count)
  expect(account(monday.days).streak).toMatchObject({
    count: monday.streak.count,
    lastDay: "2026-11-02",
  })
})

test.describe("days a browser sends", () => {
  const day = (overrides: Partial<StreakDay> = {}): StreakDay => ({
    day: "2026-11-19",
    offset: NEW_YORK,
    first: "2026-11-19T13:00:00.000Z",
    last: "2026-11-20T01:00:00.000Z",
    ...overrides,
  })

  test("keeps the ones that hold together, each once", () => {
    expect(sentStreakDays([day(), day()], NOW)).toEqual([day()])
    expect(
      sentStreakDays(
        [
          // Not that day in that offset
          day({ day: "2026-11-18" }),
          // Last before first
          day({ last: "2026-11-19T12:00:00.000Z" }),
          // Days apart
          day({ last: "2026-11-23T01:00:00.000Z" }),
          // Not a date
          day({ first: "soon" }),
        ],
        NOW
      )
    ).toEqual([])
  })

  test("drops finishes from the future", () => {
    expect(sentStreakDays([day()], new Date("2026-11-19T20:00:00Z"))).toEqual(
      []
    )
  })

  test("drops days from before the courses, even out of the date range", () => {
    expect(
      sentStreakDays(
        [
          day({
            day: "2001-11-19",
            first: "2001-11-19T13:00:00.000Z",
            last: "2001-11-20T01:00:00.000Z",
          }),
          day({
            day: "0000-01-01",
            first: "0000-01-01T05:00:00.000Z",
            last: "0000-01-01T05:00:00.000Z",
          }),
          day({
            offset: 840,
            first: "-271821-04-20T00:00:00.000Z",
            last: "-271821-04-20T00:00:00.000Z",
          }),
        ],
        NOW
      )
    ).toEqual([])
  })
})

test.describe("joining an account", () => {
  test("a streak saved without days brings every day of its run", () => {
    const legacy: ProgressState = {
      ...EMPTY_PROGRESS,
      streak: {
        count: 5,
        lastDay: "2026-11-19",
        lastAt: evening("2026-11-19"),
        lastOffset: NEW_YORK,
      },
    }
    const days = joiningDays(legacy)
    expect(days.map(({ day }) => day)).toEqual([
      "2026-11-15",
      "2026-11-16",
      "2026-11-17",
      "2026-11-18",
      "2026-11-19",
    ])
    expect(account(days).streak.count).toBe(5)
  })

  test("days it kept stay as they were", () => {
    const kept = daily(EMPTY_PROGRESS, "2026-11-18", 2)
    const days = joiningDays({
      ...kept,
      streak: { ...kept.streak, count: 4 },
    })
    expect(days).toHaveLength(4)
    expect(days.slice(-2)).toEqual(kept.days)
    expect(account(days).streak.count).toBe(4)
  })
})

test("a browser keeps a bounded number of days", () => {
  const days = Array.from(
    { length: MAX_STREAK_DAYS + 5 },
    (_, i) => new Date(Date.parse("2020-01-01") + i * DAY_MS + DAY_MS / 2)
  ).reduce<StreakDay[]>((all, at) => recordStreakDay(all, at, UTC), [])
  expect(days).toHaveLength(MAX_STREAK_DAYS)
  expect(days[0].day).toBe(plusDays("2020-01-01", 5))
})
