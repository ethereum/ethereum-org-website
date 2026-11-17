import { generated } from "./generated"
import { staticUpgrades } from "./static"
import type { Milestone, UpgradeData, UpgradeStore } from "./types"

export * from "./types"

/**
 * Derived from Forkcast, plus the pre-Forkcast forks in `static.ts` (only the
 * Beacon Chain), which exist so the release carousel can place them.
 */
export const upgrades: UpgradeStore = { ...staticUpgrades, ...generated }

/** True only for upgrades Forkcast tracks, not the static pre-Forkcast ones. */
export const isForkcastUpgrade = (slug: string) => slug in generated

export const getUpgrade = (slug: string): UpgradeData | null =>
  upgrades[slug] ?? null

/**
 * The first milestone still ahead. `live` is happening now rather than next, so
 * a running devnet is not the answer to "what comes next".
 */
export const getNextMilestone = (slug: string): Milestone | null =>
  getUpgrade(slug)?.milestones.find(
    (m) => m.status !== "complete" && m.status !== "live"
  ) ?? null
