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
 * each from its checkpoint (the large block) through its other blocks to a
 * dashed boundary. Under each epoch from n+1, a bar spans the epoch: the
 * stake attesting during it, filling as its slots pass, with a tick at
 * two-thirds and an arrow up to the checkpoint the votes target. At the
 * epoch's end boundary the votes are counted: the link arches from source
 * to target and the checkpoints change state.
 */

const { width: W, height: H } = GASPER_FINALITY_SIZE

/* ---------- Geometry ---------- */

const EPOCH_W = 76
const FIRST_X = 78
const epochX = (i: number) => FIRST_X + EPOCH_W * i
const EPOCHS = EPOCH_NAMES.map((_, i) => i)

const CP = 28
const CP_TOP = 114
const CP_BOTTOM = CP_TOP + CP
const CHAIN_Y = CP_TOP + CP / 2
const cpX = (i: number) => epochX(i) + 6
const cpMid = (i: number) => cpX(i) + CP / 2

const BLOCK = 9
const BLOCK_X = [41, 52, 63]
const BLOCK_TOP = CHAIN_Y - BLOCK / 2
const CHAIN = `M${cpMid(0)},${CHAIN_Y} L${epochX(EPOCHS.length - 1) + BLOCK_X[2] + BLOCK},${CHAIN_Y}`

// Epoch boundaries, the end of n to the end of n+4.
const BOUNDARY_TOP = 96
const BOUNDARY_BOTTOM = 170
const BOUNDARIES = [...EPOCHS.slice(1), EPOCHS.length]
  .map((i) => `M${epochX(i)},${BOUNDARY_TOP} L${epochX(i)},${BOUNDARY_BOTTOM}`)
  .join(" ")
// The boundary where this step's votes are counted runs down to its label.
const END_LABEL_Y = 240
const endBoundary = (i: number) =>
  `M${epochX(i + 1)},${BOUNDARY_TOP} L${epochX(i + 1)},${END_LABEL_Y}`

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

// Meters: one bar per epoch from n+1, from its checkpoint to its end.
const BAR_TOP = 152
const BAR_H = 12
const BAR_BOTTOM = BAR_TOP + BAR_H
const BAR_MID = BAR_TOP + BAR_H / 2
const BAR_W = EPOCH_W - 10
const barX = cpX
const tickX = (i: number) => r1(barX(i) + BAR_W * THRESHOLD)
const TICKS = EPOCHS.slice(1)
  .map((i) => `M${tickX(i)},${BAR_TOP - 4} L${tickX(i)},${BAR_BOTTOM + 4}`)
  .join(" ")
// Votes point up at the checkpoint they target.
const targetArrow = (i: number) => {
  const x = cpMid(i)
  const tip = CP_BOTTOM + 1.5
  return `M${x},${BAR_TOP} L${x},${tip} M${x - 2.5},${tip + 3} L${x},${tip} L${x + 2.5},${tip + 3}`
}

const NAME_Y = 182
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
  // In epoch n's empty bar slot, pointing at n+1's bar.
  spots.push({
    id: "meter",
    tone: "entity",
    target: [barX(1), BAR_MID],
    anchor: [barX(1) - 7, BAR_MID],
    placement: "start",
  })
  if (epoch > 0) {
    const x = epochX(epoch + 1)
    spots.push({
      id: "boundary",
      tone: "neutral",
      target: [x, END_LABEL_Y],
      anchor: [x - 5, END_LABEL_Y],
      placement: "start",
    })
  }
  checkpointSpot("finalized", "entity", checkpoints.lastIndexOf("finalized"))
  spots.push({
    id: "threshold",
    tone: "neutral",
    target: [tickX(1), BAR_BOTTOM + 4],
    anchor: [tickX(1), 196],
    placement: "below",
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
// The bar fills at an even pace, like slots passing.
const FILL_CLASS =
  "origin-left [transform-box:fill-box] transition-transform duration-1200 ease-linear motion-reduce:transition-none"

// One step's choreography (ms): the epoch's slots pass and the bar fills;
// at the end boundary the votes are counted, the link forms, the checkpoint
// is justified and the one before it is finalized.
const FILL_DELAY = 200
const BOUNDARY_DELAY = 1400
const LINK_DELAY = 1500
const JUSTIFY_DELAY = 1800
const LOCK_DELAY = 2100

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
            state={lockNow ? state("justified") : state(cp)}
          />
        </g>
        {cp === "finalized" && (
          <g
            key={lockNow ? `${runKey}-final` : "final"}
            className={cn(lockNow && POP)}
            style={delayed(lockNow, LOCK_DELAY)}
          >
            <Block
              x={cpX(i)}
              y={CP_TOP}
              size={CP}
              hue="entity"
              state={state(cp) === "rest" ? "lit" : state(cp)}
            />
          </g>
        )}
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
          x={barX(i)}
          y={BAR_TOP}
          width={BAR_W}
          height={BAR_H}
          rx={2}
          className={
            short && meterState === "rest"
              ? "stroke-diagram-revert"
              : anatomyStroke("entity", meterState)
          }
          style={{ fill: anatomyFill("entity", "top", meterState) }}
        />
        <rect
          x={barX(i) + 2}
          y={BAR_TOP + 2}
          width={BAR_W - 4}
          height={BAR_H - 4}
          rx={1}
          stroke="none"
          className={FILL_CLASS}
          style={{
            fill: anatomyStrong("entity"),
            transform: `scaleX(${share === null ? 0 : r1((share / 100) * 1000) / 1000})`,
            transitionDelay: isNew(i) ? `${FILL_DELAY}ms` : undefined,
          }}
        />
        {share !== null && (
          <path
            d={targetArrow(i)}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-diagram-entity"
            style={{ fill: "none" }}
          />
        )}
      </g>
    )
  }

  // Where this step's votes are counted.
  const boundary = epoch > 0 && (
    <g {...part("boundary")}>
      <g
        key={`${runKey}-end`}
        className={POP}
        style={{ animationDelay: `${BOUNDARY_DELAY}ms` }}
      >
        <path
          d={endBoundary(epoch)}
          className={
            state("boundary") !== "rest"
              ? "stroke-diagram-line-strong"
              : linkFormed
                ? "stroke-diagram-entity"
                : "stroke-diagram-revert"
          }
          style={{ fill: "none" }}
        />
      </g>
    </g>
  )

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
            d={TICKS}
            className={
              state("threshold") === "rest"
                ? "stroke-diagram-line-strong"
                : "stroke-diagram-entity"
            }
            style={{ fill: "none" }}
          />
        </g>
        {boundary}
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
