/**
 * Plain model for `MevBoostDiagram`, the replacement for mev/mev.png: block
 * building outsourced through MEV-Boost, the Builder API's most used
 * implementation.
 *
 * The proposer's node runs a consensus client (with its validator client)
 * and MEV-Boost beside it. Relays sit between it and the block builders, and
 * the relay that wins the auction publishes the block to the network.
 *
 * Sources (checked November 2026):
 * - Builder API: https://github.com/ethereum/builder-specs (registerValidator,
 *   getHeader, submitBlindedBlock). Since Fulu the proposer calls
 *   submitBlindedBlockV2: the relay replies 202 and publishes the full block
 *   and blobs itself, instead of returning the payload (apis/builder/
 *   blinded_blocks_v2.yaml; v1 is deprecated, and both are replaced from
 *   Gloas). Method names are written without their version, which changes
 *   with network upgrades.
 * - Builders submit blocks with bids to relays, which simulate them before
 *   offering them (Flashbots relay API, POST /relay/v1/builder/blocks);
 *   builders take registrations from the relays
 *   (GET /relay/v1/builder/validators). Registrations are re-sent every
 *   epoch, so they are in place before the proposer's slot.
 * - MEV-Boost asks every connected relay for a header and passes on the
 *   highest bid (https://github.com/flashbots/mev-boost).
 * - Glamsterdam's enshrined PBS (EIP-7732) replaces these endpoints from
 *   Gloas; not on Mainnet as of November 2026.
 */

/** viewBox of the drawing. */
export const MEV_BOOST_SIZE = { width: 490, height: 250 }

/** Every drawn part; ids match the rig's `data-part` and the label spots. */
export const MEV_BOOST_PARTS = [
  "node",
  "proposer",
  "boost",
  "relays",
  "builders",
  "network",
] as const
export type MevBoostPart = (typeof MEV_BOOST_PARTS)[number]

/**
 * Message paths. Forward is away from the proposer: proposer to MEV-Boost,
 * MEV-Boost to each relay, the winning relay to the network. The builder
 * links run forward from the builders into each relay.
 */
export const MEV_BOOST_LINKS = [
  "boost",
  "relay-1",
  "relay-2",
  "build-1",
  "build-2",
  "publish",
] as const
export type MevBoostLink = (typeof MEV_BOOST_LINKS)[number]
export type LinkFlow = "forward" | "back"

export const MEV_BOOST_STEPS = [
  "idle",
  "register",
  "bid",
  "header",
  "sign",
  "publish",
] as const
export type MevBoostStep = (typeof MEV_BOOST_STEPS)[number]
export const MEV_BOOST_LAST_STEP = MEV_BOOST_STEPS.length - 1

/** Builders' bids in ETH, a scenario: one per builder, highest wins. */
export const BIDS = [0.041, 0.052, 0.047] as const
export const WINNING_BID = Math.max(...BIDS)

/** Messages, shown as code (never translated). */
export const MEV_BOOST_MESSAGE: Record<
  Exclude<MevBoostStep, "idle">,
  string
> = {
  register: "registerValidator",
  bid: "/relay/v1/builder/blocks",
  header: "getHeader",
  sign: "submitBlindedBlock",
  publish: "beacon_block",
}

export interface MevBoostView {
  step: number
  motion: MevBoostStep
  flows: Partial<Record<MevBoostLink, LinkFlow>>
  litPart: MevBoostPart | null
  message: string | null
  /** The highest bid the relays hold, once builders have bid. */
  bid: number | null
  /** The proposer has signed the header. */
  signed: boolean
}

const FLOWS: Record<MevBoostStep, MevBoostView["flows"]> = {
  idle: {},
  register: { boost: "forward", "relay-1": "forward", "relay-2": "forward" },
  bid: { "build-1": "forward", "build-2": "forward" },
  // The relays' headers and bids come back; MEV-Boost passes on the best.
  header: { boost: "back", "relay-1": "back", "relay-2": "back" },
  // Only the relay holding the winning bid gets the signed header.
  sign: { boost: "forward", "relay-1": "forward" },
  publish: { publish: "forward" },
}

const LIT: Record<MevBoostStep, MevBoostPart | null> = {
  idle: null,
  register: "relays",
  bid: "builders",
  header: "boost",
  sign: "proposer",
  publish: "network",
}

export const getMevBoostView = (requestedStep: number): MevBoostView => {
  const step = Math.min(Math.max(requestedStep, 0), MEV_BOOST_LAST_STEP)
  const motion = MEV_BOOST_STEPS[step]
  return {
    step,
    motion,
    flows: FLOWS[motion],
    litPart: LIT[motion],
    message: motion === "idle" ? null : MEV_BOOST_MESSAGE[motion],
    bid: step >= MEV_BOOST_STEPS.indexOf("bid") ? WINNING_BID : null,
    signed: step >= MEV_BOOST_STEPS.indexOf("sign"),
  }
}
