import { memo, type ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  AnatomyLabels,
  type AnatomyLabelSpot,
  type AnatomyState,
  anatomyStroke,
  anatomyStrong,
  DIAGRAM_COLOR,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_LEVEL_CLASS,
  ISO_SVG_CLASS,
  IsoPipe,
  r1,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  type CheckpointState,
  EPOCH_NAMES,
  GASPER_FINALITY_SIZE,
  type GasperFinalityPart,
  type GasperFinalityView,
  isSupermajority,
  THRESHOLD,
} from "./model"

/*
 * Flat drawing for Casper FFG: a timeline reads more directly than an
 * isometric plate here. Epochs n to n+4 run left to right (mirrored in RTL),
 * named under the chain. Each epoch starts with its checkpoint (the large
 * block) followed by a few of its other blocks; supermajority links arch
 * from one checkpoint to the next. Below, a meter per played epoch shows the
 * attesting stake, and one dashed line across them marks two-thirds.
 */

const { width: W, height: H } = GASPER_FINALITY_SIZE

/* ---------- Geometry ---------- */

const EPOCH_W = 76
const FIRST_X = 78
const epochX = (i: number) => FIRST_X + EPOCH_W * i
const EPOCHS = EPOCH_NAMES.map((_, i) => i)

const CP = 28
const CP_TOP = 114
const CHAIN_Y = CP_TOP + CP / 2
const cpX = (i: number) => epochX(i) + 6
const cpMid = (i: number) => cpX(i) + CP / 2

const BLOCK = 9
const BLOCK_X = [41, 52, 63]
const BLOCK_TOP = CHAIN_Y - BLOCK / 2
const CHAIN = `M${cpMid(0)},${CHAIN_Y} L${epochX(EPOCHS.length - 1) + BLOCK_X[2] + BLOCK},${CHAIN_Y}`

const BOUNDARY_TOP = 96
const BOUNDARY_BOTTOM = 256
const BOUNDARIES = EPOCHS.slice(1)
  .map((i) => `M${epochX(i)},${BOUNDARY_TOP} L${epochX(i)},${BOUNDARY_BOTTOM}`)
  .join(" ")

// Link into epoch j: from checkpoint j-1's top right to j's top left.
const LINK_PEAK = 78
const LINKS = EPOCHS.map((j) => {
  if (j === 0) return ""
  const a = cpX(j - 1) + CP - 6
  const b = cpX(j) + 6
  return `M${a},${CP_TOP} C${a},${LINK_PEAK} ${b},${LINK_PEAK} ${b},${CP_TOP}`
})

// The lock on a finalized checkpoint, inside its block.
const lockAt = (i: number) => {
  const x = cpMid(i)
  return {
    body: { x: x - 6, y: CHAIN_Y - 1, width: 12, height: 9 },
    shackle: `M${x - 3.5},${CHAIN_Y - 1} L${x - 3.5},${CHAIN_Y - 4} A3.5,3.5 0 0 1 ${x + 3.5},${CHAIN_Y - 4} L${x + 3.5},${CHAIN_Y - 1}`,
  }
}
const LOCKS = EPOCHS.map(lockAt)

// Meters, one per epoch from n+1, under its checkpoint.
const METER_W = 22
const METER_TOP = 172
const METER_H = 76
const METER_BOTTOM = METER_TOP + METER_H
const meterX = (i: number) => cpMid(i) - METER_W / 2
const THRESHOLD_Y = r1(METER_BOTTOM - METER_H * THRESHOLD)
const THRESHOLD_LINE = `M${meterX(1) - 8},${THRESHOLD_Y} L${meterX(EPOCHS.length - 1) + METER_W + 8},${THRESHOLD_Y}`

const NAME_Y = 157
// Invisible boxes where the epoch names sit, so labels keep off them.
const NAME_KEEP_OUT = EPOCHS.map((i) => (
  <rect
    key={i}
    x={cpMid(i) - 16}
    y={NAME_Y - 8}
    width={32}
    height={16}
    stroke="none"
    style={{ fill: "transparent" }}
  />
))

/* ---------- Labels ---------- */

interface SpotInput {
  epoch: number
  checkpoints: CheckpointState[]
  links: number[]
}

const LABEL_ROW = 64

const buildSpots = ({ epoch, checkpoints, links }: SpotInput) => {
  const spots: AnatomyLabelSpot[] = []
  const link = links.at(-1)
  if (link !== undefined) {
    const x = r1((cpX(link - 1) + CP + cpX(link)) / 2)
    spots.push({
      id: "link",
      tone: "entity",
      target: [x, LINK_PEAK + 8],
      anchor: [x, 40],
      placement: "above",
    })
  }
  const checkpointSpot = (
    id: GasperFinalityPart,
    tone: AnatomyLabelSpot["tone"],
    i: number
  ) => {
    if (i < 0) return
    spots.push({
      id,
      tone,
      target: [cpMid(i), CP_TOP],
      anchor: [cpMid(i), LABEL_ROW],
      placement: "above",
    })
  }
  checkpointSpot("justified", "entity", checkpoints.lastIndexOf("justified"))
  const meter = Math.max(epoch, 1)
  spots.push({
    id: "meter",
    tone: "entity",
    target: [cpMid(meter), METER_BOTTOM],
    anchor: [cpMid(meter), METER_BOTTOM + 14],
    placement: "below",
  })
  checkpointSpot("finalized", "entity", checkpoints.lastIndexOf("finalized"))
  spots.push({
    id: "threshold",
    tone: "neutral",
    target: [meterX(1) - 8, THRESHOLD_Y],
    anchor: [meterX(1) - 14, THRESHOLD_Y],
    placement: "start",
  })
  checkpointSpot("proposed", "neutral", checkpoints.lastIndexOf("proposed"))
  checkpointSpot("upcoming", "neutral", checkpoints.indexOf("upcoming"))
  // The newest epoch's blocks: no link arches over them yet.
  const blocksX = epochX(epoch) + BLOCK_X[1] + BLOCK / 2
  spots.push({
    id: "blocks",
    tone: "neutral",
    target: [blocksX, BLOCK_TOP],
    anchor: [blocksX + 16, LABEL_ROW + 20],
    placement: "above",
  })
  return spots
}

const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

const POP =
  "animate-diagram-pop [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none"

// One step's choreography (ms): the meter fills, then the link forms, the
// checkpoint is justified and the one before it locks.
const LEVEL_DELAY = 200
const LINK_DELAY = 800
const JUSTIFY_DELAY = 1100
const LOCK_DELAY = 1400

interface GasperFinalityRigProps {
  view: GasperFinalityView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<GasperFinalityPart, ReactNode>
  definitions: Record<GasperFinalityPart, ReactNode>
  className?: string
}

function Block({
  x,
  y,
  size,
  hue,
  state,
  dashed,
}: {
  x: number
  y: number
  size: number
  hue: "entity" | "neutral"
  state: AnatomyState
  dashed?: boolean
}) {
  return (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      rx={2}
      strokeDasharray={dashed ? "3 3" : undefined}
      className={anatomyStroke(hue, state)}
      style={{
        fill: anatomyFill(hue, hue === "entity" ? "start" : "end", state),
      }}
    />
  )
}

function GasperFinalityRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: GasperFinalityRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: GasperFinalityPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const { epoch, checkpoints, links, linkFormed } = view

  const labelSpots = useMemo(
    () => buildSpots({ epoch, checkpoints, links }),
    [epoch, checkpoints, links]
  )

  const isNew = (i: number) => i === epoch && epoch > 0
  const popKey = (i: number, name: string) =>
    isNew(i) ? `${runKey}-${name}` : name
  const delayed = (on: boolean, ms: number) =>
    on ? { animationDelay: `${ms}ms` } : undefined

  const checkpoint = (i: number) => {
    const cp = checkpoints[i]
    if (cp === "upcoming")
      return (
        <g key={`cp-${i}`} {...part("upcoming")}>
          <rect
            x={cpX(i)}
            y={CP_TOP}
            width={CP}
            height={CP}
            rx={2}
            strokeDasharray="3 3"
            className={anatomyStroke("neutral", state("upcoming"))}
            style={{ fill: DIAGRAM_COLOR.plate }}
          />
        </g>
      )
    const proposed = (
      <Block
        x={cpX(i)}
        y={CP_TOP}
        size={CP}
        hue="neutral"
        state={state("proposed")}
        dashed
      />
    )
    if (cp === "proposed")
      return (
        <g key={`cp-${i}`} {...part("proposed")}>
          <g key={popKey(i, "p")} className={cn(isNew(i) && POP)}>
            {proposed}
          </g>
        </g>
      )
    const justifiedNow = isNew(i) && linkFormed
    const lockNow = view.newlyFinalized === i
    return (
      <g key={`cp-${i}`} {...part(cp)}>
        {justifiedNow && (
          <g key={`${runKey}-under`} className={POP}>
            {proposed}
          </g>
        )}
        <g
          key={popKey(i, "j")}
          className={cn(justifiedNow && POP)}
          style={delayed(justifiedNow, JUSTIFY_DELAY)}
        >
          <Block
            x={cpX(i)}
            y={CP_TOP}
            size={CP}
            hue="entity"
            state={
              cp === "finalized" && state(cp) === "rest" ? "lit" : state(cp)
            }
          />
        </g>
        {cp === "finalized" && (
          <g
            key={lockNow ? `${runKey}-lock` : "lock"}
            className={cn(lockNow && POP)}
            style={delayed(lockNow, LOCK_DELAY)}
          >
            <path
              d={LOCKS[i].shackle}
              className="stroke-diagram-entity"
              style={{ fill: "none" }}
            />
            <rect
              {...LOCKS[i].body}
              rx={1.5}
              className="stroke-diagram-entity"
              style={{ fill: anatomyStrong("entity") }}
            />
          </g>
        )}
      </g>
    )
  }

  const blocks = (i: number) =>
    checkpoints[i] !== "upcoming" && (
      <g key={`b-${i}`} {...part("blocks")}>
        <g key={popKey(i, "b")} className={cn(isNew(i) && POP)}>
          {BLOCK_X.map((dx) => (
            <Block
              key={dx}
              x={epochX(i) + dx}
              y={BLOCK_TOP}
              size={BLOCK}
              hue="neutral"
              state={state("blocks")}
            />
          ))}
        </g>
      </g>
    )

  const link = (j: number) =>
    links.includes(j) && (
      <g key={`l-${j}`} {...part("link")}>
        <g
          key={popKey(j, "l")}
          className={cn(isNew(j) && POP)}
          style={delayed(isNew(j), LINK_DELAY)}
        >
          <IsoPipe
            hue="entity"
            d={LINKS[j]}
            flowing={isNew(j)}
            flowKey={runKey}
            flowDelay={LINK_DELAY}
            state={isNew(j) ? state("link") : "rest"}
          />
        </g>
      </g>
    )

  const meter = (i: number) => {
    const share = view.shares[i]
    const short = share !== null && !isSupermajority(share)
    const meterState = isNew(i) ? state("meter") : "rest"
    return (
      <g key={`m-${i}`} {...part("meter")}>
        <rect
          x={meterX(i)}
          y={METER_TOP}
          width={METER_W}
          height={METER_H}
          rx={2}
          className={
            short && meterState === "rest"
              ? "stroke-diagram-revert"
              : anatomyStroke("entity", meterState)
          }
          style={{ fill: anatomyFill("entity", "top", meterState) }}
        />
        <rect
          x={meterX(i) + 2}
          y={METER_TOP}
          width={METER_W - 4}
          height={METER_H}
          stroke="none"
          className={ISO_LEVEL_CLASS}
          style={{
            fill: anatomyStrong("entity"),
            transform: `scaleY(${share === null ? 0 : r1((share / 100) * 1000) / 1000})`,
            transitionDelay: isNew(i) ? `${LEVEL_DELAY}ms` : undefined,
          }}
        />
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
        <path
          d={BOUNDARIES}
          strokeDasharray="2 4"
          className="stroke-diagram-line-faint"
          style={{ fill: "none" }}
        />
        {NAME_KEEP_OUT}
        <path
          d={CHAIN}
          className="stroke-diagram-pipe"
          style={{ fill: "none" }}
        />

        {EPOCHS.map((i) => [checkpoint(i), blocks(i)])}
        {EPOCHS.map(link)}

        {EPOCHS.slice(1).map(meter)}
        <g {...part("threshold")}>
          <path
            d={THRESHOLD_LINE}
            strokeDasharray="4 3"
            className={
              state("threshold") === "rest"
                ? "stroke-diagram-line-strong"
                : "stroke-diagram-entity"
            }
            style={{ fill: "none" }}
          />
        </g>
      </svg>

      {/* Epoch names: notation, never translated. HTML, so they read the
          right way round in RTL. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {EPOCHS.map((i) => (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-sm whitespace-nowrap text-body-medium rtl:translate-x-1/2"
            style={{
              insetInlineStart: pct(cpMid(i), W),
              top: pct(NAME_Y, H),
            }}
          >
            {EPOCH_NAMES[i]}
          </span>
        ))}
      </div>

      <AnatomyLabels
        width={W}
        height={H}
        spots={labelSpots}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the drawing only re-renders when its view, labels or hover
// state change.
export default memo(GasperFinalityRig)
