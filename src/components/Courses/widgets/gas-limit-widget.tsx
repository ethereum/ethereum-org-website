"use client"

import { useId, useRef, useState } from "react"
import { CircleCheck, CircleX, Gauge } from "lucide-react"
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
// The wallet's estimate plus headroom, where the slider starts
const SUGGESTED = 5
const MAX = STOPS[STOPS.length - 1]

const outcome = (limit: number) => {
  const ok = limit >= GAS_NEEDED
  const used = ok ? GAS_NEEDED : limit
  return { ok, used, unused: limit - used, fee: used * GAS_PRICE }
}

/**
 * Sandbox: start from the wallet's suggested limit, then see that lowering it
 * never cuts the fee, and that too low a limit fails and still costs
 */
const GasLimitWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const uid = useId()
  const sliderId = `${uid}-slider`
  const [stop, setStop] = useState(SUGGESTED)
  const done = useRef(false)

  const int = numberFormat(locale)
  const compact = numberFormat(locale, { notation: "compact" })
  const limit = STOPS[stop]
  const { ok, used, unused, fee } = outcome(limit)
  const state = !ok
    ? "low"
    : stop === SUGGESTED
      ? "suggested"
      : stop < SUGGESTED
        ? "lower"
        : "higher"
  const gasLabel = (value: number) =>
    t("page-courses-widget-limit-unit", { value: int.format(value) })
  const gwei = (value: number) =>
    t("page-courses-widget-limit-gwei", { value: int.format(value) })

  const handleChange = (next: number) => {
    setStop(next)
    // Done once a too-low limit has failed: the cost of guessing low
    if (!done.current && !outcome(STOPS[next]).ok) {
      done.current = true
      onComplete()
    }
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-1">
        <p className="m-0 flex items-center gap-2 font-bold">
          <Gauge className={cn("size-5 shrink-0", courseText)} aria-hidden />
          {t("page-courses-widget-limit-wallet", {
            value: int.format(STOPS[SUGGESTED]),
          })}
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
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-bold"
        >
          <span id={`${uid}-label`}>
            {t("page-courses-widget-limit-label")}
          </span>
          <span className="flex items-center gap-2">
            {stop === SUGGESTED && (
              <span
                id={`${uid}-suggested`}
                className="rounded-full bg-background px-2 py-0.5 text-sm whitespace-nowrap"
              >
                {t("page-courses-widget-limit-suggested")}
              </span>
            )}
            <span aria-hidden className={courseText}>
              {gasLabel(limit)}
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
          aria-valuetext={gasLabel(limit)}
          aria-labelledby={
            stop === SUGGESTED
              ? `${uid}-label ${uid}-suggested`
              : `${uid}-label`
          }
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
            {t("page-courses-widget-limit-max")}
          </dt>
          <dd className="m-0 font-mono tabular-nums">
            {gwei(limit * GAS_PRICE)}
          </dd>
          <dt className="text-body-medium">
            {t("page-courses-widget-limit-used")}
          </dt>
          <dd className="m-0 font-mono tabular-nums">{int.format(used)}</dd>
          <dt className="text-body-medium">
            {t("page-courses-widget-limit-refunded")}
          </dt>
          <dd className="m-0 font-mono tabular-nums">{int.format(unused)}</dd>
          <dt className="font-bold">{t("page-courses-widget-limit-fee")}</dt>
          <dd className="m-0 font-mono font-bold tabular-nums">{gwei(fee)}</dd>
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
          {t(`page-courses-widget-limit-status-${state}`, {
            fee: int.format(fee),
          })}
        </p>
      </div>
    </WidgetShell>
  )
}

export default GasLimitWidget
