"use client"

import { useState } from "react"
import { Minus, Plus, ScrollText, Send } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

// Alice sends Bob 30; Carol is a bystander whose balance must not move
const HOLDERS = [
  { id: "alice", before: 50, after: 20 },
  { id: "bob", before: 20, after: 50 },
  { id: "carol", before: 10, after: 10 },
] as const
type HolderId = (typeof HOLDERS)[number]["id"]

const AMOUNT = 30
const STEP = 10
const MAX = 100
const TOTAL = HOLDERS.reduce((sum, h) => sum + h.before, 0)

const initial = () =>
  Object.fromEntries(HOLDERS.map(({ id, before }) => [id, before])) as Record<
    HolderId,
    number
  >

const TokenLedgerWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const int = numberFormat(useLocale())
  const [balances, setBalances] = useState(initial)

  const name = (id: HolderId) => t(`page-courses-widget-ledger-name-${id}`)
  const total = HOLDERS.reduce((sum, { id }) => sum + balances[id], 0)

  const adjust = (id: HolderId, delta: number) => {
    const next = { ...balances, [id]: balances[id] + delta }
    setBalances(next)
    const nextTotal = HOLDERS.reduce((sum, h) => sum + next[h.id], 0)
    onAnswer({
      correct: HOLDERS.every((h) => next[h.id] === h.after),
      hint:
        nextTotal !== TOTAL
          ? t("page-courses-widget-ledger-hint-total", {
              total: int.format(nextTotal),
              expected: int.format(TOTAL),
            })
          : t("page-courses-widget-ledger-hint-wrong", {
              amount: int.format(AMOUNT),
            }),
    })
  }

  return (
    <WidgetShell>
      <p className="m-0 flex items-start gap-2 rounded-2xl bg-background p-3 font-bold">
        <Send
          className={cn("mt-0.5 size-5 shrink-0", courseText)}
          aria-hidden
        />
        {t("page-courses-widget-ledger-transfer", {
          from: name("alice"),
          to: name("bob"),
          amount: int.format(AMOUNT),
        })}
      </p>

      <div className="flex flex-col gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-4">
        <p className="m-0 flex items-center gap-2 text-sm font-bold tracking-wide text-body-medium uppercase">
          <ScrollText className={cn("size-4", courseText)} aria-hidden />
          {t("page-courses-widget-ledger-contract")}
        </p>
        <ul className="m-0 flex list-none flex-col gap-3">
          {HOLDERS.map(({ id, before }) => (
            <li
              key={id}
              className="m-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-2 border-(--course-softer) pb-3 last:border-b-0 last:pb-0"
            >
              <span className="flex flex-col">
                <span className="font-bold">{name(id)}</span>
                <span className="text-sm text-body-medium">
                  {t("page-courses-widget-ledger-before", {
                    amount: int.format(before),
                  })}
                </span>
              </span>
              <div
                role="group"
                aria-label={t("page-courses-widget-ledger-after-label", {
                  name: name(id),
                })}
                className="flex items-center gap-2"
              >
                <Button
                  variant="ghost"
                  onClick={() => adjust(id, -STEP)}
                  disabled={locked || balances[id] <= 0}
                  aria-label={t("page-courses-widget-ledger-less", {
                    name: name(id),
                  })}
                  className={cn(chunkyButtonSecondary, "min-h-11 px-3")}
                >
                  <Minus />
                </Button>
                <output
                  aria-live="polite"
                  className={cn(
                    "min-w-14 text-center text-xl font-black tabular-nums",
                    balances[id] !== before && courseText
                  )}
                >
                  {int.format(balances[id])}
                </output>
                <Button
                  variant="ghost"
                  onClick={() => adjust(id, STEP)}
                  disabled={locked || balances[id] >= MAX}
                  aria-label={t("page-courses-widget-ledger-more", {
                    name: name(id),
                  })}
                  className={cn(chunkyButtonSecondary, "min-h-11 px-3")}
                >
                  <Plus />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p
          aria-live="polite"
          className="m-0 flex justify-between border-t-2 border-(--course-soft) pt-3 font-bold"
        >
          <span>{t("page-courses-widget-ledger-total")}</span>
          <span
            className={cn(
              "tabular-nums",
              total !== TOTAL && "text-error dark:text-red-400"
            )}
          >
            {int.format(total)}
          </span>
        </p>
      </div>

      {locked && (
        <p className="m-0 font-bold text-green-700 dark:text-green-400">
          {t("page-courses-widget-ledger-hit", {
            amount: int.format(AMOUNT),
          })}
        </p>
      )}
    </WidgetShell>
  )
}

export default TokenLedgerWidget
