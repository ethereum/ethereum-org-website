"use client"

import { useEffect, useId, useState } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * A jar of gold and silver coins that keeps gold x silver the same after
 * every swap, as many pools do. Take more gold and each piece costs more
 * silver. The learner only ever sees relative bars and words, never figures.
 */
const START = 100
const STOPS = ["handful", "scoop", "half", "most"] as const
const TAKE: Record<(typeof STOPS)[number], number> = {
  handful: 5,
  scoop: 20,
  half: 45,
  most: 70,
}

const pay = (take: number) => (START * take) / (START - take)
const price = (take: number) => pay(take) / take

// Shared scales so every stop compares against the same bar lengths
const MAX_COINS = pay(TAKE.most)
const MAX_PRICE = price(TAKE.most)

const Bar = ({
  label,
  share,
  className,
  tick,
  tickLabel,
}: {
  label: string
  share: number
  className: string
  tick?: number
  tickLabel?: string
}) => (
  <div className="flex flex-col gap-1">
    <p className="m-0 text-sm font-bold text-body-medium">{label}</p>
    <div
      aria-hidden
      className="relative h-5 rounded-full bg-background-highlight"
    >
      <div
        className={cn(
          "h-full rounded-full motion-safe:transition-[width] motion-safe:duration-300",
          className
        )}
        style={{ width: `${Math.max(share * 100, 2)}%` }}
      />
      {tick !== undefined && (
        <span
          className="absolute -top-1 -bottom-1 w-0.5 bg-body"
          style={{ insetInlineStart: `${tick * 100}%` }}
        />
      )}
    </div>
    {tickLabel && (
      <p className="m-0 flex items-center gap-2 text-sm text-body-medium">
        <span aria-hidden className="h-3 w-0.5 bg-body" />
        {tickLabel}
      </p>
    )}
  </div>
)

const PoolSwapWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const sliderId = useId()
  const [stop, setStop] = useState(0)
  const [completed, setCompleted] = useState(false)

  const size = STOPS[stop]
  const take = TAKE[size]
  const key = (name: string) => `page-courses-widget-pool-${name}`

  // Done once the learner has seen the biggest trade's price
  useEffect(() => {
    if (!completed && stop === STOPS.length - 1) {
      setCompleted(true)
      onComplete()
    }
  }, [completed, stop, onComplete])

  return (
    <WidgetShell>
      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
          <span>{t(key("label"))}</span>
          <span className={cn("text-xl", courseText)}>
            {t(key(`size-${size}`))}
          </span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={stop}
          aria-valuetext={t(key(`size-${size}`))}
          onChange={(e) => setStop(Number(e.target.value))}
          className="w-full accent-(--course)"
        />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-background p-4">
        <Bar
          label={t(key("left"))}
          share={(START - take) / START}
          className="bg-yellow-400"
        />
        <Bar
          label={t(key("get"))}
          share={take / MAX_COINS}
          className="bg-yellow-400"
        />
        <Bar
          label={t(key("pay"))}
          share={pay(take) / MAX_COINS}
          className="bg-gray-400"
        />
        <Bar
          label={t(key("price"))}
          share={price(take) / MAX_PRICE}
          className="bg-(--course)"
          tick={1 / MAX_PRICE}
          tickLabel={t(key("usual"))}
        />
      </div>

      <p role="status" className="m-0 rounded-2xl bg-background p-3">
        {t(key(`note-${size}`))}
      </p>
    </WidgetShell>
  )
}

export default PoolSwapWidget
