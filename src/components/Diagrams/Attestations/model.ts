/**
 * Plain model for the attestation_schematic.png replacement ("Attestation
 * lifecycle"), following the five stages listed on
 * /developers/docs/consensus-mechanisms/pos/attestations/: generation,
 * propagation, aggregation, propagation of the aggregate, inclusion. The
 * drawing, readout and captions all read from `getAttestationsView`.
 *
 * Two small committees stand in for the real ones (which have hundreds of
 * members). In each, the last member is also its aggregator: aggregators are
 * committee members selected for the slot, not separate nodes (consensus-specs
 * phase0/validator.md, `is_aggregator`; it targets
 * TARGET_AGGREGATORS_PER_COMMITTEE = 16 per committee per slot, not shown
 * here). One member of committee B is offline, so its bit stays 0.
 *
 * Wording stays valid before and after Electra (EIP-7549): the attestation
 * data is described as votes (head, source, target), not by its `index`
 * field, and single attestations aren't said to carry aggregation bits; only
 * aggregates do.
 */

/** viewBox of the drawing. */
export const ATTESTATIONS_SIZE = { width: 480, height: 320 }

/**
 * Attestation subnets on the gossip network (consensus-specs
 * phase0/p2p-interface.md, ATTESTATION_SUBNET_COUNT).
 */
export const ATTESTATION_SUBNET_COUNT = 64

/**
 * The earliest an attestation can be included: in the block of the next slot
 * (consensus-specs phase0/beacon-chain.md, MIN_ATTESTATION_INCLUSION_DELAY;
 * the page's "Inclusion delay" section). A missed slot adds one, as the page's
 * "Missing block proposer" section says.
 */
export const MIN_ATTESTATION_INCLUSION_DELAY = 1

/** Members per drawn committee; the last one is its aggregator. */
export const COMMITTEE_MEMBERS = 4

/** Who signed, by position in each committee (aggregation bits). */
export const COMMITTEE_BITS = {
  a: [1, 1, 1, 1],
  b: [1, 1, 0, 1],
} as const satisfies Record<string, readonly (0 | 1)[]>
export type CommitteeId = keyof typeof COMMITTEE_BITS

const signedIn = (id: CommitteeId) =>
  COMMITTEE_BITS[id].reduce<number>((sum, bit) => sum + bit, 0)
export const SIGNED_A = signedIn("a")
export const SIGNED_B = signedIn("b")
export const SIGNED_TOTAL = SIGNED_A + SIGNED_B
export const AGGREGATE_COUNT = Object.keys(COMMITTEE_BITS).length

export const ATTESTATIONS_PRESET_IDS = ["on-time", "missed"] as const
export type AttestationsPresetId = (typeof ATTESTATIONS_PRESET_IDS)[number]

/** Inclusion delay per scenario, in slots. */
export const INCLUSION_DELAY: Record<AttestationsPresetId, number> = {
  "on-time": MIN_ATTESTATION_INCLUSION_DELAY,
  missed: MIN_ATTESTATION_INCLUSION_DELAY + 1,
}

export const ATTESTATIONS_STEPS = [
  "idle",
  "generate",
  "propagate",
  "aggregate",
  "broadcast",
  "include",
] as const
export type AttestationsStep = (typeof ATTESTATIONS_STEPS)[number]
export const ATTESTATIONS_LAST_STEP = ATTESTATIONS_STEPS.length - 1

/** Labelled parts of the drawing. */
export const ATTESTATIONS_PARTS = [
  "validators",
  "aggregator",
  "network",
  "proposer",
  "block",
  "chain",
  "subnet",
] as const
export type AttestationsPart = (typeof ATTESTATIONS_PARTS)[number]

export type AttestationsFlow = "subnet" | "broadcast" | "include" | null

export interface AttestationsView {
  preset: AttestationsPresetId
  step: number
  motion: AttestationsStep
  /** Signed attestations sit on their validators (steps 1-2). */
  attestationsShown: boolean
  /** The aggregators show their aggregation bits (step 3 on). */
  bitsShown: boolean
  /** Which pipes carry messages in this step. */
  flow: AttestationsFlow
  /** Slots after the attested slot where the new block stands, or null. */
  blockSlot: number | null
  signed: number
  aggregates: number
  inclusionDelay: number | null
  litPart: AttestationsPart | null
  /** The step's caption and status keys, minus the `-step-`/`-status-` part. */
  key: string
}

export const getAttestationsView = (
  preset: AttestationsPresetId,
  requestedStep: number
): AttestationsView => {
  const step = Math.min(Math.max(requestedStep, 0), ATTESTATIONS_LAST_STEP)
  const motion = ATTESTATIONS_STEPS[step]
  const included = motion === "include"

  return {
    preset,
    step,
    motion,
    attestationsShown: step === 1 || step === 2,
    bitsShown: step >= 3,
    flow: (
      {
        idle: null,
        generate: null,
        propagate: "subnet",
        aggregate: null,
        broadcast: "broadcast",
        include: "include",
      } as const
    )[motion],
    blockSlot: included ? INCLUSION_DELAY[preset] : null,
    signed: step >= 1 ? SIGNED_TOTAL : 0,
    aggregates: step >= 3 ? AGGREGATE_COUNT : 0,
    inclusionDelay: included ? INCLUSION_DELAY[preset] : null,
    litPart: (
      {
        idle: null,
        generate: "validators",
        propagate: "subnet",
        aggregate: "aggregator",
        broadcast: "network",
        include: "block",
      } as const
    )[motion],
    key: included && preset === "missed" ? "include-missed" : motion,
  }
}
