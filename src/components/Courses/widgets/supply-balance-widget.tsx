"use client"

import { useId, useState } from "react"
import { Coins, Flame, Minus, TrendingDown, TrendingUp } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Round illustrative figures, labelled as such in the UI. Issuance is held
 * constant (in reality it tracks total stake, not activity); burn rises with
 * activity. The answer is the stop where burn equals issuance.
 */
const ISSUED = 2_000
const STOPS = [
  { id: "very-quiet", burned: 250 },
  { id: "quiet", burned: 750 },
  { id: "moderate", burned: 1_250 },
  { id: "busy", burned: 2_000 },
  { id: "very-busy", burned: 3_000 },
  { id: "frantic", burned: 5_000 },
] as const
const TARGET = 3
const MAX = Math.max(ISSUED, ...STOPS.map(({ burned }) => burned))

const SupplyBalanceWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const sliderId = useId()
  const [stop, setStop] = useState(0)

  const int = numberFormat(locale)
  const { burned } = STOPS[stop]
  const net = ISSUED - burned
  const trend = net > 0 ? "grow" : net < 0 ? "shrink" : "flat"
  const levelLabel = (idx: number) =>
    t(`page-courses-widget-supply-level-${STOPS[idx].id}`)

  const handleChange = (next: number) => {
    setStop(next)
    const values = {
      burned: int.format(STOPS[next].burned),
      issued: int.format(ISSUED),
    }
    onAnswer({
      correct: next === TARGET,
      hint:
        next < TARGET
          ? t("page-courses-widget-supply-low", values)
          : t("page-courses-widget-supply-high", values),
    })
  }

  const bars = [
    {
      id: "issued",
      Icon: Coins,
      amount: ISSUED,
      fill: "bg-(--course)",
    },
    {
      id: "burned",
      Icon: Flame,
      amount: burned,
      fill: "bg-red-500",
    },
  ] as const

  const TrendIcon =
    trend === "grow" ? TrendingUp : trend === "shrink" ? TrendingDown : Minus

  return (
    <WidgetShell>
      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
          <span>{t("page-courses-widget-supply-label")}</span>
          <span className={cn("text-xl", courseText)}>{levelLabel(stop)}</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={stop}
          aria-valuetext={levelLabel(stop)}
          disabled={locked}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full accent-(--course)"
        />
        {/* One tick per stop; the native thumb centres on each */}
        <div aria-hidden className="flex justify-between px-2">
          {STOPS.map(({ id }, idx) => (
            <span
              key={id}
              className={cn(
                "h-2 w-0.5 bg-current",
                idx === stop ? "text-body" : "text-body-medium"
              )}
            />
          ))}
        </div>
        <div
          aria-hidden
          className="flex justify-between text-sm font-bold text-body-medium"
        >
          <span>{t("page-courses-widget-supply-quieter")}</span>
          <span>{t("page-courses-widget-supply-busier")}</span>
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex flex-col gap-4 rounded-2xl bg-background p-4"
      >
        {bars.map(({ id, Icon, amount, fill }) => (
          <div key={id} className="flex flex-col gap-1">
            <p className="m-0 flex flex-wrap items-center justify-between gap-x-3 font-bold">
              <span className="flex items-center gap-2">
                <Icon
                  className={cn(
                    "size-5 shrink-0",
                    id === "issued"
                      ? courseText
                      : "text-error dark:text-red-400"
                  )}
                  aria-hidden
                />
                {t(`page-courses-widget-supply-${id}`)}
              </span>
              <span className="font-mono">
                {t("page-courses-widget-supply-amount", {
                  value: int.format(amount),
                })}
              </span>
            </p>
            <div
              aria-hidden
              className="h-3 overflow-hidden rounded-full bg-background-highlight"
            >
              <div
                className={cn(
                  "h-full rounded-full motion-safe:transition-[width] motion-safe:duration-300",
                  fill
                )}
                style={{ width: `${(amount / MAX) * 100}%` }}
              />
            </div>
          </div>
        ))}

        <p
          className={cn(
            "m-0 flex items-center gap-2 border-t-2 border-border pt-3 font-bold",
            locked && "text-green-700 dark:text-green-400"
          )}
        >
          <TrendIcon className="size-5 shrink-0" aria-hidden />
          {t(`page-courses-widget-supply-net-${trend}`, {
            value: int.format(Math.abs(net)),
          })}
        </p>
      </div>

      <p className="m-0 text-sm text-body-medium">
        {t("page-courses-widget-supply-example")}
      </p>

      {locked && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-supply-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default SupplyBalanceWidget
