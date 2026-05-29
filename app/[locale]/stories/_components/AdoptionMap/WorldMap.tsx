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

// Fills/strokes reference --map-ink / --map-surface (set on the section, theme-aware).
// No-data uses the scale's light-indigo baseline (the "zero" level) rather than a
// near-transparent tint, so countries stay distinct from the lavender surface.
const NO_DATA_FILL = "hsl(var(--map-ink) / 0.3)"

const fillFor = (iso2: string | null) => {
  const rate = iso2 ? storiesAdoption[iso2] : undefined
  return rate === undefined
    ? NO_DATA_FILL
    : `hsl(var(--map-ink) / ${getAlpha(rate).toFixed(3)})`
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

// Center on ~11°E so Mercator's antimeridian seam falls in the Bering Strait
// (between Russia and Alaska) instead of at 180°. This keeps Russia whole
// rather than slicing its far-eastern tip (Chukotka) off to the other edge.
const projection = geoMercator()
  .rotate([-11, 0])
  .fitWidth(VIEW_WIDTH, featureCollection)
const [[, minY], [, maxY]] = geoPath(projection).bounds(featureCollection)
const [tx, ty] = projection.translate()
projection.translate([tx, ty - minY]) // top-align so the viewBox is tight
const VIEW_HEIGHT = Math.ceil(maxY - minY)
const VIEW_BOX = `0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`
const pathGenerator = geoPath(projection)

// A few far-western US Aleutian islands sit on the far side of the new seam;
// d3 renders such antimeridian-crossing polygons as a sliver smeared across the
// whole map. Drop any polygon whose projected width spans most of the map.
const SEAM_SPAN = 700
const dropWrappedPolys = (f: GeoJSON.Feature): GeoJSON.Feature => {
  if (f.geometry.type !== "MultiPolygon") return f
  const coordinates = f.geometry.coordinates.filter((poly) => {
    const xs = poly[0]
      .map((c) => projection(c as [number, number])?.[0])
      .filter((x): x is number => x != null)
    return xs.length < 2 || Math.max(...xs) - Math.min(...xs) < SEAM_SPAN
  })
  return { ...f, geometry: { ...f.geometry, coordinates } }
}

type Shape = { key: string; iso2: string | null; d: string }

const SHAPES: Shape[] = features.map((f) => {
  const iso2 = ISO_NUMERIC_TO_ALPHA2[String(f.id)] ?? null
  return {
    key: String(f.id),
    iso2,
    d: roundCoords(pathGenerator(dropWrappedPolys(f)) ?? ""),
  }
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
  const [highlightD, setHighlightD] = useState<string | null>(null)

  const regionNames = useMemo(
    () => new Intl.DisplayNames([locale], { type: "region" }),
    [locale]
  )
  const percentFormat = useMemo(
    () => numberFormat(locale, { style: "percent", maximumFractionDigits: 0 }),
    [locale]
  )

  const resolveTarget = (
    target: EventTarget
  ): { tooltip: TooltipState; d: string } | null => {
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
      tooltip: {
        x: box.left + box.width / 2 - rect.left,
        y: box.top - rect.top,
        name,
        value: rate === undefined ? null : percentFormat.format(rate / 100),
      },
      d: path.getAttribute("d") ?? "",
    }
  }

  const update = (e: MouseEvent) => {
    const hit = resolveTarget(e.target)
    setTooltip(hit?.tooltip ?? null)
    setHighlightD(hit?.d ?? null)
  }

  const clear = () => {
    setTooltip(null)
    setHighlightD(null)
  }

  return (
    <div
      ref={containerRef}
      id={MAP_ID}
      className="relative"
      onMouseMove={update}
      onMouseLeave={clear}
      onClick={update}
    >
      <style>{`
        #${MAP_ID} svg { width: 100%; height: auto; display: block; }
        #${MAP_ID} path {
          stroke: hsl(var(--map-surface));
          stroke-width: 0.75;
          transition: fill 150ms ease;
        }
        /* Hovered country outline, drawn last so it paints above all neighbors. */
        #${MAP_ID} path.highlight {
          fill: none;
          stroke: hsl(var(--map-ink));
          stroke-width: 1.2;
          pointer-events: none;
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
        {highlightD && <path className="highlight" d={highlightD} />}
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
