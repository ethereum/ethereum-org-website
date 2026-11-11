"use client"

import { useCallback } from "react"

import { EXAM_ID, EXAM_PASS_MARK, lessonProgressKey } from "@/data/courses"

import { COURSE_PROGRESS_KEY } from "./progress-storage"
import { mergeStepResults, type StepRecord } from "./step-history"
import { extendStreak, type Streak } from "./streak"

import { useLocalStorage } from "@/hooks/useLocalStorage"

export const XP_LESSON = 10
export const XP_PERFECT_BONUS = 5
export const XP_REPLAY = 5
export const XP_EXAM_PASS = 30

export interface LessonRecord {
  completedAt: string
  /** Best first-try accuracy, 0-1 */
  accuracy: number
}

export interface ExamRecord {
  /** Best score, 0-1 */
  best: number
  passedAt: string | null
}

export interface CourseProgress {
  version: 1
  xp: number
  streak: Streak
  /** Longest streak reached; absent in progress saved before it was tracked */
  bestStreak?: number
  lessons: Record<string, LessonRecord>
  /** First-try results by step; absent in progress saved before it was tracked */
  steps?: Record<string, StepRecord>
  /** By course id; absent in progress saved before exams existed */
  exams?: Record<string, ExamRecord>
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

export interface ExamReward extends LessonReward {
  passed: boolean
}

/** Any lesson finished or mastery check taken */
export const hasAnyProgress = (progress: CourseProgress) =>
  Object.keys(progress.lessons).length > 0 ||
  Object.keys(progress.exams ?? {}).length > 0

/**
 * Saved progress, read straight from storage. `useCourseProgress` only has
 * it after its first effect, so a decision made on mount reads this instead.
 */
export const readStoredProgress = (): CourseProgress | null => {
  try {
    const item = window.localStorage.getItem(COURSE_PROGRESS_KEY)
    return item ? (JSON.parse(item) as CourseProgress) : null
  } catch {
    return null
  }
}

const INITIAL_PROGRESS: CourseProgress = {
  version: 1,
  xp: 0,
  streak: { count: 0, lastDay: null },
  lessons: {},
}

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

  const isExamPassed = useCallback(
    (courseId: string) => !!progress.exams?.[courseId]?.passedAt,
    [progress.exams]
  )

  /** XP and streak for finishing a lesson or exam; `update` adds the record */
  const award = (
    xp: number,
    perfect: boolean,
    update: (now: Date) => Partial<CourseProgress>
  ): LessonReward => {
    const now = new Date()
    const { streak, extended } = extendStreak(progress.streak, now)

    setProgress({
      ...progress,
      ...update(now),
      xp: progress.xp + xp,
      streak,
      bestStreak: Math.max(
        progress.bestStreak ?? progress.streak.count,
        streak.count
      ),
    })

    return {
      xp,
      perfect,
      streak: streak.count,
      streakExtended: extended,
      totalBefore: progress.xp,
      totalAfter: progress.xp + xp,
    }
  }

  /** `results`: first try right or wrong, by graded step id */
  const completeLesson = (
    courseId: string,
    lessonId: string,
    accuracy: number,
    results: Record<string, boolean>
  ): LessonReward => {
    const key = lessonProgressKey(courseId, lessonId)
    const previous = progress.lessons[key]
    const perfect = accuracy === 1
    const xp = previous
      ? XP_REPLAY
      : XP_LESSON + (perfect ? XP_PERFECT_BONUS : 0)

    return award(xp, perfect, (now) => ({
      lessons: {
        ...progress.lessons,
        [key]: {
          completedAt: now.toISOString(),
          accuracy: Math.max(accuracy, previous?.accuracy ?? 0),
        },
      },
      steps: mergeStepResults(progress.steps, courseId, lessonId, results, now),
    }))
  }

  /** Any attempt counts for the streak; the trophy needs `EXAM_PASS_MARK` */
  const completeExam = (
    courseId: string,
    score: number,
    results: Record<string, boolean>
  ): ExamReward => {
    const previous = progress.exams?.[courseId]
    const passed = score >= EXAM_PASS_MARK
    const firstPass = passed && !previous?.passedAt
    const reward = award(
      firstPass ? XP_EXAM_PASS : XP_REPLAY,
      score === 1,
      (now) => ({
        exams: {
          ...progress.exams,
          [courseId]: {
            best: Math.max(score, previous?.best ?? 0),
            passedAt: previous?.passedAt ?? (passed ? now.toISOString() : null),
          },
        },
        steps: mergeStepResults(
          progress.steps,
          courseId,
          EXAM_ID,
          results,
          now
        ),
      })
    )
    return { ...reward, passed }
  }

  const resetProgress = () => setProgress(INITIAL_PROGRESS)

  return {
    progress,
    isLessonComplete,
    completeLesson,
    isExamPassed,
    completeExam,
    resetProgress,
  }
}
