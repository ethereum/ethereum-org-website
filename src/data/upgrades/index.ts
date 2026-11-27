import { generated } from "./generated"
import { staticUpgrades } from "./static"
import type { UpgradeStore } from "./types"

export * from "./types"

/**
 * Derived from Forkcast, plus the pre-Forkcast forks in `static.ts` (only the
 * Beacon Chain), which exist so the release carousel can place them.
 */
export const upgrades: UpgradeStore = { ...staticUpgrades, ...generated }

/** True only for upgrades Forkcast tracks, not the static pre-Forkcast ones. */
export const isForkcastUpgrade = (slug: string) => slug in generated
