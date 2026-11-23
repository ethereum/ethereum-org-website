"use client"

import { memo, type ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
  type Point,
  r1,
} from "../anatomy"
import { anatomyFill, anatomyStroke, anatomyStrong } from "../anatomy/tokens"
import { usePartState } from "../diagram-hover"

import {
  type PipState,
  type Side,
  SIDES,
  ZK_PROOF_GAME_SIZE,
  type ZkProofGamePart,
  type ZkProofGameView,
} from "./model"

/*
 * Flat top view of the ring-shaped cave: one entrance at the bottom, side A
 * on the left, side B on the right, the magic door where they meet at the
 * back. Text is HTML over the SVG, so it never mirrors in RTL.
 */

const { width: W, height: H } = ZK_PROOF_GAME_SIZE
const CX = 160
const CY = 140
const R_OUT = 94
const R_IN = 54
const R_MID = (R_OUT + R_IN) / 2
const HALF = 20
const MOUTH_Y = 262
const JOIN_Y = r1(CY + Math.sqrt(R_OUT ** 2 - HALF ** 2))
const DOOR = { x: CX - 6, y: CY - R_OUT - 1, w: 12, h: R_OUT - R_IN + 2 }
const MARK_R = 10
const EXIT: Point = [CX, 252]
const VERIFIER: Point = [CX, 293]
/** Where the prover waits on each side, in degrees (SVG, y down). */
const WAIT_ANGLE: Record<Side, number> = { a: -125, b: -55 }
/** Just short of the door, for a prover it turns back. */
const BLOCKED_ANGLE: Record<Side, number> = { a: -104, b: -76 }
const SIDE_AT: Record<Side, Point> = {
  a: [CX - R_OUT - 14, CY],
  b: [CX + R_OUT + 14, CY],
}

const METER = { x: 300, y: 100, w: 160, h: 18 }
const METER_MID = METER.x + METER.w / 2
const PIP_Y = 184
const VERDICT_Y = 34
const PIP_GAP = 32
const pipX = (i: number) => METER_MID + (i - 2) * PIP_GAP

const polar = (deg: number, r = R_MID): Point => {
  const a = (deg * Math.PI) / 180
  return [r1(CX + r * Math.cos(a)), r1(CY + r * Math.sin(a))]
}
const arc = (from: number, to: number) => {
  const [x1, y1] = polar(from)
  const [x2, y2] = polar(to)
  const large = Math.abs(to - from) > 180 ? 1 : 0
  const sweep = to > from ? 1 : 0
  return `M${x1},${y1} A${R_MID},${R_MID} 0 ${large} ${sweep} ${x2},${y2}`
}
const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

const CAVE_FILL = `M${CX + HALF},${JOIN_Y} A${R_OUT},${R_OUT} 0 1 0 ${CX - HALF},${JOIN_Y} V${MOUTH_Y} H${CX + HALF} Z M${CX + R_IN},${CY} A${R_IN},${R_IN} 0 1 0 ${CX - R_IN},${CY} A${R_IN},${R_IN} 0 1 0 ${CX + R_IN},${CY} Z`
const CAVE_OUTLINE = `M${CX + HALF},${MOUTH_Y} V${JOIN_Y} A${R_OUT},${R_OUT} 0 1 0 ${CX - HALF},${JOIN_Y} V${MOUTH_Y}`
// Halving marks: 1/2, 1/4, 1/8, 1/16 of the meter.
const METER_TICKS = [2, 4, 8, 16].map((d) => r1(METER.x + METER.w / d))

const POP =
  "origin-center animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
const FLOW = "animate-diagram-flow motion-reduce:animate-none"
const TAG =
  "absolute -translate-x-1/2 -translate-y-1/2 rounded-base border px-2 py-0.5 text-sm font-bold whitespace-nowrap rtl:translate-x-1/2"

/** A person seen from above: a disc with a head and shoulders. */
const Person = ({
  at: [x, y],
  fill,
  className,
}: {
  at: Point
  fill: string
  className?: string
}) => (
  <g className={className}>
    <circle cx={x} cy={y} r={MARK_R} style={{ fill }} />
    <circle cx={x} cy={y - 3} r={3} style={{ fill: "transparent" }} />
    <path d={`M${x - 5.5},${y + 6} a5.5,5 0 0 1 11,0`} />
  </g>
)

interface ZkProofGameRigProps {
  view: ZkProofGameView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<ZkProofGamePart, ReactNode>
  definitions: Record<ZkProofGamePart, ReactNode>
  sideLabels: Record<Side, ReactNode>
  /** The verifier's call this round, or null at idle. */
  shout: ReactNode
  /** The faker's chance so far, formatted as a percentage. */
  chanceText: ReactNode
  verdictText: ReactNode
  className?: string
}

function ZkProofGameRig({
  view,
  runKey,
  labels,
  definitions,
  sideLabels,
  shout,
  chanceText,
  verdictText,
  className,
}: ZkProofGameRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const { round, outcome } = view
  const caught = outcome === "caught"

  const part = (name: ZkProofGamePart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })

  const blockedSide = round && caught ? round.start : null
  const proverAt = useMemo(
    () => (blockedSide ? polar(BLOCKED_ANGLE[blockedSide]) : EXIT),
    [blockedSide]
  )
  const route = round
    ? caught
      ? arc(WAIT_ANGLE[round.start], BLOCKED_ANGLE[round.start])
      : `${arc(WAIT_ANGLE[round.start], round.call === "b" ? 90 : -270)} L${EXIT[0]},${EXIT[1]}`
    : null

  const spots = useMemo<AnatomyLabelSpot[]>(() => {
    const [px, py] = proverAt
    // At the exit: left of the corridor; stopped at the door: above the cave.
    const proverSpot: AnatomyLabelSpot =
      py > JOIN_Y
        ? {
            id: "prover",
            tone: "entity",
            target: [px - MARK_R, py],
            anchor: [CX - HALF - 6, py],
            placement: "start",
          }
        : {
            id: "prover",
            tone: "entity",
            target: [px, py - MARK_R],
            anchor: [px, CY - R_OUT - 10],
            placement: "above",
          }
    return [
      proverSpot,
      {
        id: "verifier",
        tone: "entity",
        target: [VERIFIER[0] - MARK_R, VERIFIER[1]],
        anchor: [VERIFIER[0] - MARK_R - 6, VERIFIER[1]],
        placement: "start",
      },
      {
        id: "door",
        tone: "entity",
        target: [CX, CY - R_IN + 1],
        anchor: [CX, CY - R_IN + 10],
        placement: "below",
      },
      {
        id: "meter",
        tone: "gas",
        target: [METER_MID, METER.y],
        anchor: [METER_MID, METER.y - 8],
        placement: "above",
      },
      {
        id: "rounds",
        tone: "neutral",
        target: [METER_MID, PIP_Y + MARK_R],
        anchor: [METER_MID, PIP_Y + MARK_R + 8],
        placement: "below",
      },
    ]
  }, [proverAt])

  const doorState = state("door")
  const doorOpen = outcome === "pass-door"
  const proverState = state("prover")
  const meterState = state("meter")

  const pip = (pipState: PipState, i: number) => {
    const x = pipX(i)
    const done = pipState === "pass" || pipState === "caught"
    return (
      <g
        key={`${i}-${pipState}-${done && i === view.step - 1 ? runKey : ""}`}
        className={cn(
          done && i === view.step - 1 && POP,
          pipState === "skipped" && "opacity-40"
        )}
      >
        <circle
          cx={x}
          cy={PIP_Y}
          r={MARK_R}
          strokeDasharray={done ? undefined : "2 2"}
          style={{
            fill:
              pipState === "pass"
                ? anatomyFill("entity", "end", "lit")
                : anatomyFill("neutral", "top"),
          }}
          className={
            pipState === "pass"
              ? "stroke-diagram-entity"
              : pipState === "caught"
                ? "stroke-diagram-revert"
                : "stroke-diagram-line"
          }
        />
        {pipState === "pass" && (
          <path
            d={`M${x - 4},${PIP_Y} l3,3 l5,-6`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-diagram-entity"
          />
        )}
        {pipState === "caught" && (
          <path
            d={`M${x - 4},${PIP_Y - 4} l8,8 m0,-8 l-8,8`}
            fill="none"
            strokeLinecap="round"
            className="stroke-diagram-revert"
          />
        )}
      </g>
    )
  }

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
          <path
            d={CAVE_FILL}
            fillRule="evenodd"
            stroke="none"
            style={{ fill: anatomyFill("neutral", "start") }}
          />
          <path d={CAVE_OUTLINE} fill="none" className="stroke-diagram-line" />
          <circle
            cx={CX}
            cy={CY}
            r={R_IN}
            fill="none"
            className="stroke-diagram-line"
          />
        </g>

        {route && round && (
          <g key={runKey} className="pointer-events-none">
            <circle
              cx={polar(WAIT_ANGLE[round.start])[0]}
              cy={polar(WAIT_ANGLE[round.start])[1]}
              r={MARK_R}
              strokeDasharray="3 2"
              style={{ fill: "transparent" }}
              className="stroke-diagram-entity"
            />
            <path
              d={route}
              fill="none"
              strokeDasharray="4 5"
              strokeLinecap="round"
              className={cn(
                FLOW,
                caught ? "stroke-diagram-revert" : "stroke-diagram-entity"
              )}
            />
          </g>
        )}

        <g {...part("door")}>
          <rect
            x={DOOR.x}
            y={DOOR.y}
            width={DOOR.w}
            height={DOOR.h}
            rx={2}
            strokeDasharray={doorOpen ? "3 2" : undefined}
            style={{
              fill: anatomyFill(
                "entity",
                "end",
                doorOpen || caught ? "lit" : doorState
              ),
            }}
            className={
              caught && doorState !== "hover"
                ? "stroke-diagram-revert"
                : anatomyStroke("entity", doorState)
            }
          />
          <circle
            cx={CX}
            cy={CY - (R_OUT + R_IN) / 2 - 3}
            r={2}
            stroke="none"
            style={{ fill: anatomyStrong("entity") }}
          />
          <path
            d={`M${CX},${CY - (R_OUT + R_IN) / 2 - 1} v6`}
            className="stroke-diagram-entity"
          />
        </g>

        <g {...part("verifier")}>
          <Person
            at={VERIFIER}
            fill={anatomyFill("entity", "start", state("verifier"))}
            className={anatomyStroke("entity", state("verifier"))}
          />
        </g>

        <g {...part("prover")}>
          <Person
            key={`prover-${runKey}`}
            at={proverAt}
            fill={anatomyFill(
              "entity",
              "end",
              proverState === "rest" ? "lit" : proverState
            )}
            className={cn(
              view.step > 0 && POP,
              caught && proverState !== "hover"
                ? "stroke-diagram-revert"
                : anatomyStroke(
                    "entity",
                    proverState === "rest" ? "lit" : proverState
                  )
            )}
          />
        </g>

        <g {...part("meter")}>
          <rect
            x={METER.x}
            y={METER.y}
            width={METER.w}
            height={METER.h}
            rx={3}
            style={{ fill: anatomyFill("neutral", "top") }}
            className={anatomyStroke("gas", meterState)}
          />
          <rect
            x={METER.x}
            y={METER.y}
            width={METER.w}
            height={METER.h}
            rx={3}
            stroke="none"
            style={{
              fill: anatomyFill("gas", "end", "lit"),
              transform: `scaleX(${view.chance})`,
            }}
            className="origin-left transition-transform duration-700 ease-out [transform-box:fill-box] motion-reduce:transition-none"
          />
          {METER_TICKS.map((x) => (
            <path
              key={x}
              d={`M${x},${METER.y + 3} V${METER.y + METER.h - 3}`}
              className="stroke-diagram-line"
            />
          ))}
        </g>

        <g {...part("rounds")}>{view.pips.map(pip)}</g>

        {/* Keep-out areas for the HTML text below, so labels avoid it. */}
        <g stroke="none" style={{ fill: "transparent" }}>
          <rect
            x={METER.x}
            y={METER.y + METER.h + 2}
            width={METER.w}
            height={26}
          />
          <rect x={METER.x} y={VERDICT_Y - 16} width={METER.w} height={32} />
        </g>
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {SIDES.map((side) => (
          <span
            key={side}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-body-medium rtl:translate-x-1/2"
            style={{
              insetInlineStart: pct(SIDE_AT[side][0], W),
              top: pct(SIDE_AT[side][1], H),
            }}
          >
            {sideLabels[side]}
          </span>
        ))}
        <span
          className="absolute -translate-x-1/2 text-sm text-body tabular-nums rtl:translate-x-1/2"
          style={{
            insetInlineStart: pct(METER_MID, W),
            top: pct(METER.y + METER.h + 4, H),
          }}
        >
          {chanceText}
        </span>
        {shout && (
          <span
            key={`shout-${runKey}`}
            className="absolute -translate-y-1/2 animate-diagram-pop rounded-base border border-diagram-line bg-background px-2 py-0.5 text-sm whitespace-nowrap text-body motion-reduce:animate-none"
            style={{
              insetInlineStart: pct(VERIFIER[0] + MARK_R + 10, W),
              top: pct(VERIFIER[1], H),
            }}
          >
            {shout}
          </span>
        )}
        {view.verdict && (
          <span
            key={`verdict-${runKey}`}
            className={cn(
              TAG,
              "animate-diagram-pop motion-reduce:animate-none",
              view.verdict === "caught"
                ? "border-diagram-revert bg-background text-diagram-revert"
                : "border-diagram-entity bg-diagram-entity-fill text-diagram-entity"
            )}
            style={{
              insetInlineStart: pct(METER_MID, W),
              top: pct(VERDICT_Y, H),
            }}
          >
            {verdictText}
          </span>
        )}
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

export default memo(ZkProofGameRig)
