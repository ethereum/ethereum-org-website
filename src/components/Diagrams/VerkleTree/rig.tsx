import { memo, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  type AnatomyHue,
  AnatomyLabels,
  type AnatomyLabelSpot,
  type AnatomyState,
  anatomyStroke,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  MERKLE_LEVELS,
  MERKLE_NIBBLES,
  MERKLE_WIDTH,
  VERKLE_TREE_SIZE,
  type VerkleTreePart,
  type VerkleTreeView,
} from "./model"

/*
 * Flat drawing of a key lookup, top to bottom. Verkle: four bands, the stem
 * tree (root and inner nodes), the stem's extension node, the suffix tree
 * (C1 and C2 over the suffix slots) and the data (value_lower and
 * value_upper). Merkle: seven hexary branch nodes, each a row of 16 child
 * slots, then the value. Server-rendered with the player.
 */

const { width: W, height: H } = VERKLE_TREE_SIZE
const pct = (value: number, of: number) => `${(value / of) * 100}%`

type Rect = { x: number; y: number; w: number; h: number }
type Pt = [number, number]

const mid = (r: Rect): Pt => [r.x + r.w / 2, r.y + r.h / 2]
const top = (r: Rect): Pt => [r.x + r.w / 2, r.y]
const bottom = (r: Rect, at = 0.5): Pt => [r.x + r.w * at, r.y + r.h]
const startOf = (r: Rect): Pt => [r.x, r.y + r.h / 2]
const seg = ([x1, y1]: Pt, [x2, y2]: Pt) => `M${x1},${y1} L${x2},${y2}`

/* ---------- Verkle geometry ---------- */

const DIVIDERS = [120, 185, 290]

const ROOT: Rect = { x: 220, y: 14, w: 100, h: 26 }
const CHILDREN: Rect[] = [130, 235, 340].map((x) => ({
  x,
  y: 80,
  w: 70,
  h: 26,
}))
const INNER = CHILDREN[1]
const EXTENSION: Rect = { x: 180, y: 138, w: 180, h: 30 }
const C1: Rect = { x: 151, y: 200, w: 50, h: 22 }
const C2: Rect = { x: 297, y: 200, w: 50, h: 22 }
const SLOT_W = 36
const slots = (x0: number): Rect[] =>
  [0, 1, 2].map((i) => ({ x: x0 + i * (SLOT_W + 6), y: 252, w: SLOT_W, h: 20 }))
const C1_SLOTS = slots(116)
const C2_SLOTS = slots(262)
const SLOT = C1_SLOTS[1]
const VALUE_LOWER: Rect = { x: 112, y: 306, w: 128, h: 26 }
const VALUE_UPPER: Rect = { x: 250, y: 306, w: 128, h: 26 }

const VERKLE_EDGES = {
  siblings: CHILDREN.filter((c) => c !== INNER).map((c) =>
    seg(bottom(ROOT), top(c))
  ),
  inner: seg(bottom(ROOT), top(INNER)),
  extension: seg(bottom(INNER), top(EXTENSION)),
  c1: seg(bottom(EXTENSION, 0.28), top(C1)),
  c2: seg(bottom(EXTENSION, 0.72), top(C2)),
  c1Slots: C1_SLOTS.filter((s) => s !== SLOT).map((s) =>
    seg(bottom(C1), top(s))
  ),
  c2Slots: C2_SLOTS.map((s) => seg(bottom(C2), top(s))),
  slot: seg(bottom(C1), top(SLOT)),
  lower: seg(bottom(SLOT, 0.25), top(VALUE_LOWER)),
  upper: seg(bottom(SLOT, 0.75), top(VALUE_UPPER)),
}

const VERKLE_SPOTS: AnatomyLabelSpot[] = [
  {
    id: "stem",
    tone: "entity",
    target: startOf(CHILDREN[0]),
    anchor: [CHILDREN[0].x - 8, mid(CHILDREN[0])[1]],
    placement: "start",
  },
  {
    id: "extension",
    tone: "entity",
    target: startOf(EXTENSION),
    anchor: [EXTENSION.x - 8, mid(EXTENSION)[1]],
    placement: "start",
  },
  {
    id: "suffix",
    tone: "entity",
    target: startOf(C1),
    anchor: [C1.x - 8, mid(C1)[1]],
    placement: "start",
  },
  {
    id: "data",
    tone: "entity",
    target: startOf(VALUE_LOWER),
    anchor: [VALUE_LOWER.x - 8, mid(VALUE_LOWER)[1]],
    placement: "start",
  },
]

/* ---------- Merkle geometry ---------- */

const CELL = 14
const BAR_X = 275 - (MERKLE_WIDTH * CELL) / 2
const BARS: Rect[] = Array.from({ length: MERKLE_LEVELS }, (_, i) => ({
  x: BAR_X,
  y: 10 + i * 40,
  w: MERKLE_WIDTH * CELL,
  h: 16,
}))
const cellAt = (bar: Rect, i: number): Rect => ({
  x: bar.x + i * CELL,
  y: bar.y,
  w: CELL,
  h: bar.h,
})
const PATH_CELLS = BARS.map((bar, i) => cellAt(bar, MERKLE_NIBBLES[i]))
const SIBLING_CELLS = BARS.flatMap((bar, level) =>
  Array.from({ length: MERKLE_WIDTH }, (_, i) => i)
    .filter((i) => i !== MERKLE_NIBBLES[level])
    .map((i) => cellAt(bar, i))
)
const MERKLE_VALUE: Rect = { x: 215, y: 306, w: 120, h: 26 }
const MERKLE_EDGES = PATH_CELLS.map((cell, i) =>
  seg(bottom(cell), top(BARS[i + 1] ?? MERKLE_VALUE))
)
// Cell boundaries inside each bar.
const BAR_SEAMS = BARS.map((bar) =>
  Array.from(
    { length: MERKLE_WIDTH - 1 },
    (_, i) =>
      `M${bar.x + (i + 1) * CELL},${bar.y} L${bar.x + (i + 1) * CELL},${bar.y + bar.h}`
  ).join(" ")
).join(" ")

const MERKLE_SPOTS: AnatomyLabelSpot[] = [
  {
    id: "trie",
    tone: "entity",
    target: startOf(BARS[1]),
    anchor: [BAR_X - 8, mid(BARS[1])[1]],
    placement: "start",
  },
  {
    id: "siblings",
    tone: "gas",
    target: startOf(BARS[4]),
    anchor: [BAR_X - 8, mid(BARS[4])[1]],
    placement: "start",
  },
  {
    id: "data",
    tone: "entity",
    target: startOf(MERKLE_VALUE),
    anchor: [MERKLE_VALUE.x - 8, mid(MERKLE_VALUE)[1]],
    placement: "start",
  },
]

/* ---------- Pieces ---------- */

const PART_DIM = (dimmed: boolean) => ({
  className: ISO_DIM_CLASS,
  style: { opacity: dimmed ? 0.7 : 1 },
})

/** A node: neutral until the lookup reaches it, then its role colour. */
function Node({
  r,
  hue,
  state,
  dashed,
  rx = 3,
}: {
  r: Rect
  hue: AnatomyHue
  state: AnatomyState
  dashed?: boolean
  rx?: number
}) {
  return (
    <rect
      x={r.x}
      y={r.y}
      width={r.w}
      height={r.h}
      rx={rx}
      strokeDasharray={dashed ? "3 3" : undefined}
      className={cn(
        "transition-[fill,stroke] duration-500 motion-reduce:transition-none",
        anatomyStroke(hue, state)
      )}
      style={{
        fill: anatomyFill(hue, hue === "neutral" ? "top" : "start", state),
      }}
    />
  )
}

/**
 * A link: faint at rest, blue once the lookup has passed. On the step that
 * reaches it, the blue draws in from parent to child (shown whole under
 * reduced motion).
 */
function Edge({
  d,
  reached,
  flowing,
  flowKey,
  flowDelay,
}: {
  d: string
  reached?: boolean
  flowing?: boolean
  flowKey?: string
  flowDelay?: number
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
            "stroke-diagram-entity [stroke-width:1.4]",
            flowing && "animate-diagram-flow motion-reduce:animate-none"
          )}
          style={
            flowing && flowDelay
              ? { animationDelay: `${flowDelay}ms` }
              : undefined
          }
        />
      )}
    </g>
  )
}

/** Text inside a node: HTML, so it reads the right way round in RTL. */
function NodeText({
  r,
  children,
  code,
}: {
  r: Rect
  children: ReactNode
  /** Notation (C1, value_lower): stays left to right in RTL. */
  code?: boolean
}) {
  const [x, y] = mid(r)
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 text-sm leading-none whitespace-nowrap text-body rtl:translate-x-1/2"
      style={{ insetInlineStart: pct(x, W), top: pct(y, H) }}
    >
      {code ? <bdi dir="ltr">{children}</bdi> : children}
    </span>
  )
}

/* ---------- Rig ---------- */

interface VerkleTreeRigProps {
  view: VerkleTreeView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Partial<Record<VerkleTreePart, ReactNode>>
  definitions: Partial<Record<VerkleTreePart, ReactNode>>
  /** In-node text that is translated: the root and the Merkle value. */
  rootText: string
  valueText: string
  /** The opening proof's tag (Verkle only). */
  proofText: string
  /** "0–127" and "128–255", already formatted. */
  rangeText: [string, string]
  className?: string
}

function VerkleTreeRig({
  view,
  runKey,
  labels,
  definitions,
  rootText,
  valueText,
  proofText,
  rangeText,
  className,
}: VerkleTreeRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const verkle = view.tree === "verkle"
  const s = view.step
  const part = (name: VerkleTreePart) => ({
    "data-part": name,
    ...PART_DIM(dimmed(name)),
  })
  // A node on the path: neutral, then blue once reached, orange when the proof carries it.
  const pathNode = (
    owner: VerkleTreePart,
    reached: boolean,
    inProof = false
  ): { hue: AnatomyHue; state: AnatomyState } => {
    const hovered = state(owner) === "hover"
    if (inProof && view.proof)
      return { hue: "gas", state: hovered ? "hover" : "lit" }
    if (!reached) return { hue: "neutral", state: state(owner) }
    return { hue: "entity", state: state(owner) }
  }
  const off = (owner: VerkleTreePart) => ({
    hue: "neutral" as const,
    state: state(owner) === "hover" ? ("hover" as const) : ("rest" as const),
  })

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        {verkle ? (
          <>
            <g className="stroke-diagram-line-faint" strokeDasharray="2 4">
              {DIVIDERS.map((y) => (
                <path key={y} d={`M0,${y} L${W},${y}`} />
              ))}
            </g>

            <g {...part("stem")}>
              {VERKLE_EDGES.siblings.map((d) => (
                <Edge key={d} d={d} />
              ))}
              <Edge
                d={VERKLE_EDGES.inner}
                reached={s >= 1}
                flowing={s === 1}
                flowKey={runKey}
              />
              <Node r={ROOT} {...pathNode("stem", s >= 1)} />
              {CHILDREN.map((child) =>
                child === INNER ? (
                  <Node
                    key={child.x}
                    r={child}
                    {...pathNode("stem", s >= 1, true)}
                  />
                ) : (
                  <Node key={child.x} r={child} {...off("stem")} dashed />
                )
              )}
            </g>

            <g {...part("extension")}>
              <Edge
                d={VERKLE_EDGES.extension}
                reached={s >= 2}
                flowing={s === 2}
                flowKey={runKey}
              />
              <Node r={EXTENSION} {...pathNode("extension", s >= 2, true)} />
            </g>

            <g {...part("suffix")}>
              <Edge
                d={VERKLE_EDGES.c1}
                reached={s >= 3}
                flowing={s === 3}
                flowKey={runKey}
              />
              <Edge d={VERKLE_EDGES.c2} />
              {[...VERKLE_EDGES.c1Slots, ...VERKLE_EDGES.c2Slots].map((d) => (
                <Edge key={d} d={d} />
              ))}
              <Edge
                d={VERKLE_EDGES.slot}
                reached={s >= 3}
                flowing={s === 3}
                flowKey={runKey}
                flowDelay={500}
              />
              <Node r={C1} {...pathNode("suffix", s >= 3, true)} />
              <Node r={C2} {...off("suffix")} />
              {[...C1_SLOTS, ...C2_SLOTS].map((slot) =>
                slot === SLOT ? null : (
                  <Node
                    key={slot.x}
                    r={slot}
                    {...off("suffix")}
                    dashed
                    rx={2}
                  />
                )
              )}
              <Node r={SLOT} {...pathNode("suffix", s >= 3)} rx={2} />
              <path
                d={`M${SLOT.x + SLOT.w / 2},${SLOT.y} L${SLOT.x + SLOT.w / 2},${SLOT.y + SLOT.h}`}
                className="stroke-diagram-line"
              />
            </g>

            <g {...part("data")}>
              <Edge
                d={VERKLE_EDGES.lower}
                reached={s >= 4}
                flowing={s === 4}
                flowKey={runKey}
              />
              <Edge
                d={VERKLE_EDGES.upper}
                reached={s >= 4}
                flowing={s === 4}
                flowKey={runKey}
              />
              <Node r={VALUE_LOWER} {...pathNode("data", s >= 4)} />
              <Node r={VALUE_UPPER} {...pathNode("data", s >= 4)} />
            </g>
          </>
        ) : (
          <>
            <g className="stroke-diagram-line-faint" strokeDasharray="2 4">
              <path d={`M0,${DIVIDERS[2]} L${W},${DIVIDERS[2]}`} />
            </g>

            <g {...part("trie")}>
              {MERKLE_EDGES.map((d, i) => (
                <Edge
                  key={d}
                  d={d}
                  reached={i < MERKLE_EDGES.length - 1 ? s >= 1 : s >= 2}
                  flowing={i < MERKLE_EDGES.length - 1 ? s === 1 : s === 2}
                  flowKey={runKey}
                  flowDelay={i < MERKLE_EDGES.length - 1 ? i * 120 : 0}
                />
              ))}
              {BARS.map((bar) => (
                <Node key={bar.y} r={bar} {...off("trie")} rx={2} />
              ))}
              {PATH_CELLS.map((cell) => (
                <Node
                  key={cell.y}
                  r={cell}
                  {...pathNode("trie", s >= 1)}
                  rx={0}
                />
              ))}
            </g>

            <g {...part("siblings")}>
              {SIBLING_CELLS.map((cell) => (
                <rect
                  key={`${cell.x}-${cell.y}`}
                  x={cell.x}
                  y={cell.y}
                  width={cell.w}
                  height={cell.h}
                  stroke="none"
                  className="transition-[fill] duration-500 motion-reduce:transition-none"
                  style={{
                    fill: view.proof
                      ? anatomyFill("gas", "start", state("siblings"))
                      : "transparent",
                  }}
                />
              ))}
              <path d={BAR_SEAMS} className="stroke-diagram-line-faint" />
            </g>

            <g {...part("data")}>
              <Node r={MERKLE_VALUE} {...pathNode("data", s >= 2)} />
            </g>
          </>
        )}
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {verkle ? (
          <>
            <NodeText r={ROOT}>{rootText}</NodeText>
            {/* Notation from EIP-6800: code, never translated. */}
            <NodeText r={EXTENSION} code>
              (1, stem, C1, C2)
            </NodeText>
            <NodeText r={C1} code>
              C1
            </NodeText>
            <NodeText r={C2} code>
              C2
            </NodeText>
            <span
              className="absolute -translate-y-1/2 text-sm leading-none whitespace-nowrap text-body-medium"
              style={{
                insetInlineStart: pct(C1.x + C1.w + 6, W),
                top: pct(mid(C1)[1], H),
              }}
            >
              {rangeText[0]}
            </span>
            <span
              className="absolute -translate-y-1/2 text-sm leading-none whitespace-nowrap text-body-medium"
              style={{
                insetInlineStart: pct(C2.x + C2.w + 6, W),
                top: pct(mid(C2)[1], H),
              }}
            >
              {rangeText[1]}
            </span>
            <NodeText r={VALUE_LOWER} code>
              value_lower
            </NodeText>
            <NodeText r={VALUE_UPPER} code>
              value_upper
            </NodeText>
          </>
        ) : (
          <NodeText r={MERKLE_VALUE}>{valueText}</NodeText>
        )}
      </div>

      {verkle && view.proof && (
        <span
          data-part="proof"
          className={cn(
            "absolute -translate-y-1/2 animate-diagram-pop rounded-base border px-2 py-0.5 text-sm font-bold whitespace-nowrap motion-reduce:animate-none",
            state("proof") === "hover"
              ? "border-diagram-line-strong"
              : "border-diagram-gas",
            "text-diagram-gas"
          )}
          style={{
            insetInlineStart: pct(8, W),
            top: pct(mid(ROOT)[1], H),
            background: anatomyFill("gas", "start", "lit"),
            ...PART_DIM(dimmed("proof")).style,
          }}
        >
          {proofText}
        </span>
      )}

      <AnatomyLabels
        width={W}
        height={H}
        spots={verkle ? VERKLE_SPOTS : MERKLE_SPOTS}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(VerkleTreeRig)
