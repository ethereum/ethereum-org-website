"use client"

import { useMemo, useState } from "react"
import { useLocale } from "next-intl"

import { createRandom } from "@/components/PrivacyWidgets/shared/random"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { persona } from "@/data/privacy-lesson/persona"

import { useLessonTranslations } from "../../use-lesson-translations"

import { isolate } from "./lesson-blocks"

type Amount = "odd" | "round"
type Wait = "short" | "hour" | "day" | "week"
type Unit = "minutes" | "hours" | "days"

const AMOUNTS: Record<Amount, number> = { odd: 1.337, round: 1 }
const WAITS: Wait[] = ["short", "hour", "day", "week"]
/** Option label for each wait: [key suffix, count] */
const WAIT_LABEL: Record<Wait, [string, number]> = {
  short: ["minutes", 10],
  hour: ["hours", 1],
  day: ["days", 1],
  week: ["weeks", 1],
}
/** When the matching withdrawal happens, for each wait */
const WAIT_OFFSET: Record<Wait, [Unit, number]> = {
  short: ["minutes", 10],
  hour: ["hours", 1],
  day: ["days", 1],
  week: ["days", 7],
}
/** Same-amount withdrawals in the window: an odd amount is always unique */
const CANDIDATES: Record<Wait, number> = {
  short: 2,
  hour: 5,
  day: 38,
  week: 214,
}
/** Other withdrawal sizes seen in the pool around the same time */
const DECOY_AMOUNTS = [0.5, 2, 3.2, 0.25, 1.75, 1, 5]
const ROWS_SHOWN = 6
const MAX_CANDIDATE_ROWS = 4

interface Row {
  id: string
  unit: Unit
  count: number
  amount: number
  to: string
  candidate: boolean
}

const toMinutes = (unit: Unit, count: number) =>
  unit === "minutes" ? count : unit === "hours" ? count * 60 : count * 1440

const randomAddress = (rand: ReturnType<typeof createRandom>) => {
  const hex = () => rand.int(0, 0xffff).toString(16).padStart(4, "0")
  return `0x${hex()}…${hex()}`
}

/** Deterministic sample withdrawals for one amount/wait choice */
const buildRows = (amount: Amount, wait: Wait): Row[] => {
  const rand = createRandom(
    (amount === "odd" ? 101 : 202) + WAITS.indexOf(wait)
  )
  const [unit, count] = WAIT_OFFSET[wait]
  const matching =
    amount === "odd" ? 1 : Math.min(CANDIDATES[wait], MAX_CANDIDATE_ROWS)
  const rows: Row[] = []

  for (let i = 0; i < matching; i++) {
    // The first candidate lands exactly at the chosen wait; the rest nearby
    const offset =
      i === 0 ? count : Math.max(1, count + rand.int(-1, 2) * (i + 1))
    rows.push({
      id: `match-${i}`,
      unit,
      count: unit === "minutes" ? Math.max(2, offset) : offset,
      amount: AMOUNTS[amount],
      to: randomAddress(rand),
      candidate: true,
    })
  }
  const decoys = DECOY_AMOUNTS.filter((value) => value !== AMOUNTS[amount])
  for (let i = 0; rows.length < ROWS_SHOWN; i++) {
    const near =
      unit === "minutes"
        ? rand.int(2, 30)
        : Math.max(1, count + rand.int(-1, 3))
    rows.push({
      id: `decoy-${i}`,
      unit,
      count: near,
      amount: decoys[(i + rand.int(0, decoys.length - 1)) % decoys.length],
      to: randomAddress(rand),
      candidate: false,
    })
  }
  return rows.sort(
    (a, b) => toMinutes(a.unit, a.count) - toMinutes(b.unit, b.count)
  )
}

/** "You're the analyst": match a public deposit to its pool withdrawal */
const PoolGame = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const [amount, setAmount] = useState<Amount>("odd")
  const [wait, setWait] = useState<Wait>("short")
  const [picked, setPicked] = useState<string | null>(null)

  const rows = useMemo(() => buildRows(amount, wait), [amount, wait])
  const candidates = amount === "odd" ? 1 : CANDIDATES[wait]
  const shownCandidates = rows.filter((row) => row.candidate).length
  const formatEth = (value: number) =>
    `${numberFormat(locale, { maximumFractionDigits: 3 }).format(value)} ETH`

  // A sample deposit made this morning, in the reader's own time
  const depositTime = useMemo(() => {
    const date = new Date()
    date.setHours(9, 14, 0, 0)
    return dateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }, [locale])

  const choose = (update: () => void) => {
    trackPrivacyLessonEvent("widget-used", "pool-game")
    setPicked(null)
    update()
  }

  const pickedRow = rows.find((row) => row.id === picked)
  const feedback = !pickedRow
    ? null
    : amount === "odd"
      ? pickedRow.candidate
        ? t("analysts-pool-pick-found")
        : t("analysts-pool-pick-wrong-unique")
      : pickedRow.candidate
        ? t("analysts-pool-pick-candidate", { count: candidates })
        : t("analysts-pool-pick-wrong-amount")

  const verdict =
    amount === "odd"
      ? t(`analysts-pool-say-odd-${wait}`)
      : t(`analysts-pool-say-round-${wait}`, { count: candidates })

  return (
    <section
      aria-labelledby="analysts-pool-demo-title"
      className="space-y-5 rounded-base border bg-background p-4 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 id="analysts-pool-demo-title" className="m-0 text-lg">
          {t("analysts-pool-demo-title")}
        </h4>
        <Tag status="normal" variant="outline" size="small">
          {t("analysts-pool-demo-role")}
        </Tag>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="mb-2 text-sm font-bold">
            {t("analysts-pool-amount-label")}
          </legend>
          <div className="flex flex-wrap gap-2">
            {(["odd", "round"] as const).map((option) => (
              <Button
                key={option}
                size="sm"
                variant={amount === option ? "solid" : "outline"}
                aria-pressed={amount === option}
                onClick={() => choose(() => setAmount(option))}
              >
                <span dir="ltr">{formatEth(AMOUNTS[option])}</span>
              </Button>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="mb-2 text-sm font-bold">
            {t("analysts-pool-wait-label")}
          </legend>
          <div className="flex flex-wrap gap-2">
            {WAITS.map((option) => {
              const [unit, count] = WAIT_LABEL[option]
              return (
                <Button
                  key={option}
                  size="sm"
                  variant={wait === option ? "solid" : "outline"}
                  aria-pressed={wait === option}
                  onClick={() => choose(() => setWait(option))}
                >
                  {t(`analysts-pool-wait-${unit}`, { count })}
                </Button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="space-y-1 rounded-base bg-background-highlight p-4">
        <p className="m-0 text-sm font-bold">
          {t("analysts-pool-deposit-label")}
        </p>
        <p className="m-0 flex flex-wrap items-baseline justify-between gap-x-4">
          <span>
            {t("analysts-pool-deposit-from", {
              address: isolate(persona.main),
              time: depositTime,
            })}
          </span>
          <span
            dir="ltr"
            className="font-mono font-bold text-leak-high-contrast"
          >
            {formatEth(AMOUNTS[amount])}
          </span>
        </p>
        <p className="m-0 text-sm text-body-medium">
          {t("analysts-pool-deposit-note")}
        </p>
      </div>

      <div className="space-y-2">
        <p id="analysts-pool-withdrawals" className="m-0 text-sm font-bold">
          {t("analysts-pool-withdrawals-label")}
        </p>
        <ul
          aria-labelledby="analysts-pool-withdrawals"
          className="m-0 list-none space-y-2"
        >
          {rows.map((row) => {
            const selected = picked === row.id
            const correct = selected && row.candidate
            return (
              <li key={row.id}>
                <Button
                  variant="outline"
                  isSecondary
                  aria-pressed={selected}
                  onClick={() => setPicked(row.id)}
                  className={cn(
                    "w-full flex-wrap justify-between gap-x-4 text-start font-normal",
                    selected &&
                      (correct
                        ? "border-leak bg-leak-low-contrast"
                        : "border-primary bg-primary-low-contrast")
                  )}
                >
                  <span className="text-body-medium">
                    {t(`analysts-pool-row-after-${row.unit}`, {
                      count: row.count,
                    })}
                  </span>
                  <span>
                    {t("analysts-pool-row-to", { address: isolate(row.to) })}
                  </span>
                  <span dir="ltr" className="font-mono font-semibold">
                    {formatEth(row.amount)}
                  </span>
                </Button>
              </li>
            )
          })}
        </ul>
        {candidates > shownCandidates && (
          <p className="m-0 text-sm text-body-medium">
            {t("analysts-pool-more", {
              count: candidates - shownCandidates,
              amount: formatEth(AMOUNTS[amount]),
            })}
          </p>
        )}
      </div>

      <div
        aria-live="polite"
        className="space-y-2 rounded-base border-s-4 border-s-leak bg-background-highlight p-4"
      >
        <p className="m-0 flex flex-wrap items-baseline gap-x-2">
          <span className="text-3xl font-bold text-leak-high-contrast">
            {numberFormat(locale).format(candidates)}
          </span>
          <span className="font-semibold">
            {t("analysts-pool-matches", { count: candidates })}
          </span>
        </p>
        <p className="m-0">{verdict}</p>
        {feedback && <p className="m-0 font-semibold">{feedback}</p>}
      </div>
    </section>
  )
}

export default PoolGame
