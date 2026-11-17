"use client"

import { type ReactNode, useEffect, useState } from "react"
import {
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Crosshair,
  Flame,
  ListChecks,
  type LucideIcon,
  Medal,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import MainArticle from "@/components/MainArticle"
import { ArrowNext } from "@/components/ui/arrow"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardParagraph } from "@/components/ui/card"
import Eyebrow from "@/components/ui/eyebrow"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { Section } from "@/components/ui/section"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"
import { formatDateTime } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import {
  type Course,
  courseHref,
  COURSES,
  COURSES_HUB,
  EXAM_ID,
  examHref,
  getCourse,
  lessonHref,
  lessonProgressKey,
  NO_PROFILE_PARAM,
  stepKey,
  TRACKS,
} from "@/data/courses"

import { useAccount } from "../Account/use-account"

import CourseArt from "./art/course-art"
import { syncProgress } from "./account-sync"
import CourseProgress from "./course-progress"
import { useLevelName } from "./level-up"
import { levelFor, levelProgress } from "./levels"
import {
  ProfileAccountLine,
  ProfileAccountSections,
  ProfileAvatar,
} from "./profile-account"
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

const REVIEW_LIMIT = 5

// Server HTML: skeletons only where the courses layout's pre-paint flag says
// there's a profile to load. Literal for Tailwind's scanner; must match
// HAS_PROGRESS_ATTR
const whileLoading = "hidden [[data-has-course-progress]_&]:flex"

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

/**
 * The hub's course card, shrunk for the profile: art beside the title, track
 * and progress
 */
const CompactCourseCard = ({
  course,
  trackTitle,
  isMastered,
  bestScore,
  formatPercent,
}: {
  course: Course
  trackTitle: string
  isMastered: boolean
  bestScore?: number
  formatPercent: (value: number) => string
}) => {
  const t = useTranslations("page-courses")
  return (
    <Card
      href={courseHref(course.id)}
      variant="nested"
      size="md"
      border
      className="h-full flex-row overflow-hidden"
      style={courseThemeStyle(course.theme)}
    >
      <div className="grid w-24 shrink-0 place-items-center bg-(--course-soft) p-3 sm:w-28">
        <CourseArt
          id={course.art}
          className="w-full transition-transform duration-300 motion-safe:group-hover/link:scale-105"
        />
      </div>
      <CardContent className="flex min-w-0 flex-col gap-3 space-y-0">
        <div className="flex flex-col">
          <span className="font-bold text-body">{t(`${course.id}-title`)}</span>
          <span className="text-sm text-body-medium">{trackTitle}</span>
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <CourseProgress
            courseId={course.id}
            lessonIds={course.lessons.map(({ id }) => id)}
            hasExam={course.exam.length > 0}
            hideLabel={isMastered}
          />
          {bestScore !== undefined && (
            <span className="text-sm text-body-medium">
              {t("page-courses-profile-best-check", {
                score: formatPercent(bestScore),
              })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const StatTile = ({
  icon: Icon,
  iconClassName,
  label,
  value,
}: {
  icon: LucideIcon
  iconClassName: string
  label: string
  value: string
}) => (
  <li className="m-0 flex items-center gap-3 rounded-2xl border bg-background p-4">
    <Icon aria-hidden className={cn("size-8 shrink-0", iconClassName)} />
    <div className="flex min-w-0 flex-col">
      <span className="text-sm text-body-medium">{label}</span>
      <span className="text-2xl font-black text-body tabular-nums">
        {value}
      </span>
    </div>
  </li>
)

interface DetailRow {
  icon: LucideIcon
  iconClassName: string
  label: string
  value: string
}

/** The secondary numbers, in the level card's popover */
const DetailRows = ({ rows }: { rows: DetailRow[] }) => (
  <ul className="m-0 flex list-none flex-col gap-3">
    {rows.map(({ icon: Icon, iconClassName, label, value }) => (
      <li key={label} className="m-0 flex items-center gap-3">
        <Icon aria-hidden className={cn("size-5 shrink-0", iconClassName)} />
        <span className="flex-1 text-sm text-body-medium">{label}</span>
        <span className="font-bold text-body tabular-nums">{value}</span>
      </li>
    ))}
  </ul>
)

/**
 * A shelf for each track the learner has started, every course in it as a
 * trophy, mastered ones in colour. Untouched and coming-soon tracks stay off
 */
const TrophyShelf = ({
  mastered,
  started,
}: {
  mastered: Set<string>
  started: Set<string>
}) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const count = numberFormat(locale).format
  const active = TRACKS.filter(({ courses }) =>
    courses.some(({ id }) => started.has(id))
  )

  return (
    <div className="mt-10 flex flex-col gap-6">
      <h2 className="text-xl">{t("page-courses-profile-shelf-title")}</h2>
      {active.length ? (
        <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
          {active.map(({ id, courses }) => {
            const won = courses.filter((c) => mastered.has(c.id)).length
            return (
              // Sized by its trophies; the heading row adds no width of its own
              <div key={id} className="flex w-fit max-w-full flex-col gap-2">
                <div className="flex w-0 min-w-full items-baseline justify-between gap-2">
                  <span className="font-bold">
                    {t(`page-courses-track-${id}-title`)}
                  </span>
                  <span className="text-sm text-body-medium tabular-nums">
                    {count(won)}/{count(courses.length)}
                  </span>
                </div>
                <ul className="m-0 flex list-none flex-wrap items-end gap-1.5 border-b-4 border-border pb-1">
                  {courses.map((course) => {
                    const isMastered = mastered.has(course.id)
                    return (
                      <li
                        key={course.id}
                        title={t(`${course.id}-title`)}
                        className={cn(
                          "m-0 size-12",
                          !isMastered && "opacity-40"
                        )}
                        style={courseThemeStyle(
                          isMastered ? course.theme : "muted"
                        )}
                      >
                        <CourseArt id={course.art} className="size-full" />
                        <span className="sr-only">
                          {t(`${course.id}-title`)}:{" "}
                          {t(
                            isMastered
                              ? "page-courses-profile-mastered-title"
                              : "page-courses-profile-shelf-not-mastered"
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="m-0 text-body-medium">
          {t("page-courses-profile-shelf-empty")}
        </p>
      )}
    </div>
  )
}

/** The hero's stats and shelf, laid out like them while progress loads */
const HeroSkeleton = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("mt-8 flex-col gap-10", className)}>
    <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
      <Skeleton className="h-24 rounded-2xl sm:col-span-3 xl:col-span-2" />
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-24 rounded-2xl" />
      ))}
    </div>
    <div className="flex flex-col gap-6">
      <Skeleton className="h-6 w-40" />
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 2 }, (_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
)

/** The courses section's shape while progress loads */
const BodySkeleton = ({ className }: { className?: string }) => {
  const t = useTranslations("page-courses")
  return (
    <div role="status" className={cn("flex-col gap-3", className)}>
      <span className="sr-only">{t("page-courses-profile-loading")}</span>
      <Skeleton aria-hidden className="mb-3 h-10 w-1/4" />
      <div aria-hidden className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

/**
 * The learner's profile: who they are, their level and headline numbers
 * (the rest in the level card's popover) and a trophy shelf, then their
 * courses, the questions worth another look and, once signed in, account
 * details.
 */
const ProfileView = ({
  breadcrumbs,
  notice,
}: {
  breadcrumbs: ReactNode
  notice: ReactNode
}) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { progress, isLessonComplete, isExamPassed } = useCourseProgress()
  const router = useRouter()
  // Progress loads from localStorage after mount; hide the initial zeros
  const [ready, setReady] = useState(false)
  const backHref = `${COURSES_HUB}?${NO_PROFILE_PARAM}`
  const { status: accountStatus } = useAccount()
  const signedIn = accountStatus === "signed-in"
  useEffect(() => {
    if (accountStatus === "loading") return
    // An account always has a profile, once its progress (from other
    // devices) is in. Otherwise, with nothing saved there's no profile yet:
    // back to the hub, which says why
    if (accountStatus === "signed-in") {
      void syncProgress().finally(() => {
        flagProgress(true)
        setReady(true)
      })
      return
    }
    const stored = readStoredProgress()
    if (stored && hasAnyProgress(stored)) {
      flagProgress(true)
      setReady(true)
    } else router.replace(backHref)
  }, [accountStatus, router, backHref])

  // Signed out or progress reset from this page: nothing left to show
  useEffect(() => {
    if (!ready || signedIn || hasAnyProgress(progress)) return
    router.replace(COURSES_HUB)
  }, [ready, signedIn, progress, router])

  const levelName = useLevelName()
  const count = numberFormat(locale).format
  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format
  const days = (n: number) => t("page-courses-profile-days", { count: n })

  // Catalog lessons only: records outlive renamed or removed lessons
  const lessonRecords = COURSES.flatMap((c) =>
    c.lessons.flatMap(
      ({ id }) => progress.lessons[lessonProgressKey(c.id, id)] ?? []
    )
  )
  const perfect = lessonRecords.filter(({ accuracy }) => accuracy === 1).length
  const firstDone = lessonRecords
    .map(({ completedAt }) => completedAt)
    .sort()[0]
  const history = Object.values(progress.steps ?? {})
  const seen = history.reduce((n, { seen }) => n + seen, 0)
  const missed = history.reduce((n, { missed }) => n + missed, 0)

  const streak = getActiveStreak(progress.streak)
  const best = Math.max(progress.bestStreak ?? 0, progress.streak.count)

  const courseRows = TRACKS.flatMap(({ id: trackId, courses }) =>
    courses.map((course) => {
      const isMastered = course.exam.length
        ? isExamPassed(course.id)
        : course.lessons.every(({ id }) => isLessonComplete(course.id, id))
      const isStarted =
        isMastered ||
        course.lessons.some(({ id }) => isLessonComplete(course.id, id)) ||
        !!progress.exams?.[course.id]
      return { course, trackId, isMastered, isStarted }
    })
  )
  const mastered = courseRows.filter(({ isMastered }) => isMastered)
  const inProgress = courseRows.filter(
    ({ isMastered, isStarted }) => isStarted && !isMastered
  )
  const masteredIds = new Set(mastered.map(({ course }) => course.id))
  const startedIds = new Set(
    courseRows.filter((row) => row.isStarted).map(({ course }) => course.id)
  )

  const level = levelFor(progress.xp)
  const nextLevel = level.next === null ? null : levelFor(level.next)

  const review = stepsToReview(progress)
  const started = hasAnyProgress(progress)
  const show = ready && (started || signedIn)

  const details: DetailRow[] = [
    {
      icon: Medal,
      iconClassName: "text-pink-700 dark:text-pink-400",
      label: t("page-courses-profile-best-streak"),
      value: days(best),
    },
    {
      icon: CircleCheck,
      iconClassName: "text-green-700 dark:text-green-400",
      label: t("page-courses-profile-lessons"),
      value: count(lessonRecords.length),
    },
    {
      icon: Sparkles,
      iconClassName: "text-yellow-700 dark:text-yellow-400",
      label: t("page-courses-profile-perfect"),
      value: count(perfect),
    },
    {
      icon: Crosshair,
      iconClassName: "text-primary",
      label: t("page-courses-profile-accuracy"),
      value: percent(seen ? (seen - missed) / seen : 0),
    },
    {
      icon: ListChecks,
      iconClassName: "text-teal-700 dark:text-teal-400",
      label: t("page-courses-profile-questions"),
      value: count(seen),
    },
    {
      icon: CalendarDays,
      iconClassName: "text-blue-600 dark:text-blue-400",
      label: t("page-courses-profile-since"),
      value: firstDone
        ? formatDateTime(locale, new Date(firstDone), { dateStyle: "medium" })
        : count(0),
    },
  ]

  return (
    <>
      <div
        className="border-b bg-(--course-softer) px-page py-hero lg:py-hero-2x"
        style={courseThemeStyle("purple")}
      >
        <div className="mb-space-2x">{breadcrumbs}</div>
        <div className="flex items-center gap-5 lg:gap-6">
          <span className="relative size-20 shrink-0 rounded-full bg-(--course) lg:size-28">
            <ProfileAvatar />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-4xl font-black lg:text-5xl">
              {t("page-courses-profile-title")}
            </h1>
            <ProfileAccountLine />
          </div>
        </div>

        {show ? (
          <>
            <ul className="m-0 mt-8 grid list-none gap-4 sm:grid-cols-3 xl:grid-cols-5">
              <li className="m-0 sm:col-span-3 xl:col-span-2">
                <Popover>
                  <PopoverTrigger className="group flex size-full flex-col justify-center gap-1.5 rounded-2xl bg-(--course) p-4 text-start text-white transition-colors hover:bg-(--course-strong) focus-visible:outline-(--course-strong)">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-xl font-black">
                        {levelName(level)}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-white/85">
                        {t("page-courses-profile-more-stats")}
                        <ChevronDown
                          aria-hidden
                          className="size-4 transition-transform group-data-[state=open]:rotate-180"
                        />
                      </span>
                    </span>
                    <ProgressBar
                      aria-hidden
                      value={levelProgress(progress.xp, level) * 100}
                      className="h-2 bg-white/25 *:data-[slot=progress-indicator]:bg-white"
                    />
                    <span className="text-sm text-white/85">
                      {nextLevel
                        ? t("page-courses-xp-level-to-next", {
                            xp: count(level.next! - progress.xp),
                            name: levelName(nextLevel),
                          })
                        : t("page-courses-xp-level-top")}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-80">
                    <DetailRows rows={details} />
                  </PopoverContent>
                </Popover>
              </li>
              <StatTile
                icon={Zap}
                iconClassName="fill-yellow-400 text-yellow-700 dark:text-yellow-400"
                label={t("page-courses-profile-xp")}
                value={count(progress.xp)}
              />
              <StatTile
                icon={Flame}
                iconClassName="fill-orange-500 text-orange-700 dark:text-orange-400"
                label={t("page-courses-profile-streak")}
                value={days(streak)}
              />
              <StatTile
                icon={Trophy}
                iconClassName="text-teal-700 dark:text-teal-400"
                label={t("page-courses-profile-trophies")}
                value={count(mastered.length)}
              />
            </ul>
            <TrophyShelf mastered={masteredIds} started={startedIds} />
          </>
        ) : (
          <HeroSkeleton className={ready ? "flex" : whileLoading} />
        )}
      </div>

      <main className="px-page pt-space-3x pb-page">
        <MainArticle>
          {notice}
          {show ? (
            <div className="flow">
              <Section id="courses">
                <h2>{t("page-courses-profile-courses-title")}</h2>
                {!started && <p>{t("page-courses-profile-courses-none")}</p>}
                {[
                  { id: "in-progress", rows: inProgress },
                  { id: "mastered", rows: mastered },
                ]
                  .filter(({ rows }) => rows.length)
                  .map(({ id, rows }) => (
                    <div key={id} className="flow">
                      <h3>{t(`page-courses-profile-${id}-title`)}</h3>
                      <ul className="ms-0 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {rows.map(({ course, trackId, isMastered }) => (
                          <li key={course.id} className="m-0">
                            <CompactCourseCard
                              course={course}
                              trackTitle={t(
                                `page-courses-track-${trackId}-title`
                              )}
                              isMastered={isMastered}
                              bestScore={progress.exams?.[course.id]?.best}
                              formatPercent={percent}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                <div data-flow="cta">
                  <ButtonLink href={COURSES_HUB} size="lg">
                    {started
                      ? t("page-courses-profile-keep-learning")
                      : t("page-courses-profile-start-learning")}
                    <ArrowNext aria-hidden />
                  </ButtonLink>
                </div>
              </Section>

              {review.length > 0 && (
                <Section id="review">
                  <h2>{t("page-courses-profile-review-title")}</h2>
                  <p className="max-w-3xl">
                    {t("page-courses-profile-review-description")}
                  </p>
                  <div className="flex max-w-3xl flex-col gap-3">
                    {review.map(
                      ({ courseId, lessonId, stepId, seen, missed }) => {
                        const exam = lessonId === EXAM_ID
                        return (
                          <Card
                            key={`${courseId}/${lessonId}/${stepId}`}
                            href={
                              exam
                                ? examHref(courseId)
                                : lessonHref(courseId, lessonId)
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
                                {t(
                                  stepKey(courseId, lessonId, stepId, "prompt")
                                )}
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
                      }
                    )}
                  </div>
                </Section>
              )}

              <ProfileAccountSections />

              <ProgressNote privacy={false} />
            </div>
          ) : (
            <BodySkeleton className={ready ? "flex" : whileLoading} />
          )}
        </MainArticle>
      </main>
    </>
  )
}

export default ProfileView
