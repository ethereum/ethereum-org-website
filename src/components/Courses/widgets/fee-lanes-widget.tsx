"use client"

import { useEffect, useState } from "react"
import { Car, Send } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const LANES = ["ethereum", "layer-2"] as const
type Lane = (typeof LANES)[number]
const DAYS = ["quiet", "busy"] as const
type Day = (typeof DAYS)[number]

type Level = "low" | "high" | "tiny"

/* Relative fees only: beginner lessons show no figures */
const FEES: Record<Lane, Record<Day, { level: Level; width: number }>> = {
  ethereum: {
    quiet: { level: "low", width: 35 },
    busy: { level: "high", width: 95 },
  },
  "layer-2": {
    quiet: { level: "tiny", width: 6 },
    busy: { level: "tiny", width: 9 },
  },
}

const CARS: Record<Lane, Record<Day, number>> = {
  ethereum: { quiet: 2, busy: 7 },
  "layer-2": { quiet: 3, busy: 5 },
}

/**
 * Send a payment on Ethereum or a layer 2, on a quiet or a busy day, and
 * compare the fees. Sending on both lanes and on both days unlocks Continue.
 */
const FeeLanesWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [day, setDay] = useState<Day>("quiet")
  const [sent, setSent] = useState<Partial<Record<Lane, Day>>>({})
  const [last, setLast] = useState<{ lane: Lane; day: Day } | null>(null)
  const [seen, setSeen] = useState({
    lanes: new Set<Lane>(),
    days: new Set<Day>(),
  })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (
      !done &&
      seen.lanes.size === LANES.length &&
      seen.days.size === DAYS.length
    ) {
      setDone(true)
      onComplete()
    }
  }, [done, seen, onComplete])

  const pickDay = (next: Day) => {
    setDay(next)
    // Fees shown belong to the day they were sent on
    setSent({})
  }

  const send = (lane: Lane) => {
    setSent((s) => ({ ...s, [lane]: day }))
    setLast({ lane, day })
    setSeen((s) => ({
      lanes: new Set(s.lanes).add(lane),
      days: new Set(s.days).add(day),
    }))
  }

  return (
    <WidgetShell>
      <div
        role="group"
        aria-label={t("page-courses-widget-lanes-day")}
        className="flex flex-col gap-2"
      >
        <p className="m-0 font-bold" aria-hidden>
          {t("page-courses-widget-lanes-day")}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {DAYS.map((id) => (
            <Button
              key={id}
              variant="ghost"
              aria-pressed={day === id}
              onClick={() => pickDay(id)}
              className={cn(
                chunkyTile,
                "min-h-12 px-4 font-bold text-body hover-link:!text-body",
                day === id &&
                  "border-(--course) bg-(--course-soft) hover:bg-(--course-soft)"
              )}
            >
              {t(`page-courses-widget-lanes-day-${id}`)}
            </Button>
          ))}
        </div>
      </div>

      <ul className="m-0 flex list-none flex-col gap-3">
        {LANES.map((lane) => {
          const fee = sent[lane] ? FEES[lane][sent[lane]] : null
          return (
            <li
              key={lane}
              className="m-0 flex flex-col gap-3 rounded-2xl bg-background p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="m-0 font-bold">
                  {t(`page-courses-widget-lanes-lane-${lane}`)}
                </p>
                <span
                  aria-hidden
                  className={cn("flex flex-wrap gap-0.5", courseText)}
                >
                  {Array.from({ length: CARS[lane][day] }, (_, i) => (
                    <Car key={i} className="size-5" />
                  ))}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="m-0 flex justify-between text-sm font-bold text-body-medium">
                  <span>{t("page-courses-widget-lanes-fee")}</span>
                  <span className={fee ? courseText : undefined}>
                    {fee
                      ? t(`page-courses-widget-lanes-fee-${fee.level}`)
                      : t("page-courses-widget-lanes-fee-unknown")}
                  </span>
                </p>
                <div
                  aria-hidden
                  className="h-3 overflow-hidden rounded-full border border-border bg-background-highlight"
                >
                  <div
                    className="h-full rounded-full bg-(--course) motion-safe:transition-[width] motion-safe:duration-500"
                    style={{ width: `${fee?.width ?? 0}%` }}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => send(lane)}
                className={cn(chunkyButton, "self-start")}
              >
                <Send aria-hidden />
                {t(`page-courses-widget-lanes-send-${lane}`)}
              </Button>
            </li>
          )
        })}
      </ul>

      <p role="status" className="m-0">
        {last
          ? t(`page-courses-widget-lanes-sent-${last.lane}-${last.day}`)
          : t("page-courses-widget-lanes-start")}
      </p>
    </WidgetShell>
  )
}

export default FeeLanesWidget
