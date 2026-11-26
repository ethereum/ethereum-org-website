"use client"

import { useEffect, useState } from "react"
import { Minus, Package, Plus, Truck } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const PARCELS = 6

/** Parcel icons, with the count for screen readers */
const Parcels = ({ count, faded }: { count: number; faded?: boolean }) => {
  const t = useTranslations("page-courses")
  return (
    <>
      <span aria-hidden className="flex min-h-8 flex-wrap gap-1">
        {Array.from({ length: count }, (_, i) => (
          <Package
            key={i}
            className={cn("size-7", faded ? "text-body-medium" : courseText)}
          />
        ))}
      </span>
      <span className="sr-only">
        {t("page-courses-widget-parcels-count", { count })}
      </span>
    </>
  )
}

/** How full a trip was, in words: beginner lessons show no figures */
const tripSize = (count: number) =>
  count === 1 ? "one" : count === PARCELS ? "full" : "some"

/** One trip's parcels and each parcel's share of the trip, as a bar */
const Trip = ({ label, count }: { label: string; count: number }) => (
  <div className="flex flex-col gap-2 rounded-2xl bg-background p-3">
    <p className="m-0 text-sm font-bold text-body-medium">{label}</p>
    <Parcels count={count} />
    <div
      aria-hidden
      className="h-3 overflow-hidden rounded-full border border-border bg-background-highlight"
    >
      <div
        className="h-full rounded-full bg-(--course) motion-safe:transition-[width] motion-safe:duration-500"
        style={{ width: `${100 / count}%` }}
      />
    </div>
  </div>
)

/**
 * A courier's crate: pack parcels, send one trip to Ethereum, and see each
 * parcel's share of the trip shrink as the crate fills. Two trips of
 * different sizes unlock Continue.
 */
const ParcelPackWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [packed, setPacked] = useState(1)
  const [trips, setTrips] = useState<number[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && new Set(trips).size > 1) {
      setDone(true)
      onComplete()
    }
  }, [done, trips, onComplete])

  const send = () => {
    setTrips((all) => [...all, packed])
    setPacked(1)
  }

  const [latest, previous] = [trips.at(-1), trips.at(-2)]

  return (
    <WidgetShell>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-2xl bg-background p-4">
          <p className="m-0 font-bold">
            {t("page-courses-widget-parcels-waiting")}
          </p>
          <Parcels count={PARCELS - packed} faded />
        </div>
        <div className="flex flex-col gap-2 rounded-2xl border-2 border-(--course) bg-background p-4">
          <p className="m-0 font-bold">
            {t("page-courses-widget-parcels-crate")}
          </p>
          <Parcels count={packed} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="ghost"
          onClick={() => setPacked((n) => n - 1)}
          disabled={packed <= 1}
          aria-label={t("page-courses-widget-parcels-unpack")}
          className={cn(chunkyButtonSecondary, "px-3 disabled:opacity-50")}
        >
          <Minus />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setPacked((n) => n + 1)}
          disabled={packed >= PARCELS}
          aria-label={t("page-courses-widget-parcels-pack")}
          className={cn(chunkyButtonSecondary, "px-3 disabled:opacity-50")}
        >
          <Plus />
        </Button>
        <Button
          variant="ghost"
          onClick={send}
          className={cn(chunkyButton, "flex-1")}
        >
          <Truck aria-hidden />
          {t("page-courses-widget-parcels-send")}
        </Button>
      </div>

      {latest !== undefined && (
        <div className="flex flex-col gap-2">
          <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
            {t("page-courses-widget-parcels-share")}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Trip
              label={t("page-courses-widget-parcels-latest")}
              count={latest}
            />
            {previous !== undefined && (
              <Trip
                label={t("page-courses-widget-parcels-previous")}
                count={previous}
              />
            )}
          </div>
        </div>
      )}

      <p role="status" className="m-0">
        {latest === undefined
          ? t("page-courses-widget-parcels-start")
          : t(`page-courses-widget-parcels-sent-${tripSize(latest)}`)}
      </p>
    </WidgetShell>
  )
}

export default ParcelPackWidget
