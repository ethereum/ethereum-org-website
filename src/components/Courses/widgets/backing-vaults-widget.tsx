"use client"

import { useEffect, useId, useState } from "react"
import { ShieldCheck, TriangleAlert, Vault } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Relative values only; the learner sees bars and words, never numbers.
 * Both vaults back the same coins (1). `just` locked exactly that much ETH,
 * `extra` locked half again, so it survives the smaller drops.
 */
const COINS = 1
const VAULTS = [
  { id: "just", locked: 1 },
  { id: "extra", locked: 1.5 },
] as const
const PRICES = [
  { id: "today", factor: 1 },
  { id: "dip", factor: 0.9 },
  { id: "lower", factor: 0.8 },
  { id: "much", factor: 0.7 },
  { id: "crash", factor: 0.6 },
] as const
const SCALE = Math.max(...VAULTS.map(({ locked }) => locked))
const pct = (value: number) => `${(value / SCALE) * 100}%`

/** Tokens course: drop the price of ETH and watch two vaults' backing */
const BackingVaultsWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const sliderId = useId()
  const [stop, setStop] = useState(0)
  const [completed, setCompleted] = useState(false)

  const price = PRICES[stop]
  const priceLabel = (idx: number) =>
    t(`page-courses-widget-backing-vaults-price-${PRICES[idx].id}`)
  const shortBy = VAULTS.filter(
    ({ locked }) => locked * price.factor < COINS
  ).map(({ id }) => id)

  // Done once the price has fallen far enough to sink both vaults
  useEffect(() => {
    if (!completed && shortBy.length === VAULTS.length) {
      setCompleted(true)
      onComplete()
    }
  }, [completed, shortBy.length, onComplete])

  const status =
    shortBy.length === 0 ? "safe" : shortBy.length === 1 ? "one" : "both"

  return (
    <WidgetShell>
      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
          <span>{t("page-courses-widget-backing-vaults-price")}</span>
          <span className={cn("text-xl", courseText)}>{priceLabel(stop)}</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={PRICES.length - 1}
          step={1}
          value={stop}
          aria-valuetext={priceLabel(stop)}
          onChange={(e) => setStop(Number(e.target.value))}
          className="w-full accent-(--course)"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {VAULTS.map(({ id, locked }) => {
          const value = locked * price.factor
          const short = value < COINS
          return (
            <section
              key={id}
              aria-labelledby={`${sliderId}-${id}`}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border-2 bg-background p-4 transition-colors",
                short
                  ? "border-error dark:border-red-400"
                  : "border-transparent"
              )}
            >
              <h3
                id={`${sliderId}-${id}`}
                className="m-0 flex items-center gap-2 text-md font-bold"
              >
                <Vault
                  className={cn("size-5 shrink-0", courseText)}
                  aria-hidden
                />
                {t(`page-courses-widget-backing-vaults-vault-${id}`)}
              </h3>
              {/* Two bars on one scale: what's locked against what the coins need */}
              <div aria-hidden className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-body-medium">
                    {t("page-courses-widget-backing-vaults-locked")}
                  </span>
                  <div className="h-4 overflow-hidden rounded-full bg-background-highlight">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none",
                        short ? "bg-red-600" : "bg-(--course)"
                      )}
                      style={{ width: pct(value) }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-body-medium">
                    {t("page-courses-widget-backing-vaults-coins")}
                  </span>
                  <div className="h-4 overflow-hidden rounded-full bg-background-highlight">
                    <div
                      className="h-full rounded-full bg-body-medium"
                      style={{ width: pct(COINS) }}
                    />
                  </div>
                </div>
              </div>
              <p
                className={cn(
                  "m-0 flex items-start gap-2 font-bold",
                  short
                    ? "text-error dark:text-red-400"
                    : "text-green-700 dark:text-green-400"
                )}
              >
                {short ? (
                  <TriangleAlert
                    className="mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                ) : (
                  <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
                )}
                {t(
                  short
                    ? "page-courses-widget-backing-vaults-short"
                    : "page-courses-widget-backing-vaults-enough"
                )}
              </p>
            </section>
          )
        })}
      </div>

      <p role="status" className="m-0">
        {t(`page-courses-widget-backing-vaults-status-${status}`)}
      </p>
    </WidgetShell>
  )
}

export default BackingVaultsWidget
