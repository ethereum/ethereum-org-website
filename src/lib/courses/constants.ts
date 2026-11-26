/**
 * Routes, reserved ids and key builders for /courses. No course data here, so
 * client components import these without bundling every course;
 * `@/data/courses` re-exports them for server code.
 */

import { DEFAULT_LOCALE } from "@/lib/constants"

export const courseHref = (courseId: string) => `/courses/${courseId}/`

export const COURSES_HUB = "/courses/"

/**
 * Search indexing and sitemap entries for the hub and course overview pages;
 * off until public beta. Lessons, exams and the profile are never indexed.
 */
export const COURSES_INDEXABLE = false

/** Social preview for every courses page: the hub hero */
export const COURSES_OG_IMAGE =
  "/images/courses/learning-path-garden-with-trophy.jpg"

/** Query flag on the hub after the profile sends someone with no progress back */
export const NO_PROFILE_PARAM = "noprofile"

/** Reserved: the profile page's route segment, so never a course id */
export const PROFILE_SEGMENT = "profile"

export const profileHref = `/courses/${PROFILE_SEGMENT}/`

export const lessonHref = (courseId: string, lessonId: string) =>
  `/courses/${courseId}/${lessonId}/`

/** Reserved: the exam's route segment and key prefix, so never a lesson id */
export const EXAM_ID = "exam"

/** Share of exam questions to get right for the trophy */
export const EXAM_PASS_MARK = 0.8

export const examHref = (courseId: string) => `/courses/${courseId}/${EXAM_ID}/`

/** Installed-app scope: one app per language, as `localePrefix` is "as-needed" */
export const courseAppScope = (locale: string) =>
  `${locale === DEFAULT_LOCALE ? "" : `/${locale}`}/courses/`

/** Outside `[locale]`, with an extension, so the proxy leaves it alone */
export const courseAppManifestHref = (locale: string) =>
  `/manifests/courses/${locale}.webmanifest`

/** Progress-map key for a lesson */
export const lessonProgressKey = (courseId: string, lessonId: string) =>
  `${courseId}/${lessonId}`

/** Translation key under `page-courses` for a step string */
export const stepKey = (
  courseId: string,
  lessonId: string,
  stepId: string,
  suffix: string
) => `${courseId}-${lessonId}-${stepId}-${suffix}`
