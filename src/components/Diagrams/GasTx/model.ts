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

/** -1 is the idle state: the rig at rest, before "Send transaction". */
export const GAS_TX_IDLE_STEP = -1

/** Labelled parts of the fuel-rig drawing. */
export const GAS_TX_PARTS = [
  "deck",
  "order",
  "pump",
  "tank",
  "feed",
  "engine",
  "returnLine",
  "meter",
] as const
export type GasTxPart = (typeof GAS_TX_PARTS)[number]

/** The step at which each part is first shown at full strength. */
export const GAS_TX_PART_STEP: Record<GasTxPart, GasTxStep> = {
  deck: "enter",
  order: "enter",
  pump: "enter",
  tank: "reserve",
  feed: "execute",
  engine: "execute",
  returnLine: "return",
  meter: "return",
}

/** viewBox of the drawing. */
export const GAS_TX_SIZE = { width: 500, height: 342 }

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
  /** The one part the reader should watch now (drawn in its role colour, heavier). */
  litPart: GasTxPart | null
  /** Which parts of the drawing are shown at full strength. */
  reached: Record<GasTxStep, boolean>
  /** Out of gas, from step 3: the call failed and its state is reverted. */
  reverted: boolean
  /** Step 3: how hot the contract glows, as gas used / gas limit (0-1). */
  glowLevel: number
  /** Readout values: start at 0 and fill in as the cycle reaches them. */
  shownUsed: number
  shownReturned: number
  /** Fill levels (0-1) the moving parts show now. */
  tankLevel: number
  meterLevel: number
  /** Key in the `component-diagrams` namespace for the step caption. */
  captionKey: string
}

/**
 * What the tank (reserved gas, drained as it burns) and the meter (gas
 * returned) show. Idle is the starting state: everything empty.
 */
const getLevels = (
  step: GasTxStep | null,
  burnRatio: number,
  returnRatio: number
) => {
  switch (step) {
    case null:
    case "enter":
      return { tankLevel: 0, meterLevel: 0 }
    case "reserve":
      return { tankLevel: 1, meterLevel: 0 }
    case "execute":
      return { tankLevel: 1 - burnRatio, meterLevel: 0 }
    default:
      return { tankLevel: 0, meterLevel: returnRatio }
  }
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

  const litParts: Record<GasTxMotion, GasTxPart> = {
    enter: "order",
    reserve: "tank",
    execute: "feed",
    return: "meter",
    revert: "engine",
  }

  return {
    gasLimit,
    gasUsed,
    gasReturned,
    outcome,
    burnRatio,
    stepIndex,
    motion,
    litPart: motion ? litParts[motion] : null,
    reached: {
      enter: isReached("enter"),
      reserve: isReached("reserve"),
      execute: isReached("execute"),
      // Nothing flows back when out of gas, so the refund lane stays dimmed.
      return: idle || (isReached("return") && success),
    },
    reverted: !success && (step === "execute" || step === "return"),
    glowLevel: step === "execute" ? burnRatio : 0,
    shownUsed: !idle && isReached("execute") ? gasUsed : 0,
    shownReturned: step === "return" ? gasReturned : 0,
    ...getLevels(step, burnRatio, gasReturned / gasLimit),
    captionKey: step ? captionKeys[step] : "gas-tx-step-idle",
  }
}
