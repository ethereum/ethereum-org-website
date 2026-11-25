import { memo, type ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  anatomyStroke,
  DIAGRAM_COLOR,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
  IsoCylinder,
  IsoDefs,
  isoDetail,
  IsoPipe,
  IsoPlate,
  isoProjection,
  isoShadow,
  IsoSolid,
  r1,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  EX_ANTE_REORG_SIZE,
  type ExAnteReorgPart,
  type ExAnteReorgView,
  MAX_BRANCH_VOTES,
  SLOT_NAMES,
} from "./model"

/*
 * Isometric drawing for the one-block ex-ante reorg, on the shared anatomy
 * primitives. Server-rendered with the player.
 *
 * Slots run from back-left to front-right, ticked n to n+3 along the plate's
 * front edge. The back lane is the chain honest validators see: block A, the
 * empty slot n+1, block C. The front lane is the attacker's branch: block B
 * in slot n+1, fed by the attacker's validators in the front-left corner.
 * Block D lands in slot n+3 on whichever lane wins. Each lane runs on into a
 * tank of the votes behind that branch, both fed by the committee at the
 * front-right end.
 */

const { width: W, height: H } = EX_ANTE_REORG_SIZE
const PROJECTION = isoProjection(187, 60)
const { P, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "ex-ante-reorg-shadow"

type Dims = [number, number, number, number, number, number]

/* ---------- Geometry ---------- */

const PLATE_W = 244
const PLATE_D = 122
const PLATE = box(0, 0, -8, PLATE_W, PLATE_D, 8)

const SLOT_X = [10, 56, 102, 148]
const LANE_Y = [12, 66]
const BLOCK_W = 30
const BLOCK_D = 26
const BLOCK_H = 14
const LANE_MID = LANE_Y.map((y) => y + BLOCK_D / 2)
const blockDims = (slot: number, lane: number): Dims => [
  SLOT_X[slot],
  LANE_Y[lane],
  0,
  BLOCK_W,
  BLOCK_D,
  BLOCK_H,
]
const A_BOX = box(...blockDims(0, 0))
const B_BOX = box(...blockDims(1, 1))
const C_BOX = box(...blockDims(2, 0))
const D_BOX = { c: box(...blockDims(3, 0)), b: box(...blockDims(3, 1)) }
const EMPTY = footprint(SLOT_X[1], LANE_Y[0], BLOCK_W, BLOCK_D)
// Proposer boost: a slab on C's top.
const BOOST_BOX = box(SLOT_X[2] + 3, LANE_Y[0] + 3, BLOCK_H, 24, 20, 4)

const LINK_Z = 7
const blockEnd = (slot: number) => SLOT_X[slot] + BLOCK_W
// A to C across the empty slot; A down to B.
const A_TO_C = path(
  LINK_Z,
  [blockEnd(0), LANE_MID[0]],
  [SLOT_X[2], LANE_MID[0]]
)
const A_TO_B = path(
  LINK_Z,
  [SLOT_X[0] + 15, LANE_Y[0] + BLOCK_D],
  [SLOT_X[0] + 15, LANE_MID[1]],
  [SLOT_X[1], LANE_MID[1]]
)

// Vote tanks at the end of each lane: C's branch behind, B's in front. Each
// lane runs on into its tank, under slot n+3 (D sits on it).
const TANK_X = 198
const TANK_R = 8
const TANK_H = 44
const TANKS = {
  c: cylinder(TANK_X, LANE_MID[0], 0, TANK_R, TANK_H),
  b: cylinder(TANK_X, LANE_MID[1], 0, TANK_R, TANK_H),
}
const RAIL = {
  c: path(LINK_Z, [blockEnd(2), LANE_MID[0]], [TANK_X - TANK_R, LANE_MID[0]]),
  b: path(LINK_Z, [blockEnd(1), LANE_MID[1]], [TANK_X - TANK_R, LANE_MID[1]]),
}

// The committee, front-right, feeding both tanks.
const COMMITTEE: Dims = [212, 38, 0, 24, 28, 18]
const COMMITTEE_BOX = box(...COMMITTEE)
const TO_TANK = {
  c: path(6, [COMMITTEE[0], 44], [TANK_X, 44], [TANK_X, LANE_MID[0] + TANK_R]),
  b: path(6, [COMMITTEE[0], 60], [TANK_X, 60], [TANK_X, LANE_MID[1] - TANK_R]),
}

// The attacker's validators, front-left, and their way to B.
const ATTACKER: Dims = [8, 96, 0, 30, 18, 12]
const ATTACKER_BOX = box(...ATTACKER)
const RELEASE = path(
  6,
  [38, 105],
  [SLOT_X[1] + 15, 105],
  [SLOT_X[1] + 15, LANE_Y[1] + BLOCK_D]
)

// Slot ticks along the plate's front edge, under each slot's centre.
const TICK_DROP = 5
const TICK_TEXT_DROP = 16
const TICKS = SLOT_X.map((x) => P(x + BLOCK_W / 2, PLATE_D, -8))
const TICK_MARKS = TICKS.map(([x, y]) => `M${x},${y} L${x},${y + TICK_DROP}`)
const SLOT_TEXT = [SLOT_NAMES.n, SLOT_NAMES.n1, SLOT_NAMES.n2, SLOT_NAMES.n3]

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = isoShadow(
  footprint(-4, 4, PLATE_W + 8, PLATE_D + 6, -22, 6),
  SHADOW
)
const contact = ([x, y, , w, d]: Dims, pad = 3) =>
  isoShadow(footprint(x, y, w, d, 0, pad), SHADOW)
const tankShadow = (y: number) =>
  isoShadow(
    footprint(TANK_X - TANK_R, y - TANK_R, 2 * TANK_R, 2 * TANK_R),
    SHADOW
  )
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {contact(blockDims(0, 0))}
    {contact(ATTACKER)}
    {contact(COMMITTEE)}
    {tankShadow(LANE_MID[0])}
    {tankShadow(LANE_MID[1])}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, PLATE_W, PLATE_D], 5)
const blockDetail = (slot: number, lane: number) =>
  D.inset([SLOT_X[slot], LANE_Y[lane], BLOCK_H, BLOCK_W, BLOCK_D], 3)
const A_DETAIL = blockDetail(0, 0)
const B_DETAIL = blockDetail(1, 1)
const C_DETAIL = blockDetail(2, 0)
const D_DETAIL = { c: blockDetail(3, 0), b: blockDetail(3, 1) }
const ATTACKER_DETAIL = D.seams(ATTACKER, { start: [1 / 3, 2 / 3] })
const COMMITTEE_DETAIL = D.seams(COMMITTEE, { start: [1 / 3, 2 / 3] })
const TANK_DETAIL = {
  c: D.cylinderMarks(TANKS.c),
  b: D.cylinderMarks(TANKS.b),
}
// Invisible boxes where the slot names sit, so labels keep off them.
const TICK_KEEP_OUT = TICKS.map(([x, y]) => (
  <rect
    key={x}
    x={r1(x - 14)}
    y={y + TICK_TEXT_DROP - 8}
    width={28}
    height={16}
    stroke="none"
    style={{ fill: "transparent" }}
  />
))

/** The surface of a tank's contents at `level` (0-1), as ellipse props. */
const surfaceAt = (tank: (typeof TANKS)["b"], level: number) => ({
  ...tank.top,
  cy: r1(tank.top.cy + (1 - level) * (tank.base.cy - tank.top.cy)),
})

/* ---------- Labels: outside the plate, short leaders ---------- */

const D_SPOT: Record<"b" | "c", AnatomyLabelSpot> = {
  c: {
    id: "d",
    tone: "entity",
    target: P(SLOT_X[3] + 12, LANE_Y[0], BLOCK_H),
    anchor: [330, 96],
    placement: "above",
  },
  b: {
    id: "d",
    tone: "entity",
    target: P(SLOT_X[3] + 4, LANE_Y[1] + BLOCK_D, 4),
    anchor: [318, 262],
    placement: "below",
  },
}

const spots = (dLane: "b" | "c" | null): AnatomyLabelSpot[] => [
  {
    id: "a",
    tone: "entity",
    target: P(SLOT_X[0] + 8, LANE_Y[0], BLOCK_H),
    anchor: [160, 40],
    placement: "above",
  },
  {
    id: "b",
    tone: "entity",
    target: P(SLOT_X[1] + 20, LANE_Y[1] + BLOCK_D, 2),
    anchor: [120, 178],
    placement: "start",
  },
  {
    id: "c",
    tone: "entity",
    target: P(SLOT_X[2] + 16, LANE_Y[0], BLOCK_H),
    anchor: [290, 74],
    placement: "above",
  },
  ...(dLane ? [D_SPOT[dLane]] : []),
  {
    id: "attacker",
    tone: "entity",
    target: P(ATTACKER[0] + 2, ATTACKER[1] + 4, ATTACKER[5]),
    anchor: [48, 100],
    placement: "above",
  },
  {
    id: "votes-c",
    tone: "entity",
    target: P(TANK_X + 4, LANE_MID[0] - 4, TANK_H),
    anchor: [400, 120],
    placement: "above",
  },
  {
    id: "votes-b",
    tone: "entity",
    target: P(TANK_X, LANE_MID[1] + TANK_R, 2),
    anchor: [380, 240],
    placement: "below",
  },
  {
    id: "committee",
    tone: "neutral",
    target: P(COMMITTEE[0] + COMMITTEE[3], 52, 9),
    anchor: [432, 174],
    placement: "above",
  },
  {
    id: "boost",
    tone: "entity",
    target: P(SLOT_X[2] + 3, LANE_Y[0] + 3, BLOCK_H + 4),
    anchor: [250, 40],
    placement: "above",
  },
  {
    id: "empty",
    tone: "neutral",
    target: P(SLOT_X[1] + 14, LANE_Y[0], 0),
    anchor: [225, 52],
    placement: "above",
  },
]

const SPOTS = {
  none: spots(null),
  c: spots("c"),
  b: spots("b"),
}

interface ExAnteReorgRigProps {
  view: ExAnteReorgView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<ExAnteReorgPart, ReactNode>
  definitions: Record<ExAnteReorgPart, ReactNode>
  className?: string
}

const POP =
  "animate-diagram-pop [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none"
/** Withheld or orphaned: faded, its outline dashed. */
const FADED = { opacity: 0.45, strokeDasharray: "3 3" } as const

const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

function ExAnteReorgRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: ExAnteReorgRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: ExAnteReorgPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const pops = (motion: ExAnteReorgView["motion"]) => view.motion === motion
  const faded = (block: "b" | "c") =>
    (block === "b" && view.bWithheld) || view.orphaned === block
  const level = (votes: number) => Math.min(votes / MAX_BRANCH_VOTES, 1)
  // C's tank holds its votes plus the boost while it lasts.
  const levels = {
    c: level(view.votesC + view.boost),
    b: level(view.votesB),
  }
  const ghost = surfaceAt(TANKS.b, level(view.withheldVotes))

  // Label only what's drawn.
  const { bShown, cShown, boostShown, dParent } = view
  const labelSpots = useMemo(
    () =>
      SPOTS[dParent ?? "none"].filter(
        ({ id }) =>
          (id !== "b" || bShown) &&
          (id !== "c" || cShown) &&
          (id !== "boost" || boostShown)
      ),
    [bShown, cShown, boostShown, dParent]
  )

  const tank = (lane: "b" | "c") => (
    <g {...part(lane === "b" ? "votes-b" : "votes-c")}>
      <IsoPipe
        hue="entity"
        d={TO_TANK[lane]}
        flowing={view.voting}
        flowKey={runKey}
        state={state(lane === "b" ? "votes-b" : "votes-c")}
      />
      <IsoCylinder
        geometry={TANKS[lane]}
        hue="entity"
        clipId={`${SHADOW}-tank-${lane}`}
        level={levels[lane]}
        levelDelay={pops("vote") ? 300 : pops("release") ? 500 : 0}
        state={state(lane === "b" ? "votes-b" : "votes-c")}
      />
      {TANK_DETAIL[lane]}
      {lane === "b" && view.withheldVotes > 0 && (
        // The attacker's withheld votes: a ghost level, not yet counted.
        <ellipse
          {...ghost}
          strokeDasharray="2 2"
          className="stroke-diagram-entity"
          style={{ fill: "none" }}
        />
      )}
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
        <path
          d={TICK_MARKS.join(" ")}
          className="stroke-diagram-line"
          style={{ fill: "none" }}
        />
        {TICK_KEEP_OUT}

        {/* Back lane: A, the empty slot, C, its rail on to its tank, and D
            if it builds on C. */}
        <g {...part("empty")}>
          <polygon
            points={EMPTY}
            strokeDasharray="3 3"
            className={anatomyStroke("neutral", state("empty"))}
            style={{ fill: DIAGRAM_COLOR.plate }}
          />
        </g>
        <g {...part("a")}>
          {view.cShown && <IsoPipe d={A_TO_C} state={state("a")} />}
          <IsoSolid box={A_BOX} hue="entity" state={state("a")} />
          {A_DETAIL}
        </g>

        {view.cShown && (
          <g {...part("c")}>
            <IsoPipe d={RAIL.c} state={state("c")} />
            <g
              key={pops("propose") ? runKey : "c"}
              className={cn(pops("propose") && POP)}
              style={faded("c") ? FADED : undefined}
            >
              <IsoSolid box={C_BOX} hue="entity" state={state("c")} />
              {C_DETAIL}
            </g>
          </g>
        )}
        {view.boostShown && (
          <g {...part("boost")}>
            <g
              key={pops("propose") ? runKey : "boost"}
              className={cn(pops("propose") && POP)}
              style={pops("propose") ? { animationDelay: "400ms" } : undefined}
            >
              <IsoSolid box={BOOST_BOX} hue="entity" state="lit" />
            </g>
          </g>
        )}

        {view.dParent === "c" && (
          <g {...part("d")}>
            <g key={runKey} className={POP}>
              <IsoSolid box={D_BOX.c} hue="entity" state={state("d")} />
              {D_DETAIL.c}
            </g>
          </g>
        )}

        {tank("c")}

        {/* Front lane: the attacker's branch. */}
        {view.bShown && (
          <g {...part("b")}>
            <g style={view.bWithheld ? FADED : undefined}>
              <IsoPipe d={A_TO_B} state={state("b")} />
              <IsoPipe d={RAIL.b} state={state("b")} />
            </g>
            <g
              key={pops("withhold") || pops("release") ? runKey : "b"}
              className={cn((pops("withhold") || pops("release")) && POP)}
              style={faded("b") ? FADED : undefined}
            >
              <IsoSolid box={B_BOX} hue="entity" state={state("b")} />
              {B_DETAIL}
            </g>
          </g>
        )}

        {view.dParent === "b" && (
          <g {...part("d")}>
            <g key={runKey} className={POP}>
              <IsoSolid box={D_BOX.b} hue="entity" state={state("d")} />
              {D_DETAIL.b}
            </g>
          </g>
        )}

        {tank("b")}

        <g {...part("committee")}>
          <IsoSolid
            box={COMMITTEE_BOX}
            hue="neutral"
            state={state("committee")}
          />
          {COMMITTEE_DETAIL}
        </g>

        <g {...part("attacker")}>
          <IsoPipe
            hue="entity"
            d={RELEASE}
            flowing={view.releasing}
            flowKey={runKey}
            state={state("attacker")}
          />
          <IsoSolid box={ATTACKER_BOX} hue="entity" state={state("attacker")} />
          {ATTACKER_DETAIL}
        </g>
      </svg>

      {/* Slot names under the ticks: notation, never translated. HTML, so
          they read the right way round in RTL. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {TICKS.map(([x, y], i) => (
          <span
            key={x}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-sm whitespace-nowrap text-body-medium rtl:translate-x-1/2"
            style={{
              insetInlineStart: pct(x, W),
              top: pct(y + TICK_TEXT_DROP, H),
            }}
          >
            {SLOT_TEXT[i]}
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

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(ExAnteReorgRig)
