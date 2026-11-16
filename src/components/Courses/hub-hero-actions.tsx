"use client"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"

import { courseHref, TRACKS } from "@/data/courses"

import CourseArt from "./art/course-art"
import { CourseCardAction } from "./course-card-status"
import CourseProgress from "./course-progress"
import { chunkyButton, courseThemeStyle } from "./theme"
import { useResumeCourse } from "./track-status"

import { useIsClient } from "@/hooks/useIsClient"

// Matches the hero's own call-to-action sizing
const heroButton = "w-full md:w-auto"

// Until saved progress loads, when there is some, a skeleton stands in so
// labels don't swap. Literals for Tailwind's scanner; must match
// HAS_PROGRESS_ATTR
const whilePending = "hidden [[data-has-course-progress]_&]:flex"
const oncePending = "[[data-has-course-progress]_&]:hidden"

/** Brings a hub card into view and pulses its outline once it's there */
const revealCard = (id: string) => {
  const item = document.getElementById(id)
  const card = item?.firstElementChild
  if (!(card instanceof HTMLElement)) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  item!.scrollIntoView({
    block: "center",
    behavior: reduce ? "auto" : "smooth",
  })
  card.focus({ preventScroll: true })

  let done = false
  const pulse = () => {
    if (done) return
    done = true
    const ring = "0 0 0 6px var(--course)"
    const none = "0 0 0 0 transparent"
    card.animate({ boxShadow: [none, ring, none, ring, none] }, 1600)
  }
  // Already in view means no scroll, so no scrollend
  window.addEventListener("scrollend", pulse, { once: true })
  setTimeout(pulse, 900)
}

/** Primary hero action: scroll to the learner's course on this page */
export const HubHeroScroll = () => {
  const t = useTranslations("page-courses")
  const { course, returning } = useResumeCourse()
  const pending = !useIsClient()
  return (
    <>
      {pending && (
        <Skeleton
          className={cn("h-10.5 w-full rounded md:w-56", whilePending)}
        />
      )}
      <Button
        className={cn(heroButton, pending && oncePending)}
        onClick={() => revealCard(course.id)}
      >
        {t(
          returning
            ? "page-courses-hub-hero-next"
            : "page-courses-hub-hero-start"
        )}
      </Button>
    </>
  )
}

const nextUpCard = "w-full max-w-xl flex-row overflow-hidden bg-background"

/** The next-up card's shape, held while saved progress loads */
const NextUpSkeleton = () => (
  <Card
    aria-hidden
    variant="nested"
    size="md"
    border
    className={cn(nextUpCard, whilePending)}
  >
    <Skeleton className="w-28 shrink-0 self-stretch rounded-none sm:w-44" />
    <CardContent className="flex min-w-0 flex-1 flex-col gap-3 space-y-0">
      <Skeleton className="h-5 w-36 rounded-full" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-4 w-2/5" />
      </div>
      <Skeleton className="h-12 w-36 rounded max-sm:w-full" />
    </CardContent>
  </Card>
)

/**
 * Hero aside: the learner's next course as a card, or the first course for
 * someone new; the card itself is the way in
 */
export const HubNextUp = () => {
  const t = useTranslations("page-courses")
  const { course, returning } = useResumeCourse()
  const pending = !useIsClient()
  const { id, theme, art, level, lessons, exam } = course
  const track = TRACKS.find(({ courses }) => courses.includes(course))
  const lessonIds = lessons.map((lesson) => lesson.id)

  return (
    <div
      className="flex h-full items-center justify-center"
      style={courseThemeStyle(theme)}
    >
      {pending && <NextUpSkeleton />}
      {/* Between the hub card and the profile's compact one: art beside the text */}
      <Card
        href={courseHref(id)}
        variant="nested"
        size="md"
        border
        className={cn(nextUpCard, pending && oncePending)}
      >
        <div className="grid w-28 shrink-0 place-items-center bg-(--course-soft) p-4 sm:w-44">
          <CourseArt
            id={art}
            className="w-full transition-transform duration-300 motion-safe:group-hover/link:scale-105"
          />
        </div>
        <CardContent className="flex min-w-0 flex-col gap-3 space-y-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-(--course) px-2.5 py-0.5 text-xs font-bold tracking-wide text-white uppercase">
              {t(
                returning ? "page-courses-up-next" : "page-courses-start-here"
              )}
            </span>
            <span className="text-xs font-bold tracking-wide text-(--course-strong) uppercase dark:text-(--course-bright)">
              {t(`page-courses-level-${level}`)}
            </span>
          </div>
          <div className="flex flex-col">
            <CardTitle className="m-0">{t(`${id}-title`)}</CardTitle>
            {track && (
              <span className="text-sm text-body-medium">
                {t(`page-courses-track-${track.id}-title`)}
              </span>
            )}
          </div>
          <CourseProgress
            courseId={id}
            lessonIds={lessonIds}
            hasExam={exam.length > 0}
          />
          <span
            className={cn(
              chunkyButton,
              "inline-flex items-center justify-center self-start max-sm:w-full"
            )}
          >
            <CourseCardAction courseId={id} lessonIds={lessonIds} />
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
