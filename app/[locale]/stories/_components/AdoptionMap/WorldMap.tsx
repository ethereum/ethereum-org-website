"use client"

import { type MouseEvent, useMemo, useRef, useState } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { useLocale } from "next-intl"
import { feature } from "topojson-client"

import { numberFormat } from "@/lib/utils/numbers"

import { STORIES_ADOPTION_MAX, storiesAdoption } from "@/data/storiesAdoption"

import topology from "./countries-110m.json"
import { ISO_NUMERIC_TO_ALPHA2 } from "./isoNumericToAlpha2"

import { useTranslation } from "@/hooks/useTranslation"

const MAP_ID = "stories-adoption-map"

// Map a 0–max rate onto a perceptible alpha range over the brand primary.
const getAlpha = (rate: number) => 0.15 + 0.85 * (rate / STORIES_ADOPTION_MAX)

const NO_DATA_FILL = "hsla(var(--body-medium), 0.12)"

const fillFor = (iso2: string | null) => {
  const rate = iso2 ? storiesAdoption[iso2] : undefined
  return rate === undefined
    ? NO_DATA_FILL
    : `hsla(var(--primary), ${getAlpha(rate).toFixed(3)})`
}

// --- Projection + path generation (module scope: locale-independent, runs once,
// identical on server and client so hydration matches) -----------------------
const VIEW_WIDTH = 800
const ANTARCTICA_ID = "010" // dropped to match the design (no data, wastes space)

const topo = topology as unknown as Parameters<typeof feature>[0]
const collection = feature(
  topo,
  topo.objects.countries
) as unknown as GeoJSON.FeatureCollection

const features = collection.features.filter(
  (f) => String(f.id) !== ANTARCTICA_ID
)
const featureCollection: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features,
}

const projection = geoEqualEarth().fitWidth(VIEW_WIDTH, featureCollection)
const [[, minY], [, maxY]] = geoPath(projection).bounds(featureCollection)
const [tx, ty] = projection.translate()
projection.translate([tx, ty - minY]) // top-align so the viewBox is tight
const VIEW_HEIGHT = Math.ceil(maxY - minY)
const pathGenerator = geoPath(projection)

type Shape = { key: string; iso2: string | null; d: string }

const SHAPES: Shape[] = features.map((f) => {
  const iso2 = ISO_NUMERIC_TO_ALPHA2[String(f.id)] ?? null
  return { key: String(f.id), iso2, d: pathGenerator(f) ?? "" }
})

type TooltipState = {
  x: number
  y: number
  name: string
  value: string | null
}

const WorldMap = () => {
  const { t } = useTranslation("page-stories")
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const regionNames = useMemo(
    () => new Intl.DisplayNames([locale], { type: "region" }),
    [locale]
  )
  const percentFormat = useMemo(
    () => numberFormat(locale, { style: "percent", maximumFractionDigits: 0 }),
    [locale]
  )

  const countryName = (iso2: string) => {
    try {
      return regionNames.of(iso2) ?? iso2
    } catch {
      return iso2
    }
  }

  const resolveTarget = (target: EventTarget): TooltipState | null => {
    const path = (target as Element).closest?.("path[data-iso]")
    const container = containerRef.current
    if (!path || !container) return null

    const iso2 = path.getAttribute("data-iso")!
    const rate = storiesAdoption[iso2]
    const rect = container.getBoundingClientRect()
    const box = path.getBoundingClientRect()

    return {
      x: box.left + box.width / 2 - rect.left,
      y: box.top - rect.top,
      name: countryName(iso2),
      value: rate === undefined ? null : percentFormat.format(rate / 100),
    }
  }

  const handleMove = (e: MouseEvent) => setTooltip(resolveTarget(e.target))

  // Touch: tap a country to show its tooltip, tap empty space to dismiss.
  const handleClick = (e: MouseEvent) => setTooltip(resolveTarget(e.target))

  const dataCountries = useMemo(
    () =>
      Object.entries(storiesAdoption)
        .map(([iso, rate]) => ({
          iso,
          name: countryName(iso),
          value: percentFormat.format(rate / 100),
        }))
        .sort((a, b) => a.name.localeCompare(b.name, locale)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [regionNames, percentFormat, locale]
  )

  return (
    <figure className="relative m-0">
      <style>{`
        #${MAP_ID} svg { width: 100%; height: auto; display: block; }
        #${MAP_ID} path {
          stroke: hsla(var(--body-medium), 0.4);
          stroke-width: 0.5;
          transition: fill 150ms ease, stroke 150ms ease;
        }
        #${MAP_ID} path[data-iso]:hover {
          stroke: hsla(var(--primary), 1);
          stroke-width: 1.2;
        }
      `}</style>

      <div
        ref={containerRef}
        id={MAP_ID}
        className="relative"
        onMouseMove={handleMove}
        onMouseLeave={() => setTooltip(null)}
        onClick={handleClick}
      >
        <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} aria-hidden>
          {SHAPES.map((s) => (
            <path
              key={s.key}
              d={s.d}
              fill={fillFor(s.iso2)}
              {...(s.iso2 ? { "data-iso": s.iso2 } : {})}
            />
          ))}
        </svg>

        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-body-medium/20 bg-background px-2 py-1 text-sm shadow-md"
            style={{ left: tooltip.x, top: tooltip.y - 8 }}
          >
            <span className="font-bold">{tooltip.name}</span>
            <span className="ms-1.5 text-body-medium">
              {tooltip.value ?? t("page-stories-adoption-no-data")}
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-body-medium">
        <div className="flex items-center gap-2">
          <span>{t("page-stories-adoption-legend-low")}</span>
          <span
            className="h-3 w-24 rounded-full"
            style={{
              background:
                "linear-gradient(to right, hsla(var(--primary), 0.15), hsla(var(--primary), 1))",
            }}
          />
          <span>{t("page-stories-adoption-legend-high")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm border border-body-medium/40"
            style={{ background: NO_DATA_FILL }}
          />
          <span>{t("page-stories-adoption-no-data")}</span>
        </div>
      </div>

      {/* Non-visual equivalent of the map + tooltips */}
      <figcaption className="sr-only">
        {t("page-stories-adoption-a11y-summary")}
        <ul>
          {dataCountries.map((c) => (
            <li key={c.iso}>{`${c.name}: ${c.value}`}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}

export default WorldMap
