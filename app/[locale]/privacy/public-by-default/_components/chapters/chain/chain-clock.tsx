"use client"

import { useMemo, useState } from "react"
import { useLocale } from "next-intl"

import LogLines, {
  type LogLine,
} from "@/components/PrivacyWidgets/shared/log-lines"
import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

import {
  analyseClock,
  ASSUMED_SLEEP,
  formatUtcOffset,
  offsetsMatch,
} from "./data"
import { useChainData } from "./use-chain-data"

const HOURS = Array.from({ length: 24 }, (_, hour) => hour)
const WEEKDAYS = Array.from({ length: 7 }, (_, day) => day)
// 2024-01-01 was a Monday: used only to name weekdays
const MONDAY = Date.UTC(2024, 0, 1)
const HOUR_MS = 3_600_000

const ChainClock = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const { collect } = useLesson()
  const chain = useChainData()
  const [runs, setRuns] = useState(0)
  const [analysed, setAnalysed] = useState(false)

  const analysis = useMemo(
    () =>
      chain
        ? analyseClock(chain.data.sentTimestamps, chain.utcOffsetMinutes)
        : null,
    [chain]
  )

  const formatters = useMemo(
    () => ({
      weekday: dateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }),
      hour: dateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: "UTC",
      }),
      count: numberFormat(locale),
    }),
    [locale]
  )

  if (!chain || !analysis) return null

  const { silence } = analysis
  const silentHours = new Set(
    Array.from({ length: silence.length }, (_, i) => (silence.start + i) % 24)
  )
  const atMinutes = (minutes: number) =>
    formatters.hour.format(Date.UTC(2024, 0, 1, 0, minutes))
  const startTime = atMinutes(silence.start * 60)
  const endTime = atMinutes(((silence.start + silence.length) % 24) * 60)
  const total = chain.data.sentTimestamps.length

  const lines: LogLine[] = [
    {
      id: "count",
      content: t("chain-infer-counting", { count: total }),
      tone: "dim",
    },
    {
      id: "silence",
      content: t("chain-infer-silence", { startTime, endTime }),
    },
    {
      id: "sleep",
      content: t("chain-infer-sleep", {
        sleepStart: atMinutes(ASSUMED_SLEEP.start),
        sleepEnd: atMinutes(ASSUMED_SLEEP.end),
      }),
      tone: "dim",
    },
    {
      id: "offset",
      content: t("chain-infer-offset", {
        utcOffset: formatUtcOffset(analysis.inferredOffsetMinutes),
      }),
      tone: "leak",
    },
    {
      id: "browser",
      content: t("chain-infer-browser", {
        timeZone: chain.timeZone ?? formatUtcOffset(chain.utcOffsetMinutes),
        utcOffset: formatUtcOffset(chain.utcOffsetMinutes),
      }),
    },
    {
      id: "verdict",
      content: t(
        offsetsMatch(analysis.inferredOffsetMinutes, chain.utcOffsetMinutes)
          ? "chain-infer-match"
          : "chain-infer-close"
      ),
      tone: "leak",
    },
    {
      id: "routine",
      content: t("chain-infer-routine", {
        weekdayStart: atMinutes(analysis.weekdayStart),
        weekendStart: atMinutes(analysis.weekendStart),
      }),
      tone: "leak",
    },
  ]

  const run = () => {
    setRuns((count) => count + 1)
  }

  return (
    <div className="space-y-4 rounded-base border bg-background-highlight p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="m-0 text-h6">{t("chain-heatmap-title")}</h4>
        <p className="m-0 text-sm text-body-medium">
          {t("chain-heatmap-meta", { count: total })}
        </p>
      </div>

      {/* A time chart: hours read left to right in every locale */}
      <div className="overflow-x-auto">
        <div
          role="img"
          aria-label={`${t("chain-heatmap-label")} ${t(
            "chain-heatmap-label-quiet",
            { startTime, endTime }
          )}`}
          dir="ltr"
          className="grid min-w-72 grid-cols-[auto_repeat(24,minmax(0,1fr))] gap-px text-xs"
        >
          {WEEKDAYS.map((day) => (
            <div key={day} className="contents">
              <span aria-hidden className="pe-2 leading-4 text-body-medium">
                {formatters.weekday.format(MONDAY + day * 24 * HOUR_MS)}
              </span>
              {HOURS.map((hour) => {
                const count = analysis.grid[day][hour]
                const asleep = analysed && silentHours.has(hour)
                return (
                  <span
                    key={hour}
                    aria-hidden
                    title={t("chain-heatmap-cell", {
                      slot: `${formatters.weekday.format(
                        MONDAY + day * 24 * HOUR_MS
                      )} ${atMinutes(hour * 60)}`,
                      count,
                    })}
                    className={cn(
                      "h-4 rounded-[2px]",
                      count === 0 && "bg-background-medium",
                      asleep && "bg-primary-low-contrast ring-1 ring-primary"
                    )}
                    style={
                      count
                        ? {
                            backgroundColor: `hsla(var(--leak), ${
                              0.2 + (0.8 * count) / analysis.max
                            })`,
                          }
                        : undefined
                    }
                  />
                )
              })}
            </div>
          ))}
          <span aria-hidden />
          {[0, 6, 12, 18].map((hour) => (
            <span
              key={hour}
              aria-hidden
              className="col-span-6 pt-1 text-body-medium"
            >
              {atMinutes(hour * 60)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-body-medium">
        <span className="flex items-center gap-2">
          {t("chain-heatmap-legend-fewer")}
          <span
            aria-hidden
            className="h-3 w-16 rounded-xs bg-linear-to-r from-leak/20 to-leak rtl:bg-linear-to-l"
          />
          {t("chain-heatmap-legend-more")}
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-3 rounded-xs bg-background-medium"
          />
          {t("chain-heatmap-legend-quiet")}
        </span>
        {analysed && (
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="size-3 rounded-xs bg-primary-low-contrast ring-1 ring-primary"
            />
            <span>
              <strong className="text-primary">
                {t("chain-heatmap-band")}
              </strong>
              {": "}
              {t("chain-heatmap-band-description")}
            </span>
          </span>
        )}
      </div>

      <div className="space-y-3">
        <p className="m-0 font-semibold">{t("chain-infer-log-title")}</p>
        {runs === 0 ? (
          <p className="m-0 text-sm text-body-medium">
            {t("chain-infer-idle")}
          </p>
        ) : (
          <LogLines
            key={runs}
            lines={lines}
            label={t("chain-infer-log-title")}
            delay={450}
            onDone={() => {
              setAnalysed(true)
              collect("schedule")
            }}
          />
        )}
        <Button size="sm" onClick={run}>
          {t(runs === 0 ? "chain-infer-button" : "chain-infer-button-again")}
        </Button>
      </div>
    </div>
  )
}

export default ChainClock
