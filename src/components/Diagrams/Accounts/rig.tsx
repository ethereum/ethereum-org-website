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

import {
  ACCOUNT_FIELDS,
  type AccountField,
  ACCOUNTS_SIZE,
  type AccountsPart,
  type AccountsView,
} from "./model"

/*
 * Isometric drawing for "An account examined", on the shared anatomy
 * primitives, following the original's left-to-right reading: the address
 * leads into the account state, a stack of four slabs (nonce and balance on
 * top, then storageRoot and codeHash). The two hash slabs each have a pipe
 * out to what they commit to: storageRoot to the storage tank at the back,
 * codeHash to the EVM code block at the front. An EOA's tank is empty and
 * its code block is an empty outline. Server-rendered with the player.
 */

const { width: W, height: H } = ACCOUNTS_SIZE
const PROJECTION = isoProjection(140, 62)
const { P, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "accounts-shadow"

const pts = (...ps: Point[]) => ps.map((p) => p.join(",")).join(" ")
/** Quad on a start (y = const) face. */
const onFront = (y: number, x0: number, x1: number, z0: number, z1: number) =>
  pts(P(x0, y, z0), P(x1, y, z0), P(x1, y, z1), P(x0, y, z1))

/* ---------- Geometry ---------- */

const PLATE_W = 276
const PLATE_D = 112
const PLATE = box(0, 0, -8, PLATE_W, PLATE_D, 8)

const ADDRESS = box(16, 50, 0, 40, 30, 14)

// The account state: four slabs, codeHash at the bottom, nonce on top.
const STATE_X = 100
const STATE_Y = 38
const STATE_W = 44
const STATE_D = 40
const SLAB_H = 10
/** Bottom of each field's slab. */
const SLAB_Z: Record<AccountField, number> = {
  codeHash: 0,
  storageRoot: SLAB_H,
  balance: 2 * SLAB_H,
  nonce: 3 * SLAB_H,
}
const SLABS = Object.fromEntries(
  ACCOUNT_FIELDS.map((field) => [
    field,
    box(STATE_X, STATE_Y, SLAB_Z[field], STATE_W, STATE_D, SLAB_H),
  ])
) as Record<AccountField, ReturnType<typeof box>>
// Bottom first, so each slab is drawn over the one below.
const SLAB_ORDER = [...ACCOUNT_FIELDS].reverse()
const STATE_END = STATE_X + STATE_W

// Storage at the back, EVM code at the front.
const TANK_X = 238
const TANK_Y = 44
const TANK = cylinder(TANK_X, TANK_Y, 0, 18, 46)
const CODE_X = 206
const CODE_Y = 78
const CODE_W = 50
const CODE_D = 26
const CODE_H = 30
const CODE = box(CODE_X, CODE_Y, 0, CODE_W, CODE_D, CODE_H)
const CODE_CELL_W = 7
const CODE_CELLS = Array.from({ length: 6 }, (_, i) =>
  onFront(
    CODE_Y + CODE_D,
    CODE_X + 4 + i * CODE_CELL_W,
    CODE_X + 4 + (i + 1) * CODE_CELL_W - 1.2,
    9,
    22
  )
)

// Address into the back of the stack; each hash pipe leaves its slab's end
// face. Values, not gas: the pipes stay neutral.
const ADDRESS_PIPE = path(7, [56, 65], [STATE_X, 65])
const STORAGE_PIPE = path(
  SLAB_Z.storageRoot + SLAB_H / 2,
  [STATE_END, TANK_Y],
  [TANK_X - 14, TANK_Y]
)
const CODE_PIPE_Y = CODE_Y + CODE_D / 2
const CODE_PIPE = path(
  SLAB_Z.codeHash + SLAB_H / 2,
  [STATE_END, 68],
  [180, 68],
  [180, CODE_PIPE_Y],
  [CODE_X, CODE_PIPE_Y]
)

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = isoShadow(
  footprint(-4, 4, PLATE_W + 8, PLATE_D + 6, -22, 6),
  SHADOW
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(18, 52, 42, 32, 0, 4), SHADOW)}
    {isoShadow(
      footprint(STATE_X + 2, STATE_Y + 2, STATE_W, STATE_D, 0, 5),
      SHADOW
    )}
    {isoShadow(footprint(TANK_X - 16, TANK_Y - 16, 36, 36, 0, 4), SHADOW)}
  </g>
)
// Only a solid code block casts a shadow; the empty outline does not.
const CODE_SHADOW = (
  <g className="pointer-events-none">
    {isoShadow(footprint(CODE_X + 2, CODE_Y + 2, CODE_W, CODE_D, 0, 4), SHADOW)}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, PLATE_W, PLATE_D], 5)
// The address: a name plate on its front.
const ADDRESS_DETAIL = D.plate(80, 22, 50, 4, 10)
const TANK_DETAIL = D.cylinderMarks(TANK)
const TANK_FLANGE = D.flange(TANK_X, TANK_Y, 0, 21)
const CODE_DETAIL = (
  <>
    {D.seams([CODE_X, CODE_Y, 0, CODE_W, CODE_D, CODE_H], {
      end: [0.5],
      ring: 0.88,
    })}
  </>
)
// The empty code block (an EOA): its outline only, dashed.
const CODE_OUTLINE = [CODE.start, CODE.end, CODE.top]

/* ---------- Labels: outside the plate, short straight leaders ---------- */

const [edgeX0, edgeY0] = P(0, PLATE_D, -8)
const [edgeX1, edgeY1] = P(PLATE_W, PLATE_D, -8)
/** A y just below the plate's sloping front edge, across a label's width. */
const belowPlate = (x: number, halfWidth = 48) => {
  const at = Math.min(Math.max(x + halfWidth, edgeX0), edgeX1)
  return r1(
    edgeY0 + ((at - edgeX0) / (edgeX1 - edgeX0)) * (edgeY1 - edgeY0) + 8
  )
}

const ADDRESS_TOP = P(36, 50, 14)
const STATE_TOP = P(STATE_X + STATE_W / 2, STATE_Y, 4 * SLAB_H)
const TANK_TOP: Point = [
  P(TANK_X, TANK_Y, 46)[0],
  r1(P(TANK_X, TANK_Y, 46)[1] - 12.7),
]
const CODE_FOOT = P(CODE_X + CODE_W, CODE_Y + CODE_D, 0)
const STORAGE_PIPE_MID = P(STATE_END + 40, TANK_Y, SLAB_Z.storageRoot + 5)
const CODE_PIPE_FOOT = P(180, CODE_PIPE_Y, SLAB_Z.codeHash + 5)
const DECK_CORNER = P(PLATE_W, 0, -8)

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "address",
    tone: "entity",
    target: ADDRESS_TOP,
    anchor: [ADDRESS_TOP[0], 56],
    placement: "above",
  },
  {
    id: "state",
    tone: "entity",
    target: STATE_TOP,
    anchor: [STATE_TOP[0], 28],
    placement: "above",
  },
  {
    id: "storage",
    tone: "entity",
    target: TANK_TOP,
    // Leans end-wards, clear of the storageRoot leader.
    anchor: [r1(TANK_TOP[0] + 16), 116],
    placement: "above",
  },
  {
    id: "code",
    tone: "entity",
    target: CODE_FOOT,
    anchor: [CODE_FOOT[0], belowPlate(CODE_FOOT[0])],
    placement: "below",
  },
  {
    id: "storageRoot",
    tone: "neutral",
    target: STORAGE_PIPE_MID,
    anchor: [STORAGE_PIPE_MID[0], 70],
    placement: "above",
  },
  {
    id: "codeHash",
    tone: "neutral",
    target: CODE_PIPE_FOOT,
    // Leans start-wards, clear of the EVM code label.
    anchor: [r1(CODE_PIPE_FOOT[0] - 30), belowPlate(CODE_PIPE_FOOT[0] - 30)],
    placement: "below",
  },
  {
    id: "deck",
    tone: "neutral",
    target: DECK_CORNER,
    anchor: [DECK_CORNER[0], r1(DECK_CORNER[1] + 16)],
    placement: "below",
  },
]

interface AccountsRigProps {
  view: AccountsView
  labels: Record<AccountsPart, ReactNode>
  definitions: Record<AccountsPart, ReactNode>
  className?: string
}

function AccountsRig({
  view,
  labels,
  definitions,
  className,
}: AccountsRigProps) {
  const id = useId()
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: AccountsPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const stateHovered = state("state") === "hover"
  const { hasCode, storageLevel } = view.preset
  // The field being examined: a stronger blue face, like a written value.
  const examined = `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 65%, ${DIAGRAM_COLOR.bg})`

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
        {hasCode && CODE_SHADOW}

        <g {...part("address")}>
          <IsoPipe d={ADDRESS_PIPE} />
          <IsoSolid box={ADDRESS} hue="entity" state={state("address")} />
          {ADDRESS_DETAIL}
        </g>

        {/* The account state: one slab per field; the slabs being examined
            in this step take a stronger blue. */}
        <g {...part("state")}>
          {SLAB_ORDER.map((field) => {
            const active = view.activeFields.includes(field)
            return (
              <g key={field}>
                <IsoSolid
                  box={SLABS[field]}
                  hue="entity"
                  state={stateHovered ? "hover" : active ? "lit" : "rest"}
                />
                {active && (
                  <polygon
                    points={SLABS[field].end}
                    className={anatomyStroke(
                      "entity",
                      stateHovered ? "hover" : "lit"
                    )}
                    style={{ fill: examined }}
                  />
                )}
              </g>
            )
          })}
        </g>

        {/* Storage: filled for a contract with stored values, empty for an
            EOA. Drawn after the pipe, so the storageRoot pipe runs into it. */}
        <g {...part("storageRoot")}>
          <IsoPipe d={STORAGE_PIPE} state={state("storageRoot")} />
        </g>
        <g {...part("storage")}>
          {TANK_FLANGE}
          <IsoCylinder
            geometry={TANK}
            hue="entity"
            clipId={`${id}-tank`}
            level={storageLevel}
            state={state("storage")}
          />
          {TANK_DETAIL}
        </g>

        <g {...part("codeHash")}>
          <IsoPipe d={CODE_PIPE} state={state("codeHash")} />
        </g>

        {/* EVM code: a block with its code cells, or an empty outline for an
            account with no code. */}
        <g {...part("code")}>
          {hasCode ? (
            <>
              <IsoSolid box={CODE} hue="entity" state={state("code")} />
              {CODE_DETAIL}
              <g className="stroke-diagram-line">
                {CODE_CELLS.map((cell) => (
                  <polygon
                    key={cell}
                    points={cell}
                    style={{ fill: anatomyFill("entity", "end", "lit") }}
                  />
                ))}
              </g>
            </>
          ) : (
            <g
              fill="none"
              strokeDasharray="3 3"
              className={cn(
                "[stroke-linejoin:round]",
                anatomyStroke("entity", state("code"))
              )}
            >
              {CODE_OUTLINE.map((face) => (
                <polygon key={face} points={face} fill="none" />
              ))}
            </g>
          )}
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
export default memo(AccountsRig)
