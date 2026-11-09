"use client"

import { useCallback } from "react"

import { lessonProgressKey } from "@/data/courses"

import { useLocalStorage } from "@/hooks/useLocalStorage"

const COURSE_PROGRESS_KEY = "ethereum-org-course-progress"

export const XP_LESSON = 10
export const XP_PERFECT_BONUS = 5
export const XP_REPLAY = 5

export interface LessonRecord {
  completedAt: string
  /** Best first-try accuracy, 0-1 */
  accuracy: number
}

export interface CourseProgress {
  version: 1
  xp: number
  streak: { count: number; lastDay: string | null }
  lessons: Record<string, LessonRecord>
}

export interface LessonReward {
  xp: number
  perfect: boolean
  streak: number
  /** False when the streak was already extended earlier today */
  streakExtended: boolean
  /** Lifetime XP before and after this lesson */
  totalBefore: number
  totalAfter: number
}

const INITIAL_PROGRESS: CourseProgress = {
  version: 1,
  xp: 0,
  streak: { count: 0, lastDay: null },
  lessons: {},
}

// Local calendar day: a streak follows the learner's own midnight, not UTC.
const dayKey = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-")

const yesterdayKey = (now: Date) => {
  const d = new Date(now)
  d.setDate(d.getDate() - 1)
  return dayKey(d)
}

/** Streak as displayed: a streak not extended today or yesterday has lapsed */
export const getActiveStreak = (
  { count, lastDay }: CourseProgress["streak"],
  now = new Date()
) => (lastDay === dayKey(now) || lastDay === yesterdayKey(now) ? count : 0)

/** True once a lesson has been completed today, so the streak is safe */
export const isStreakExtendedToday = (
  { lastDay }: CourseProgress["streak"],
  now = new Date()
) => lastDay === dayKey(now)

export const useCourseProgress = () => {
  const [progress, setProgress] = useLocalStorage<CourseProgress>(
    COURSE_PROGRESS_KEY,
    INITIAL_PROGRESS
  )

  const isLessonComplete = useCallback(
    (courseId: string, lessonId: string) =>
      lessonProgressKey(courseId, lessonId) in progress.lessons,
    [progress.lessons]
  )

  const completeLesson = (
    courseId: string,
    lessonId: string,
    accuracy: number
  ): LessonReward => {
    const now = new Date()
    const today = dayKey(now)
    const key = lessonProgressKey(courseId, lessonId)
    const previous = progress.lessons[key]

    const perfect = accuracy === 1
    const xp = previous
      ? XP_REPLAY
      : XP_LESSON + (perfect ? XP_PERFECT_BONUS : 0)

    const { count, lastDay } = progress.streak
    const streak =
      lastDay === today ? count : lastDay === yesterdayKey(now) ? count + 1 : 1

    setProgress({
      ...progress,
      xp: progress.xp + xp,
      streak: { count: streak, lastDay: today },
      lessons: {
        ...progress.lessons,
        [key]: {
          completedAt: now.toISOString(),
          accuracy: Math.max(accuracy, previous?.accuracy ?? 0),
        },
      },
    })

    return {
      xp,
      perfect,
      streak,
      streakExtended: lastDay !== today,
      totalBefore: progress.xp,
      totalAfter: progress.xp + xp,
    }
  }

  const resetProgress = () => setProgress(INITIAL_PROGRESS)

  return {
    progress,
    isLessonComplete,
    completeLesson,
    resetProgress,
  }
}
