"use client"

import { useEffect, useState } from "react"
import { Layers, RotateCcw, Skull, Vault, Wallet } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const LOCKED = 100
const YOURS = 20
const REDEEM = 10

type Outcome = "start" | "redeemed" | "exploited" | "failed"

const initial = {
  locked: LOCKED,
  // Bridged ETH out on the other network, yours included
  claims: LOCKED,
  yours: YOURS,
  wallet: 0,
  exploited: false,
  drained: 0,
}

/**
 * ETH locked on Ethereum backs the bridged ETH on another network. Redeem
 * some, let attackers drain the bridge, then try to redeem again. Trying
 * after the exploit unlocks Continue.
 */
const BridgeBackingWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const [state, setState] = useState(initial)
  const [outcome, setOutcome] = useState<Outcome>("start")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && outcome === "failed") {
      setDone(true)
      onComplete()
    }
  }, [done, outcome, onComplete])

  const int = numberFormat(locale)
  const pct = numberFormat(locale, { style: "percent" })
  const eth = (value: number) =>
    t("page-courses-widget-replay-eth", { value: int.format(value) })
  const backing = state.claims ? state.locked / state.claims : 0

  const redeem = () => {
    if (state.exploited) return setOutcome("failed")
    setState((s) => ({
      ...s,
      locked: s.locked - REDEEM,
      claims: s.claims - REDEEM,
      yours: s.yours - REDEEM,
      wallet: s.wallet + REDEEM,
    }))
    setOutcome("redeemed")
  }

  const exploit = () => {
    setState((s) => ({ ...s, locked: 0, exploited: true, drained: s.locked }))
    setOutcome("exploited")
  }

  const reset = () => {
    setState(initial)
    setOutcome("start")
  }

  const panels = [
    {
      id: "vault",
      Icon: Vault,
      rows: [{ id: "locked", value: state.locked }],
    },
    {
      id: "other",
      Icon: Layers,
      rows: [
        { id: "claims", value: state.claims },
        { id: "yours", value: state.yours },
      ],
    },
    {
      id: "wallet",
      Icon: Wallet,
      rows: [{ id: "wallet", value: state.wallet }],
    },
  ] as const

  return (
    <WidgetShell>
      <div className="grid gap-3 sm:grid-cols-3">
        {panels.map(({ id, Icon, rows }) => (
          <div
            key={id}
            className="flex flex-col gap-2 rounded-2xl bg-background p-4"
          >
            <p className="m-0 flex items-center gap-2 font-bold">
              <Icon className={cn("size-5 shrink-0", courseText)} aria-hidden />
              {t(`page-courses-widget-backing-panel-${id}`)}
            </p>
            <dl className="m-0 flex flex-col gap-1">
              {rows.map((row) => (
                <div key={row.id} className="flex flex-col">
                  <dt className="text-sm text-body-medium">
                    {t(`page-courses-widget-backing-row-${row.id}`)}
                  </dt>
                  <dd className="m-0 font-mono font-bold tabular-nums">
                    {eth(row.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="m-0 flex justify-between font-bold">
          <span>{t("page-courses-widget-backing-meter")}</span>
          <span
            className={
              state.exploited ? "text-error dark:text-red-400" : courseText
            }
          >
            {pct.format(backing)}
          </span>
        </p>
        <div
          aria-hidden
          className="h-3 overflow-hidden rounded-full border border-border bg-background-highlight"
        >
          <div
            className="h-full rounded-full bg-(--course) motion-safe:transition-[width] motion-safe:duration-500"
            style={{ width: `${backing * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="ghost"
          onClick={redeem}
          // Keep one redemption back so there's one to try after the exploit
          disabled={!state.exploited && state.yours <= REDEEM}
          className={cn(chunkyButton, "flex-1")}
        >
          {t("page-courses-widget-backing-redeem", { amount: eth(REDEEM) })}
        </Button>
        <Button
          variant="ghost"
          onClick={exploit}
          disabled={state.exploited}
          className={cn(chunkyButtonSecondary, "flex-1 disabled:opacity-50")}
        >
          <Skull aria-hidden />
          {t("page-courses-widget-backing-exploit")}
        </Button>
      </div>

      <p
        role="status"
        className={cn(
          "m-0",
          outcome === "failed" && "text-error dark:text-red-400"
        )}
      >
        {t(`page-courses-widget-backing-${outcome}`, {
          amount: eth(REDEEM),
          drained: eth(state.drained),
          left: eth(state.claims),
        })}
      </p>

      {outcome !== "start" && (
        <Button
          variant="ghost"
          onClick={reset}
          className={cn(chunkyButtonSecondary, "self-start")}
        >
          <RotateCcw aria-hidden />
          {t("page-courses-widget-backing-reset")}
        </Button>
      )}
    </WidgetShell>
  )
}

export default BridgeBackingWidget
