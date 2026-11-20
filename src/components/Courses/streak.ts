export interface Streak {
  count: number
  /** Local calendar day of the last lesson, YYYY-MM-DD */
  lastDay: string | null
  /** When the last lesson finished, and the UTC offset (minutes, as
   * `getTimezoneOffset`) it finished in; absent in older saved progress */
  lastAt?: string
  lastOffset?: number
}

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

/** Streak as displayed: 0 once it has lapsed */
export const getActiveStreak = (streak: Streak, now = new Date()) =>
  streakStatus(streak, now) === "lapsed" ? 0 : streak.count

/** True once a lesson has been completed today, so the streak is safe */
export const isStreakExtendedToday = (streak: Streak, now = new Date()) =>
  streakStatus(streak, now) === "today"

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
