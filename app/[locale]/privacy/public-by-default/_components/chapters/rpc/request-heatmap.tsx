"use client"

import { useMemo } from "react"
import { useLocale } from "next-intl"

import { createRandom } from "@/components/PrivacyWidgets/shared/random"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"

import { useLessonTranslations } from "../../use-lesson-translations"

const ASLEEP = [1, 2, 3, 4, 5, 6]
const LEVELS = [
  "bg-background-medium",
  "bg-leak/20",
  "bg-leak/40",
  "bg-leak/65",
  "bg-leak",
]

/** One week of request counts per local hour: busy mornings and evenings, quiet overnight */
const buildWeek = () => {
  const random = createRandom(2026)
  return Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => {
      if (ASLEEP.includes(hour)) return 0
      const base =
        hour === 7 || hour === 8
          ? 3
          : hour >= 19 && hour <= 23
            ? 3
            : hour === 0
              ? 1
              : 2
      const weekend = day >= 5 ? -1 : 0
      return Math.max(1, Math.min(4, base + weekend + random.int(-1, 1)))
    })
  )
}

export interface RequestHeatmapProps {
  empty: boolean
  label: string
}

/** 7×24 grid of requests by local hour. Data is generated, not read. */
const RequestHeatmap = ({ empty, label }: RequestHeatmapProps) => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const week = useMemo(buildWeek, [])

  // Weekday names from a known Monday (2024-01-01), hours from a fixed day
  const days = useMemo(() => {
    const format = dateTimeFormat(locale, { weekday: "short" })
    return Array.from({ length: 7 }, (_, i) =>
      format.format(new Date(2024, 0, 1 + i))
    )
  }, [locale])
  const hourLabel = (hour: number) =>
    dateTimeFormat(locale, { hour: "numeric" }).format(
      new Date(2024, 0, 1, hour)
    )

  return (
    <figure className="m-0 space-y-2">
      <figcaption className="text-sm font-bold text-body-medium">
        {label}
      </figcaption>
      {empty ? (
        <p className="m-0 rounded-base border border-dashed p-4 text-sm text-body-medium">
          {t("rpc-view-heatmap-empty")}
        </p>
      ) : (
        <div
          role="img"
          aria-label={t("rpc-view-heatmap-aria")}
          className="grid grid-cols-[auto_repeat(24,minmax(0,1fr))] gap-0.5 text-2xs text-body-medium"
        >
          {/* Asleep band over the quiet hours (local 01:00-07:00) */}
          <span />
          <span />
          <span
            aria-hidden
            className="col-span-6 truncate rounded-sm bg-primary-low-contrast px-1 text-center text-primary-high-contrast"
          >
            {t("rpc-view-heatmap-asleep")}
          </span>
          <span className="col-span-17" />
          {week.map((hours, day) => (
            <div key={day} className="contents">
              <span aria-hidden className="pe-1 leading-3">
                {days[day]}
              </span>
              {hours.map((level, hour) => (
                <span
                  key={hour}
                  aria-hidden
                  className={cn("h-3 rounded-[2px]", LEVELS[level])}
                />
              ))}
            </div>
          ))}
          <span />
          {[0, 6, 12, 18].map((hour) => (
            <span
              key={`h-${hour}`}
              aria-hidden
              className="col-span-6 truncate text-start"
            >
              {hourLabel(hour)}
            </span>
          ))}
        </div>
      )}
    </figure>
  )
}

export default RequestHeatmap
