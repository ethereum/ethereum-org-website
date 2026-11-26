import type { AbstractIntlMessages } from "next-intl"

import {
  COURSES,
  type CourseWidgetId,
  EXAM_ID,
  getCourse,
  getLesson,
  stepKey,
  TRACKS,
} from "@/data/courses"

import { isWidgetKeyFor, WIDGET_KEY_PREFIX } from "./widgets"

const NAMESPACE = "page-courses"
const UI_PREFIX = "page-courses-"

export type CourseMessageScope =
  | { page: "hub" }
  | { page: "profile" }
  | { page: "course" | "exam"; courseId: string }
  | { page: "lesson"; courseId: string; lessonId: string }

/**
 * Whether a courses page renders `key` in the browser. Every page gets the
 * UI chrome (`page-courses-*`, minus widgets) and each course and teaser
 * title and description (cards, next-course links). On top of that:
 * - course: its lessons' titles and summaries (the path)
 * - lesson: those, the lesson's own strings and its widgets'
 * - exam: those and the exam's questions
 * - profile: every lesson title. Missed questions' prompts load on demand
 *   (`coursePromptKeys`), not with the page
 */
const courseKeyFilter = (scope: CourseMessageScope) => {
  const keys = new Set(
    TRACKS.flatMap(({ courses, upcoming = [] }) => [
      ...courses,
      ...upcoming,
    ]).flatMap(({ id }) => [`${id}-title`, `${id}-description`])
  )
  const prefixes: string[] = []
  let widgets: CourseWidgetId[] = []

  if (scope.page === "profile") {
    for (const { id, lessons } of COURSES)
      for (const lesson of lessons) keys.add(`${id}-${lesson.id}-title`)
  } else if (scope.page !== "hub") {
    const { courseId } = scope
    for (const { id } of getCourse(courseId)?.lessons ?? [])
      keys.add(`${courseId}-${id}-title`).add(`${courseId}-${id}-summary`)
    if (scope.page === "exam") prefixes.push(`${courseId}-${EXAM_ID}-`)
    if (scope.page === "lesson") {
      prefixes.push(`${courseId}-${scope.lessonId}-`)
      widgets =
        getLesson(courseId, scope.lessonId)?.lesson.steps.flatMap((step) =>
          step.type === "interactive" ? [step.widget] : []
        ) ?? []
    }
  }

  return (key: string) =>
    key.startsWith(WIDGET_KEY_PREFIX)
      ? isWidgetKeyFor(key, widgets)
      : key.startsWith(UI_PREFIX) ||
        keys.has(key) ||
        prefixes.some((prefix) => key.startsWith(prefix))
}

/** A course's question prompts, lessons' and Course Mastery's */
export const coursePromptKeys = (courseId: string) => {
  const course = getCourse(courseId)
  if (!course) return []
  return [
    ...course.lessons.flatMap((lesson) =>
      lesson.steps.map((step) =>
        stepKey(courseId, lesson.id, step.id, "prompt")
      )
    ),
    ...course.exam.map((question) =>
      stepKey(courseId, EXAM_ID, question.id, "prompt")
    ),
  ]
}

/**
 * `messages` with `page-courses` cut to what the page renders, so the
 * browser isn't sent every course's copy (other namespaces pass through)
 */
export const pickCourseMessages = (
  messages: AbstractIntlMessages,
  scope: CourseMessageScope
): AbstractIntlMessages => {
  const strings = messages[NAMESPACE]
  if (!strings || typeof strings === "string") return messages
  const keep = courseKeyFilter(scope)
  return {
    ...messages,
    [NAMESPACE]: Object.fromEntries(
      Object.entries(strings).filter(([key]) => keep(key))
    ),
  }
}
