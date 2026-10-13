import { type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

import {
  ANATOMY_LIT_STROKE,
  AnatomyLabels,
  type AnatomyLabelSpot,
  anatomyStrong,
  DIAGRAM_SVG_FALLBACKS,
  ISO_SVG_CLASS,
  IsoCylinder,
  IsoPipe,
  IsoPlate,
  isoProjection,
  IsoSolid,
  r1,
} from "../anatomy"

import { TX_APPLY_SIZE } from "./layout"
import type { TxApplyPart, TxApplyView } from "./model"

/*
 * Isometric drawing for "Applying a transaction", on the shared anatomy
 * primitives. Lazy-loaded by TxApplyPlayer; everything comes from the view.
 *
 * Six objects: the world-state plate, the sender and recipient accounts, the
 * signed transaction slip on the sender, the value pipe between them (with a
 * branch at its junction that carries the tip off the plate to the
 * validator), and a small burn mark on the pipe's front branch.
 */

const { width: W, height: H } = TX_APPLY_SIZE
const { P, path, box, cylinder } = isoProjection(140, 70)

/* ---------- Geometry ---------- */

const PLATE = box(0, 0, -8, 340, 110, 8)
const SENDER = box(16, 30, 0, 60, 52, 46)
const SLIP = box(28, 40, 46, 34, 30, 2)
const RECIPIENT = box(264, 30, 0, 60, 52, 46)

// Value: sender → recipient, through a junction where the fee splits.
const JUNCTION_X = 170
const VALUE = path(14, [76, 56], [264, 56])
const FEE_IN = path(14, [76, 56], [JUNCTION_X, 56])
// The base fee runs forward to the burn mark; the tip runs back, off the
// plate, to the validator.
const BURN_BRANCH = path(14, [JUNCTION_X, 56], [JUNCTION_X, 86])
const TIP_BRANCH = path(14, [JUNCTION_X, 56], [JUNCTION_X, -18])

const BURN = cylinder(JUNCTION_X, 94, 0, 8, 20)
const FLAME_BASE = P(JUNCTION_X, 94, 20)

/** A small flame over the burn mark, in screen units. */
const FLAME = (() => {
  const [x, y] = FLAME_BASE
  return `M${x},${r1(y - 1)} C${r1(x - 6)},${r1(y - 6)} ${r1(x - 3)},${r1(y - 12)} ${x},${r1(y - 17)} C${r1(x + 1)},${r1(y - 11)} ${r1(x + 6)},${r1(y - 8)} ${x},${r1(y - 1)} Z`
})()

/* ---------- Labels: outside the solids, short straight leaders ---------- */

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "deck",
    tone: "neutral",
    target: P(340, 110, -8),
    anchor: [P(340, 110, -8)[0], 312],
    placement: "below",
  },
  {
    id: "slip",
    tone: "entity",
    target: P(28, 40, 48),
    anchor: [P(28, 40, 48)[0], 30],
    placement: "above",
  },
  {
    id: "sender",
    tone: "entity",
    target: P(16, 82, 26),
    anchor: [r1(P(16, 82, 26)[0] - 8), r1(P(16, 82, 26)[1] - 4)],
    placement: "start",
  },
  {
    id: "recipient",
    tone: "entity",
    target: P(264, 30, 46),
    anchor: [P(264, 30, 46)[0], 150],
    placement: "above",
  },
  {
    id: "burn",
    tone: "gas",
    target: P(JUNCTION_X, 102, 0),
    anchor: [P(JUNCTION_X, 102, 0)[0], 232],
    placement: "below",
  },
  {
    id: "tip",
    tone: "gas",
    target: P(JUNCTION_X, -18, 14),
    anchor: [P(JUNCTION_X, -18, 14)[0], 106],
    placement: "above",
  },
  {
    id: "pipe",
    tone: "gas",
    target: P(130, 56, 14),
    // Above the plate's back edge: labels never sit on the plate.
    anchor: [P(130, 56, 14)[0], 98],
    placement: "above",
  },
]

interface TxApplyRigProps {
  view: TxApplyView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<TxApplyPart, ReactNode>
  tooltips: Record<TxApplyPart, ReactNode>
  className?: string
}

export default function TxApplyRig({
  view,
  runKey,
  labels,
  tooltips,
  className,
}: TxApplyRigProps) {
  const id = useId()
  const isLit = (part: TxApplyPart) => view.litPart === part
  const feeFlowing = view.motion === "fee"

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <IsoPlate box={PLATE} lit={isLit("deck")} />

        {/* The tip leaves the plate: drawn first, so the plate's own
            objects sit in front of it. */}
        <IsoPipe d={TIP_BRANCH} flowing={feeFlowing} flowKey={runKey} />

        {/* Sender account, with the signed transaction on top. */}
        <IsoSolid box={SENDER} hue="entity" lit={isLit("sender")} />

        <IsoPipe
          d={VALUE}
          flowing={view.motion === "value" || feeFlowing}
          flowD={feeFlowing ? FEE_IN : VALUE}
          flowKey={runKey}
        />
        <IsoPipe d={BURN_BRANCH} flowing={feeFlowing} flowKey={runKey} />

        {view.slipShown && (
          <g
            key={view.motion === "submit" ? runKey : "slip"}
            className={cn(
              "transition-opacity duration-500 motion-reduce:transition-none",
              view.motion === "submit" &&
                "animate-diagram-travel-y [transform-box:fill-box] motion-reduce:animate-none",
              view.slipApplied && "opacity-40"
            )}
          >
            <IsoSolid box={SLIP} hue="entity" lit={isLit("slip")} />
          </g>
        )}

        {/* Burn mark: the base fee leaves circulation here. */}
        <IsoCylinder
          geometry={BURN}
          hue="gas"
          clipId={`${id}-burn`}
          lit={isLit("burn")}
        />
        {view.burnt && (
          <path
            key={feeFlowing ? runKey : "flame"}
            d={FLAME}
            className={cn(
              "animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none",
              isLit("burn")
                ? ANATOMY_LIT_STROKE.gas
                : "stroke-diagram-gas-rest",
              "[stroke-width:1]"
            )}
            style={{
              fill: anatomyStrong("gas"),
              animationDelay: feeFlowing ? "600ms" : "0ms",
              animationFillMode: "both",
            }}
          />
        )}

        <IsoSolid box={RECIPIENT} hue="entity" lit={isLit("recipient")} />
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={SPOTS}
        labels={labels}
        tooltips={tooltips}
        litId={view.litPart}
      />
    </div>
  )
}
