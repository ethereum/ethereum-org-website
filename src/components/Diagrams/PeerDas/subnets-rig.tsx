import { memo, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
} from "../anatomy"
import { anatomyFill, anatomyStroke } from "../anatomy/tokens"
import { usePartState } from "../diagram-hover"

import {
  BLOB_ROWS,
  DRAWN_COLUMNS,
  NODE_IDS,
  type NodeId,
  SUBNETS_SIZE,
  type SubnetsPart,
  type SubnetsView,
} from "./model"

/*
 * Flat 2D drawing: the extended blob matrix at the bottom (rows = blobs,
 * columns = cells; original half, then extension), one subnet lane rising
 * from each drawn column, and three nodes at the top linked to the subnets
 * they follow.
 */

const { width: W, height: H } = SUBNETS_SIZE
const MAT_X0 = 96
const MAT_X1 = 460
const HALF_GAP = 8
const PITCH = (MAT_X1 - MAT_X0 - HALF_GAP) / DRAWN_COLUMNS
const CELL_W = PITCH - 3
const MAT_Y0 = 150
const ROW_PITCH = 18
const CELL_H = 15
const MAT_Y1 = MAT_Y0 + BLOB_ROWS * ROW_PITCH - (ROW_PITCH - CELL_H)
const PORT_Y = 120
const PORT_R = 2.5
const NODE_TOP = 30
const NODE_H = 32
const NODE_W = 96
const NODE_X: Record<NodeId, number> = { a: 152, b: 278, c: 404 }
const BRACKET_Y = MAT_Y1 + 6

const half = (d: number) => (d < DRAWN_COLUMNS / 2 ? "entity" : "gas")
const colX = (d: number) =>
  MAT_X0 + d * PITCH + (d >= DRAWN_COLUMNS / 2 ? HALF_GAP : 0)
const colCenter = (d: number) => colX(d) + CELL_W / 2
const r1 = (n: number) => Math.round(n * 10) / 10

// Paths run the way the data flows: up from the column to the node, or down when `down`.
const lanePath = (d: number, down = false) => {
  const x = r1(colCenter(d))
  const [from, to] = down
    ? [PORT_Y + PORT_R, MAT_Y0 - 2]
    : [MAT_Y0 - 2, PORT_Y + PORT_R]
  return `M${x},${from} V${to}`
}
const linkPath = (d: number, node: NodeId, down = false) => {
  const port = `${r1(colCenter(d))},${PORT_Y - PORT_R}`
  const end = `${NODE_X[node]},${NODE_TOP + NODE_H}`
  return down ? `M${end} L${port}` : `M${port} L${end}`
}

const halfEnd = (side: 0 | 1) =>
  side === 0
    ? [colX(0), colX(DRAWN_COLUMNS / 2 - 1) + CELL_W]
    : [colX(DRAWN_COLUMNS / 2), colX(DRAWN_COLUMNS - 1) + CELL_W]

const BRACKETS = (
  <g className="pointer-events-none">
    {([0, 1] as const).map((side) => {
      const [x0, x1] = halfEnd(side)
      return (
        <path
          key={side}
          d={`M${r1(x0)},${BRACKET_Y} v4 H${r1(x1)} v-4`}
          fill="none"
          className="stroke-diagram-line"
        />
      )
    })}
  </g>
)

const mid = (side: 0 | 1) => {
  const [x0, x1] = halfEnd(side)
  return (x0 + x1) / 2
}

const SPOTS: AnatomyLabelSpot[] = [
  ...NODE_IDS.map(
    (node): AnatomyLabelSpot => ({
      id: `node-${node}`,
      tone: "neutral",
      target: [NODE_X[node], NODE_TOP],
      anchor: [NODE_X[node], NODE_TOP - 4],
      placement: "above",
    })
  ),
  {
    id: "original-half",
    tone: "entity",
    target: [mid(0), BRACKET_Y + 4],
    anchor: [mid(0), BRACKET_Y + 9],
    placement: "below",
  },
  {
    id: "extension-half",
    tone: "gas",
    target: [mid(1), BRACKET_Y + 4],
    anchor: [mid(1), BRACKET_Y + 9],
    placement: "below",
  },
  {
    id: "subnet",
    tone: "neutral",
    target: [colCenter(0) - 2, 136],
    anchor: [MAT_X0 - 3, 136],
    placement: "start",
  },
  {
    id: "blob",
    tone: "neutral",
    target: [MAT_X0 - 4, MAT_Y0 + 2 * ROW_PITCH + CELL_H / 2],
    anchor: [MAT_X0 - 10, MAT_Y0 + 2 * ROW_PITCH + CELL_H / 2],
    placement: "start",
  },
]

const POP =
  "origin-center animate-diagram-pop [transform-box:fill-box] [animation-delay:600ms] motion-reduce:animate-none"
const GHOST_OUT = "diagram-pop 300ms ease-in 700ms reverse both"
const FLOW =
  "animate-diagram-flow motion-reduce:animate-none [stroke-width:1.4]"

interface SubnetsRigProps {
  view: SubnetsView
  runKey: string
  labels: Record<SubnetsPart, ReactNode>
  definitions: Record<SubnetsPart, ReactNode>
  className?: string
}

function SubnetsRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: SubnetsRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: SubnetsPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const { linkNode } = view
  const linked = new Set(view.links)
  const rebuild = view.motion === "rebuild"
  const hueStroke = (d: number) =>
    half(d) === "entity" ? "stroke-diagram-entity" : "stroke-diagram-gas"

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        {linkNode && (
          <g className="pointer-events-none">
            {view.links.map((d) => (
              <path
                key={d}
                d={linkPath(d, linkNode)}
                fill="none"
                className="stroke-diagram-line"
              />
            ))}
          </g>
        )}

        <g {...part("subnet")}>
          {Array.from({ length: DRAWN_COLUMNS }, (_, d) => (
            <g key={d}>
              <path
                d={lanePath(d)}
                fill="none"
                className={
                  state("subnet") === "hover"
                    ? "stroke-diagram-line-strong"
                    : linked.has(d)
                      ? hueStroke(d)
                      : "stroke-diagram-line"
                }
              />
              <circle
                cx={colCenter(d)}
                cy={PORT_Y}
                r={PORT_R}
                style={{
                  fill: linked.has(d)
                    ? anatomyFill(half(d), "end", "lit")
                    : anatomyFill("neutral", "top"),
                }}
                className={
                  state("subnet") === "hover"
                    ? "stroke-diagram-line-strong"
                    : linked.has(d)
                      ? hueStroke(d)
                      : "stroke-diagram-line"
                }
              />
            </g>
          ))}
        </g>

        {linkNode && view.flows.length > 0 && (
          <g key={runKey} fill="none" strokeLinecap="round">
            {view.flows.map((d) => (
              <g key={d} strokeDasharray="4 5" className={hueStroke(d)}>
                <path
                  d={lanePath(d, rebuild)}
                  className={FLOW}
                  style={rebuild ? { animationDelay: "500ms" } : undefined}
                />
                <path
                  d={linkPath(d, linkNode, rebuild)}
                  className={FLOW}
                  style={rebuild ? undefined : { animationDelay: "500ms" }}
                />
              </g>
            ))}
          </g>
        )}

        {NODE_IDS.map((node) => {
          const id = `node-${node}` as const
          const x = NODE_X[node] - NODE_W / 2
          const nodeState = state(id)
          return (
            <g key={node} {...part(id)}>
              <rect
                x={x}
                y={NODE_TOP}
                width={NODE_W}
                height={NODE_H}
                rx={4}
                style={{ fill: anatomyFill("neutral", "top") }}
                className={anatomyStroke("neutral", nodeState)}
              />
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${x + 10},${NODE_TOP + 9 + i * 7} h${NODE_W - 34}`}
                  className="stroke-diagram-line-faint"
                />
              ))}
              <circle
                cx={x + NODE_W - 12}
                cy={NODE_TOP + NODE_H / 2}
                r={3}
                style={{
                  fill:
                    nodeState === "rest"
                      ? anatomyFill("neutral", "end")
                      : anatomyFill("entity", "end", "lit"),
                }}
                className={
                  nodeState === "rest"
                    ? "stroke-diagram-line"
                    : "stroke-diagram-entity"
                }
              />
            </g>
          )
        })}

        {view.columns.map((column, d) => {
          const hue = half(d)
          const area = hue === "entity" ? "original-half" : "extension-half"
          const partState = state(area)
          const fill = anatomyFill(
            hue,
            column.role === "none" ? "top" : "end",
            column.role === "none" ? partState : "lit"
          )
          return (
            <g key={d} {...part(area)}>
              {column.rebuilt && (
                // The missing column's outline, gone once it is rebuilt.
                <rect
                  key={runKey}
                  x={colX(d) - 1.5}
                  y={MAT_Y0 - 1.5}
                  width={CELL_W + 3}
                  height={MAT_Y1 - MAT_Y0 + 3}
                  rx={2}
                  strokeDasharray="2 2"
                  style={{ fill: "transparent", animation: GHOST_OUT }}
                  className="origin-center stroke-diagram-line [transform-box:fill-box] motion-reduce:hidden"
                />
              )}
              <g
                key={column.rebuilt ? runKey : "cells"}
                className={column.rebuilt ? POP : undefined}
              >
                {Array.from({ length: BLOB_ROWS }, (_, row) => (
                  <rect
                    key={row}
                    x={colX(d)}
                    y={MAT_Y0 + row * ROW_PITCH}
                    width={CELL_W}
                    height={CELL_H}
                    rx={1.5}
                    style={{
                      fill: column.rebuilt
                        ? anatomyFill(hue, "start", "lit")
                        : fill,
                    }}
                    className={
                      partState === "hover"
                        ? "stroke-diagram-line-strong"
                        : column.rebuilt
                          ? hueStroke(d)
                          : "stroke-diagram-line-faint"
                    }
                  />
                ))}
              </g>
              {column.role !== "none" && (
                <rect
                  x={colX(d) - 1.5}
                  y={MAT_Y0 - 1.5}
                  width={CELL_W + 3}
                  height={MAT_Y1 - MAT_Y0 + 3}
                  rx={2}
                  strokeDasharray={
                    column.role === "sampled" ? "3 2" : undefined
                  }
                  style={{ fill: "transparent" }}
                  className="pointer-events-none stroke-diagram-line-strong"
                />
              )}
            </g>
          )
        })}

        <g {...part("blob")}>
          <path
            d={`M${MAT_X0 - 4},${MAT_Y0} V${MAT_Y1}`}
            className="stroke-diagram-line"
          />
        </g>
        {BRACKETS}
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

export default memo(SubnetsRig)
