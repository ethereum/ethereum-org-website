"use client"

import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

import { bannerTag } from "./theme"
import { type TrackCourse, useTrackStatus } from "./track-status"
import { useCourseProgress } from "./useCourseProgress"

interface CourseCardStatusProps {
  courseId: string
  lessonIds: string[]
}

/** Hub card banner badge: a check, once the course check is passed */
export const CourseCardDone = ({ courseId }: { courseId: string }) => {
  const t = useTranslations("page-courses")
  const { isExamPassed } = useCourseProgress()
  if (!isExamPassed(courseId)) return null
  return (
    <span className="absolute end-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-green-700 text-white">
      <Check className="size-5" strokeWidth={3} aria-hidden />
      <span className="sr-only">{t("page-courses-path-finish")}</span>
    </span>
  )
}

/** Hub card CTA label from progress: Begin, Continue, or Review once mastered */
export const CourseCardAction = ({
  courseId,
  lessonIds,
}: CourseCardStatusProps) => {
  const t = useTranslations("page-courses")
  const { isLessonComplete, isExamPassed } = useCourseProgress()
  if (isExamPassed(courseId)) return t("page-courses-hub-review")
  const started = lessonIds.some((id) => isLessonComplete(courseId, id))
  return started ? t("page-courses-hub-continue") : t("page-courses-hub-begin")
}

/**
 * Hub card banner tag on the track's first course not yet mastered: "Start
 * here" until anything in the track is done, then "Up next"
 */
export const CourseCardNext = ({
  courseId,
  track,
}: {
  courseId: string
  track: TrackCourse[]
}) => {
  const t = useTranslations("page-courses")
  const { nextId, started } = useTrackStatus(track)
  if (nextId !== courseId) return null
  return (
    <span className={bannerTag}>
      {t(started ? "page-courses-up-next" : "page-courses-start-here")}
    </span>
  )
}
