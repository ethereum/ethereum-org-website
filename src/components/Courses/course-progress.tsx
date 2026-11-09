"use client"

import { useTranslations } from "next-intl"

import { Progress } from "@/components/ui/progress"

import { cn } from "@/lib/utils/cn"

import { useCourseProgress } from "./useCourseProgress"

interface CourseProgressProps {
  courseId: string
  lessonIds: string[]
  /** Light text and track, for use on a course-coloured surface */
  onColor?: boolean
}

const CourseProgress = ({
  courseId,
  lessonIds,
  onColor,
}: CourseProgressProps) => {
  const t = useTranslations("page-courses")
  const { isLessonComplete } = useCourseProgress()
  const done = lessonIds.filter((id) => isLessonComplete(courseId, id)).length
  const percent = (done / lessonIds.length) * 100

  return (
    <div className="flex flex-col gap-2">
      <Progress
        aria-hidden
        shine
        value={percent}
        className={cn(
          "h-3 *:data-[slot=progress-indicator]:duration-700",
          onColor
            ? "bg-black/20 *:data-[slot=progress-indicator]:bg-white"
            : "bg-(--course-soft) *:data-[slot=progress-indicator]:bg-(--course)"
        )}
      />
      <span
        className={cn(
          "text-sm font-bold",
          onColor ? "text-white" : "text-body-medium"
        )}
      >
        {t("page-courses-lessons-done", { done, total: lessonIds.length })}
      </span>
    </div>
  )
}

export default CourseProgress
