"use client"

import { useId, useState } from "react"
import { Waves, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import {
  chunkyTile,
  courseText,
  pickedMarker,
  pickedTile,
  type PickResult,
} from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const LIMITS = ["none", "small", "any"] as const
type Limit = (typeof LIMITS)[number]

/* What each limit does when the price wiggles, and when it jumps */
const CASES = [
  { id: "wiggle", Icon: Waves },
  { id: "jump", Icon: Zap },
] as const

const OUTCOME: Record<Limit, Record<(typeof CASES)[number]["id"], string>> = {
  none: { wiggle: "canceled", jump: "canceled" },
  small: { wiggle: "through", jump: "canceled" },
  any: { wiggle: "through", jump: "worse" },
}

/**
 * Pick how much price change to accept, then see what happens to the swap
 * in an everyday wiggle and in a sudden jump. Outcomes stay neutral until
 * Check, so the verdict comes from the footer.
 */
const SwapLimitWidget = ({ onAnswer, locked, wrong }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const labelId = useId()
  const [picked, setPicked] = useState<Limit | "">("")
  const key = (name: string) => `page-courses-widget-slippage-${name}`

  const resultFor = (id: Limit): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }

  const pick = (id: Limit) => {
    setPicked(id)
    onAnswer({
      correct: id === "small",
      hint: id === "small" ? undefined : t(key(`hint-${id}`)),
    })
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-3">
        <p
          id={labelId}
          className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase"
        >
          {t(key("label"))}
        </p>
        <RadioGroup.Root
          aria-labelledby={labelId}
          className="flex flex-col gap-3"
          value={picked}
          disabled={locked}
          onValueChange={(id) => pick(id as Limit)}
        >
          {LIMITS.map((id, idx) => (
            <RadioGroup.Item
              key={id}
              value={id}
              data-result={resultFor(id)}
              className={cn(
                chunkyTile,
                "group/option flex w-full cursor-pointer items-center gap-3 p-3 text-start text-md font-semibold focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                pickedTile,
                "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
              )}
            >
              <Center
                aria-hidden
                className={cn(
                  "size-8 shrink-0 rounded-full",
                  pickedMarker(resultFor(id))
                )}
              >
                {String.fromCharCode(65 + idx)}
              </Center>
              {t(key(`option-${id}`))}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>

      <div aria-live="polite" className="flex flex-col gap-3">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t(key("next"))}
        </p>
        {CASES.map(({ id, Icon }) => (
          <div
            key={id}
            className="flex flex-col gap-1 rounded-2xl bg-background p-3"
          >
            <p className="m-0 flex items-start gap-2 font-bold">
              <Icon
                className={cn("mt-0.5 size-5 shrink-0", courseText)}
                aria-hidden
              />
              {t(key(`case-${id}`))}
            </p>
            <p className="m-0 text-body-medium">
              {picked
                ? t(key(`outcome-${OUTCOME[picked][id]}`))
                : t(key("outcome-pick"))}
            </p>
          </div>
        ))}
      </div>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t(key("hit"))}
        </p>
      )}
    </WidgetShell>
  )
}

export default SwapLimitWidget
