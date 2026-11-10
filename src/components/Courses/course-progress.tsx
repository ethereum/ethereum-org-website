"use client"

import { Trophy } from "lucide-react"
import { useTranslations } from "next-intl"

import { Progress } from "@/components/ui/progress"

import { cn } from "@/lib/utils/cn"

import { useCourseProgress } from "./useCourseProgress"

interface CourseProgressProps {
  courseId: string
  lessonIds: string[]
  /** The course ends in a course check, which counts as the final step */
  hasExam: boolean
  /** Light text and track, for use on a course-coloured surface */
  onColor?: boolean
}

/** Lessons done, plus the course check as the last step, with its trophy */
const CourseProgress = ({
  courseId,
  lessonIds,
  hasExam,
  onColor,
}: CourseProgressProps) => {
  const t = useTranslations("page-courses")
  const { isLessonComplete, isExamPassed } = useCourseProgress()
  const total = lessonIds.length
  const done = lessonIds.filter((id) => isLessonComplete(courseId, id)).length
  const passed = hasExam && isExamPassed(courseId)
  const percent =
    ((done + (passed ? 1 : 0)) / (total + (hasExam ? 1 : 0))) * 100

  const label = passed
    ? t("page-courses-path-finish")
    : hasExam && done === total
      ? t("page-courses-progress-check-next")
      : t("page-courses-lessons-done", { done, total })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
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
        {hasExam && (
          <Trophy
            aria-hidden
            className={cn(
              "size-6 shrink-0 transition-colors",
              passed
                ? "fill-yellow-400 text-yellow-600"
                : onColor
                  ? "text-white/60"
                  : "text-disabled"
            )}
          />
        )}
      </div>
      <span
        className={cn(
          "text-sm font-bold",
          onColor ? "text-white" : "text-body-medium"
        )}
      >
        {label}
      </span>
    </div>
  )
}

export default CourseProgress
