"use client"

import { type PointerEvent, useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

export interface MapCountry {
  code: string
  name: string
  d: string
  /** Label anchor as a fraction of the map's width/height */
  x: number
  y: number
  small: boolean
  score?: number
}

const BUCKETS = [
  {
    min: 0,
    label: "nascent",
    fill: "fill-purple-100",
    bg: "bg-purple-100",
  },
  {
    min: 20,
    label: "emerging",
    fill: "fill-purple-300",
    bg: "bg-purple-300",
  },
  {
    min: 40,
    label: "growing",
    fill: "fill-purple-500",
    bg: "bg-purple-500",
  },
  {
    min: 60,
    label: "established",
    fill: "fill-purple-700",
    bg: "bg-purple-700",
  },
  {
    min: 80,
    label: "leading",
    fill: "fill-purple-800",
    bg: "bg-purple-800",
  },
] as const

const NO_DATA_FILL = "fill-background-medium"

const getBucket = (score?: number) =>
  score === undefined
    ? undefined
    : BUCKETS.findLast((bucket) => score >= bucket.min)

interface AdoptionMapViewProps {
  countries: MapCountry[]
  width: number
  height: number
}

const AdoptionMapView = ({
  countries,
  width,
  height,
}: AdoptionMapViewProps) => {
  const t = useTranslations("page-stories")
  const locale = useLocale()
  const [selected, setSelected] = useState<string>()
  const [hovered, setHovered] = useState<string>()
  const [pointer, setPointer] = useState<{ x: number; y: number }>()

  const format = numberFormat(locale)
  const sorted = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name, locale)),
    [countries, locale]
  )

  const shapes = useMemo(() => {
    const handlers = (code: string) => ({
      onPointerEnter: (e: PointerEvent) => {
        if (e.pointerType === "mouse") setHovered(code)
      },
      onClick: () => setSelected(code),
    })
    return (
      <>
        {countries.map(({ code, d, score }) => (
          <path
            key={code}
            d={d}
            strokeWidth={0.6}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={cn(
              "cursor-pointer stroke-background",
              getBucket(score)?.fill ?? NO_DATA_FILL
            )}
            {...handlers(code)}
          />
        ))}
        {countries
          .filter((c) => c.small)
          .map(({ code, d }) => (
            <path
              key={code}
              d={d}
              fill="transparent"
              stroke="transparent"
              strokeWidth={16}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              pointerEvents="all"
              className="cursor-pointer"
              {...handlers(code)}
            />
          ))}
      </>
    )
  }, [countries])

  const active = countries.find((c) => c.code === (hovered ?? selected))
  const activeBucket = getBucket(active?.score)
  const anchor = hovered && pointer ? pointer : active

  const trackPointer = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    setPointer({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="mx-auto max-w-screen-lg space-y-8">
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full touch-manipulation"
          role="img"
          aria-label={t("page-stories-map-aria-label")}
          onPointerMove={trackPointer}
          onPointerLeave={() => setHovered(undefined)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(undefined)
          }}
        >
          {shapes}
          {active && (
            <g
              key={active.code}
              strokeWidth={1.25}
              strokeLinejoin="round"
              className="pointer-events-none stroke-body/70 brightness-110 drop-shadow-md motion-safe:animate-in motion-safe:duration-200 motion-safe:ease-out motion-safe:fade-in"
            >
              <path
                d={active.d}
                vectorEffect="non-scaling-stroke"
                className={activeBucket?.fill ?? NO_DATA_FILL}
              />
              {active.small && (
                <circle
                  cx={active.x * width}
                  cy={active.y * height}
                  r={8}
                  vectorEffect="non-scaling-stroke"
                  className="fill-none"
                />
              )}
            </g>
          )}
        </svg>

        <div aria-live="polite">
          {active && anchor && (
            <div
              className={cn(
                "pointer-events-none absolute z-10 w-max max-w-56 rounded-lg border bg-background px-3 py-2 shadow-md motion-safe:animate-in motion-safe:duration-150 motion-safe:fade-in",
                anchor.x < 0.2
                  ? "-translate-x-4"
                  : anchor.x > 0.8
                    ? "-translate-x-[calc(100%-1rem)]"
                    : "-translate-x-1/2",
                anchor.y < 0.35
                  ? "translate-y-4"
                  : "-translate-y-[calc(100%+1rem)]"
              )}
              style={{ left: `${anchor.x * 100}%`, top: `${anchor.y * 100}%` }}
            >
              <p className="font-bold">{active.name}</p>
              {active.score !== undefined && activeBucket ? (
                <p className="flex items-baseline gap-1.5 text-sm text-body-medium">
                  <span className="text-xl font-bold text-body tabular-nums">
                    {format.format(active.score)}
                  </span>
                  / {format.format(100)}
                  <span
                    className={cn(
                      "ms-1 inline-block size-2.5 self-center rounded-full",
                      activeBucket.bg
                    )}
                  />
                  {t(`page-stories-map-level-${activeBucket.label}`)}
                </p>
              ) : (
                <p className="text-sm text-body-medium">
                  {t("page-stories-map-no-data")}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <label className="flex flex-col gap-2 text-sm text-body-medium">
          {t("page-stories-map-prompt")}
          <select
            value={selected ?? ""}
            onChange={(e) => setSelected(e.target.value || undefined)}
            className="h-10 w-full rounded-md border border-body-light bg-background px-3 text-md text-body md:w-72"
          >
            <option value="">{t("page-stories-map-select-placeholder")}</option>
            {sorted.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <figure className="flex flex-col gap-2 md:w-[30rem]">
          <figcaption className="text-sm text-body-medium">
            {t("page-stories-map-legend")}
          </figcaption>
          <ol className="m-0 grid list-none grid-cols-5 gap-1 p-0">
            {BUCKETS.map((bucket, i) => (
              <li
                key={bucket.label}
                className={cn(
                  "flex flex-col gap-1 text-xs",
                  activeBucket === bucket ? "text-body" : "text-body-medium"
                )}
              >
                <span className={cn("h-3 rounded-xs", bucket.bg)} />
                <span className="hidden font-bold sm:block">
                  {t(`page-stories-map-level-${bucket.label}`)}
                </span>
                <span className="tabular-nums">
                  {format.format(bucket.min)}–
                  {format.format(BUCKETS[i + 1] ? BUCKETS[i + 1].min - 1 : 100)}
                </span>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </div>
  )
}

export default AdoptionMapView
