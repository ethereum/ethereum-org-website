import { memo, type ReactNode, useId } from "react"

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
import { PROGRAM } from "../GasEvm/model"

import { EVM_ZONES_SIZE, type EvmZonesPart, type EvmZonesView } from "./model"

/*
 * Isometric drawing for "What survives a call", on the same objects as the
 * EVM gas diagram so both on /evm/ read as one family. The three zones are
 * told apart by where things stand, not by boxes of text:
 * - machine state (volatile): the EVM's plinth, carrying the gas supply, the
 *   stack and memory, with the program counter as the lit code cell;
 * - virtual ROM (immutable): the code strip on the EVM itself;
 * - world state (persistent): the plate, with storage standing on it.
 * Server-rendered with the player.
 */

const { width: W, height: H } = EVM_ZONES_SIZE
const PROJECTION = isoProjection(112, 78)
const { P, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "evm-zones-shadow"

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

// Machine state: one plinth carrying the gas supply, the stack, the EVM and
// memory. Everything on it is volatile.
const PLINTH = box(14, 24, 0, 218, 48, 6)
const TANK = cylinder(38, 48, 6, 16, 40)

const STACK_SLABS = [0, 1, 2].map((k) => box(70, 36, 6 + k * 7, 26, 24, 5))

// The EVM, with its code (the virtual ROM) as a strip along the front.
const EVM = box(124, 32, 6, 64, 30, 36)
const CELL_W = 7.8
const CODE_CELLS = PROGRAM.map((_, i) =>
  onFront(62, 128 + i * CELL_W, 128 + (i + 1) * CELL_W - 1.2, 14, 33)
)

const MEMORY = box(196, 38, 6, 30, 22, 4)
const MEMORY_CELLS = [
  onTop(10.1, 198, 210, 40, 48),
  onTop(10.1, 212, 224, 40, 48),
  onTop(10.1, 198, 210, 50, 58),
  onTop(10.1, 212, 224, 50, 58),
]

// World state: storage stands apart on the plate.
const STORAGE = box(262, 54, 0, 40, 38, 30)
const STORAGE_SLOT = onFront(92, 271, 293, 9, 21)

// Gas from the supply into the EVM, along the plinth's front; the EVM's own
// pipe down to storage.
const GAS_PIPE = path(11, [38, 64], [38, 68], [150, 68], [150, 62])
const STORAGE_PIPE = path(12, [186, 62], [186, 86], [266, 86])

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = isoShadow(
  footprint(-4, 4, PLATE_W + 8, PLATE_D + 6, -22, 6),
  SHADOW
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(16, 26, 220, 50, 0, 4), SHADOW)}
    {isoShadow(footprint(264, 56, 42, 40, 0, 4), SHADOW)}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, PLATE_W, PLATE_D], 5)
const PLINTH_DETAIL = (
  <>
    {D.inset([14, 24, 6, 218, 48], 2)}
    {D.seams([14, 24, 0, 218, 48, 6], { start: [0.25, 0.5, 0.75] })}
  </>
)
const TANK_DETAIL = D.cylinderMarks(TANK)
const TANK_FLANGE = D.flange(38, 48, 6, 19)
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

/* ---------- Labels ---------- */

const [edgeX0, edgeY0] = P(0, PLATE_D, -8)
const [edgeX1, edgeY1] = P(PLATE_W, PLATE_D, -8)
/** A y just below the plate's sloping front edge, across a label's width. */
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
    id: "machine",
    tone: "entity",
    target: P(14, 72, 0),
    anchor: [P(14, 72, 0)[0], belowPlate(P(14, 72, 0)[0], 56)],
    placement: "below",
  },
  {
    id: "storage",
    tone: "entity",
    target: P(302, 92, 0),
    anchor: [P(302, 92, 0)[0], belowPlate(P(302, 92, 0)[0])],
    placement: "below",
  },
  {
    id: "tank",
    tone: "gas",
    target: [P(38, 48, 46)[0], r1(P(38, 48, 46)[1] - 11)],
    // Leans start-wards, leaving room above the stack for its label.
    anchor: [r1(P(38, 48, 46)[0] - 14), 24],
    placement: "above",
  },
  {
    id: "stack",
    tone: "entity",
    target: P(96, 36, 27),
    anchor: [r1(P(96, 36, 27)[0] + 6), 44],
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
    id: "deck",
    tone: "neutral",
    target: P(316, 30, 0),
    anchor: [P(316, 30, 0)[0], 180],
    placement: "above",
  },
]

interface EvmZonesRigProps {
  view: EvmZonesView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<EvmZonesPart, ReactNode>
  definitions: Record<EvmZonesPart, ReactNode>
  className?: string
}

function EvmZonesRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: EvmZonesRigProps) {
  const id = useId()
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: EvmZonesPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })

  // Written values are a stronger blue; orange is only ever gas.
  const written = `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 65%, ${DIAGRAM_COLOR.bg})`
  const activeCell = `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 85%, ${DIAGRAM_COLOR.bg})`

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

        {/* Machine state: the plinth and everything on it. */}
        <g {...part("machine")}>
          <IsoSolid box={PLINTH} hue="entity" state={state("machine")} />
          {PLINTH_DETAIL}
        </g>

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
                  state={state("stack")}
                />
              ) : null
            )
          )}
        </g>

        <IsoPipe
          d={GAS_PIPE}
          flowing={view.gasFlowing}
          flowKey={runKey}
          flowEmphasis={view.storing}
        />

        {/* The EVM and its code: the strip is dashed until the code is
            loaded, then never changes; the lit cell is the program counter. */}
        <g {...part("evm")}>
          <IsoSolid box={EVM} hue="entity" state={state("evm")} />
          {EVM_DETAIL}
          <g
            className="stroke-diagram-line"
            strokeDasharray={view.codeLoaded ? undefined : "2 2"}
          >
            {CODE_CELLS.map((cell, i) => (
              <polygon
                key={cell}
                points={cell}
                className={cn(view.opIndex === i && "stroke-diagram-entity")}
                style={{
                  fill: !view.codeLoaded
                    ? anatomyFill("entity", "top")
                    : view.opIndex === i
                      ? activeCell
                      : anatomyFill("entity", "end", "lit"),
                }}
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
                    k === 0 && view.memoryWritten
                      ? written
                      : anatomyFill("entity", "top"),
                }}
              />
            ))}
          </g>
        </g>

        {/* World state: storage, on its own pipe from the EVM (values, not
            gas, so it never turns orange). */}
        <IsoPipe d={STORAGE_PIPE} />
        <g {...part("storage")}>
          <IsoSolid box={STORAGE} hue="entity" state={state("storage")} />
          {STORAGE_DETAIL}
          <polygon
            points={STORAGE_SLOT}
            className="stroke-diagram-line"
            style={{
              fill: view.storageWritten
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
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(EvmZonesRig)
