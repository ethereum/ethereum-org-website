"use client"

import { useRef, useState } from "react"
import { Flame } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const START_FEE = 10
// Blocks aim for half full; a full or empty one moves the next fee 12.5%
const MAX_CHANGE = 0.125
const SHOWN = 5

const FILLS = [
  { id: "full", fill: 1 },
  { id: "half", fill: 0.5 },
  { id: "empty", fill: 0 },
] as const

type FillId = (typeof FILLS)[number]["id"]

interface Block {
  key: number
  fill: number
  /** Base fee this block charged */
  fee: number
}

const nextFee = (fee: number, fill: number) =>
  fee * (1 + MAX_CHANGE * ((fill - 0.5) / 0.5))

/** Sandbox: add full, half-full or empty blocks and watch the base fee follow */
const BaseFeeWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const gwei = numberFormat(locale, { maximumFractionDigits: 2 })
  // Column labels round harder so five fit side by side at 320px
  const short = numberFormat(locale, { maximumFractionDigits: 1 })
  const [blocks, setBlocks] = useState<Block[]>([])
  const [fee, setFee] = useState(START_FEE)
  const [last, setLast] = useState<FillId | null>(null)
  const seen = useRef(new Set<FillId>())
  const done = useRef(false)

  const add = (id: FillId, fill: number) => {
    const key = (blocks[blocks.length - 1]?.key ?? 0) + 1
    setBlocks([...blocks, { key, fill, fee }].slice(-SHOWN))
    setFee(nextFee(fee, fill))
    setLast(id)
    seen.current.add(id)
    // Done once the fee has gone both ways
    if (
      !done.current &&
      seen.current.has("full") &&
      seen.current.has("empty")
    ) {
      done.current = true
      onComplete()
    }
  }

  const value = (n: number) =>
    t("page-courses-widget-base-fee-gwei", { value: gwei.format(n) })

  return (
    <WidgetShell>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="m-0 flex items-center gap-2 font-bold">
          <Flame className={cn("size-5 shrink-0", courseText)} aria-hidden />
          {t("page-courses-widget-base-fee-next")}
        </p>
        <p className={cn("m-0 text-xl font-bold tabular-nums", courseText)}>
          {value(fee)}
        </p>
      </div>

      {/* Recent blocks: fill level against the half-full target */}
      <div aria-hidden className="flex flex-col gap-1">
        <div className="relative flex h-32 items-end gap-2 rounded-2xl bg-background p-2">
          <div className="pointer-events-none absolute inset-x-2 top-1/2 border-t-2 border-dashed border-body-medium" />
          {blocks.length === 0 && (
            <p className="m-auto text-sm text-body-medium">
              {t("page-courses-widget-base-fee-empty-chart")}
            </p>
          )}
          {blocks.map(({ key, fill }) => (
            <div
              key={key}
              className="flex h-full flex-1 items-end overflow-hidden rounded-lg border-2 border-(--course-soft)"
            >
              <div
                className="w-full bg-(--course) transition-[height] duration-300 motion-reduce:transition-none"
                style={{ height: `${fill * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 px-2">
          {blocks.map(({ key, fee: charged }) => (
            <span
              key={key}
              className="flex-1 text-center text-sm font-bold whitespace-nowrap tabular-nums"
            >
              {short.format(charged)}
            </span>
          ))}
        </div>
        <p className="m-0 px-2 text-sm text-body-medium">
          {t("page-courses-widget-base-fee-legend")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {FILLS.map(({ id, fill }) => (
          <Button
            key={id}
            variant="ghost"
            onClick={() => add(id, fill)}
            className={cn(
              chunkyButtonSecondary,
              "h-auto flex-1 px-4 py-2 whitespace-normal"
            )}
          >
            {t(`page-courses-widget-base-fee-add-${id}`)}
          </Button>
        ))}
      </div>

      <p role="status" className="m-0">
        {last
          ? t(`page-courses-widget-base-fee-did-${last}`, { value: value(fee) })
          : t("page-courses-widget-base-fee-start", { value: value(fee) })}
      </p>
      <p className="m-0 text-sm text-body-medium">
        {t("page-courses-widget-base-fee-example")}
      </p>
    </WidgetShell>
  )
}

export default BaseFeeWidget
