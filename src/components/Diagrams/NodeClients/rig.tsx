import { memo, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  AnatomyLabels,
  type AnatomyLabelSpot,
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
  NODE_CLIENTS_SIZE,
  type NodeLink,
  type NodePart,
  type NodeRigView,
  POOL_SLOTS,
} from "./model"

/*
 * Isometric drawing of one Ethereum node, shared by the node diagrams.
 * Server-rendered with the player.
 *
 * The node's plate carries the consensus client (back) and the execution
 * client (front), joined by the Engine API, which arches over the gap
 * between them. Each client has its own peer-to-peer network off the plate:
 * consensus peers behind, execution peers in front, each a small pad of
 * peers on its own link, so the two networks never touch. A wallet or app
 * stands in front of the node, with one pipe to each client: JSON-RPC to the
 * execution client, the Beacon API to the consensus client.
 *
 * At the `internals` level the execution client also shows its transaction
 * pool and the EVM, and the consensus client a short chain of blocks with a
 * slot for the next head.
 *
 * Messages are not gas, so links are `IsoPipe hue="entity"`: they flow
 * blue, and the link to watch turns blue with a light dash running along it.
 */

const { width: W, height: H } = NODE_CLIENTS_SIZE
const PROJECTION = isoProjection(200, 90)
const { P, pts, line, path, box, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "node-clients-shadow"

type Box = [number, number, number, number, number, number]

/** Quad on a top (z = const) face. */
const onTop = (z: number, x0: number, x1: number, y0: number, y1: number) =>
  pts(P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z))

/* ---------- Geometry ---------- */

const PLATE_W = 210
const PLATE_D = 110
const PLATE = box(0, 0, -8, PLATE_W, PLATE_D, 8)

const CL_BOX: Box = [20, 30, 0, 60, 50, 34]
const EL_BOX: Box = [130, 30, 0, 60, 50, 34]
const CL = box(...CL_BOX)
const EL = box(...EL_BOX)

// The app, off the plate in front: wide enough for both pipes to meet it.
const APP_BOX: Box = [40, 170, 0, 130, 24, 16]
const APP = box(...APP_BOX)

// Peer networks: a pad with three peers each, consensus behind the node,
// execution in front of it.
const PEER = 16
const PEER_H = 14
const CL_PAD_BOX: Box = [-80, 15, -4, 50, 80, 4]
const EL_PAD_BOX: Box = [240, 15, -4, 50, 80, 4]
const CL_PAD = box(...CL_PAD_BOX)
const EL_PAD = box(...EL_PAD_BOX)
/** Peer corners, back to front (drawing order). The middle one is linked to
 * the node. */
const CL_PEER_AT: [number, number][] = [
  [-74, 20],
  [-52, 47],
  [-74, 74],
]
const EL_PEER_AT: [number, number][] = [
  [268, 20],
  [246, 47],
  [268, 74],
]
const peerBoxes = (at: [number, number][]) =>
  at.map(([x, y]) => box(x, y, 0, PEER, PEER, PEER_H))
const CL_PEERS = peerBoxes(CL_PEER_AT)
const EL_PEERS = peerBoxes(EL_PEER_AT)

interface Link {
  /** Forward direction (see NODE_LINKS). */
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
/** A closed loop through the peers' centres, low enough to hide in them. */
const meshLink = (at: [number, number][]) => {
  const centres = at.map(([x, y]): [number, number] => [
    x + PEER / 2,
    y + PEER / 2,
  ])
  return pathLink(7, ...centres, centres[0])
}

const LINKS: Record<NodeLink, Link> = {
  rpc: pathLink(10, [160, 170], [160, 80]),
  beacon: pathLink(10, [50, 170], [50, 80]),
  // Up from the consensus client's top, over the gap, down onto the
  // execution client's.
  engine: pointLink(
    P(72, 52, 34),
    P(72, 52, 54),
    P(138, 52, 54),
    P(138, 52, 34)
  ),
  "cl-peer": pathLink(10, [-36, 55], [20, 55]),
  "el-peer": pathLink(10, [246, 55], [190, 55]),
  "cl-mesh": meshLink(CL_PEER_AT),
  "el-mesh": meshLink(EL_PEER_AT),
}

// Internals: the consensus client's chain (three blocks and the slot for the
// next head), the execution client's transaction pool and EVM.
const CHAIN = [24, 35, 46].map((x) => box(x, 62, 34, 8, 8, 7))
const HEAD_SLOT = box(57, 62, 34, 8, 8, 7)
const HEAD_FOOTPRINT = onTop(34, 57, 65, 62, 70)
const POOL = box(144, 34, 34, 20, 20, 5)
const POOL_CELLS = [
  onTop(39, 146, 153, 36, 43),
  onTop(39, 155, 162, 36, 43),
  onTop(39, 146, 153, 45, 52),
  onTop(39, 155, 162, 45, 52),
].slice(0, POOL_SLOTS)
const EVM = box(168, 34, 34, 18, 18, 16)

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(-4, 4, PLATE_W + 8, PLATE_D + 6, -22, 6), SHADOW)}
    {isoShadow(footprint(-80, 15, 50, 80, -14, 4), SHADOW)}
    {isoShadow(footprint(240, 15, 50, 80, -14, 4), SHADOW)}
    {isoShadow(footprint(42, 172, 130, 24, 0, 5), SHADOW)}
  </g>
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(22, 32, 60, 50, 0, 4), SHADOW)}
    {isoShadow(footprint(132, 32, 60, 50, 0, 4), SHADOW)}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, PLATE_W, PLATE_D], 5)
const CL_PAD_DETAIL = D.inset([-80, 15, 0, 50, 80], 3)
const EL_PAD_DETAIL = D.inset([240, 15, 0, 50, 80], 3)
const CL_DETAIL = (
  <>
    {D.seams(CL_BOX, { end: [0.5], ring: 0.12 })}
    {D.vents(80, 26, 42, [20, 24])}
  </>
)
const EL_DETAIL = (
  <>
    {D.seams(EL_BOX, { end: [0.5], ring: 0.12 })}
    {D.vents(80, 136, 152, [20, 24])}
  </>
)
const APP_DETAIL = (
  <>
    {D.inset([40, 170, 16, 130, 24], 4)}
    {D.plate(194, 66, 144, 4, 12)}
  </>
)
const EVM_DETAIL = D.vents(52, 171, 183, [41, 45])

/* ---------- Labels: outside the plates, short straight leaders ---------- */

const CL_SPOT: AnatomyLabelSpot = {
  id: "cl",
  tone: "entity",
  target: P(30, 30, 34),
  anchor: [P(30, 30, 34)[0], 46],
  placement: "above",
}
const ENGINE_SPOT: AnatomyLabelSpot = {
  id: "engine",
  tone: "entity",
  target: P(130, 52, 54),
  anchor: [P(130, 52, 54)[0], 80],
  placement: "above",
}
const CL_NET_SPOT: AnatomyLabelSpot = {
  id: "cl-net",
  tone: "entity",
  target: P(-74, 20, PEER_H),
  anchor: [P(-74, 20, PEER_H)[0], 24],
  placement: "above",
}
const EL_NET_SPOT: AnatomyLabelSpot = {
  id: "el-net",
  tone: "entity",
  target: P(284, 90, 0),
  anchor: [r1(P(284, 90, 0)[0] + 3), 293],
  placement: "below",
}
const APP_SPOT: AnatomyLabelSpot = {
  id: "app",
  tone: "entity",
  target: P(60, 194, 0),
  anchor: [110, 262],
  placement: "below",
}
const RPC_SPOT: AnatomyLabelSpot = {
  id: "rpc",
  tone: "entity",
  target: P(160, 140, 10),
  anchor: [250, 268],
  placement: "below",
}
const BEACON_SPOT: AnatomyLabelSpot = {
  // Left of the pipe, between the plate's corner and the app.
  id: "beacon",
  tone: "entity",
  target: P(50, 125, 10),
  anchor: [102, 159],
  placement: "start",
}

/** The two clients and their APIs: every link labelled. */
const SPOTS_CLIENTS: AnatomyLabelSpot[] = [
  CL_SPOT,
  {
    id: "el",
    tone: "entity",
    target: P(175, 35, 34),
    anchor: [r1(P(175, 35, 34)[0] + 39), 112],
    placement: "above",
  },
  ENGINE_SPOT,
  RPC_SPOT,
  BEACON_SPOT,
  APP_SPOT,
  CL_NET_SPOT,
  EL_NET_SPOT,
  {
    id: "deck",
    tone: "neutral",
    target: P(PLATE_W, 0, -4),
    anchor: [425, 178],
    placement: "above",
  },
]

/** With internals: the pool and EVM take the space beside the execution
 * client, which is labelled from its end face instead. */
const SPOTS_INTERNALS: AnatomyLabelSpot[] = [
  CL_SPOT,
  {
    id: "el",
    tone: "entity",
    target: P(190, 34, 32),
    anchor: [410, 172],
    placement: "above",
  },
  ENGINE_SPOT,
  CL_NET_SPOT,
  EL_NET_SPOT,
  {
    id: "evm",
    tone: "entity",
    target: P(186, 34, 50),
    anchor: [372, 128],
    placement: "above",
  },
  {
    id: "mempool",
    tone: "entity",
    target: P(154, 34, 39),
    anchor: [336, 104],
    placement: "above",
  },
  APP_SPOT,
  RPC_SPOT,
  BEACON_SPOT,
]

/* ---------- Links ---------- */

interface NodeClientsRigProps {
  view: NodeRigView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<NodePart, ReactNode>
  definitions: Record<NodePart, ReactNode>
  className?: string
}

function NodeClientsRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: NodeClientsRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: NodePart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const pipe = (name: NodeLink, owner: NodePart) => (
    <IsoPipe
      d={LINKS[name].d}
      hue="entity"
      flowing={!!view.flows[name]}
      flowD={view.flows[name] === "back" ? LINKS[name].back : undefined}
      flowKey={runKey}
      state={state(owner)}
    />
  )
  // A network's pad is structure: it shows hover, but never lights.
  const padState = (name: NodePart) =>
    state(name) === "hover" ? "hover" : "rest"
  const internals = view.detail === "internals"

  // Pool entries are a stronger blue; the newest pops in when it arrives.
  const entry = `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 65%, ${DIAGRAM_COLOR.bg})`

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
        {GROUND_SHADOWS}

        {/* Consensus peers, behind the node: pad, mesh, peers. */}
        <g {...part("cl-net")}>
          <IsoSolid box={CL_PAD} hue="neutral" state={padState("cl-net")} />
          {CL_PAD_DETAIL}
          {pipe("cl-mesh", "cl-net")}
          {CL_PEERS.map((peer) => (
            <IsoSolid
              key={peer.top}
              box={peer}
              hue="entity"
              state={state("cl-net")}
            />
          ))}
        </g>

        <g {...part("deck")}>
          <IsoPlate box={PLATE} state={state("deck")} />
          {PLATE_DETAIL}
        </g>
        {CONTACT_SHADOWS}

        {/* The consensus client's link to its peers runs behind it. */}
        <g {...part("cl-net")}>{pipe("cl-peer", "cl-net")}</g>

        <g {...part("cl")}>
          <IsoSolid box={CL} hue="entity" state={state("cl")} />
          {CL_DETAIL}
          {internals && (
            <>
              {CHAIN.map((block) => (
                <IsoSolid
                  key={block.top}
                  box={block}
                  hue="entity"
                  state={state("cl")}
                />
              ))}
              {view.newBlock === "none" ? (
                <polygon
                  points={HEAD_FOOTPRINT}
                  fill="none"
                  strokeDasharray="2 2"
                  className="stroke-diagram-line"
                />
              ) : (
                // Dashed while it is checked; solid once it is the head.
                <g
                  key={view.newBlock}
                  strokeDasharray={
                    view.newBlock === "pending" ? "2 2" : undefined
                  }
                  className={cn(
                    view.newBlock === "pending" &&
                      "animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
                  )}
                >
                  <IsoSolid box={HEAD_SLOT} hue="entity" state={state("cl")} />
                </g>
              )}
            </>
          )}
        </g>

        <g {...part("el")}>
          <IsoSolid box={EL} hue="entity" state={state("el")} />
          {EL_DETAIL}
        </g>

        {internals && (
          <>
            <g {...part("mempool")}>
              <IsoSolid box={POOL} hue="entity" state={state("mempool")} />
              <g className="stroke-diagram-line-faint">
                {POOL_CELLS.map((cell, k) => {
                  const newest = view.poolAdded && k === view.poolCount - 1
                  return (
                    <polygon
                      key={newest ? `${cell}-${runKey}` : cell}
                      points={cell}
                      className={cn(
                        newest &&
                          "animate-diagram-pop stroke-diagram-entity [transform-box:fill-box] motion-reduce:animate-none"
                      )}
                      style={{
                        fill:
                          k < view.poolCount
                            ? entry
                            : anatomyFill("entity", "top"),
                      }}
                    />
                  )
                })}
              </g>
            </g>
            <g {...part("evm")}>
              <IsoSolid box={EVM} hue="entity" state={state("evm")} />
              {EVM_DETAIL}
            </g>
          </>
        )}

        <g {...part("engine")}>{pipe("engine", "engine")}</g>

        {/* The app's pipes, from each client's front face. */}
        <g {...part("beacon")}>{pipe("beacon", "beacon")}</g>
        <g {...part("rpc")}>{pipe("rpc", "rpc")}</g>

        {/* Execution peers, in front of the node: pad, mesh, then the link
            (over the pad, hidden by the peer it reaches), peers. */}
        <g {...part("el-net")}>
          <IsoSolid box={EL_PAD} hue="neutral" state={padState("el-net")} />
          {EL_PAD_DETAIL}
          {pipe("el-mesh", "el-net")}
          {pipe("el-peer", "el-net")}
          {EL_PEERS.map((peer) => (
            <IsoSolid
              key={peer.top}
              box={peer}
              hue="entity"
              state={state("el-net")}
            />
          ))}
        </g>

        <g {...part("app")}>
          <IsoSolid box={APP} hue="entity" state={state("app")} />
          {APP_DETAIL}
        </g>
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={internals ? SPOTS_INTERNALS : SPOTS_CLIENTS}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(NodeClientsRig)
