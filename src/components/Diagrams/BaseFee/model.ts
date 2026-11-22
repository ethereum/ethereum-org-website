/**
 * Plain model for the base-fee figure on /developers/docs/gas/.
 *
 * EIP-1559 (https://eips.ethereum.org/EIPS/eip-1559), checked November 2026:
 * - ELASTICITY_MULTIPLIER = 2: gas target = gas limit / 2.
 * - BASE_FEE_MAX_CHANGE_DENOMINATOR = 8: next base fee = base fee +
 *   base fee * (gas used - target) // target // 8, in wei, so at most
 *   +-12.5% per block. Above target the increase is at least 1 wei.
 * - The base fee is burned; the priority fee (tip) goes to the block's
 *   fee recipient.
 * The 36M gas limit and 100 gwei starting base fee are the page's own
 * example (its base-fee table). Mainnet's limit has since been raised
 * (45M in July 2025, 60M in November 2025); the mechanics don't change.
 */

/** viewBox of the drawing. */
export const BASE_FEE_SIZE = { width: 480, height: 306 }

export const BASE_FEE_PARTS = ["base-fee", "limit", "target", "block"] as const
export type BaseFeePart = (typeof BASE_FEE_PARTS)[number]

export const GAS_LIMIT = 36_000_000
export const ELASTICITY_MULTIPLIER = 2
export const GAS_TARGET = GAS_LIMIT / ELASTICITY_MULTIPLIER
export const BASE_FEE_MAX_CHANGE_DENOMINATOR = 8
/** 12.5%, as a fraction. */
export const MAX_CHANGE = 1 / BASE_FEE_MAX_CHANGE_DENOMINATOR

const WEI_PER_GWEI = 1e9
const GWEI_PER_ETH = 1e9
export const START_BASE_FEE_WEI = 100 * WEI_PER_GWEI

/** Fullness snaps to eighths of the limit (quarters of the target), so every change is a multiple of 3.125%. */
export const UNITS = 8
export const TARGET_UNITS = UNITS / ELASTICITY_MULTIPLIER
const GAS_PER_UNIT = GAS_LIMIT / UNITS

export const BLOCK_COUNT = 8

export const BASE_FEE_PRESET_IDS = ["spike", "cooling", "target"] as const
export type BaseFeePresetId = (typeof BASE_FEE_PRESET_IDS)[number]

/** Gas used per block, in eighths of the limit. `spike` is the page's table. */
export const BASE_FEE_PRESETS: Record<BaseFeePresetId, number[]> = {
  spike: [4, 8, 8, 8, 8, 8, 8, 8],
  cooling: [0, 0, 0, 0, 1, 1, 2, 2],
  target: [4, 4, 4, 4, 4, 4, 4, 4],
}

export const BASE_FEE_LAST_STEP = BLOCK_COUNT

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)

/** EIP-1559's integer update, reduced by the gcd so every product stays a safe integer. */
export const nextBaseFee = (baseFeeWei: number, gasUsed: number) => {
  if (gasUsed === GAS_TARGET) return baseFeeWei
  const delta = Math.abs(gasUsed - GAS_TARGET)
  const g = gcd(delta, GAS_TARGET)
  const change = Math.floor(
    Math.floor((baseFeeWei * (delta / g)) / (GAS_TARGET / g)) /
      BASE_FEE_MAX_CHANGE_DENOMINATOR
  )
  return gasUsed > GAS_TARGET
    ? baseFeeWei + Math.max(change, 1)
    : baseFeeWei - change
}

export interface BaseFeeBlock {
  /** 1-based block number. */
  number: number
  units: number
  gasUsed: number
  /** Gas used / target, 0-2. */
  ofTarget: number
  baseFeeWei: number
  baseFeeGwei: number
  /** This block's base fee vs the previous block's, as a fraction. */
  change: number
  burnedEth: number
  /** Built in the current step (drawn filled), or still to come. */
  built: boolean
}

export type BaseFeeTrend = "up" | "down" | "flat"

export interface BaseFeeView {
  step: number
  /** The block the readout describes: the newest built, or block 1 at idle. */
  current: number
  blocks: BaseFeeBlock[]
  /** Base fee of the block after the last one, known once the last is built. */
  nextGwei: number
  /** How many base fees are known: one more than the blocks built. */
  feesShown: number
  trend: BaseFeeTrend | null
  litPart: BaseFeePart | null
  /** Caption and status key suffix. */
  key: string
  /** Fee axis, fixed per set of values so stepping never rescales. */
  feeMax: number
  feeTicks: number[]
}

const NICE = [1, 2, 2.5, 5]

const FEE_INTERVALS = 3

const feeScale = (maxGwei: number) => {
  const least = (maxGwei * 1.05) / FEE_INTERVALS
  const power = 10 ** Math.floor(Math.log10(least))
  const tick = power * (NICE.find((n) => n * power >= least) ?? 10)
  return {
    feeMax: tick * FEE_INTERVALS,
    feeTicks: Array.from({ length: FEE_INTERVALS + 1 }, (_, i) => i * tick),
  }
}

export const unitsToGas = (units: number) => units * GAS_PER_UNIT

// The block before block 1 is taken as on target, as in the page's table.
export const getBaseFeeView = (
  units: number[],
  requestedStep: number
): BaseFeeView => {
  const step = Math.min(Math.max(requestedStep, 0), BASE_FEE_LAST_STEP)
  let fee = START_BASE_FEE_WEI
  let previous = GAS_TARGET
  const blocks = units.map((u, i): BaseFeeBlock => {
    const gasUsed = unitsToGas(u)
    const change =
      (previous - GAS_TARGET) / GAS_TARGET / BASE_FEE_MAX_CHANGE_DENOMINATOR
    const block = {
      number: i + 1,
      units: u,
      gasUsed,
      ofTarget: gasUsed / GAS_TARGET,
      baseFeeWei: fee,
      baseFeeGwei: fee / WEI_PER_GWEI,
      change,
      burnedEth: ((fee / WEI_PER_GWEI) * gasUsed) / GWEI_PER_ETH,
      built: i < step,
    }
    fee = nextBaseFee(fee, gasUsed)
    previous = gasUsed
    return block
  })
  const nextGwei = fee / WEI_PER_GWEI
  const current = Math.max(step, 1)
  const newest = blocks[current - 1]
  const trend: BaseFeeTrend | null =
    step === 0
      ? null
      : newest.gasUsed > GAS_TARGET
        ? "up"
        : newest.gasUsed < GAS_TARGET
          ? "down"
          : "flat"

  return {
    step,
    current,
    blocks,
    nextGwei,
    feesShown: step + 1,
    trend,
    litPart: step === 0 ? null : "base-fee",
    key: trend ?? "idle",
    ...feeScale(Math.max(nextGwei, ...blocks.map((b) => b.baseFeeGwei))),
  }
}

/** Base fee of block n (1-based); n = BLOCK_COUNT + 1 is the next block. */
export const feeOf = (view: BaseFeeView, n: number) =>
  n <= BLOCK_COUNT ? view.blocks[n - 1].baseFeeGwei : view.nextGwei
