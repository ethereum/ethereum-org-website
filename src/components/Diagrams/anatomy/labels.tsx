"use client"

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { useDiagramHover } from "../diagram-hover"

import { ISO_SVG_CLASS, type Point, r1 } from "./iso"
import {
  ANATOMY_HOVER_STROKE,
  ANATOMY_LIT_STROKE,
  ANATOMY_LIT_TEXT,
  type AnatomyHue,
  DIAGRAM_SVG_FALLBACKS,
} from "./tokens"

export type AnatomyLabelPlacement = "above" | "below" | "start"

export interface AnatomyLabelSpot {
  id: string
  /** On the part: where the leader starts. */
  target: Point
  /** Optional single elbow between the part and the label. */
  elbow?: Point
  /** Where the label is pinned, in viewBox units; it grows away from here. */
  anchor: Point
  placement: AnatomyLabelPlacement
  /** The part's colour role: when active, its label and leader take it. */
  tone: AnatomyHue
}

const PLACEMENT: Record<AnatomyLabelPlacement, string> = {
  // Pinned at its bottom centre.
  above: "-translate-x-1/2 -translate-y-full rtl:translate-x-1/2",
  // Pinned at its top centre.
  below: "-translate-x-1/2 rtl:translate-x-1/2",
  // Pinned at its end edge, vertically centred.
  start: "-translate-x-full -translate-y-1/2 rtl:translate-x-full",
}

const leaderEnd = ({ anchor: [x, y], placement }: AnatomyLabelSpot): Point =>
  placement === "above"
    ? [x, y + 2]
    : placement === "below"
      ? [x, y - 2]
      : [x + 3, y]

const leaderPath = (spot: AnatomyLabelSpot) =>
  [spot.target, ...(spot.elbow ? [spot.elbow] : []), leaderEnd(spot)]
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
    .join(" ")

const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

// Breathing room between two labels before they count as colliding.
const GAP_PX = 4

// Until the first measurement (server HTML, before hydration), only the
// highest-priority labels show, so none can overlap before they are checked.
const UNMEASURED_LABELS = 3

/**
 * Concept labels for an anatomy diagram: single-line HTML text pinned beside
 * each part, joined by a short hairline leader. Labels never wrap: one that
 * would leave the drawing, sit on a shape, or touch an earlier label or
 * leader in `spots` is dropped with its leader. On narrow screens the figure
 * then relies on the remaining labels and the figcaption.
 *
 * The labels are one tab stop (roving tabindex): Tab reaches the group,
 * arrow keys, Home and End move between visible labels. Pointing at or
 * focusing a label highlights its part (shared hover state, see
 * diagram-hover.tsx), which shows the part's definition in the status line;
 * screen readers get the definition through `aria-describedby`.
 *
 * Measuring waits until the drawing is near the viewport, so a server-rendered
 * diagram costs no layout work while the page loads.
 */
export function AnatomyLabels({
  width,
  height,
  spots,
  labels,
  definitions,
  litId,
}: {
  /** The drawing's viewBox size. */
  width: number
  height: number
  /** In priority order: when two collide, the earlier one stays. */
  spots: AnatomyLabelSpot[]
  labels: Record<string, ReactNode>
  /** One-line definition per part, read with the label. */
  definitions: Record<string, ReactNode>
  litId?: string | null
}) {
  const t = useTranslations("component-diagrams")
  const idPrefix = useId()
  const { hovered, setHovered } = useDiagramHover()
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({})
  const focusRefs = useRef<Record<string, HTMLSpanElement | null>>({})
  // null until measured: see UNMEASURED_LABELS.
  const [hidden, setHidden] = useState<string[] | null>(null)
  const [focusId, setFocusId] = useState(spots[0]?.id)

  const isHidden = (id: string) =>
    hidden
      ? hidden.includes(id)
      : spots.findIndex((spot) => spot.id === id) >= UNMEASURED_LABELS
  const visibleIds = spots.map(({ id }) => id).filter((id) => !isHidden(id))
  const tabStop = visibleIds.includes(focusId) ? focusId : visibleIds[0]

  const onKeyDown = (event: KeyboardEvent, id: string) => {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
    const i = visibleIds.indexOf(id)
    const n = visibleIds.length
    const target = {
      ArrowDown: i + 1,
      ArrowUp: i - 1,
      ArrowRight: rtl ? i - 1 : i + 1,
      ArrowLeft: rtl ? i + 1 : i - 1,
      Home: 0,
      End: n - 1,
    }[event.key]
    if (target === undefined || n === 0) return
    event.preventDefault()
    const next = visibleIds[(target + n) % n]
    setFocusId(next)
    focusRefs.current[next]?.focus()
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const measure = () => {
      const bounds = container.getBoundingClientRect()
      const rtl = getComputedStyle(container).direction === "rtl"
      // viewBox point -> page point (the drawing is mirrored in RTL).
      const toPage = ([x, y]: Point): Point => {
        const px = (x / width) * bounds.width
        return [
          rtl ? bounds.right - px : bounds.left + px,
          bounds.top + (y / height) * bounds.height,
        ]
      }
      // Each leader segment as a thin box, to keep labels off other leaders.
      const leaderBoxes = (spot: AnatomyLabelSpot) => {
        const points = [
          spot.target,
          ...(spot.elbow ? [spot.elbow] : []),
          leaderEnd(spot),
        ].map(toPage)
        return points.slice(1).map(([x2, y2], i) => {
          const [x1, y1] = points[i]
          return new DOMRect(
            Math.min(x1, x2) - 1,
            Math.min(y1, y2) - 1,
            Math.abs(x2 - x1) + 2,
            Math.abs(y2 - y1) + 2
          )
        })
      }
      const overlaps = (a: DOMRect, b: DOMRect, gap = GAP_PX) =>
        a.left < b.right + gap &&
        b.left < a.right + gap &&
        a.top < b.bottom + gap &&
        b.top < a.bottom + gap

      // Shapes a label must not sit on: everything in the drawing, the plate
      // included (labels sit outside it).
      const drawing = container.parentElement?.querySelector(
        "svg[data-anatomy-drawing]"
      )
      // Geometric hit test (works off-screen, unlike elementsFromPoint).
      // Each shape's paint and inverse transform are read once per measure,
      // and a label only tests the shapes whose box it overlaps.
      const shapes = drawing
        ? [...drawing.querySelectorAll("*")].flatMap((el) => {
            // Shadows are soft ground tone, not shapes: labels may sit on them.
            if (
              !(el instanceof SVGGeometryElement) ||
              el.closest("clipPath") ||
              el.hasAttribute("data-anatomy-shadow")
            )
              return []
            const ctm = el.getScreenCTM()
            // A shape scaled to nothing (e.g. an empty level) is invisible
            // and has no inverse; skip it rather than throw.
            if (!ctm || ctm.a * ctm.d - ctm.b * ctm.c === 0) return []
            const style = getComputedStyle(el)
            return [
              {
                el,
                box: el.getBoundingClientRect(),
                inverse: ctm.inverse(),
                fill: style.fill !== "none",
                stroke: style.stroke !== "none",
              },
            ]
          })
        : []
      const shapesNear = (rect: DOMRect) =>
        shapes.filter(({ box }) => overlaps(rect, box, 0))
      const hitsShape = (near: typeof shapes, x: number, y: number) =>
        near.some(({ el, inverse, fill, stroke }) => {
          const point = new DOMPoint(x, y).matrixTransform(inverse)
          return (
            (fill && el.isPointInFill(point)) ||
            (stroke && el.isPointInStroke(point))
          )
        })
      // Sample the label box edge to edge, so corners count too.
      const onDrawing = (rect: DOMRect) => {
        const near = shapesNear(rect)
        return (
          near.length > 0 &&
          [0, 0.25, 0.5, 0.75, 1].some((fx) =>
            [0, 0.5, 1].some((fy) =>
              hitsShape(
                near,
                rect.left + 1 + (rect.width - 2) * fx,
                rect.top + 1 + (rect.height - 2) * fy
              )
            )
          )
        )
      }

      const placedLabels: DOMRect[] = []
      const placedLeaders: DOMRect[] = []
      const drop: string[] = []
      for (const spot of spots) {
        const rect = labelRefs.current[spot.id]?.getBoundingClientRect()
        if (!rect) continue
        const leaders = leaderBoxes(spot)
        const fits =
          rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1
        const clear =
          !onDrawing(rect) &&
          !placedLabels.some((p) => overlaps(rect, p)) &&
          !placedLeaders.some((l) => overlaps(rect, l, 0)) &&
          !leaders.some((l) => placedLabels.some((p) => overlaps(l, p, 0)))
        if (fits && clear) {
          placedLabels.push(rect)
          placedLeaders.push(...leaders)
        } else drop.push(spot.id)
      }
      setHidden((prev) =>
        prev &&
        prev.length === drop.length &&
        prev.every((id, i) => id === drop[i])
          ? prev
          : drop
      )
    }

    // Label placement is a nicety: a measuring failure keeps the last result
    // instead of taking the figure down.
    const safeMeasure = () => {
      try {
        measure()
      } catch {
        // keep the previous placement
      }
    }
    // First measure once near the viewport, then on every resize and once
    // the web fonts have loaded (a font swap changes label widths, not the
    // container's size).
    let resize: ResizeObserver | undefined
    const start = () => {
      if (resize) return
      resize = new ResizeObserver(safeMeasure)
      resize.observe(container)
      document.fonts?.ready.then(safeMeasure)
    }
    const inView =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return
              inView?.disconnect()
              start()
            },
            { rootMargin: "200px 0px" }
          )
    if (inView) inView.observe(container)
    else start()
    return () => {
      inView?.disconnect()
      resize?.disconnect()
    }
  }, [spots, width, height])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      <svg
        aria-hidden
        viewBox={`0 0 ${width} ${height}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={cn(ISO_SVG_CLASS, "absolute inset-0 h-full")}
      >
        {spots.map((spot) =>
          isHidden(spot.id) ? null : (
            <path
              key={spot.id}
              d={leaderPath(spot)}
              fill="none"
              strokeLinejoin="round"
              className={cn(
                hovered === spot.id
                  ? ANATOMY_HOVER_STROKE
                  : litId === spot.id
                    ? ANATOMY_LIT_STROKE[spot.tone]
                    : "stroke-diagram-line"
              )}
            />
          )
        )}
      </svg>

      <div role="group" aria-label={t("diagram-parts-label")}>
        {spots.map((spot) => (
          <span
            key={spot.id}
            data-part={spot.id}
            ref={(el) => {
              labelRefs.current[spot.id] = el
            }}
            className={cn(
              "absolute text-xs leading-tight whitespace-nowrap",
              PLACEMENT[spot.placement],
              isHidden(spot.id) ? "invisible" : "pointer-events-auto"
            )}
            style={{
              insetInlineStart: pct(spot.anchor[0], width),
              top: pct(spot.anchor[1], height),
            }}
          >
            <span
              ref={(el) => {
                focusRefs.current[spot.id] = el
              }}
              tabIndex={spot.id === tabStop ? 0 : -1}
              aria-describedby={`${idPrefix}-${spot.id}`}
              onKeyDown={(event) => onKeyDown(event, spot.id)}
              onFocus={() => {
                setFocusId(spot.id)
                setHovered(spot.id)
              }}
              onBlur={() => setHovered(null)}
              className={cn(
                "cursor-default rounded-sm font-bold outline-offset-2 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none",
                hovered === spot.id || litId === spot.id
                  ? ANATOMY_LIT_TEXT[spot.tone]
                  : "text-body",
                hovered !== null && hovered !== spot.id && "opacity-70"
              )}
            >
              {labels[spot.id]}
            </span>
            <span id={`${idPrefix}-${spot.id}`} className="sr-only">
              {definitions[spot.id]}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
