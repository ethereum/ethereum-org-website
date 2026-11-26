"use client"

import { useCourseProgress } from "./useCourseProgress"

import { useIsClient } from "@/hooks/useIsClient"
import type { CatalogCourse, CatalogTrack } from "@/lib/courses/catalog"

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

/**
 * Where the hub sends a learner: the course they last worked on, or the next
 * one not yet mastered once it is (on through later tracks). With no
 * progress, the first course. `returning` waits for saved progress.
 */
export const useResumeCourse = (tracks: CatalogTrack[]) => {
  const ALL_COURSES = tracks.flatMap(({ courses }) => courses)
  const isClient = useIsClient()
  const { progress, isLessonComplete, isExamPassed } = useCourseProgress()
  const first = { course: ALL_COURSES[0], returning: false }
  if (!isClient) return first

  // Keys start with the course id: `course/lesson` and `course/lesson/step`
  const lastAt: Record<string, string> = {}
  const touch = (key: string, at?: string | null) => {
    const courseId = key.split("/")[0]
    if (at && at > (lastAt[courseId] ?? "")) lastAt[courseId] = at
  }
  for (const [key, { completedAt }] of Object.entries(progress.lessons))
    touch(key, completedAt)
  for (const [key, { lastAt: at }] of Object.entries(progress.steps ?? {}))
    touch(key, at)
  for (const [courseId, { passedAt }] of Object.entries(progress.exams ?? {}))
    touch(courseId, passedAt)

  const latest = ALL_COURSES.filter(({ id }) => lastAt[id]).sort((a, b) =>
    lastAt[b.id].localeCompare(lastAt[a.id])
  )[0]
  if (!latest) return first

  const isMastered = ({ id, lessons, exam }: CatalogCourse) =>
    exam.length
      ? isExamPassed(id)
      : lessons.every((lesson) => isLessonComplete(id, lesson.id))
  if (!isMastered(latest)) return { course: latest, returning: true }

  const index = ALL_COURSES.indexOf(latest)
  const after = [
    ...ALL_COURSES.slice(index + 1),
    ...ALL_COURSES.slice(0, index),
  ]
  return {
    course: after.find((c) => !isMastered(c)) ?? latest,
    returning: true,
  }
}
