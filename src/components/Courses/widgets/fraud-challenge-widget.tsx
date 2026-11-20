"use client"

import { useId, useState } from "react"
import { Hourglass } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import {
  chunkyTile,
  courseText,
  pickedMarker,
  pickedTile,
  type PickResult,
} from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

type Person = "ana" | "ben" | "cai" | "dev"

interface Batch {
  id: string
  tx: { from: Person; to: Person; amount: number }
  /** Balances before, and the balances the poster claims after */
  rows: { who: Person; before: number; claimed: number }[]
}

/*
 * Batch two creates ETH from nothing: Dev gains 2 when Cai only sent 1.
 * The others add up, and batch three starts from batch one's results.
 */
const BATCHES: Batch[] = [
  {
    id: "one",
    tx: { from: "ana", to: "ben", amount: 1.5 },
    rows: [
      { who: "ana", before: 4, claimed: 2.5 },
      { who: "ben", before: 1, claimed: 2.5 },
    ],
  },
  {
    id: "two",
    tx: { from: "cai", to: "dev", amount: 1 },
    rows: [
      { who: "cai", before: 3, claimed: 2 },
      { who: "dev", before: 0.5, claimed: 2.5 },
    ],
  },
  {
    id: "three",
    tx: { from: "ben", to: "ana", amount: 0.5 },
    rows: [
      { who: "ben", before: 2.5, claimed: 2 },
      { who: "ana", before: 2.5, claimed: 3 },
    ],
  },
]
const ANSWER = "two"

/** Days into the challenge period, out of about seven */
const DAY = 2
const WINDOW = 7

/**
 * Three optimistic-rollup batches with their claimed results; challenge the
 * one that doesn't add up. Single pick, graded.
 */
const FraudChallengeWidget = ({ onAnswer, locked, wrong }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const labelId = useId()
  const [picked, setPicked] = useState("")

  const num = numberFormat(locale, { maximumFractionDigits: 1 })
  const int = numberFormat(locale)
  const name = (id: Person) => t(`page-courses-widget-replay-name-${id}`)
  const eth = (value: number) =>
    t("page-courses-widget-replay-eth", { value: num.format(value) })

  const resultFor = (id: string): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }

  const pick = (id: string) => {
    setPicked(id)
    onAnswer({
      correct: id === ANSWER,
      hint:
        id === ANSWER
          ? undefined
          : t("page-courses-widget-challenge-hint-valid"),
    })
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-2 rounded-2xl bg-background p-3">
        <p className="m-0 flex items-center gap-2 font-bold">
          <Hourglass
            className={cn("size-5 shrink-0", courseText)}
            aria-hidden
          />
          {t("page-courses-widget-challenge-window", {
            day: int.format(DAY),
            total: int.format(WINDOW),
          })}
        </p>
        <div
          aria-hidden
          className="h-3 overflow-hidden rounded-full border border-border bg-background-highlight"
        >
          <div
            className="h-full rounded-full bg-(--course)"
            style={{ width: `${(DAY / WINDOW) * 100}%` }}
          />
        </div>
      </div>

      <p
        id={labelId}
        className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase"
      >
        {t("page-courses-widget-challenge-posted")}
      </p>
      <RadioGroup.Root
        aria-labelledby={labelId}
        className="flex flex-col gap-3"
        value={picked}
        disabled={locked}
        onValueChange={pick}
      >
        {BATCHES.map(({ id, tx, rows }, idx) => (
          <RadioGroup.Item
            key={id}
            value={id}
            data-result={resultFor(id)}
            className={cn(
              chunkyTile,
              "group/option flex w-full cursor-pointer items-start gap-3 p-3 text-start focus-visible:outline-4 focus-visible:outline-(--course-soft)",
              pickedTile,
              "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
            )}
          >
            <Center
              aria-hidden
              className={cn(
                "size-8 shrink-0 rounded-full",
                pickedMarker(resultFor(id))
              )}
            >
              {String.fromCharCode(65 + idx)}
            </Center>
            <span className="flex min-w-0 flex-1 flex-col gap-2">
              <span className="font-bold">
                {t("page-courses-widget-replay-tx", {
                  from: name(tx.from),
                  to: name(tx.to),
                  amount: eth(tx.amount),
                })}
              </span>
              <span className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-1 text-sm">
                <span />
                <span className="text-end font-bold text-body-medium">
                  {t("page-courses-widget-challenge-before")}
                </span>
                <span className="text-end font-bold text-body-medium">
                  {t("page-courses-widget-challenge-claimed")}
                </span>
                {rows.map(({ who, before, claimed }) => (
                  <span key={who} className="contents">
                    <span>{name(who)}</span>
                    <span className="text-end font-mono tabular-nums">
                      {eth(before)}
                    </span>
                    <span className="text-end font-mono tabular-nums">
                      {eth(claimed)}
                    </span>
                  </span>
                ))}
              </span>
            </span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-challenge-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default FraudChallengeWidget
