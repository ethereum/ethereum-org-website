import { memo, type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
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
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  VAULT_FIGURE_PARTS,
  VAULT_FIGURES,
  VAULT_SIZE,
  type VaultFigure,
  type VaultLink,
  type VaultPart,
  type VaultRigView,
} from "./model"

/*
 * Isometric drawing of a tokenized vault. Server-rendered with the players.
 *
 * On the plate: the investor account at the back left, joined by two pipes
 * (assets at the back, shares in front) to the vault contract, which holds
 * the underlying asset in a tank and its share supply in a stack. The
 * ERC-4626 interface figure adds two meters on the vault's front: the
 * per-account limit and the exchange rate. The ERC-7540 figures add a
 * request tray in front of the vault, a pending and a claimable bay, and the
 * async flow a strategy to the right, where the vault puts assets to work.
 */

type Box = [number, number, number, number, number, number]

/* ---------- World geometry (shared by every figure) ---------- */

const INVESTOR_BOX: Box = [16, 26, 0, 44, 46, 40]
const VAULT_BOX: Box = [128, 18, 0, 80, 62, 30]
const TANK_AT = { x: 148, y: 40, r: 12, h: 24 }
const SLAB = { x: 172, y: 44, w: 26, d: 26, h: 4, gap: 5 }
const STACK_LAYERS = 3
const LIMIT_BOX: Box = [136, 80, 6, 24, 5, 16]
const RATE_BOX: Box = [170, 80, 6, 28, 5, 16]
const BAY_BOXES: Record<"pending" | "claimable", Box> = {
  pending: [130, 92, 0, 36, 24, 4],
  claimable: [170, 92, 0, 36, 24, 4],
}
const SLIP_BOX: Box = [138, 98, 4, 20, 12, 3]
const STRATEGY_BOX: Box = [256, 24, 0, 44, 44, 34]
const LANE = { assets: 36, shares: 62, strategy: 46, z: 14 }

interface FigureLayout {
  origin: [number, number]
  plate: [number, number]
  meters: boolean
  tray: boolean
  strategy: boolean
}

const LAYOUT: Record<VaultFigure, FigureLayout> = {
  interface: {
    origin: [145, 52],
    plate: [224, 100],
    meters: true,
    tray: false,
    strategy: false,
  },
  sync: {
    origin: [148, 52],
    plate: [224, 92],
    meters: false,
    tray: false,
    strategy: false,
  },
  async: {
    origin: [122, 50],
    plate: [316, 124],
    meters: false,
    tray: true,
    strategy: true,
  },
  lifecycle: {
    origin: [142, 50],
    plate: [224, 124],
    meters: false,
    tray: true,
    strategy: false,
  },
}

/** Everything a figure draws, projected once at module level. */
function buildFigure(figure: VaultFigure) {
  const layout = LAYOUT[figure]
  const proj = isoProjection(...layout.origin)
  const { P, path, box, cylinder, footprint } = proj
  const D = isoDetail(proj)
  const [pw, pd] = layout.plate
  const shadow = `token-vault-${figure}-shadow`
  const tank = cylinder(
    TANK_AT.x,
    TANK_AT.y,
    VAULT_BOX[5],
    TANK_AT.r,
    TANK_AT.h
  )
  const slab = (i: number) =>
    box(SLAB.x, SLAB.y, VAULT_BOX[5] + i * SLAB.gap, SLAB.w, SLAB.d, SLAB.h)

  const lane = (y: number, x0: number, x1: number) => ({
    d: path(LANE.z, [x0, y], [x1, y]),
    back: path(LANE.z, [x1, y], [x0, y]),
  })
  const links: Record<VaultLink, { d: string; back: string }> = {
    // The investor's end face into the vault's hidden face.
    assets: lane(LANE.assets, 60, 128),
    shares: lane(LANE.shares, 60, 128),
    // The vault's end face into the strategy's hidden face.
    strategy: lane(LANE.strategy, 208, 256),
  }
  // The slip's move from the pending bay to the claimable one, on screen.
  const [x0, y0] = P(0, 0)
  const [x1, y1] = P(40, 0)

  return {
    layout,
    P,
    shadow,
    plate: box(0, 0, -6, pw, pd, 6),
    investor: box(...INVESTOR_BOX),
    vault: box(...VAULT_BOX),
    tank,
    slabs: Array.from({ length: STACK_LAYERS + 1 }, (_, i) => slab(i)),
    limit: box(...LIMIT_BOX),
    rate: box(...RATE_BOX),
    bays: {
      pending: box(...BAY_BOXES.pending),
      claimable: box(...BAY_BOXES.claimable),
    },
    slip: box(...SLIP_BOX),
    slipShift: [x1 - x0, y1 - y0] as Point,
    strategy: box(...STRATEGY_BOX),
    links,
    groundShadow: (
      <g className="pointer-events-none">
        {isoShadow(footprint(4, 4, pw, pd, -22, 6), shadow)}
      </g>
    ),
    contactShadows: (
      <g className="pointer-events-none">
        {isoShadow(footprint(18, 28, 44, 46, 0, 4), shadow)}
        {isoShadow(footprint(130, 20, 80, 62, 0, 5), shadow)}
        {layout.strategy && isoShadow(footprint(258, 26, 44, 44, 0, 4), shadow)}
      </g>
    ),
    detail: {
      plate: D.inset([0, 0, 0, pw, pd], 5),
      investor: (
        <>
          {D.seams(INVESTOR_BOX, { end: [0.5], ring: 0.12 })}
          {D.plate(72, 24, 52, 22, 32)}
        </>
      ),
      vault: (
        <>
          {D.seams(VAULT_BOX, { end: [0.3, 0.7], ring: 0.14 })}
          {!layout.meters && D.plate(80, 150, 186, 12, 22)}
        </>
      ),
      tank: D.cylinderMarks(tank, { marks: 2 }),
      limit: D.slot(14, 140, 156, 85),
      rate: D.slot(14, 174, 194, 85),
      strategy: (
        <>
          {D.seams(STRATEGY_BOX, { end: [0.5], ring: 0.7 })}
          {D.vents(68, 262, 294, [10, 14, 18])}
        </>
      ),
      tray: (
        <>
          {D.inset([130, 92, 4, 36, 24], 3)}
          {D.inset([170, 92, 4, 36, 24], 3)}
        </>
      ),
      slip: (
        <>
          {D.slot(7, 142, 154, 101)}
          {D.slot(7, 142, 150, 105)}
        </>
      ),
    },
    spots: buildSpots(figure, P),
  }
}

/* ---------- Labels ---------- */

function buildSpots(
  figure: VaultFigure,
  P: (x: number, y: number, z?: number) => Point
): AnatomyLabelSpot[] {
  const { height: H } = VAULT_SIZE[figure]
  const parts = VAULT_FIGURE_PARTS[figure]
  const below = (
    id: VaultPart,
    tone: AnatomyLabelSpot["tone"],
    target: Point,
    dx = 0
  ): AnatomyLabelSpot => ({
    id,
    tone,
    target,
    ...(dx ? { elbow: [target[0] + dx, target[1]] as Point } : {}),
    anchor: [target[0] + dx, H - 30],
    placement: "below",
  })
  const above = (
    id: VaultPart,
    tone: AnatomyLabelSpot["tone"],
    target: Point,
    y: number,
    dx = 0
  ): AnatomyLabelSpot => ({
    id,
    tone,
    target,
    ...(dx ? { elbow: [target[0] + dx, target[1]] as Point } : {}),
    anchor: [target[0] + dx, y],
    placement: "above",
  })
  const investorAt = P(16, 72, 20)
  const all: AnatomyLabelSpot[] = [
    {
      id: "investor",
      tone: "entity",
      target: investorAt,
      anchor: [investorAt[0] - 14, investorAt[1]],
      placement: "start",
    },
    above("assets", "gas", P(148, 40, 54), 22),
    above("shares", "entity", P(198, 44, 45), 40, 34),
    below("limit", "entity", P(137, 85, 6), -44),
    below("rate", "entity", P(184, 85, 6)),
    below("pending", "entity", P(148, 116, 0), -40),
    below("claimable", "entity", P(188, 116, 0), 6),
    below("strategy", "entity", P(300, 68, 0)),
    below("vault", "entity", P(208, 60, 0), figure === "interface" ? 36 : 8),
  ]
  return all.filter((spot) => parts.includes(spot.id as VaultPart))
}

const FIGURES = Object.fromEntries(
  VAULT_FIGURES.map((figure) => [figure, buildFigure(figure)])
) as Record<VaultFigure, ReturnType<typeof buildFigure>>

/* ---------- Rig ---------- */

interface TokenVaultRigProps {
  view: VaultRigView
  labels: Partial<Record<VaultPart, ReactNode>>
  definitions: Partial<Record<VaultPart, ReactNode>>
  className?: string
}

/** ms a flow takes to reach the far end of its pipe. */
const FLOW_MS = 700

function TokenVaultRig({
  view,
  labels,
  definitions,
  className,
}: TokenVaultRigProps) {
  const id = useId()
  const fig = FIGURES[view.figure]
  const { width: W, height: H } = VAULT_SIZE[view.figure]
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: VaultPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const runKey = `${view.figure}-${view.motion}`
  const delayOf = (link: VaultLink) =>
    view.secondFlow === link ? FLOW_MS : undefined
  const pipe = (link: VaultLink, owner: VaultPart) => {
    const flow = view.flows[link]
    return (
      <IsoPipe
        d={fig.links[link].d}
        flowD={flow === "back" ? fig.links[link].back : undefined}
        hue={link === "shares" ? "entity" : "gas"}
        flowing={!!flow}
        flowKey={runKey}
        flowDelay={delayOf(link)}
        state={state(owner)}
      />
    )
  }
  // The tank follows the flow that fills or drains it.
  const levelDelay =
    view.flows.assets || view.flows.strategy
      ? (delayOf("assets") ?? 0) + FLOW_MS
      : 0
  const supplyDelay = (delayOf("shares") ?? 0) + FLOW_MS
  const { layout } = fig
  const slipState =
    view.request === "pending"
      ? state("pending")
      : view.request === "claimable"
        ? state("claimable")
        : "rest"

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <IsoDefs id={fig.shadow} />
        {fig.groundShadow}
        <IsoPlate box={fig.plate} />
        {fig.detail.plate}
        {fig.contactShadows}

        <g {...part("investor")}>
          <IsoSolid box={fig.investor} hue="entity" state={state("investor")} />
          {fig.detail.investor}
        </g>

        <g {...part("assets")}>{pipe("assets", "assets")}</g>
        <g {...part("shares")}>{pipe("shares", "shares")}</g>

        <g {...part("vault")}>
          <IsoSolid box={fig.vault} hue="entity" state={state("vault")} />
          {fig.detail.vault}
        </g>

        <g {...part("assets")}>
          <IsoCylinder
            geometry={fig.tank}
            hue="gas"
            clipId={`${id}-tank`}
            level={view.level}
            levelDelay={levelDelay}
            state={state("assets")}
          />
          {fig.detail.tank}
        </g>

        <g {...part("shares")}>
          {fig.slabs.slice(0, STACK_LAYERS).map((slab, i) => (
            <g
              key={slab.top}
              className={cn(
                "transition-opacity duration-500 motion-reduce:transition-none",
                view.supply === "burned" &&
                  i === STACK_LAYERS - 1 &&
                  "opacity-0"
              )}
              style={{
                transitionDelay:
                  view.supply === "burned" ? `${supplyDelay}ms` : undefined,
              }}
            >
              <IsoSolid box={slab} hue="entity" state={state("shares")} />
            </g>
          ))}
          {view.supply === "minted" && (
            <g
              key={runKey}
              className="animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
              style={{ animationDelay: `${supplyDelay}ms` }}
            >
              <IsoSolid
                box={fig.slabs[STACK_LAYERS]}
                hue="entity"
                state={state("shares")}
              />
            </g>
          )}
        </g>

        {layout.meters && (
          <>
            <g {...part("limit")}>
              <IsoSolid box={fig.limit} hue="entity" state={state("limit")} />
              {fig.detail.limit}
            </g>
            <g {...part("rate")}>
              <IsoSolid box={fig.rate} hue="entity" state={state("rate")} />
              {fig.detail.rate}
            </g>
          </>
        )}

        {layout.strategy && (
          <>
            <g {...part("strategy")}>{pipe("strategy", "strategy")}</g>
            <g {...part("strategy")}>
              <IsoSolid
                box={fig.strategy}
                hue="entity"
                state={state("strategy")}
              />
              {fig.detail.strategy}
            </g>
          </>
        )}

        {layout.tray && (
          <>
            <g {...part("pending")}>
              <IsoSolid
                box={fig.bays.pending}
                hue="entity"
                state={state("pending")}
              />
            </g>
            <g {...part("claimable")}>
              <IsoSolid
                box={fig.bays.claimable}
                hue="entity"
                state={state("claimable")}
              />
            </g>
            {fig.detail.tray}
            {view.request && (
              <g
                data-part={view.request === "pending" ? "pending" : "claimable"}
                className={cn(
                  "transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none",
                  view.request === "claimed" && "opacity-0"
                )}
                style={{
                  transform:
                    view.request === "pending"
                      ? undefined
                      : `translate(${fig.slipShift[0]}px, ${fig.slipShift[1]}px)`,
                  transitionDelay:
                    view.request === "claimed" ? `${FLOW_MS}ms` : undefined,
                }}
              >
                <g
                  key={view.request === "pending" ? runKey : "slip"}
                  className={cn(
                    view.request === "pending" &&
                      "animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
                  )}
                  style={{
                    animationDelay:
                      view.request === "pending" ? `${FLOW_MS}ms` : undefined,
                  }}
                >
                  <IsoSolid box={fig.slip} hue="entity" state={slipState} />
                  {fig.detail.slip}
                </g>
              </g>
            )}
          </>
        )}
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={fig.spots}
        labels={labels as Record<string, ReactNode>}
        definitions={definitions as Record<string, ReactNode>}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the players re-render on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(TokenVaultRig)
