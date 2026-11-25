import type { UpgradeStore } from "./types"

/**
 * Hand-maintained entries for upgrades that predate Forkcast. Forkcast's list
 * starts at The Merge, so the Beacon Chain launch has no record there to sync.
 * Kept out of `generated.ts` so `pnpm sync-upgrades` can never overwrite or
 * drop it. Only add shipped forks with fixed dates here; anything still moving
 * belongs to Forkcast.
 */
export const staticUpgrades = {
  "beacon-chain": {
    slug: "beacon-chain",
    name: "Beacon Chain",
    status: "live",
    mainnetTarget: {
      when: { year: 2020, month: 12, day: 1 },
      confirmed: true,
    },
    milestones: [
      {
        kind: "mainnet",
        when: { year: 2020, month: 12, day: 1 },
        status: "complete",
      },
    ],
    eips: [],
    sourceUrl: null,
  },
} satisfies UpgradeStore
