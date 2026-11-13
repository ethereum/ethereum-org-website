"use client"

import { useEffect, useState } from "react"
import {
  CalendarDays,
  CircleCheck,
  Crosshair,
  Flame,
  type LucideIcon,
  Medal,
  Sparkles,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Card, CardContent, CardParagraph } from "@/components/ui/card"
import Eyebrow from "@/components/ui/eyebrow"
import InlineLink from "@/components/ui/Link"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { Section } from "@/components/ui/section"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"
import { formatDateTime } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import {
  courseHref,
  COURSES,
  COURSES_HUB,
  type CourseTheme,
  EXAM_ID,
  examHref,
  getCourse,
  lessonHref,
  NO_PROFILE_PARAM,
  stepKey,
  TRACKS,
} from "@/data/courses"

import CourseProgress from "./course-progress"
import { useLevelName } from "./level-up"
import { levelFor, levelProgress } from "./levels"
import { ProgressNote } from "./progress-stats"
import { flagProgress } from "./progress-storage"
import { getActiveStreak } from "./streak"
import { courseThemeStyle } from "./theme"
import {
  type CourseProgress as Progress,
  hasAnyProgress,
  readStoredProgress,
  useCourseProgress,
} from "./useCourseProgress"

import { useRouter } from "@/i18n/navigation"

// Course fills carry white text at 4.5:1 or better in both colour modes
const solidCard = "bg-(--course) text-white"
const solidMuted = "text-white/85"
const solidIcon = "fill-white/25 text-white"

const REVIEW_LIMIT = 5
const RECENT_LIMIT = 5

interface StatProps {
  icon: LucideIcon
  iconClassName: string
  label: string
  value: string
  detail?: string
  /** Solid course-colour fill with white text, for the headline stats */
  theme?: CourseTheme
}

const Stat = ({
  icon: Icon,
  iconClassName,
  label,
  value,
  detail,
  theme,
}: StatProps) => (
  <Card
    variant="nested"
    size="md"
    border={!theme}
    className={cn(theme && solidCard)}
    style={theme && courseThemeStyle(theme)}
  >
    <CardContent className="flex-row items-center gap-3">
      <Icon aria-hidden className={cn("size-8 shrink-0", iconClassName)} />
      <div className="flex flex-col">
        <span
          className={cn("text-sm", theme ? solidMuted : "text-body-medium")}
        >
          {label}
        </span>
        <span
          className={cn(
            "text-2xl font-black tabular-nums",
            theme ? "text-white" : "text-body"
          )}
        >
          {value}
        </span>
        {detail && (
          <span
            className={cn("text-sm", theme ? solidMuted : "text-body-medium")}
          >
            {detail}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
)

/** A stat card's shape, so the grid holds its height while progress loads */
const StatSkeleton = () => (
  <Card variant="nested" size="md" border>
    <CardContent className="flex-row items-center gap-3">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-1.5 py-0.5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-7 w-1/2" />
      </div>
    </CardContent>
  </Card>
)

/**
 * Stands in for the profile until saved progress loads after mount, laid out
 * like it so nothing jumps. Server HTML: hidden by the courses layout's
 * pre-paint flag when nothing is saved, as the empty notice shows instead.
 */
const ProfileSkeleton = () => {
  const t = useTranslations("page-courses")
  return (
    <div
      role="status"
      // Literal for Tailwind's scanner; must match HAS_PROGRESS_ATTR
      className="flow hidden [[data-has-course-progress]_&]:block"
    >
      <span className="sr-only">{t("page-courses-profile-loading")}</span>
      <div
        aria-hidden
        className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5"
      >
        <Skeleton className="col-span-2 h-44 rounded-2xl md:col-span-4 xl:col-span-1 xl:row-span-2 xl:h-auto" />
        {Array.from({ length: 8 }, (_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
      <div
        aria-hidden
        className="mt-space-3x grid items-start gap-x-12 gap-y-space-3x lg:grid-cols-[2fr_1fr]"
      >
        <div className="flex flex-col gap-3">
          <Skeleton className="mb-3 h-8 w-1/3" />
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="mb-3 h-8 w-1/2" />
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Steps missed most often, worst first; only ones still in the catalog */
const stepsToReview = (progress: Progress) =>
  Object.entries(progress.steps ?? {})
    .filter(([, record]) => record.missed > 0)
    .map(([key, record]) => {
      const [courseId, lessonId, stepId] = key.split("/")
      return { courseId, lessonId, stepId, ...record }
    })
    .filter(({ courseId, lessonId, stepId }) => {
      const course = getCourse(courseId)
      if (!course) return false
      const steps =
        lessonId === EXAM_ID
          ? course.exam
          : course.lessons.find(({ id }) => id === lessonId)?.steps
      return !!steps?.some(({ id }) => id === stepId)
    })
    .sort(
      (a, b) =>
        b.missed / b.seen - a.missed / a.seen ||
        b.missed - a.missed ||
        a.lastAt.localeCompare(b.lastAt)
    )
    .slice(0, REVIEW_LIMIT)

const recentLessons = (progress: Progress) =>
  Object.entries(progress.lessons)
    .map(([key, record]) => {
      const [courseId, lessonId] = key.split("/")
      return { courseId, lessonId, ...record }
    })
    .filter(({ courseId, lessonId }) =>
      getCourse(courseId)?.lessons.some(({ id }) => id === lessonId)
    )
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, RECENT_LIMIT)

/**
 * Everything stored about the learner, from this browser only. Account
 * details join once sign-in exists.
 */
const ProfileView = () => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { progress, isLessonComplete, isExamPassed } = useCourseProgress()
  const router = useRouter()
  // Progress loads from localStorage after mount; hide the initial zeros
  const [ready, setReady] = useState(false)
  const backHref = `${COURSES_HUB}?${NO_PROFILE_PARAM}`
  useEffect(() => {
    // With nothing saved there's no profile yet: back to the hub, which says why
    const stored = readStoredProgress()
    if (stored && hasAnyProgress(stored)) {
      flagProgress(true)
      setReady(true)
    } else router.replace(backHref)
  }, [router, backHref])

  // Progress reset from this page: nothing left to show, so leave too
  useEffect(() => {
    if (!ready || hasAnyProgress(progress)) return
    router.replace(backHref)
  }, [ready, progress, router, backHref])

  const count = numberFormat(locale).format
  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format
  const date = (iso: string) =>
    formatDateTime(locale, new Date(iso), { dateStyle: "medium" })

  const lessonsDone = COURSES.reduce(
    (n, c) =>
      n + c.lessons.filter(({ id }) => isLessonComplete(c.id, id)).length,
    0
  )
  const trophies = COURSES.filter(({ id }) => isExamPassed(id)).length

  const lessonRecords = Object.values(progress.lessons)
  const perfect = lessonRecords.filter(({ accuracy }) => accuracy === 1).length
  const firstDone = lessonRecords
    .map(({ completedAt }) => completedAt)
    .sort()[0]

  const history = Object.values(progress.steps ?? {})
  const seen = history.reduce((n, { seen }) => n + seen, 0)
  const missed = history.reduce((n, { missed }) => n + missed, 0)

  const streak = getActiveStreak(progress.streak)
  const best = Math.max(progress.bestStreak ?? 0, progress.streak.count)
  const days = (n: number) => t("page-courses-profile-days", { count: n })

  const courseRows = TRACKS.flatMap(({ id: trackId, courses }) =>
    courses.map((course) => {
      const lessonsLeft = course.lessons.some(
        ({ id }) => !isLessonComplete(course.id, id)
      )
      const isMastered = course.exam.length
        ? isExamPassed(course.id)
        : !lessonsLeft
      const isStarted =
        course.lessons.some(({ id }) => isLessonComplete(course.id, id)) ||
        !!progress.exams?.[course.id]
      return { course, trackId, isMastered, isStarted }
    })
  )
  const mastered = courseRows.filter(({ isMastered }) => isMastered)
  const inProgress = courseRows.filter(
    ({ isMastered, isStarted }) => isStarted && !isMastered
  )

  const levelName = useLevelName()
  const level = levelFor(progress.xp)
  const nextLevel = level.next === null ? null : levelFor(level.next)

  const review = stepsToReview(progress)
  const recent = recentLessons(progress)
  const started = hasAnyProgress(progress)

  if (!started || !ready) return <ProfileSkeleton />

  return (
    <div className="flow">
      <Section id="stats" aria-labelledby="profile-stats-heading">
        <h2 id="profile-stats-heading" className="sr-only">
          {t("page-courses-profile-stats-title")}
        </h2>
        {/* The account card stands two stats tall beside the grid on wide screens */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
          <Card
            variant="nested"
            size="md"
            className={cn(
              solidCard,
              "col-span-2 md:col-span-4 xl:col-span-1 xl:row-span-2"
            )}
            style={courseThemeStyle("purple")}
          >
            <CardContent className="h-full gap-4 text-white max-xl:flex-row max-xl:items-center xl:justify-between">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white/15">
                <UserRound aria-hidden className="size-8 text-white" />
              </span>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="m-0 text-2xl font-bold text-white">
                    {t("page-courses-profile-account-local")}
                  </p>
                  <CardParagraph className={cn("m-0", solidMuted)} size="sm">
                    {t("page-courses-profile-account-soon")}
                  </CardParagraph>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-black text-white">
                    {levelName(level)}
                  </span>
                  <ProgressBar
                    aria-hidden
                    value={levelProgress(progress.xp, level) * 100}
                    className="h-2 bg-white/25 *:data-[slot=progress-indicator]:bg-white"
                  />
                  <span className={cn("text-sm", solidMuted)}>
                    {nextLevel
                      ? t("page-courses-xp-level-to-next", {
                          xp: count(level.next! - progress.xp),
                          name: levelName(nextLevel),
                        })
                      : t("page-courses-xp-level-top")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Stat
            icon={Zap}
            iconClassName={solidIcon}
            theme="blue"
            label={t("page-courses-profile-xp")}
            value={count(progress.xp)}
          />
          <Stat
            icon={Flame}
            iconClassName={solidIcon}
            theme="orange"
            label={t("page-courses-profile-streak")}
            value={days(streak)}
          />
          <Stat
            icon={Medal}
            iconClassName={solidIcon}
            theme="pink"
            label={t("page-courses-profile-best-streak")}
            value={days(best)}
          />
          <Stat
            icon={Trophy}
            iconClassName={solidIcon}
            theme="teal"
            label={t("page-courses-profile-trophies")}
            value={count(trophies)}
          />
          <Stat
            icon={CircleCheck}
            iconClassName="text-green-700 dark:text-green-400"
            label={t("page-courses-profile-lessons")}
            value={count(lessonsDone)}
          />
          <Stat
            icon={Crosshair}
            iconClassName="text-primary"
            label={t("page-courses-profile-accuracy")}
            value={percent(seen ? (seen - missed) / seen : 0)}
            detail={
              seen
                ? t("page-courses-profile-answers", { count: seen })
                : undefined
            }
          />
          <Stat
            icon={Sparkles}
            iconClassName="text-primary"
            label={t("page-courses-profile-perfect")}
            value={count(perfect)}
          />
          <Stat
            icon={CalendarDays}
            iconClassName="text-body-medium"
            label={t("page-courses-profile-since")}
            value={firstDone ? date(firstDone) : count(0)}
          />
        </div>
      </Section>

      {/* Side by side on wide screens; neither needs the full width */}
      <div className="mt-space-3x grid items-start gap-x-12 gap-y-space-3x lg:grid-cols-[2fr_1fr]">
        {(mastered.length > 0 || inProgress.length > 0) && (
          <Section id="courses">
            <h2>{t("page-courses-profile-courses-title")}</h2>
            {[
              { id: "mastered", rows: mastered },
              { id: "in-progress", rows: inProgress },
            ]
              .filter(({ rows }) => rows.length)
              .map(({ id, rows }) => (
                <div key={id} className="flow">
                  <h3>{t(`page-courses-profile-${id}-title`)}</h3>
                  <ul className="ms-0 flex list-none flex-col gap-3">
                    {rows.map(({ course, trackId, isMastered }) => {
                      const bestScore = progress.exams?.[course.id]?.best
                      return (
                        <li key={course.id} className="m-0">
                          <Card
                            href={courseHref(course.id)}
                            variant="nested"
                            size="md"
                            border
                            style={courseThemeStyle(course.theme)}
                          >
                            <CardContent className="gap-3">
                              <div className="flex flex-col">
                                <span className="text-lg font-bold text-body">
                                  {t(`${course.id}-title`)}
                                </span>
                                <span className="text-sm text-body-medium">
                                  {t(`page-courses-track-${trackId}-title`)}
                                </span>
                              </div>
                              <div className="flex flex-1 flex-col gap-1">
                                <CourseProgress
                                  courseId={course.id}
                                  lessonIds={course.lessons.map(({ id }) => id)}
                                  hasExam={course.exam.length > 0}
                                  hideLabel={isMastered}
                                />
                                {bestScore !== undefined && (
                                  <span className="text-sm text-body-medium">
                                    {t("page-courses-profile-best-check", {
                                      score: percent(bestScore),
                                    })}
                                  </span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
          </Section>
        )}
        {recent.length > 0 && (
          <Section id="recent">
            <h2>{t("page-courses-profile-recent-title")}</h2>
            <ul className="ms-0 flex list-none flex-col gap-2">
              {recent.map(({ courseId, lessonId, completedAt, accuracy }) => (
                <li
                  key={`${courseId}/${lessonId}`}
                  className="m-0 flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border pb-2"
                >
                  <span>
                    <InlineLink href={lessonHref(courseId, lessonId)}>
                      {t(`${courseId}-${lessonId}-title`)}
                    </InlineLink>
                    <span className="text-body-medium">
                      {" "}
                      · {t(`${courseId}-title`)}
                    </span>
                  </span>
                  <span className="text-sm text-body-medium tabular-nums">
                    {t("page-courses-profile-recent-detail", {
                      date: date(completedAt),
                      accuracy: percent(accuracy),
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {review.length > 0 && (
        <Section id="review">
          <h2>{t("page-courses-profile-review-title")}</h2>
          <p>{t("page-courses-profile-review-description")}</p>
          <div className="flex flex-col gap-3">
            {review.map(({ courseId, lessonId, stepId, seen, missed }) => {
              const exam = lessonId === EXAM_ID
              return (
                <Card
                  key={`${courseId}/${lessonId}/${stepId}`}
                  href={
                    exam ? examHref(courseId) : lessonHref(courseId, lessonId)
                  }
                  variant="nested"
                  size="md"
                  border
                >
                  <CardContent>
                    <Eyebrow className="m-0">
                      {t(`${courseId}-title`)} ·{" "}
                      {exam
                        ? t("page-courses-exam-title")
                        : t(`${courseId}-${lessonId}-title`)}
                    </Eyebrow>
                    <CardParagraph className="m-0">
                      {t(stepKey(courseId, lessonId, stepId, "prompt"))}
                    </CardParagraph>
                    <CardParagraph className="m-0" size="sm">
                      {t("page-courses-profile-review-missed", {
                        missed: count(missed),
                        seen: count(seen),
                      })}
                    </CardParagraph>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Section>
      )}

      <ProgressNote privacy={false} />
    </div>
  )
}

export default ProfileView
