import { memo, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  AnatomyLabels,
  type AnatomyLabelSpot,
  anatomyStroke,
  DIAGRAM_COLOR,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
  IsoDefs,
  isoDetail,
  IsoPipe,
  IsoPlate,
  isoProjection,
  isoShadow,
  IsoSolid,
  type Point,
  r1,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  ATTESTATIONS_SIZE,
  type AttestationsPart,
  type AttestationsPresetId,
  type AttestationsView,
  COMMITTEE_BITS,
  type CommitteeId,
} from "./model"

/*
 * Isometric drawing for the attestation lifecycle, on the shared anatomy
 * primitives. Server-rendered with the player.
 *
 * Messages move from back-left to front-right. At the back, two committees
 * (A behind, B in front) of three validators and an aggregator, the taller
 * fourth member, each joined to its aggregator by its subnet. The aggregators
 * feed the beacon nodes, which feed the proposer; the new block lands in the
 * beacon chain along the front, one or two slots after the head block.
 */

const { width: W, height: H } = ATTESTATIONS_SIZE
const PROJECTION = isoProjection(200, 60)
const { P, path, box, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "attestations-shadow"

const pts = (...ps: Point[]) => ps.map((p) => p.join(",")).join(" ")
/** Quad on a top (z = const) face. */
const onTop = (z: number, x0: number, x1: number, y0: number, y1: number) =>
  pts(P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z))

type Dims = [number, number, number, number, number, number]

/* ---------- Geometry ---------- */

const PLATE_W = 258
const PLATE_D = 124
const PLATE = box(0, 0, -8, PLATE_W, PLATE_D, 8)

// Committees: three validators in a row, then the aggregator (a member too).
const VALIDATOR_X = [14, 32, 50]
const VALIDATOR_SIZE = 12
const VALIDATOR_H = 14
const ROW_Y: Record<CommitteeId, number> = { a: 14, b: 70 }
const AGG_X = 80
const AGG_W = 24
const AGG_D = 18
const AGG_H = 24
/** Committee B's offline member (position 2): it never attests. */
const OFFLINE: { committee: CommitteeId; index: number } = {
  committee: "b",
  index: COMMITTEE_BITS.b.findIndex((bit) => bit === 0),
}

const validatorDims = (id: CommitteeId, i: number): Dims => [
  VALIDATOR_X[i],
  ROW_Y[id],
  0,
  VALIDATOR_SIZE,
  VALIDATOR_SIZE,
  VALIDATOR_H,
]
const aggDims = (id: CommitteeId): Dims => [
  AGG_X,
  ROW_Y[id] - 3,
  0,
  AGG_W,
  AGG_D,
  AGG_H,
]

const COMMITTEES = (["a", "b"] as const).map((id) => {
  const y = ROW_Y[id]
  const front = y + VALIDATOR_SIZE
  const bus = front + 7
  const aggFront = y - 3 + AGG_D
  const centres = VALIDATOR_X.map((x) => x + VALIDATOR_SIZE / 2)
  // Stubs from each validator's front to the bus, the bus on to the
  // aggregator's front. The flow skips an offline member's stub.
  const busPath = path(
    4,
    [centres[0], front],
    [centres[0], bus],
    [AGG_X + 12, bus],
    [AGG_X + 12, aggFront]
  )
  const stubs = centres
    .slice(1)
    .map((cx, k) => ({ k: k + 1, d: path(4, [cx, front], [cx, bus]) }))
  const isOffline = (k: number) =>
    OFFLINE.committee === id && OFFLINE.index === k
  return {
    id,
    validators: VALIDATOR_X.map((_, i) => box(...validatorDims(id, i))),
    aggregator: box(...aggDims(id)),
    // Signed attestations: a slip on each signer's top.
    slips: [
      ...centres.map((cx) => box(cx - 3, y + 3, VALIDATOR_H, 6, 6, 2.5)),
      box(AGG_X + 9, y + 3, AGG_H, 6, 6, 2.5),
    ],
    // Aggregation bits: one cell per member on the aggregator's top.
    cells: COMMITTEE_BITS[id].map((_, k) =>
      onTop(AGG_H, AGG_X + 2.5 + k * 5, AGG_X + 6.7 + k * 5, y + 2, y + 10)
    ),
    subnet: [busPath, ...stubs.map((s) => s.d)].join(" "),
    subnetFlow: [
      busPath,
      ...stubs.filter((s) => !isOffline(s.k)).map((s) => s.d),
    ].join(" "),
  }
})

// Beacon nodes, between the aggregators and the proposer.
const HUB: Dims = [134, 32, 0, 28, 24, 24]
const HUB_BOX = box(...HUB)
// Aggregates: A into the hub's back, B into its front, then on to the
// proposer. Drawn in paint order around the hub.
const BROADCAST_A = path(10, [104, 20], [148, 20], [148, 32])
const BROADCAST_B = path(10, [104, 76], [148, 76], [148, 56])
const TO_PROPOSER = path(14, [162, 44], [186, 44])

const PROPOSER: Dims = [186, 34, 0, 20, 20, 26]
const PROPOSER_BOX = box(...PROPOSER)

// The beacon chain along the front: the head block (slot n), then the slots
// n+1 and n+2, one of which takes the new block.
const BLOCK_Y = 96
const BLOCK_W = 26
const BLOCK_D = 20
const BLOCK_H = 12
const SLOT_X = [147, 183, 219]
const blockDims = (slot: number): Dims => [
  SLOT_X[slot],
  BLOCK_Y,
  0,
  BLOCK_W,
  BLOCK_D,
  BLOCK_H,
]
const HEAD_BOX = box(...blockDims(0))
const NEW_BLOCK = [1, 2].map((slot) => box(...blockDims(slot)))
const EMPTY_SLOT = [1, 2].map((slot) =>
  footprint(SLOT_X[slot], BLOCK_Y, BLOCK_W, BLOCK_D)
)
// Both aggregates' bits on the new block's top, one row per committee.
const BLOCK_CELLS = [1, 2].map((slot) =>
  (["a", "b"] as const).map((id, row) =>
    COMMITTEE_BITS[id].map((_, k) => {
      const x0 = SLOT_X[slot] + 2.5 + k * 5.5
      const y0 = BLOCK_Y + 3 + row * 8
      return onTop(BLOCK_H, x0, x0 + 4.6, y0, y0 + 6)
    })
  )
)
const CHAIN_LINKS = [
  path(6, [173, 106], [183, 106]),
  path(6, [209, 106], [219, 106]),
].join(" ")
// Earlier blocks, out of frame.
const CHAIN_TAIL = path(6, [131, 106], [147, 106])

// The proposer's block: straight forward to slot n+1, or round to n+2.
const SLOT_CENTRE = SLOT_X.map((x) => x + BLOCK_W / 2)
const INCLUDE: Record<AttestationsPresetId, string> = {
  "on-time": path(8, [196, 54], [SLOT_CENTRE[1], BLOCK_Y]),
  missed: path(
    8,
    [196, 54],
    [196, 84],
    [SLOT_CENTRE[2], 84],
    [SLOT_CENTRE[2], BLOCK_Y]
  ),
}

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = isoShadow(
  footprint(-4, 4, PLATE_W + 8, PLATE_D + 6, -22, 6),
  SHADOW
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {(["a", "b"] as const).map((id) => (
      <g key={id}>
        {isoShadow(footprint(14, ROW_Y[id], 48, VALIDATOR_SIZE, 0, 3), SHADOW)}
        {isoShadow(footprint(AGG_X, ROW_Y[id] - 3, AGG_W, AGG_D, 0, 4), SHADOW)}
      </g>
    ))}
    {isoShadow(footprint(134, 32, 28, 24, 0, 4), SHADOW)}
    {isoShadow(footprint(186, 34, 20, 20, 0, 4), SHADOW)}
    {isoShadow(footprint(SLOT_X[0], BLOCK_Y, 98, BLOCK_D, 0, 3), SHADOW)}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, PLATE_W, PLATE_D], 5)
const AGG_DETAIL = (["a", "b"] as const).map((id) => (
  <g key={id}>{D.seams(aggDims(id), { end: [0.5], ring: 0.12 })}</g>
))
const HUB_DETAIL = (
  <>
    {D.seams(HUB, { ring: 0.86 })}
    {D.vents(56, 140, 156, [8, 12, 16])}
  </>
)
const PROPOSER_DETAIL = (
  <>
    {D.seams(PROPOSER, { end: [0.5], ring: 0.12 })}
    {D.plate(54, 190, 202, 14, 20)}
  </>
)
const HEAD_DETAIL = D.inset([SLOT_X[0], BLOCK_Y, BLOCK_H, BLOCK_W, BLOCK_D], 3)

/* ---------- Labels: outside the plate, short leaders ---------- */

// The plate's front-right edge, at the bottom of its side.
const [edgeX0, edgeY0] = P(0, PLATE_D, -8)
const [edgeX1, edgeY1] = P(PLATE_W, PLATE_D, -8)
/** A y just below that edge, across a label's width. */
const belowPlate = (x: number, halfWidth = 40) => {
  const at = Math.min(Math.max(x + halfWidth, edgeX0), edgeX1)
  return r1(
    edgeY0 + ((at - edgeX0) / (edgeX1 - edgeX0)) * (edgeY1 - edgeY0) + 8
  )
}

const blockSpot = (slot: number): AnatomyLabelSpot => {
  const target = P(SLOT_CENTRE[slot], BLOCK_Y + BLOCK_D, 0)
  return {
    id: "block",
    tone: "neutral",
    target,
    anchor: [target[0], belowPlate(target[0])],
    placement: "below",
  }
}

const baseSpots = (block: AnatomyLabelSpot): AnatomyLabelSpot[] => [
  {
    id: "validators",
    tone: "entity",
    target: P(20, 20, VALIDATOR_H),
    anchor: [P(20, 20, VALIDATOR_H)[0], 42],
    placement: "above",
  },
  {
    id: "aggregator",
    tone: "entity",
    target: P(AGG_X + AGG_W, 11, AGG_H),
    anchor: [300, 68],
    placement: "above",
  },
  {
    id: "network",
    tone: "neutral",
    target: P(162, 32, 24),
    anchor: [345, 110],
    placement: "above",
  },
  {
    id: "proposer",
    tone: "entity",
    target: P(206, 34, 26),
    anchor: [392, 136],
    placement: "above",
  },
  block,
  {
    id: "chain",
    tone: "neutral",
    target: P(SLOT_X[0], BLOCK_Y + BLOCK_D, 0),
    anchor: [184, 202],
    placement: "start",
  },
  {
    id: "subnet",
    tone: "neutral",
    target: P(20, 89, 4),
    anchor: [104, 100],
    placement: "start",
  },
]

// The "New block" label points at the slot that takes the block.
const SPOTS: Record<AttestationsPresetId, AnatomyLabelSpot[]> = {
  "on-time": baseSpots(blockSpot(1)),
  missed: baseSpots(blockSpot(2)),
}

interface AttestationsRigProps {
  view: AttestationsView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<AttestationsPart, ReactNode>
  definitions: Record<AttestationsPart, ReactNode>
  className?: string
}

// Signed bits are a stronger blue; orange is only ever gas.
const SIGNED_FILL = `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 65%, ${DIAGRAM_COLOR.bg})`
const POP =
  "animate-diagram-pop [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none"

function AttestationsRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: AttestationsRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: AttestationsPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const pops = (motion: AttestationsView["motion"]) => view.motion === motion

  const cellFill = (bit: number) =>
    bit ? SIGNED_FILL : anatomyFill("entity", "top")

  // Signed attestations, from the step's start; split so the aggregator
  // (in front) covers the validators' slips, not the other way round.
  const slips = (c: (typeof COMMITTEES)[number], members: number[]) =>
    view.attestationsShown && (
      <g
        key={pops("generate") ? `${runKey}-${members[0]}` : members[0]}
        className={cn("pointer-events-none", pops("generate") && POP)}
      >
        {members.map((k) =>
          COMMITTEE_BITS[c.id][k] ? (
            <IsoSolid
              key={c.slips[k].top}
              box={c.slips[k]}
              hue="entity"
              state="lit"
            />
          ) : null
        )}
      </g>
    )

  const committee = (c: (typeof COMMITTEES)[number]) => (
    <g key={c.id}>
      <g {...part("validators")}>
        {c.validators.map((v, i) => (
          <g
            key={v.top}
            style={
              OFFLINE.committee === c.id && OFFLINE.index === i
                ? { opacity: 0.45 }
                : undefined
            }
          >
            <IsoSolid box={v} hue="entity" state={state("validators")} />
          </g>
        ))}
      </g>
      {slips(c, [0, 1, 2])}
      <g {...part("aggregator")}>
        <IsoSolid box={c.aggregator} hue="entity" state={state("aggregator")} />
        {AGG_DETAIL[c.id === "a" ? 0 : 1]}
        {view.bitsShown && (
          <g
            key={pops("aggregate") ? runKey : "bits"}
            className={cn(
              anatomyStroke("entity", "lit"),
              pops("aggregate") && POP
            )}
          >
            {c.cells.map((cell, k) => (
              <polygon
                key={cell}
                points={cell}
                style={{ fill: cellFill(COMMITTEE_BITS[c.id][k]) }}
              />
            ))}
          </g>
        )}
      </g>
      {slips(c, [3])}
      <g {...part("subnet")}>
        <IsoPipe
          hue="entity"
          d={c.subnet}
          flowD={c.subnetFlow}
          flowing={view.flow === "subnet"}
          flowKey={runKey}
          state={state("subnet")}
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
        <IsoDefs id={SHADOW} />
        {GROUND_SHADOW}
        <IsoPlate box={PLATE} />
        {PLATE_DETAIL}
        {CONTACT_SHADOWS}

        {/* Committee A, behind, and its aggregate's way into the hub. */}
        {committee(COMMITTEES[0])}
        <g {...part("network")}>
          <IsoPipe
            hue="entity"
            d={BROADCAST_A}
            flowing={view.flow === "broadcast"}
            flowKey={runKey}
            state={state("network")}
          />
        </g>

        {committee(COMMITTEES[1])}

        {/* Beacon nodes: aggregates in from both committees, out to the
            proposer. */}
        <g {...part("network")}>
          <IsoSolid box={HUB_BOX} hue="neutral" state={state("network")} />
          {HUB_DETAIL}
          <IsoPipe
            hue="entity"
            d={BROADCAST_B}
            flowing={view.flow === "broadcast"}
            flowKey={runKey}
            state={state("network")}
          />
          <IsoPipe
            hue="entity"
            d={TO_PROPOSER}
            flowing={view.flow === "broadcast"}
            flowKey={runKey}
            flowDelay={350}
            state={state("network")}
          />
        </g>

        <g {...part("proposer")}>
          <IsoSolid box={PROPOSER_BOX} hue="entity" state={state("proposer")} />
          {PROPOSER_DETAIL}
        </g>

        {/* The beacon chain: head block, links, and the next two slots. */}
        <g {...part("chain")}>
          <IsoPipe d={CHAIN_LINKS} state={state("chain")} />
          <g strokeDasharray="2 3">
            <IsoPipe d={CHAIN_TAIL} state={state("chain")} />
          </g>
          <IsoSolid box={HEAD_BOX} hue="neutral" state={state("chain")} />
          {HEAD_DETAIL}
        </g>

        <g {...part("block")}>
          <IsoPipe
            hue="entity"
            d={INCLUDE[view.preset]}
            flowing={view.flow === "include"}
            flowKey={runKey}
            state={state("block")}
          />
          {EMPTY_SLOT.map((slot, i) =>
            view.blockSlot === i + 1 ? null : (
              <polygon
                key={slot}
                points={slot}
                strokeDasharray="3 3"
                className={anatomyStroke("neutral", state("block"))}
                style={{ fill: DIAGRAM_COLOR.plate }}
              />
            )
          )}
          {view.blockSlot !== null && (
            <g
              key={pops("include") ? runKey : "block"}
              className={cn(pops("include") && POP)}
              style={pops("include") ? { animationDelay: "500ms" } : undefined}
            >
              <IsoSolid
                box={NEW_BLOCK[view.blockSlot - 1]}
                hue="neutral"
                state={state("block")}
              />
              <g className={anatomyStroke("entity", "lit")}>
                {BLOCK_CELLS[view.blockSlot - 1].map((row, r) =>
                  row.map((cell, k) => (
                    <polygon
                      key={cell}
                      points={cell}
                      style={{
                        fill: cellFill(COMMITTEE_BITS[r === 0 ? "a" : "b"][k]),
                      }}
                    />
                  ))
                )}
              </g>
            </g>
          )}
        </g>
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={SPOTS[view.preset]}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(AttestationsRig)
