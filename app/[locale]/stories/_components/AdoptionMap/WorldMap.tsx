"use client"

import { type MouseEvent, useMemo, useRef, useState } from "react"
import { useLocale } from "next-intl"

import { numberFormat } from "@/lib/utils/numbers"

import { STORIES_ADOPTION_MAX, storiesAdoption } from "@/data/storiesAdoption"

import { WORLD_MAP_COUNTRIES, WORLD_MAP_VIEWBOX } from "./worldMap"

import { useTranslation } from "@/hooks/useTranslation"

// Scopes the base path styling + tooltip positioning to this map only.
const MAP_ID = "stories-adoption-map"

// Map a 0–max rate onto a perceptible alpha range over the brand primary.
const getAlpha = (rate: number) => 0.15 + 0.85 * (rate / STORIES_ADOPTION_MAX)

const NO_DATA_FILL = "hsla(var(--body-medium), 0.12)"

const fillFor = (iso: string) => {
  const rate = storiesAdoption[iso]
  return rate === undefined
    ? NO_DATA_FILL
    : `hsla(var(--primary), ${getAlpha(rate).toFixed(3)})`
}

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

  const countryName = (iso: string, fallback: string) => {
    try {
      return regionNames.of(iso) ?? fallback
    } catch {
      return fallback
    }
  }

  const resolveTarget = (target: EventTarget): TooltipState | null => {
    const path = (target as Element).closest?.("path[id]")
    const container = containerRef.current
    if (!path || !container) return null

    const iso = path.getAttribute("id")!
    const fallback = path.getAttribute("data-name") ?? iso
    const rate = storiesAdoption[iso]
    const rect = container.getBoundingClientRect()
    const box = path.getBoundingClientRect()

    return {
      x: box.left + box.width / 2 - rect.left,
      y: box.top - rect.top,
      name: countryName(iso, fallback),
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
          name: countryName(iso, iso),
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
        #${MAP_ID} path:hover {
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
        <svg viewBox={WORLD_MAP_VIEWBOX} aria-hidden>
          {WORLD_MAP_COUNTRIES.map((c) => (
            <path
              key={c.id}
              id={c.id}
              data-name={c.name}
              d={c.d}
              fill={fillFor(c.id)}
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
