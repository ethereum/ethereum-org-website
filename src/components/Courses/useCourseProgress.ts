"use client"

import { useCallback, useSyncExternalStore } from "react"

import { clearPendingUpload, queueProgressUpload } from "./account-sync"
import {
  flagProgress,
  readStoredProgress,
  subscribeStoredProgress,
  writeStoredProgress,
} from "./progress-storage"
import { mergeStepResults, type StepRecord } from "./step-history"

import {
  EXAM_ID,
  EXAM_PASS_MARK,
  lessonProgressKey,
} from "@/lib/courses/constants"
import {
  EMPTY_PROGRESS,
  hasAnyProgress,
  PROGRESS_VERSION,
} from "@/lib/courses/progress"
import {
  XP_EXAM_PASS,
  XP_LESSON,
  XP_PERFECT_BONUS,
  XP_REPLAY,
} from "@/lib/courses/rules"
import { recordFinish, type Streak, type StreakDay } from "@/lib/courses/streak"

export {
  hasAnyProgress,
  readStoredProgress,
  XP_EXAM_PASS,
  XP_LESSON,
  XP_PERFECT_BONUS,
  XP_REPLAY,
}

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
  version: typeof PROGRESS_VERSION
  xp: number
  streak: Streak
  /** Longest streak reached; absent in progress saved before it was tracked */
  bestStreak?: number
  /** Days with a finish the account hasn't confirmed yet; signed out, all of
   * them, for an account to take on later */
  days?: StreakDay[]
  lessons: Record<string, LessonRecord>
  /** First-try results by step; absent in progress saved before it was tracked */
  steps?: Record<string, StepRecord>
  /** By course id; absent in progress saved before exams existed */
  exams?: Record<string, ExamRecord>
  /** The account this progress was synced with, if any: it belongs to that
   * account, so signing in to another one replaces it instead of merging */
  account?: string
}

export interface LessonReward {
  xp: number
  /** Part of `xp` earned by a perfect first run, shown as its own moment */
  bonus: number
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

const INITIAL_PROGRESS: CourseProgress = EMPTY_PROGRESS

const currentProgress = () => readStoredProgress() ?? INITIAL_PROGRESS
const serverProgress = () => INITIAL_PROGRESS

export const useCourseProgress = () => {
  // One parsed copy for every caller on the page, kept in step with saves
  const progress = useSyncExternalStore(
    subscribeStoredProgress,
    currentProgress,
    serverProgress
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

  /**
   * XP and streak for finishing a lesson or exam; `update` adds the record.
   * Builds on the latest save (another tab's, or a sync's), not the render's
   */
  const award = (
    current: CourseProgress,
    xp: number,
    perfect: boolean,
    update: (now: Date) => Partial<CourseProgress>,
    bonus = 0
  ): LessonReward => {
    const now = new Date()
    const { progress: next, extended } = recordFinish(current, now)

    writeStoredProgress({ ...next, ...update(now), xp: current.xp + xp })
    flagProgress(true)
    queueProgressUpload()

    return {
      xp,
      bonus,
      perfect,
      streak: next.streak.count,
      streakExtended: extended,
      totalBefore: current.xp,
      totalAfter: current.xp + xp,
    }
  }

  /** `results`: first try right or wrong, by graded step id */
  const completeLesson = (
    courseId: string,
    lessonId: string,
    accuracy: number,
    results: Record<string, boolean>
  ): LessonReward => {
    const current = currentProgress()
    const key = lessonProgressKey(courseId, lessonId)
    const previous = current.lessons[key]
    const perfect = accuracy === 1
    const bonus = !previous && perfect ? XP_PERFECT_BONUS : 0
    const xp = previous ? XP_REPLAY : XP_LESSON + bonus

    return award(
      current,
      xp,
      perfect,
      (now) => ({
        lessons: {
          ...current.lessons,
          [key]: {
            completedAt: now.toISOString(),
            accuracy: Math.max(accuracy, previous?.accuracy ?? 0),
          },
        },
        steps: mergeStepResults(
          current.steps,
          courseId,
          lessonId,
          results,
          now
        ),
      }),
      bonus
    )
  }

  /** Any attempt counts for the streak; the trophy needs `EXAM_PASS_MARK` */
  const completeExam = (
    courseId: string,
    score: number,
    results: Record<string, boolean>
  ): ExamReward => {
    const current = currentProgress()
    const previous = current.exams?.[courseId]
    const passed = score >= EXAM_PASS_MARK
    const firstPass = passed && !previous?.passedAt
    const reward = award(
      current,
      firstPass ? XP_EXAM_PASS : XP_REPLAY,
      score === 1,
      (now) => ({
        exams: {
          ...current.exams,
          [courseId]: {
            best: Math.max(score, previous?.best ?? 0),
            passedAt: previous?.passedAt ?? (passed ? now.toISOString() : null),
          },
        },
        steps: mergeStepResults(current.steps, courseId, EXAM_ID, results, now),
      })
    )
    return { ...reward, passed }
  }

  /** Signed out only: signed in, the account holds the progress */
  const resetProgress = () => {
    writeStoredProgress(INITIAL_PROGRESS)
    clearPendingUpload()
    flagProgress(false)
  }

  return {
    progress,
    isLessonComplete,
    completeLesson,
    isExamPassed,
    completeExam,
    resetProgress,
  }
}
