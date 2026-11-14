"use client"

import { useEffect, useId, useState } from "react"
import { Landmark, ShieldCheck, Zap } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const ROUTES = [
  { id: "own", Icon: Landmark },
  { id: "fast", Icon: Zap },
] as const
type Route = (typeof ROUTES)[number]["id"]

/* Time stops on the slider; the challenge period ends at the last one */
const STOPS = ["now", "minutes", "day-1", "day-3", "day-7"] as const
type Stop = (typeof STOPS)[number]

const AMOUNT = 2
// An example fee: fast bridges set their own
const FAST_FEE = 0.004
const ARRIVES: Record<Route, Stop> = { own: "day-7", fast: "minutes" }

/** Who each route relies on, in addition to the ones before it */
const TRUST: Record<Route, string[]> = {
  own: ["ethereum", "rollup"],
  fast: ["ethereum", "rollup", "bridge", "provider"],
}

/**
 * Two ways off an optimistic rollup: its own bridge or a fast bridge.
 * Slide through time to see when the ETH lands and what it cost. Seeing
 * each route's ETH arrive unlocks Continue.
 */
const ExitRaceWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const sliderId = useId()
  const [route, setRoute] = useState<Route>("own")
  const [stop, setStop] = useState(0)
  const [arrived, setArrived] = useState<Record<Route, boolean>>({
    own: false,
    fast: false,
  })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && arrived.own && arrived.fast) {
      setDone(true)
      onComplete()
    }
  }, [done, arrived, onComplete])

  const num = numberFormat(locale, { maximumFractionDigits: 3 })
  const eth = (value: number) =>
    t("page-courses-widget-replay-eth", { value: num.format(value) })

  const at = STOPS[stop]
  const landed = stop >= STOPS.indexOf(ARRIVES[route])
  const received = route === "fast" ? AMOUNT - FAST_FEE : AMOUNT
  const timeLabel = (s: Stop) => t(`page-courses-widget-exit-time-${s}`)

  const update = (nextRoute: Route, nextStop: number) => {
    setRoute(nextRoute)
    setStop(nextStop)
    if (nextStop >= STOPS.indexOf(ARRIVES[nextRoute]))
      setArrived((a) => ({ ...a, [nextRoute]: true }))
  }

  // What's happening at this moment on the chosen route
  const status = (() => {
    if (route === "own")
      return landed
        ? t("page-courses-widget-exit-own-landed", { amount: eth(AMOUNT) })
        : t("page-courses-widget-exit-own-waiting")
    if (!landed) return t("page-courses-widget-exit-fast-requested")
    return at === "day-7"
      ? t("page-courses-widget-exit-fast-settled", { amount: eth(AMOUNT) })
      : t("page-courses-widget-exit-fast-landed", {
          amount: eth(received),
          fee: eth(FAST_FEE),
        })
  })()

  return (
    <WidgetShell>
      <div
        role="group"
        aria-label={t("page-courses-widget-exit-routes")}
        className="grid gap-3 sm:grid-cols-2"
      >
        {ROUTES.map(({ id, Icon }) => (
          <Button
            key={id}
            variant="ghost"
            aria-pressed={route === id}
            onClick={() => update(id, stop)}
            className={cn(
              chunkyTile,
              "flex h-auto min-h-12 items-center justify-start gap-3 p-3 text-start text-body hover-link:!text-body",
              route === id &&
                "border-(--course) bg-(--course-soft) hover:bg-(--course-soft)"
            )}
          >
            <Icon className={cn("size-6 shrink-0", courseText)} aria-hidden />
            <span className="flex flex-col">
              <span className="font-bold">
                {t(`page-courses-widget-exit-route-${id}`)}
              </span>
              <span className="text-sm font-normal text-body-medium">
                {id === "fast"
                  ? t("page-courses-widget-exit-fee", { fee: eth(FAST_FEE) })
                  : t("page-courses-widget-exit-no-fee")}
              </span>
            </span>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex justify-between font-bold">
          <span>{t("page-courses-widget-exit-time")}</span>
          <span className={courseText}>{timeLabel(at)}</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={stop}
          aria-valuetext={timeLabel(at)}
          onChange={(e) => update(route, Number(e.target.value))}
          className="w-full accent-(--course)"
        />
      </div>

      <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 rounded-2xl bg-background p-4">
        <dt className="text-body-medium">
          {t("page-courses-widget-exit-on-ethereum")}
        </dt>
        <dd className="m-0 text-end font-mono font-bold tabular-nums">
          {eth(landed ? received : 0)}
        </dd>
      </dl>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t("page-courses-widget-exit-trust")}
        </p>
        <ul className="m-0 flex list-none flex-col gap-1">
          {TRUST[route].map((who) => (
            <li key={who} className="m-0 flex items-start gap-2">
              <ShieldCheck
                className={cn("mt-0.5 size-5 shrink-0", courseText)}
                aria-hidden
              />
              {t(`page-courses-widget-exit-trust-${who}`)}
            </li>
          ))}
        </ul>
      </div>

      <p role="status" className="m-0">
        {status}
      </p>
    </WidgetShell>
  )
}

export default ExitRaceWidget
