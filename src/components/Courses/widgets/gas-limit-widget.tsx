"use client"

import { useId, useState } from "react"
import { Check, CircleCheck, CircleX, Gauge } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const GAS_NEEDED = 130_000
const GAS_PRICE = 10
/*
 * All stops sit above 21,000, the floor below which a transaction is rejected
 * before inclusion (no fee). Above it, running out of gas consumes the whole
 * limit; succeeding charges only the gas used.
 */
const STOPS = [70_000, 90_000, 110_000, 130_000, 150_000, 170_000, 190_000]
const MAX = STOPS[STOPS.length - 1]
const TARGET = STOPS.indexOf(GAS_NEEDED)

const outcome = (limit: number) => {
  const ok = limit >= GAS_NEEDED
  const used = ok ? GAS_NEEDED : limit
  return { ok, used, unused: limit - used, fee: used * GAS_PRICE }
}

const GasLimitWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const sliderId = useId()
  const [stop, setStop] = useState(0)

  const int = numberFormat(locale)
  const compact = numberFormat(locale, { notation: "compact" })
  const limit = STOPS[stop]
  const { ok, used, unused, fee } = outcome(limit)
  const gasLabel = (value: number) =>
    t("page-courses-widget-limit-unit", { value: int.format(value) })

  const handleChange = (next: number) => {
    setStop(next)
    const nextLimit = STOPS[next]
    const result = outcome(nextLimit)
    onAnswer({
      correct: next === TARGET,
      hint: result.ok
        ? t("page-courses-widget-limit-high", { limit: int.format(nextLimit) })
        : t("page-courses-widget-limit-low", {
            limit: int.format(nextLimit),
            fee: int.format(result.fee),
          }),
    })
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-1">
        <p className="m-0 flex items-center gap-2 font-bold">
          <Gauge className={cn("size-5 shrink-0", courseText)} aria-hidden />
          {t("page-courses-widget-limit-goal")}
        </p>
        <p className="m-0 text-body-medium">
          {t("page-courses-widget-limit-price", {
            value: int.format(GAS_PRICE),
          })}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={sliderId}
          className="flex flex-wrap justify-between gap-x-4 font-bold"
        >
          <span>{t("page-courses-widget-limit-label")}</span>
          <span className={courseText}>{gasLabel(limit)}</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={stop}
          aria-valuetext={gasLabel(limit)}
          disabled={locked}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full accent-(--course)"
        />
        {/* One tick per stop; the native thumb centres on each */}
        <div aria-hidden className="flex justify-between px-2">
          {STOPS.map((value, idx) => (
            <span
              key={value}
              className={cn(
                "flex w-0 flex-col items-center gap-0.5 text-sm font-bold whitespace-nowrap",
                idx === stop ? "text-body" : "text-body-medium"
              )}
            >
              <span className="h-2 w-0.5 bg-current" />
              {compact.format(value)}
            </span>
          ))}
        </div>
      </div>

      {/* Tank: the limit is the room you give; used fills it, the rest returns */}
      <div
        aria-hidden
        className="flex h-4 overflow-hidden rounded-full bg-background"
      >
        <div
          className={cn(
            "h-full transition-[width] duration-300 motion-reduce:transition-none",
            ok ? "bg-(--course)" : "bg-error"
          )}
          style={{ width: `${(used / MAX) * 100}%` }}
        />
        {unused > 0 && (
          <div
            className="h-full rounded-e-full border-2 border-dashed border-(--course)"
            style={{ width: `${(unused / MAX) * 100}%` }}
          />
        )}
      </div>

      <div aria-live="polite" className="flex flex-col gap-4">
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <dt className="text-body-medium">
            {t("page-courses-widget-limit-used")}
          </dt>
          <dd className="m-0 font-mono tabular-nums">{int.format(used)}</dd>
          <dt className="text-body-medium">
            {t("page-courses-widget-limit-refunded")}
          </dt>
          <dd className="m-0 font-mono tabular-nums">{int.format(unused)}</dd>
          <dt className="font-bold">{t("page-courses-widget-limit-fee")}</dt>
          <dd className="m-0 font-mono font-bold tabular-nums">
            {t("page-courses-widget-limit-gwei", { value: int.format(fee) })}
          </dd>
        </dl>

        <p
          className={cn(
            "m-0 flex items-start gap-2 rounded-2xl p-3",
            ok
              ? "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400"
              : "bg-error-light text-error dark:bg-error-dark dark:text-red-400"
          )}
        >
          {ok ? (
            <CircleCheck className="size-5 shrink-0" aria-hidden />
          ) : (
            <CircleX className="size-5 shrink-0" aria-hidden />
          )}
          {t(
            ok
              ? "page-courses-widget-limit-success"
              : "page-courses-widget-limit-failed"
          )}
        </p>
      </div>

      {locked && (
        <p className="m-0 flex items-center gap-2 text-green-700 dark:text-green-400">
          <Check className="size-5 shrink-0" aria-hidden />
          {t("page-courses-widget-limit-hit", {
            gas: int.format(GAS_NEEDED),
          })}
        </p>
      )}
    </WidgetShell>
  )
}

export default GasLimitWidget
