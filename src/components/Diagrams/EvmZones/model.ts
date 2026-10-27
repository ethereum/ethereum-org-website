/**
 * Plain model for the evm.png replacement ("What survives a call"). The EVM's
 * parts sit in three zones: machine state (volatile: program counter, stack,
 * memory, gas available), the virtual ROM (immutable: the EVM code) and world
 * state (persistent: account storage). One call runs the gas diagram's
 * program (store 42 in memory, then in a storage slot); when it ends, only
 * the storage write is left. The drawing, readout and captions all read from
 * `getEvmZonesView`.
 */

/** viewBox of the drawing. */
export const EVM_ZONES_SIZE = { width: 400, height: 330 }

/** The EVM stack's maximum depth, quoted in the stack's definition. */
export const STACK_DEPTH = 1024

export const EVM_ZONES_STEPS = ["idle", "load", "run", "store", "end"] as const
export type EvmZonesStep = (typeof EVM_ZONES_STEPS)[number]
export const EVM_ZONES_LAST_STEP = EVM_ZONES_STEPS.length - 1

export const EVM_ZONES_PARTS = [
  "deck",
  "machine",
  "evm",
  "tank",
  "stack",
  "memory",
  "storage",
] as const
export type EvmZonesPart = (typeof EVM_ZONES_PARTS)[number]

export type EvmZone = "machine" | "rom" | "world"

/** Which zone each part belongs to (shown in its definition). */
export const EVM_ZONE_OF: Record<EvmZonesPart, EvmZone> = {
  deck: "world",
  machine: "machine",
  evm: "rom",
  tank: "machine",
  stack: "machine",
  memory: "machine",
  storage: "world",
}

export type MachineStatus = "empty" | "in-use" | "cleared"
export type CodeStatus = "not-loaded" | "loaded" | "unchanged"
export type StorageStatus = "no-writes" | "written"

export interface EvmZonesView {
  step: number
  motion: EvmZonesStep
  codeLoaded: boolean
  /** Index of the code cell being executed, or null. */
  opIndex: number | null
  /** Values on the stack, bottom first. */
  stack: number[]
  memoryWritten: boolean
  storageWritten: boolean
  /** Share of the gas available, 0-1. */
  tankLevel: number
  /** Gas is being drawn in this step. */
  gasFlowing: boolean
  /** The storage pipe carries a write in this step. */
  storing: boolean
  machine: MachineStatus
  code: CodeStatus
  storage: StorageStatus
  litPart: EvmZonesPart | null
  captionKey: string
}

export const getEvmZonesView = (requestedStep: number): EvmZonesView => {
  const step = Math.min(Math.max(requestedStep, 0), EVM_ZONES_LAST_STEP)
  const motion = EVM_ZONES_STEPS[step]
  const running = motion === "run" || motion === "store"

  return {
    step,
    motion,
    codeLoaded: step >= 1,
    // Run: just pushed 42 and 0 again (cell 4); store: SSTORE (cell 5).
    opIndex: motion === "run" ? 4 : motion === "store" ? 5 : null,
    // SSTORE takes its two values off the stack.
    stack: motion === "run" ? [42, 0] : [],
    memoryWritten: running,
    storageWritten: step >= 3,
    tankLevel: motion === "run" ? 0.8 : motion === "store" ? 0.35 : 0,
    gasFlowing: running,
    storing: motion === "store",
    machine: running ? "in-use" : step === 4 ? "cleared" : "empty",
    code: step === 0 ? "not-loaded" : step === 1 ? "loaded" : "unchanged",
    storage: step >= 3 ? "written" : "no-writes",
    litPart: (
      {
        idle: null,
        load: "evm",
        run: "machine",
        store: "storage",
        end: "deck",
      } as const
    )[motion],
    captionKey: `evm-zones-step-${motion}`,
  }
}
