import { generated } from "./generated"
import type { Milestone, UpgradeData, UpgradeStore } from "./types"

export * from "./types"

/** Every value here is derived from Forkcast; nothing is hand-maintained. */
export const upgrades: UpgradeStore = generated

export const getUpgrade = (slug: string): UpgradeData | null =>
  upgrades[slug] ?? null

/**
 * Whether an upgrade has activated on mainnet. The weekly sync can trail a
 * fork by days, so a confirmed activation day that has passed counts too.
 */
export const hasActivated = (
  { status, mainnetTarget: { when, confirmed } }: UpgradeData,
  now = Date.now()
): boolean =>
  status === "live" ||
  (confirmed &&
    when?.day !== undefined &&
    Date.UTC(when.year, when.month - 1, when.day + 1) <= now)

/**
 * The first milestone still ahead. `live` is happening now rather than next, so
 * a running devnet is not the answer to "what comes next".
 */
export const getNextMilestone = (slug: string): Milestone | null =>
  getUpgrade(slug)?.milestones.find(
    (m) => m.status !== "complete" && m.status !== "live"
  ) ?? null
