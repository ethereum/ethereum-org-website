/**
 * Plain model for the gas.png replacement ("where gas goes inside the EVM").
 * A transaction pays intrinsic gas, then a short program runs: each opcode
 * draws its cost from the gas supply and changes the stack, memory or
 * storage. The drawing, readout and captions all read from `getGasEvmView`.
 *
 * Costs (post-Berlin/London): PUSH1 3; MSTORE 3 + 3 to expand memory by its
 * first word; SSTORE 22,100 to set a cold slot from zero to non-zero
 * (20,000 + 2,100 cold access); STOP 0. Intrinsic gas for a plain call is
 * 21,000.
 */

export const INTRINSIC_GAS = 21_000

export const GAS_EVM_PRESET_IDS = ["enough", "out-of-gas"] as const
export type GasEvmPresetId = (typeof GAS_EVM_PRESET_IDS)[number]

// Example values, labelled as such in the UI.
export const GAS_EVM_PRESETS: Record<GasEvmPresetId, { gasLimit: number }> = {
  enough: { gasLimit: 50_000 },
  "out-of-gas": { gasLimit: 40_000 },
}

export type Opcode = "PUSH1" | "MSTORE" | "SSTORE" | "STOP"

interface Instruction {
  op: Opcode
  /** PUSH1's operand. */
  arg?: number
  cost: number
}

/** Store 42 in memory word 0, then in storage slot 0. */
export const PROGRAM: Instruction[] = [
  { op: "PUSH1", arg: 42, cost: 3 },
  { op: "PUSH1", arg: 0, cost: 3 },
  { op: "MSTORE", cost: 6 },
  { op: "PUSH1", arg: 42, cost: 3 },
  { op: "PUSH1", arg: 0, cost: 3 },
  { op: "SSTORE", cost: 22_100 },
  { op: "STOP", cost: 0 },
]

/** -1 is idle; 0 is the intrinsic draw; 1..n run PROGRAM[step - 1]. */
export const GAS_EVM_IDLE_STEP = -1

export type GasEvmPart =
  | "deck"
  | "tank"
  | "evm"
  | "stack"
  | "memory"
  | "storage"

export interface GasEvmView {
  gasLimit: number
  intrinsicPaid: number
  gasUsed: number
  gasLeft: number
  stepIndex: number
  /** The last step this run reaches (the STOP, or the failing opcode). */
  lastStep: number
  /** Program counter of the current opcode, or null before the code runs. */
  pc: number | null
  instruction: Instruction | null
  /** Gas drawn by the current step: intrinsic at step 0, then the opcode's. */
  lastCost: number
  stack: number[]
  memoryWord: number | null
  storageSlot: number | null
  /** The call ran out of gas: everything is consumed, the write is reverted. */
  failed: boolean
  /** Share of the gas limit still in the supply, 0-1. */
  tankLevel: number
  litPart: GasEvmPart | null
  captionKey: string
  captionValues: Record<string, number>
}

export const getGasEvmView = (
  presetId: GasEvmPresetId,
  requestedStep: number
): GasEvmView => {
  const { gasLimit } = GAS_EVM_PRESETS[presetId]

  // Run the whole program once to find where it ends.
  let left = gasLimit - INTRINSIC_GAS
  let failAt: number | null = null
  PROGRAM.forEach((ins, i) => {
    if (failAt !== null) return
    if (ins.cost > left) failAt = i
    else left -= ins.cost
  })
  const lastStep = failAt !== null ? failAt + 1 : PROGRAM.length
  const stepIndex = Math.min(
    Math.max(requestedStep, GAS_EVM_IDLE_STEP),
    lastStep
  )

  // Replay up to the requested step.
  let gasLeft = gasLimit
  let intrinsicPaid = 0
  const stack: number[] = []
  let memoryWord: number | null = null
  let storageSlot: number | null = null
  let failed = false
  // Gas left when the failing opcode tried to run (for the caption).
  let leftAtFailure = 0
  if (stepIndex >= 0) {
    intrinsicPaid = INTRINSIC_GAS
    gasLeft -= INTRINSIC_GAS
  }
  for (let i = 0; i < stepIndex; i++) {
    const ins = PROGRAM[i]
    if (ins.cost > gasLeft) {
      // Out of gas: all of it is consumed and the call's changes undone.
      failed = true
      leftAtFailure = gasLeft
      gasLeft = 0
      stack.length = 0
      memoryWord = null
      storageSlot = null
      break
    }
    gasLeft -= ins.cost
    if (ins.op === "PUSH1") stack.push(ins.arg ?? 0)
    if (ins.op === "MSTORE") {
      stack.pop()
      memoryWord = stack.pop() ?? null
    }
    if (ins.op === "SSTORE") {
      stack.pop()
      storageSlot = stack.pop() ?? null
    }
  }

  const pc = stepIndex >= 1 ? stepIndex - 1 : null
  const instruction = pc !== null ? PROGRAM[pc] : null
  const gasUsed = gasLimit - gasLeft

  const captionKey =
    stepIndex === GAS_EVM_IDLE_STEP
      ? "gas-evm-step-idle"
      : stepIndex === 0
        ? "gas-evm-step-intrinsic"
        : failed
          ? "gas-evm-step-out-of-gas"
          : `gas-evm-step-${instruction?.op.toLowerCase()}`

  const litPart: GasEvmPart | null =
    stepIndex === 0
      ? "tank"
      : failed
        ? "evm"
        : instruction?.op === "PUSH1"
          ? "stack"
          : instruction?.op === "MSTORE"
            ? "memory"
            : instruction?.op === "SSTORE"
              ? "storage"
              : instruction?.op === "STOP"
                ? "evm"
                : null

  return {
    gasLimit,
    intrinsicPaid,
    gasUsed,
    gasLeft,
    stepIndex,
    lastStep,
    pc,
    instruction,
    lastCost:
      // Out of gas, the failing opcode consumes everything that was left.
      stepIndex === 0
        ? INTRINSIC_GAS
        : failed
          ? leftAtFailure
          : (instruction?.cost ?? 0),
    stack,
    memoryWord,
    storageSlot,
    failed,
    tankLevel: gasLeft / gasLimit,
    litPart,
    captionKey,
    captionValues: {
      intrinsic: INTRINSIC_GAS,
      value: instruction?.arg ?? 42,
      cost: instruction?.cost ?? 0,
      left: failed ? leftAtFailure : gasLeft,
      limit: gasLimit,
      used: gasUsed,
    },
  }
}
