"use client"

import { useEffect, useId, useState } from "react"
import { ShieldCheck, TriangleAlert } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Relative values only. The deposit starts at 100 and the loan is sold off
 * once it passes the sell line, a fixed share of what the deposit is worth
 * now. The biggest loan is still under the line at the start, so it is
 * allowed, but it has the thinnest cushion.
 */
const BORROW = { little: 20, half: 45, most: 70 } as const
const VALUE = { same: 100, dip: 80, crash: 50 } as const
const SELL_LINE = 0.8

type BorrowId = keyof typeof BORROW
type ValueId = keyof typeof VALUE
const BORROW_IDS = Object.keys(BORROW) as BorrowId[]
const VALUE_IDS = Object.keys(VALUE) as ValueId[]

const Slider = <Id extends string>({
  label,
  ids,
  value,
  onChange,
  valueLabel,
}: {
  label: string
  ids: Id[]
  value: Id
  onChange: (id: Id) => void
  valueLabel: (id: Id) => string
}) => {
  const id = useId()
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex flex-col gap-1 font-bold">
        <span>{label}</span>
        <span className={cn("text-lg", courseText)}>{valueLabel(value)}</span>
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={ids.length - 1}
        step={1}
        value={ids.indexOf(value)}
        aria-valuetext={valueLabel(value)}
        onChange={(e) => onChange(ids[Number(e.target.value)])}
        className="w-full accent-(--course)"
      />
    </div>
  )
}

const CollateralWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [borrow, setBorrow] = useState<BorrowId>("little")
  const [value, setValue] = useState<ValueId>("same")
  const [completed, setCompleted] = useState(false)
  const key = (name: string) => `page-courses-widget-collateral-${name}`

  const worth = VALUE[value]
  const line = worth * SELL_LINE
  const loan = BORROW[borrow]
  const sold = loan > line

  // Done once the learner has watched a deposit get sold
  useEffect(() => {
    if (!completed && sold) {
      setCompleted(true)
      onComplete()
    }
  }, [completed, sold, onComplete])

  // Bars share one scale: the deposit's starting value fills the track
  const pct = (n: number) => `${n}%`

  return (
    <WidgetShell>
      <div className="flex flex-col gap-4">
        <Slider
          label={t(key("borrow-label"))}
          ids={BORROW_IDS}
          value={borrow}
          onChange={setBorrow}
          valueLabel={(id) => t(key(`borrow-${id}`))}
        />
        <Slider
          label={t(key("value-label"))}
          ids={VALUE_IDS}
          value={value}
          onChange={setValue}
          valueLabel={(id) => t(key(`value-${id}`))}
        />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-background p-4">
        <div className="flex flex-col gap-1">
          <p className="m-0 text-sm font-bold text-body-medium">
            {t(key("deposit"))}
          </p>
          <div
            aria-hidden
            className="relative h-5 rounded-full bg-background-highlight"
          >
            <div
              className={cn(
                "h-full rounded-full motion-safe:transition-[width] motion-safe:duration-300",
                sold ? "bg-gray-400" : "bg-(--course)"
              )}
              style={{ width: pct(worth) }}
            />
            <span
              className="absolute -top-1.5 -bottom-1.5 w-1 rounded-full bg-error motion-safe:transition-[inset-inline-start] motion-safe:duration-300"
              style={{ insetInlineStart: pct(line) }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="m-0 text-sm font-bold text-body-medium">
            {t(key("loan"))}
          </p>
          <div
            aria-hidden
            className="relative h-5 rounded-full bg-background-highlight"
          >
            <div
              className="h-full rounded-full bg-yellow-400 motion-safe:transition-[width] motion-safe:duration-300"
              style={{ width: pct(loan) }}
            />
            <span
              className="absolute -top-1.5 -bottom-1.5 w-1 rounded-full bg-error motion-safe:transition-[inset-inline-start] motion-safe:duration-300"
              style={{ insetInlineStart: pct(line) }}
            />
          </div>
        </div>
        <p className="m-0 flex items-center gap-2 text-sm text-body-medium">
          <span aria-hidden className="h-4 w-1 rounded-full bg-error" />
          {t(key("line"))}
        </p>
      </div>

      <p
        role="status"
        className={cn(
          "m-0 flex items-start gap-2 rounded-2xl bg-background p-3",
          sold && "text-error dark:text-red-400"
        )}
      >
        {sold ? (
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
        ) : (
          <ShieldCheck
            className={cn("mt-0.5 size-5 shrink-0", courseText)}
            aria-hidden
          />
        )}
        {t(key(sold ? "sold" : loan > line * 0.8 ? "close" : "safe"))}
      </p>
    </WidgetShell>
  )
}

export default CollateralWidget
