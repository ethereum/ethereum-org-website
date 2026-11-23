"use client"

import { Fragment, type ReactNode, useEffect, useRef, useState } from "react"
import {
  Check,
  Coins,
  HandHeart,
  Hourglass,
  Layers,
  type LucideIcon,
  Package,
  Signpost,
  Store,
  TriangleAlert,
  Users,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLocale } from "next-intl"

import type { Lang, MatomoEventOptions } from "@/lib/types"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { Image } from "@/components/Image"
import Tooltip from "@/components/Tooltip"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"
import { EdgeScrollContainer } from "@/components/ui/edge-scroll-container"
import { Grid } from "@/components/ui/grid"
import { Tag, type TagProps } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { isLangRightToLeft } from "@/lib/utils/translations"

import type {
  HistoryBeat,
  HistoryChapter,
  HistoryLabels,
  HistoryStep,
} from "@/data/open-source/history"

import { useLocalStorage } from "@/hooks/useLocalStorage"

type HistoryChaptersProps = {
  chapters: HistoryChapter[]
  labels: HistoryLabels
  /** Primary CTA under the grid; opens the first chapter. */
  startLabel: string
  startHint: string
  startEvent: MatomoEventOptions
  /** Page anchors the closing chapter hands off to. */
  finalCtas: { label: string; href: string }[]
  /** Further reading entries by footnote number, shown in place from a step. */
  citations: Record<number, ReactNode>
}

const STORAGE_KEY = "open-source-history-progress"
const NO_PROGRESS: Record<string, number> = {}
const SWIPE_MIN_PX = 48

// Deep-link hash for a chapter; also the id of its crawler copy, so search
// results anchored there open the dialog.
const chapterHash = (slug: string) => `history-${slug}`

// Each beat of the story keeps one icon and color across every chapter.
const BEATS: Record<
  HistoryBeat,
  { icon: LucideIcon; tag: NonNullable<TagProps["status"]> }
> = {
  setting: { icon: Hourglass, tag: "normal" },
  vendors: { icon: Store, tag: "tag-red" },
  commons: { icon: Users, tag: "tag-green" },
  pay: { icon: Coins, tag: "tag-yellow" },
  sold: { icon: Package, tag: "accent-c" },
  handoff: { icon: Signpost, tag: "primary" },
  pattern: { icon: Layers, tag: "accent-a" },
  catch: { icon: TriangleAlert, tag: "tag-red" },
  ask: { icon: HandHeart, tag: "tag-green" },
}

/**
 * Six era cards that open one stepped dialog. Every string arrives resolved
 * from the server page; only the stepping, the dialog state and the per-chapter
 * read progress (localStorage, read in an effect) live here.
 */
const HistoryChapters = ({
  chapters,
  labels,
  startLabel,
  startHint,
  startEvent,
  finalCtas,
  citations,
}: HistoryChaptersProps) => {
  const locale = useLocale()
  const isRtl = isLangRightToLeft(locale as Lang)
  const reduceMotion = useReducedMotion()

  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  // Highest 1-based step seen per chapter: drives the card progress strips.
  const [progress, setProgress] = useLocalStorage(STORAGE_KEY, NO_PROGRESS)

  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const openedFromRef = useRef<string | null>(null)
  // Anchor a hand-off link closed the dialog for; followed once it unmounts.
  const pendingJumpRef = useRef<string | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  // Citations portal into the dialog (outside it, the modal blocks their links
  // and treats a click as dismissal), via an out-of-flow host: the portal's
  // wrapper div would otherwise take a flex gap and grow the dialog.
  const [tooltipHost, setTooltipHost] = useState<HTMLDivElement | null>(null)

  const activeIndex = chapters.findIndex(({ slug }) => slug === activeSlug)
  const active = activeIndex === -1 ? null : chapters[activeIndex]
  const nextChapter = active ? chapters[activeIndex + 1] : undefined
  const step = active?.steps[stepIndex]
  const isLast = !!active && stepIndex === active.steps.length - 1

  useEffect(() => {
    if (!active) return
    const seen = stepIndex + 1
    setProgress((prev) =>
      (prev[active.slug] ?? 0) >= seen ? prev : { ...prev, [active.slug]: seen }
    )
    if (seen === active.steps.length) trackCustomEvent(active.events.complete)
    bodyRef.current?.scrollTo({ top: 0 })
  }, [active, stepIndex, setProgress])

  useEffect(() => {
    const openFromHash = () => {
      const chapter = chapters.find(
        ({ slug }) => window.location.hash === `#${chapterHash(slug)}`
      )
      if (!chapter) return
      openedFromRef.current = chapter.slug
      setStepIndex(0)
      setActiveSlug(chapter.slug)
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [chapters])

  useEffect(() => {
    if (!activeSlug) return
    const { pathname, search } = window.location
    window.history.replaceState(
      null,
      "",
      `${pathname}${search}#${chapterHash(activeSlug)}`
    )
  }, [activeSlug])

  const openChapter = (slug: string, startIndex = 0) => {
    openedFromRef.current = slug
    setStepIndex(startIndex)
    setActiveSlug(slug)
  }

  const close = () => {
    setActiveSlug(null)
    const { pathname, search } = window.location
    window.history.replaceState(null, "", `${pathname}${search}`)
  }

  const goTo = (index: number) => {
    if (!active) return
    setStepIndex(Math.min(Math.max(index, 0), active.steps.length - 1))
  }

  const continueToNext = () => {
    if (!active || !nextChapter) return
    trackCustomEvent(active.events.continue)
    setStepIndex(0)
    setActiveSlug(nextChapter.slug)
  }

  const handOff = (href: string) => {
    pendingJumpRef.current = href
    close()
  }

  const jumpTo = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    handOff(href)
  }

  // Next, then the next chapter; the closing chapter ends on its first hand-off.
  const footerAction = !isLast
    ? () => goTo(stepIndex + 1)
    : nextChapter
      ? continueToNext
      : undefined
  const primaryAction =
    footerAction ?? (finalCtas[0] && (() => handOff(finalCtas[0].href)))

  const onKeyDown = (event: React.KeyboardEvent) => {
    // Leave modified keys alone: Alt+Left is the browser's Back.
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    const forward = isRtl ? "ArrowLeft" : "ArrowRight"
    const backward = isRtl ? "ArrowRight" : "ArrowLeft"
    if (event.key === forward) goTo(stepIndex + 1)
    if (event.key === backward) goTo(stepIndex - 1)
    // Enter on a focused control activates that control instead.
    const onControl = (event.target as HTMLElement).closest(
      "a, button, input, select, textarea, [role='button']"
    )
    if (event.key === "Enter" && !event.repeat && !onControl) {
      event.preventDefault()
      primaryAction?.()
    }
  }

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    touchStartRef.current =
      event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return
    const forward = isRtl ? dx > 0 : dx < 0
    goTo(stepIndex + (forward ? 1 : -1))
  }

  const shift = isRtl ? -8 : 8

  // Pay and sold steps list that beat for every era read so far: rent, own,
  // rent again, as a running ledger.
  const ledgerFor = (beat: HistoryBeat) =>
    chapters.slice(0, activeIndex + 1).flatMap(({ slug, years, steps }) => {
      const stat = steps.find(({ id }) => id === beat)?.stat
      return stat ? [{ slug, years, ...stat }] : []
    })

  const renderStep = (s: HistoryStep, i: number, sizer: boolean) => {
    if (!active) return null
    const { icon: BeatIcon, tag } = BEATS[s.id]
    const ledger = s.stat ? ledgerFor(s.id) : []
    const body = (
      <p className="text-lg">
        {s.body}
        {s.sources.map(({ number, label, event }) => (
          <Fragment key={number}>
            {"\u2060"}
            {/* Preflight gives sup line-height 0; leading-none on the trigger
                restores a box around the number for the tooltip to anchor to. */}
            <sup className="ms-0.5">
              {sizer ? (
                `[${number}]`
              ) : (
                <Tooltip
                  asChild
                  container={tooltipHost}
                  content={citations[number]}
                  customMatomoEvent={event}
                >
                  <button
                    type="button"
                    aria-label={label}
                    className="leading-none text-primary underline hover:text-primary-hover"
                  >
                    [{number}]
                  </button>
                </Tooltip>
              )}
            </sup>
          </Fragment>
        ))}
      </p>
    )
    return (
      <>
        {/* The era banner opens each chapter, so a new chapter reads as one. */}
        {i === 0 && (
          <div className="relative aspect-[3/1] shrink-0 overflow-hidden rounded-base bg-background-highlight">
            <Image
              src={active.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>
        )}
        <p className="sr-only">{s.positionLabel}</p>
        <Tag status={tag} className="gap-1.5 self-start">
          <BeatIcon aria-hidden className="size-3.5" />
          {s.eyebrow}
        </Tag>
        <p className="text-h3 font-bold">{s.headline}</p>
        {sizer ? body : <DialogDescription asChild>{body}</DialogDescription>}
        {/* From chapter 2 on: in chapter 1 a single row repeats the step. */}
        {ledger.length > 1 && (
          <div className="flex flex-col gap-3 border-t pt-4">
            <p className="text-sm font-bold text-body-medium">
              {s.id === "pay" ? labels.ledgerPay : labels.ledgerSold}
            </p>
            <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2">
              {ledger.map(({ slug, years, label, detail }, row) => {
                const isCurrent = row === ledger.length - 1
                return (
                  <Fragment key={slug}>
                    <dt
                      className={cn(
                        "text-sm",
                        isCurrent ? "text-body" : "text-body-medium"
                      )}
                    >
                      {years}
                    </dt>
                    <dd className="flex flex-col">
                      <span
                        className={cn(
                          isCurrent ? "font-bold" : "text-body-medium"
                        )}
                      >
                        {label}
                      </span>
                      {isCurrent && (
                        <span className="text-body-medium">{detail}</span>
                      )}
                    </dd>
                  </Fragment>
                )
              })}
            </dl>
          </div>
        )}
        {i === active.steps.length - 1 && !nextChapter && (
          <div className="flex flex-col gap-3 pt-2">
            {finalCtas.map(({ label, href }, i) => (
              <ButtonLink
                key={href}
                href={href}
                variant={i === 0 ? "solid" : "outline"}
                onClick={jumpTo(href)}
              >
                {label}
              </ButtonLink>
            ))}
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {/* Below md the cards scroll sideways with the next one peeking in; the
          Grid steps aside (display: contents) so they become scroll items. */}
      <EdgeScrollContainer className="my-space-2x">
        <Grid
          columns={3}
          size="slim"
          className="max-md:contents md:mx-(--edge-spacing) md:flex-1"
        >
          {chapters.map((chapter) => {
            const seen = progress[chapter.slug] ?? 0
            const isRead = seen >= chapter.steps.length
            const isPartial = seen > 0 && !isRead
            return (
              <Card
                key={chapter.slug}
                hoverLift
                className="relative max-md:ms-4 max-md:w-[calc(100%-4rem)] max-md:max-w-md max-md:shrink-0 max-md:snap-start max-md:first:ms-(--edge-spacing) max-md:last:me-(--edge-spacing)"
              >
                <CardContent className="flex flex-col">
                  <CardBanner size="sm" className="relative">
                    <Image
                      src={chapter.image}
                      alt=""
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                    {/* Same finished badge as the /courses hub cards. */}
                    {isRead && (
                      <span className="absolute end-3 top-3 grid size-9 place-items-center rounded-full bg-green-700 text-white">
                        <Check className="size-5" strokeWidth={3} aria-hidden />
                        <span className="sr-only">{labels.read}</span>
                      </span>
                    )}
                  </CardBanner>
                  <Tag status="tag" className="self-start">
                    {chapter.chapterLabel}
                  </Tag>
                  <CardTitle asChild>
                    <h3>{chapter.title}</h3>
                  </CardTitle>
                  <CardParagraph className="hidden md:block">
                    {chapter.hook}
                  </CardParagraph>
                  {/* Pinned to the bottom so strips and links line up across a row. */}
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="flex flex-1 gap-1">
                        {chapter.steps.map(({ id }, i) => (
                          <span
                            key={id}
                            className={cn(
                              "h-1.5 flex-1 rounded-full",
                              i < seen ? "bg-primary" : "bg-body-light"
                            )}
                          />
                        ))}
                      </span>
                      <span className="text-sm text-body-medium">
                        {chapter.stepsCountLabel}
                      </span>
                    </div>
                    {/* Stretched over the card: the whole tile is the hit area. */}
                    <Button
                      ref={(node) => {
                        triggerRefs.current[chapter.slug] = node
                      }}
                      variant="link"
                      aria-haspopup="dialog"
                      customEventOptions={
                        isPartial ? chapter.events.resume : chapter.events.open
                      }
                      onClick={() =>
                        openChapter(chapter.slug, isPartial ? seen - 1 : 0)
                      }
                      className="w-fit after:absolute after:inset-0 after:content-['']"
                    >
                      {isRead
                        ? labels.readAgain
                        : isPartial
                          ? labels.resume
                          : labels.openChapter}
                      <ChevronNext className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </Grid>
      </EdgeScrollContainer>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          customEventOptions={startEvent}
          onClick={() => openChapter(chapters[0].slug)}
        >
          {startLabel}
          <ChevronNext className="size-5" />
        </Button>
        <span className="text-sm text-body-medium">{startHint}</span>
      </div>

      <Dialog
        open={!!active}
        onOpenChange={(open) => {
          if (!open) close()
        }}
        size="lg"
        fullscreenMobile
      >
        <DialogContent
          className="flex flex-col max-md:h-dvh md:max-h-[85dvh]"
          onKeyDown={onKeyDown}
          // Focus the dialog itself, not its first button, so Enter reaches
          // the primary action instead of activating the close button.
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            ;(event.target as HTMLElement | null)?.focus()
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            // Runs after unmount, once the scroll lock has released.
            const href = pendingJumpRef.current
            pendingJumpRef.current = null
            if (href) {
              window.location.hash = href
              return
            }
            const slug = openedFromRef.current
            if (slug) triggerRefs.current[slug]?.focus()
          }}
        >
          {active && step && (
            <>
              <DialogHeader className="flex flex-col items-start gap-4">
                <Tag status="tag">{active.chapterLabel}</Tag>
                <DialogTitle>{active.title}</DialogTitle>
              </DialogHeader>

              <div role="group" aria-label={labels.progress} className="flex">
                {active.steps.map(({ id, goToLabel }, i) => (
                  <Button
                    key={id}
                    variant="ghost"
                    size="sm"
                    aria-label={goToLabel}
                    aria-current={i === stepIndex ? "step" : undefined}
                    onClick={() => goTo(i)}
                    className="min-h-0 flex-1 rounded-none px-0.5 py-3"
                  >
                    <span
                      className={cn(
                        "block h-1.5 w-full rounded-full",
                        i <= stepIndex ? "bg-primary" : "bg-body-light"
                      )}
                    />
                  </Button>
                ))}
              </div>

              <div
                ref={bodyRef}
                aria-live="polite"
                className="min-h-0 flex-1 overflow-y-auto"
              >
                {/* Every step sits in one grid cell; invisible copies size it to
                    the chapter's tallest step, so the dialog keeps one height. */}
                <div className="grid">
                  {active.steps.map((s, i) => (
                    <div
                      key={s.id}
                      aria-hidden
                      inert
                      className="invisible col-start-1 row-start-1 flex flex-col gap-4"
                    >
                      {renderStep(s, i, true)}
                    </div>
                  ))}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${active.slug}-${step.id}`}
                      initial={reduceMotion ? false : { opacity: 0, x: shift }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={
                        reduceMotion ? undefined : { opacity: 0, x: -shift }
                      }
                      transition={{ duration: 0.2 }}
                      className="col-start-1 row-start-1 flex flex-col gap-4"
                    >
                      {renderStep(step, stepIndex, false)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Stacked below sm with the primary action on top; side by side and
                  equal height above. */}
              <DialogFooter className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
                {/* No Back on a first step: closing (X, Esc, outside) returns to
                    the chapters. */}
                {stepIndex > 0 && (
                  <Button
                    variant="outline"
                    isSecondary
                    onClick={() => goTo(stepIndex - 1)}
                  >
                    <ChevronPrev className="size-5" />
                    {labels.back}
                  </Button>
                )}
                {/* One element for Next and Read next chapter, so focus survives
                    the swap on a chapter's last step. */}
                {footerAction && (
                  <Button
                    onClick={footerAction}
                    className="text-start sm:ms-auto"
                  >
                    {isLast && nextChapter ? (
                      <span className="flex flex-col">
                        <span>{labels.nextChapter}</span>
                        <span className="text-sm">{nextChapter.title}</span>
                      </span>
                    ) : (
                      labels.next
                    )}
                    <ChevronNext className="size-5 shrink-0" />
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
          <div ref={setTooltipHost} className="absolute" />
        </DialogContent>
      </Dialog>

      {/* The chapter text otherwise exists only inside the dialog; this copy is
          for crawlers and agents. Kept out of the a11y tree like the homepage's. */}
      <div aria-hidden="true" className="sr-only select-none">
        {chapters.map((chapter) => (
          <div key={chapter.slug}>
            <h3 id={chapterHash(chapter.slug)}>{chapter.title}</h3>
            <p>{chapter.years}</p>
            {chapter.steps.map((s) => (
              <Fragment key={s.id}>
                <p>{s.headline}</p>
                {s.stat && <p>{s.stat.label}</p>}
                {s.stat && <p>{s.stat.detail}</p>}
                <p>{s.body}</p>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default HistoryChapters
