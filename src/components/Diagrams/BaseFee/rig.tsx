"use client"

import { memo, type PointerEvent, type ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_COLOR,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
  r1,
} from "../anatomy"
import { anatomyFill, anatomyStroke, anatomyStrong } from "../anatomy/tokens"
import { usePartState } from "../diagram-hover"
import { useDiagramFormat } from "../interactive-diagram"

import {
  BASE_FEE_SIZE,
  type BaseFeePart,
  type BaseFeeView,
  BLOCK_COUNT,
  feeOf,
  UNITS,
} from "./model"

/*
 * Flat 2D chart: base fee per block as steps on top, gas used per block as
 * bars below, with the gas limit and the dashed target. Slot BLOCK_COUNT is
 * the next block, whose base fee is known before it is built. Text (ticks)
 * is HTML over the SVG, so it never mirrors in RTL.
 */

const { width: W, height: H } = BASE_FEE_SIZE
const AXIS_X = 96
const RIGHT_X = W - 6
const SLOT_X0 = 120
const SLOT_GAP = 42
const BAR_HALF = 13
const LABEL_Y = 24
const FEE_TOP = 50
const FEE_BOTTOM = 146
const GAS_TOP = 168
const GAS_BOTTOM = 262
const GAS_TARGET_Y = (GAS_TOP + GAS_BOTTOM) / 2
const TICK_Y = GAS_BOTTOM + 8
const LEFT_LABEL_X = AXIS_X - 6

const xOf = (slot: number) => SLOT_X0 + slot * SLOT_GAP
const gasY = (ofLimit: number) => GAS_BOTTOM - ofLimit * (GAS_BOTTOM - GAS_TOP)
const pct = (value: number, of: number) => `${(value / of) * 100}%`

const POP =
  "origin-center animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"

interface BaseFeeRigProps {
  view: BaseFeeView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<BaseFeePart, ReactNode>
  definitions: Record<BaseFeePart, ReactNode>
  /** Names the block-number axis. */
  axisLabel: ReactNode
  onUnitsChange: (index: number, units: number) => void
  className?: string
}

function BaseFeeRig({
  view,
  runKey,
  labels,
  definitions,
  axisLabel,
  onUnitsChange,
  className,
}: BaseFeeRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const format = useDiagramFormat()
  const feeY = (gwei: number) =>
    FEE_BOTTOM - (gwei / view.feeMax) * (FEE_BOTTOM - FEE_TOP)

  const part = (name: BaseFeePart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })

  const fees = Array.from({ length: view.feesShown }, (_, i) =>
    feeOf(view, i + 1)
  )
  const feePath = fees
    .map((gwei, i) => {
      const y = r1(feeY(gwei))
      const x0 = xOf(i) - SLOT_GAP / 2
      return `${i ? "V" : `M${x0},`}${y} H${xOf(i) + SLOT_GAP / 2}`
    })
    .join(" ")

  const spots = useMemo<AnatomyLabelSpot[]>(() => {
    const yOfFee = (gwei: number) =>
      FEE_BOTTOM - (gwei / view.feeMax) * (FEE_BOTTOM - FEE_TOP)
    const newest = view.feesShown - 1
    const x = xOf(newest)
    const dotTop = yOfFee(feeOf(view, newest + 1)) - 5
    const first = gasY(view.blocks[0].ofTarget / 2)
    const usedY = GAS_BOTTOM - 12
    return [
      x > W / 2
        ? {
            id: "base-fee",
            tone: "neutral",
            target: [x, dotTop],
            elbow: [x, LABEL_Y],
            anchor: [x - 5, LABEL_Y],
            placement: "start",
          }
        : {
            id: "base-fee",
            tone: "neutral",
            target: [x, dotTop],
            anchor: [x, LABEL_Y + 8],
            placement: "above",
          },
      {
        id: "block",
        tone: "gas",
        target: [
          xOf(0) - BAR_HALF,
          first < usedY ? usedY : (first + GAS_BOTTOM) / 2,
        ],
        anchor: [LEFT_LABEL_X, usedY],
        placement: "start",
      },
      {
        id: "limit",
        tone: "neutral",
        target: [AXIS_X + 2, GAS_TOP],
        anchor: [LEFT_LABEL_X, GAS_TOP],
        placement: "start",
      },
      {
        id: "target",
        tone: "neutral",
        target: [AXIS_X + 2, GAS_TARGET_Y],
        anchor: [LEFT_LABEL_X, GAS_TARGET_Y],
        placement: "start",
      },
    ]
  }, [view])

  const dragTo = (event: PointerEvent<SVGRectElement>, index: number) => {
    const svg = event.currentTarget.ownerSVGElement
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const y = ((event.clientY - rect.top) / rect.height) * H
    const units = Math.round(
      ((GAS_BOTTOM - y) / (GAS_BOTTOM - GAS_TOP)) * UNITS
    )
    const next = Math.min(UNITS, Math.max(0, units))
    if (next !== view.blocks[index].units) onUnitsChange(index, next)
  }

  const newestBlock = view.step - 1
  const blockState = state("block")
  const feeState = state("base-fee")

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
          {view.feeTicks.map((tick) => (
            <path
              key={tick}
              d={`M${AXIS_X},${r1(feeY(tick))} H${RIGHT_X}`}
              className={
                tick === 0 ? "stroke-diagram-line" : "stroke-diagram-line-faint"
              }
            />
          ))}
          <path
            d={`M${AXIS_X},${GAS_BOTTOM} H${RIGHT_X}`}
            className="stroke-diagram-line"
          />
          <rect
            x={xOf(BLOCK_COUNT) - BAR_HALF}
            y={GAS_TOP}
            width={BAR_HALF * 2}
            height={GAS_BOTTOM - GAS_TOP}
            rx={2}
            strokeDasharray="3 3"
            style={{ fill: "transparent" }}
            className="stroke-diagram-line-faint"
          />
          {/* Keep-out for the block numbers, so labels avoid them. */}
          <rect
            x={0}
            y={TICK_Y - 2}
            width={W}
            height={H - TICK_Y + 2}
            stroke="none"
            style={{ fill: "transparent" }}
          />
        </g>

        <g {...part("limit")}>
          <path
            d={`M${AXIS_X},${GAS_TOP} H${RIGHT_X}`}
            className={anatomyStroke("neutral", state("limit"))}
          />
        </g>

        <g {...part("block")}>
          {view.blocks.map((block, i) => {
            const top = gasY(block.ofTarget / 2)
            const height = Math.max(GAS_BOTTOM - top, 0.5)
            const lit = i === newestBlock ? "lit" : blockState
            return (
              <g
                key={`${i}-${block.built}-${i === newestBlock ? runKey : ""}`}
                className={i === newestBlock ? POP : undefined}
              >
                <rect
                  x={xOf(i) - BAR_HALF}
                  y={top}
                  width={BAR_HALF * 2}
                  height={height}
                  rx={2}
                  strokeDasharray={block.built ? undefined : "3 2"}
                  style={{
                    fill: block.built
                      ? anatomyFill("gas", "start", lit)
                      : "transparent",
                  }}
                  className={
                    block.built
                      ? anatomyStroke("gas", lit)
                      : "stroke-diagram-line"
                  }
                />
                <circle
                  cx={xOf(i)}
                  cy={top}
                  r={3.5}
                  style={{
                    fill: block.built ? anatomyStrong("gas") : DIAGRAM_COLOR.bg,
                  }}
                  className={
                    block.built
                      ? "stroke-diagram-bg [stroke-width:1.5]"
                      : "stroke-diagram-line"
                  }
                />
              </g>
            )
          })}
        </g>

        <g {...part("target")}>
          <path
            d={`M${AXIS_X},${GAS_TARGET_Y} H${RIGHT_X}`}
            strokeDasharray="5 4"
            className={anatomyStroke("neutral", state("target"))}
          />
        </g>

        <g {...part("base-fee")}>
          <path
            d={feePath}
            fill="none"
            strokeLinejoin="round"
            className={cn(
              "[stroke-width:1.5]",
              feeState === "rest"
                ? "stroke-diagram-pipe"
                : "stroke-diagram-line-strong"
            )}
          />
          {fees.map((gwei, i) => {
            const newest = view.step > 0 && i === fees.length - 1
            return (
              <circle
                key={`${i}-${newest ? runKey : ""}`}
                cx={xOf(i)}
                cy={feeY(gwei)}
                r={newest ? 4.5 : 3.5}
                style={{ fill: DIAGRAM_COLOR.pipe }}
                className={cn(
                  "stroke-diagram-bg [stroke-width:1.5]",
                  newest && POP
                )}
              />
            )
          })}
        </g>

        <g>
          {view.blocks.map((_, i) => (
            <rect
              key={i}
              x={xOf(i) - SLOT_GAP / 2}
              y={GAS_TOP - 8}
              width={SLOT_GAP}
              height={GAS_BOTTOM - GAS_TOP + 12}
              stroke="none"
              style={{ fill: "transparent" }}
              className="cursor-ns-resize touch-none"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId)
                dragTo(event, i)
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  dragTo(event, i)
              }}
            />
          ))}
        </g>
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-sm leading-none text-body-medium tabular-nums"
      >
        {view.feeTicks.map((tick) => (
          <span
            key={tick}
            className="absolute -translate-x-full -translate-y-1/2 pe-1.5 rtl:translate-x-full"
            style={{
              insetInlineStart: pct(AXIS_X, W),
              top: pct(feeY(tick), H),
            }}
          >
            {format(tick)}
          </span>
        ))}
        <span
          className="absolute -translate-x-full pe-1.5 rtl:translate-x-full"
          style={{ insetInlineStart: pct(AXIS_X, W), top: pct(TICK_Y, H) }}
        >
          {axisLabel}
        </span>
        {Array.from({ length: BLOCK_COUNT + 1 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "absolute -translate-x-1/2 rtl:translate-x-1/2",
              i === newestBlock && "text-body"
            )}
            style={{ insetInlineStart: pct(xOf(i), W), top: pct(TICK_Y, H) }}
          >
            {format(i + 1)}
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

export default memo(BaseFeeRig)
