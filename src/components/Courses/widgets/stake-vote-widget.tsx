"use client"

import { useId, useState } from "react"
import { ShieldAlert, ShieldCheck, Skull } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { isoProjection } from "../art/iso"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const COLS = 10
const ROWS = 3
const VALIDATORS = COLS * ROWS
/*
 * Snap stops in sixths so the answer is easy to land on. The thirds are
 * "just over": exactly one-third can't stall finality, 11 of 30 can.
 */
const STOPS = [
  { id: "sixth", attackers: 5 },
  { id: "third", attackers: 11 },
  { id: "half", attackers: 15 },
  { id: "two-thirds", attackers: 21 },
  { id: "five-sixths", attackers: 25 },
  { id: "all", attackers: 30 },
] as const
const TARGET = 1
const STALL = 1
const CONTROL = 3

const iso = isoProjection(100, 18)
const CUBE = 14
const cubes = Array.from({ length: VALIDATORS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  return { i, box: iso.box(col * 18, row * 26, 0, CUBE, CUBE, CUBE) }
})

const StakeVoteWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const sliderId = useId()
  const [stop, setStop] = useState(0)

  const { attackers } = STOPS[stop]
  const state = stop >= CONTROL ? "control" : stop >= STALL ? "stall" : "safe"
  const int = numberFormat(locale)
  const shareLabel = (idx: number) =>
    t(`page-courses-widget-stake-stop-${STOPS[idx].id}`)
  const countLabel = t("page-courses-widget-stake-count", {
    count: int.format(attackers),
    total: int.format(VALIDATORS),
  })

  const handleChange = (next: number) => {
    setStop(next)
    const share = shareLabel(next)
    onAnswer({
      correct: next === TARGET,
      hint:
        next < TARGET
          ? t("page-courses-widget-stake-low", { share })
          : t("page-courses-widget-stake-high", { share }),
    })
  }

  return (
    <WidgetShell>
      <svg viewBox="0 0 300 150" aria-hidden className="w-full">
        {cubes.map(({ i, box }) => {
          // Attackers fill from the back-left corner
          const bad = i < attackers
          return (
            <g key={i} className="transition-opacity duration-300">
              <polygon
                points={box.left}
                className={bad ? "fill-red-500" : "fill-(--course)"}
              />
              <polygon
                points={box.right}
                className={bad ? "fill-red-700" : "fill-(--course-strong)"}
              />
              <polygon
                points={box.top}
                fill={
                  bad
                    ? "color-mix(in oklab, var(--color-red-500) 55%, white)"
                    : "color-mix(in oklab, var(--course) 55%, white)"
                }
              />
            </g>
          )
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-(--course)" />
          {t("page-courses-widget-stake-honest")}
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-red-500" />
          {t("page-courses-widget-stake-attacker")}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
          <span>{t("page-courses-widget-stake-label")}</span>
          <span className="text-xl text-red-700 dark:text-red-400">
            {shareLabel(stop)}{" "}
            <span className="text-md font-semibold text-body-medium">
              ({countLabel})
            </span>
          </span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={stop}
          disabled={locked}
          aria-valuetext={`${shareLabel(stop)} (${countLabel})`}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full accent-red-600"
        />
        {/* One tick per stop; the native thumb centres on each */}
        <div aria-hidden className="flex justify-between px-2">
          {STOPS.map(({ id }, idx) => (
            <span
              key={id}
              className={cn(
                "flex w-0 flex-col items-center gap-0.5 text-sm font-bold whitespace-nowrap",
                idx === stop ? "text-body" : "text-body-medium"
              )}
            >
              <span className="h-2 w-0.5 bg-current" />
              {t(`page-courses-widget-stake-tick-${id}`)}
            </span>
          ))}
        </div>
      </div>

      <p
        role="status"
        className={cn(
          "m-0 flex items-start gap-2 rounded-2xl p-3 transition-colors",
          state === "safe" &&
            "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400",
          state === "stall" &&
            "bg-warning-light text-body dark:bg-warning-dark",
          state === "control" &&
            "bg-error-light text-error dark:bg-error-dark dark:text-red-400"
        )}
      >
        {state === "safe" ? (
          <ShieldCheck className="size-5 shrink-0" aria-hidden />
        ) : state === "stall" ? (
          <ShieldAlert className="size-5 shrink-0" aria-hidden />
        ) : (
          <Skull className="size-5 shrink-0" aria-hidden />
        )}
        <span>
          {t(`page-courses-widget-stake-${state}`)}
          {locked && <> {t("page-courses-widget-stake-hit")}</>}
        </span>
      </p>
    </WidgetShell>
  )
}

export default StakeVoteWidget
