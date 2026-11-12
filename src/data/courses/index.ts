import { DEFAULT_LOCALE } from "@/lib/constants"

import { blockchainsCourse } from "./blockchains"
import { ethCourse } from "./eth"
import { ethereumCourse } from "./ethereum"
import { everydayCourse } from "./everyday"
import { gasCourse } from "./gas"
import { layer2Course } from "./layer-2"
import { nftsCourse } from "./nfts"
import { proofOfStakeCourse } from "./proof-of-stake"
import { rollupsCourse } from "./rollups"
import { scamsCourse } from "./scams"
import { sendingCourse } from "./sending"
import { smartAccountsCourse } from "./smart-accounts"
import { smartContractsCourse } from "./smart-contracts"
import { tokensCourse } from "./tokens"
import { tradingAndLendingCourse } from "./trading-and-lending"
import type { Course, Lesson, Track } from "./types"
import { upgradesCourse } from "./upgrades"
import { walletsCourse } from "./wallets"

export type * from "./types"

/**
 * Hub sections, in order; each lists its courses in suggested order, then
 * any teasers (`upcoming`)
 */
export const TRACKS: Track[] = [
  {
    id: "essentials",
    courses: [
      everydayCourse,
      walletsCourse,
      blockchainsCourse,
      ethereumCourse,
      sendingCourse,
      smartContractsCourse,
    ],
  },
  {
    id: "using",
    courses: [
      tokensCourse,
      nftsCourse,
      layer2Course,
      tradingAndLendingCourse,
      scamsCourse,
    ],
  },
  {
    id: "deeper",
    courses: [
      gasCourse,
      proofOfStakeCourse,
      rollupsCourse,
      ethCourse,
      upgradesCourse,
      smartAccountsCourse,
    ],
  },
  {
    id: "under-the-hood",
    courses: [],
    upcoming: [
      { id: "nodes", level: "advanced", art: "blocks" },
      { id: "evm", level: "advanced", art: "vending" },
      { id: "mev", level: "advanced", art: "coins" },
      { id: "roadmap", level: "advanced", art: "diamond" },
      { id: "privacy", level: "advanced", art: "mailbox" },
      { id: "build", level: "advanced", art: "contract", href: "/developers/" },
    ],
  },
]

/**
 * Suggested path, not a lock: see the courses skill's curriculum reference.
 * Live courses only; teasers never get pages.
 */
export const COURSES: Course[] = TRACKS.flatMap(({ courses }) => courses)

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
