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

/**
 * Lessons done as one bar that runs into the course check's trophy: a dashed
 * ring until Course Mastery is passed, solid gold after
 */
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
  const allDone = total > 0 && done === total
  const passed = hasExam && isExamPassed(courseId)

  const label = passed
    ? t("page-courses-path-finish")
    : hasExam && allDone
      ? t("page-courses-progress-check-next")
      : t("page-courses-lessons-done", { done, total })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <Progress
          aria-hidden
          value={total ? (done / total) * 100 : 0}
          className={cn(
            "h-3 *:data-[slot=progress-indicator]:duration-700",
            // Square end where the bar meets the trophy ring
            hasExam && "rounded-e-none",
            hasExam &&
              allDone &&
              "*:data-[slot=progress-indicator]:rounded-e-none",
            onColor
              ? "bg-black/20 *:data-[slot=progress-indicator]:bg-white"
              : "bg-(--course-soft) *:data-[slot=progress-indicator]:bg-(--course)"
          )}
        />
        {hasExam && (
          <span
            aria-hidden
            className={cn(
              "relative -ms-px grid size-9 shrink-0 place-items-center rounded-full border-2 transition-colors duration-700",
              passed
                ? "border-yellow-500 bg-yellow-400"
                : cn(
                    "border-dashed",
                    allDone
                      ? onColor
                        ? "border-white"
                        : "border-(--course)"
                      : onColor
                        ? "border-white/60"
                        : "border-(--course-soft)"
                  )
            )}
          >
            <Trophy
              className={cn(
                "size-5 transition-colors duration-700",
                passed
                  ? // Cup filled, handles (3rd and 6th paths) left open
                    "fill-yellow-200 text-yellow-800 [&_path:nth-of-type(3)]:fill-none [&_path:nth-of-type(6)]:fill-none"
                  : allDone
                    ? onColor
                      ? "text-white"
                      : "text-(--course)"
                    : onColor
                      ? "text-white/60"
                      : "text-disabled"
              )}
            >
              {/* Lucide draws the base as two open strokes; this closes it so it can
                  fill, with no stroke across the top where it meets the cup */}
              {passed && (
                <path d="M10 14.66V16.286A2 2 0 0 1 9.024 17.982A5 5 0 0 0 7 21.978H17A5 5 0 0 0 14.976 17.982A2 2 0 0 1 14 16.286V14.66" />
              )}
            </Trophy>
          </span>
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
