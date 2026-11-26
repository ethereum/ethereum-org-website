"use client"

import { useEffect, useId, useState } from "react"
import {
  ArrowLeftRight,
  Ban,
  Check,
  CircleDashed,
  Hourglass,
  type LucideIcon,
  Send,
  Triangle,
  User,
  Users,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const JOBS = [
  { id: "simple", icon: Send },
  { id: "big", icon: ArrowLeftRight },
] as const
type Job = (typeof JOBS)[number]["id"]

const NETWORKS = [
  { id: "quiet", icon: User },
  { id: "busy", icon: Users },
] as const
type Network = (typeof NETWORKS)[number]["id"]

// Offer stops, lowest first; only words reach the learner
const OFFERS = ["very-low", "low", "medium", "high", "very-high"] as const

// Lowest offer stop that goes straight in, per job and network
const NEED: Record<Job, Record<Network, number>> = {
  simple: { quiet: 1, busy: 2 },
  big: { quiet: 2, busy: 4 },
}

const OUTCOMES = ["now", "waits", "low"] as const
type Outcome = (typeof OUTCOMES)[number]

const OUTCOME_ICONS: Record<Outcome, LucideIcon> = {
  now: Send,
  waits: Hourglass,
  low: Ban,
}

// Below even the quiet-time price for this job, it may never go through
const outcomeFor = (job: Job, network: Network, offer: number): Outcome =>
  offer >= NEED[job][network]
    ? "now"
    : offer >= NEED[job].quiet
      ? "waits"
      : "low"

const START = { job: "simple" as Job, network: "quiet" as Network, offer: 2 }

const Toggle = <T extends string>({
  legend,
  options,
  value,
  onChange,
  label,
}: {
  legend: string
  options: readonly { id: T; icon: LucideIcon }[]
  value: T
  onChange: (id: T) => void
  label: (id: T) => string
}) => (
  <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
    <legend className="mb-2 font-bold">{legend}</legend>
    <div className="grid grid-cols-2 gap-3">
      {options.map(({ id, icon: Icon }) => {
        const active = value === id
        return (
          <Button
            key={id}
            variant="ghost"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={cn(
              chunkyTile,
              "flex h-full min-h-12 w-full items-center justify-start gap-2 p-3 text-start text-body hover-link:!text-body",
              active &&
                "border-(--course) bg-(--course-soft) hover:bg-(--course-soft)"
            )}
          >
            <Icon className={cn("size-5 shrink-0", courseText)} aria-hidden />
            <span className="font-semibold">{label(id)}</span>
          </Button>
        )
      })}
    </div>
  </fieldset>
)

const FeeMeterWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const sliderId = useId()
  const [job, setJob] = useState<Job>(START.job)
  const [network, setNetwork] = useState<Network>(START.network)
  const [offer, setOffer] = useState(START.offer)
  const [seen, setSeen] = useState<Outcome[]>([
    outcomeFor(START.job, START.network, START.offer),
  ])
  const [done, setDone] = useState(false)

  const outcome = outcomeFor(job, network, offer)
  const need = NEED[job][network]
  // Below this it's "too low"; same stop as the price when it's quiet
  const floor = NEED[job].quiet
  const offerLabel = (idx: number) =>
    t(`page-courses-widget-fee-meter-offer-${OFFERS[idx]}`)

  const update = (next: { job?: Job; network?: Network; offer?: number }) => {
    const n = { job, network, offer, ...next }
    setJob(n.job)
    setNetwork(n.network)
    setOffer(n.offer)
    const found = outcomeFor(n.job, n.network, n.offer)
    if (!seen.includes(found)) setSeen([...seen, found])
  }

  useEffect(() => {
    if (!done && OUTCOMES.every((o) => seen.includes(o))) {
      setDone(true)
      onComplete()
    }
  }, [done, seen, onComplete])

  const StatusIcon = OUTCOME_ICONS[outcome]

  return (
    <WidgetShell>
      <div className="grid gap-5 sm:grid-cols-2">
        <Toggle
          legend={t("page-courses-widget-fee-meter-job")}
          options={JOBS}
          value={job}
          onChange={(id) => update({ job: id })}
          label={(id) => t(`page-courses-widget-fee-meter-job-${id}`)}
        />
        <Toggle
          legend={t("page-courses-widget-fee-meter-network")}
          options={NETWORKS}
          value={network}
          onChange={(id) => update({ network: id })}
          label={(id) => t(`page-courses-widget-fee-meter-network-${id}`)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
          <span>{t("page-courses-widget-fee-meter-offer")}</span>
          <span className={cn("text-xl", courseText)}>{offerLabel(offer)}</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={OFFERS.length - 1}
          step={1}
          value={offer}
          aria-valuetext={offerLabel(offer)}
          onChange={(e) => update({ offer: Number(e.target.value) })}
          className="w-full accent-(--course)"
        />
      </div>

      {/* Meter: your offer fills the bar; markers show today's and the quiet price */}
      <div className="flex flex-col gap-2" aria-hidden>
        <div className="grid grid-cols-5 gap-1">
          {OFFERS.map((id, idx) => (
            <span
              key={id}
              className="flex h-6 items-end justify-center text-body"
            >
              {idx === need ? (
                <span className="h-0 w-0 border-x-8 border-t-[10px] border-x-transparent border-t-current" />
              ) : (
                idx === floor && (
                  <Triangle className="size-4 rotate-180 stroke-[2.5]" />
                )
              )}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1">
          {OFFERS.map((id, idx) => (
            <span
              key={id}
              className={cn(
                "h-6 rounded-md border-2 transition-colors duration-200",
                idx <= offer
                  ? "border-(--course) bg-(--course)"
                  : "border-(--course-soft) bg-background",
                idx === need && "outline-2 outline-offset-2 outline-body"
              )}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-(--course)" />
            {t("page-courses-widget-fee-meter-legend-offer")}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-0 w-0 border-x-[6px] border-t-8 border-x-transparent border-t-body" />
            {t("page-courses-widget-fee-meter-legend-price")}
          </span>
          {floor !== need && (
            <span className="flex items-center gap-2">
              <Triangle className="size-3 rotate-180 stroke-[2.5]" />
              {t("page-courses-widget-fee-meter-legend-quiet")}
            </span>
          )}
        </div>
      </div>

      <p
        role="status"
        className="m-0 flex items-start gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-4"
      >
        <StatusIcon
          className={cn("mt-0.5 size-6 shrink-0", courseText)}
          aria-hidden
        />
        <span className="flex flex-col gap-1">
          <span className="font-bold">
            {t(`page-courses-widget-fee-meter-${outcome}`)}
          </span>
          <span>{t(`page-courses-widget-fee-meter-${outcome}-note`)}</span>
        </span>
      </p>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t("page-courses-widget-fee-meter-found")}
        </p>
        <ul className="m-0 flex list-none flex-col gap-1">
          {OUTCOMES.map((id) => {
            const found = seen.includes(id)
            const current = id === outcome
            return (
              <li
                key={id}
                aria-current={current || undefined}
                className={cn(
                  "m-0 -mx-2 flex items-center gap-2 rounded-lg px-2 py-1 transition-colors",
                  current && "bg-(--course-soft) font-bold"
                )}
              >
                {found ? (
                  <Check
                    className="size-5 shrink-0 text-green-700 dark:text-green-400"
                    aria-hidden
                  />
                ) : (
                  <CircleDashed
                    className="size-5 shrink-0 text-body-medium"
                    aria-hidden
                  />
                )}
                <span className={found ? "text-body" : "text-body-medium"}>
                  {t(`page-courses-widget-fee-meter-${id}`)}
                  <span className="sr-only">
                    {" "}
                    (
                    {t(
                      found
                        ? "page-courses-widget-fee-meter-seen"
                        : "page-courses-widget-fee-meter-unseen"
                    )}
                    )
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </WidgetShell>
  )
}

export default FeeMeterWidget
