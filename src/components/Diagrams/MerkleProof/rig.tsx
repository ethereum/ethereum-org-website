import { memo, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  type AnatomyHue,
  AnatomyLabels,
  type AnatomyLabelSpot,
  type AnatomyState,
  anatomyStroke,
  DIAGRAM_COLOR,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  LEAVES,
  MERKLE_PROOF_SIZE,
  type MerkleNodeRole,
  type MerkleProofPart,
  type MerkleProofPresetData,
  type MerkleProofView,
  nodeName,
  PROOF_SIZE,
} from "./model"

/*
 * Flat drawing of the article's tree, root at the top and the eight values at
 * the bottom, with the stored root beside the computed one. Node names are
 * HTML over the SVG, so they never mirror in RTL.
 */

const { width: W, height: H } = MERKLE_PROOF_SIZE
const pct = (value: number, of: number) => `${(value / of) * 100}%`

type Rect = { x: number; y: number; w: number; h: number }

// Index by tree level: 0 = leaves, PROOF_SIZE = root.
const ROW_Y = [232, 166, 100, 30]
const ROW_H = [26, 26, 26, 28]
const ROW_W = [36, 78, 84, 84]

const nodeRect = (level: number, index: number): Rect => {
  const count = LEAVES / 2 ** level
  const cx = ((index + 0.5) * W) / count
  return {
    x: cx - ROW_W[level] / 2,
    y: ROW_Y[level],
    w: ROW_W[level],
    h: ROW_H[level],
  }
}

const NODES = Array.from({ length: PROOF_SIZE + 1 }, (_, level) =>
  Array.from({ length: LEAVES / 2 ** level }, (_, i) => nodeRect(level, i))
)
const ROOT = NODES[PROOF_SIZE][0]
// Wide enough for "merkleRoot" at 14px on a 390px screen.
const STORED: Rect = { x: 342, y: ROOT.y, w: 112, h: ROOT.h }
const COMPARE_Y = ROOT.y + ROOT.h / 2
const COMPARE_LINK = `M${ROOT.x + ROOT.w},${COMPARE_Y} L${STORED.x},${COMPARE_Y}`
const COMPARE_MID = (ROOT.x + ROOT.w + STORED.x) / 2

/** Child to parent, so the flow runs upward as the hashes are combined. */
const EDGES = NODES.slice(0, PROOF_SIZE).flatMap((row, level) =>
  row.map((child, i) => {
    const parent = NODES[level + 1][Math.floor(i / 2)]
    const px = parent.x + parent.w * (i % 2 ? 0.7 : 0.3)
    return {
      level,
      index: i,
      d: `M${child.x + child.w / 2},${child.y} L${px},${parent.y + parent.h}`,
    }
  })
)

const bottomOf = (r: Rect): [number, number] => [r.x + r.w / 2, r.y + r.h]
const topOf = (r: Rect): [number, number] => [r.x + r.w / 2, r.y]

const spotsFor = (leaf: number): AnatomyLabelSpot[] => {
  const value = NODES[0][leaf]
  const sibling = NODES[0][leaf % 2 ? leaf - 1 : leaf + 1]
  return [
    {
      id: "value",
      tone: "entity",
      target: bottomOf(value),
      anchor: [bottomOf(value)[0], value.y + value.h + 10],
      placement: "below",
    },
    {
      id: "path",
      tone: "entity",
      target: topOf(ROOT),
      anchor: [topOf(ROOT)[0], ROOT.y - 8],
      placement: "above",
    },
    {
      id: "root",
      tone: "entity",
      target: topOf(STORED),
      anchor: [topOf(STORED)[0], STORED.y - 8],
      placement: "above",
    },
    {
      id: "proof",
      tone: "gas",
      target: bottomOf(sibling),
      anchor: [bottomOf(sibling)[0], sibling.y + sibling.h + 10],
      placement: "below",
    },
  ]
}
const SPOTS = Array.from({ length: LEAVES }, (_, leaf) => spotsFor(leaf))

const REVERT_FILL = `color-mix(in oklab, hsla(var(--diagram-revert, 0, 70%, 42%)) 18%, ${DIAGRAM_COLOR.bg})`

const PART_DIM = (dimmed: boolean) => ({
  className: ISO_DIM_CLASS,
  style: { opacity: dimmed ? 0.7 : 1 },
})

type Paint = { hue: AnatomyHue; state: AnatomyState } | "revert"

function Node({ r, paint }: { r: Rect; paint: Paint }) {
  const revert = paint === "revert"
  return (
    <rect
      x={r.x}
      y={r.y}
      width={r.w}
      height={r.h}
      rx={4}
      className={cn(
        "transition-[fill,stroke] duration-500 motion-reduce:transition-none",
        revert ? "stroke-diagram-revert" : anatomyStroke(paint.hue, paint.state)
      )}
      style={{
        fill: revert
          ? REVERT_FILL
          : anatomyFill(
              paint.hue,
              paint.hue === "neutral" ? "top" : "start",
              paint.state
            ),
      }}
    />
  )
}

function Edge({
  d,
  reached,
  flowing,
  flowKey,
  failed,
}: {
  d: string
  reached: boolean
  flowing: boolean
  flowKey: string
  failed: boolean
}) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} className="stroke-diagram-line" />
      {reached && (
        // A non-scaling stroke's dash doesn't grow with the drawing: a dash
        // twice the path (`pathLength` 24) still covers it at up to 2x scale.
        <path
          key={flowing ? flowKey : undefined}
          d={d}
          pathLength={24}
          strokeDasharray="48 48"
          className={cn(
            "[stroke-width:1.4]",
            failed ? "stroke-diagram-revert" : "stroke-diagram-entity",
            flowing && "animate-diagram-flow motion-reduce:animate-none"
          )}
        />
      )}
    </g>
  )
}

/** Node name: notation from the article, never translated, always LTR. */
function NodeText({
  r,
  children,
  muted,
}: {
  r: Rect
  children: ReactNode
  muted?: boolean
}) {
  return (
    <span
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 text-sm leading-none whitespace-nowrap rtl:translate-x-1/2",
        muted ? "text-body-medium" : "text-body"
      )}
      style={{
        insetInlineStart: pct(r.x + r.w / 2, W),
        top: pct(r.y + r.h / 2, H),
      }}
    >
      <bdi dir="ltr">{children}</bdi>
    </span>
  )
}

interface MerkleProofRigProps {
  view: MerkleProofView
  data: MerkleProofPresetData
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<MerkleProofPart, ReactNode>
  definitions: Record<MerkleProofPart, ReactNode>
  className?: string
}

function MerkleProofRig({
  view,
  data,
  runKey,
  labels,
  definitions,
  className,
}: MerkleProofRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const started = view.step >= 1
  const failed = view.result === "mismatch"
  const part = (name: MerkleProofPart) => ({
    "data-part": name,
    ...PART_DIM(dimmed(name)),
  })

  const isActive = (role: MerkleNodeRole, level: number) =>
    started &&
    (role === "value" ||
      role === "proof" ||
      (role === "path" && level <= view.computed))

  const paintOf = (role: MerkleNodeRole, level: number): Paint => {
    if (role === "other" || !isActive(role, level))
      return { hue: "neutral", state: "rest" }
    if (role === "proof") return { hue: "gas", state: state("proof") }
    if (failed) return "revert"
    return { hue: "entity", state: state(role as MerkleProofPart) }
  }

  const rootPaint: Paint = view.result
    ? failed
      ? "revert"
      : { hue: "entity", state: state("root") }
    : {
        hue: "neutral",
        state: state("root") === "hover" ? "hover" : "rest",
      }

  const byRole = (role: MerkleNodeRole) =>
    NODES.flatMap((row, level) =>
      row.flatMap((r, i) =>
        data.roles[level][i] === role ? [{ r, level, i }] : []
      )
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
        {EDGES.map(({ level, index, d }) => {
          const parentLevel = level + 1
          const onPath =
            data.roles[parentLevel][Math.floor(index / 2)] === "path"
          return (
            <Edge
              key={d}
              d={d}
              reached={started && onPath && parentLevel <= view.computed}
              flowing={
                onPath &&
                parentLevel === view.computed &&
                view.motion === `level${parentLevel}`
              }
              flowKey={runKey}
              failed={failed}
            />
          )
        })}

        <path
          d={COMPARE_LINK}
          strokeDasharray="3 3"
          className={cn(
            view.result === null
              ? "stroke-diagram-line"
              : failed
                ? "stroke-diagram-revert"
                : "stroke-diagram-entity"
          )}
        />

        {byRole("other").map(({ r, level, i }) => (
          <Node key={`${level}-${i}`} r={r} paint={paintOf("other", level)} />
        ))}
        <g {...part("proof")}>
          {byRole("proof").map(({ r, level, i }) => (
            <Node key={`${level}-${i}`} r={r} paint={paintOf("proof", level)} />
          ))}
        </g>
        <g {...part("path")}>
          {byRole("path").map(({ r, level, i }) => (
            <Node key={`${level}-${i}`} r={r} paint={paintOf("path", level)} />
          ))}
        </g>
        <g {...part("value")}>
          {byRole("value").map(({ r, level, i }) => (
            <Node key={`${level}-${i}`} r={r} paint={paintOf("value", level)} />
          ))}
        </g>
        <g {...part("root")}>
          <Node r={STORED} paint={rootPaint} />
        </g>
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {NODES.map((row, level) =>
          row.map((r, i) => {
            const role = data.roles[level][i]
            return (
              <NodeText
                key={`${level}-${i}`}
                r={r}
                muted={!isActive(role, level)}
              >
                {role === "value" ? data.leafName : nodeName(level, i)}
              </NodeText>
            )
          })
        )}
        {/* The contract's state variable: code. */}
        <NodeText r={STORED} muted={!view.result}>
          merkleRoot
        </NodeText>
        {view.result && (
          <span
            key={runKey}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 animate-diagram-pop rounded-base border bg-background px-1.5 text-sm leading-tight font-bold motion-reduce:animate-none rtl:translate-x-1/2",
              failed
                ? "border-diagram-revert text-diagram-revert"
                : "border-diagram-entity text-diagram-entity"
            )}
            style={{
              insetInlineStart: pct(COMPARE_MID, W),
              top: pct(COMPARE_Y, H),
            }}
          >
            {failed ? "≠" : "="}
          </span>
        )}
      </div>

      <AnatomyLabels
        width={W}
        height={H}
        spots={SPOTS[data.leaf]}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(MerkleProofRig)
