/**
 * Plain model for `RollupCostDiagram` on /layer-2/learn/: a rollup posts a
 * batch of layer 2 transactions to layer 1 as one transaction, and everyone
 * in the batch shares its cost.
 *
 * Costs are illustrative units, not measured gas prices. A batch posting is
 * modelled as a fixed overhead (the L1 transaction itself, the state
 * commitment and, for zk-rollups, proof verification) plus a small data cost
 * per transaction (compressed transaction data, carried in blobs since
 * EIP-4844), so the L1 cost grows only slightly with the batch. Each user
 * also pays a small L2 execution cost, so the per-user cost never reaches
 * zero. Only the ratios matter: overhead >> per-transaction data and L2 cost.
 */

/** viewBox of the drawing. */
export const ROLLUP_COST_SIZE = { width: 480, height: 250 }

export const ROLLUP_COST_PARTS = [
  "batch",
  "block",
  "share",
  "execution",
] as const
export type RollupCostPart = (typeof ROLLUP_COST_PARTS)[number]

export const BATCH_SIZES = [1, 10, 100, 1000] as const
export type BatchSize = (typeof BATCH_SIZES)[number]

/** Fixed L1 overhead per batch posting. */
export const L1_OVERHEAD = 1000
/** L1 data cost per transaction in the batch (compressed, in a blob). */
export const L1_DATA_PER_TX = 4
/** L2 execution cost per transaction. */
export const L2_EXECUTION = 6

/** Seats drawn in the batch; larger batches put several transactions on each. */
export const SEAT_COUNT = 100

export const ROLLUP_COST_STEPS = ["idle", "gather", "post", "split"] as const
export type RollupCostStep = (typeof ROLLUP_COST_STEPS)[number]
export const ROLLUP_COST_LAST_STEP = ROLLUP_COST_STEPS.length - 1

const LIT: Record<RollupCostStep, RollupCostPart | null> = {
  idle: null,
  gather: "batch",
  post: "block",
  split: "share",
}

export interface RollupCostView {
  step: number
  motion: RollupCostStep
  litPart: RollupCostPart | null
  count: BatchSize
  /** Seats filled, and how many transactions each seat stands for. */
  seatsFilled: number
  perSeat: number
  /** L1 cost of posting the whole batch. */
  batchCost: number
  /** Each user's share of the L1 cost (an integer for every preset). */
  l1Share: number
  /** Each user's total: L1 share plus L2 execution. */
  perUser: number
  /** What a single transaction pays posting alone (batch of one): the bar's full track. */
  solo: number
  posted: boolean
  split: boolean
}

export const getRollupCostView = (
  count: BatchSize,
  requestedStep: number
): RollupCostView => {
  const step = Math.min(Math.max(requestedStep, 0), ROLLUP_COST_LAST_STEP)
  const motion = ROLLUP_COST_STEPS[step]
  const perSeat = Math.max(1, Math.ceil(count / SEAT_COUNT))
  const batchCost = L1_OVERHEAD + L1_DATA_PER_TX * count
  const l1Share = batchCost / count
  return {
    step,
    motion,
    litPart: LIT[motion],
    count,
    seatsFilled: step >= 1 ? Math.ceil(count / perSeat) : 0,
    perSeat,
    batchCost,
    l1Share,
    perUser: l1Share + L2_EXECUTION,
    solo: L1_OVERHEAD + L1_DATA_PER_TX + L2_EXECUTION,
    posted: step >= 2,
    split: step >= 3,
  }
}
