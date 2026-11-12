"use client"

import { useEffect, useState } from "react"
import {
  Check,
  CircleDashed,
  Coins,
  Lock,
  PencilLine,
  ScrollText,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const SLOTS = 3
const JAR_ADDRESS = "0x7a3f9c2e5b1d84a06f2c9e3b7d1a5c8e4f0b6c91"
const RULES = ["add", "full", "nobody"] as const

type Outcome = "added" | "paid" | "creator" | "edit"
type Goal = "paid" | "creator" | "edit"
const GOALS: Goal[] = ["paid", "creator", "edit"]

/**
 * A class-trip jar contract: it holds ETH at its own address, pays out by its
 * own rule, and turns down its creator and any attempt to change the rules.
 */
const JarContractWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const key = (name: string) => `page-courses-widget-jar-${name}`

  const [filled, setFilled] = useState(0)
  const [trips, setTrips] = useState(0)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [seen, setSeen] = useState<Goal[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && GOALS.every((g) => seen.includes(g))) {
      setDone(true)
      onComplete()
    }
  }, [done, seen, onComplete])

  const record = (next: Outcome) => {
    setOutcome(next)
    if (next !== "added" && !seen.includes(next)) setSeen([...seen, next])
  }

  const add = () => {
    if (filled + 1 < SLOTS) {
      setFilled(filled + 1)
      return record("added")
    }
    // The deposit that fills the jar runs the payout rule in the same step
    setFilled(0)
    setTrips(trips + 1)
    record("paid")
  }

  const refused = outcome === "creator" || outcome === "edit"

  return (
    <WidgetShell>
      <div className="flex flex-col gap-4 rounded-2xl border-2 border-(--course-soft) bg-background p-4">
        <div className="flex flex-col gap-1">
          <p className="m-0 flex items-center gap-2 text-lg font-bold">
            <ScrollText
              className={cn("size-5 shrink-0", courseText)}
              aria-hidden
            />
            {t(key("title"))}
          </p>
          <p className="m-0 flex flex-wrap items-baseline gap-x-2 text-sm text-body-medium">
            <span>{t(key("address"))}</span>
            <span dir="ltr" className="font-mono break-all text-body">
              {JAR_ADDRESS}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-sm font-bold text-body-medium">
            {t(key("holds"))}
          </span>
          <span className="flex items-center gap-2" aria-hidden>
            {Array.from({ length: SLOTS }, (_, i) =>
              i < filled ? (
                <Coins
                  key={i}
                  className="size-8 text-yellow-700 dark:text-yellow-400"
                />
              ) : (
                <CircleDashed key={i} className="size-8 text-body-medium" />
              )
            )}
          </span>
          <span className="sr-only">
            {t(
              key(
                filled === 0
                  ? "level-empty"
                  : filled === SLOTS - 1
                    ? "level-almost"
                    : "level-some"
              )
            )}
          </span>
        </div>

        {trips > 0 && (
          <p className="m-0 flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
            <Check className="size-5 shrink-0" aria-hidden />
            {t(key("trips"))}
          </p>
        )}

        <div className="flex flex-col gap-2 border-t-2 border-(--course-soft) pt-3">
          <p className="m-0 flex items-center gap-2 text-sm font-bold tracking-wide text-body-medium uppercase">
            <Lock className={cn("size-4", courseText)} aria-hidden />
            {t(key("rules"))}
          </p>
          <ol className="m-0 flex list-none flex-col gap-1">
            {RULES.map((rule) => (
              <li key={rule} className="m-0 flex items-start gap-2">
                <Check
                  className={cn("mt-0.5 size-4 shrink-0", courseText)}
                  aria-hidden
                />
                {t(key(`rule-${rule}`))}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button variant="ghost" onClick={add} className={chunkyButton}>
          <Coins aria-hidden />
          {t(key("add"))}
        </Button>
        <Button
          variant="ghost"
          onClick={() => record("creator")}
          className={chunkyButtonSecondary}
        >
          {t(key("take"))}
        </Button>
        <Button
          variant="ghost"
          onClick={() => record("edit")}
          className={chunkyButtonSecondary}
        >
          <PencilLine aria-hidden />
          {t(key("edit"))}
        </Button>
      </div>

      <p
        role="status"
        className={cn(
          "m-0 min-h-6",
          refused
            ? "text-error dark:text-red-400"
            : outcome === "paid"
              ? "text-green-700 dark:text-green-400"
              : "text-body"
        )}
      >
        {outcome && t(key(`outcome-${outcome}`))}
      </p>
    </WidgetShell>
  )
}

export default JarContractWidget
