"use client"

import { type ReactNode, useId, useState } from "react"
import { Check, CircleX, Search } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyTile, courseText, pickedTile, type PickResult } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const FIELDS = [
  "hash",
  "status",
  "block",
  "from",
  "to",
  "value",
  "fee",
] as const
type Field = (typeof FIELDS)[number]
const ANSWER: Field = "status"

// Deterministic mock values; the fee is 120,000 gas at 10 gwei (out of gas)
const TX = {
  hash: "0x3f9c2a7e5d1b48c06e2f9a3b7c4d1e8f5a6b2c9d0e7f3a1b4c8d5e2f6a9b0c3d",
  block: 21_543_210,
  from: "0x8e1d4a7c2b9f05e3a6d1c8b4f7e2a9d3c5b0e6f1",
  to: "0x2c7a9e4b1d8f36a05c3e7b9d1f4a6c8e0b2d5f73",
  value: 0.5,
  fee: 0.0012,
}

const Hex = ({ children }: { children: string }) => (
  <span dir="ltr" className="font-mono break-all">
    {children}
  </span>
)

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md bg-background-highlight px-2 text-sm font-bold whitespace-nowrap">
    {children}
  </span>
)

const rowClasses = cn(
  chunkyTile,
  "flex w-full cursor-pointer flex-col gap-1 p-3 text-start sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4",
  "focus-visible:outline-4 focus-visible:outline-(--course-soft)",
  pickedTile,
  "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
)

const ExplorerLabelsWidget = ({ onAnswer, locked, wrong }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const titleId = useId()
  const [picked, setPicked] = useState<Field | "">("")

  const resultFor = (id: Field): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }

  const int = numberFormat(locale)
  const eth = numberFormat(locale, { maximumSignificantDigits: 4 })
  const ethLabel = (value: number) =>
    t("page-courses-widget-explorer-eth", { value: eth.format(value) })

  const handleChange = (id: Field) => {
    setPicked(id)
    onAnswer({
      correct: id === ANSWER,
      hint:
        id === ANSWER
          ? undefined
          : t(`page-courses-widget-explorer-hint-${id}`),
    })
  }

  const values: Record<Field, ReactNode> = {
    hash: <Hex>{TX.hash}</Hex>,
    status: (
      <span className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 rounded-md bg-error-light px-2 font-bold text-error dark:bg-error-dark dark:text-red-400">
          <CircleX className="size-4 shrink-0" aria-hidden />
          {t("page-courses-widget-explorer-failed")}
        </span>
        <span className="text-body-medium">
          {t("page-courses-widget-explorer-reason")}
        </span>
      </span>
    ),
    block: <span className="tabular-nums">{int.format(TX.block)}</span>,
    from: (
      <span className="flex flex-wrap items-center gap-x-2">
        <Hex>{TX.from}</Hex>
        <Tag>{t("page-courses-widget-explorer-you")}</Tag>
      </span>
    ),
    to: (
      <span className="flex flex-wrap items-center gap-x-2">
        <Hex>{TX.to}</Hex>
        <Tag>{t("page-courses-widget-explorer-app")}</Tag>
      </span>
    ),
    value: ethLabel(TX.value),
    fee: ethLabel(TX.fee),
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-1">
        <p id={titleId} className="m-0 text-xl font-bold">
          {t("page-courses-widget-explorer-title")}
        </p>
        <p className="m-0 flex items-center gap-2 text-sm text-body-medium">
          <Search className={cn("size-4 shrink-0", courseText)} aria-hidden />
          {t("page-courses-widget-explorer-mock")}
        </p>
      </div>

      <RadioGroup.Root
        aria-labelledby={titleId}
        className="flex flex-col gap-2"
        value={picked}
        disabled={locked}
        onValueChange={(id) => handleChange(id as Field)}
      >
        {FIELDS.map((id) => (
          <RadioGroup.Item
            key={id}
            value={id}
            className={rowClasses}
            data-result={resultFor(id)}
          >
            <span className="flex items-center gap-2 text-sm font-bold text-body-medium">
              {t(`page-courses-widget-explorer-field-${id}`)}
              {locked && picked === id && (
                <Check
                  className="size-4 text-green-700 dark:text-green-400"
                  aria-hidden
                />
              )}
            </span>
            <span className="min-w-0 text-md text-body">{values[id]}</span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {locked && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-explorer-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default ExplorerLabelsWidget
