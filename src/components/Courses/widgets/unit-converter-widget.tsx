"use client"

import { useId, useState } from "react"
import { Calculator, Check } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Seven stops a factor of ten apart, 0.0000021 to 2.1 ETH. The goal is shown
 * in wei, so landing on it means converting through gwei. 21 × 10^k is exact
 * as a double up to 10^17, so Number is safe for the wei figures here.
 */
const STOPS = Array.from({ length: 7 }, (_, i) => ({
  eth: 21 / 10 ** (7 - i),
  gwei: 21 * 10 ** (2 + i),
  wei: 21 * 10 ** (11 + i),
}))
const TARGET = 2

const UnitConverterWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const sliderId = useId()
  const [stop, setStop] = useState(STOPS.length - 1)

  const int = numberFormat(locale)
  const eth = numberFormat(locale, { maximumSignificantDigits: 2 })
  const ethLabel = (idx: number) =>
    t("page-courses-widget-units-eth", { value: eth.format(STOPS[idx].eth) })
  const current = STOPS[stop]
  const onTarget = locked && stop === TARGET

  const handleChange = (next: number) => {
    setStop(next)
    const values = {
      eth: eth.format(STOPS[next].eth),
      wei: int.format(STOPS[next].wei),
    }
    onAnswer({
      correct: next === TARGET,
      hint:
        next < TARGET
          ? t("page-courses-widget-units-low", values)
          : t("page-courses-widget-units-high", values),
    })
  }

  const rows = [
    {
      id: "eth",
      label: t("page-courses-widget-units-row-eth"),
      value: ethLabel(stop),
    },
    {
      id: "gwei",
      label: t("page-courses-widget-units-row-gwei"),
      value: t("page-courses-widget-units-gwei", {
        value: int.format(current.gwei),
      }),
    },
  ]

  return (
    <WidgetShell>
      <div className="flex flex-col gap-1">
        <p className="m-0 flex items-center gap-2 font-bold">
          <Calculator
            className={cn("size-5 shrink-0", courseText)}
            aria-hidden
          />
          {t("page-courses-widget-units-goal")}
        </p>
        <p className="m-0 font-mono text-lg font-bold break-all">
          {t("page-courses-widget-units-wei", {
            value: int.format(STOPS[TARGET].wei),
          })}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
          <span>{t("page-courses-widget-units-label")}</span>
          <span className={cn("text-xl", courseText)}>{ethLabel(stop)}</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={stop}
          aria-valuetext={ethLabel(stop)}
          disabled={locked}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full accent-(--course)"
        />
        <div
          aria-hidden
          className="flex justify-between text-sm font-bold text-body-medium"
        >
          <span>{t("page-courses-widget-units-smaller")}</span>
          <span>{t("page-courses-widget-units-bigger")}</span>
        </div>
      </div>

      <dl
        aria-live="polite"
        className="m-0 flex flex-col gap-3 rounded-2xl bg-background p-4"
      >
        {rows.map(({ id, label, value }) => (
          <div key={id} className="flex flex-col gap-0.5">
            <dt className="text-sm font-bold text-body-medium">{label}</dt>
            <dd className="m-0 font-mono text-lg break-all">{value}</dd>
          </div>
        ))}
        {onTarget && (
          <div className="flex flex-col gap-0.5">
            <dt className="text-sm font-bold text-body-medium">
              {t("page-courses-widget-units-row-wei")}
            </dt>
            <dd className="m-0 flex items-center gap-1 font-mono text-lg font-bold break-all text-green-700 dark:text-green-400">
              {t("page-courses-widget-units-wei", {
                value: int.format(current.wei),
              })}
              <Check className="size-4 shrink-0" aria-hidden />
            </dd>
          </div>
        )}
      </dl>

      {onTarget && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-units-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default UnitConverterWidget
