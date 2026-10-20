import { type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  AnatomyLabels,
  type AnatomyLabelSpot,
  anatomyStroke,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_LEVEL_CLASS,
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

import {
  GAS_RIG_PART_STEP,
  GAS_RIG_SIZE,
  type GasRigPart,
  type GasTxView,
} from "./model"

/*
 * Isometric fuel rig for the gas-tx diagram, built from the shared anatomy
 * primitives. Lazy-loaded by GasTxPlayer (next/dynamic, ssr: false);
 * everything it shows comes from the model view.
 */

const { width: W, height: H } = GAS_RIG_SIZE
const PROJECTION = isoProjection(180, 74)
const { P, line, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "gas-tx-shadow"

/* ---------- Geometry (world units; see anatomy/iso.tsx for the axes) ---------- */

const PLATE = box(0, 0, -8, 360, 96, 8)
const PUMP = box(12, 26, 0, 36, 36, 54)
// Flush with the pump top's back corner, so its leader rises clear of the pump.
const SLIP = box(14, 28, 54, 26, 26, 2)
const TANK = cylinder(128, 44, 0, 26, 54)
const ENGINE = box(240, 20, 0, 64, 52, 38)

// The one icon: "</>" on the engine's front.
const CODE_ICON = [
  line(P(262, 72, 24), P(258, 72, 19), P(262, 72, 14)),
  line(P(282, 72, 24), P(286, 72, 19), P(282, 72, 14)),
  line(P(275, 72, 26), P(269, 72, 12)),
]

// Message: pump → tank → engine (runs through the tank, into the engine's back).
const MESSAGE = path(18, [48, 44], [240, 44])
const MESSAGE_FILL = path(18, [48, 44], [102, 44])
const MESSAGE_FEED = path(18, [154, 44], [240, 44])
// Unused gas: from the tank's front, past the meter, back into the sender, so
// step 4 visibly drains what is left in the tank.
const UNUSED = path(6, [128, 70], [128, 84], [44, 84], [44, 62])

// Meter: a small dial on its own plinth in front of the return pipe, clear
// of both the pump and the tank.
const METER_PLINTH = box(95, 86, 0, 10, 8, 4)
const METER_STUB = path(6, [100, 84], [100, 86])
const METER_STEM = line(P(100, 90, 4), P(100, 90, 8))
const [dialX, dialY] = P(100, 90, 16)
const DIAL_R = 8

const REVERTED_AT = P(272, 72, 26)

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

// One soft ground shadow under the plate, nudged forward so it shows below
// the front edges; contact shadows under each object so it sits on the plate.
const GROUND_SHADOW = isoShadow(footprint(-6, 4, 372, 104, -22, 6), SHADOW)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(14, 28, 38, 38, 0, 5), SHADOW)}
    {isoShadow(footprint(103, 19, 54, 54, 0, 4), SHADOW)}
    {isoShadow(footprint(243, 23, 66, 54, 0, 5), SHADOW)}
    {isoShadow(footprint(96, 87, 11, 9, 0, 3), SHADOW)}
  </g>
)

const PLATE_DETAIL = D.inset([0, 0, 0, 360, 96], 5)
const PUMP_DETAIL = (
  <>
    {D.seams([12, 26, 0, 36, 36, 54], { end: [0.5], ring: 0.14 })}
    {D.plate(62, 18, 42, 32, 42)}
  </>
)
const SLIP_DETAIL = (
  <>
    {D.slot(56, 18, 36, 34)}
    {D.slot(56, 18, 30, 40)}
  </>
)
const TANK_DETAIL = D.cylinderMarks(TANK)
const TANK_FLANGE = D.flange(128, 44, 0, 29)
const ENGINE_DETAIL = (
  <>
    {D.seams([240, 20, 0, 64, 52, 38], { end: [0.3, 0.7], ring: 0.82 })}
    {D.vents(72, 290, 298, [8, 11, 14])}
  </>
)
const METER_TICKS = (
  <g className="pointer-events-none stroke-diagram-line-faint" fill="none">
    {[-60, 0, 60].map((deg) => {
      const a = ((deg - 90) * Math.PI) / 180
      return (
        <path
          key={deg}
          d={`M${r1(dialX + Math.cos(a) * 5.5)},${r1(dialY + Math.sin(a) * 5.5)} L${r1(dialX + Math.cos(a) * 7.5)},${r1(dialY + Math.sin(a) * 7.5)}`}
        />
      )
    })}
  </g>
)
const CODE_ICON_PATHS = (
  <g
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    // Counter the RTL mirror so the icon still reads "</>".
    className="pointer-events-none origin-center stroke-diagram-entity [stroke-width:1] [transform-box:fill-box] rtl:-scale-x-100"
  >
    {CODE_ICON.map((d) => (
      <path key={d} d={d} />
    ))}
  </g>
)

/* ---------- Labels: outside the plate, short straight leaders ---------- */

// In priority order: when space runs out, later labels drop first. Labels
// below the plate sit low enough that their full width clears its sloping
// front edge.
const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "pump",
    tone: "entity",
    target: P(12, 62, 30),
    anchor: [125, 81],
    placement: "start",
  },
  {
    id: "tank",
    tone: "gas",
    target: [P(128, 44, 54)[0], r1(P(128, 44, 54)[1] - 18.4)],
    anchor: [P(128, 44, 54)[0], 62],
    placement: "above",
  },
  {
    id: "engine",
    tone: "entity",
    // On the top face's back edge, so the leader rises clear of the engine.
    target: P(290, 20, 38),
    anchor: [P(290, 20, 38)[0], 150],
    placement: "above",
  },
  {
    id: "meter",
    tone: "gas",
    target: P(100, 94, 0),
    anchor: [P(100, 94, 0)[0], 214],
    placement: "below",
  },
  {
    id: "order",
    tone: "entity",
    target: P(14, 28, 56),
    anchor: [P(14, 28, 56)[0], 24],
    placement: "above",
  },
  {
    id: "feed",
    tone: "gas",
    target: P(215, 44, 18),
    anchor: [P(215, 44, 18)[0], 140],
    placement: "above",
  },
  {
    id: "returnLine",
    tone: "gas",
    // From the pipe's corner, down and out past the plate's left corner.
    target: P(44, 84, 6),
    anchor: [128, 166],
    placement: "start",
  },
  {
    id: "deck",
    tone: "neutral",
    target: P(360, 96, -8),
    anchor: [P(360, 96, -8)[0], 318],
    placement: "below",
  },
]

const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

interface GasRigProps {
  view: GasTxView
  /** Changes on every step or preset change, to restart one-shot animations. */
  runKey: string
  /** Translated concept name per part. */
  labels: Record<GasRigPart, ReactNode>
  /** Translated one-line definition per part. */
  definitions: Record<GasRigPart, ReactNode>
  /** Translated text of the out-of-gas tag on the contract. */
  revertedLabel: string
  className?: string
}

export default function GasRig({
  view,
  runKey,
  labels,
  definitions,
  revertedLabel,
  className,
}: GasRigProps) {
  const id = useId()
  const { state, dimmed } = usePartState(view.litPart)

  // A part not reached yet sits back; while another part is hovered, it dims.
  const part = (name: GasRigPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: {
      opacity:
        (view.reached[GAS_RIG_PART_STEP[name]] ? 1 : 0.4) *
        (dimmed(name) ? 0.7 : 1),
    },
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
        <IsoDefs id={SHADOW} />
        {GROUND_SHADOW}
        <g {...part("deck")}>
          <IsoPlate box={PLATE} state={state("deck")} />
          {PLATE_DETAIL}
        </g>
        {CONTACT_SHADOWS}

        <g {...part("feed")}>
          <IsoPipe
            d={MESSAGE}
            state={state("feed")}
            flowing={view.motion === "reserve" || view.motion === "execute"}
            flowD={view.motion === "reserve" ? MESSAGE_FILL : MESSAGE_FEED}
            flowKey={runKey}
          />
        </g>

        {/* Sender account (pump), with the transaction slip on top. */}
        <g {...part("pump")}>
          <IsoSolid box={PUMP} hue="entity" state={state("pump")} />
          {PUMP_DETAIL}
        </g>
        <g {...part("order")}>
          <g
            key={view.motion === "enter" ? runKey : "order"}
            className={cn(
              view.motion === "enter" &&
                "animate-diagram-travel-y [transform-box:fill-box] motion-reduce:animate-none"
            )}
          >
            <IsoSolid box={SLIP} hue="entity" state={state("order")} />
            {SLIP_DETAIL}
          </g>
        </g>

        {/* Gas supply (tank): fills to the gas limit, drains as gas burns. */}
        <g {...part("tank")}>
          {TANK_FLANGE}
          <IsoCylinder
            geometry={TANK}
            hue="gas"
            clipId={`${id}-tank`}
            level={view.tankLevel}
            levelStyle={{
              transitionDelay: view.motion === "execute" ? "700ms" : "0ms",
            }}
            state={state("tank")}
          />
          {TANK_DETAIL}
        </g>

        {/* Contract (engine). Glows orange in step 3, as hot as the share
            of gas it burns. */}
        <g {...part("engine")}>
          <IsoSolid
            box={ENGINE}
            hue="entity"
            state={state("engine")}
            glow={view.glowLevel}
            glowDelay={view.motion === "execute" ? "700ms" : "0ms"}
          />
          {ENGINE_DETAIL}
          {CODE_ICON_PATHS}
        </g>

        <g {...part("returnLine")}>
          <IsoPipe
            d={UNUSED}
            state={state("returnLine")}
            flowing={view.motion === "return"}
            flowKey={runKey}
          />
        </g>

        {/* Gas returned (meter). */}
        <g {...part("meter")}>
          <IsoSolid box={METER_PLINTH} hue="gas" state={state("meter")} />
          <g
            fill="none"
            strokeLinecap="round"
            className="stroke-diagram-pipe [stroke-width:1.4]"
          >
            <path d={METER_STUB} />
            <path d={METER_STEM} />
          </g>
          <circle
            cx={dialX}
            cy={dialY}
            r={DIAL_R}
            className={anatomyStroke("gas", state("meter"))}
            style={{ fill: anatomyFill("gas", "top", state("meter")) }}
          />
          {METER_TICKS}
          <rect
            x={r1(dialX - 0.5)}
            y={r1(dialY - DIAL_R + 2)}
            width={1}
            height={DIAL_R - 2}
            rx={0.5}
            className={cn("fill-diagram-gas stroke-none", ISO_LEVEL_CLASS)}
            style={{ transform: `rotate(${-90 + 180 * view.meterLevel}deg)` }}
          />
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

      {/* Out of gas: the call fails and its state changes are reverted. In
          step 3 the tag waits until the tank has drained. */}
      {view.reverted && (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-diagram-pop rounded-base border border-diagram-revert bg-diagram-entity-fill px-2 py-0.5 text-xs font-bold whitespace-nowrap text-diagram-revert motion-reduce:animate-none rtl:translate-x-1/2"
          style={{
            insetInlineStart: pct(REVERTED_AT[0], W),
            top: pct(REVERTED_AT[1], H),
            animationDelay: view.motion === "execute" ? "1400ms" : "0ms",
          }}
        >
          {revertedLabel}
        </span>
      )}
    </div>
  )
}
