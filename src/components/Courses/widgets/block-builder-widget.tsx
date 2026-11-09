"use client"

import { useState } from "react"
import { Check, Coins } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { isoProjection } from "../art/iso"
import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const GAS_LIMIT = 200_000
const TIP_TARGET = 800_000

/*
 * Tip per gas in whole gwei so totals sum exactly. The only set that clears
 * the target within the limit is the four best payers per unit of gas
 * (f, c, d, a): 187,000 gas, 838,000 gwei.
 */
const POOL = [
  { id: "a", gas: 21_000, tipPerGas: 3 },
  { id: "b", gas: 150_000, tipPerGas: 1 },
  { id: "c", gas: 21_000, tipPerGas: 5 },
  { id: "d", gas: 100_000, tipPerGas: 4 },
  { id: "e", gas: 60_000, tipPerGas: 1 },
  { id: "f", gas: 45_000, tipPerGas: 6 },
] as const

type TxId = (typeof POOL)[number]["id"]

const tipOf = (tx: (typeof POOL)[number]) => tx.gas * tx.tipPerGas

const iso = isoProjection(110, 150)
const BOX = { w: 70, d: 70, h: 120 }
const outline = iso.box(0, 0, 0, BOX.w, BOX.d, BOX.h)
const floor = iso.box(-8, -8, -10, BOX.w + 16, BOX.d + 16, 10)
const corner = (x: number, y: number) =>
  [iso.P(x, y, 0), iso.P(x, y, BOX.h)] as const

const BlockBuilderWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const reduceMotion = useReducedMotion()
  const int = numberFormat(locale)

  const [picked, setPicked] = useState<TxId[]>([])

  const included = picked.map((id) => POOL.find((tx) => tx.id === id)!)
  const gasUsed = included.reduce((sum, tx) => sum + tx.gas, 0)
  const tips = included.reduce((sum, tx) => sum + tipOf(tx), 0)
  const hit = tips >= TIP_TARGET

  const toggle = (id: TxId) => {
    const next = picked.includes(id)
      ? picked.filter((p) => p !== id)
      : [...picked, id]
    setPicked(next)
    const nextTips = next
      .map((p) => POOL.find((tx) => tx.id === p)!)
      .reduce((sum, tx) => sum + tipOf(tx), 0)
    onAnswer(
      next.length
        ? {
            correct: nextTips >= TIP_TARGET,
            hint: t("page-courses-widget-block-low", {
              tips: int.format(nextTips),
            }),
          }
        : null
    )
  }

  // Slabs stack bottom-up in the order they were added
  let z = 0
  const slabs = included.map((tx) => {
    const h = (tx.gas / GAS_LIMIT) * BOX.h
    const slab = {
      id: tx.id,
      box: iso.box(4, 4, z, BOX.w - 8, BOX.d - 8, h - 1.5),
    }
    z += h
    return slab
  })

  return (
    <WidgetShell>
      <p className="m-0 flex items-center gap-2 font-bold">
        <Coins className={cn("size-5", courseText)} aria-hidden />
        {t("page-courses-widget-block-goal", {
          target: int.format(TIP_TARGET),
        })}
      </p>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col gap-3">
          <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
            {t("page-courses-widget-block-block")}
          </p>
          <svg viewBox="0 10 220 225" aria-hidden className="w-full">
            <polygon points={floor.top} className="fill-(--course-soft)" />
            <polygon
              points={floor.left}
              className="fill-(--course-soft) opacity-70"
            />
            <polygon
              points={floor.right}
              className="fill-(--course-soft) opacity-50"
            />
            {/* back edges */}
            {[corner(0, 0), corner(BOX.w, 0), corner(0, BOX.d)].map(
              ([a, b], i) => (
                <line
                  key={i}
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  className="stroke-(--course) opacity-40"
                  strokeDasharray="4 4"
                />
              )
            )}
            {slabs.map(({ id, box }) => (
              <motion.g
                key={id}
                initial={reduceMotion ? false : { y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <polygon points={box.left} className="fill-(--course)" />
                <polygon
                  points={box.right}
                  className="fill-(--course-strong)"
                />
                <polygon
                  points={box.top}
                  fill="color-mix(in oklab, var(--course) 55%, white)"
                />
              </motion.g>
            ))}
            <polygon
              points={outline.top}
              fill="none"
              className={cn(
                "stroke-(--course) transition-colors",
                hit && "stroke-success"
              )}
              strokeWidth={1.5}
              strokeDasharray={hit ? undefined : "4 4"}
            />
            {[corner(BOX.w, BOX.d)].map(([a, b], i) => (
              <line
                key={i}
                x1={a[0]}
                y1={a[1]}
                x2={b[0]}
                y2={b[1]}
                className="stroke-(--course)"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm font-bold">
              <span>{t("page-courses-widget-block-gas")}</span>
              <span dir="ltr" className="font-mono tabular-nums">
                {t("page-courses-widget-block-limit", {
                  used: int.format(gasUsed),
                  limit: int.format(GAS_LIMIT),
                })}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-(--course) transition-[width] duration-300"
                style={{ width: `${(gasUsed / GAS_LIMIT) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm font-bold">
              <span>{t("page-courses-widget-block-tips")}</span>
              <span
                dir="ltr"
                className={cn(
                  "font-mono tabular-nums",
                  hit ? "text-green-700 dark:text-green-400" : "text-body"
                )}
              >
                {int.format(tips)}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-background">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-300",
                  hit ? "bg-success" : "bg-yellow-400"
                )}
                style={{ width: `${Math.min(tips / TIP_TARGET, 1) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
            {t("page-courses-widget-block-pool")}
          </p>
          <ul className="m-0 grid list-none grid-cols-2 gap-3">
            {POOL.map((tx) => {
              const inBlock = picked.includes(tx.id)
              const fits = inBlock || gasUsed + tx.gas <= GAS_LIMIT
              return (
                <li key={tx.id} className="m-0">
                  <Button
                    variant="ghost"
                    onClick={() => toggle(tx.id)}
                    disabled={locked || !fits}
                    aria-pressed={inBlock}
                    className={cn(
                      chunkyTile,
                      "flex h-full w-full flex-col items-start gap-2 p-3 text-start text-body disabled:opacity-50 hover-link:!text-body",
                      inBlock &&
                        "border-(--course) bg-(--course-soft) hover:bg-(--course-soft)"
                    )}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="text-sm font-bold" dir="ltr">
                        {t("page-courses-widget-block-tx-gas", {
                          gas: int.format(tx.gas),
                        })}
                      </span>
                      {inBlock && (
                        <Check
                          className={cn("size-4", courseText)}
                          aria-hidden
                        />
                      )}
                    </span>
                    {/* bar width shows how much block space it takes */}
                    <span
                      aria-hidden
                      className="h-2 rounded-full bg-(--course)"
                      style={{ width: `${(tx.gas / 150_000) * 100}%` }}
                    />
                    <span className="flex items-center gap-1 text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                      <Coins className="size-4" aria-hidden />
                      {t("page-courses-widget-block-tx-tip", {
                        tip: int.format(tipOf(tx)),
                      })}
                    </span>
                    {!fits && (
                      <span className="text-sm font-bold text-error dark:text-red-400">
                        {t("page-courses-widget-block-full")}
                      </span>
                    )}
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {locked && (
        <p className="m-0 font-bold text-green-700 dark:text-green-400">
          {t("page-courses-widget-block-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default BlockBuilderWidget
