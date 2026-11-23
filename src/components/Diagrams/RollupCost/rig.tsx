"use client"

import { memo, type ReactNode, useMemo } from "react"

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

import {
  L1_DATA_PER_TX,
  L1_OVERHEAD,
  L2_EXECUTION,
  ROLLUP_COST_SIZE,
  type RollupCostPart,
  type RollupCostView,
  SEAT_COUNT,
} from "./model"

/*
 * Flat 2D drawing: a "bus" of seats on layer 2 (the batch), a layer 1 block
 * holding the one batch transaction, and a bar of what each user pays.
 */

const { width: W, height: H } = ROLLUP_COST_SIZE

const BUS = { x: 24, y: 64, w: 180, h: 132 }
const SEAT_COLS = 10
const SEAT_X0 = 42
const SEAT_DX = 16
const SEAT_Y0 = 80
const SEAT_DY = 11.6
const SEAT_R = 4

const BLOCK = { x: 284, y: 40, w: 176, h: 68 }
const PARCEL_X = 298
const PARCEL_Y = 54
const PARCEL_H = 22
// Overhead drawn 28 wide, so 1,000 transactions of data (4,000 units) fit.
const PARCEL_SCALE = 28 / L1_OVERHEAD
const OVERHEAD_W = L1_OVERHEAD * PARCEL_SCALE

const BAR = { x: 252, y: 160, w: 208, h: 18 }
// Floor so the L2 part stays visible when it is a sliver of the track.
const MIN_SEGMENT = 4

const ARROW = "M206,104 C244,104 248,66 278,66"

const POP =
  "origin-center animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
const GROW =
  "origin-left [transform-box:fill-box] transition-transform duration-700 ease-out motion-reduce:transition-none"

const seats = Array.from({ length: SEAT_COUNT }, (_, i) => ({
  cx: SEAT_X0 + (i % SEAT_COLS) * SEAT_DX,
  cy: SEAT_Y0 + Math.floor(i / SEAT_COLS) * SEAT_DY,
}))

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n))

interface RollupCostRigProps {
  view: RollupCostView
  /** Changes on every step and preset, to restart one-shot animations. */
  runKey: string
  labels: Record<RollupCostPart, ReactNode>
  definitions: Record<RollupCostPart, ReactNode>
  /** Shown under the batch when each seat stands for several transactions. */
  seatNote?: ReactNode
  className?: string
}

/** Bar widths: before the split, what one transaction pays posting alone. */
const barWidths = (view: RollupCostView) => {
  const share = view.split ? view.l1Share : L1_OVERHEAD + L1_DATA_PER_TX
  return {
    share: Math.max(MIN_SEGMENT, (share / view.solo) * BAR.w),
    execution: Math.max(MIN_SEGMENT, (L2_EXECUTION / view.solo) * BAR.w),
  }
}

function RollupCostRig({
  view,
  runKey,
  labels,
  definitions,
  seatNote,
  className,
}: RollupCostRigProps) {
  const { state, dimmed } = usePartState(view.litPart)

  const part = (name: RollupCostPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })

  const bar = barWidths(view)
  const dataW = Math.max(1, view.count * L1_DATA_PER_TX * PARCEL_SCALE)

  const spots = useMemo<AnatomyLabelSpot[]>(() => {
    const { share, execution } = barWidths(view)
    const shareX = BAR.x + share / 2
    const execX = BAR.x + share + execution / 2
    return [
      {
        id: "batch",
        tone: "entity",
        target: [BUS.x + BUS.w / 2, BUS.y],
        anchor: [BUS.x + BUS.w / 2, BUS.y - 20],
        placement: "above",
      },
      {
        id: "block",
        tone: "entity",
        target: [BLOCK.x + BLOCK.w / 2, BLOCK.y],
        anchor: [BLOCK.x + BLOCK.w / 2, BLOCK.y - 16],
        placement: "above",
      },
      {
        id: "share",
        tone: "gas",
        target: [shareX, BAR.y + BAR.h],
        elbow: [shareX, BAR.y + BAR.h + 12],
        anchor: [clamp(shareX, BAR.x + 56, W - 64), BAR.y + BAR.h + 14],
        placement: "below",
      },
      {
        id: "execution",
        tone: "gas",
        target: [execX, BAR.y],
        elbow: [execX, BAR.y - 16],
        anchor: [clamp(execX, BAR.x + 60, W - 64), BAR.y - 18],
        placement: "above",
      },
    ]
  }, [view])

  const batchState = state("batch")
  const blockState = state("block")

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <g {...part("batch")}>
          {[60, 168].map((cx) => (
            <circle
              key={cx}
              cx={cx}
              cy={BUS.y + BUS.h + 4}
              r={9}
              style={{ fill: anatomyFill("neutral", "end") }}
              className="stroke-diagram-line"
            />
          ))}
          <rect
            x={BUS.x}
            y={BUS.y}
            width={BUS.w}
            height={BUS.h}
            rx={14}
            style={{ fill: anatomyFill("entity", "top", batchState) }}
            className={anatomyStroke("entity", batchState)}
          />
          <path
            d={`M${BUS.x + 14},${BUS.y + 8} H${BUS.x + BUS.w - 14}`}
            className="stroke-diagram-line-faint"
          />
          {seats.map(({ cx, cy }, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={SEAT_R}
              style={{ fill: anatomyFill("neutral", "top") }}
              className="stroke-diagram-line-faint"
            />
          ))}
          <g key={`seats-${runKey}`}>
            {seats.slice(0, view.seatsFilled).map(({ cx, cy }, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={SEAT_R}
                stroke="none"
                style={{
                  fill: anatomyStrong("entity"),
                  animationDelay:
                    view.motion === "gather"
                      ? `${Math.round((i * 600) / view.seatsFilled)}ms`
                      : undefined,
                }}
                className={view.motion === "gather" ? POP : undefined}
              />
            ))}
          </g>
        </g>

        <g className="pointer-events-none">
          <path
            d={ARROW}
            className={
              view.posted ? "stroke-diagram-entity" : "stroke-diagram-pipe"
            }
          />
          <path
            d="M278,61 L286,66 L278,71 Z"
            stroke="none"
            className={
              view.posted ? "fill-diagram-entity" : "fill-diagram-pipe"
            }
          />
          {view.motion === "post" && (
            <path
              key={`flow-${runKey}`}
              d={ARROW}
              strokeDasharray="4 5"
              className="animate-diagram-flow stroke-diagram-entity [stroke-width:2] motion-reduce:animate-none"
            />
          )}
        </g>

        <g {...part("block")}>
          <rect
            x={BLOCK.x}
            y={BLOCK.y}
            width={BLOCK.w}
            height={BLOCK.h}
            rx={8}
            style={{ fill: anatomyFill("neutral", "top") }}
            className={anatomyStroke("neutral", blockState)}
          />
          {[44, 60, 28].map((w, i) => (
            <rect
              key={i}
              x={PARCEL_X + [0, 52, 120][i]}
              y={BLOCK.y + BLOCK.h - 20}
              width={w}
              height={8}
              rx={4}
              style={{ fill: anatomyFill("neutral", "start") }}
              className="stroke-diagram-line-faint"
            />
          ))}
          {view.posted ? (
            <g key={`parcel-${runKey}`} className={POP}>
              <rect
                x={PARCEL_X}
                y={PARCEL_Y}
                width={OVERHEAD_W}
                height={PARCEL_H}
                rx={3}
                style={{ fill: anatomyFill("entity", "end", blockState) }}
                className={anatomyStroke("entity", blockState)}
              />
              <rect
                x={PARCEL_X + OVERHEAD_W}
                y={PARCEL_Y + 4}
                width={dataW}
                height={PARCEL_H - 8}
                style={{ fill: anatomyFill("entity", "start", blockState) }}
                className={anatomyStroke("entity", blockState)}
              />
            </g>
          ) : (
            <rect
              x={PARCEL_X}
              y={PARCEL_Y}
              width={OVERHEAD_W}
              height={PARCEL_H}
              rx={3}
              strokeDasharray="3 3"
              style={{ fill: "transparent" }}
              className="stroke-diagram-line-faint"
            />
          )}
        </g>

        <rect
          x={BAR.x}
          y={BAR.y}
          width={BAR.w}
          height={BAR.h}
          rx={4}
          strokeDasharray="3 3"
          style={{ fill: anatomyFill("neutral", "top") }}
          className="pointer-events-none stroke-diagram-line-faint"
        />
        <g {...part("share")}>
          <rect
            x={BAR.x}
            y={BAR.y}
            width={BAR.w}
            height={BAR.h}
            style={{
              fill: view.split
                ? anatomyStrong("gas")
                : anatomyFill("gas", "end", state("share")),
              transform: `scaleX(${bar.share / BAR.w})`,
            }}
            className={cn(anatomyStroke("gas", state("share")), GROW)}
          />
        </g>
        <g {...part("execution")}>
          <rect
            x={BAR.x}
            y={BAR.y}
            width={bar.execution}
            height={BAR.h}
            style={{
              fill: anatomyFill("gas", "end", "lit"),
              transform: `translateX(${bar.share}px)`,
            }}
            className={cn(
              anatomyStroke("gas", state("execution")),
              "transition-transform duration-700 ease-out motion-reduce:transition-none"
            )}
          />
        </g>
      </svg>

      {seatNote && (
        <span
          aria-hidden
          className="pointer-events-none absolute text-sm leading-none text-nowrap text-body-medium"
          style={{
            insetInlineStart: `${(BUS.x / W) * 100}%`,
            top: `${((BUS.y + BUS.h + 22) / H) * 100}%`,
          }}
        >
          {seatNote}
        </span>
      )}

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

export default memo(RollupCostRig)
