"use client"

import { type ReactNode, useId, useState } from "react"
import { Check, ChevronDown, Layers, Smartphone } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText, pickedTile, type PickResult } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const PARTS = ["account", "network", "address", "balance", "to"] as const
type Part = (typeof PARTS)[number]
const ANSWER: Part = "network"

const Hex = ({ children }: { children: string }) => (
  <span dir="ltr" className="font-mono">
    {children}
  </span>
)

const rowClasses = cn(
  chunkyTile,
  "flex min-h-12 w-full cursor-pointer items-center p-3 text-start",
  "focus-visible:outline-4 focus-visible:outline-(--course-soft)",
  pickedTile,
  "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
)

/**
 * A mock wallet send screen with no field captions, since a "Network" label
 * would give the answer away: pick the part that names the network
 */
const WalletNetworkWidget = ({ onAnswer, locked, wrong }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const titleId = useId()
  const [picked, setPicked] = useState<Part | "">("")

  const resultFor = (id: Part): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }

  const handleChange = (id: Part) => {
    setPicked(id)
    onAnswer({
      correct: id === ANSWER,
      hint:
        id === ANSWER
          ? undefined
          : t(`page-courses-widget-wallet-network-hint-${id}`),
    })
  }

  const values: Record<Part, ReactNode> = {
    account: (
      <span className="font-bold">
        {t("page-courses-widget-wallet-network-account-value")}
      </span>
    ),
    network: (
      <span className="flex items-center gap-1 font-bold">
        <Layers className={cn("size-4 shrink-0", courseText)} aria-hidden />
        {t("page-courses-widget-wallet-network-network-value")}
        <ChevronDown className="size-4 shrink-0" aria-hidden />
      </span>
    ),
    address: <Hex>0x7ae2…4d1c</Hex>,
    balance: (
      <span className="text-xl font-black">
        {t("page-courses-widget-wallet-network-balance-value")}
      </span>
    ),
    to: (
      <span className="flex flex-wrap items-center gap-x-2">
        {t("page-courses-widget-wallet-network-to-value")}
        <Hex>0x2c7a…5f73</Hex>
      </span>
    ),
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-1">
        <p id={titleId} className="m-0 text-xl font-bold">
          {t("page-courses-widget-wallet-network-title")}
        </p>
        <p className="m-0 flex items-center gap-2 text-sm text-body-medium">
          <Smartphone
            className={cn("size-4 shrink-0", courseText)}
            aria-hidden
          />
          {t("page-courses-widget-wallet-network-mock")}
        </p>
      </div>

      <RadioGroup.Root
        aria-labelledby={titleId}
        className="flex flex-col gap-2"
        value={picked}
        disabled={locked}
        onValueChange={(id) => handleChange(id as Part)}
      >
        {PARTS.map((id) => (
          <RadioGroup.Item
            key={id}
            value={id}
            className={rowClasses}
            data-result={resultFor(id)}
          >
            <span className="flex min-w-0 items-center justify-between gap-2 text-md text-body">
              {values[id]}
              {locked && picked === id && (
                <Check
                  className="size-5 shrink-0 text-green-700 dark:text-green-400"
                  aria-hidden
                />
              )}
            </span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {locked && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-wallet-network-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default WalletNetworkWidget
