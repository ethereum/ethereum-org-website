"use client"

import { memo, type PointerEvent, type ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
} from "../anatomy"
import { anatomyFill, anatomyStroke, anatomyStrong } from "../anatomy/tokens"
import { usePartState } from "../diagram-hover"
import { useDiagramFormat } from "../interactive-diagram"

import {
  ERASURE_SIZE,
  type ErasurePart,
  type ErasurePoint,
  type ErasureView,
  ORIGINAL_SLOTS,
  VALUE_MAX,
  VALUE_MIN,
} from "./model"

/*
 * Flat 2D chart: the data values as bars at the even evaluation points, the
 * cubic through them, and the extension evaluated at the odd points between
 * them. Text (ticks, labels) is HTML over the SVG, so it never mirrors in RTL.
 */

const { width: W, height: H } = ERASURE_SIZE
const PLOT_TOP = 50
const PLOT_BOTTOM = 208
const AXIS_X = 54
const SLOT_X0 = 82
const SLOT_GAP = 52
const BAR_HALF = 10
const LABEL_Y = 32

const xOf = (slot: number) => SLOT_X0 + slot * SLOT_GAP
const yIn =
  ({ yMin, yMax }: Pick<ErasureView, "yMin" | "yMax">) =>
  (value: number) =>
    PLOT_BOTTOM - ((value - yMin) / (yMax - yMin)) * (PLOT_BOTTOM - PLOT_TOP)
const pct = (value: number, of: number) => `${(value / of) * 100}%`
const r1 = (n: number) => Math.round(n * 10) / 10

const POP =
  "origin-center animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
const FADE_IN =
  "animate-fade-in [animation-duration:700ms] motion-reduce:animate-none"

interface ErasureRigProps {
  view: ErasureView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  values: number[]
  labels: Record<ErasurePart, ReactNode>
  definitions: Record<ErasurePart, ReactNode>
  onValueChange: (index: number, value: number) => void
  className?: string
}

function ErasureRig({
  view,
  runKey,
  values,
  labels,
  definitions,
  onValueChange,
  className,
}: ErasureRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const format = useDiagramFormat()
  const { yMin, yMax } = view
  const yOf = yIn(view)
  const zeroY = yOf(0)

  const part = (name: ErasurePart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })

  const curvePath = (from: number, to: number) =>
    view.curve
      ?.filter(({ x }) => x >= from - 1e-9 && x <= to + 1e-9)
      .map(({ x, y }, i) => `${i ? "L" : "M"}${r1(xOf(x))},${r1(yOf(y))}`)
      .join(" ")

  const spots = useMemo<AnatomyLabelSpot[]>(() => {
    const yOf = yIn(view)
    const top = (slot: number) =>
      [xOf(slot), yOf(view.points[slot].value) - 6] as [number, number]
    const list: AnatomyLabelSpot[] = []
    const ext = view.points[7]
    if (ext.state !== "hidden")
      list.push({
        id: "extension",
        tone: "gas",
        target: top(7),
        elbow: [xOf(7), LABEL_Y],
        anchor: [xOf(7) - 5, LABEL_Y],
        placement: "start",
      })
    list.push({
      id: "data",
      tone: "entity",
      target: top(4),
      anchor: [xOf(4), LABEL_Y + 6],
      placement: "above",
    })
    if (view.curve) {
      const at = view.curve.find(({ x }) => Math.abs(x - 0.5) < 1e-9)
      if (at)
        list.push({
          id: "polynomial",
          tone: "neutral",
          target: [xOf(0.5), yOf(at.y) - 2],
          anchor: [xOf(0.5), LABEL_Y + 6],
          placement: "above",
        })
    }
    return list
  }, [view])

  const dragTo = (event: PointerEvent<SVGCircleElement>, index: number) => {
    const svg = event.currentTarget.ownerSVGElement
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const y = ((event.clientY - rect.top) / rect.height) * H
    const value =
      yMin + ((PLOT_BOTTOM - y) / (PLOT_BOTTOM - PLOT_TOP)) * (yMax - yMin)
    const next = Math.min(VALUE_MAX, Math.max(VALUE_MIN, Math.round(value)))
    if (next !== values[index]) onValueChange(index, next)
  }

  const bar = (point: ErasurePoint) => {
    const x = xOf(point.slot)
    const top = yOf(point.value)
    const y = Math.min(top, zeroY)
    const height = Math.max(Math.abs(zeroY - top), 0.5)
    const data = point.kind === "data"
    const hue = data ? "entity" : "gas"
    const partState = state(point.kind)
    const lost = point.state === "lost"
    const lit = point.state === "recovered" ? "lit" : partState
    return (
      <rect
        x={x - BAR_HALF}
        y={y}
        width={BAR_HALF * 2}
        height={height}
        rx={2}
        strokeDasharray={lost || !data ? "3 2" : undefined}
        style={{
          fill: lost ? "transparent" : anatomyFill(hue, "start", lit),
        }}
        className={cn(
          lost ? "stroke-diagram-line-faint" : anatomyStroke(hue, lit),
          point.state === "recovered" && POP
        )}
      />
    )
  }

  const dot = (point: ErasurePoint) => {
    const hue = point.kind === "data" ? "entity" : "gas"
    const lost = point.state === "lost"
    return (
      <circle
        cx={xOf(point.slot)}
        cy={yOf(point.value)}
        r={4.5}
        strokeDasharray={lost ? "2 2" : undefined}
        style={{ fill: lost ? "transparent" : anatomyStrong(hue) }}
        className={cn(
          lost ? "stroke-diagram-line" : "stroke-diagram-bg [stroke-width:1.5]",
          point.state === "recovered" && POP
        )}
      />
    )
  }

  const visible = view.points.filter((p) => p.state !== "hidden")
  const solid = curvePath(0, view.curveSplit)
  const dashed =
    view.points[7].state === "hidden"
      ? undefined
      : curvePath(view.curveSplit, 7)

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <g className="pointer-events-none">
          {view.ticks.map((tick) => (
            <path
              key={tick}
              d={`M${AXIS_X},${r1(yOf(tick))} H${W - 16}`}
              className={
                tick === 0 ? "stroke-diagram-line" : "stroke-diagram-line-faint"
              }
            />
          ))}
          <path
            d={`M${AXIS_X},${PLOT_TOP} V${PLOT_BOTTOM}`}
            className="stroke-diagram-line"
          />
        </g>

        <g {...part("extension")}>
          {visible
            .filter((p) => p.kind === "extension")
            .map((p) => (
              <g key={`${p.slot}-${p.state}-${runKey}`}>{bar(p)}</g>
            ))}
        </g>
        <g {...part("data")}>
          {visible
            .filter((p) => p.kind === "data")
            .map((p) => (
              <g key={`${p.slot}-${p.state}-${runKey}`}>{bar(p)}</g>
            ))}
        </g>

        {view.curve && (
          <g
            key={view.motion === "recover" ? runKey : "curve"}
            {...part("polynomial")}
          >
            <g className={view.motion === "recover" ? FADE_IN : undefined}>
              <path
                d={solid}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                className={cn(
                  "[stroke-width:1.5]",
                  state("polynomial") === "rest"
                    ? "stroke-diagram-pipe"
                    : "stroke-diagram-line-strong"
                )}
              />
              {dashed && (
                <path
                  d={dashed}
                  fill="none"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  className="stroke-diagram-gas [stroke-width:1.5]"
                />
              )}
            </g>
          </g>
        )}

        <g {...part("extension")}>
          {visible
            .filter((p) => p.kind === "extension")
            .map((p) => (
              <g key={`${p.slot}-${p.state}-${runKey}`}>{dot(p)}</g>
            ))}
        </g>
        <g {...part("data")}>
          {visible
            .filter((p) => p.kind === "data")
            .map((p) => (
              <g key={`${p.slot}-${p.state}-${runKey}`}>{dot(p)}</g>
            ))}
          {ORIGINAL_SLOTS.map((slot, index) =>
            view.points[slot].state === "lost" ? null : (
              <circle
                key={slot}
                cx={xOf(slot)}
                cy={yOf(view.points[slot].value)}
                r={13}
                stroke="none"
                style={{ fill: "transparent" }}
                className="cursor-ns-resize touch-none"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId)
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId))
                    dragTo(event, index)
                }}
              />
            )
          )}
        </g>
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {view.ticks.map((tick) => (
          <span
            key={tick}
            className="absolute -translate-x-full -translate-y-1/2 pe-1.5 text-sm leading-none text-body-medium tabular-nums rtl:translate-x-full"
            style={{
              insetInlineStart: pct(AXIS_X, W),
              top: pct(yOf(tick), H),
            }}
          >
            {format(tick)}
          </span>
        ))}
      </div>

      <AnatomyLabels
        width={W}
        height={H}
        spots={spots}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

export default memo(ErasureRig)
