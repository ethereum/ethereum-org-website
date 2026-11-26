/**
 * Streaks: a lesson or Course Mastery finished every calendar day, in the
 * learner's own zone. A browser extends its streak as lessons finish. The
 * account works its streak out from the days every device recorded, so no
 * device can drop or double-count another's day. Shared by the browser and
 * the server.
 */

import { dayInZone, midnightInZone } from "../utils/date"

export interface Streak {
  count: number
  /** Local calendar day of the last lesson, YYYY-MM-DD */
  lastDay: string | null
  /** When the last lesson finished, and the UTC offset (minutes, as
   * `getTimezoneOffset`) it finished in; absent in older saved progress */
  lastAt?: string
  lastOffset?: number
}

export const NO_STREAK: Streak = { count: 0, lastDay: null }

/** `today`: already extended; `continues`: the next lesson extends it */
export type StreakStatus = "today" | "continues" | "lapsed"

const DAY_MS = 86_400_000

/** Calendar day at `ms` in the zone `offset` minutes behind UTC */
export const dayKeyAt = (ms: number, offset: number) =>
  new Date(ms - offset * 60_000).toISOString().slice(0, 10)

const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS)

/**
 * The gap is read in both the zone of the last lesson and the current one,
 * and the kinder reading wins, so a traveller crossing someone else's
 * midnight keeps their streak.
 */
export const streakStatus = (
  { lastDay, lastAt, lastOffset }: Streak,
  now = new Date(),
  offset = now.getTimezoneOffset()
): StreakStatus => {
  if (!lastDay) return "lapsed"
  const ms = now.getTime()
  const gaps = lastAt
    ? [offset, lastOffset ?? offset].map((o) =>
        daysBetween(dayKeyAt(Date.parse(lastAt), o), dayKeyAt(ms, o))
      )
    : [daysBetween(lastDay, dayKeyAt(ms, offset))]
  if (gaps.includes(1)) return "continues"
  if (gaps.some((gap) => gap <= 0)) return "today"
  return "lapsed"
}

/** The streak after finishing a lesson `now` */
export const extendStreak = (
  streak: Streak,
  now = new Date(),
  offset = now.getTimezoneOffset()
): { streak: Streak; extended: boolean } => {
  const status = streakStatus(streak, now, offset)
  const count =
    status === "today"
      ? streak.count
      : status === "continues"
        ? streak.count + 1
        : 1
  return {
    streak: {
      count,
      lastDay: dayKeyAt(now.getTime(), offset),
      lastAt: now.toISOString(),
      lastOffset: offset,
    },
    extended: status !== "today",
  }
}

const finishedAt = ({ lastAt, lastDay }: Streak) =>
  Date.parse(lastAt ?? lastDay ?? "") || 0

/**
 * Two copies of a streak as one, for copies without days to compare: runs
 * that overlap or meet join (the earlier run plus the days the later one
 * added after it), and a later run after a missed day stands alone. Joining
 * the result with either copy again changes nothing.
 */
export const mergeStreaks = (a: Streak, b: Streak): Streak => {
  const [late, early] = finishedAt(a) >= finishedAt(b) ? [a, b] : [b, a]
  if (!early.lastDay || early.count < 1) return late
  if (!late.lastDay || late.count < 1) return early
  const added = Math.max(0, daysBetween(early.lastDay, late.lastDay))
  if (added - (late.count - 1) > 1) return late
  return { ...late, count: Math.max(late.count, early.count + added) }
}

/**
 * A calendar day with a lesson or Course Mastery finished, in the zone it
 * happened in. The account keeps every day; a browser keeps the ones the
 * account hasn't confirmed yet.
 */
export interface StreakDay {
  /** YYYY-MM-DD */
  day: string
  /** The zone's UTC offset, minutes as `getTimezoneOffset` */
  offset: number
  /** The first and last finish that day */
  first: string
  last: string
}

/** The account's streak, worked out from every device's days */
export interface AccountStreak {
  streak: Streak
  bestStreak: number
}

/** Most days a browser keeps waiting for the account, and an upload carries */
export const MAX_STREAK_DAYS = 1000

const byDay = (a: StreakDay, b: StreakDay) =>
  a.day < b.day ? -1 : a.day > b.day ? 1 : 0

/** Both lists as one: each day once, with its earliest and latest finish */
export const mergeStreakDays = (
  a: StreakDay[] = [],
  b: StreakDay[] = []
): StreakDay[] => {
  const days = new Map<string, StreakDay>()
  for (const entry of [...a, ...b]) {
    const known = days.get(entry.day)
    if (!known) {
      days.set(entry.day, entry)
      continue
    }
    const earlier = Date.parse(entry.first) < Date.parse(known.first)
    days.set(entry.day, {
      day: entry.day,
      offset: earlier ? entry.offset : known.offset,
      first: earlier ? entry.first : known.first,
      last:
        Date.parse(entry.last) > Date.parse(known.last)
          ? entry.last
          : known.last,
    })
  }
  return [...days.values()].sort(byDay)
}

/** `days` plus a finish at `now`, in the zone `offset` minutes behind UTC */
export const recordStreakDay = (
  days: StreakDay[] | undefined,
  now = new Date(),
  offset = now.getTimezoneOffset()
) => {
  const at = now.toISOString()
  return mergeStreakDays(days, [
    { day: dayKeyAt(now.getTime(), offset), offset, first: at, last: at },
  ]).slice(-MAX_STREAK_DAYS)
}

/**
 * A lesson or Course Mastery finished `now`: the streak extended, the best
 * kept, and the day recorded for the account
 */
export const recordFinish = <
  T extends { streak: Streak; bestStreak?: number; days?: StreakDay[] },
>(
  progress: T,
  now = new Date(),
  offset = now.getTimezoneOffset()
) => {
  const { streak, extended } = extendStreak(progress.streak, now, offset)
  return {
    progress: {
      ...progress,
      streak,
      bestStreak: Math.max(
        progress.bestStreak ?? progress.streak.count,
        streak.count
      ),
      days: recordStreakDay(progress.days, now, offset),
    },
    extended,
  }
}

/**
 * `offset`, moved as little as needed for `ms` to fall on `day` in it: a day
 * keeps its first finish's offset, and the clocks may have changed by its last
 */
const offsetOnDay = (ms: number, day: string, offset: number) => {
  const start = Date.parse(day)
  if (Number.isNaN(start)) return offset
  const earliest = Math.floor((ms - start - DAY_MS) / 60_000) + 1
  const latest = Math.floor((ms - start) / 60_000)
  return Math.min(Math.max(offset, earliest), latest)
}

/** Every finish the days hold, oldest first */
const finishes = (days: StreakDay[]) =>
  days
    .flatMap(({ day, offset, first, last }) =>
      [...new Set([first, last])].map((at) => {
        const ms = Date.parse(at)
        return { ms, offset: offsetOnDay(ms, day, offset) }
      })
    )
    .filter(({ ms }) => !Number.isNaN(ms))
    .sort((a, b) => a.ms - b.ms)

/**
 * The streak the days add up to: the browser's own rule (`extendStreak`)
 * replayed over every finish in time order, whichever device it came from,
 * so a day two devices both recorded counts once. `best` is the longest run.
 */
export const streakFromDays = (days: StreakDay[]) => {
  let streak = NO_STREAK
  let best = 0
  for (const { ms, offset } of finishes(days)) {
    streak = extendStreak(streak, new Date(ms), offset).streak
    best = Math.max(best, streak.count)
  }
  return { streak, best }
}

/**
 * The account's streak as a browser shows it: extended by this browser's
 * days the account hasn't confirmed yet. Only finishes after the account's
 * last can extend it; an older one counts once it's uploaded.
 */
export const withAccountStreak = (
  { streak, bestStreak }: AccountStreak,
  pending: StreakDay[] = []
): AccountStreak => {
  const since = finishedAt(streak)
  let extended = streak
  for (const { ms, offset } of finishes(pending))
    if (ms > since)
      extended = extendStreak(extended, new Date(ms), offset).streak
  return {
    streak: extended,
    bestStreak: Math.max(bestStreak, extended.count),
  }
}

/** The days still waiting for the account once an upload of `sent` landed */
export const unconfirmedDays = (
  days: StreakDay[] = [],
  sent: StreakDay[] = []
) => {
  const confirmed = new Map(sent.map((entry) => [entry.day, entry]))
  return days.filter((entry) => {
    const known = confirmed.get(entry.day)
    return (
      !known ||
      Date.parse(entry.first) < Date.parse(known.first) ||
      Date.parse(entry.last) > Date.parse(known.last)
    )
  })
}

/**
 * The days of a streak's run, for progress saved without days (from before
 * they were kept, or left by a deleted account): each at local noon, the
 * last at its finish
 */
const streakRunDays = ({
  count,
  lastDay,
  lastAt,
  lastOffset = 0,
}: Streak): StreakDay[] => {
  const lastMs = Date.parse(lastDay ?? "")
  if (Number.isNaN(lastMs) || count < 1) return []
  const lastAtMs = Date.parse(lastAt ?? "")
  const lastAtFits =
    !Number.isNaN(lastAtMs) && dayKeyAt(lastAtMs, lastOffset) === lastDay
  return Array.from({ length: Math.min(count, MAX_STREAK_DAYS) }, (_, back) => {
    const dayMs = lastMs - back * DAY_MS
    const at =
      back === 0 && lastAtFits
        ? new Date(lastAtMs).toISOString()
        : new Date(dayMs + DAY_MS / 2 + lastOffset * 60_000).toISOString()
    return {
      day: new Date(dayMs).toISOString().slice(0, 10),
      offset: lastOffset,
      first: at,
      last: at,
    }
  }).reverse()
}

/**
 * This browser's days for an account it joins: the ones it kept, plus its
 * streak's run where they don't cover it
 */
export const joiningDays = (progress: {
  streak: Streak
  days?: StreakDay[]
}) => {
  const kept = progress.days ?? []
  const known = new Set(kept.map(({ day }) => day))
  return mergeStreakDays(
    kept,
    streakRunDays(progress.streak).filter(({ day }) => !known.has(day))
  ).slice(-MAX_STREAK_DAYS)
}

/** A browser's clock may run a little ahead of the server's */
const CLOCK_SKEW_MS = 5 * 60_000
/** Before the courses existed: an earlier day was made up or a clock is off */
const EARLIEST_DAY_MS = Date.UTC(2025, 0, 1)
/** A local day spans 25 hours at most, more when a zone changes within it */
const MAX_DAY_SPAN_MS = 2 * DAY_MS

/**
 * The days a browser sent that hold together, each once: the first finish
 * falls on that day in that offset, the last no more than a day or so
 * later, neither in the future
 */
export const sentStreakDays = (days: StreakDay[] = [], now = new Date()) =>
  mergeStreakDays(
    days.flatMap(({ day, offset, first, last }) => {
      const firstMs = Date.parse(first)
      const lastMs = Date.parse(last)
      const fits =
        firstMs >= EARLIEST_DAY_MS &&
        firstMs <= lastMs &&
        lastMs - firstMs < MAX_DAY_SPAN_MS &&
        lastMs <= now.getTime() + CLOCK_SKEW_MS &&
        dayKeyAt(firstMs, offset) === day
      return fits
        ? [
            {
              day,
              offset,
              first: new Date(firstMs).toISOString(),
              last: new Date(lastMs).toISOString(),
            },
          ]
        : []
    })
  )

/** A finish at `at` as a day in `timeZone`, with that day's UTC offset */
export const streakDayInZone = (timeZone: string, at = new Date()) => {
  const day = dayInZone(timeZone, at)
  const offset = Math.round(
    (midnightInZone(timeZone, at).getTime() - Date.parse(day)) / 60_000
  )
  const iso = at.toISOString()
  return { day, offset, first: iso, last: iso } satisfies StreakDay
}
