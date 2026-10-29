import { memo, type ReactNode } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  type AnatomyState,
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
  r1,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  BLOCK_STATE_SIZE,
  BLOCK_STATE_TXS,
  type BlockStatePart,
  type BlockStateView,
} from "./model"

/*
 * Isometric drawing for "Applying a block", on the shared anatomy
 * primitives. Server-rendered with the player.
 *
 * A sibling of TxApply: the same world-state plate, accounts and value
 * pipes, but here three accounts sit in a row (Alice, Bob, a contract) and
 * the block stands off the plate, behind it: a stack of three transaction
 * slabs in block order, the first on top. Each step lights the slab being
 * applied; applied slabs turn neutral, and a reverted one keeps a revert
 * outline (it stays in the block).
 */

const { width: W, height: H } = BLOCK_STATE_SIZE
const PROJECTION = isoProjection(170, 74)
const { P, path, box, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "block-state-shadow"

/* ---------- Geometry ---------- */

const PLATE = box(0, 0, -8, 320, 96, 8)

const ACCOUNT_Y = 28
const ACCOUNT_SIZE = 44
const ACCOUNT_H = 40
const ACCOUNT_X = { alice: 16, bob: 138, contract: 260 } as const
const accountBox = (x: number) =>
  box(x, ACCOUNT_Y, 0, ACCOUNT_SIZE, ACCOUNT_SIZE, ACCOUNT_H)
const ALICE = accountBox(ACCOUNT_X.alice)
const BOB = accountBox(ACCOUNT_X.bob)
const CONTRACT = accountBox(ACCOUNT_X.contract)

// Value pipes along the middle of the row, from each account's end face to
// the next one's hidden face (so the next solid covers the pipe's end).
const PIPE_Y = 50
const PIPE_Z = 14
const ALICE_END = ACCOUNT_X.alice + ACCOUNT_SIZE
const BOB_END = ACCOUNT_X.bob + ACCOUNT_SIZE
const PIPE_AB = path(PIPE_Z, [ALICE_END, PIPE_Y], [ACCOUNT_X.bob, PIPE_Y])
// The same pipe, run the other way, for value flowing from Bob to Alice.
const PIPE_BA = path(PIPE_Z, [ACCOUNT_X.bob, PIPE_Y], [ALICE_END, PIPE_Y])
const PIPE_BC = path(PIPE_Z, [BOB_END, PIPE_Y], [ACCOUNT_X.contract, PIPE_Y])

// The block: a plinth on the ground behind the plate, with one slab per
// transaction stacked on it, the first transaction on top.
const BLOCK_X = 112
const BLOCK_Y = -104
const BLOCK_W = 52
const BLOCK_D = 44
const PLINTH = box(BLOCK_X, BLOCK_Y, -8, BLOCK_W, BLOCK_D, 6)
const SLAB_H = 8
const slabZ = (index: number) =>
  -2 + SLAB_H * (BLOCK_STATE_TXS.length - 1 - index)
const SLABS = BLOCK_STATE_TXS.map((_, i) =>
  box(BLOCK_X + 3, BLOCK_Y + 3, slabZ(i), BLOCK_W - 6, BLOCK_D - 6, SLAB_H)
)
const SLAB_ORDER = SLABS.map((_, i) => i).reverse()
const BLOCK_TOP = slabZ(0) + SLAB_H

// The revert tag sits on the contract's top face.
const REVERTED_AT = P(
  ACCOUNT_X.contract + ACCOUNT_SIZE / 2,
  ACCOUNT_Y + ACCOUNT_SIZE / 2,
  ACCOUNT_H
)

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = (
  <>
    {isoShadow(footprint(-4, 4, 328, 102, -22, 6), SHADOW)}
    {isoShadow(
      footprint(BLOCK_X + 2, BLOCK_Y + 2, BLOCK_W, BLOCK_D, -8, 5),
      SHADOW
    )}
  </>
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {Object.values(ACCOUNT_X).map((x) => (
      <g key={x}>
        {isoShadow(
          footprint(x + 2, ACCOUNT_Y + 2, ACCOUNT_SIZE, ACCOUNT_SIZE, 0, 5),
          SHADOW
        )}
      </g>
    ))}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, 320, 96], 5)
const FRONT_Y = ACCOUNT_Y + ACCOUNT_SIZE
// Externally owned accounts: a seam, a base band and a name plate.
const eoaDetail = (x: number) => (
  <>
    {D.seams([x, ACCOUNT_Y, 0, ACCOUNT_SIZE, ACCOUNT_SIZE, ACCOUNT_H], {
      end: [0.5],
      ring: 0.12,
    })}
    {D.plate(FRONT_Y, x + 8, x + 36, 22, 30)}
  </>
)
const ALICE_DETAIL = eoaDetail(ACCOUNT_X.alice)
const BOB_DETAIL = eoaDetail(ACCOUNT_X.bob)
// The contract: a base band and vents for its code.
const CONTRACT_DETAIL = (
  <>
    {D.seams(
      [ACCOUNT_X.contract, ACCOUNT_Y, 0, ACCOUNT_SIZE, ACCOUNT_SIZE, ACCOUNT_H],
      { ring: 0.12 }
    )}
    {D.vents(
      FRONT_Y,
      ACCOUNT_X.contract + 10,
      ACCOUNT_X.contract + 34,
      [16, 22, 28]
    )}
  </>
)
// Lines of text on the top slab: the first transaction.
const SLAB_DETAIL = (
  <>
    {D.slot(BLOCK_TOP, BLOCK_X + 12, BLOCK_X + 38, BLOCK_Y + 16)}
    {D.slot(BLOCK_TOP, BLOCK_X + 12, BLOCK_X + 32, BLOCK_Y + 24)}
  </>
)

/* ---------- Labels: outside the solids, short straight leaders ---------- */

const spot = (
  id: BlockStatePart,
  tone: AnatomyLabelSpot["tone"],
  target: [number, number],
  anchorY: number,
  placement: AnatomyLabelSpot["placement"]
): AnatomyLabelSpot => ({
  id,
  tone,
  target,
  anchor: [target[0], anchorY],
  placement,
})

const ALICE_TARGET = P(ACCOUNT_X.alice, FRONT_Y, 20)

const SPOTS: AnatomyLabelSpot[] = [
  spot("deck", "neutral", P(160, 96, -8), 262, "below"),
  spot("block", "entity", P(BLOCK_X + 3, BLOCK_Y + 3, BLOCK_TOP), 34, "above"),
  {
    id: "alice",
    tone: "entity",
    target: ALICE_TARGET,
    anchor: [r1(ALICE_TARGET[0] - 8), r1(ALICE_TARGET[1] - 4)],
    placement: "start",
  },
  spot("bob", "entity", P(160, ACCOUNT_Y, ACCOUNT_H), 92, "above"),
  spot(
    "contract",
    "entity",
    P(ACCOUNT_X.contract + ACCOUNT_SIZE, FRONT_Y, 0),
    300,
    "below"
  ),
  // On the visible stretch of the Alice-Bob pipe, above the plate's back
  // edge: labels never sit on the plate.
  spot("pipe", "gas", P(104, PIPE_Y, PIPE_Z), 70, "above"),
]

const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

interface BlockStateRigProps {
  view: BlockStateView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<BlockStatePart, ReactNode>
  definitions: Record<BlockStatePart, ReactNode>
  className?: string
}

function BlockStateRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: BlockStateRigProps) {
  const t = useTranslations("component-diagrams")
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: BlockStatePart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const blockState = state("block")
  const slabState = (index: number): AnatomyState =>
    blockState === "hover" ? "hover" : view.active === index ? "lit" : "rest"
  // Applied transactions turn neutral: done, but still in the block.
  const slabHue = (index: number) =>
    index < view.applied && view.active !== index ? "neutral" : "entity"
  const revertingNow = view.motion === "tx2-revert"

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

        {/* The block, behind the plate: transactions stacked in order. */}
        <g {...part("block")}>
          <IsoSolid box={PLINTH} hue="neutral" state={blockState} />
          {/* Bottom slab first, so each upper slab paints over the one below. */}
          {SLAB_ORDER.map((i) => (
            <g key={i}>
              <IsoSolid
                box={SLABS[i]}
                hue={slabHue(i)}
                state={slabState(i)}
                className={cn(
                  view.revertedTx === i &&
                    slabState(i) !== "hover" &&
                    "stroke-diagram-revert"
                )}
              />
              {i === 0 && SLAB_DETAIL}
            </g>
          ))}
        </g>

        <g {...part("deck")}>
          <IsoPlate box={PLATE} state={state("deck")} />
          {PLATE_DETAIL}
        </g>
        {CONTACT_SHADOWS}

        <g {...part("alice")}>
          <IsoSolid box={ALICE} hue="entity" state={state("alice")} />
          {ALICE_DETAIL}
        </g>

        {/* Value between Alice and Bob, either way. */}
        <g {...part("pipe")}>
          <IsoPipe
            d={PIPE_AB}
            state={state("pipe")}
            flowing={view.flow === "alice-bob" || view.flow === "bob-alice"}
            flowD={view.flow === "bob-alice" ? PIPE_BA : undefined}
            flowKey={runKey}
          />
        </g>

        <g {...part("bob")}>
          <IsoSolid box={BOB} hue="entity" state={state("bob")} />
          {BOB_DETAIL}
        </g>

        {/* Value from Bob to the contract (sent even when the call reverts). */}
        <g {...part("pipe")}>
          <IsoPipe
            d={PIPE_BC}
            state={state("pipe")}
            flowing={view.flow === "bob-contract"}
            flowKey={runKey}
          />
        </g>

        <g {...part("contract")}>
          <IsoSolid box={CONTRACT} hue="entity" state={state("contract")} />
          {CONTRACT_DETAIL}
        </g>
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={SPOTS}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />

      {/* The contract call reverted: its value transfer is undone. In its
          own step the tag waits for the value to arrive first. */}
      {view.revertedTx !== null && (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-diagram-pop rounded-base border border-diagram-revert bg-diagram-entity-fill px-2 py-0.5 text-sm font-bold whitespace-nowrap text-diagram-revert motion-reduce:animate-none rtl:translate-x-1/2"
          style={{
            insetInlineStart: pct(REVERTED_AT[0], W),
            top: pct(REVERTED_AT[1], H),
            animationDelay: revertingNow ? "700ms" : "0ms",
          }}
        >
          {t("diagram-reverted")}
        </span>
      )}
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(BlockStateRig)
