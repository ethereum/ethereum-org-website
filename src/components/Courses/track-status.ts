"use client"

import { useCourseProgress } from "./useCourseProgress"

import { useIsClient } from "@/hooks/useIsClient"

/** What a track's progress needs to know about each of its courses */
export interface TrackCourse {
  id: string
  lessonIds: string[]
  hasExam: boolean
}

/**
 * Mastered courses in a track, the first one that isn't (the suggested
 * next), and whether the track has been started at all. `nextId` waits for
 * saved progress, so a returning learner's card doesn't flash a tag on the
 * first course.
 */
export const useTrackStatus = (courses: TrackCourse[]) => {
  const isClient = useIsClient()
  const { progress, isLessonComplete, isExamPassed } = useCourseProgress()
  const mastered = new Set(
    courses
      .filter(({ id, lessonIds, hasExam }) =>
        hasExam
          ? isExamPassed(id)
          : lessonIds.every((lessonId) => isLessonComplete(id, lessonId))
      )
      .map(({ id }) => id)
  )
  const nextId = isClient
    ? courses.find(({ id }) => !mastered.has(id))?.id
    : undefined
  // Any lesson finished or Course Mastery tried anywhere in the track
  const started = courses.some(
    ({ id, lessonIds }) =>
      !!progress.exams?.[id] ||
      lessonIds.some((lessonId) => isLessonComplete(id, lessonId))
  )
  return { mastered, nextId, started }
}
