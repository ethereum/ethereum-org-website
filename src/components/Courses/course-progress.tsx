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
  /** Bar and trophy only, where a heading already says the status */
  hideLabel?: boolean
  /** The `LessonsRemain` pill beside the label */
  lessonsRemain?: boolean
}

/**
 * Mastered with lessons still open: one added after mastery, or skipped by
 * taking Course Mastery early
 */
export const LessonsRemain = ({
  courseId,
  lessonIds,
  hasExam,
  onColor,
}: Pick<
  CourseProgressProps,
  "courseId" | "lessonIds" | "hasExam" | "onColor"
>) => {
  const t = useTranslations("page-courses")
  const { isLessonComplete, isExamPassed } = useCourseProgress()
  if (
    !hasExam ||
    !isExamPassed(courseId) ||
    lessonIds.every((id) => isLessonComplete(courseId, id))
  )
    return null
  return (
    <span
      className={cn(
        "w-fit rounded-full px-2.5 py-0.5 text-sm font-bold",
        onColor
          ? "bg-black/20 text-white"
          : "bg-(--course-soft) text-(--course-strong) dark:text-(--course-bright)"
      )}
    >
      {t("page-courses-lessons-remain")}
    </span>
  )
}

/** Lessons done, then the course check as a separate last step with its trophy */
const CourseProgress = ({
  courseId,
  lessonIds,
  hasExam,
  onColor,
  hideLabel,
  lessonsRemain,
}: CourseProgressProps) => {
  const t = useTranslations("page-courses")
  const { isLessonComplete, isExamPassed } = useCourseProgress()
  const total = lessonIds.length
  const done = lessonIds.filter((id) => isLessonComplete(courseId, id)).length
  const passed = hasExam && isExamPassed(courseId)

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
          value={total ? (done / total) * 100 : 0}
          style={{ flexGrow: total }}
          className={cn(
            "h-3 w-auto basis-0 *:data-[slot=progress-indicator]:duration-700",
            onColor
              ? "bg-black/20 *:data-[slot=progress-indicator]:bg-white"
              : "bg-(--course-soft) *:data-[slot=progress-indicator]:bg-(--course)"
          )}
        />
        {hasExam && (
          <span
            aria-hidden
            className={cn(
              "h-3 flex-1 basis-0 rounded-full transition-colors duration-700",
              passed
                ? onColor
                  ? "bg-white"
                  : "bg-(--course)"
                : onColor
                  ? "bg-black/20"
                  : "bg-(--course-soft)"
            )}
          />
        )}
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
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "text-sm font-bold",
            passed && onColor
              ? // Mastered, on the course banner: a gold tag matching the trophy
                "w-fit rounded-full bg-yellow-400 px-2.5 py-0.5 tracking-wide text-yellow-950 uppercase"
              : onColor
                ? "text-white"
                : "text-body-medium",
            hideLabel && "sr-only"
          )}
        >
          {label}
        </span>
        {lessonsRemain && (
          <LessonsRemain
            courseId={courseId}
            lessonIds={lessonIds}
            hasExam={hasExam}
            onColor={onColor}
          />
        )}
      </div>
    </div>
  )
}

export default CourseProgress
