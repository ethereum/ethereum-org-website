import { memo, type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  anatomyStroke,
  anatomyStrong,
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

import { TX_APPLY_SIZE, type TxApplyPart, type TxApplyView } from "./model"

/*
 * Isometric drawing for "Applying a transaction", on the shared anatomy
 * primitives. Server-rendered with the player.
 *
 * The world-state plate carries the sender (with the signed transaction slip
 * on top) and the recipient, joined by the value pipe along the back. The
 * fee leaves the sender on its own pipe along the front, so the two never
 * cross, and splits: the base fee into the burn mark, the tip on to the
 * validator.
 */

const { width: W, height: H } = TX_APPLY_SIZE
const PROJECTION = isoProjection(140, 70)
const { P, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "tx-apply-shadow"

/* ---------- Geometry ---------- */

const PLATE = box(0, 0, -8, 340, 110, 8)
const SENDER = box(16, 24, 0, 60, 56, 46)
const SLIP = box(26, 34, 46, 36, 32, 2.5)
const RECIPIENT = box(264, 24, 0, 60, 56, 46)
const VALIDATOR = box(196, 56, 0, 30, 26, 24)

// Value along the back lane, sender to recipient.
const VALUE = path(14, [76, 36], [264, 36])
// Fee along the front lane: to the junction, then the base fee forward to the
// burn mark and the tip on to the validator.
const JUNCTION_X = 150
const FEE_MAIN = path(14, [76, 68], [196, 68])
const FEE_BURN = path(14, [JUNCTION_X, 68], [JUNCTION_X, 86])
const FEE = `${FEE_MAIN} ${FEE_BURN}`

const BURN = cylinder(JUNCTION_X, 94, 0, 8, 20)
const FLAME_BASE = P(JUNCTION_X, 94, 20)

/** A small flame over the burn mark, in screen units. */
const FLAME = (() => {
  const [x, y] = FLAME_BASE
  return `M${x},${r1(y - 1)} C${r1(x - 6)},${r1(y - 6)} ${r1(x - 3)},${r1(y - 12)} ${x},${r1(y - 17)} C${r1(x + 1)},${r1(y - 11)} ${r1(x + 6)},${r1(y - 8)} ${x},${r1(y - 1)} Z`
})()

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = isoShadow(footprint(-4, 4, 348, 116, -22, 6), SHADOW)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(18, 26, 62, 58, 0, 5), SHADOW)}
    {isoShadow(footprint(266, 26, 62, 58, 0, 5), SHADOW)}
    {isoShadow(footprint(198, 58, 32, 28, 0, 4), SHADOW)}
    {isoShadow(footprint(144, 88, 14, 14, 0, 3), SHADOW)}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, 340, 110], 5)
// Accounts: a base band, a seam, and a name plate on the front.
const SENDER_DETAIL = (
  <>
    {D.seams([16, 24, 0, 60, 56, 46], { end: [0.5], ring: 0.12 })}
    {D.plate(80, 24, 52, 24, 34)}
  </>
)
const RECIPIENT_DETAIL = (
  <>
    {D.seams([264, 24, 0, 60, 56, 46], { end: [0.5], ring: 0.12 })}
    {D.plate(80, 272, 300, 24, 34)}
  </>
)
// The slip: two lines of text and a signature mark.
const SLIP_DETAIL = (
  <>
    {D.slot(48.5, 32, 54, 42)}
    {D.slot(48.5, 32, 48, 50)}
    {D.slot(48.5, 46, 56, 60)}
  </>
)
const VALIDATOR_DETAIL = (
  <>
    {D.seams([196, 56, 0, 30, 26, 24], { ring: 0.7 })}
    {D.vents(82, 202, 218, [8, 11])}
  </>
)
const BURN_DETAIL = D.cylinderMarks(BURN, { marks: 2 })

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
    target: P(26, 34, 48.5),
    anchor: [P(26, 34, 48.5)[0], 28],
    placement: "above",
  },
  {
    id: "sender",
    tone: "entity",
    target: P(16, 80, 26),
    anchor: [r1(P(16, 80, 26)[0] - 8), r1(P(16, 80, 26)[1] - 4)],
    placement: "start",
  },
  {
    id: "recipient",
    tone: "entity",
    target: P(264, 24, 46),
    anchor: [P(264, 24, 46)[0], 144],
    placement: "above",
  },
  {
    id: "validator",
    tone: "entity",
    target: P(226, 82, 0),
    anchor: [P(226, 82, 0)[0], 284],
    placement: "below",
  },
  {
    id: "burn",
    tone: "gas",
    target: P(JUNCTION_X, 102, 0),
    anchor: [P(JUNCTION_X, 102, 0)[0], 230],
    placement: "below",
  },
  {
    // Above the plate's back edge: labels never sit on the plate.
    id: "pipe",
    tone: "gas",
    target: P(130, 36, 14),
    anchor: [P(130, 36, 14)[0], 108],
    placement: "above",
  },
]

interface TxApplyRigProps {
  view: TxApplyView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<TxApplyPart, ReactNode>
  definitions: Record<TxApplyPart, ReactNode>
  className?: string
}

function TxApplyRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: TxApplyRigProps) {
  const id = useId()
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: TxApplyPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
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
        <IsoDefs id={SHADOW} />
        {GROUND_SHADOW}
        <g {...part("deck")}>
          <IsoPlate box={PLATE} state={state("deck")} />
          {PLATE_DETAIL}
        </g>
        {CONTACT_SHADOWS}

        {/* Value, along the back. */}
        <g {...part("pipe")}>
          <IsoPipe
            d={VALUE}
            state={state("pipe")}
            flowing={view.motion === "value"}
            flowKey={runKey}
          />
        </g>

        {/* Sender account, with the signed transaction on top. */}
        <g {...part("sender")}>
          <IsoSolid box={SENDER} hue="entity" state={state("sender")} />
          {SENDER_DETAIL}
        </g>
        {view.slipShown && (
          <g {...part("slip")}>
            <g
              key={view.motion === "submit" ? runKey : "slip"}
              className={cn(
                "transition-opacity duration-500 motion-reduce:transition-none",
                view.motion === "submit" &&
                  "animate-diagram-travel-y [transform-box:fill-box] motion-reduce:animate-none",
                view.slipApplied && "opacity-50"
              )}
            >
              <IsoSolid box={SLIP} hue="entity" state={state("slip")} />
              {SLIP_DETAIL}
            </g>
          </g>
        )}

        {/* Fee, along the front: burn forward, tip on to the validator. */}
        <g {...part("fee")}>
          <IsoPipe
            d={FEE}
            state={state("fee")}
            flowing={feeFlowing}
            flowKey={runKey}
          />
        </g>

        {/* Burn mark: the base fee leaves circulation here. */}
        <g {...part("burn")}>
          <IsoCylinder
            geometry={BURN}
            hue="gas"
            clipId={`${id}-burn`}
            state={state("burn")}
          />
          {BURN_DETAIL}
          {view.burnt && (
            <path
              key={feeFlowing ? runKey : "flame"}
              d={FLAME}
              className={cn(
                "animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none",
                anatomyStroke(
                  "gas",
                  state("burn") === "rest" ? "lit" : state("burn")
                )
              )}
              style={{
                fill: anatomyStrong("gas"),
                animationDelay: feeFlowing ? "600ms" : "0ms",
              }}
            />
          )}
        </g>

        {/* Validator: where the tip ends. */}
        <g {...part("validator")}>
          <IsoSolid box={VALIDATOR} hue="entity" state={state("validator")} />
          {VALIDATOR_DETAIL}
        </g>

        <g {...part("recipient")}>
          <IsoSolid box={RECIPIENT} hue="entity" state={state("recipient")} />
          {RECIPIENT_DETAIL}
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
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(TxApplyRig)
