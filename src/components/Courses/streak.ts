import { type Streak, streakStatus } from "@/lib/courses/streak"

export type { Streak }

/** Streak as displayed: 0 once it has lapsed */
export const getActiveStreak = (streak: Streak, now = new Date()) =>
  streakStatus(streak, now) === "lapsed" ? 0 : streak.count

/** True once a lesson has been completed today, so the streak is safe */
export const isStreakExtendedToday = (streak: Streak, now = new Date()) =>
  streakStatus(streak, now) === "today"
