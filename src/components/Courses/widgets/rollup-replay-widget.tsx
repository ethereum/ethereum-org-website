"use client"

import { useEffect, useState } from "react"
import { Check, CircleDashed, Play, RotateCcw, ServerOff } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const PEOPLE = ["ana", "ben", "cai"] as const
type Person = (typeof PEOPLE)[number]

const START: Record<Person, number> = { ana: 5, ben: 2, cai: 0 }

/* Order matters: Ben can only pay Cai after Ana has paid Ben */
const BATCH: { from: Person; to: Person; amount: number }[] = [
  { from: "ana", to: "ben", amount: 1.5 },
  { from: "ben", to: "cai", amount: 2 },
  { from: "cai", to: "ana", amount: 0.5 },
  { from: "ana", to: "cai", amount: 1 },
]

const stateAfter = (count: number) =>
  BATCH.slice(0, count).reduce(
    (state, { from, to, amount }) => ({
      ...state,
      [from]: state[from] - amount,
      [to]: state[to] + amount,
    }),
    START
  )

/**
 * The operator is offline; replaying the batch it posted to Ethereum from
 * the starting balances rebuilds the rollup's state. Replaying every
 * transaction unlocks Continue.
 */
const RollupReplayWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const [replayed, setReplayed] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && replayed === BATCH.length) {
      setDone(true)
      onComplete()
    }
  }, [done, replayed, onComplete])

  const num = numberFormat(locale, { maximumFractionDigits: 1 })
  const name = (id: Person) => t(`page-courses-widget-replay-name-${id}`)
  const eth = (value: number) =>
    t("page-courses-widget-replay-eth", { value: num.format(value) })
  const state = stateAfter(replayed)
  const finished = replayed === BATCH.length

  const txLabel = (index: number) => {
    const { from, to, amount } = BATCH[index]
    return t("page-courses-widget-replay-tx", {
      from: name(from),
      to: name(to),
      amount: eth(amount),
    })
  }

  return (
    <WidgetShell>
      <p className="m-0 flex items-center gap-2 font-bold">
        <ServerOff className={cn("size-5 shrink-0", courseText)} aria-hidden />
        {t("page-courses-widget-replay-offline")}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-2xl bg-background p-4">
          <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
            {t("page-courses-widget-replay-batch")}
          </p>
          <ol className="m-0 flex list-none flex-col gap-2">
            {BATCH.map((_, i) => (
              <li key={i} className="m-0 flex items-start gap-2">
                {i < replayed ? (
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-green-700 dark:text-green-400"
                    aria-hidden
                  />
                ) : (
                  <CircleDashed
                    className="mt-0.5 size-5 shrink-0 text-body-medium"
                    aria-hidden
                  />
                )}
                <span className={cn(i === replayed && "font-bold")}>
                  {txLabel(i)}
                  {i < replayed && (
                    <span className="sr-only">
                      {" "}
                      ({t("page-courses-widget-replay-done")})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-background p-4">
          <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
            {finished
              ? t("page-courses-widget-replay-state-rebuilt")
              : t("page-courses-widget-replay-state")}
          </p>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {PEOPLE.map((id) => (
              <div key={id} className="contents">
                <dt className="text-body-medium">{name(id)}</dt>
                <dd className="m-0 text-end font-mono font-bold tabular-nums">
                  {eth(state[id])}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="ghost"
          onClick={() => setReplayed((n) => n + 1)}
          disabled={finished}
          className={cn(chunkyButton, "flex-1")}
        >
          <Play aria-hidden />
          {t("page-courses-widget-replay-next")}
        </Button>
        {replayed > 0 && (
          <Button
            variant="ghost"
            onClick={() => setReplayed(0)}
            className={chunkyButtonSecondary}
          >
            <RotateCcw aria-hidden />
            {t("page-courses-widget-replay-reset")}
          </Button>
        )}
      </div>

      <p role="status" className="m-0">
        {finished
          ? t("page-courses-widget-replay-finished")
          : replayed > 0
            ? t("page-courses-widget-replay-step", {
                tx: txLabel(replayed - 1),
              })
            : t("page-courses-widget-replay-start")}
      </p>
    </WidgetShell>
  )
}

export default RollupReplayWidget
