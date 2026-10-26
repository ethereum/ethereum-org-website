import { memo, type ReactNode, useId } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  AnatomyLabels,
  type AnatomyLabelSpot,
  anatomyStroke,
  DIAGRAM_COLOR,
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
  type Point,
  r1,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  GAS_EVM_SIZE,
  type GasEvmPart,
  type GasEvmView,
  PROGRAM,
} from "./model"

/*
 * Isometric drawing for the EVM gas diagram, on the shared anatomy
 * primitives. Server-rendered with the player; everything comes from the
 * view.
 *
 * Grouped by meaning (after the original evm.png): the stack and memory are
 * volatile machine state, so they sit on the EVM's own plinth either side of
 * it; storage is persistent world state, so it stands apart on the plate,
 * fed by its own pipe. Everything sits in one row along the plate, so each
 * part's label rises into open space and no part hides another.
 */

const { width: W, height: H } = GAS_EVM_SIZE
const PROJECTION = isoProjection(112, 78)
const { P, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "gas-evm-shadow"

const pts = (...ps: Point[]) => ps.map((p) => p.join(",")).join(" ")
/** Quad on a front (y = const) face. */
const onFront = (y: number, x0: number, x1: number, z0: number, z1: number) =>
  pts(P(x0, y, z0), P(x1, y, z0), P(x1, y, z1), P(x0, y, z1))
/** Quad on a top (z = const) face. */
const onTop = (z: number, x0: number, x1: number, y0: number, y1: number) =>
  pts(P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z))

/* ---------- Geometry ---------- */

const PLATE_W = 316
const PLATE_D = 104
const PLATE = box(0, 0, -8, PLATE_W, PLATE_D, 8)
const TANK = cylinder(40, 46, 0, 20, 48)

// The EVM's plinth, shared by the stack, the EVM and memory.
const PLINTH = box(86, 28, 0, 146, 40, 6)

// Stack (inline-start side of the EVM): slabs, or an empty slot outline.
const STACK_SLABS = [0, 1, 2].map((k) => box(92, 36, 6 + k * 7, 26, 24, 5))

// The EVM, with its code as a strip of cells along the front.
const EVM = box(124, 32, 6, 64, 30, 36)
const CELL_W = 7.8
const CODE_CELLS = PROGRAM.map((_, i) =>
  onFront(62, 128 + i * CELL_W, 128 + (i + 1) * CELL_W - 1.2, 14, 33)
)

// Memory (inline-end side of the EVM): a tray of four word cells.
const MEMORY = box(196, 38, 6, 30, 22, 4)
const MEMORY_CELLS = [
  onTop(10.1, 198, 210, 40, 48),
  onTop(10.1, 212, 224, 40, 48),
  onTop(10.1, 198, 210, 50, 58),
  onTop(10.1, 212, 224, 50, 58),
]

// Storage: the account's persistent store, apart on the plate.
const STORAGE = box(262, 54, 0, 40, 38, 30)
const STORAGE_SLOT = onFront(92, 271, 293, 9, 21)

// Pipes along the front, clear of every label: gas from the tank into the
// EVM, and the EVM's own pipe to storage.
const GAS_PIPE = path(9, [40, 66], [40, 84], [156, 84], [156, 62])
const STORAGE_PIPE = path(12, [186, 62], [186, 86], [266, 86])

const REVERTED_AT = P(156, 47, 42)

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = isoShadow(
  footprint(-4, 4, PLATE_W + 8, PLATE_D + 6, -22, 6),
  SHADOW
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(22, 28, 40, 40, 0, 4), SHADOW)}
    {isoShadow(footprint(88, 30, 148, 42, 0, 4), SHADOW)}
    {isoShadow(footprint(264, 56, 42, 40, 0, 4), SHADOW)}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, PLATE_W, PLATE_D], 5)
const PLINTH_DETAIL = D.inset([86, 28, 6, 146, 40], 2)
const TANK_DETAIL = D.cylinderMarks(TANK)
const TANK_FLANGE = D.flange(40, 46, 0, 23)
const EVM_DETAIL = (
  <>
    {D.seams([124, 32, 6, 64, 30, 36], { end: [0.5], ring: 0.88 })}
    {D.vents(62, 132, 150, [36])}
  </>
)
const STORAGE_DETAIL = (
  <>
    {D.seams([262, 54, 0, 40, 38, 30], { end: [0.5], ring: 0.85 })}
    {D.seams([262, 54, 0, 40, 38, 30], { ring: 0.12 })}
  </>
)

/* ---------- Labels: each rises from its part's top back corner ---------- */

// Where the plate's front edge is, at a screen x: labels below the plate sit
// clear of it across their whole width (the edge slopes down to the right).
const [edgeX0, edgeY0] = P(0, PLATE_D, -8)
const [edgeX1, edgeY1] = P(PLATE_W, PLATE_D, -8)
const belowPlate = (x: number, halfWidth = 48) => {
  const at = Math.min(Math.max(x + halfWidth, edgeX0), edgeX1)
  return r1(
    edgeY0 + ((at - edgeX0) / (edgeX1 - edgeX0)) * (edgeY1 - edgeY0) + 8
  )
}

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "evm",
    tone: "entity",
    target: P(188, 32, 42),
    anchor: [P(188, 32, 42)[0], 56],
    placement: "above",
  },
  {
    id: "tank",
    tone: "gas",
    target: [P(40, 46, 48)[0], r1(P(40, 46, 48)[1] - 14)],
    anchor: [P(40, 46, 48)[0], 20],
    placement: "above",
  },
  {
    id: "stack",
    tone: "entity",
    target: P(118, 36, 27),
    anchor: [P(118, 36, 27)[0], 40],
    placement: "above",
  },
  {
    id: "memory",
    tone: "entity",
    target: P(226, 38, 10),
    anchor: [P(226, 38, 10)[0], 112],
    placement: "above",
  },
  {
    // Storage's leader runs down, away from the stack's.
    id: "storage",
    tone: "entity",
    target: P(302, 92, 0),
    anchor: [P(302, 92, 0)[0], belowPlate(P(302, 92, 0)[0])],
    placement: "below",
  },
  {
    // Above the plate's back-left edge, clear of the tank.
    id: "deck",
    tone: "neutral",
    target: P(0, 70, 0),
    anchor: [P(0, 70, 0)[0], 92],
    placement: "above",
  },
]

const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

interface GasEvmRigProps {
  view: GasEvmView
  runKey: string
  labels: Record<GasEvmPart, ReactNode>
  definitions: Record<GasEvmPart, ReactNode>
  className?: string
}

function GasEvmRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: GasEvmRigProps) {
  const t = useTranslations("component-diagrams")
  const id = useId()
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: GasEvmPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })

  // Written values are a stronger blue (machine and world state), not orange:
  // orange is only ever gas.
  const written = `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 65%, ${DIAGRAM_COLOR.bg})`
  const activeCell = `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 85%, ${DIAGRAM_COLOR.bg})`
  const cellFill = (i: number) =>
    view.pc === i
      ? activeCell
      : view.pc !== null && i < view.pc
        ? anatomyFill("entity", "start")
        : anatomyFill("entity", "top")

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

        {/* Gas supply. */}
        <g {...part("tank")}>
          {TANK_FLANGE}
          <IsoCylinder
            geometry={TANK}
            hue="gas"
            clipId={`${id}-tank`}
            level={view.tankLevel}
            state={state("tank")}
          />
          {TANK_DETAIL}
        </g>

        {/* The EVM's plinth with the stack, the EVM and memory on it. */}
        <g {...part("evm")}>
          <IsoSolid box={PLINTH} hue="entity" />
          {PLINTH_DETAIL}
        </g>

        <g {...part("stack")}>
          {view.stack.length === 0 ? (
            // An empty slot, so the Stack label never points at nothing.
            <polygon
              points={STACK_SLABS[0].top}
              fill="none"
              strokeDasharray="3 3"
              className={anatomyStroke("entity", state("stack"))}
            />
          ) : (
            STACK_SLABS.map((slab, k) =>
              k < view.stack.length ? (
                <IsoSolid
                  key={slab.top}
                  box={slab}
                  hue="entity"
                  state={k === view.stack.length - 1 ? state("stack") : "rest"}
                />
              ) : null
            )
          )}
        </g>

        <g {...part("evm")}>
          <IsoSolid box={EVM} hue="entity" state={state("evm")} />
          {EVM_DETAIL}
          <g className="stroke-diagram-line">
            {CODE_CELLS.map((cell, i) => (
              <polygon
                key={cell}
                points={cell}
                className={cn(view.pc === i && "stroke-diagram-entity")}
                style={{ fill: cellFill(i) }}
              />
            ))}
          </g>
        </g>

        <g {...part("memory")}>
          <IsoSolid box={MEMORY} hue="entity" state={state("memory")} />
          <g className="stroke-diagram-line-faint">
            {MEMORY_CELLS.map((cell, k) => (
              <polygon
                key={cell}
                points={cell}
                style={{
                  fill:
                    k === 0 && view.memoryWord !== null
                      ? written
                      : anatomyFill("entity", "top"),
                }}
              />
            ))}
          </g>
        </g>

        {/* Gas: a pulse along the pipe for every step, stronger for SSTORE. */}
        <IsoPipe
          d={GAS_PIPE}
          flowing={view.stepIndex >= 0}
          flowKey={runKey}
          flowEmphasis={view.instruction?.op === "SSTORE"}
        />

        {/* Storage, apart on the plate, on its own pipe from the EVM. */}
        <IsoPipe d={STORAGE_PIPE} />
        <g {...part("storage")}>
          <IsoSolid box={STORAGE} hue="entity" state={state("storage")} />
          {STORAGE_DETAIL}
          <polygon
            points={STORAGE_SLOT}
            className={
              view.failed ? "stroke-diagram-revert" : "stroke-diagram-line"
            }
            style={{
              fill:
                view.storageSlot !== null
                  ? written
                  : anatomyFill("entity", "top"),
            }}
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

      {view.failed && (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-diagram-pop rounded-base border border-diagram-revert bg-diagram-entity-fill px-2 py-0.5 text-xs font-bold whitespace-nowrap text-diagram-revert motion-reduce:animate-none rtl:translate-x-1/2"
          style={{
            insetInlineStart: pct(REVERTED_AT[0], W),
            top: pct(REVERTED_AT[1], H),
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
export default memo(GasEvmRig)
