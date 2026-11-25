/**
 * Plain model for the figure on /developers/docs/scaling/optimistic-rollups/:
 * one batch's life. The sequencer (the page's operator) executes L2
 * transactions, posts the batch data and a new state root to the rollup
 * contracts on L1 with a bond behind it, and a challenger re-executes the
 * batch during the challenge window. Honest batch: the window elapses, the
 * root is final and withdrawals can complete. Invalid state root: the
 * challenger disputes it, bisection narrows the disagreement to one step,
 * L1 re-executes that step, the root is deleted and the bond slashed.
 *
 * Sources (checked November 2026):
 * - Challenge window: about 7 days on the large rollups (Arbitrum One's
 *   confirm period is ~6.4 days; OP Stack chains run a 3.5-day dispute game
 *   plus a 3.5-day finality delay). It is a per-rollup setting, so the
 *   figure uses the page's "roughly seven days".
 * - Permissionless fault proofs: OP Stack FaultDisputeGame (Cannon), Arbitrum
 *   BoLD. Both bisect an execution trace down to one instruction and check
 *   it with an onchain one-step proof (MIPS / OneStepProver).
 * - Simplifications: the trace has 8 steps (real ones run to billions, so
 *   bisection takes ~log2 of that many rounds); the sequencer also posts
 *   the state root, where many rollups use a separate proposer; the slashed
 *   bond is split as the page describes (part to the challenger, the rest
 *   burned), while e.g. BoLD sends a losing bond to the DAO and refunds the
 *   honest side's.
 */

import type { DiagramText } from "@/lib/types"

/** viewBox of the drawing. */
export const OPTIMISTIC_ROLLUP_SIZE = { width: 500, height: 320 }

/** Days in the challenge window (the page's "roughly seven days"). */
export const WINDOW_DAYS = 7
/** Day the challenger disputes the root, in the invalid preset. */
export const CHALLENGE_DAY = 2
/** Day the reader sees while the window runs, in the honest preset. */
const CHECK_DAY = 3

/** Steps of execution in the disputed batch (toy size). */
export const TRACE_STEPS = 8
/** The step where the sequencer's execution went wrong (0-based). */
export const BAD_STEP = 2

/** Disputed range after each bisection round: [from, to). */
export const BISECTION_RANGES: [number, number][] = (() => {
  const ranges: [number, number][] = [[0, TRACE_STEPS]]
  let [from, to] = ranges[0]
  while (to - from > 1) {
    const mid = (from + to) / 2
    ;[from, to] = BAD_STEP < mid ? [from, mid] : [mid, to]
    ranges.push([from, to])
  }
  return ranges
})()
export const BISECTION_ROUNDS = BISECTION_RANGES.length - 1

/** The round (1-based) in which a trace step leaves the disputed range. */
export const roundRuledOut = (i: number) =>
  BISECTION_RANGES.findIndex(([from, to]) => i < from || i >= to)

export const OPTIMISTIC_ROLLUP_PRESET_IDS = ["honest", "invalid"] as const
export type OptimisticRollupPresetId =
  (typeof OPTIMISTIC_ROLLUP_PRESET_IDS)[number]

export const OPTIMISTIC_ROLLUP_LAST_STEP = 5

/** Labelled parts of the drawing. */
export const OPTIMISTIC_ROLLUP_PARTS = [
  "txs",
  "sequencer",
  "batch",
  "contracts",
  "state-root",
  "bond",
  "window",
  "challenger",
  "trace",
  "account",
  "l2",
  "l1",
] as const
export type OptimisticRollupPart = (typeof OPTIMISTIC_ROLLUP_PARTS)[number]

type Motion =
  | "idle"
  | "execute"
  | "post"
  | "check"
  | "elapse"
  | "finalize"
  | "challenge"
  | "bisect"
  | "prove"

const MOTIONS: Record<OptimisticRollupPresetId, Motion[]> = {
  honest: ["idle", "execute", "post", "check", "elapse", "finalize"],
  invalid: ["idle", "execute", "post", "challenge", "bisect", "prove"],
}

export type RootStatus = "none" | "pending" | "final" | "disputed" | "reverted"
export type BondStatus = "none" | "staked" | "released" | "slashed"

export interface OptimisticRollupView {
  kind: "optimistic"
  preset: OptimisticRollupPresetId
  step: number
  motion: Motion
  /** Batch data and state root sit in the contracts. */
  posted: boolean
  root: RootStatus
  bond: BondStatus
  /** Days of the window gone by, or null before the batch is posted. */
  day: number | null
  /** Day the window stood at before this step, so new days light in turn. */
  prevDay: number
  /** Bisection rounds played (null when there is no dispute). */
  rounds: number | null
  /** Steps still disputed (null when there is no dispute). */
  disputedSteps: number | null
  traceShown: boolean
  litPart: OptimisticRollupPart | null
  /** The step's caption and status keys, minus the `-step-`/`-status-` part. */
  key: string
}

const dayAt = (preset: OptimisticRollupPresetId, step: number) => {
  if (step < 2) return null
  if (step === 2) return 0
  if (preset === "invalid") return CHALLENGE_DAY
  return step === 3 ? CHECK_DAY : WINDOW_DAYS
}

export const getOptimisticRollupView = (
  preset: OptimisticRollupPresetId,
  requestedStep: number
): OptimisticRollupView => {
  const step = Math.min(Math.max(requestedStep, 0), OPTIMISTIC_ROLLUP_LAST_STEP)
  const motion = MOTIONS[preset][step]
  const invalid = preset === "invalid"
  const posted = step >= 2

  const root: RootStatus = !posted
    ? "none"
    : invalid && step === 5
      ? "reverted"
      : invalid && step >= 3
        ? "disputed"
        : !invalid && step === 5
          ? "final"
          : "pending"
  const bond: BondStatus = !posted
    ? "none"
    : step === 5
      ? invalid
        ? "slashed"
        : "released"
      : "staked"

  const rounds =
    invalid && step >= 3 ? (step === 3 ? 0 : BISECTION_ROUNDS) : null
  const range = rounds === null ? null : BISECTION_RANGES[rounds]

  return {
    kind: "optimistic",
    preset,
    step,
    motion,
    posted,
    root,
    bond,
    day: dayAt(preset, step),
    prevDay: dayAt(preset, step - 1) ?? 0,
    rounds,
    disputedSteps: range ? range[1] - range[0] : null,
    traceShown: invalid && step >= 3,
    litPart: (
      {
        idle: null,
        execute: "sequencer",
        post: "batch",
        check: "challenger",
        elapse: "window",
        finalize: "account",
        challenge: "challenger",
        bisect: "trace",
        prove: "contracts",
      } as const
    )[motion],
    key: motion,
  }
}

/*
 * The companion figure for /developers/docs/scaling/zk-rollups/, drawn on
 * the same rig: the sequencer executes the batch, a prover generates a
 * validity proof, the operator posts the batch data, the new state root and
 * the proof to L1, and a verifier contract checks the proof. Valid batch:
 * the root is recorded and final at once, so withdrawals can complete.
 * Invalid state transition: no valid proof exists for a wrong root, the
 * verifier rejects the one posted, and the call reverts.
 *
 * Simplifications: one call posts and verifies the batch, where some rollups
 * commit, prove and execute in separate transactions; withdrawals wait for
 * proving (which can be slow and costly) rather than a challenge window,
 * and some rollups add a delay of their own before executing them.
 */

/** viewBox of the ZK figure: no challenge window, so a shallower L1. */
export const ZK_ROLLUP_SIZE = { width: 500, height: 290 }

export const ZK_ROLLUP_PRESET_IDS = ["valid", "invalid"] as const
export type ZkRollupPresetId = (typeof ZK_ROLLUP_PRESET_IDS)[number]

export const ZK_ROLLUP_LAST_STEP = 5

export const ZK_ROLLUP_PARTS = [
  "txs",
  "sequencer",
  "prover",
  "proof",
  "batch",
  "contracts",
  "state-root",
  "verifier",
  "account",
  "l2",
  "l1",
] as const
export type ZkRollupPart = (typeof ZK_ROLLUP_PARTS)[number]

type ZkMotion =
  | "idle"
  | "execute"
  | "prove"
  | "post"
  | "verify"
  | "finalize"
  | "execute-bad"
  | "prove-bad"
  | "post-bad"
  | "reject"
  | "revert"

const ZK_MOTIONS: Record<ZkRollupPresetId, ZkMotion[]> = {
  valid: ["idle", "execute", "prove", "post", "verify", "finalize"],
  invalid: ["idle", "execute-bad", "prove-bad", "post-bad", "reject", "revert"],
}

export type ZkRootStatus = "none" | "pending" | "recorded" | "reverted"
export type ZkProofStatus =
  | "none"
  | "generated"
  | "invalid"
  | "posted"
  | "verified"
  | "rejected"
export type ZkFinality = "none" | "pending" | "final" | "not-final"
export type ZkWithdrawal = "none" | "complete" | "blocked"

export interface ZkRollupView {
  kind: "zk"
  preset: ZkRollupPresetId
  step: number
  motion: ZkMotion
  /** Batch data and state root sit on the rollup contract. */
  posted: boolean
  /** The proof sits on the prover (before posting) or the verifier. */
  proofAt: "none" | "prover" | "verifier"
  root: ZkRootStatus
  proof: ZkProofStatus
  finality: ZkFinality
  withdrawal: ZkWithdrawal
  litPart: ZkRollupPart | null
  /** The step's caption and status keys, minus the `-step-`/`-status-` part. */
  key: string
}

export const getZkRollupView = (
  preset: ZkRollupPresetId,
  requestedStep: number
): ZkRollupView => {
  const step = Math.min(Math.max(requestedStep, 0), ZK_ROLLUP_LAST_STEP)
  const motion = ZK_MOTIONS[preset][step]
  const invalid = preset === "invalid"
  const posted = step >= 3
  const done = step === 5

  const proof: ZkProofStatus =
    step < 2
      ? "none"
      : invalid
        ? step >= 4
          ? "rejected"
          : "invalid"
        : step === 2
          ? "generated"
          : step === 3
            ? "posted"
            : "verified"

  return {
    kind: "zk",
    preset,
    step,
    motion,
    posted,
    proofAt: step < 2 ? "none" : posted ? "verifier" : "prover",
    root: !posted
      ? "none"
      : done
        ? invalid
          ? "reverted"
          : "recorded"
        : "pending",
    proof,
    finality: !posted
      ? "none"
      : done
        ? invalid
          ? "not-final"
          : "final"
        : "pending",
    withdrawal: !done ? "none" : invalid ? "blocked" : "complete",
    litPart: (
      {
        idle: null,
        execute: "sequencer",
        prove: "prover",
        post: "batch",
        verify: "verifier",
        finalize: "state-root",
        "execute-bad": "sequencer",
        "prove-bad": "prover",
        "post-bad": "batch",
        reject: "verifier",
        revert: "state-root",
      } as const
    )[motion],
    key: motion,
  }
}

export type RollupView = OptimisticRollupView | ZkRollupView

/** Values the optimistic figure's description quotes. */
export const getOptimisticRollupValues = ({ number, steps }: DiagramText) => ({
  days: number(WINDOW_DAYS),
  challengeDay: number(CHALLENGE_DAY),
  steps: number(TRACE_STEPS),
  rounds: number(BISECTION_ROUNDS),
  ...steps(OPTIMISTIC_ROLLUP_LAST_STEP),
})

/** Values the ZK figure's description quotes. */
export const getZkRollupValues = ({ steps }: DiagramText) =>
  steps(ZK_ROLLUP_LAST_STEP)
