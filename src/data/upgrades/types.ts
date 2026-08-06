/**
 * Types for the upgrade status data layer.
 *
 * These files hold volatile facts about network upgrades (dates, phases, EIP
 * inclusion status) so that refreshing them does not require editing prose.
 * See `README.md` in this directory for the editing contract.
 */

/** Where an upgrade sits in the release process. */
export type UpgradePhase =
  /** Headliners not yet locked. */
  | "planning"
  /** Client teams iterating on devnets. */
  | "devnet"
  /** Public testnet forks running. */
  | "testnet"
  /** Mainnet epoch confirmed via ACD. */
  | "scheduled"
  /** Shipped to mainnet. */
  | "activated"

/**
 * How strong a claim we are making about a milestone. Ordered from strongest
 * to weakest evidence; the UI must never render a weaker status as a settled
 * one.
 */
export type MilestoneStatus =
  /** Currently running. */
  | "live"
  /** Date set via ACD. */
  | "confirmed"
  /** Expected, no date set. */
  | "anticipated"
  /** Inferred from the mainnet target; the weakest claim. */
  | "projected"
  /** Happened and is finished. */
  | "complete"

/**
 * EIP inclusion status, using the All Core Devs vocabulary.
 * `pfi` proposed, `cfi` considered, `sfi` scheduled, `dfi` declined.
 *
 * This expresses *confidence*, never *kind*. Networking EIPs are `sfi` like any
 * other scheduled EIP — the meta EIP's "Networking" grouping is a category, and
 * categories do not belong in a confidence enum. See `README.md`.
 */
export type EipStatus = "pfi" | "cfi" | "sfi" | "dfi" | "declined"

/**
 * A date carrying only the precision that has a source behind it: a year, a
 * year and month, or an exact day. One field rather than a separate `window`
 * string and `date`, so the two can never disagree.
 *
 * There is deliberately no quarter or half-year granularity — see `README.md`.
 * The union shape makes a day-without-a-month a type error.
 */
export type PartialDate =
  | { year: number; month?: never; day?: never }
  | { year: number; month: number; day?: never }
  | { year: number; month: number; day: number }

/** A dated step on the way to mainnet: a devnet, a testnet fork, activation. */
export interface Milestone {
  name: string
  when: PartialDate
  status: MilestoneStatus
}

/** When the upgrade is expected on mainnet. */
export interface MainnetTarget {
  when: PartialDate
  /** True only once the mainnet epoch is confirmed via ACD. */
  confirmed: boolean
}

/** An EIP and its inclusion status for one upgrade. */
export interface UpgradeEip {
  id: number
  status: EipStatus
  headliner: boolean
}

/** The full volatile-fact record for one network upgrade. */
export interface UpgradeData {
  name: string
  slug: string
  "consensus-layer": string
  "execution-layer": string
  "meta-eip": number
  phase: UpgradePhase
  "mainnet-target": MainnetTarget
  milestones: Milestone[]
  eips: UpgradeEip[]
  /**
   * ISO `YYYY-MM-DD` on which these facts were last checked against Forkcast.
   * This is not the same as the page's git-derived "last updated" stamp; see
   * `README.md`.
   */
  "facts-verified": string
  /** Forkcast page for this upgrade. */
  "source-url": string
}
