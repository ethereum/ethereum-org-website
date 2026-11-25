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
import type { Course, ExamStep, Lesson, LessonStep, Track } from "./types"
import { upgradesCourse } from "./upgrades"
import { walletsCourse } from "./wallets"

import { EXAM_ID } from "@/lib/courses/constants"

export type * from "./types"
export * from "@/lib/courses/constants"

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

/** A lesson's step, or with `EXAM_ID` a Course Mastery question */
export const getStep = (courseId: string, lessonId: string, stepId: string) => {
  const steps =
    lessonId === EXAM_ID
      ? getCourse(courseId)?.exam
      : getLesson(courseId, lessonId)?.lesson.steps
  return steps?.find(({ id }) => id === stepId)
}

/** Ids a learner can pick on a step, for checking a report's answer; none for widgets */
export const stepAnswerIds = (step: LessonStep | ExamStep) => {
  if ("options" in step) return step.options
  if ("items" in step) return step.items
  if ("pairs" in step) return step.pairs
  if ("blanks" in step) return [...step.blanks, ...step.extras]
  return []
}
