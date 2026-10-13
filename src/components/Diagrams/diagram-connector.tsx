import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import { DiagramPill } from "./diagram-label"

type ArrowheadDirection = "end" | "start" | "down" | "up"

// The path points to inline-end; inline arrows mirror in RTL with the flow.
const arrowheadTransform: Record<ArrowheadDirection, string> = {
  end: "rtl:-scale-x-100",
  start: "rotate-180 rtl:rotate-0",
  down: "rotate-90",
  up: "-rotate-90",
}

export function DiagramArrowhead({
  direction,
  className,
}: {
  direction: ArrowheadDirection
  className?: string
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 10"
      className={cn(
        "size-2.5 shrink-0 overflow-visible",
        arrowheadTransform[direction],
        className
      )}
    >
      <path
        d="M1 1 9 5 1 9z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Axis = "x" | "y"

export interface DiagramConnectorProps {
  /** `responsive` is a vertical (block) connector below `md` and horizontal (inline) from `md`. */
  orientation?: "inline" | "block" | "responsive"
  /** Solid for calls, dashed for messages and flows. */
  line?: "solid" | "dashed"
  /** Which end(s) carry an arrowhead; `start`/`end` follow reading direction. */
  arrow?: "end" | "start" | "both" | "none"
  label?: ReactNode
  /** `center` sits the pill on the line; `before` puts it above (inline) or at the start side (block). */
  labelPlacement?: "center" | "before"
  /** Extra classes on the `<line>`, e.g. a `stroke-dashoffset` flow animation hook. */
  lineClassName?: string
  /**
   * Renders a travelling dot that moves in the arrow's direction when shown.
   * These classes control when it is shown (it is `hidden` by default).
   */
  tokenClassName?: string
  className?: string
}

function ConnectorAxis({
  axis,
  line,
  arrow,
  label,
  labelPlacement,
  lineClassName,
  tokenClassName,
  className,
}: Omit<DiagramConnectorProps, "orientation"> & { axis: Axis }) {
  const isX = axis === "x"
  // Draw toward the arrow so dash flow and the token move the way it points.
  const reverse = arrow === "start"
  const coords = isX
    ? {
        x1: reverse ? "100%" : "0",
        x2: reverse ? "0" : "100%",
        y1: "50%",
        y2: "50%",
      }
    : {
        x1: "50%",
        x2: "50%",
        y1: reverse ? "100%" : "0",
        y2: reverse ? "0" : "100%",
      }
  const hasStart = arrow === "start" || arrow === "both"
  const hasEnd = arrow === "end" || arrow === "both"
  // On a vertical line the label runs along it, so narrow lanes don't crush it.
  const pillClassName = isX
    ? undefined
    : "px-0.5 py-2.5 whitespace-nowrap [writing-mode:vertical-rl]"

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1",
        isX ? "w-full flex-col" : "h-full flex-row",
        className
      )}
    >
      {label && labelPlacement === "before" && (
        <DiagramPill className={pillClassName}>{label}</DiagramPill>
      )}
      <div
        className={cn(
          "relative flex items-center",
          isX ? "w-full flex-row" : "h-full min-h-12 flex-col"
        )}
      >
        {hasStart && <DiagramArrowhead direction={isX ? "start" : "up"} />}
        <svg
          aria-hidden
          className={cn(
            "overflow-visible",
            isX ? "h-2 min-w-8 flex-1 rtl:-scale-x-100" : "min-h-8 w-2 flex-1"
          )}
        >
          <line
            {...coords}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={line === "dashed" ? "4 8" : undefined}
            className={lineClassName}
          />
        </svg>
        {hasEnd && <DiagramArrowhead direction={isX ? "end" : "down"} />}
        {label && labelPlacement === "center" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <DiagramPill className={pillClassName}>{label}</DiagramPill>
          </span>
        )}
        {tokenClassName && (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 hidden",
              isX && "rtl:-scale-x-100",
              tokenClassName
            )}
          >
            <span
              className={cn(
                "flex size-full items-center justify-end motion-reduce:invisible",
                isX
                  ? "animate-diagram-travel-x flex-row"
                  : "animate-diagram-travel-y flex-col",
                reverse && "[animation-direction:reverse]"
              )}
            >
              <span className="size-3 shrink-0 rounded-full bg-primary" />
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * Straight connector between two diagram cells. It stretches to fill its
 * cell, so place it in its own grid/flex lane between the nodes it joins.
 */
export function DiagramConnector({
  orientation = "inline",
  line = "solid",
  arrow = "end",
  labelPlacement = "center",
  className,
  ...props
}: DiagramConnectorProps) {
  const shared = { line, arrow, labelPlacement, ...props }

  if (orientation === "responsive") {
    return (
      <div className={cn("flex text-body-medium", className)}>
        <ConnectorAxis axis="y" className="md:hidden" {...shared} />
        <ConnectorAxis axis="x" className="max-md:hidden" {...shared} />
      </div>
    )
  }

  return (
    <ConnectorAxis
      axis={orientation === "inline" ? "x" : "y"}
      className={cn("text-body-medium", className)}
      {...shared}
    />
  )
}

const elbowSides = {
  "top-end": "border-s-2 border-b-2 rounded-es-xl",
  "top-start": "border-e-2 border-b-2 rounded-ee-xl",
  "bottom-end": "border-s-2 border-t-2 rounded-ss-xl",
  "bottom-start": "border-e-2 border-t-2 rounded-se-xl",
} as const

const elbowArrowPosition = {
  "top-end": "-bottom-1.5 -inset-e-2.5",
  "top-start": "-bottom-1.5 -inset-s-2.5",
  "bottom-end": "-top-1.5 -inset-e-2.5",
  "bottom-start": "-top-1.5 -inset-s-2.5",
} as const

export interface DiagramElbowProps {
  /** Edge the connector leaves from (vertical leg). */
  from: "top" | "bottom"
  /** Side the horizontal leg runs toward; follows reading direction. */
  to: "start" | "end"
  line?: "solid" | "dashed"
  arrow?: "end" | "none"
  className?: string
}

/**
 * Static rounded L-shaped connector drawn with logical borders, so it mirrors
 * in RTL and never distorts. Size it with its grid cell; combine several for
 * trees. Not animatable -- animate straight `DiagramConnector`s only.
 */
export function DiagramElbow({
  from,
  to,
  line = "solid",
  arrow = "end",
  className,
}: DiagramElbowProps) {
  const key = `${from}-${to}` as const
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex min-h-8 min-w-8 text-body-medium",
        className
      )}
    >
      <div
        className={cn(
          "flex-1 border-current",
          line === "dashed" ? "border-dashed" : "border-solid",
          elbowSides[key]
        )}
      />
      {arrow === "end" && (
        <DiagramArrowhead
          direction={to}
          className={cn("absolute", elbowArrowPosition[key])}
        />
      )}
    </div>
  )
}
