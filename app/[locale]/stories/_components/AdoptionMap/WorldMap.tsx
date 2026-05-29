"use client"

import { type MouseEvent, useMemo, useRef, useState } from "react"
import { geoMercator, geoPath } from "d3-geo"
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

// --- Projection + path generation (module scope: locale-independent, runs once
// when this lazily-loaded chunk mounts) --------------------------------------
const VIEW_WIDTH = 800
const ANTARCTICA_ID = "010" // dropped to match the design (no data, wastes space)

// 1-decimal coords: sub-pixel at render size, ~25% smaller than full precision.
const roundCoords = (d: string) =>
  d.replace(/-?\d+\.\d+/g, (m) => Number(m).toFixed(1))

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

// Crop the far-left strip: Mercator's antimeridian seam (at 180°) slices the
// part of far-eastern Russia that crosses 180°, wrapping it to the left edge as
// a detached, cut-off sliver. It sits in open Pacific west of Alaska, so we trim
// it off via the viewBox. (Alaska's western tip starts at ~x18; cropping here
// leaves it intact.)
const LEFT_CROP = 26

const projection = geoMercator().fitWidth(VIEW_WIDTH, featureCollection)
const [[, minY], [, maxY]] = geoPath(projection).bounds(featureCollection)
const [tx, ty] = projection.translate()
projection.translate([tx, ty - minY]) // top-align so the viewBox is tight
const VIEW_HEIGHT = Math.ceil(maxY - minY)
const VIEW_BOX = `${LEFT_CROP} 0 ${VIEW_WIDTH - LEFT_CROP} ${VIEW_HEIGHT}`
const pathGenerator = geoPath(projection)

type Shape = { key: string; iso2: string | null; d: string }

const SHAPES: Shape[] = features.map((f) => {
  const iso2 = ISO_NUMERIC_TO_ALPHA2[String(f.id)] ?? null
  return { key: String(f.id), iso2, d: roundCoords(pathGenerator(f) ?? "") }
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

  const resolveTarget = (target: EventTarget): TooltipState | null => {
    const path = (target as Element).closest?.("path[data-iso]")
    const container = containerRef.current
    if (!path || !container) return null

    const iso2 = path.getAttribute("data-iso")!
    const rate = storiesAdoption[iso2]
    const rect = container.getBoundingClientRect()
    const box = path.getBoundingClientRect()

    let name = iso2
    try {
      name = regionNames.of(iso2) ?? iso2
    } catch {
      // fall back to the ISO code
    }

    return {
      x: box.left + box.width / 2 - rect.left,
      y: box.top - rect.top,
      name,
      value: rate === undefined ? null : percentFormat.format(rate / 100),
    }
  }

  const handleMove = (e: MouseEvent) => setTooltip(resolveTarget(e.target))

  // Touch: tap a country to show its tooltip, tap empty space to dismiss.
  const handleClick = (e: MouseEvent) => setTooltip(resolveTarget(e.target))

  return (
    <div
      ref={containerRef}
      id={MAP_ID}
      className="relative"
      onMouseMove={handleMove}
      onMouseLeave={() => setTooltip(null)}
      onClick={handleClick}
    >
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

      <svg viewBox={VIEW_BOX} aria-hidden>
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
  )
}

export default WorldMap
