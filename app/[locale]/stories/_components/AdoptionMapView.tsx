"use client"

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Check, ChevronDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import InlineLink from "@/components/ui/Link"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type { WorldMapShape } from "@/lib/world-map"

interface MapCountry {
  code: string
  name: string
  /** Share of the population that owns crypto, in percent */
  value?: number
}

interface Point {
  x: number
  y: number
}

const BUCKETS = [
  {
    min: 0,
    fill: "fill-purple-100",
    bg: "bg-purple-100",
  },
  {
    min: 1,
    fill: "fill-purple-300",
    bg: "bg-purple-300",
  },
  {
    min: 2,
    fill: "fill-purple-500",
    bg: "bg-purple-500",
  },
  {
    min: 5,
    fill: "fill-purple-700",
    bg: "bg-purple-700",
  },
  {
    min: 10,
    fill: "fill-purple-800",
    bg: "bg-purple-800",
  },
] as const

const NO_DATA_FILL = "fill-background-medium"

const getBucket = (value?: number) =>
  value === undefined
    ? undefined
    : BUCKETS.findLast((bucket) => value >= bucket.min)

// Keeps the tooltip inside the map: anchored left/right near the edges, below near the top
const tooltipPosition = ({ x, y }: Point): CSSProperties => ({
  left: `${x * 100}%`,
  top: `${y * 100}%`,
  translate: `${x < 0.3 ? "-1rem" : x > 0.7 ? "calc(-100% + 1rem)" : "-50%"} ${
    y < 0.35 ? "1rem" : "calc(-100% - 1rem)"
  }`,
})

interface AdoptionMapViewProps {
  countries: MapCountry[]
  width: number
  height: number
  source: { name: string; url: string; year: number }
}

const AdoptionMapView = ({
  countries,
  width,
  height,
  source,
}: AdoptionMapViewProps) => {
  const t = useTranslations("page-stories")
  const locale = useLocale()
  const [selected, setSelected] = useState<string>()
  const [hovered, setHovered] = useState<string>()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [shapes, setShapes] = useState<WorldMapShape[]>([])
  const pointer = useRef<Point>(undefined)
  const tooltip = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/world-map.json")
      .then((res) => res.json())
      .then((map: { shapes: WorldMapShape[] }) => setShapes(map.shapes))
      .catch(() => {})
  }, [])

  const percent = useMemo(() => {
    const format = numberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    })
    return (value: number) => format.format(value / 100)
  }, [locale])
  const sorted = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name, locale)),
    [countries, locale]
  )

  const byCode = useMemo(
    () => new Map(countries.map((c) => [c.code, c])),
    [countries]
  )

  const paths = useMemo(() => {
    const handlers = (code: string) => ({
      onPointerEnter: (e: PointerEvent) => {
        if (e.pointerType === "mouse") setHovered(code)
      },
      onClick: () => setSelected(code),
    })
    return (
      <>
        {shapes.map(({ code, d }) => (
          <path
            key={code}
            d={d}
            strokeWidth={0.6}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={cn(
              "cursor-pointer stroke-background",
              getBucket(byCode.get(code)?.value)?.fill ?? NO_DATA_FILL
            )}
            {...handlers(code)}
          />
        ))}
        {shapes
          .filter((s) => s.small)
          .map(({ code, x, y }) => (
            // Circles, not stroked outlines: wide strokes on complex paths triple touch hit-test cost
            <circle
              key={code}
              cx={x * width}
              cy={y * height}
              r={11}
              fill="transparent"
              className="cursor-pointer max-md:[r:26px]"
              {...handlers(code)}
            />
          ))}
      </>
    )
  }, [shapes, byCode, width, height])

  const activeCode = hovered ?? selected
  const active = activeCode ? byCode.get(activeCode) : undefined
  const activeShape = shapes.find((s) => s.code === activeCode)
  const activeBucket = getBucket(active?.value)
  const anchor = hovered && pointer.current ? pointer.current : activeShape

  // Follows the cursor without re-rendering: position is written straight to the tooltip
  const trackPointer = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    pointer.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
    if (tooltip.current)
      Object.assign(tooltip.current.style, tooltipPosition(pointer.current))
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
          {paths}
          {activeShape && (
            <g
              key={activeShape.code}
              strokeWidth={1.25}
              strokeLinejoin="round"
              className="pointer-events-none stroke-body/70 brightness-110 drop-shadow-md motion-safe:animate-in motion-safe:duration-200 motion-safe:ease-out motion-safe:fade-in"
            >
              <path
                d={activeShape.d}
                vectorEffect="non-scaling-stroke"
                className={activeBucket?.fill ?? NO_DATA_FILL}
              />
              {activeShape.small && (
                <circle
                  cx={activeShape.x * width}
                  cy={activeShape.y * height}
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
              ref={tooltip}
              className="pointer-events-none absolute z-10 w-max max-w-56 rounded-lg border bg-background px-3 py-2 shadow-md motion-safe:animate-in motion-safe:duration-150 motion-safe:fade-in"
              style={tooltipPosition(anchor)}
            >
              <p className="font-bold">{active.name}</p>
              {active.value !== undefined ? (
                <p className="text-sm whitespace-nowrap text-body-medium">
                  {t.rich("page-stories-map-ownership", {
                    value: percent(active.value),
                    strong: (chunks) => (
                      <span className="text-xl font-bold text-body tabular-nums">
                        {chunks}
                      </span>
                    ),
                  })}
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

      <div className="flex flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-2">
          <span id="adoption-map-picker" className="text-sm text-body-medium">
            {t("page-stories-map-prompt")}
          </span>
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                isSecondary
                role="combobox"
                aria-expanded={pickerOpen}
                aria-labelledby="adoption-map-picker"
                className="w-full justify-between sm:w-80"
              >
                <span className="truncate">
                  {(selected && byCode.get(selected)?.name) ??
                    t("page-stories-map-select-placeholder")}
                </span>
                <ChevronDown className="shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
              <Command
                className="[&>div]:first:border-none"
                filter={(value, search) => {
                  const name = value.toLocaleLowerCase(locale)
                  const query = search.toLocaleLowerCase(locale)
                  return name.startsWith(query)
                    ? 1
                    : name.includes(query)
                      ? 0.5
                      : 0
                }}
              >
                <CommandInput placeholder={t("page-stories-map-search")} />
                <CommandList>
                  <CommandEmpty>
                    {t("page-stories-map-no-results")}
                  </CommandEmpty>
                  {sorted.map(({ code, name, value }) => (
                    <CommandItem
                      key={code}
                      value={name}
                      keywords={[code]}
                      onSelect={() => {
                        setSelected(selected === code ? undefined : code)
                        setPickerOpen(false)
                      }}
                      className="gap-2"
                    >
                      <Check
                        className={cn(
                          "size-4 shrink-0",
                          selected !== code && "invisible"
                        )}
                      />
                      <span className="flex-1 truncate">{name}</span>
                      {value !== undefined && (
                        <span className="text-body-medium tabular-nums">
                          {percent(value)}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-body-medium">
          <span className="sr-only">{t("page-stories-map-legend")}</span>
          <span className="flex items-center gap-1.5" aria-hidden>
            {t("page-stories-map-less")}
            <span className="flex gap-0.5">
              {BUCKETS.map((bucket) => (
                <span
                  key={bucket.min}
                  className={cn(
                    "h-3 w-6 rounded-xs",
                    bucket.bg,
                    activeBucket === bucket &&
                      "ring-2 ring-body ring-offset-1 ring-offset-background"
                  )}
                />
              ))}
            </span>
            {t("page-stories-map-more")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-6 rounded-xs bg-background-medium" />
            {t("page-stories-map-no-data")}
          </span>
          <span>
            {t.rich("page-stories-map-source", {
              year: source.year,
              link: (chunks) => (
                <InlineLink href={source.url}>{chunks}</InlineLink>
              ),
              name: source.name,
            })}
          </span>
        </p>
      </div>
    </div>
  )
}

export default AdoptionMapView
