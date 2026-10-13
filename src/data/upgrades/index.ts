import { generated } from "./generated"
import type { Milestone, UpgradeData, UpgradeStore } from "./types"

export * from "./types"

/** Every value here is derived from Forkcast; nothing is hand-maintained. */
export const upgrades: UpgradeStore = generated

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
