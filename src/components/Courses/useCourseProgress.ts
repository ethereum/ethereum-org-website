"use client"

import { useCallback } from "react"

import { EXAM_PASS_MARK, lessonProgressKey } from "@/data/courses"

import { extendStreak, type Streak } from "./streak"

import { useLocalStorage } from "@/hooks/useLocalStorage"

const COURSE_PROGRESS_KEY = "ethereum-org-course-progress"

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
  lessons: Record<string, LessonRecord>
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

  const completeLesson = (
    courseId: string,
    lessonId: string,
    accuracy: number
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
    }))
  }

  /** Any attempt counts for the streak; the trophy needs `EXAM_PASS_MARK` */
  const completeExam = (courseId: string, score: number): ExamReward => {
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
