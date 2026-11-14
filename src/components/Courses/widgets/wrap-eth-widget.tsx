"use client"

import { useEffect, useState } from "react"
import { Gift, Vault, Wallet } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/* Balances are counted in half-ETH coins so every move is exact */
const COINS = 4
const COIN = 0.5

type Action = "wrap" | "unwrap"

const WrapEthWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const [wrapped, setWrapped] = useState(0)
  const [done, setDone] = useState<Record<Action, boolean>>({
    wrap: false,
    unwrap: false,
  })
  const [last, setLast] = useState<Action | null>(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!completed && done.wrap && done.unwrap) {
      setCompleted(true)
      onComplete()
    }
  }, [completed, done, onComplete])

  const num = numberFormat(locale, { maximumFractionDigits: 1 })
  const amount = (coins: number) => num.format(coins * COIN)
  const eth = COINS - wrapped

  const act = (action: Action) => {
    setWrapped((w) => w + (action === "wrap" ? 1 : -1))
    setDone((d) => ({ ...d, [action]: true }))
    setLast(action)
  }

  const coin = amount(1)
  const ethLabel = t("page-courses-widget-wrap-ticker-eth")
  const wethLabel = t("page-courses-widget-wrap-ticker-weth")

  return (
    <WidgetShell>
      {/* Each coin is half an ETH; wrapping swaps its face, never its count */}
      <div aria-hidden className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: COINS }, (_, i) => {
          const isWeth = i >= eth
          return (
            <span
              key={i}
              className={cn(
                "flex size-14 flex-col items-center justify-center rounded-full border-2 text-sm font-bold motion-safe:transition-colors motion-safe:duration-300",
                isWeth
                  ? "border-(--course) bg-(--course-soft) text-(--course-strong) dark:text-(--course-bright)"
                  : "border-(--course-strong) bg-(--course) text-white"
              )}
            >
              {isWeth && <Gift className="size-4" />}
              {isWeth ? wethLabel : ethLabel}
            </span>
          )
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-2xl bg-background p-4">
          <p className="m-0 flex items-center gap-2 font-bold">
            <Wallet className={cn("size-5 shrink-0", courseText)} aria-hidden />
            {t("page-courses-widget-wrap-wallet")}
          </p>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="text-body-medium">{ethLabel}</dt>
            <dd className="m-0 text-end font-mono font-bold">
              {num.format(eth * COIN)}
            </dd>
            <dt className="text-body-medium">{wethLabel}</dt>
            <dd className="m-0 text-end font-mono font-bold">
              {num.format(wrapped * COIN)}
            </dd>
          </dl>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-background p-4">
          <p className="m-0 flex items-center gap-2 font-bold">
            <Vault className={cn("size-5 shrink-0", courseText)} aria-hidden />
            {t("page-courses-widget-wrap-program")}
          </p>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="text-body-medium">
              {t("page-courses-widget-wrap-held")}
            </dt>
            <dd className="m-0 text-end font-mono font-bold">
              {t("page-courses-widget-wrap-eth", {
                value: num.format(wrapped * COIN),
              })}
            </dd>
          </dl>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="ghost"
          onClick={() => act("wrap")}
          disabled={eth === 0}
          className={cn(chunkyButton, "flex-1")}
        >
          {t("page-courses-widget-wrap-wrap", { value: coin })}
        </Button>
        <Button
          variant="ghost"
          onClick={() => act("unwrap")}
          disabled={wrapped === 0}
          className={cn(chunkyButtonSecondary, "flex-1 disabled:opacity-50")}
        >
          {t("page-courses-widget-wrap-unwrap", { value: coin })}
        </Button>
      </div>

      <p role="status" className="m-0">
        {last
          ? t(`page-courses-widget-wrap-did-${last}`, {
              value: coin,
              total: amount(COINS),
            })
          : t("page-courses-widget-wrap-start", { total: amount(COINS) })}
      </p>
    </WidgetShell>
  )
}

export default WrapEthWidget
