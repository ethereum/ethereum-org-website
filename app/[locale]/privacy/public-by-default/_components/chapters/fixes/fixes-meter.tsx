"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale } from "next-intl"

import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"

import { numberFormat } from "@/lib/utils/numbers"

import { catalogue } from "@/data/privacy-lesson/catalogue"
import { fixes } from "@/data/privacy-lesson/fixes"

import { useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

/** Bar segments: visible (leak), hidden by a fix (primary), not known yet */
export const ExposureBar = ({
  visibleShare,
  hiddenShare,
  className = "h-3",
}: {
  visibleShare: number
  hiddenShare: number
  className?: string
}) => (
  // Flex keeps the fill starting at the inline start, so it reads right in RTL
  <div
    aria-hidden
    className={`flex overflow-hidden rounded-full bg-background-medium ${className}`}
  >
    <div
      className="bg-leak motion-safe:transition-[flex-basis] motion-safe:duration-500"
      style={{ flexBasis: `${visibleShare * 100}%` }}
    />
    <div
      className="bg-primary motion-safe:transition-[flex-basis] motion-safe:duration-500"
      style={{ flexBasis: `${hiddenShare * 100}%` }}
    />
  </div>
)

type FilledNote = { kind: "all" } | { kind: "some"; count: number } | null

/**
 * The chapter's big "Visible to others" meter. The first time it scrolls into
 * view, it fills in anything the reader skipped in Part I, so the fixes below
 * have something to hide.
 */
const FixesMeter = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const {
    collected,
    collect,
    visibleShare,
    hiddenShare,
    knownCount,
    hiddenCount,
    activeFixes,
  } = useLesson()
  const rootRef = useRef<HTMLDivElement>(null)
  const [note, setNote] = useState<FilledNote>(null)

  const latestCollected = useRef(collected)
  latestCollected.current = collected
  const collectRef = useRef(collect)
  collectRef.current = collect

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        // Give stored progress a moment to load after hydration first
        timer = setTimeout(() => {
          const current = latestCollected.current
          const missing = catalogue
            .map(({ id }) => id)
            .filter((id) => !current.includes(id))
          if (!missing.length) return
          collectRef.current(...missing)
          setNote(
            current.length === 0
              ? { kind: "all" }
              : { kind: "some", count: missing.length }
          )
        }, 400)
      },
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [])

  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(visibleShare)

  return (
    <div ref={rootRef} className="space-y-6">
      <div aria-live="polite">
        {note && (
          <Alert variant="update">
            <AlertContent>
              <AlertDescription>
                {note.kind === "all"
                  ? t("fixes-filled-all")
                  : t("fixes-filled-some", { count: note.count })}
              </AlertDescription>
            </AlertContent>
          </Alert>
        )}
      </div>

      <div
        role="group"
        aria-label={t("fixes-meter-label")}
        className="space-y-4 rounded-base border p-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="text-sm font-bold tracking-wide text-body-medium uppercase">
              {t("fixes-visible-label")}
            </p>
            <p className="text-6xl leading-none font-black text-leak">
              {percent}
            </p>
          </div>
          <div className="space-y-1 text-sm text-body-medium">
            <p>
              {t("fixes-known-count", { count: knownCount })} ·{" "}
              {t("fixes-hidden-count", { count: hiddenCount })}
            </p>
            <p>
              {t("fixes-fixes-on", {
                count: activeFixes.length,
                total: fixes.length,
              })}
            </p>
          </div>
        </div>

        <ExposureBar visibleShare={visibleShare} hiddenShare={hiddenShare} />

        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 text-sm">
          <li className="m-0 flex items-center gap-2">
            <span aria-hidden className="size-3 rounded-full bg-leak" />
            {t("fixes-legend-visible")}
          </li>
          <li className="m-0 flex items-center gap-2">
            <span aria-hidden className="size-3 rounded-full bg-primary" />
            {t("fixes-legend-hidden")}
          </li>
          <li className="m-0 flex items-center gap-2">
            <span
              aria-hidden
              className="size-3 rounded-full bg-background-medium"
            />
            {t("fixes-legend-unknown")}
          </li>
        </ul>

        <p className="sr-only" aria-live="polite">
          {t("fixes-live-announcement", { percent })}
        </p>
      </div>
    </div>
  )
}

export default FixesMeter
