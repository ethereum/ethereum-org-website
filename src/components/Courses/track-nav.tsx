"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Check, ChevronDown, LayoutList } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import type { Lang } from "@/lib/types"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"
import { isLangRightToLeft } from "@/lib/utils/translations"

import { statChip } from "./theme"
import { useCourseProgress } from "./useCourseProgress"

import { useIsClient } from "@/hooks/useIsClient"
import type { CatalogCourse, CatalogTrack } from "@/lib/courses/catalog"

// A section counts as current once its top passes under the sticky strip
const ACTIVE_LINE = 180

const chip = cn(statChip, "py-1 text-base")

// Width of the fade at a scrollable edge of the strip
const FADE = "2rem"

/** Share of a track mastered, as a ring that turns into a check when full */
const TrackRing = ({ share }: { share: number }) => {
  const r = 9
  const length = 2 * Math.PI * r
  if (share <= 0) return null
  if (share >= 1)
    return (
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success text-white">
        <Check aria-hidden className="size-4" strokeWidth={3} />
      </span>
    )
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-6 shrink-0 -rotate-90 text-primary"
    >
      <circle
        cx="12"
        cy="12"
        r={r}
        fill="none"
        strokeWidth="3"
        className="stroke-current opacity-20"
      />
      <circle
        cx="12"
        cy="12"
        r={r}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - share)}
        className="stroke-current transition-[stroke-dashoffset] duration-500"
      />
    </svg>
  )
}

const scrollToTrack = (id: string) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
}

/**
 * Jump links to each hub track, with how much of it is mastered: a row that
 * scrolls sideways (faded where more is hidden, the current track kept in
 * view) from md up; a menu showing the current track below that.
 */
const TrackNav = ({
  className,
  shown,
}: {
  className?: string
  /** The tracks the hub renders, in order */
  shown: CatalogTrack[]
}) => {
  const t = useTranslations("page-courses")
  const uid = useId()
  const locale = useLocale()
  const format = numberFormat(locale).format
  const isClient = useIsClient()
  const { isLessonComplete, isExamPassed } = useCourseProgress()
  const [active, setActive] = useState<string | null>(null)
  const stripRef = useRef<HTMLUListElement>(null)
  const [fade, setFade] = useState({ start: false, end: false })
  const rtl = isLangRightToLeft(locale as Lang)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const current = shown
        .filter(({ id }) => {
          const top = document.getElementById(id)?.getBoundingClientRect().top
          return top !== undefined && top <= ACTIVE_LINE
        })
        .at(-1)
      setActive(current?.id ?? null)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [shown])

  // RTL scrollLeft runs from 0 down to negative, hence abs
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth
      const at = Math.abs(strip.scrollLeft)
      setFade({ start: at > 1, end: at < max - 1 })
    }
    update()
    strip.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(strip)
    return () => {
      strip.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [])

  // Centre the current track's pill; offsetLeft and scrollLeft share an
  // origin in both directions, so no RTL special case
  useEffect(() => {
    const strip = stripRef.current
    const pill = strip?.querySelector<HTMLElement>(`[data-track="${active}"]`)
    if (!strip || !pill || strip.scrollWidth <= strip.clientWidth) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    strip.scrollTo({
      left: pill.offsetLeft - (strip.clientWidth - pill.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    })
  }, [active])

  const startStop = fade.start ? `transparent, #000 ${FADE}` : "#000"
  const endStop = fade.end ? `#000 calc(100% - ${FADE}), transparent` : "#000"
  const mask = `linear-gradient(to ${rtl ? "left" : "right"}, ${startStop}, ${endStop})`

  const isMastered = ({ id, lessons, exam }: CatalogCourse) =>
    exam.length
      ? isExamPassed(id)
      : lessons.every((lesson) => isLessonComplete(id, lesson.id))
  const tracks = shown.map(({ id, courses }) => {
    const done = isClient ? courses.filter(isMastered).length : 0
    return {
      id,
      title: t(`page-courses-track-${id}-title`),
      share: courses.length ? done / courses.length : 0,
      count: courses.length
        ? `${format(done)}/${format(courses.length)}`
        : null,
    }
  })
  const current = tracks.find(({ id }) => id === active) ?? tracks[0]

  return (
    <nav
      aria-label={t("page-courses-track-nav")}
      className={cn("min-w-0", className)}
    >
      <ul
        ref={stripRef}
        className="relative m-0 -my-1 hidden list-none items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] md:flex"
        style={{ maskImage: mask }}
      >
        {tracks.map(({ id, title, share, count }) => (
          <li key={id} data-track={id} className="m-0 shrink-0">
            <a
              href={`#${id}`}
              aria-current={id === active ? "location" : undefined}
              aria-labelledby={
                count ? `${uid}-${id}-title ${uid}-${id}-count` : undefined
              }
              onClick={(event) => {
                event.preventDefault()
                scrollToTrack(id)
              }}
              className={cn(
                chip,
                "text-body no-underline hover:border-primary hover:text-primary",
                // No ring before any progress: even padding around the name
                share <= 0 && "ps-3.5",
                id === active && "border-primary text-primary"
              )}
            >
              <TrackRing share={share} />
              <span id={`${uid}-${id}-title`}>{title}</span>
              {count && (
                <span id={`${uid}-${id}-count`} className="sr-only">
                  {count}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <DropdownMenu>
        {/* Below sm, an icon in place of the track's name keeps one row
            with the stat chips */}
        <DropdownMenuTrigger
          aria-label={`${t("page-courses-track-nav")}: ${current.title}`}
          className={cn(
            chip,
            "max-w-full text-body max-sm:gap-1 md:hidden",
            current.share <= 0 && "sm:ps-3.5"
          )}
        >
          <LayoutList aria-hidden className="size-6 shrink-0 sm:hidden" />
          <span className="contents max-sm:hidden">
            <TrackRing share={current.share} />
            <span className="truncate">{current.title}</span>
          </span>
          <ChevronDown aria-hidden className="size-4 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-64">
          {tracks.map(({ id, title, share, count }) => (
            <DropdownMenuItem
              key={id}
              onSelect={() => scrollToTrack(id)}
              aria-labelledby={
                count
                  ? `${uid}-${id}-menu-title ${uid}-${id}-menu-count`
                  : undefined
              }
              className={cn("gap-3", id === active && "text-primary")}
            >
              {/* Holds the ring's place so the names line up */}
              <span className="grid size-6 shrink-0 place-items-center">
                <TrackRing share={share} />
              </span>
              <span id={`${uid}-${id}-menu-title`} className="flex-1">
                {title}
              </span>
              {count && (
                <span
                  id={`${uid}-${id}-menu-count`}
                  className="text-sm text-body-medium tabular-nums"
                >
                  {count}
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

export default TrackNav
