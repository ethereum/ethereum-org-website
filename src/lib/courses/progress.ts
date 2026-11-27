/**
 * Learner progress as the browser keeps it, and how two copies of it combine:
 * this browser's and the account's (saved from other devices). Shared by the
 * browser and the server so both merge the same way.
 */

import { XP_EXAM_PASS, XP_LESSON } from "./rules"
import {
  type AccountStreak,
  mergeStreakDays,
  mergeStreaks,
  NO_STREAK,
  type Streak,
  type StreakDay,
  withAccountStreak,
} from "./streak"

/**
 * The progress format this code reads and writes. A newer one was saved by a
 * later release of the site: this page leaves it untouched and asks for a
 * reload, and the server upgrades older ones as they arrive
 */
export const PROGRESS_VERSION = 1

export const isNewerProgress = (value: unknown) =>
  typeof value === "object" &&
  value !== null &&
  "version" in value &&
  typeof value.version === "number" &&
  value.version > PROGRESS_VERSION

export interface ProgressState {
  version: typeof PROGRESS_VERSION
  xp: number
  streak: Streak
  bestStreak?: number
  /** Days with a finish the account hasn't confirmed yet (see `streak.ts`) */
  days?: StreakDay[]
  lessons: Record<string, { completedAt: string; accuracy: number }>
  steps?: Record<
    string,
    { seen: number; missed: number; lastAt: string; lastCorrect: boolean }
  >
  exams?: Record<string, { best: number; passedAt: string | null }>
}

export const EMPTY_PROGRESS: ProgressState = {
  version: PROGRESS_VERSION,
  xp: 0,
  streak: NO_STREAK,
  lessons: {},
}

/** Any lesson finished or Course Mastery taken */
export const hasAnyProgress = (progress: ProgressState) =>
  Object.keys(progress.lessons).length > 0 ||
  Object.keys(progress.exams ?? {}).length > 0

const later = (a = "", b = "") => (a >= b ? a : b)

/**
 * Both copies combined. Records join, keeping the better or later of each,
 * and so do the days waiting for the account. Streak runs that overlap or
 * meet join; the account then sets the streak it works out from every
 * device's days (`streakFromDays`, `withAccountStreak`). XP can't be split by
 * source, so the higher total stands, plus the lessons and trophies only the
 * other copy has. Merging the result with either copy again changes nothing.
 */
export const mergeProgress = <T extends ProgressState>(
  a: T,
  b: ProgressState
): T => {
  const [high, low] = a.xp >= b.xp ? [a, b] : [b, a]

  const lessons = { ...a.lessons }
  for (const [key, record] of Object.entries(b.lessons)) {
    const mine = lessons[key]
    lessons[key] = mine
      ? {
          completedAt: later(mine.completedAt, record.completedAt),
          accuracy: Math.max(mine.accuracy, record.accuracy),
        }
      : record
  }

  const exams = { ...a.exams }
  for (const [courseId, record] of Object.entries(b.exams ?? {})) {
    const mine = exams[courseId]
    const passes = [mine?.passedAt, record.passedAt].filter(
      (date): date is string => !!date
    )
    exams[courseId] = {
      best: Math.max(mine?.best ?? 0, record.best),
      passedAt: passes.sort()[0] ?? null,
    }
  }

  // Counts can't be added (each copy may hold the same runs): the record
  // with more runs behind it wins
  const steps = { ...a.steps }
  for (const [key, record] of Object.entries(b.steps ?? {})) {
    const mine = steps[key]
    if (
      !mine ||
      record.seen > mine.seen ||
      (record.seen === mine.seen && record.lastAt > mine.lastAt)
    )
      steps[key] = record
  }

  let xp = high.xp
  for (const key of Object.keys(low.lessons))
    if (!high.lessons[key]) xp += XP_LESSON
  for (const [courseId, { passedAt }] of Object.entries(low.exams ?? {}))
    if (passedAt && !high.exams?.[courseId]?.passedAt) xp += XP_EXAM_PASS

  const streak = mergeStreaks(a.streak, b.streak)

  return {
    ...a,
    xp,
    streak,
    bestStreak: Math.max(
      a.bestStreak ?? 0,
      b.bestStreak ?? 0,
      a.streak.count,
      b.streak.count,
      streak.count
    ),
    ...(a.days || b.days ? { days: mergeStreakDays(a.days, b.days) } : {}),
    lessons,
    steps,
    exams,
  }
}

/**
 * This browser's progress with the account's answer merged in: records
 * join, `pending` (the days still on their way to the account) stay, and the
 * streak is the account's, worked out from every device's days, extended by
 * them
 */
export const withAccountProgress = <T extends ProgressState>(
  local: T,
  account: AccountStreak & { state: ProgressState | null },
  pending: StreakDay[]
): T => {
  const merged = mergeProgress(local, account.state ?? EMPTY_PROGRESS)
  const { streak, bestStreak } = withAccountStreak(account, pending)
  return {
    ...merged,
    streak,
    bestStreak: Math.max(bestStreak, merged.bestStreak ?? 0),
    days: pending,
  }
}
