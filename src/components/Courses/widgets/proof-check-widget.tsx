"use client"

import { useEffect, useState } from "react"
import { BadgeCheck, CircleCheck, CircleX, PenLine, Undo2 } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

type Person = "ana" | "ben" | "operator"

/* The batch's honest result; tampering adds ETH to the operator's account */
const RESULT: { who: Person; balance: number }[] = [
  { who: "ana", balance: 3 },
  { who: "ben", balance: 1.5 },
  { who: "operator", balance: 0.2 },
]
const STOLEN = 5

type Outcome = "accepted" | "rejected"

/**
 * A ZK rollup batch arrives at its contract on Ethereum with a validity
 * proof. Verify it honest, then tamper with the result and verify again.
 * Seeing both outcomes unlocks Continue.
 */
const ProofCheckWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const [tampered, setTampered] = useState(false)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [seen, setSeen] = useState({ accepted: false, rejected: false })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && seen.accepted && seen.rejected) {
      setDone(true)
      onComplete()
    }
  }, [done, seen, onComplete])

  const num = numberFormat(locale, { maximumFractionDigits: 1 })
  const eth = (value: number) =>
    t("page-courses-widget-replay-eth", { value: num.format(value) })
  const name = (id: Person) =>
    id === "operator"
      ? t("page-courses-widget-proof-operator")
      : t(`page-courses-widget-replay-name-${id}`)

  const toggleTamper = () => {
    setTampered((on) => !on)
    // A changed batch needs checking again
    setOutcome(null)
  }

  const verify = () => {
    // The proof was made for the honest result, so any change breaks it
    const result: Outcome = tampered ? "rejected" : "accepted"
    setOutcome(result)
    setSeen((s) => ({ ...s, [result]: true }))
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-3 rounded-2xl bg-background p-4">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t("page-courses-widget-proof-batch")}
        </p>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          {RESULT.map(({ who, balance }) => {
            const changed = tampered && who === "operator"
            return (
              <div key={who} className="contents">
                <dt className="text-body-medium">{name(who)}</dt>
                <dd
                  className={cn(
                    "m-0 text-end font-mono font-bold tabular-nums",
                    changed && "text-error dark:text-red-400"
                  )}
                >
                  {eth(changed ? balance + STOLEN : balance)}
                  {changed && (
                    <span className="sr-only">
                      {" "}
                      ({t("page-courses-widget-proof-changed")})
                    </span>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
        <p className="m-0 flex items-center gap-2 text-sm">
          <BadgeCheck
            className={cn("size-5 shrink-0", courseText)}
            aria-hidden
          />
          {t("page-courses-widget-proof-attached")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="ghost"
          onClick={verify}
          className={cn(chunkyButton, "flex-1")}
        >
          {t("page-courses-widget-proof-verify")}
        </Button>
        <Button
          variant="ghost"
          onClick={toggleTamper}
          aria-pressed={tampered}
          className={cn(chunkyButtonSecondary, "flex-1")}
        >
          {tampered ? (
            <Undo2 className="rtl:-scale-x-100" aria-hidden />
          ) : (
            <PenLine aria-hidden />
          )}
          {tampered
            ? t("page-courses-widget-proof-restore")
            : t("page-courses-widget-proof-tamper", { value: eth(STOLEN) })}
        </Button>
      </div>

      <p
        role="status"
        className={cn(
          "m-0 flex min-h-6 items-start gap-2",
          outcome === "accepted" && "text-green-700 dark:text-green-400",
          outcome === "rejected" && "text-error dark:text-red-400"
        )}
      >
        {outcome === "accepted" && (
          <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
        )}
        {outcome === "rejected" && (
          <CircleX className="mt-0.5 size-5 shrink-0" aria-hidden />
        )}
        {outcome
          ? t(`page-courses-widget-proof-${outcome}`)
          : t("page-courses-widget-proof-start")}
      </p>
    </WidgetShell>
  )
}

export default ProofCheckWidget
