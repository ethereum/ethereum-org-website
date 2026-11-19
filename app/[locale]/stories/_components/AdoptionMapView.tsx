"use client"

import {
  type CSSProperties,
  type PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Minus, Plus } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import Select from "@/components/Select"
import { Button } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type { WorldMapShape } from "@/lib/world-map"

interface MapCountry {
  code: string
  name: string
  /** Share of the population that owns crypto, in percent */
  value?: number
}

interface CountryOption {
  value: string
  label: string
  share?: number
}

interface Point {
  x: number
  y: number
}

type View = [x: number, y: number, w: number, h: number]

const BUCKETS = [
  {
    min: 0,
    fill: "fill-purple-100 dark:fill-purple-800",
    bg: "bg-purple-100 dark:bg-purple-800",
  },
  {
    min: 1,
    fill: "fill-purple-300 dark:fill-purple-700",
    bg: "bg-purple-300 dark:bg-purple-700",
  },
  {
    min: 2,
    fill: "fill-purple-500 dark:fill-purple-500",
    bg: "bg-purple-500 dark:bg-purple-500",
  },
  {
    min: 5,
    fill: "fill-purple-700 dark:fill-purple-300",
    bg: "bg-purple-700 dark:bg-purple-300",
  },
  {
    min: 10,
    fill: "fill-purple-800 dark:fill-purple-100",
    bg: "bg-purple-800 dark:bg-purple-100",
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

const MAX_SCALE = 8
const ZOOM_MS = 400
const TAP_SLOP = 6
const CENTER = { x: 0.5, y: 0.5 }

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max)

// Scales the view by k and pans it so the map point at screen fraction `from` lands at `to`
const zoomView = (
  v: View,
  k: number,
  from: Point,
  to: Point,
  width: number,
  height: number
): View => {
  const w = clamp(v[2] / k, width / MAX_SCALE, width)
  const h = (w * height) / width
  return [
    clamp(v[0] + from.x * v[2] - to.x * w, 0, width - w),
    clamp(v[1] + from.y * v[3] - to.y * h, 0, height - h),
    w,
    h,
  ]
}

// Frames a country with padding, never tighter than a quarter of the world
const frame = (
  [x0, y0, x1, y1]: WorldMapShape["bbox"],
  width: number,
  height: number
): View => {
  const ratio = width / height
  const w = Math.max((x1 - x0) * 2, (y1 - y0) * 2 * ratio, width / 4)
  const scale = 1 / Math.min(w / width, 1)
  const at = { x: (x0 + x1) / 2 / width, y: (y0 + y1) / 2 / height }
  return zoomView([0, 0, width, height], scale, at, CENTER, width, height)
}

const midpoint = ([a, b = a]: Point[]): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
})
const spread = ([a, b = a]: Point[]) => Math.hypot(a.x - b.x, a.y - b.y)

const codeOf = (target: EventTarget) =>
  (target as Element).getAttribute("data-code") ?? undefined

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
  const [shapes, setShapes] = useState<WorldMapShape[]>([])
  const [failed, setFailed] = useState(false)
  const [view, setView] = useState<View>([0, 0, width, height])
  const pointer = useRef<Point>(undefined)
  const tooltip = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const viewRef = useRef(view)
  const renderFrame = useRef(0)
  const animation = useRef(0)
  const pointers = useRef(new Map<number, Point>())
  const gesture = useRef<{ view: View; mid: Point; spread: number }>(undefined)
  const origin = useRef<Point>(undefined)
  const dragged = useRef(false)

  useEffect(() => {
    fetch("/world-map.json")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then((map: { shapes: WorldMapShape[] }) => setShapes(map.shapes))
      .catch(() => setFailed(true))
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

  const [query, setQuery] = useState("")
  const options = useMemo<CountryOption[]>(
    () =>
      sorted.map(({ code, name, value }) => ({
        value: code,
        label: name,
        share: value,
      })),
    [sorted]
  )
  // react-select keeps option order, so rank names starting with the query first
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale)
    if (!q) return options
    const lower = (o: CountryOption) => o.label.toLocaleLowerCase(locale)
    return [
      ...options.filter((o) => lower(o).startsWith(q)),
      ...options.filter((o) => !lower(o).startsWith(q) && lower(o).includes(q)),
    ]
  }, [options, query, locale])

  const byCode = useMemo(
    () => new Map(countries.map((c) => [c.code, c])),
    [countries]
  )

  const paths = useMemo(
    () =>
      shapes.map(({ code, d }) => (
        <path
          key={code}
          data-code={code}
          d={d}
          strokeWidth={0.6}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={cn(
            "stroke-background",
            getBucket(byCode.get(code)?.value)?.fill ?? NO_DATA_FILL
          )}
        />
      )),
    [shapes, byCode]
  )

  const commit = useCallback((v: View) => {
    viewRef.current = v
    renderFrame.current ||= requestAnimationFrame(() => {
      renderFrame.current = 0
      setView(viewRef.current)
    })
  }, [])

  const animateTo = (to: View) => {
    cancelAnimationFrame(animation.current)
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      return commit(to)
    const from = viewRef.current
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / ZOOM_MS, 1)
      const e = 1 - (1 - p) ** 4
      commit(p < 1 ? (from.map((v, i) => v + (to[i] - v) * e) as View) : to)
      if (p < 1) animation.current = requestAnimationFrame(step)
    }
    animation.current = requestAnimationFrame(step)
  }

  const zoomBy = (k: number) =>
    animateTo(zoomView(viewRef.current, k, CENTER, CENTER, width, height))

  useEffect(() => {
    const el = svg.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      cancelAnimationFrame(animation.current)
      const rect = el.getBoundingClientRect()
      const at = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
      const delta = e.deltaY * (e.deltaMode ? 33 : 1)
      commit(
        zoomView(viewRef.current, 2 ** (-delta / 200), at, at, width, height)
      )
    }
    // iOS Safari ignores touch-action for pinch, so stop page zoom on the map directly
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault()
    }
    const prevent = (e: Event) => e.preventDefault()
    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("touchmove", onTouchMove, { passive: false })
    el.addEventListener("gesturestart", prevent)
    el.addEventListener("gesturechange", prevent)
    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("gesturestart", prevent)
      el.removeEventListener("gesturechange", prevent)
    }
  }, [commit, width, height])

  useEffect(
    () => () => {
      cancelAnimationFrame(renderFrame.current)
      cancelAnimationFrame(animation.current)
    },
    []
  )

  const relative = ({ x, y }: Point): Point => {
    const rect = svg.current!.getBoundingClientRect()
    return { x: (x - rect.left) / rect.width, y: (y - rect.top) / rect.height }
  }

  // Re-anchored whenever a finger lands or lifts, so the view never jumps
  const startGesture = () => {
    const points = [...pointers.current.values()]
    gesture.current = points.length
      ? { view: viewRef.current, mid: midpoint(points), spread: spread(points) }
      : undefined
  }

  // Follows the cursor without re-rendering: position is written straight to the tooltip
  const trackPointer = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "mouse") return
    pointer.current = relative({ x: e.clientX, y: e.clientY })
    if (tooltip.current && codeOf(e.target))
      Object.assign(tooltip.current.style, tooltipPosition(pointer.current))
  }

  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return
    cancelAnimationFrame(animation.current)
    if (!pointers.current.size) {
      dragged.current = false
      origin.current = { x: e.clientX, y: e.clientY }
    } else dragged.current = true
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    startGesture()
  }

  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    trackPointer(e)
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (
      !dragged.current &&
      origin.current &&
      Math.hypot(e.clientX - origin.current.x, e.clientY - origin.current.y) >
        TAP_SLOP
    ) {
      dragged.current = true
      if (e.pointerType === "mouse")
        e.currentTarget.setPointerCapture(e.pointerId)
    }
    const g = gesture.current
    if (!g) return
    const points = [...pointers.current.values()]
    const k = points.length > 1 && g.spread ? spread(points) / g.spread : 1
    commit(
      zoomView(
        g.view,
        k,
        relative(g.mid),
        relative(midpoint(points)),
        width,
        height
      )
    )
  }

  const onPointerEnd = (e: PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId)
    startGesture()
  }

  const scale = width / view[2]
  const zoomed = scale > 1
  const toView = ({ x, y }: Point): Point => ({
    x: (x * width - view[0]) / view[2],
    y: (y * height - view[1]) / view[3],
  })

  const activeCode = hovered ?? selected
  const active = activeCode ? byCode.get(activeCode) : undefined
  const activeShape = shapes.find((s) => s.code === activeCode)
  const activeBucket = getBucket(active?.value)
  const pinned = activeShape && toView(activeShape)
  const anchor =
    hovered && pointer.current
      ? pointer.current
      : pinned &&
          Math.min(pinned.x, pinned.y) >= 0 &&
          Math.max(pinned.x, pinned.y) <= 1
        ? pinned
        : undefined

  if (failed)
    return (
      <p className="text-center text-body-medium">
        {t("page-stories-map-error")}
      </p>
    )

  return (
    <div className="mx-auto max-w-screen-lg space-y-8">
      <div className="relative">
        <svg
          ref={svg}
          viewBox={view.join(" ")}
          style={{ "--scale": scale } as CSSProperties}
          className={cn(
            "h-auto w-full select-none",
            zoomed
              ? "cursor-grab touch-none active:cursor-grabbing"
              : "touch-pan-x touch-pan-y [&_[data-code]]:cursor-pointer"
          )}
          role="img"
          aria-label={t("page-stories-map-aria-label")}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onPointerOver={(e) => {
            if (e.pointerType !== "mouse" || e.buttons) return
            trackPointer(e)
            setHovered(codeOf(e.target))
          }}
          onPointerLeave={() => setHovered(undefined)}
          onClick={(e) => {
            if (!dragged.current) setSelected(codeOf(e.target))
          }}
        >
          {paths}
          {shapes
            .filter((s) => s.small)
            .map(({ code, x, y, bbox: [x0, y0, x1, y1] }) => (
              // Circles, not stroked outlines: wide strokes on complex paths triple touch hit-test cost
              <circle
                key={code}
                data-code={code}
                cx={x * width}
                cy={y * height}
                fill="transparent"
                className={cn(
                  "[r:calc(11px/var(--scale))] max-md:[r:calc(26px/var(--scale))]",
                  // Once big enough to hit directly, the circle would only cover neighbours
                  Math.max(x1 - x0, y1 - y0) * scale >= 16 && "hidden"
                )}
              />
            ))}
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
              {activeShape.small &&
                Math.max(
                  activeShape.bbox[2] - activeShape.bbox[0],
                  activeShape.bbox[3] - activeShape.bbox[1]
                ) *
                  scale <
                  16 && (
                  <circle
                    cx={activeShape.x * width}
                    cy={activeShape.y * height}
                    r={8 / scale}
                    vectorEffect="non-scaling-stroke"
                    className="fill-none"
                  />
                )}
            </g>
          )}
        </svg>

        <div className="absolute end-2 top-2 flex gap-1">
          {zoomed && (
            <Button
              variant="outline"
              isSecondary
              size="sm"
              className="bg-background"
              onClick={() => animateTo([0, 0, width, height])}
            >
              {t("page-stories-map-show-world")}
            </Button>
          )}
          <Button
            variant="outline"
            isSecondary
            size="sm"
            className="bg-background"
            aria-label={t("page-stories-map-zoom-out")}
            disabled={!zoomed}
            onClick={() => zoomBy(1 / 2)}
          >
            <Minus />
          </Button>
          <Button
            variant="outline"
            isSecondary
            size="sm"
            className="bg-background"
            aria-label={t("page-stories-map-zoom-in")}
            disabled={scale >= MAX_SCALE}
            onClick={() => zoomBy(2)}
          >
            <Plus />
          </Button>
        </div>

        <div aria-live="polite">
          {active && anchor && (
            <div
              ref={tooltip}
              className="pointer-events-none absolute z-10 w-max max-w-56 rounded-lg border bg-background px-3 py-2 shadow-md motion-safe:animate-in motion-safe:duration-150 motion-safe:fade-in"
              style={tooltipPosition(anchor)}
            >
              <p className="font-bold">{active.name}</p>
              {active.value !== undefined ? (
                <p className="flex items-center gap-2 text-sm whitespace-nowrap text-body-medium">
                  <span
                    className={cn(
                      "size-2.5 shrink-0 rounded-full",
                      activeBucket?.bg
                    )}
                  />
                  <span>
                    {t.rich("page-stories-map-ownership", {
                      value: percent(active.value),
                      strong: (chunks) => (
                        <span className="text-xl font-bold text-body tabular-nums">
                          {chunks}
                        </span>
                      ),
                    })}
                  </span>
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

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex w-full flex-col gap-2 md:w-96">
          <span id="adoption-map-picker" className="text-sm text-body-medium">
            {t("page-stories-map-prompt")}
          </span>
          <Select<CountryOption>
            instanceId="adoption-map-picker"
            aria-labelledby="adoption-map-picker"
            options={matches}
            filterOption={null}
            inputValue={query}
            onInputChange={setQuery}
            value={options.find((o) => o.value === selected) ?? null}
            onChange={(option) => {
              const shape = shapes.find((s) => s.code === option?.value)
              if (shape) animateTo(frame(shape.bbox, width, height))
              setSelected(option?.value)
            }}
            placeholder={t("page-stories-map-select-placeholder")}
            noOptionsMessage={() => t("page-stories-map-no-results")}
            formatOptionLabel={({ label, share }, { context }) =>
              context === "menu" && share !== undefined ? (
                <span className="flex justify-between gap-4">
                  {label}
                  <span className="text-body-medium tabular-nums">
                    {percent(share)}
                  </span>
                </span>
              ) : (
                label
              )
            }
            isSearchable
            isClearable
            variant="outline"
          />
        </div>

        <div className="flex flex-col gap-2 text-xs text-body-medium md:items-end">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
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
          </p>
          <p>
            {t.rich("page-stories-map-source", {
              year: source.year,
              link: (chunks) => (
                <InlineLink href={source.url}>{chunks}</InlineLink>
              ),
              name: source.name,
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdoptionMapView
