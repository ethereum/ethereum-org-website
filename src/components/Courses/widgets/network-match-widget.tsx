"use client"

import { useId, useState } from "react"
import { Check, UserRound, Wallet } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const NETWORKS = ["ethereum", "a", "b"] as const
type Network = (typeof NETWORKS)[number]

/* Fixed so server and client render the same requests */
const PAYMENTS = [
  { id: "maya", network: "a" },
  { id: "leo", network: "ethereum" },
  { id: "zoe", network: "b" },
] as const satisfies readonly { id: string; network: Network }[]

type PaymentId = (typeof PAYMENTS)[number]["id"]

const ADDRESS = "0x7ae2…4d1c"

/**
 * Each friend asked to be paid on one network; the learner picks the
 * network for every payment. Graded once all three are set.
 */
const NetworkMatchWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const baseId = useId()
  const [picks, setPicks] = useState<Partial<Record<PaymentId, Network>>>({})

  const pick = (id: PaymentId, network: Network) => {
    const next = { ...picks, [id]: network }
    setPicks(next)
    if (PAYMENTS.some(({ id }) => !next[id])) return onAnswer(null)
    const correct = PAYMENTS.every(({ id, network }) => next[id] === network)
    onAnswer({
      correct,
      hint: correct ? undefined : t("page-courses-widget-networks-hint"),
    })
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-1 rounded-2xl bg-background p-3">
        <p className="m-0 flex items-center gap-2 font-bold">
          <Wallet className={cn("size-5 shrink-0", courseText)} aria-hidden />
          {t("page-courses-widget-networks-you")}
          <span dir="ltr" className="font-mono text-sm font-normal">
            {ADDRESS}
          </span>
        </p>
        <p className="m-0 text-body-medium">
          {t("page-courses-widget-networks-note")}
        </p>
      </div>

      <ul className="m-0 flex list-none flex-col gap-3">
        {PAYMENTS.map(({ id }) => {
          const labelId = `${baseId}-${id}`
          return (
            <li
              key={id}
              className="m-0 flex flex-col gap-3 rounded-2xl border-2 border-border bg-background p-3"
            >
              <p id={labelId} className="m-0 flex items-start gap-2">
                <UserRound
                  className={cn("mt-0.5 size-5 shrink-0", courseText)}
                  aria-hidden
                />
                <span className="flex-1">
                  {t(`page-courses-widget-networks-ask-${id}`)}
                </span>
                {locked && (
                  <Check
                    className="size-5 shrink-0 text-green-700 dark:text-green-400"
                    aria-hidden
                  />
                )}
              </p>
              <RadioGroup.Root
                aria-labelledby={labelId}
                orientation="horizontal"
                value={picks[id] ?? ""}
                disabled={locked}
                onValueChange={(network) => pick(id, network as Network)}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                {NETWORKS.map((network) => (
                  <RadioGroup.Item
                    key={network}
                    value={network}
                    className={cn(
                      chunkyTile,
                      "min-h-12 cursor-pointer px-3 py-2 text-center font-bold focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                      "data-[state=checked]:border-(--course) data-[state=checked]:bg-(--course-soft)",
                      locked &&
                        "data-[state=checked]:border-green-700 data-[state=checked]:bg-success-light dark:data-[state=checked]:border-green-400 dark:data-[state=checked]:bg-success-dark",
                      "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
                    )}
                  >
                    {t(`page-courses-widget-networks-network-${network}`)}
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            </li>
          )
        })}
      </ul>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-networks-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default NetworkMatchWidget
