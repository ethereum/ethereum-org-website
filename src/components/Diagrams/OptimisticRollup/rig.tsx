import { memo, type ReactNode, useMemo } from "react"
import { useTranslations } from "next-intl"

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
  r1,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  BAD_STEP,
  BISECTION_ROUNDS,
  OPTIMISTIC_ROLLUP_SIZE,
  type RollupView,
  roundRuledOut,
  TRACE_STEPS,
  WINDOW_DAYS,
  ZK_ROLLUP_SIZE,
} from "./model"

/*
 * Two plates: L2 at the back left (transactions and the sequencer), L1 in
 * front right (the rollup contracts with the batch and state root on top,
 * the L1 account withdrawals go to). Optimistic: the bond tank, the
 * challenger on L1's front right, the disputed trace in front of the
 * contracts, and the challenge window as day cells along L1's front edge.
 * ZK: a prover in front of the sequencer and the verifier contract in front
 * of the rollup contract, on a shallower L1.
 */

const PROJECTION = isoProjection(194, 66)
const { P, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "optimistic-rollup-shadow"

type Dims = [number, number, number, number, number, number]

/* ---------- Geometry ---------- */

const L2_PLATE: Dims = [0, 0, -8, 96, 100, 8]
const L1_PLATE: Dims = [108, 0, -8, 142, 140, 8]

const SEQUENCER: Dims = [30, 8, 0, 48, 34, 24]
const TX_SLABS: Dims[] = [0, 4, 8].map((z) => [12, 60, z, 22, 16, 3])
const TXS_PIPE = path(5, [34, 68], [54, 68], [54, 42])

const CONTRACTS: Dims = [120, 8, 0, 52, 36, 18]
const BATCH_SLAB: Dims = [125, 13, 18, 20, 26, 4]
const ROOT_SLAB: Dims = [149, 13, 18, 18, 26, 7]
const BATCH_PIPE = path(10, [78, 24], [120, 24])

const ACCOUNT: Dims = [178, 76, 0, 22, 16, 12]
const ACCOUNT_PIPE = path(6, [166, 44], [166, 84], [178, 84])

const BOND_AT = { x: 196, y: 24, r: 9 }
const BOND = cylinder(BOND_AT.x, BOND_AT.y, 0, BOND_AT.r, 22)
const CHALLENGER: Dims = [216, 60, 0, 28, 20, 16]
const CHALLENGE_POINTS: [number, number][] = [
  [224, 60],
  [224, 40],
  [172, 40],
]
const CHALLENGE_PIPE = path(6, ...CHALLENGE_POINTS)
const CHALLENGE_PIPE_BACK = path(6, ...[...CHALLENGE_POINTS].reverse())
const REWARD_PIPE = path(4, [205, 24], [238, 24], [238, 60])

const TRACE_X = 118
const TRACE_PITCH = 11
const TRACE_CELL: (i: number) => Dims = (i) => [
  TRACE_X + i * TRACE_PITCH,
  100,
  0,
  8,
  10,
  6,
]
const BAD_X = TRACE_X + BAD_STEP * TRACE_PITCH + 4
const PROOF_PIPE = path(3, [BAD_X, 100], [BAD_X, 44])

const DAY_X = 124
const DAY_PITCH = 18
const DAY_CELL: (i: number) => Dims = (i) => [
  DAY_X + i * DAY_PITCH,
  120,
  0,
  14,
  10,
  3,
]

const L1_PLATE_ZK: Dims = [108, 0, -8, 112, 104, 8]
const PROVER: Dims = [60, 58, 0, 28, 24, 18]
const PROVER_PROOF: Dims = [66, 64, 18, 16, 12, 3]
const PROVER_PIPE = path(6, [70, 42], [70, 58])
const VERIFIER: Dims = [118, 66, 0, 32, 24, 16]
const VERIFIER_PROOF: Dims = [126, 72, 16, 16, 12, 3]
const PROOF_PIPE_ZK = path(6, [88, 74], [118, 74])
const VERDICT_PIPE = path(6, [134, 66], [134, 44])

const boxOf = (d: Dims) => box(...d)
const SEQUENCER_BOX = boxOf(SEQUENCER)
const TX_BOXES = TX_SLABS.map(boxOf)
const CONTRACTS_BOX = boxOf(CONTRACTS)
const BATCH_BOX = boxOf(BATCH_SLAB)
const ROOT_BOX = boxOf(ROOT_SLAB)
const ACCOUNT_BOX = boxOf(ACCOUNT)
const CHALLENGER_BOX = boxOf(CHALLENGER)
const TRACE_BOXES = Array.from({ length: TRACE_STEPS }, (_, i) =>
  boxOf(TRACE_CELL(i))
)
const DAY_BOXES = Array.from({ length: WINDOW_DAYS }, (_, i) =>
  boxOf(DAY_CELL(i))
)
const PROVER_BOX = boxOf(PROVER)
const PROVER_PROOF_BOX = boxOf(PROVER_PROOF)
const VERIFIER_BOX = boxOf(VERIFIER)
const VERIFIER_PROOF_BOX = boxOf(VERIFIER_PROOF)

// Day ticks under the window's first and last cell edges, on L1's front edge.
const TICK_DROP = 5
const TICK_TEXT_DROP = 16
const TICKS = [DAY_X, DAY_X + WINDOW_DAYS * DAY_PITCH - 4].map((x) =>
  P(x, L1_PLATE[1] + L1_PLATE[4], -8)
)
const TICK_MARKS = TICKS.map(([x, y]) => `M${x},${y} L${x},${y + TICK_DROP}`)

/* ---------- Static detail and shadows ---------- */

const L2_SHADOW = isoShadow(footprint(-4, 4, 104, 104, -22, 6), SHADOW)
const GROUND_SHADOW = (
  <g className="pointer-events-none">
    {L2_SHADOW}
    {isoShadow(footprint(104, 4, 150, 144, -22, 6), SHADOW)}
  </g>
)
const GROUND_SHADOW_ZK = (
  <g className="pointer-events-none">
    {L2_SHADOW}
    {isoShadow(footprint(104, 4, 120, 108, -22, 6), SHADOW)}
  </g>
)
const contact = ([x, y, , w, d]: Dims, pad = 3) =>
  isoShadow(footprint(x, y, w, d, 0, pad), SHADOW)
const SHARED_CONTACTS = (
  <>
    {contact(SEQUENCER)}
    {contact(TX_SLABS[0])}
    {contact(CONTRACTS)}
    {contact(ACCOUNT)}
  </>
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {SHARED_CONTACTS}
    {contact(CHALLENGER)}
    {isoShadow(footprint(187, 15, 18, 18), SHADOW)}
  </g>
)
const CONTACT_SHADOWS_ZK = (
  <g className="pointer-events-none">
    {SHARED_CONTACTS}
    {contact(PROVER)}
    {contact(VERIFIER)}
  </g>
)
const plateInset = ([x, y, , w, d]: Dims) => D.inset([x, y, 0, w, d], 5)
const L2_DETAIL = plateInset(L2_PLATE)
const PLATE_DETAIL = (
  <>
    {L2_DETAIL}
    {plateInset(L1_PLATE)}
  </>
)
const PLATE_DETAIL_ZK = (
  <>
    {L2_DETAIL}
    {plateInset(L1_PLATE_ZK)}
  </>
)
const L1_BOX = boxOf(L1_PLATE)
const L1_BOX_ZK = boxOf(L1_PLATE_ZK)
const L2_BOX = boxOf(L2_PLATE)
const SEQUENCER_DETAIL = (
  <>
    {D.seams(SEQUENCER, { start: [1 / 3, 2 / 3], ring: 0.75 })}
    {D.vents(SEQUENCER[1] + SEQUENCER[4], 38, 52, [6, 9, 12])}
  </>
)
const CONTRACTS_DETAIL = D.seams(CONTRACTS, { start: [0.5], end: [0.5] })
const ACCOUNT_DETAIL = D.seams(ACCOUNT, { start: [0.5] })
const CHALLENGER_DETAIL = D.seams(CHALLENGER, { start: [1 / 3, 2 / 3] })
const ROOT_DETAIL = D.inset([ROOT_SLAB[0], ROOT_SLAB[1], 25, 18, 26], 4)
const BOND_DETAIL = D.cylinderMarks(BOND)
const PROVER_DETAIL = (
  <>
    {D.seams(PROVER, { start: [0.5] })}
    {D.vents(PROVER[1] + PROVER[4], 64, 74, [5, 8, 11])}
  </>
)
const VERIFIER_DETAIL = D.seams(VERIFIER, { start: [0.5], end: [0.5] })

// Invisible boxes where the day names sit, so labels keep off them.
const TICK_KEEP_OUT = TICKS.map(([x, y]) => (
  <rect
    key={x}
    x={r1(x - 24)}
    y={y + TICK_TEXT_DROP - 8}
    width={48}
    height={16}
    stroke="none"
    style={{ fill: "transparent" }}
  />
))

/** Where the "Reverted" tag sits: above the state root. */
const REVERTED_AT = P(158, 26, 40)

/* ---------- Labels: outside the plates, short leaders ---------- */

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "sequencer",
    tone: "entity",
    target: P(SEQUENCER[0] + 4, SEQUENCER[1], SEQUENCER[5]),
    anchor: [196, 30],
    placement: "above",
  },
  {
    id: "state-root",
    tone: "entity",
    target: P(ROOT_SLAB[0] + 10, ROOT_SLAB[1], 25),
    anchor: [346, 96],
    placement: "above",
  },
  {
    id: "challenger",
    tone: "entity",
    target: P(CHALLENGER[0] + CHALLENGER[3], CHALLENGER[1] + 10, 8),
    anchor: [440, 244],
    placement: "below",
  },
  {
    id: "contracts",
    tone: "entity",
    target: P(CONTRACTS[0] + CONTRACTS[3], 22, 12),
    anchor: [410, 120],
    placement: "above",
  },
  {
    id: "window",
    tone: "entity",
    target: P(DAY_X + 3 * DAY_PITCH + 7, 130, 0),
    anchor: [204, 262],
    placement: "below",
  },
  {
    id: "batch",
    tone: "entity",
    target: P(BATCH_SLAB[0] + 10, BATCH_SLAB[1], 22),
    anchor: [300, 70],
    placement: "above",
  },
  {
    id: "bond",
    tone: "gas",
    target: P(BOND_AT.x + BOND_AT.r, BOND_AT.y, 11),
    anchor: [440, 162],
    placement: "above",
  },
  {
    id: "trace",
    tone: "entity",
    target: P(TRACE_X, 104, 2),
    anchor: [160, 200],
    placement: "start",
  },
  {
    id: "account",
    tone: "entity",
    target: P(ACCOUNT[0] + 11, ACCOUNT[1] + ACCOUNT[4], 4),
    anchor: [356, 256],
    placement: "below",
  },
  {
    id: "txs",
    tone: "entity",
    target: P(TX_SLABS[0][0], 70, 6),
    anchor: [112, 98],
    placement: "start",
  },
  {
    id: "l2",
    tone: "neutral",
    target: P(40, 100, -4),
    anchor: [110, 160],
    placement: "start",
  },
  {
    id: "l1",
    tone: "neutral",
    target: P(L1_PLATE[0] + L1_PLATE[3], 10, -4),
    anchor: [452, 194],
    placement: "below",
  },
]

const spot = (id: string) => SPOTS.find((s) => s.id === id)!

const ZK_SPOTS: AnatomyLabelSpot[] = [
  spot("sequencer"),
  {
    id: "verifier",
    tone: "entity",
    target: P(VERIFIER[0] + 26, VERIFIER[1] + VERIFIER[4], 8),
    anchor: [262, 250],
    placement: "below",
  },
  spot("state-root"),
  {
    id: "prover",
    tone: "entity",
    target: P(PROVER[0] + 10, PROVER[1] + PROVER[4], 9),
    anchor: [140, 196],
    placement: "start",
  },
  spot("contracts"),
  spot("batch"),
  // On the pipe to the verifier: every leader from the proof on the prover
  // or the verifier would cross a part, so it is labelled once posted.
  {
    id: "proof",
    tone: "entity",
    target: P(102, 74, 6),
    anchor: [170, 230],
    placement: "below",
  },
  {
    ...spot("account"),
    anchor: [370, 236],
  },
  spot("txs"),
  spot("l2"),
  {
    ...spot("l1"),
    target: P(L1_PLATE_ZK[0] + L1_PLATE_ZK[3], 10, -4),
    anchor: [430, 200],
  },
]

interface OptimisticRollupRigProps {
  /** An optimistic or a ZK rollup batch. */
  view: RollupView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<string, ReactNode>
  definitions: Record<string, ReactNode>
  /** "Day {day}" for the challenge window's ticks (optimistic only). */
  dayLabel?: (day: number) => string
  className?: string
}

const POP =
  "animate-diagram-pop [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none"
const FADE =
  "transition-opacity duration-500 ease-out motion-reduce:transition-none"
/** Deleted state root: faded, its outline dashed. */
const FADED = { opacity: 0.45, strokeDasharray: "3 3" } as const
/** ms between window days lighting up, and between bisection rounds. */
const DAY_MS = 250
const ROUND_MS = 600
/** The proof's flow reaches L1 before the outcome shows. */
const OUTCOME_MS = 700

const pct = (n: number, of: number) => `${r1((n / of) * 100)}%`

function OptimisticRollupRig({
  view,
  runKey,
  labels,
  definitions,
  dayLabel,
  className,
}: OptimisticRollupRigProps) {
  const t = useTranslations("component-diagrams")
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: string) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const opt = view.kind === "optimistic" ? view : null
  const zk = view.kind === "zk" ? view : null
  const { motion, posted } = view
  const { width: W, height: H } = zk ? ZK_ROLLUP_SIZE : OPTIMISTIC_ROLLUP_SIZE
  const traceShown = opt?.traceShown ?? false
  const proofAt = zk?.proofAt ?? "none"
  const proving = motion === "prove" && !!opt
  const rejected = zk?.proof === "rejected"
  const reverted = view.root === "reverted"
  // Optimistic: the one-step proof's flow; ZK: the outcome right away.
  const outcomeDelay = proving ? OUTCOME_MS : 0
  const daysLit = opt?.day ?? 0
  const pctX = (n: number) => pct(n, W)
  const pctY = (n: number) => pct(n, H)

  const labelSpots = useMemo(
    () =>
      zk
        ? ZK_SPOTS.filter(
            (s) =>
              (s.id !== "state-root" || posted) &&
              (s.id !== "batch" || posted) &&
              (s.id !== "proof" || posted)
          )
        : SPOTS.filter(
            ({ id }) =>
              (id !== "trace" || traceShown) &&
              (id !== "state-root" || posted) &&
              (id !== "batch" || posted) &&
              (id !== "bond" || posted)
          ),
    [zk, posted, traceShown]
  )

  const popAt = (when: boolean, key: string, delay: number) => ({
    key: when ? runKey : key,
    className: cn(when && POP),
    style: when ? { animationDelay: `${delay}ms` } : undefined,
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
        {zk ? GROUND_SHADOW_ZK : GROUND_SHADOW}
        <g {...part("l2")}>
          <IsoPlate box={L2_BOX} state={state("l2")} />
        </g>
        <g {...part("l1")}>
          <IsoPlate box={zk ? L1_BOX_ZK : L1_BOX} state={state("l1")} />
        </g>
        {zk ? PLATE_DETAIL_ZK : PLATE_DETAIL}
        {zk ? CONTACT_SHADOWS_ZK : CONTACT_SHADOWS}
        {opt && (
          <>
            <path
              d={TICK_MARKS.join(" ")}
              className="stroke-diagram-line"
              style={{ fill: "none" }}
            />
            {TICK_KEEP_OUT}
          </>
        )}

        <g {...part("sequencer")}>
          <IsoSolid
            box={SEQUENCER_BOX}
            hue="entity"
            state={state("sequencer")}
          />
          {SEQUENCER_DETAIL}
        </g>

        <g {...part("txs")}>
          {TX_BOXES.map((b, i) => (
            <IsoSolid key={i} box={b} hue="entity" state={state("txs")} />
          ))}
          <IsoPipe
            hue="entity"
            d={TXS_PIPE}
            flowing={motion === "execute" || motion === "execute-bad"}
            flowKey={runKey}
            state={state("txs")}
          />
        </g>

        {zk && (
          <g {...part("prover")}>
            <IsoPipe
              hue="entity"
              d={PROVER_PIPE}
              flowing={motion === "prove" || motion === "prove-bad"}
              flowKey={runKey}
              state={state("prover")}
            />
            <IsoSolid box={PROVER_BOX} hue="entity" state={state("prover")} />
            {PROVER_DETAIL}
          </g>
        )}
        {proofAt === "prover" && (
          <g {...part("proof")}>
            <g {...popAt(true, "proof", 600)}>
              <IsoSolid
                box={PROVER_PROOF_BOX}
                hue="entity"
                state={state("proof")}
              />
            </g>
          </g>
        )}

        <g {...part("batch")}>
          <IsoPipe
            hue="entity"
            d={BATCH_PIPE}
            flowing={motion === "post" || motion === "post-bad"}
            flowKey={runKey}
            state={state("batch")}
          />
        </g>

        <g {...part("contracts")}>
          <IsoSolid
            box={CONTRACTS_BOX}
            hue="entity"
            state={state("contracts")}
          />
          {CONTRACTS_DETAIL}
        </g>

        {posted && (
          <g {...part("batch")}>
            <g
              {...popAt(
                motion === "post" || motion === "post-bad",
                "batch",
                600
              )}
            >
              <IsoSolid box={BATCH_BOX} hue="entity" state={state("batch")} />
            </g>
          </g>
        )}
        {posted && (
          <g {...part("state-root")}>
            <g
              {...popAt(
                motion === "post" || motion === "post-bad",
                "root",
                800
              )}
            >
              <g
                className={FADE}
                style={{
                  ...(reverted ? FADED : {}),
                  transitionDelay: `${outcomeDelay}ms`,
                }}
              >
                <IsoSolid
                  box={ROOT_BOX}
                  hue="entity"
                  state={state("state-root")}
                  className={cn(
                    reverted &&
                      state("state-root") !== "hover" &&
                      "stroke-diagram-revert"
                  )}
                />
                {ROOT_DETAIL}
              </g>
            </g>
          </g>
        )}

        <g {...part("account")}>
          <IsoPipe
            d={ACCOUNT_PIPE}
            flowing={motion === "finalize"}
            flowDelay={zk ? 400 : undefined}
            flowKey={runKey}
            state={state("account")}
          />
        </g>

        {zk && (
          <>
            <g {...part("verifier")}>
              <IsoPipe
                hue="entity"
                d={VERDICT_PIPE}
                flowing={motion === "verify"}
                flowDelay={400}
                flowKey={runKey}
                state={state("verifier")}
              />
            </g>
            <g {...part("proof")}>
              <IsoPipe
                hue="entity"
                d={PROOF_PIPE_ZK}
                flowing={motion === "post" || motion === "post-bad"}
                flowKey={runKey}
                state={state("proof")}
              />
            </g>
            <g {...part("verifier")}>
              <IsoSolid
                box={VERIFIER_BOX}
                hue="entity"
                state={state("verifier")}
                className={cn(
                  rejected &&
                    state("verifier") !== "hover" &&
                    "stroke-diagram-revert"
                )}
              />
              {VERIFIER_DETAIL}
            </g>
            {proofAt === "verifier" && (
              <g {...part("proof")}>
                <g
                  {...popAt(
                    motion === "post" || motion === "post-bad",
                    "proof",
                    600
                  )}
                >
                  <g className={FADE} style={rejected ? FADED : undefined}>
                    <IsoSolid
                      box={VERIFIER_PROOF_BOX}
                      hue="entity"
                      state={state("proof")}
                      className={cn(
                        rejected &&
                          state("proof") !== "hover" &&
                          "stroke-diagram-revert"
                      )}
                    />
                  </g>
                </g>
              </g>
            )}
          </>
        )}

        {opt && (
          <>
            <g {...part("bond")}>
              <IsoCylinder
                geometry={BOND}
                hue="gas"
                clipId={`${SHADOW}-bond`}
                level={posted && opt.bond !== "slashed" ? 1 : 0}
                levelDelay={motion === "post" ? 600 : outcomeDelay}
                state={state("bond")}
              />
              {BOND_DETAIL}
              <IsoPipe
                d={REWARD_PIPE}
                flowing={proving}
                flowDelay={OUTCOME_MS}
                flowKey={runKey}
                state={state("bond")}
              />
            </g>

            <g {...part("challenger")}>
              <IsoPipe
                hue="entity"
                d={CHALLENGE_PIPE}
                flowing={
                  motion === "check" ||
                  motion === "challenge" ||
                  motion === "bisect"
                }
                // Checking reads the batch from L1; disputing writes to it.
                flowD={motion === "check" ? CHALLENGE_PIPE_BACK : undefined}
                flowKey={runKey}
                state={state("challenger")}
              />
              <IsoSolid
                box={CHALLENGER_BOX}
                hue="entity"
                state={state("challenger")}
              />
              {CHALLENGER_DETAIL}
            </g>
          </>
        )}

        <g {...part("account")}>
          <IsoSolid box={ACCOUNT_BOX} hue="entity" state={state("account")} />
          {ACCOUNT_DETAIL}
        </g>

        {opt && traceShown && (
          <g {...part("trace")}>
            {opt.rounds === BISECTION_ROUNDS && (
              <IsoPipe
                hue="entity"
                d={PROOF_PIPE}
                flowing={proving}
                flowKey={runKey}
                state={state("trace")}
              />
            )}
            <g {...popAt(motion === "challenge", "trace", 700)}>
              {TRACE_BOXES.map((b, i) => {
                const out = roundRuledOut(i)
                const ruledOut =
                  opt.rounds !== null && out > 0 && out <= opt.rounds
                return (
                  <g
                    key={i}
                    className={FADE}
                    style={{
                      opacity: ruledOut ? 0.25 : 1,
                      transitionDelay:
                        motion === "bisect" && ruledOut
                          ? `${(out - 1) * ROUND_MS}ms`
                          : "0ms",
                    }}
                  >
                    <IsoSolid
                      box={b}
                      hue="entity"
                      state={
                        i === BAD_STEP && opt.rounds === BISECTION_ROUNDS
                          ? "lit"
                          : state("trace")
                      }
                    />
                  </g>
                )
              })}
            </g>
          </g>
        )}

        {opt && (
          <g {...part("window")}>
            {DAY_BOXES.map((b, i) => {
              const lit = i < daysLit
              const fresh = lit && i >= opt.prevDay
              return (
                <g key={i}>
                  <IsoSolid box={b} hue="neutral" state={state("window")} />
                  <g
                    className={FADE}
                    style={{
                      opacity: lit ? 1 : 0,
                      transitionDelay: fresh
                        ? `${(i - opt.prevDay) * DAY_MS}ms`
                        : "0ms",
                    }}
                  >
                    <IsoSolid
                      box={b}
                      hue="entity"
                      state={state("window") === "hover" ? "hover" : "lit"}
                    />
                  </g>
                </g>
              )
            })}
          </g>
        )}
      </svg>

      {/* Day names under the ticks. HTML, so they read the right way round
          in RTL. */}
      {opt && dayLabel && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {TICKS.map(([x, y], i) => (
            <span
              key={x}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-sm whitespace-nowrap text-body-medium rtl:translate-x-1/2"
              style={{
                insetInlineStart: pctX(x),
                top: pctY(y + TICK_TEXT_DROP),
              }}
            >
              {dayLabel(i === 0 ? 0 : WINDOW_DAYS)}
            </span>
          ))}
        </div>
      )}

      <AnatomyLabels
        width={W}
        height={H}
        spots={labelSpots}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />

      {/* The state root L1 deleted (optimistic) or never recorded (ZK), once
          the outcome arrives. */}
      {reverted && (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-diagram-pop rounded-base border border-diagram-revert bg-diagram-entity-fill px-2 py-0.5 text-sm font-bold whitespace-nowrap text-diagram-revert motion-reduce:animate-none rtl:translate-x-1/2"
          style={{
            insetInlineStart: pctX(REVERTED_AT[0]),
            top: pctY(REVERTED_AT[1]),
            animationDelay: `${outcomeDelay}ms`,
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
export default memo(OptimisticRollupRig)
