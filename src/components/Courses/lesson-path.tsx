"use client"

import { Check, Trophy } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import {
  courseHref,
  type CourseTheme,
  EXAM_PASS_MARK,
  examHref,
  lessonHref,
  type LessonIconId,
} from "@/data/courses"

import Scenery, { type SceneryId } from "./art/scenery"
import { LESSON_ICONS } from "./lesson-icons"
import { NODE_FACE_CENTRE, NODE_PRESS, NodeBody, NodeHalo } from "./lesson-node"
import { courseThemeStyle } from "./theme"
import { useCourseProgress } from "./useCourseProgress"

interface PathLesson {
  id: string
  icon: LessonIconId
  steps: number
  /** Only the path-ideas mock mixes lessons from several courses */
  courseId?: string
}

interface LessonPathProps {
  courseId: string
  theme: CourseTheme
  lessons: PathLesson[]
  scenery: SceneryId[]
  /** Next course in the suggested order; the finish popover points to it */
  nextCourseId?: string
  /** Course check length; 0 leaves the trophy as a plain finish marker */
  examQuestions?: number
  /** Mock only: pretend the first N lessons are done */
  previewDone?: number
}

const WIDTH = 320
const GAP = 136
const TOP = 64
const NODE = 76
const SWING = 84
const SCENE = 208

// Gentle scale "breathing" for the next lesson and an earned trophy; no
// opacity, so the path never shows through
const BREATHE = { duration: 2.4, repeat: Infinity, ease: "easeInOut" } as const

// Nodes sit on a sine wave: centre, right, centre, left...
const SWAY = [0, 1, 0, -1] as const
const sway = (i: number) => SWAY[i % SWAY.length]
const nodeX = (i: number) => WIDTH / 2 + sway(i) * SWING
const nodeY = (i: number) => TOP + i * GAP
const waveX = (y: number) =>
  WIDTH / 2 + SWING * Math.sin((((y - TOP) / GAP) * Math.PI) / 2)

/** The stretch of the wave between lesson i and the next, sampled every 4px */
const segment = (i: number) => {
  const points = Array.from({ length: GAP / 4 + 1 }, (_, n) => {
    const y = nodeY(i) + n * 4
    return `${waveX(y).toFixed(1)},${y}`
  })
  return `M${points.join(" L")}`
}

/**
 * Duolingo-style winding path. Lessons are never locked: "up next" suggests
 * an order without blocking anyone who wants to skip ahead.
 */
const LessonPath = ({
  courseId,
  theme,
  lessons,
  scenery,
  nextCourseId,
  examQuestions = 0,
  previewDone,
}: LessonPathProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { progress, isLessonComplete, isExamPassed } = useCourseProgress()
  const animate = !useReducedMotion()
  const percent = numberFormat(locale, { style: "percent" })

  const done = lessons.map((lesson, i) =>
    previewDone === undefined
      ? isLessonComplete(lesson.courseId ?? courseId, lesson.id)
      : i < previewDone
  )
  const nextIndex = done.findIndex((d) => !d)
  const allDone = nextIndex === -1
  const hasExam = examQuestions > 0
  // Without a check the trophy is earned by finishing the lessons
  const earned = hasExam
    ? previewDone === undefined
      ? isExamPassed(courseId)
      : false
    : allDone
  const examNext = hasExam && allDone && !earned
  const best = progress.exams?.[courseId]?.best
  const count = lessons.length
  const height = nodeY(count) + NODE

  // Scenery sits opposite every bend; the finish line counts as a bend
  const bends = Array.from({ length: count + 1 }, (_, i) => i).filter(
    (i) => sway(i) !== 0
  )

  return (
    <div className="relative mx-auto" style={{ width: WIDTH, height }}>
      <svg
        aria-hidden
        className="absolute inset-0 overflow-visible"
        width={WIDTH}
        height={height}
      >
        {Array.from({ length: count }, (_, i) => (
          <path
            key={i}
            d={segment(i)}
            fill="none"
            strokeWidth={20}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              done[i]
                ? "stroke-(--course-soft) dark:stroke-[color-mix(in_oklab,var(--course)_45%,var(--color-background))]"
                : "stroke-background-highlight"
            }
          />
        ))}
      </svg>

      {/* Physical left/right throughout: the path geometry isn't mirrored in RTL */}
      {scenery.length > 0 &&
        bends.map((i, n) => (
          <div
            key={`scene-${i}`}
            className="pointer-events-none absolute hidden lg:block"
            style={{
              width: SCENE,
              top: nodeY(i) - SCENE * 0.45,
              left: sway(i) > 0 ? -SCENE - 24 : WIDTH + 24,
            }}
          >
            <Scenery id={scenery[n % scenery.length]} />
          </div>
        ))}

      <ol className="m-0 list-none">
        {lessons.map(({ id, icon, steps, courseId: own }, i) => {
          const lessonCourse = own ?? courseId
          const Icon = LESSON_ICONS[icon]
          const isNext = i === nextIndex
          const labelOnLeft = sway(i) > 0
          const title = t(`${lessonCourse}-${id}-title`)
          return (
            <li
              key={`${lessonCourse}-${id}`}
              className="absolute m-0"
              style={{
                left: nodeX(i) - NODE / 2,
                top: nodeY(i) - NODE / 2,
                width: NODE,
                height: NODE,
              }}
            >
              {isNext && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0"
                  animate={animate ? { scale: [1, 1.08, 1] } : undefined}
                  transition={BREATHE}
                >
                  <NodeHalo />
                </motion.span>
              )}
              <PopoverPrimitive.Root>
                {isNext && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-11 left-1/2 z-10 -translate-x-1/2 motion-safe:animate-bounce"
                  >
                    <span className="relative block rounded-xl border-2 border-(--course-soft) bg-background px-3 py-1 text-sm font-bold tracking-wide whitespace-nowrap text-(--course-strong) uppercase dark:text-(--course-bright)">
                      {t("page-courses-path-start")}
                    </span>
                  </span>
                )}
                <PopoverPrimitive.Trigger asChild>
                  <Button
                    variant="ghost"
                    aria-label={`${t("page-courses-lesson-label", { number: i + 1 })}: ${title}`}
                    className={cn(
                      "group relative rounded-2xl border-0 bg-transparent p-0 hover:bg-transparent active:bg-transparent",
                      done[i] || isNext
                        ? "text-white active:text-white hover-link:!text-white"
                        : "text-body-medium active:text-body hover-link:!text-body"
                    )}
                    style={{ width: NODE, height: NODE }}
                  >
                    <NodeBody lit={done[i] || isNext} />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 group-active:translate-y-[calc(-50%+var(--press))]"
                      style={
                        {
                          top: `${NODE_FACE_CENTRE * 100}%`,
                          "--press": `${(NODE_PRESS * NODE) / 100}px`,
                        } as React.CSSProperties
                      }
                    >
                      <Icon aria-hidden className="size-8" />
                    </span>
                    {done[i] && (
                      <span className="absolute -end-1 -top-1 grid size-7 place-items-center rounded-full border-2 border-background bg-green-700 text-white">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                    )}
                  </Button>
                </PopoverPrimitive.Trigger>

                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1/2 w-36 -translate-y-1/2 text-sm leading-tight font-bold max-sm:hidden",
                    labelOnLeft
                      ? "right-full mr-5 text-end"
                      : "left-full ml-5 text-start"
                  )}
                >
                  {title}
                </span>

                <PathPopover theme={theme}>
                  <p className="m-0 text-sm font-bold tracking-wide uppercase">
                    {t("page-courses-lesson-label", { number: i + 1 })}
                  </p>
                  <p className="m-0 mt-1 text-lg leading-snug font-bold">
                    {title}
                  </p>
                  <p className="m-0 mt-2">
                    {t(`${lessonCourse}-${id}-summary`)}
                  </p>
                  <p className="m-0 mt-2 text-sm">
                    {t("page-courses-path-steps", { count: steps })}
                  </p>
                  <PopoverAction href={lessonHref(lessonCourse, id)}>
                    {done[i]
                      ? t("page-courses-path-review")
                      : t("page-courses-path-start")}
                  </PopoverAction>
                </PathPopover>
              </PopoverPrimitive.Root>
            </li>
          )
        })}
      </ol>

      {/* Finish line: the course check earns the trophy */}
      <div
        className="absolute flex flex-col items-center gap-2 text-center"
        style={{ left: nodeX(count) - 70, top: nodeY(count) - 48, width: 140 }}
      >
        {earned ? (
          <PopoverPrimitive.Root>
            <motion.div
              animate={animate ? { scale: [1, 1.05, 1] } : undefined}
              transition={BREATHE}
            >
              <PopoverPrimitive.Trigger asChild>
                <Button
                  variant="ghost"
                  className="size-24 rounded-3xl border-0 border-b-[6px] border-yellow-600 bg-yellow-400 p-0 text-yellow-900 transition-transform active:translate-y-1 active:border-b-2 hover-link:!text-yellow-900 [&>svg]:size-12"
                >
                  <Trophy aria-hidden />
                  <span className="sr-only">
                    {t("page-courses-path-finish")}
                  </span>
                </Button>
              </PopoverPrimitive.Trigger>
            </motion.div>
            <PathPopover theme={theme}>
              <p className="m-0 text-lg leading-snug font-bold">
                {t("page-courses-path-finish")}
              </p>
              <p className="m-0 mt-2">{t("page-courses-path-finish-line")}</p>
              {best !== undefined && (
                <p className="m-0 mt-2 text-sm">
                  {t("page-courses-path-exam-best", {
                    score: percent.format(best),
                  })}
                </p>
              )}
              {nextCourseId ? (
                <>
                  <p className="m-0 mt-4 text-sm font-bold tracking-wide uppercase">
                    {t("page-courses-path-finish-next")}
                  </p>
                  <p className="m-0 mt-1 text-lg leading-snug font-bold">
                    {t(`${nextCourseId}-title`)}
                  </p>
                  <PopoverAction href={courseHref(nextCourseId)}>
                    {t("page-courses-path-next-course")}
                  </PopoverAction>
                </>
              ) : (
                <PopoverAction href="/courses/">
                  {t("page-courses-path-all-courses")}
                </PopoverAction>
              )}
              {hasExam && (
                <PopoverAction href={examHref(courseId)} secondary>
                  {t("page-courses-path-exam-retake")}
                </PopoverAction>
              )}
            </PathPopover>
          </PopoverPrimitive.Root>
        ) : hasExam ? (
          <PopoverPrimitive.Root>
            {examNext && (
              <span
                aria-hidden
                className="pointer-events-none absolute -top-11 left-1/2 z-10 -translate-x-1/2 motion-safe:animate-bounce"
              >
                <span className="relative block rounded-xl border-2 border-(--course-soft) bg-background px-3 py-1 text-sm font-bold tracking-wide whitespace-nowrap text-(--course-strong) uppercase dark:text-(--course-bright)">
                  {t("page-courses-path-start")}
                </span>
              </span>
            )}
            <motion.div
              animate={
                animate && examNext ? { scale: [1, 1.05, 1] } : undefined
              }
              transition={BREATHE}
            >
              <PopoverPrimitive.Trigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "size-24 rounded-3xl border-2 border-dashed bg-background p-0 hover:bg-background-highlight [&>svg]:size-12",
                    examNext
                      ? "border-(--course) text-(--course-strong) dark:text-(--course-bright) hover-link:!text-(--course-strong) dark:hover-link:!text-(--course-bright)"
                      : "border-border text-disabled hover-link:!text-body-medium"
                  )}
                >
                  <Trophy aria-hidden />
                  <span className="sr-only">{t("page-courses-path-exam")}</span>
                </Button>
              </PopoverPrimitive.Trigger>
            </motion.div>
            <PathPopover theme={theme}>
              <p className="m-0 text-lg leading-snug font-bold">
                {t("page-courses-path-exam")}
              </p>
              <p className="m-0 mt-2">
                {t("page-courses-path-exam-line", {
                  count: examQuestions,
                  mark: percent.format(EXAM_PASS_MARK),
                })}
              </p>
              {!allDone && (
                <p className="m-0 mt-2 text-sm">
                  {t("page-courses-path-exam-early")}
                </p>
              )}
              {best !== undefined && (
                <p className="m-0 mt-2 text-sm">
                  {t("page-courses-path-exam-best", {
                    score: percent.format(best),
                  })}
                </p>
              )}
              <PopoverAction href={examHref(courseId)}>
                {t("page-courses-path-start")}
              </PopoverAction>
            </PathPopover>
          </PopoverPrimitive.Root>
        ) : (
          <div className="grid size-24 place-items-center rounded-3xl border-2 border-dashed border-border bg-background text-disabled [&>svg]:size-12">
            <Trophy aria-hidden />
          </div>
        )}
        <p className="m-0 text-sm font-bold">
          {earned
            ? t("page-courses-path-finish")
            : hasExam
              ? t("page-courses-path-exam")
              : t("page-courses-path-finish-locked")}
        </p>
      </div>
    </div>
  )
}

const PathPopover = ({
  theme,
  children,
}: {
  theme: CourseTheme
  children: React.ReactNode
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      side="bottom"
      sideOffset={12}
      collisionPadding={16}
      style={courseThemeStyle(theme)}
      className="z-popover w-72 rounded-2xl border-2 border-b-6 border-(--course-strong) bg-(--course) p-5 text-white shadow-xl outline-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
    >
      {children}
      <PopoverPrimitive.Arrow className="fill-(--course-strong)" />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
)

const PopoverAction = ({
  href,
  secondary,
  children,
}: {
  href: string
  /** Outline on the course colour, for a lesser second action */
  secondary?: boolean
  children: React.ReactNode
}) => (
  <ButtonLink
    href={href}
    variant="ghost"
    hideArrow
    className={cn(
      "min-h-12 w-full rounded-2xl font-bold tracking-wide uppercase active:translate-y-0.5",
      secondary
        ? "mt-2 border-2 border-white/50 bg-transparent text-white hover-link:bg-white/10 hover-link:!text-white"
        : "mt-4 border-0 border-b-4 border-black/20 bg-white text-(--course-strong) active:border-b-2 hover-link:!text-(--course-strong)"
    )}
  >
    {children}
  </ButtonLink>
)

export default LessonPath
