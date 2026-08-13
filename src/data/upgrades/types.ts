/**
 * Contract for network upgrade facts derived from ethereum/forkcast.
 *
 * Everything typed here is generated. Hand-authored values live in
 * `overrides.ts` and are merged at import time by `index.ts`.
 */

/** Mirrors Forkcast's `NetworkUpgrade.status`, lowercased. */
export type UpgradeStatus = "live" | "upcoming" | "planning" | "research"

/**
 * How strong a claim we are making about a milestone.
 *
 * `complete` is the only settled value. The rest are claims about the future,
 * strongest to weakest; the UI must never render a weaker one as settled.
 */
export type MilestoneStatus =
  | "complete"
  | "live"
  | "confirmed"
  | "anticipated"
  | "projected"

/**
 * EIP inclusion status for one upgrade, mapped 1:1 from Forkcast's vocabulary
 * so the normalizer stays auditable at a glance.
 *
 * Forkcast's "Networking" is a category rather than a confidence level, so it
 * maps to `scheduled` plus the `networking` flag on {@link UpgradeEip}.
 */
export type EipStatus =
  | "proposed"
  | "considered"
  | "scheduled"
  | "declined"
  | "included"
  | "withdrawn"
  | "informational"

export type Quarter = 1 | 2 | 3 | 4

/**
 * A date carrying only the precision that has a source behind it. One field
 * rather than a window string plus an ISO date, so the two cannot disagree.
 *
 * Quarters exist because Forkcast's phase timeline states targets that way
 * (`projectedDate: 'Q4 2026'`) — dropping them made our store less precise
 * than its own source. A quarter never combines with a month or a day.
 *
 * Quarter *ranges* upstream ("Q3-Q4 2026") deliberately degrade to the year:
 * picking either bound would claim precision the source does not have.
 */
export type PartialDate =
  | { year: number; quarter?: never; month?: never; day?: never }
  | { year: number; quarter: Quarter; month?: never; day?: never }
  | { year: number; quarter?: never; month: number; day?: never }
  | { year: number; quarter?: never; month: number; day: number }

/** The ACD call that produced a status, when Forkcast records one. */
export interface EipDecision {
  call: string | null
  date: string | null
}

export interface UpgradeEip {
  id: number
  /**
   * The full upstream vocabulary is modelled so the mapping stays exhaustive,
   * but only `scheduled` and `included` are stored — an EIP that is not
   * expected to ship simply has no entry.
   */
  status: EipStatus
  networking: boolean
  decidedAt: EipDecision | null
}

/**
 * Which stage of the release process a milestone belongs to. Stored rather than
 * inferred from the name, because ordering has to survive imprecise dates: a
 * year-only testnet fork still precedes a quarter-precise mainnet activation.
 */
export type MilestoneKind = "devnet" | "testnet" | "mainnet"

export interface Milestone {
  name: string
  kind: MilestoneKind
  when: PartialDate
  status: MilestoneStatus
}

export interface MainnetTarget {
  when: PartialDate | null
  /** True only once an activation epoch is known. */
  confirmed: boolean
}

export interface UpgradeData {
  slug: string
  name: string
  status: UpgradeStatus
  mainnetTarget: MainnetTarget
  milestones: Milestone[]
  eips: UpgradeEip[]
  sourceUrl: string
}

export type UpgradeStore = Record<string, UpgradeData>
