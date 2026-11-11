/**
 * Plain model for the tx-block.png replacement ("Applying a block"): a
 * block's transactions apply to the world state one at a time, in block
 * order, each one to the state the previous one left, and together move it
 * from state t to t+1. The drawing, readout and captions all read from
 * `getBlockStateView`.
 *
 * The page (/developers/docs/blocks/) works no example, so these are round
 * scenario values. Amounts are whole gwei, so every balance adds up exactly.
 * Fees use one gas price of 100 gwei (base fee + priority fee, as on
 * /developers/docs/transactions/); fee = gas used × gas price:
 *
 * - t1: Alice sends Bob 1 ETH. 21,000 gas (the base cost of a plain
 *   transfer) → fee 0.0021 ETH.
 * - t2: Bob calls a contract with 1.2 ETH. He starts with 0.5 ETH, so he can
 *   only cover it because t1 ran first. Success: 50,000 gas → 0.005 ETH.
 *   Revert: execution stops at the REVERT after 35,000 gas, unused gas is
 *   returned → 0.0035 ETH. The value transfer is undone, the fee is still
 *   paid and Bob's nonce still goes up (the transaction stays in the block).
 * - t3: Bob sends Alice 0.25 ETH. 21,000 gas → 0.0021 ETH.
 *
 * Start: Alice 3, Bob 0.5, contract 0 (3.5 ETH in all). End, all succeed:
 * Alice 2.2479 + Bob 0.0429 + contract 1.2 + fees 0.0092 = 3.5. End, t2
 * reverts: Alice 2.2479 + Bob 1.2444 + contract 0 + fees 0.0077 = 3.5.
 */

/** viewBox of the drawing. */
export const BLOCK_STATE_SIZE = { width: 460, height: 330 }

export const GWEI_PER_ETH = 1_000_000_000

const GAS_PRICE_GWEI = 100

export const BLOCK_STATE_PRESET_IDS = ["success", "revert"] as const
export type BlockStatePresetId = (typeof BLOCK_STATE_PRESET_IDS)[number]

export type BlockStateAccount = "alice" | "bob" | "contract"

/** The value pipe a transaction's ETH flows along. */
export type BlockStateFlow = "alice-bob" | "bob-contract" | "bob-alice"

export interface BlockStateTx {
  from: BlockStateAccount
  to: BlockStateAccount
  valueGwei: number
  gasUsed: number
  /** Gas used if this transaction reverts. */
  gasUsedReverted?: number
  flow: BlockStateFlow
}

/** The block's transactions, in block order. */
export const BLOCK_STATE_TXS: readonly BlockStateTx[] = [
  {
    from: "alice",
    to: "bob",
    valueGwei: 1 * GWEI_PER_ETH,
    gasUsed: 21_000,
    flow: "alice-bob",
  },
  {
    from: "bob",
    to: "contract",
    valueGwei: 1_200_000_000,
    gasUsed: 50_000,
    gasUsedReverted: 35_000,
    flow: "bob-contract",
  },
  {
    from: "bob",
    to: "alice",
    valueGwei: 250_000_000,
    gasUsed: 21_000,
    flow: "bob-alice",
  },
]

/** Index (0-based) of the transaction that reverts in the "revert" preset. */
const REVERTING_TX = 1

export const BLOCK_STATE_START: Record<BlockStateAccount, number> = {
  alice: 3 * GWEI_PER_ETH,
  bob: 500_000_000,
  contract: 0,
}

export const txReverts = (preset: BlockStatePresetId, index: number) =>
  preset === "revert" && index === REVERTING_TX

export const txFeeGwei = (preset: BlockStatePresetId, index: number) => {
  const tx = BLOCK_STATE_TXS[index]
  const gas =
    txReverts(preset, index) && tx.gasUsedReverted !== undefined
      ? tx.gasUsedReverted
      : tx.gasUsed
  return gas * GAS_PRICE_GWEI
}

export const BLOCK_STATE_STEPS = ["idle", "tx1", "tx2", "tx3", "seal"] as const
export type BlockStateStep = (typeof BLOCK_STATE_STEPS)[number]
export const BLOCK_STATE_LAST_STEP = BLOCK_STATE_STEPS.length - 1

/** What the step shows: `tx2-revert` replaces `tx2` when it reverts. */
export type BlockStateMotion = BlockStateStep | "tx2-revert"

/** Parts of the drawing; each carries a label. */
export const BLOCK_STATE_PARTS = [
  "deck",
  "block",
  "alice",
  "bob",
  "contract",
  "pipe",
] as const
export type BlockStatePart = (typeof BLOCK_STATE_PARTS)[number]

export interface BlockStateView {
  step: number
  motion: BlockStateMotion
  preset: BlockStatePresetId
  /** Balances after the transactions applied so far, in gwei. */
  balances: Record<BlockStateAccount, number>
  feesGwei: number
  bobNonceDelta: number
  /** Transactions applied so far (0-3). */
  applied: number
  /** 0-based index of the transaction applied in this step, or null. */
  active: number | null
  /** Pipe the active transaction's value flows along, or null. */
  flow: BlockStateFlow | null
  /** 0-based index of an applied transaction that reverted, or null. */
  revertedTx: number | null
  /** World state t, or t+1 once the block is applied. */
  stateAfter: boolean
  litPart: BlockStatePart | null
}

export const getBlockStateView = (
  preset: BlockStatePresetId,
  requestedStep: number
): BlockStateView => {
  const step = Math.min(Math.max(requestedStep, 0), BLOCK_STATE_LAST_STEP)
  const stepId = BLOCK_STATE_STEPS[step]
  const applied = Math.min(step, BLOCK_STATE_TXS.length)
  const active = step >= 1 && step <= BLOCK_STATE_TXS.length ? step - 1 : null

  // Each transaction applies to the state the previous one left.
  const balances = { ...BLOCK_STATE_START }
  let feesGwei = 0
  let bobNonceDelta = 0
  let revertedTx: number | null = null
  for (let i = 0; i < applied; i++) {
    const tx = BLOCK_STATE_TXS[i]
    const fee = txFeeGwei(preset, i)
    // The fee is paid and the nonce goes up whether or not it reverts.
    balances[tx.from] -= fee
    feesGwei += fee
    if (tx.from === "bob") bobNonceDelta += 1
    if (txReverts(preset, i)) revertedTx = i
    else {
      balances[tx.from] -= tx.valueGwei
      balances[tx.to] += tx.valueGwei
    }
  }

  const motion: BlockStateMotion =
    active !== null && txReverts(preset, active) ? "tx2-revert" : stepId

  return {
    step,
    motion,
    preset,
    balances,
    feesGwei,
    bobNonceDelta,
    applied,
    active,
    // A reverting call still sends its value before the revert undoes it.
    flow: active !== null ? BLOCK_STATE_TXS[active].flow : null,
    revertedTx,
    stateAfter: stepId === "seal",
    litPart: (
      {
        idle: null,
        tx1: "bob",
        tx2: "contract",
        "tx2-revert": "contract",
        tx3: "alice",
        seal: "deck",
      } as const
    )[motion],
  }
}
