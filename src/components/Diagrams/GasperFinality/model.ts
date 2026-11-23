/**
 * Plain model for the justification and finality figure on
 * /developers/docs/consensus-mechanisms/pos/gasper/: Casper FFG, one epoch
 * per step. Each epoch's first block is its checkpoint; throughout the epoch,
 * validators attest to a link from the last justified checkpoint (source)
 * to that checkpoint (target), and the votes are counted at the epoch's end. With at least two-thirds of the stake behind it, the link is a
 * supermajority link: the target is justified, and a justified source right
 * before it is finalized.
 *
 * Sources (checked November 2026, consensus-specs phase0/beacon-chain.md):
 * - Justification: `previous/current_epoch_target_balance * 3 >=
 *   total_active_balance * 2` in `weigh_justification_and_finalization`, so
 *   exactly two-thirds is enough. The page says "total staked ether"; the
 *   spec weighs active validators' effective balances.
 * - Simplification: the spec finalizes over the last 2 to 4 epochs (four
 *   rules on `justification_bits`, e.g. epoch k justified with source k-2
 *   when k-1 and k-2 are justified). Only the common rule is drawn: a
 *   justified checkpoint is finalized when the next epoch's checkpoint is
 *   justified with it as source (bits 0 and 1, source epoch + 1 == current).
 * - Timing: the spec can justify an epoch's checkpoint at the end of that
 *   epoch or the next. The figure justifies it at the end of its own epoch,
 *   so a checkpoint is finalized about two epochs after it is proposed, as
 *   the page says. SLOTS_PER_EPOCH = 32, SECONDS_PER_SLOT = 12.
 * - Inactivity leak: starts when finality is delayed by more than
 *   MIN_EPOCHS_TO_INACTIVITY_PENALTY = 4 epochs (`is_in_inactivity_leak`),
 *   which the page states; the figure only mentions it.
 */

/** viewBox of the drawing. */
export const GASPER_FINALITY_SIZE = { width: 480, height: 256 }

export const SLOTS_PER_EPOCH = 32
export const SECONDS_PER_SLOT = 12
/** Epochs without finality before the inactivity leak starts (the page's
 * "more than four epochs"). */
export const LEAK_EPOCHS = 4

/** The supermajority threshold, as a fraction of the total stake. */
export const THRESHOLD = 2 / 3
/** Integer test, as the spec does it: share * 3 >= total * 2. */
export const isSupermajority = (sharePct: number) => sharePct * 3 >= 100 * 2

/** Epoch names (`n+1`), as notation. Never translated. Index 0 is epoch n,
 * already justified when the figure starts; `n−1` is finalized off the
 * drawing. */
export const EPOCH_NAMES = ["n", "n+1", "n+2", "n+3", "n+4"] as const
export const EARLIER_EPOCH = "n−1"
export type EpochName = (typeof EPOCH_NAMES)[number] | typeof EARLIER_EPOCH

export const GASPER_FINALITY_PRESET_IDS = [
  "healthy",
  "barely",
  "short",
] as const
export type GasperFinalityPresetId = (typeof GASPER_FINALITY_PRESET_IDS)[number]

/** Attesting share of the total stake (whole percent) in epochs n+1 to n+4.
 * Scenario values: mainnet participation usually sits in the high 90s. */
export const PRESET_SHARES: Record<GasperFinalityPresetId, number[]> = {
  healthy: [96, 95, 97, 96],
  barely: [67, 68, 67, 68],
  short: [60, 58, 61, 59],
}

export const GASPER_FINALITY_LAST_STEP = EPOCH_NAMES.length - 1

/** Labelled parts of the drawing. */
export const GASPER_FINALITY_PARTS = [
  "link",
  "meter",
  "threshold",
  "boundary",
  "justified",
  "finalized",
  "proposed",
  "blocks",
  "upcoming",
] as const
export type GasperFinalityPart = (typeof GASPER_FINALITY_PARTS)[number]

export type CheckpointState =
  | "upcoming"
  | "proposed"
  | "justified"
  | "finalized"

export interface GasperFinalityView {
  preset: GasperFinalityPresetId
  step: number
  /** Index of the epoch this step plays (0 at idle: epoch n). */
  epoch: number
  /** Per drawn epoch (n to n+4). */
  checkpoints: CheckpointState[]
  /** Attesting share per epoch, whole percent; null before it is played.
   * Epoch n has no meter. */
  shares: (number | null)[]
  /** Supermajority links drawn, by target epoch index (source is the one
   * before it). */
  links: number[]
  /** This step's link was made (it animates in). */
  linkFormed: boolean
  /** Epoch whose checkpoint was finalized in this step, if any. */
  newlyFinalized: number | null
  lastJustified: EpochName
  lastFinalized: EpochName
  /** This epoch's share, or null at idle. */
  share: number | null
  litPart: GasperFinalityPart | null
  /** Caption and status key, minus the `-step-`/`-status-` part. */
  key: string
}

export const getGasperFinalityView = (
  preset: GasperFinalityPresetId,
  requestedStep: number
): GasperFinalityView => {
  const step = Math.min(Math.max(requestedStep, 0), GASPER_FINALITY_LAST_STEP)
  const sharesPlayed = PRESET_SHARES[preset].slice(0, step)

  const checkpoints: CheckpointState[] = EPOCH_NAMES.map((_, i) =>
    i === 0 ? "justified" : i <= step ? "proposed" : "upcoming"
  )
  const links: number[] = []
  let justified = 0
  let finalized = -1
  let newlyFinalized: number | null = null
  sharesPlayed.forEach((share, i) => {
    const epoch = i + 1
    if (!isSupermajority(share)) return
    // Source is the last justified checkpoint; only a consecutive one is
    // finalized (the simplification above).
    if (justified === epoch - 1) {
      links.push(epoch)
      checkpoints[justified] = "finalized"
      finalized = justified
      if (epoch === step) newlyFinalized = justified
    }
    checkpoints[epoch] = "justified"
    justified = epoch
  })

  const share = step > 0 ? PRESET_SHARES[preset][step - 1] : null
  const linkFormed = step > 0 && links.includes(step)
  const phase =
    step === 1 ? "first" : step === GASPER_FINALITY_LAST_STEP ? "last" : "next"

  return {
    preset,
    step,
    epoch: step,
    checkpoints,
    shares: EPOCH_NAMES.map((_, i) =>
      i === 0 || i > step ? null : PRESET_SHARES[preset][i - 1]
    ),
    links,
    linkFormed,
    newlyFinalized,
    lastJustified: EPOCH_NAMES[justified],
    lastFinalized: finalized < 0 ? EARLIER_EPOCH : EPOCH_NAMES[finalized],
    share,
    litPart: step === 0 ? null : linkFormed ? "link" : "meter",
    key: step === 0 ? "idle" : `${linkFormed ? "justify" : "stall"}-${phase}`,
  }
}
