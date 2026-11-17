"use client"

import { useEffect, useId, useRef, useState } from "react"
import { CircleCheck, CircleX, Waves, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText, pickedMarker, pickedTile } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const LIMITS = ["none", "small", "any"] as const
type Limit = (typeof LIMITS)[number]

/* What each limit does when the price wiggles, and when it jumps */
const CASES = [
  { id: "wiggle", Icon: Waves },
  { id: "jump", Icon: Zap },
] as const

type Case = (typeof CASES)[number]["id"]

// Each outcome, and whether it's good for you: a canceled jump protects you,
// a canceled wiggle only costs a fee
const OUTCOME: Record<Limit, Record<Case, [string, boolean]>> = {
  none: { wiggle: ["canceled", false], jump: ["canceled", true] },
  small: { wiggle: ["through", true], jump: ["canceled", true] },
  any: { wiggle: ["through", true], jump: ["worse", false] },
}

/**
 * Try each limit and see what happens to the swap in an everyday wiggle and
 * in a sudden jump. Nothing to get wrong: done once all three are tried.
 */
const SwapLimitWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const labelId = useId()
  const [picked, setPicked] = useState<Limit | "">("")
  const [tried, setTried] = useState<Limit[]>([])
  const done = useRef(false)
  const key = (name: string) => `page-courses-widget-slippage-${name}`
  const allTried = tried.length === LIMITS.length

  useEffect(() => {
    if (!done.current && allTried) {
      done.current = true
      onComplete()
    }
  }, [allTried, onComplete])

  const pick = (id: Limit) => {
    setPicked(id)
    setTried((list) => (list.includes(id) ? list : [...list, id]))
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
          onValueChange={(id) => pick(id as Limit)}
        >
          {LIMITS.map((id, idx) => (
            <RadioGroup.Item
              key={id}
              value={id}
              className={cn(
                chunkyTile,
                "group/option flex w-full cursor-pointer items-center gap-3 p-3 text-start text-md font-semibold focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                pickedTile
              )}
            >
              <Center
                aria-hidden
                className={cn("size-8 shrink-0 rounded-full", pickedMarker())}
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
        {CASES.map(({ id, Icon }) => {
          const [outcome, good] = picked ? OUTCOME[picked][id] : ["", false]
          const Verdict = good ? CircleCheck : CircleX
          return (
            <div
              key={id}
              className={cn(
                "flex flex-col gap-1 rounded-2xl border-2 bg-background p-3 transition-colors",
                !picked
                  ? "border-transparent"
                  : good
                    ? "border-green-700 dark:border-green-400"
                    : "border-error dark:border-red-400"
              )}
            >
              <p className="m-0 flex items-start gap-2 font-bold">
                <Icon
                  className={cn("mt-0.5 size-5 shrink-0", courseText)}
                  aria-hidden
                />
                {t(key(`case-${id}`))}
              </p>
              {picked ? (
                <p
                  className={cn(
                    "m-0 flex items-start gap-2",
                    good
                      ? "text-green-700 dark:text-green-400"
                      : "text-error dark:text-red-400"
                  )}
                >
                  <Verdict className="mt-0.5 size-5 shrink-0" aria-hidden />
                  {t(key(`outcome-${outcome}`))}
                </p>
              ) : (
                <p className="m-0 text-body-medium">{t(key("outcome-pick"))}</p>
              )}
            </div>
          )
        })}
      </div>

      {allTried && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t(key("hit"))}
        </p>
      )}
    </WidgetShell>
  )
}

export default SwapLimitWidget
