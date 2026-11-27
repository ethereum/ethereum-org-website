"use client"

import { useId, useState } from "react"
import { Calculator } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButtonSecondary, chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell, { StepHint } from "./widget-shell"

const VALUES = [
  { id: "hour", value: 3_600 },
  { id: "minute", value: 60 },
  { id: "slot", value: 12 },
  { id: "epoch", value: 32 },
] as const
const OPS = [
  { id: "times", symbol: "×" },
  { id: "divide", symbol: "÷" },
] as const

type ValueId = (typeof VALUES)[number]["id"]
type OpId = (typeof OPS)[number]["id"]
type Entry = { kind: "value"; id: ValueId } | { kind: "op"; id: OpId }

// Seconds in an hour over seconds in a slot
const TARGET = 300
// Three values and two signs cover every useful calculation here
const MAX_ENTRIES = 5

// Shown when a passed step comes back locked and blank
const SOLUTION: Entry[] = [
  { kind: "value", id: "hour" },
  { kind: "op", id: "divide" },
  { kind: "value", id: "slot" },
]

const valueOf = (id: ValueId) => VALUES.find((v) => v.id === id)!.value

const isComplete = (entries: Entry[]) =>
  entries.length >= 3 && entries[entries.length - 1].kind === "value"

/** Left to right, which is exact for a chain of only × and ÷ */
const evaluate = (entries: Entry[]) => {
  let result = 0
  let op: OpId = "times"
  entries.forEach((entry, i) => {
    if (entry.kind === "op") op = entry.id
    else if (i === 0) result = valueOf(entry.id)
    else
      result =
        op === "times" ? result * valueOf(entry.id) : result / valueOf(entry.id)
  })
  return result
}

/**
 * Puzzle: build the calculation from key values (seconds in a minute, in a
 * slot...) instead of reaching for a calculator; graded on the result
 */
const SlotCalcWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const uid = useId()
  const locale = useLocale()
  const int = numberFormat(locale)
  const result = numberFormat(locale, { maximumFractionDigits: 2 })
  const [entries, setEntries] = useState<Entry[]>(locked ? SOLUTION : [])

  const last = entries[entries.length - 1]
  const full = entries.length >= MAX_ENTRIES

  const report = (next: Entry[]) => {
    if (!isComplete(next)) {
      onAnswer(null)
      return
    }
    const total = evaluate(next)
    const usesEpoch = next.some((e) => e.kind === "value" && e.id === "epoch")
    const hint =
      total === 3_600
        ? "hour"
        : total === 5
          ? "minute"
          : usesEpoch
            ? "epoch"
            : "other"
    onAnswer({
      correct: Math.abs(total - TARGET) < 1e-9,
      hint: t(`page-courses-widget-slot-calc-hint-${hint}`),
    })
  }

  const update = (next: Entry[]) => {
    setEntries(next)
    report(next)
  }

  // A value after a value swaps it; a sign after a sign swaps it
  const pickValue = (id: ValueId) =>
    update(
      last?.kind === "value"
        ? [...entries.slice(0, -1), { kind: "value", id }]
        : [...entries, { kind: "value", id }]
    )
  const pickOp = (id: OpId) =>
    update(
      last?.kind === "op"
        ? [...entries.slice(0, -1), { kind: "op", id }]
        : [...entries, { kind: "op", id }]
    )

  const shown = entries.map((entry) =>
    entry.kind === "value"
      ? int.format(valueOf(entry.id))
      : OPS.find((o) => o.id === entry.id)!.symbol
  )

  return (
    <WidgetShell>
      <StepHint>{t("page-courses-widget-slot-calc-how")}</StepHint>

      <div className="flex flex-col gap-2">
        <p className="m-0 flex items-center gap-2 font-bold">
          <Calculator
            className={cn("size-5 shrink-0", courseText)}
            aria-hidden
          />
          {t("page-courses-widget-slot-calc-keys")}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {VALUES.map(({ id, value }) => (
            <button
              key={id}
              type="button"
              disabled={locked}
              aria-labelledby={`${uid}-${id}-value ${uid}-${id}-label`}
              onClick={() => pickValue(id)}
              className={cn(
                chunkyTile,
                "flex cursor-pointer flex-col items-center gap-0.5 px-3 py-2 text-center focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                "disabled:cursor-default disabled:opacity-60 disabled:active:translate-y-0 disabled:active:border-b-4"
              )}
            >
              <span
                id={`${uid}-${id}-value`}
                className="text-xl font-bold tabular-nums"
              >
                {int.format(value)}
              </span>
              <span
                id={`${uid}-${id}-label`}
                className="text-sm text-body-medium"
              >
                {t(`page-courses-widget-slot-calc-key-${id}`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {OPS.map(({ id, symbol }) => (
          <Button
            key={id}
            variant="ghost"
            aria-label={t(`page-courses-widget-slot-calc-${id}`)}
            disabled={locked || !entries.length || full}
            onClick={() => pickOp(id)}
            className={cn(
              chunkyButtonSecondary,
              "px-2 text-2xl disabled:opacity-50"
            )}
          >
            {symbol}
          </Button>
        ))}
        <Button
          variant="ghost"
          disabled={locked || !entries.length}
          onClick={() => update([])}
          className={cn(chunkyButtonSecondary, "px-2 disabled:opacity-50")}
        >
          {t("page-courses-widget-slot-calc-clear")}
        </Button>
      </div>

      <div
        role="status"
        className="flex min-h-16 flex-col justify-center gap-1 rounded-2xl bg-background p-4"
      >
        <span className="text-sm font-bold text-body-medium">
          {t("page-courses-widget-slot-calc-display")}
        </span>
        {entries.length ? (
          <span
            dir="ltr"
            className="flex flex-wrap items-baseline justify-end gap-x-2 text-end font-mono text-xl break-all tabular-nums"
          >
            {shown.join(" ")}
            {isComplete(entries) && (
              <span className={cn("font-bold", courseText)}>
                = {result.format(evaluate(entries))}
              </span>
            )}
          </span>
        ) : (
          <span className="text-body-medium">
            {t("page-courses-widget-slot-calc-empty")}
          </span>
        )}
      </div>
    </WidgetShell>
  )
}

export default SlotCalcWidget
