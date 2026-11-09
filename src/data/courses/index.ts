import { blockchainCourse } from "./blockchain"
import { etherCourse } from "./ether"
import { smartContractsCourse } from "./smart-contracts"
import { transactionsCourse } from "./transactions"
import type { Course, Lesson } from "./types"
import { walletsCourse } from "./wallets"

export type * from "./types"

/** Suggested path, not a lock: see the courses skill's curriculum reference */
export const COURSES: Course[] = [
  walletsCourse,
  blockchainCourse,
  transactionsCourse,
  etherCourse,
  smartContractsCourse,
]

export const getCourse = (courseId: string) =>
  COURSES.find(({ id }) => id === courseId)

export const getLesson = (courseId: string, lessonId: string) => {
  const course = getCourse(courseId)
  const index = course?.lessons.findIndex(({ id }) => id === lessonId) ?? -1
  if (!course || index < 0) return undefined
  return {
    course,
    lesson: course.lessons[index] as Lesson,
    index,
    next: course.lessons[index + 1] as Lesson | undefined,
  }
}

export const courseHref = (courseId: string) => `/courses/${courseId}/`

export const lessonHref = (courseId: string, lessonId: string) =>
  `/courses/${courseId}/${lessonId}/`

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
