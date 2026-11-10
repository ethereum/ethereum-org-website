import { memo, type ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
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
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  VALIDATOR_KEYS_SIZE,
  type ValidatorKeysFigure,
  type ValidatorKeysPart,
  type ValidatorKeysRigView,
} from "./model"

/*
 * Isometric drawing for the validator key figures, on the shared anatomy
 * primitives. Server-rendered with the player.
 *
 * Things move from back-left to front-right. At the back stands the source:
 * the staker's wallet (deposit figure) or the mnemonic (derivation figure,
 * with the master key m where its paths branch). In the middle, the deposit
 * contract (deposit figure only). Along the front right, three validators,
 * each carrying its signing key (the cube), with its withdrawal key (the
 * flat slab) on the plate in front of it, off the machine, joined to it by a
 * short pipe. Behind them, the withdrawal address link runs back to the
 * wallet.
 */

const { width: W, height: H } = VALIDATOR_KEYS_SIZE
const PROJECTION = isoProjection(204, 50)
const { P, path, box, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "validator-keys-shadow"

type Dims = [number, number, number, number, number, number]

/* ---------- Geometry ---------- */

const PLATE_W = 240
const PLATE_D = 158
const PLATE = box(0, 0, -8, PLATE_W, PLATE_D, 8)

const LANE_Y = 81
const WALLET: Dims = [12, 66, 0, 32, 30, 22]
const MNEMONIC: Dims = [8, 63, 0, 40, 36, 9]
const CONTRACT: Dims = [88, 69, 0, 26, 24, 28]

const ROW_Y = [24, 70, 116]
const ROW_D = 22
const ROW_CENTRE = ROW_Y.map((y) => y + ROW_D / 2)
const VAL_X = 160
const VAL_W = 36
const VAL_H = 16
const validatorDims = (y: number): Dims => [VAL_X, y, 0, VAL_W, ROW_D, VAL_H]
const signingDims = (y: number): Dims => [180, y + 5, VAL_H, 12, 12, 9]
// Withdrawal keys sit on the plate beside their validators (cold storage,
// off the machine), each joined to its validator by a short pipe.
const WD_X = 204
const withdrawalDims = (y: number): Dims => [WD_X, y + 9, 0, 16, 10, 5]
const balanceDims = (y: number): Dims => [164, y + 6, VAL_H, 10, 10, 8]

const VALIDATORS = ROW_Y.map((y) => box(...validatorDims(y)))
const SIGNING = ROW_Y.map((y) => box(...signingDims(y)))
const WITHDRAWAL = ROW_Y.map((y) => box(...withdrawalDims(y)))
const BALANCE = ROW_Y.map((y) => box(...balanceDims(y)))
// A signed message on each signing key while it signs, and on each
// withdrawal key while it signs the credentials change.
const SLIPS = ROW_Y.map((y) => box(183, y + 8, VAL_H + 11, 6, 6, 2.5))
const CHANGE_SLIPS = ROW_Y.map((y) => box(WD_X + 5, y + 11, 7, 6, 6, 2.5))
// Each withdrawal key's short pipe to its validator: in the derivation
// figure, the signing key's path one level down.
const KEY_LINK = ROW_Y.map((y) =>
  path(4, [WD_X, y + 14], [VAL_X + VAL_W, y + 14])
)

const PIPE_Z = 8
const BUS_X = 136
// Wallet to deposit contract (deposits, orange: value).
const DEPOSIT = path(PIPE_Z, [44, LANE_Y], [88, LANE_Y])
// Contract out to each validator (the beacon chain picking up deposits).
const FAN = ROW_CENTRE.map((c) =>
  path(PIPE_Z, [114, LANE_Y], [BUS_X, LANE_Y], [BUS_X, c], [VAL_X, c])
).join(" ")
// Derivation: the mnemonic to the master key m, then m's paths to each
// withdrawal key.
const MASTER: Dims = [BUS_X - 6, LANE_Y - 6, 0, 12, 12, 10]
const TO_MASTER = path(PIPE_Z, [48, LANE_Y], [MASTER[0], LANE_Y])
// Each path runs in the gap in front of its validator, round to the front
// of its withdrawal key.
const PATHS = ROW_Y.map((y) =>
  path(
    PIPE_Z,
    [BUS_X, LANE_Y],
    [BUS_X, y + ROW_D + 12],
    [WD_X + 8, y + ROW_D + 12],
    [WD_X + 8, y + 19]
  )
).join(" ")

// The withdrawal address link: from each validator's end face to a bus on
// the right, then round the back of the plate (inside its inset line) to the
// wallet. In two parts so the back run is painted behind the validators and
// the bus in front.
const LINK_Z = 6
const LINK_X = 232
const LINK_BACK_Y = 14
// Stubs leave near each validator's back edge, behind its withdrawal key.
const LINK_FRONT = ROW_Y.map((y) =>
  path(LINK_Z, [VAL_X + VAL_W, y + 3], [LINK_X, y + 3], [LINK_X, LINK_BACK_Y])
).join(" ")
const LINK_BACK = path(
  LINK_Z,
  [LINK_X, LINK_BACK_Y],
  [28, LINK_BACK_Y],
  [28, WALLET[1]]
)

/* ---------- Static detail and shadows (built once, never re-rendered) ---------- */

const GROUND_SHADOW = isoShadow(
  footprint(-4, 4, PLATE_W + 8, PLATE_D + 6, -22, 6),
  SHADOW
)
const contact = ([x, y, , w, d]: Dims, pad = 3) =>
  isoShadow(footprint(x, y, w, d, 0, pad), SHADOW)
const SOURCE_SHADOW = {
  wallet: contact(WALLET, 4),
  mnemonic: contact(MNEMONIC, 4),
}
const CONTRACT_SHADOW = contact(CONTRACT, 4)
const VALIDATOR_SHADOWS = (
  <g className="pointer-events-none">
    {ROW_Y.map((y) => (
      <g key={y}>{contact(validatorDims(y))}</g>
    ))}
  </g>
)
const PLATE_DETAIL = D.inset([0, 0, 0, PLATE_W, PLATE_D], 5)
const WALLET_DETAIL = (
  <>
    {D.seams(WALLET, { end: [0.5] })}
    {D.plate(WALLET[1] + WALLET[4], 18, 38, 8, 15)}
  </>
)
// Word lines on the mnemonic's top.
const MNEMONIC_DETAIL = (
  <>
    {[73, 81, 89].map((y) => (
      <g key={y}>{D.slot(MNEMONIC[5], 14, 42, y)}</g>
    ))}
  </>
)
const CONTRACT_DETAIL = (
  <>
    {D.seams(CONTRACT, { end: [0.5], ring: 0.82 })}
    {D.plate(CONTRACT[1] + CONTRACT[4], 92, 110, 6, 14)}
  </>
)
const VALIDATOR_DETAIL = ROW_Y.map((y) => (
  <g key={y}>{D.vents(y + ROW_D, VAL_X + 22, VAL_X + 32, [5, 9])}</g>
))

/* ---------- Labels: outside the plate, short leaders ---------- */

const SPOT: Record<ValidatorKeysPart, AnatomyLabelSpot> = {
  validators: {
    id: "validators",
    tone: "entity",
    target: P(178, ROW_Y[2] + ROW_D, 6),
    anchor: [214, 262],
    placement: "below",
  },
  signing: {
    id: "signing",
    tone: "entity",
    target: P(186, ROW_Y[0] + 5, VAL_H + 9),
    anchor: [372, 96],
    placement: "above",
  },
  withdrawal: {
    id: "withdrawal",
    tone: "entity",
    target: P(WD_X + 2, ROW_Y[2] + 19, 3),
    anchor: [300, 270],
    placement: "below",
  },
  balance: {
    id: "balance",
    tone: "entity",
    target: P(169, ROW_Y[0] + 6, VAL_H + 8),
    anchor: [340, 70],
    placement: "above",
  },
  wallet: {
    id: "wallet",
    tone: "entity",
    target: P(20, 73, WALLET[5]),
    anchor: [130, 58],
    placement: "above",
  },
  mnemonic: {
    id: "mnemonic",
    tone: "entity",
    target: P(20, 70, MNEMONIC[5]),
    anchor: [130, 66],
    placement: "above",
  },
  master: {
    id: "master",
    tone: "entity",
    target: P(BUS_X, LANE_Y - 6, MASTER[5]),
    anchor: [240, 40],
    placement: "above",
  },
  contract: {
    id: "contract",
    tone: "entity",
    target: P(100, CONTRACT[1] + CONTRACT[4], 12),
    anchor: [120, 224],
    placement: "below",
  },
  paths: {
    id: "paths",
    tone: "neutral",
    target: P(150, ROW_Y[2] + ROW_D + 12, PIPE_Z),
    anchor: [150, 214],
    placement: "start",
  },
  payout: {
    id: "payout",
    tone: "neutral",
    target: P(120, LINK_BACK_Y, LINK_Z),
    anchor: [300, 48],
    placement: "above",
  },
}

// The derivation figure runs its paths along the front, so its validators
// label goes to the back and its withdrawal key label off a slab's end.
const DERIVE_SPOT = {
  validators: {
    ...SPOT.validators,
    target: P(165, ROW_Y[0], VAL_H),
    anchor: [300, 60],
    placement: "above",
  },
  withdrawal: {
    ...SPOT.withdrawal,
    target: P(WD_X + 16, ROW_Y[2] + 14, 3),
    anchor: [360, 258],
    placement: "below",
  },
} satisfies Partial<Record<ValidatorKeysPart, AnatomyLabelSpot>>

// In priority order; each figure labels only what it draws.
const SPOTS: Record<ValidatorKeysFigure, AnatomyLabelSpot[]> = {
  deposit: (
    [
      "validators",
      "signing",
      "withdrawal",
      "balance",
      "wallet",
      "contract",
      "payout",
    ] as const
  ).map((id) => SPOT[id]),
  derive: (
    [
      "mnemonic",
      "master",
      "withdrawal",
      "signing",
      "validators",
      "paths",
    ] as const
  ).map((id) =>
    id === "validators" || id === "withdrawal" ? DERIVE_SPOT[id] : SPOT[id]
  ),
}

interface ValidatorKeysRigProps {
  view: ValidatorKeysRigView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Partial<Record<ValidatorKeysPart, ReactNode>>
  definitions: Partial<Record<ValidatorKeysPart, ReactNode>>
  className?: string
}

const POP =
  "animate-diagram-pop [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none"

function ValidatorKeysRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: ValidatorKeysRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: ValidatorKeysPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const deposit = view.figure === "deposit"
  // A key pops in on the step that derives it.
  const pops = (motion: string) => view.motion === motion
  const linkShown = view.link !== "none"

  // Label only what's drawn.
  const { figure, signingShown, withdrawalShown, balanceShown, masterShown } =
    view
  const spots = useMemo(
    () =>
      SPOTS[figure].filter(
        ({ id }) =>
          (id !== "signing" || signingShown) &&
          (id !== "withdrawal" || withdrawalShown) &&
          (id !== "balance" || balanceShown) &&
          (id !== "master" || masterShown) &&
          (id !== "payout" || linkShown) &&
          (id !== "paths" || view.pathsShown)
      ),
    [
      figure,
      signingShown,
      withdrawalShown,
      balanceShown,
      masterShown,
      linkShown,
      view.pathsShown,
    ]
  )

  const link = (d: string) => (
    <g {...part("payout")}>
      <IsoPipe
        hue="gas"
        d={d}
        flowing={view.flow === "payout"}
        flowKey={runKey}
        flowDelay={d === LINK_BACK ? 500 : undefined}
        state={state("payout")}
      />
    </g>
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
        <IsoDefs id={SHADOW} />
        {GROUND_SHADOW}
        <IsoPlate box={PLATE} />
        {PLATE_DETAIL}
        {SOURCE_SHADOW[view.source]}
        {deposit && CONTRACT_SHADOW}
        {VALIDATOR_SHADOWS}

        {/* The withdrawal address link's run behind the validators. */}
        {linkShown && link(LINK_BACK)}

        {/* The source: wallet or mnemonic. */}
        {deposit ? (
          <g {...part("wallet")}>
            <IsoSolid
              box={box(...WALLET)}
              hue="entity"
              state={state("wallet")}
            />
            {WALLET_DETAIL}
            <IsoPipe
              d={DEPOSIT}
              flowing={view.flow === "deposit"}
              flowKey={runKey}
              state={state("wallet")}
            />
          </g>
        ) : (
          <g {...part("mnemonic")}>
            <IsoSolid
              box={box(...MNEMONIC)}
              hue="entity"
              state={state("mnemonic")}
            />
            {MNEMONIC_DETAIL}
          </g>
        )}

        {deposit && (
          <g {...part("contract")}>
            <IsoSolid
              box={box(...CONTRACT)}
              hue="entity"
              state={state("contract")}
            />
            {CONTRACT_DETAIL}
          </g>
        )}
        {deposit && (
          // The beacon chain picking up the deposits: part of the validators.
          <g {...part("validators")}>
            <IsoPipe
              hue="entity"
              d={FAN}
              flowing={view.flow === "activate"}
              flowKey={runKey}
              state={state("validators")}
            />
          </g>
        )}
        {view.pathsShown && (
          <g {...part("paths")}>
            <IsoPipe
              hue="entity"
              d={PATHS}
              flowing={view.flow === "derive"}
              flowKey={runKey}
              state={state("paths")}
            />
          </g>
        )}
        {view.masterShown && (
          <g {...part("master")}>
            <IsoPipe d={TO_MASTER} state={state("master")} />
            <g
              key={pops("seed") ? runKey : "master"}
              className={cn(pops("seed") && POP)}
            >
              <IsoSolid
                box={box(...MASTER)}
                hue="entity"
                state={state("master")}
              />
            </g>
          </g>
        )}

        {ROW_Y.map((y, i) => (
          <g key={y}>
            <g
              data-part="validators"
              className={cn(
                ISO_DIM_CLASS,
                "transition-opacity duration-500 motion-reduce:transition-none"
              )}
              style={{
                opacity: dimmed("validators")
                  ? 0.7
                  : view.validatorsActive
                    ? 1
                    : 0.45,
              }}
            >
              <IsoSolid
                box={VALIDATORS[i]}
                hue="entity"
                state={state("validators")}
              />
              {VALIDATOR_DETAIL[i]}
            </g>
            {view.signingShown && (
              <g {...part("signing")}>
                {!deposit && (
                  <IsoPipe d={KEY_LINK[i]} state={state("signing")} />
                )}
                <g
                  key={pops("signing") ? runKey : "signing"}
                  className={cn(pops("signing") && POP)}
                >
                  <IsoSolid
                    box={SIGNING[i]}
                    hue="entity"
                    state={state("signing")}
                  />
                </g>
                {view.slipsShown && (
                  <g key={runKey} className={cn("pointer-events-none", POP)}>
                    <IsoSolid box={SLIPS[i]} hue="entity" state="lit" />
                  </g>
                )}
              </g>
            )}
            {view.balanceShown && (
              <g {...part("balance")}>
                <g key={runKey} className={POP}>
                  <IsoSolid
                    box={BALANCE[i]}
                    hue="entity"
                    state={state("balance")}
                  />
                </g>
              </g>
            )}
            {view.withdrawalShown && (
              <g {...part("withdrawal")}>
                {deposit && (
                  <IsoPipe d={KEY_LINK[i]} state={state("withdrawal")} />
                )}
                <g
                  key={pops("withdrawal") ? runKey : "withdrawal"}
                  className={cn(pops("withdrawal") && POP)}
                >
                  <IsoSolid
                    box={WITHDRAWAL[i]}
                    hue="entity"
                    state={state("withdrawal")}
                  />
                </g>
                {view.changeShown && (
                  <g key={runKey} className={cn("pointer-events-none", POP)}>
                    <IsoSolid box={CHANGE_SLIPS[i]} hue="entity" state="lit" />
                  </g>
                )}
              </g>
            )}
          </g>
        ))}

        {/* The link's bus, in front of the validators. */}
        {linkShown && link(LINK_FRONT)}
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={spots}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(ValidatorKeysRig)
