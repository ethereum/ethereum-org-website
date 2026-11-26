"use client"

import { useState } from "react"
import { CircleCheck, Hourglass, TriangleAlert } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const BASE_FEE = 8
const STUCK = 7
const LOW_OFFER = 3
// A replacement has to beat the old offer; wallets bump it well past the base fee
const FIXED_OFFER = 12
const HIGH_OFFER = 20

type Action = "new" | "late" | "fix"

/**
 * Sandbox: nonce 7 offers less than the base fee, so 8 and 9 wait behind it.
 * Sending more or tipping a later one changes nothing; replacing 7 clears it.
 */
const NonceQueueWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const int = numberFormat(useLocale())
  const [extra, setExtra] = useState(false)
  const [late, setLate] = useState(false)
  const [fixed, setFixed] = useState(false)
  const [last, setLast] = useState<Action | null>(null)

  const txs = [
    { nonce: STUCK, offer: fixed ? FIXED_OFFER : LOW_OFFER },
    { nonce: 8, offer: FIXED_OFFER },
    { nonce: 9, offer: late ? HIGH_OFFER : FIXED_OFFER },
    ...(extra ? [{ nonce: 10, offer: HIGH_OFFER }] : []),
  ]

  const act = (action: Action) => {
    setLast(action)
    if (action === "new") setExtra(true)
    if (action === "late") setLate(true)
    if (action === "fix") {
      setFixed(true)
      onComplete()
    }
  }

  const n = (value: number) => int.format(value)
  const buttonClass = cn(
    chunkyButtonSecondary,
    "h-auto flex-1 px-4 py-2 whitespace-normal disabled:opacity-50"
  )

  return (
    <WidgetShell>
      <p className="m-0 font-bold">
        {t("page-courses-widget-nonce-base", { value: n(BASE_FEE) })}
      </p>

      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t(
            fixed
              ? "page-courses-widget-nonce-included"
              : "page-courses-widget-nonce-waiting"
          )}
        </h3>
        <ol className="m-0 flex list-none flex-col gap-2">
          {txs.map(({ nonce, offer }) => {
            const state = fixed ? "in" : nonce === STUCK ? "low" : "behind"
            const Icon =
              state === "in"
                ? CircleCheck
                : state === "low"
                  ? TriangleAlert
                  : Hourglass
            return (
              <li
                key={nonce}
                className={cn(
                  "m-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-2xl border-2 bg-background p-3",
                  state === "low" ? "border-error" : "border-(--course-soft)"
                )}
              >
                <span className="flex flex-col">
                  <span className="font-bold">
                    {t("page-courses-widget-nonce-nonce", { number: n(nonce) })}
                  </span>
                  <span className="text-sm text-body-medium">
                    {t("page-courses-widget-nonce-offer", { value: n(offer) })}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-bold",
                    state === "low" && "text-error dark:text-red-400",
                    state === "behind" && "text-body-medium",
                    state === "in" && courseText
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {t(`page-courses-widget-nonce-state-${state}`, {
                    number: n(STUCK),
                  })}
                </span>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="flex flex-col gap-3">
        <Button
          variant="ghost"
          onClick={() => act("new")}
          disabled={fixed || extra}
          className={buttonClass}
        >
          {t("page-courses-widget-nonce-new")}
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="ghost"
            onClick={() => act("late")}
            disabled={fixed || late}
            className={buttonClass}
          >
            {t("page-courses-widget-nonce-speed", { number: n(9) })}
          </Button>
          <Button
            variant="ghost"
            onClick={() => act("fix")}
            disabled={fixed}
            className={buttonClass}
          >
            {t("page-courses-widget-nonce-speed", { number: n(STUCK) })}
          </Button>
        </div>
      </div>

      <p role="status" className="m-0">
        {t(
          last
            ? `page-courses-widget-nonce-did-${last}`
            : "page-courses-widget-nonce-start",
          { stuck: n(STUCK), next: n(10), late: n(9) }
        )}
      </p>
    </WidgetShell>
  )
}

export default NonceQueueWidget
