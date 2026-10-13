/**
 * Plain model for the gas-tx ("Message call") diagram. The drawing, readout,
 * step caption and screen-reader text all read from `getGasTxView`, so they
 * cannot disagree. Values are in gas units; fee pricing is deliberately out of
 * scope. "Refund" here means unused gas (limit - used) returned to the sender,
 * not the storage refund.
 */

export const GAS_TX_PRESET_IDS = ["light", "heavy", "out-of-gas"] as const
export type GasTxPresetId = (typeof GAS_TX_PRESET_IDS)[number]

interface GasTxPreset {
  gasLimit: number
  /** Gas the call would need to finish. Above `gasLimit` means out of gas. */
  gasNeeded: number
}

// Example values, labelled as such in the UI.
export const GAS_TX_PRESETS: Record<GasTxPresetId, GasTxPreset> = {
  light: { gasLimit: 100_000, gasNeeded: 46_000 },
  heavy: { gasLimit: 100_000, gasNeeded: 92_000 },
  "out-of-gas": { gasLimit: 100_000, gasNeeded: 130_000 },
}

export const GAS_TX_STEPS = ["enter", "reserve", "execute", "return"] as const
export type GasTxStep = (typeof GAS_TX_STEPS)[number]

/** -1 is the idle state: the complete diagram, before "Send transaction". */
export const GAS_TX_IDLE_STEP = -1

export type GasTxOutcome = "success" | "out-of-gas"

/** What is moving right now; `revert` replaces `return` when out of gas. */
export type GasTxMotion = GasTxStep | "revert"

export interface GasTxView {
  gasLimit: number
  gasUsed: number
  gasReturned: number
  outcome: GasTxOutcome
  /** gasUsed / gasLimit, 0-1. */
  burnRatio: number
  /** Index into GAS_TX_STEPS, or GAS_TX_IDLE_STEP. */
  stepIndex: number
  motion: GasTxMotion | null
  /** Which parts of the drawing are shown at full strength. */
  reached: Record<GasTxStep, boolean>
  reverted: boolean
  /** Flame gauge level to display now. */
  levelShown: number
  /** Key in the `component-diagrams` namespace for the step caption. */
  captionKey: string
}

export const clampGasTxStep = (stepIndex: number) =>
  Math.min(Math.max(stepIndex, GAS_TX_IDLE_STEP), GAS_TX_STEPS.length - 1)

export const getGasTxView = (
  presetId: GasTxPresetId,
  requestedStep: number
): GasTxView => {
  const { gasLimit, gasNeeded } = GAS_TX_PRESETS[presetId]
  const outcome: GasTxOutcome = gasNeeded > gasLimit ? "out-of-gas" : "success"
  const gasUsed = Math.min(gasNeeded, gasLimit)
  const gasReturned = outcome === "success" ? gasLimit - gasUsed : 0
  const burnRatio = gasUsed / gasLimit

  const stepIndex = clampGasTxStep(requestedStep)
  const idle = stepIndex === GAS_TX_IDLE_STEP
  const isReached = (step: GasTxStep) =>
    idle || stepIndex >= GAS_TX_STEPS.indexOf(step)
  const success = outcome === "success"

  const step = idle ? null : GAS_TX_STEPS[stepIndex]
  const motion: GasTxMotion | null =
    step === "return" && !success ? "revert" : step

  const captionKeys: Record<GasTxStep, string> = {
    enter: "gas-tx-step-enter",
    reserve: "gas-tx-step-reserve",
    execute: success ? "gas-tx-step-execute" : "gas-tx-step-execute-out-of-gas",
    return: success ? "gas-tx-step-return" : "gas-tx-step-revert",
  }

  return {
    gasLimit,
    gasUsed,
    gasReturned,
    outcome,
    burnRatio,
    stepIndex,
    motion,
    reached: {
      enter: isReached("enter"),
      reserve: isReached("reserve"),
      execute: isReached("execute"),
      // Nothing flows back when out of gas, so the refund lane stays dimmed.
      return: isReached("return") && success,
    },
    reverted: isReached("return") && !success,
    levelShown: isReached("execute") ? burnRatio : 0,
    captionKey: step ? captionKeys[step] : "gas-tx-step-idle",
  }
}
