/**
 * Learner progress as the browser keeps it, and how two copies of it combine:
 * this browser's and the account's (saved from other devices). Shared by the
 * browser and the server so both merge the same way.
 */

import { XP_EXAM_PASS, XP_LESSON } from "./rules"

export interface ProgressState {
  version: 1
  xp: number
  streak: {
    count: number
    lastDay: string | null
    lastAt?: string
    lastOffset?: number
  }
  bestStreak?: number
  lessons: Record<string, { completedAt: string; accuracy: number }>
  steps?: Record<
    string,
    { seen: number; missed: number; lastAt: string; lastCorrect: boolean }
  >
  exams?: Record<string, { best: number; passedAt: string | null }>
}

export const EMPTY_PROGRESS: ProgressState = {
  version: 1,
  xp: 0,
  streak: { count: 0, lastDay: null },
  lessons: {},
}

/** Any lesson finished or Course Mastery taken */
export const hasAnyProgress = (progress: ProgressState) =>
  Object.keys(progress.lessons).length > 0 ||
  Object.keys(progress.exams ?? {}).length > 0

const later = (a = "", b = "") => (a >= b ? a : b)

const streakTime = ({ lastAt, lastDay }: ProgressState["streak"]) =>
  lastAt ?? lastDay ?? ""

/**
 * Both copies combined. Records join, keeping the better or later of each;
 * the streak is whichever was extended last. XP can't be split by source, so
 * the higher total stands, plus the lessons and trophies only the other copy
 * has. Merging the result with either copy again changes nothing.
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

  const streak =
    streakTime(b.streak) > streakTime(a.streak) ? b.streak : a.streak

  return {
    ...a,
    xp,
    streak,
    bestStreak: Math.max(
      a.bestStreak ?? 0,
      b.bestStreak ?? 0,
      a.streak.count,
      b.streak.count
    ),
    lessons,
    steps,
    exams,
  }
}
