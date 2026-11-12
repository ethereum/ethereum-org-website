import { memo, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
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
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  MEV_BOOST_SIZE,
  type MevBoostLink,
  type MevBoostPart,
  type MevBoostView,
} from "./model"

/*
 * Isometric drawing of block building through MEV-Boost. Server-rendered
 * with the player.
 *
 * Front row, left to right: the proposer's node (its consensus client, with
 * MEV-Boost beside it), a pad of two relays, a pad of three builders.
 * Behind the node, a pad of peers stands for the rest of the network. Every
 * link carries messages, so all are `IsoPipe hue="entity"`. Once builders
 * have bid, the first relay holds the winning block (dashed until the
 * proposer signs its header); the publish link arches from that relay over
 * to the network.
 */

const { width: W, height: H } = MEV_BOOST_SIZE
const PROJECTION = isoProjection(185, 30)
const { P, line, path, box, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "mev-boost-shadow"

type Box = [number, number, number, number, number, number]

/* ---------- Geometry ---------- */

const NODE_BOX: Box = [0, 120, -8, 90, 80, 8]
const NODE = box(...NODE_BOX)
const PROPOSER_BOX: Box = [8, 150, 0, 36, 36, 26]
const PROPOSER = box(...PROPOSER_BOX)
const BOOST_BOX: Box = [54, 126, 0, 26, 22, 14]
const BOOST = box(...BOOST_BOX)

const RELAY_PAD = box(110, 35, -4, 50, 80, 4)
const RELAY_BOXES: Box[] = [
  [118, 45, 0, 20, 20, 20],
  [118, 79, 0, 20, 20, 20],
]
const RELAYS = RELAY_BOXES.map((b) => box(...b))
// The winning block, held by the first relay.
const HELD_BLOCK = box(124, 51, 20, 8, 8, 6)

const BUILDER_PAD = box(200, -75, -4, 50, 100, 4)
const BUILDER_AT = [-67, -34, -1]
const BUILDERS = BUILDER_AT.map((y) => box(212, y, 0, 18, 18, 22))
// A bus under the builders, low enough to hide in them.
const BUILDER_BUS = path(7, [221, -58], [221, 8])

const NETWORK_PAD = box(10, 25, -4, 50, 60, 4)
const PEER_AT: [number, number][] = [
  [16, 30],
  [38, 47],
  [16, 64],
]
const PEERS = PEER_AT.map(([x, y]) => box(x, y, 0, 16, 16, 14))
const PEER_MESH = path(
  7,
  ...[...PEER_AT, PEER_AT[0]].map(([x, y]): [number, number] => [x + 8, y + 8])
)

interface Link {
  d: string
  back: string
}
const pathLink = (z: number, ...xy: [number, number][]): Link => ({
  d: path(z, ...xy),
  back: path(z, ...[...xy].reverse()),
})
const pointLink = (...ps: Point[]): Link => ({
  d: line(...ps),
  back: line(...[...ps].reverse()),
})

const LINKS: Record<MevBoostLink, Link> = {
  // Proposer's end face to MEV-Boost's start face.
  boost: pathLink(10, [44, 165], [62, 165], [62, 148]),
  // MEV-Boost's end face to each relay.
  "relay-1": pathLink(10, [80, 137], [100, 137], [100, 55], [118, 55]),
  "relay-2": pathLink(10, [80, 137], [128, 137], [128, 99]),
  // From the builders into each relay's end face.
  "build-1": pathLink(10, [212, -25], [185, -25], [185, 55], [138, 55]),
  "build-2": pathLink(10, [212, -25], [185, -25], [185, 89], [138, 89]),
  // Up from the winning relay, over to the network, down onto a peer.
  publish: pointLink(
    P(128, 55, 26),
    P(128, 55, 44),
    P(46, 55, 44),
    P(46, 55, 14)
  ),
}

/* ---------- Static detail and shadows ---------- */

const SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(4, 124, 90, 80, -22, 6), SHADOW)}
    {isoShadow(footprint(110, 35, 50, 80, -10, 4), SHADOW)}
    {isoShadow(footprint(200, -75, 50, 100, -10, 4), SHADOW)}
    {isoShadow(footprint(10, 25, 50, 60, -10, 4), SHADOW)}
  </g>
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(10, 152, 36, 36, 0, 4), SHADOW)}
    {isoShadow(footprint(56, 128, 26, 22, 0, 3), SHADOW)}
  </g>
)
const NODE_DETAIL = D.inset([0, 120, 0, 90, 80], 4)
const PROPOSER_DETAIL = (
  <>
    {D.seams(PROPOSER_BOX, { end: [0.5], ring: 0.14 })}
    {D.vents(186, 13, 27, [16, 20])}
  </>
)
const BOOST_DETAIL = D.vents(148, 58, 70, [6, 9])
const RELAY_DETAIL = RELAY_BOXES.map((b) => (
  <g key={b.join()}>{D.seams(b, { end: [0.5] })}</g>
))
const RELAY_PAD_DETAIL = D.inset([110, 35, 0, 50, 80], 3)
const BUILDER_PAD_DETAIL = D.inset([200, -75, 0, 50, 100], 3)
const NETWORK_PAD_DETAIL = D.inset([10, 25, 0, 50, 60], 3)

/* ---------- Labels ---------- */

// The node's plate has no label (no room beside the proposer's); hovering it
// still shows its definition.

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "proposer",
    tone: "entity",
    target: P(26, 186, 0),
    anchor: [P(26, 186, 0)[0], 196],
    placement: "below",
  },
  {
    id: "relays",
    tone: "entity",
    target: P(160, 115, -4),
    anchor: [P(160, 115, -4)[0], 196],
    placement: "below",
  },
  {
    id: "builders",
    tone: "entity",
    target: P(230, -67, 22),
    anchor: [P(230, -67, 22)[0], 46],
    placement: "above",
  },
  {
    id: "network",
    tone: "entity",
    target: P(16, 46, 14),
    anchor: [P(16, 46, 14)[0], 14],
    placement: "above",
  },
  {
    id: "boost",
    tone: "entity",
    target: P(80, 148, 0),
    anchor: [P(80, 148, 0)[0], 226],
    placement: "below",
  },
]

/* ---------- Rig ---------- */

interface MevBoostRigProps {
  view: MevBoostView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<MevBoostPart, ReactNode>
  definitions: Record<MevBoostPart, ReactNode>
  className?: string
}

function MevBoostRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: MevBoostRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: MevBoostPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const pipe = (name: MevBoostLink, owner: MevBoostPart) => (
    <IsoPipe
      d={LINKS[name].d}
      hue="entity"
      flowing={!!view.flows[name]}
      flowD={view.flows[name] === "back" ? LINKS[name].back : undefined}
      flowKey={runKey}
      state={state(owner)}
    />
  )
  // Pads are structure: they show hover, but never light.
  const padState = (name: MevBoostPart) =>
    state(name) === "hover" ? "hover" : "rest"

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
        {SHADOWS}

        <g {...part("network")}>
          <IsoSolid
            box={NETWORK_PAD}
            hue="neutral"
            state={padState("network")}
          />
          {NETWORK_PAD_DETAIL}
          <path
            d={PEER_MESH}
            fill="none"
            className="stroke-diagram-pipe [stroke-width:1.4]"
          />
          {PEERS.map((peer) => (
            <IsoSolid
              key={peer.top}
              box={peer}
              hue="entity"
              state={state("network")}
            />
          ))}
        </g>

        <g {...part("builders")}>
          <IsoSolid
            box={BUILDER_PAD}
            hue="neutral"
            state={padState("builders")}
          />
          {BUILDER_PAD_DETAIL}
          <path
            d={BUILDER_BUS}
            fill="none"
            className="stroke-diagram-pipe [stroke-width:1.4]"
          />
          {BUILDERS.map((builder) => (
            <IsoSolid
              key={builder.top}
              box={builder}
              hue="entity"
              state={state("builders")}
            />
          ))}
        </g>

        <g {...part("relays")}>
          <IsoSolid box={RELAY_PAD} hue="neutral" state={padState("relays")} />
          {RELAY_PAD_DETAIL}
        </g>

        {/* Over the relays' pad, under the relays: the builders' links into
            their end faces, and MEV-Boost's into the first one's hidden back
            face. */}
        <g {...part("builders")}>
          {pipe("build-1", "builders")}
          {pipe("build-2", "builders")}
        </g>
        <g {...part("boost")}>{pipe("relay-1", "boost")}</g>

        <g {...part("relays")}>
          {RELAYS.map((relay) => (
            <IsoSolid
              key={relay.top}
              box={relay}
              hue="entity"
              state={state("relays")}
            />
          ))}
          {RELAY_DETAIL}
          {view.bid !== null && (
            // Dashed while only its header is known; solid once signed.
            <g
              key={view.signed ? "signed" : "held"}
              strokeDasharray={view.signed ? undefined : "2 2"}
              className={cn(
                !view.signed &&
                  "animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
              )}
            >
              <IsoSolid box={HELD_BLOCK} hue="entity" state={state("relays")} />
            </g>
          )}
        </g>

        <g {...part("node")}>
          <IsoPlate box={NODE} state={state("node")} />
          {NODE_DETAIL}
        </g>
        {CONTACT_SHADOWS}

        <g {...part("boost")}>
          {pipe("relay-2", "boost")}
          <IsoSolid box={BOOST} hue="entity" state={state("boost")} />
          {BOOST_DETAIL}
        </g>

        <g {...part("proposer")}>
          {pipe("boost", "proposer")}
          <IsoSolid box={PROPOSER} hue="entity" state={state("proposer")} />
          {PROPOSER_DETAIL}
        </g>

        <g {...part("network")}>{pipe("publish", "network")}</g>
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={SPOTS}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(MevBoostRig)
