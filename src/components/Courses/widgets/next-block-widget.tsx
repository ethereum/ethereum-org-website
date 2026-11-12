"use client"

import { useState } from "react"
import { Box, Check, Coins } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

// Tip sizes, smallest first; shown as words and coin icons, never numbers
const TIPS = ["none", "small", "big", "biggest"] as const

/*
 * In arrival order, so the earliest payments aren't the answer. The only
 * full block a validator would choose is the three biggest tips: ava, mia, zoe.
 */
const LINE = [
  { id: "leo", tip: 0 },
  { id: "mia", tip: 2 },
  { id: "sam", tip: 1 },
  { id: "ava", tip: 3 },
  { id: "noah", tip: 1 },
  { id: "zoe", tip: 2 },
] as const
type PaymentId = (typeof LINE)[number]["id"]

const SPACE = 3
const BEST = [...LINE]
  .sort((a, b) => b.tip - a.tip)
  .slice(0, SPACE)
  .map(({ id }) => id)

const NextBlockWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [picked, setPicked] = useState<PaymentId[]>([])

  const name = (id: PaymentId) => t(`page-courses-widget-next-block-name-${id}`)
  const full = picked.length === SPACE

  const toggle = (id: PaymentId) => {
    const next = picked.includes(id)
      ? picked.filter((p) => p !== id)
      : [...picked, id]
    setPicked(next)
    if (!next.length) return onAnswer(null)
    onAnswer({
      correct: next.length === SPACE && next.every((p) => BEST.includes(p)),
      hint:
        next.length < SPACE
          ? t("page-courses-widget-next-block-hint-room")
          : t("page-courses-widget-next-block-hint-tips"),
    })
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-3">
        <p className="m-0 flex items-center gap-2 text-sm font-bold tracking-wide text-body-medium uppercase">
          <Box className={cn("size-4", courseText)} aria-hidden />
          {t("page-courses-widget-next-block-block")}
        </p>
        <ol
          aria-live="polite"
          className="m-0 grid list-none grid-cols-1 gap-2 rounded-2xl border-2 border-(--course) bg-background p-3 sm:grid-cols-3"
        >
          {Array.from({ length: SPACE }, (_, slot) => {
            const id = picked[slot]
            return (
              <li
                key={slot}
                className={cn(
                  "m-0 flex min-h-12 items-center justify-center rounded-xl px-2 text-center font-bold",
                  id
                    ? "bg-(--course) text-white"
                    : "border-2 border-dashed border-(--course-soft) text-body-medium"
                )}
              >
                {id ? name(id) : t("page-courses-widget-next-block-empty")}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="flex flex-col gap-3">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t("page-courses-widget-next-block-line")}
        </p>
        <ul className="m-0 grid list-none grid-cols-1 gap-3 sm:grid-cols-2">
          {LINE.map(({ id, tip }) => {
            const inBlock = picked.includes(id)
            return (
              <li key={id} className="m-0">
                <Button
                  variant="ghost"
                  onClick={() => toggle(id)}
                  disabled={locked || (full && !inBlock)}
                  aria-pressed={inBlock}
                  className={cn(
                    chunkyTile,
                    "flex h-full w-full items-center justify-between gap-3 p-3 text-start text-body disabled:opacity-50 hover-link:!text-body",
                    inBlock &&
                      "border-(--course) bg-(--course-soft) hover:bg-(--course-soft)"
                  )}
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-bold">{name(id)}</span>
                    <span className="text-sm font-semibold text-body-medium">
                      {t(`page-courses-widget-next-block-tip-${TIPS[tip]}`)}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    {/* One coin per step of tip size; the words carry it for screen readers */}
                    {Array.from({ length: tip }, (_, i) => (
                      <Coins
                        key={i}
                        className="size-5 text-yellow-700 dark:text-yellow-400"
                        aria-hidden
                      />
                    ))}
                    {inBlock && (
                      <Check
                        className={cn("ms-1 size-5", courseText)}
                        aria-hidden
                      />
                    )}
                  </span>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>

      {locked && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-next-block-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default NextBlockWidget
