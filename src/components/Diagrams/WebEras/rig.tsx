import { memo, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
} from "../anatomy"
import {
  anatomyFill,
  type AnatomyHue,
  type AnatomyState,
  anatomyStroke,
} from "../anatomy/tokens"
import { usePartState } from "../diagram-hover"

import {
  ERA_PARTS,
  type EraId,
  type LinkId,
  MESH,
  NODE_COUNT,
  USER_COUNT,
  WEB_ERAS_SIZE,
  type WebErasPart,
  type WebErasView,
} from "./model"

/*
 * Flat drawing: three people along the bottom; above them a web server
 * (web1), a platform's stacked servers plus advertisers (web2), or a ring of
 * nodes (web3), with the links between them.
 */

type Point = [number, number]

const { width: W, height: H } = WEB_ERAS_SIZE
const USER_X = [120, 240, 360]
const USER_Y = 212
const USER_R = 17
const USER_TOP = USER_Y - USER_R
const HOST_BOTTOM = 106
const SERVER = { x: 208, y: 30, w: 64, h: HOST_BOTTOM - 30 }
const PAGE = { x: 284, y: 40, w: 24, h: 30 }
const UNIT = { x: 185, w: 110, h: 22, ys: [30, 56, 82] }
const ADS = { x: 382, y: 50, w: 68, h: 38 }
const NODE = { w: 40, h: 26 }
const NODES: Point[] = [
  [240, 38],
  [372, 74],
  [330, 140],
  [150, 140],
  [108, 74],
]

const hostLink = (i: number): [Point, Point] => [
  [240 + (i - 1) * 24, HOST_BOTTOM],
  [USER_X[i], USER_TOP],
]

const linkPoints = (id: LinkId): [Point, Point] => {
  const [kind, a, b] = id.split("-")
  if (kind === "host") return hostLink(Number(a))
  if (kind === "ads")
    return [
      [ADS.x, ADS.y + ADS.h / 2],
      [UNIT.x + UNIT.w, ADS.y + ADS.h / 2],
    ]
  if (kind === "mesh") return [NODES[Number(a)], NODES[Number(b)]]
  return [[USER_X[Number(a)], USER_TOP], NODES[Number(b)]]
}

const linkPath = (id: LinkId, reverse = false) => {
  const [p, q] = linkPoints(id)
  const [from, to] = reverse ? [q, p] : [p, q]
  return `M${from[0]},${from[1]} L${to[0]},${to[1]}`
}

const midpoint = (id: LinkId): Point => {
  const [[x1, y1], [x2, y2]] = linkPoints(id)
  return [(x1 + x2) / 2, (y1 + y2) / 2]
}

const ERA_LINKS: Record<EraId, (userNode: number[]) => LinkId[]> = {
  web1: () => Array.from({ length: USER_COUNT }, (_, i) => `host-${i}`),
  web2: () => [
    ...Array.from({ length: USER_COUNT }, (_, i) => `host-${i}`),
    "ads",
  ],
  web3: (userNode) => [
    ...MESH.map(([a, b]) => `mesh-${a}-${b}`),
    ...userNode.map((node, i) => `user-${i}-${node}`),
  ],
}

const SPOTS: Record<WebErasPart, AnatomyLabelSpot> = {
  server: {
    id: "server",
    tone: "entity",
    target: [SERVER.x, SERVER.y + 14],
    anchor: [SERVER.x - 8, SERVER.y + 14],
    placement: "start",
  },
  platform: {
    id: "platform",
    tone: "entity",
    target: [UNIT.x, UNIT.ys[0] + UNIT.h / 2],
    anchor: [UNIT.x - 8, UNIT.ys[0] + UNIT.h / 2],
    placement: "start",
  },
  ads: {
    id: "ads",
    tone: "gas",
    target: [ADS.x + ADS.w / 2, ADS.y - 20],
    anchor: [ADS.x + ADS.w / 2, ADS.y - 24],
    placement: "above",
  },
  network: {
    id: "network",
    tone: "entity",
    target: [NODES[4][0] - NODE.w / 2, NODES[4][1]],
    anchor: [NODES[4][0] - NODE.w / 2 - 8, NODES[4][1]],
    placement: "start",
  },
  users: {
    id: "users",
    tone: "entity",
    target: [USER_X[0] - USER_R, USER_Y],
    anchor: [USER_X[0] - USER_R - 8, USER_Y],
    placement: "start",
  },
  accounts: {
    id: "accounts",
    tone: "entity",
    target: [USER_X[2] + 26, USER_Y + 8],
    anchor: [USER_X[2] + 26, USER_Y + 18],
    placement: "below",
  },
}

const FLOW =
  "animate-diagram-flow motion-reduce:animate-none [stroke-width:1.4]"

const HUE_STROKE = {
  entity: "stroke-diagram-entity",
  gas: "stroke-diagram-gas",
} as const

const fillFor = (hue: AnatomyHue, state: AnatomyState) =>
  state === "rest"
    ? anatomyFill("neutral", "top")
    : anatomyFill(hue, "start", state)

const Slots = ({ x, y, w }: { x: number; y: number; w: number }) => (
  <>
    <path d={`M${x + 8},${y} h${w - 30}`} className="stroke-diagram-line" />
    <circle
      cx={x + w - 10}
      cy={y}
      r={2.5}
      style={{ fill: anatomyFill("entity", "end", "lit") }}
      className="stroke-diagram-line"
    />
  </>
)

interface WebErasRigProps {
  view: WebErasView
  runKey: string
  labels: Record<WebErasPart, ReactNode>
  definitions: Record<WebErasPart, ReactNode>
  className?: string
}

function WebErasRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: WebErasRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: WebErasPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const { era } = view
  const links = ERA_LINKS[era](view.userNode)
  if (view.cut && !links.includes(view.cut)) links.push(view.cut)
  const lockedUser = view.cut?.startsWith("host-")
    ? Number(view.cut.split("-")[1])
    : null

  const serverState = state("server")
  const platformState = state("platform")
  const adsState = state("ads")
  const networkState = state("network")
  const usersState = state("users")
  const accountsState = state("accounts")

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <g className="pointer-events-none" fill="none">
          {links.map((id) =>
            id === view.cut ? (
              <g key={id} className="stroke-diagram-revert">
                <path d={linkPath(id)} strokeDasharray="3 3" />
                <path
                  d={`M${midpoint(id)[0] - 4},${midpoint(id)[1] - 4} l8,8 m0,-8 l-8,8`}
                />
              </g>
            ) : (
              <path
                key={id}
                d={linkPath(id)}
                className={
                  id.startsWith("mesh")
                    ? "stroke-diagram-line-faint"
                    : "stroke-diagram-line"
                }
              />
            )
          )}
        </g>

        {view.flows.length > 0 && (
          <g
            key={runKey}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 5"
            className="pointer-events-none"
          >
            {view.flows.map((flow) => (
              <path
                key={flow.link}
                d={linkPath(flow.link, flow.reverse)}
                className={cn(FLOW, HUE_STROKE[flow.hue])}
                style={
                  flow.delay ? { animationDelay: `${flow.delay}ms` } : undefined
                }
              />
            ))}
          </g>
        )}

        {era === "web1" && (
          <g {...part("server")}>
            <rect
              x={SERVER.x}
              y={SERVER.y}
              width={SERVER.w}
              height={SERVER.h}
              rx={4}
              style={{ fill: fillFor("entity", serverState) }}
              className={anatomyStroke("entity", serverState)}
            />
            {[16, 30, 44].map((dy) => (
              <Slots key={dy} x={SERVER.x} y={SERVER.y + dy} w={SERVER.w} />
            ))}
            <g
              className={
                view.pageRemoved
                  ? "stroke-diagram-revert"
                  : "stroke-diagram-line"
              }
              strokeDasharray={view.pageRemoved ? "3 2" : undefined}
            >
              <path
                d={`M${PAGE.x},${PAGE.y} h${PAGE.w - 7} l7,7 V${PAGE.y + PAGE.h} H${PAGE.x} Z`}
                style={{ fill: anatomyFill("neutral", "top") }}
              />
              {!view.pageRemoved &&
                [12, 18, 24].map((dy) => (
                  <path
                    key={dy}
                    d={`M${PAGE.x + 5},${PAGE.y + dy} h${PAGE.w - 10}`}
                    className="stroke-diagram-line-faint"
                    strokeDasharray="none"
                  />
                ))}
            </g>
            {view.pageRemoved && (
              <path
                d={`M${PAGE.x + 7},${PAGE.y + 10} l10,10 m0,-10 l-10,10`}
                className="stroke-diagram-revert"
              />
            )}
          </g>
        )}

        {era === "web2" && (
          <>
            <g {...part("platform")}>
              {UNIT.ys.map((y) => (
                <g key={y}>
                  <rect
                    x={UNIT.x}
                    y={y}
                    width={UNIT.w}
                    height={UNIT.h}
                    rx={4}
                    style={{ fill: fillFor("entity", platformState) }}
                    className={anatomyStroke("entity", platformState)}
                  />
                  <Slots x={UNIT.x} y={y + UNIT.h / 2} w={UNIT.w} />
                </g>
              ))}
            </g>
            <g {...part("ads")}>
              <path
                d={`M${ADS.x - 4},${ADS.y} L${ADS.x + ADS.w / 2},${ADS.y - 18} L${ADS.x + ADS.w + 4},${ADS.y} Z`}
                style={{ fill: fillFor("gas", adsState) }}
                className={anatomyStroke("gas", adsState)}
              />
              <rect
                x={ADS.x}
                y={ADS.y}
                width={ADS.w}
                height={ADS.h}
                style={{ fill: fillFor("gas", adsState) }}
                className={anatomyStroke("gas", adsState)}
              />
              <rect
                x={ADS.x + ADS.w / 2 - 7}
                y={ADS.y + ADS.h - 20}
                width={14}
                height={20}
                style={{ fill: anatomyFill("neutral", "end") }}
                className="stroke-diagram-line"
              />
              {[10, ADS.w - 22].map((dx) => (
                <rect
                  key={dx}
                  x={ADS.x + dx}
                  y={ADS.y + 8}
                  width={12}
                  height={10}
                  style={{ fill: anatomyFill("neutral", "start") }}
                  className="stroke-diagram-line-faint"
                />
              ))}
            </g>
          </>
        )}

        {era === "web3" && (
          <g {...part("network")}>
            {NODES.slice(0, NODE_COUNT).map(([cx, cy], i) => (
              <g key={i}>
                <rect
                  x={cx - NODE.w / 2}
                  y={cy - NODE.h / 2}
                  width={NODE.w}
                  height={NODE.h}
                  rx={4}
                  style={{ fill: fillFor("entity", networkState) }}
                  className={anatomyStroke("entity", networkState)}
                />
                <Slots x={cx - NODE.w / 2} y={cy - 4} w={NODE.w} />
                <path
                  d={`M${cx - NODE.w / 2 + 8},${cy + 5} h${NODE.w - 16}`}
                  className="stroke-diagram-line-faint"
                />
              </g>
            ))}
          </g>
        )}

        <g {...part("users")}>
          {USER_X.map((x, i) => {
            const locked = lockedUser === i
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={USER_Y}
                  r={USER_R}
                  style={{
                    fill: anatomyFill(
                      "entity",
                      "top",
                      usersState === "rest" ? "rest" : usersState
                    ),
                  }}
                  className={
                    locked
                      ? "stroke-diagram-revert"
                      : anatomyStroke("entity", usersState)
                  }
                />
                <circle
                  cx={x}
                  cy={USER_Y - 5}
                  r={5}
                  style={{ fill: anatomyFill("entity", "end", "lit") }}
                  className="stroke-diagram-line"
                />
                <path
                  d={`M${x - 9},${USER_Y + 10} a9,7 0 0 1 18,0 Z`}
                  style={{ fill: anatomyFill("entity", "end", "lit") }}
                  className="stroke-diagram-line"
                />
              </g>
            )
          })}
        </g>

        {era === "web3" && (
          <g {...part("accounts")}>
            {USER_X.map((x, i) => {
              const kx = x + 22
              const ky = USER_Y + 8
              return (
                <g
                  key={i}
                  className={anatomyStroke("entity", accountsState)}
                  style={{
                    fill:
                      accountsState === "rest"
                        ? anatomyFill("neutral", "top")
                        : anatomyFill("entity", "end", accountsState),
                  }}
                >
                  <circle cx={kx} cy={ky} r={4.5} />
                  <path d={`M${kx + 4.5},${ky} h11 v4 m-4,-4 v3`} fill="none" />
                </g>
              )
            })}
          </g>
        )}
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={ERA_PARTS[era].map((id) => SPOTS[id])}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

export default memo(WebErasRig)
