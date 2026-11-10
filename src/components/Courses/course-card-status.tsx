"use client"

import { Trophy } from "lucide-react"
import { useTranslations } from "next-intl"

import { useCourseProgress } from "./useCourseProgress"

interface CourseCardStatusProps {
  courseId: string
  lessonIds: string[]
}

/** Hub card banner badge: the trophy, once the course check is passed */
export const CourseCardTrophy = ({ courseId }: { courseId: string }) => {
  const t = useTranslations("page-courses")
  const { isExamPassed } = useCourseProgress()
  if (!isExamPassed(courseId)) return null
  return (
    <span className="absolute end-3 top-3 grid size-10 place-items-center rounded-full border-b-4 border-yellow-600 bg-yellow-400 text-yellow-900">
      <Trophy className="size-5" aria-hidden />
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
