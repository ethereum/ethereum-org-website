"use client"

import { useId, useState } from "react"
import { Check, Fuel } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const GAS_USED = 21_000
const TARGET_PRICE = 10
const GWEI_PER_ETH = 1_000_000_000
// 15 stops: few enough to land on the target without pixel-hunting
const PRICE_STEP = 2
const PRICE_MAX = 30

const GasFeeWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const sliderId = useId()
  const [price, setPrice] = useState(PRICE_STEP)

  const int = numberFormat(locale)
  const eth = numberFormat(locale, { maximumSignificantDigits: 4 })
  const fee = GAS_USED * price
  // Only confirmed once the learner checks, so landing on it is their call
  const onTarget = locked && price === TARGET_PRICE

  const handleChange = (next: number) => {
    setPrice(next)
    const fee = int.format(GAS_USED * next)
    onAnswer({
      correct: next === TARGET_PRICE,
      hint:
        next < TARGET_PRICE
          ? t("page-courses-widget-gas-low", { fee })
          : t("page-courses-widget-gas-high", { fee }),
    })
  }

  return (
    <WidgetShell>
      <p className="m-0 flex items-center gap-2 font-bold">
        <Fuel className={cn("size-5", courseText)} aria-hidden />
        {t("page-courses-widget-gas-goal", {
          target: int.format(GAS_USED * TARGET_PRICE),
        })}
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex justify-between font-bold">
          <span>{t("page-courses-widget-gas-price")}</span>
          <span className={courseText}>
            {t("page-courses-widget-gas-unit", { value: int.format(price) })}
          </span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={PRICE_STEP}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={price}
          aria-valuetext={t("page-courses-widget-gas-unit", {
            value: int.format(price),
          })}
          disabled={locked}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full accent-(--course)"
        />
      </div>

      <div
        className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono"
        aria-live="polite"
      >
        <span className="font-sans text-body-medium">
          {t("page-courses-widget-gas-used")}
        </span>
        <span>{int.format(GAS_USED)}</span>
        <span className="font-sans text-body-medium">
          {t("page-courses-widget-gas-price")}
        </span>
        <span>
          × {t("page-courses-widget-gas-unit", { value: int.format(price) })}
        </span>
        <span className="font-sans font-bold">
          {t("page-courses-widget-gas-fee")}
        </span>
        <span
          className={cn(
            "flex items-center gap-1 font-bold",
            onTarget && "text-green-700 dark:text-green-400"
          )}
        >
          {t("page-courses-widget-gas-unit", { value: int.format(fee) })}
          {onTarget && <Check className="size-4" aria-hidden />}
        </span>
        <span />
        <span className="text-body-medium">
          {t("page-courses-widget-gas-eth", {
            value: eth.format(fee / GWEI_PER_ETH),
          })}
        </span>
      </div>

      {onTarget && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-gas-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default GasFeeWidget
