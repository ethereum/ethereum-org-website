/**
 * Plain model for the tx.png replacement ("Applying a transaction"), using
 * the example on /developers/docs/transactions/: Bob sends Alice 1 ETH at a
 * base fee of 190 gwei and a priority fee of 10 gwei, for 21,000 gas. The
 * drawing, readout and captions all read from `getTxApplyView`.
 *
 * Amounts are whole gwei, so the fee adds up exactly:
 * fee = 21,000 × (190 + 10) = 4,200,000 gwei = 0.0042 ETH,
 * burned = 21,000 × 190 = 0.00399 ETH, tip = 21,000 × 10 = 0.00021 ETH,
 * sender = −(1 + 0.0042) = −1.0042 ETH.
 */

export const GWEI_PER_ETH = 1_000_000_000

export const TX_EXAMPLE = {
  valueGwei: 1 * GWEI_PER_ETH,
  gasUsed: 21_000,
  baseFeeGwei: 190,
  priorityFeeGwei: 10,
}

export const TX_BURN_GWEI = TX_EXAMPLE.gasUsed * TX_EXAMPLE.baseFeeGwei
export const TX_TIP_GWEI = TX_EXAMPLE.gasUsed * TX_EXAMPLE.priorityFeeGwei
export const TX_FEE_GWEI = TX_BURN_GWEI + TX_TIP_GWEI

export const TX_APPLY_STEPS = [
  "idle",
  "submit",
  "value",
  "fee",
  "commit",
] as const
export type TxApplyStep = (typeof TX_APPLY_STEPS)[number]
export const TX_APPLY_LAST_STEP = TX_APPLY_STEPS.length - 1

/** Parts of the drawing; every one but `fee` carries a label. */
export const TX_APPLY_PARTS = [
  "deck",
  "sender",
  "recipient",
  "slip",
  "pipe",
  "fee",
  "burn",
  "validator",
] as const
export type TxApplyPart = (typeof TX_APPLY_PARTS)[number]

export interface TxApplyView {
  step: number
  motion: TxApplyStep
  /** Balance changes so far, in gwei. */
  senderDeltaGwei: number
  recipientDeltaGwei: number
  burnedGwei: number
  tipGwei: number
  nonceDelta: number
  slipShown: boolean
  /** The slip has been applied (step 4): it stays, dimmed, as history. */
  slipApplied: boolean
  /** The burn mark has received its share of the fee. */
  burnt: boolean
  /** World state t, or t+1 once the transaction is applied. */
  stateAfter: boolean
  litPart: TxApplyPart | null
  captionKey: string
}

export const getTxApplyView = (requestedStep: number): TxApplyView => {
  const step = Math.min(Math.max(requestedStep, 0), TX_APPLY_LAST_STEP)
  const motion = TX_APPLY_STEPS[step]
  const valueSent = step >= 2
  const feePaid = step >= 3

  return {
    step,
    motion,
    senderDeltaGwei: -(
      (valueSent ? TX_EXAMPLE.valueGwei : 0) + (feePaid ? TX_FEE_GWEI : 0)
    ),
    recipientDeltaGwei: valueSent ? TX_EXAMPLE.valueGwei : 0,
    burnedGwei: feePaid ? TX_BURN_GWEI : 0,
    tipGwei: feePaid ? TX_TIP_GWEI : 0,
    nonceDelta: step >= 4 ? 1 : 0,
    slipShown: step >= 1,
    slipApplied: step >= 4,
    burnt: feePaid,
    stateAfter: step >= 4,
    litPart: (
      {
        idle: null,
        submit: "slip",
        value: "recipient",
        fee: "burn",
        commit: "deck",
      } as const
    )[motion],
    captionKey: `tx-apply-step-${motion}`,
  }
}
