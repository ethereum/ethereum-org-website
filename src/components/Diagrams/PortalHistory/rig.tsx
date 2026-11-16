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
  isoProjection,
  isoShadow,
  IsoSolid,
  type Point,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  PORTAL_HISTORY_SIZE,
  type PortalHistoryLink,
  type PortalHistoryPart,
  type PortalHistoryView,
} from "./model"

/*
 * Isometric drawing of a lookup in the Portal Network's History network.
 * Server-rendered with the player.
 *
 * Front left, on its own pad: an execution client and the stack of block
 * headers it keeps. Back right, on a larger pad: the History network, drawn
 * as a ring (the ID space) with nodes standing on it at their node IDs. The
 * content ID of the receipts sits on the ring next to the node that stores
 * them, whose radius is marked along the ring. The client's requests arch
 * from its top to a node's top.
 */

const { width: W, height: H } = PORTAL_HISTORY_SIZE
const PROJECTION = isoProjection(178, 40)
const { P, line, box, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "portal-history-shadow"

type Box = [number, number, number, number, number, number]

/* ---------- Geometry ---------- */

const CLIENT_PAD_BOX: Box = [0, 56, -6, 60, 60, 6]
const CLIENT_PAD = box(...CLIENT_PAD_BOX)
const CLIENT_BOX: Box = [8, 68, 0, 26, 26, 26]
const CLIENT = box(...CLIENT_BOX)
const HEADER_BOXES: Box[] = [0, 4, 8, 12, 16].map((z) => [
  40,
  70,
  z,
  14,
  22,
  2.5,
])
const HEADERS = HEADER_BOXES.map((b) => box(...b))
// The receipts, once received: beside the headers, dashed until checked.
const RECEIVED = box(40, 98, 0, 12, 12, 6)

const NETWORK_PAD_BOX: Box = [76, -44, -4, 150, 120, 4]
const NETWORK_PAD = box(...NETWORK_PAD_BOX)

// The ID space: a ring on the pad, with nodes at their IDs (angles).
const RING = { x: 151, y: 16, r: 50 }
const onRing = (deg: number): [number, number] => [
  RING.x + RING.r * Math.cos((deg * Math.PI) / 180),
  RING.y + RING.r * Math.sin((deg * Math.PI) / 180),
]
const arc = (from: number, to: number, z = 0) =>
  line(
    ...Array.from({ length: 25 }, (_, i) =>
      P(...onRing(from + ((to - from) * i) / 24), z)
    )
  )
const RING_PATH = arc(0, 360)
const NODE = 12
const nodeAt = (deg: number) => {
  const [x, y] = onRing(deg)
  return box(x - NODE / 2, y - NODE / 2, 0, NODE, NODE, NODE)
}
const PEER_DEG = 275
const HOLDER_DEG = 70
const CONTENT_DEG = 52
// Back to front, so nearer nodes are drawn over farther ones.
const NODES: { deg: number; part: PortalHistoryPart }[] = [
  { deg: 225, part: "network" },
  { deg: PEER_DEG, part: "peer" },
  { deg: 150, part: "network" },
  { deg: 325, part: "network" },
  { deg: 20, part: "network" },
  { deg: HOLDER_DEG, part: "holder" },
]
const NODE_BOXES = NODES.map(({ deg }) => nodeAt(deg))
// The holder's radius: a band along the ring round its own ID, the stretch
// of ID space it stores.
const bandArc = (r: number) =>
  line(
    ...Array.from({ length: 13 }, (_, i) => {
      const deg = HOLDER_DEG - 30 + (60 * i) / 12
      const rad = (deg * Math.PI) / 180
      return P(RING.x + r * Math.cos(rad), RING.y + r * Math.sin(rad), 0)
    })
  )
const RADIUS = `${bandArc(RING.r - 5)} ${bandArc(RING.r + 5)}`
const CONTENT_AT = onRing(CONTENT_DEG)
const CONTENT = box(CONTENT_AT[0] - 3, CONTENT_AT[1] - 3, 0, 6, 6, 4)

// Requests arch from the client's top to a node's top.
const CLIENT_TOP = [21, 81, 26] as const
interface Link {
  d: string
  back: string
}
// Each arch at its own height, so the two never cross over the nodes.
const archTo = (deg: number, z: number): Link => {
  const [x, y] = onRing(deg)
  const ps: Point[] = [
    P(...CLIENT_TOP),
    P(CLIENT_TOP[0], CLIENT_TOP[1], z),
    P(x, y, z),
    P(x, y, NODE),
  ]
  return { d: line(...ps), back: line(...[...ps].reverse()) }
}
const LINKS: Record<PortalHistoryLink, Link> = {
  peer: archTo(PEER_DEG, 36),
  holder: archTo(HOLDER_DEG, 60),
}

/* ---------- Static detail and shadows ---------- */

const SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(4, 60, 60, 60, -22, 6), SHADOW)}
    {isoShadow(footprint(80, -40, 150, 120, -20, 4), SHADOW)}
  </g>
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(10, 70, 26, 26, 0, 4), SHADOW)}
    {isoShadow(footprint(42, 72, 14, 22, 0, 3), SHADOW)}
  </g>
)
const CLIENT_PAD_DETAIL = D.inset([0, 56, 0, 60, 60], 3)
const NETWORK_PAD_DETAIL = D.inset([76, -44, 0, 150, 120], 3)
const CLIENT_DETAIL = (
  <>
    {D.seams(CLIENT_BOX, { end: [0.5], ring: 0.14 })}
    {D.vents(94, 13, 29, [8, 12, 16])}
  </>
)

/* ---------- Labels ---------- */

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "client",
    tone: "entity",
    target: P(8, 94, 0),
    anchor: [P(8, 94, 0)[0], 176],
    placement: "below",
  },
  {
    id: "headers",
    tone: "entity",
    // Below the pad, clear of the request arches above the client.
    target: P(54, 92, 0),
    anchor: [176, 150],
    placement: "below",
  },
  {
    id: "holder",
    tone: "entity",
    // Off the node's front corner, clear of the request arch above it.
    target: P(
      onRing(HOLDER_DEG)[0] - NODE / 2,
      onRing(HOLDER_DEG)[1] + NODE / 2
    ),
    anchor: [P(...onRing(HOLDER_DEG))[0] - 30, 226],
    placement: "below",
  },
  {
    id: "content",
    tone: "entity",
    target: P(...CONTENT_AT, 0),
    anchor: [P(...CONTENT_AT, 0)[0] + 30, 200],
    placement: "below",
  },
  {
    id: "peer",
    tone: "entity",
    target: P(onRing(PEER_DEG)[0] + NODE / 2, onRing(PEER_DEG)[1], NODE),
    anchor: [P(...onRing(PEER_DEG), NODE)[0] + 26, 58],
    placement: "above",
  },
  {
    id: "network",
    tone: "entity",
    target: P(226, -20, -4),
    anchor: [430, 160],
    placement: "below",
  },
]

/* ---------- Rig ---------- */

interface PortalHistoryRigProps {
  view: PortalHistoryView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<PortalHistoryPart, ReactNode>
  definitions: Record<PortalHistoryPart, ReactNode>
  className?: string
}

function PortalHistoryRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: PortalHistoryRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: PortalHistoryPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const pipe = (name: PortalHistoryLink, owner: PortalHistoryPart) => {
    const flow = view.flows[name]
    return (
      <>
        <IsoPipe
          d={LINKS[name].d}
          hue="entity"
          flowing={!!flow}
          flowD={flow === "back" ? LINKS[name].back : undefined}
          flowKey={runKey}
          state={state(owner)}
        />
        {flow === "both" && (
          // The answer, once the request has arrived.
          <IsoPipe
            d={LINKS[name].d}
            hue="entity"
            flowing
            flowD={LINKS[name].back}
            flowKey={runKey}
            flowDelay={700}
            state={state(owner)}
          />
        )}
      </>
    )
  }
  // Pads are structure: they show hover, but never light.
  const padState = (name: PortalHistoryPart) =>
    state(name) === "hover" ? "hover" : "rest"
  const holderLit = state("holder") === "lit"

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
            d={RING_PATH}
            fill="none"
            className="stroke-diagram-pipe [stroke-width:1.4]"
          />
        </g>
        <g {...part("holder")}>
          <path
            d={RADIUS}
            fill="none"
            strokeLinecap="round"
            className={
              holderLit ? "stroke-diagram-entity" : "stroke-diagram-line"
            }
          />
        </g>
        {NODES.map(({ deg, part: name }, i) => (
          <g key={deg} {...part(name)}>
            <IsoSolid box={NODE_BOXES[i]} hue="entity" state={state(name)} />
          </g>
        ))}
        {view.located && (
          <g {...part("content")}>
            <g className="animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none">
              <IsoSolid box={CONTENT} hue="entity" state={state("content")} />
            </g>
          </g>
        )}

        <g {...part("client")}>
          <IsoSolid box={CLIENT_PAD} hue="neutral" state={padState("client")} />
          {CLIENT_PAD_DETAIL}
        </g>
        {CONTACT_SHADOWS}
        <g {...part("client")}>
          <IsoSolid box={CLIENT} hue="entity" state={state("client")} />
          {CLIENT_DETAIL}
        </g>
        <g {...part("headers")}>
          {HEADERS.map((header) => (
            <IsoSolid
              key={header.top}
              box={header}
              hue="entity"
              state={state("headers")}
            />
          ))}
        </g>
        {view.received && (
          <g {...part("content")}>
            <g
              key={view.verified ? "verified" : "received"}
              strokeDasharray={view.verified ? undefined : "2 2"}
              className={cn(
                !view.verified &&
                  "animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
              )}
            >
              <IsoSolid box={RECEIVED} hue="entity" state={state("content")} />
            </g>
          </g>
        )}

        <g {...part("peer")}>{pipe("peer", "peer")}</g>
        <g {...part("holder")}>{pipe("holder", "holder")}</g>
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
export default memo(PortalHistoryRig)
