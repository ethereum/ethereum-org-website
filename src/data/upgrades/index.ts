import { glamsterdam } from "./glamsterdam"
import type { UpgradeData } from "./types"

export * from "./types"

export const upgrades: Record<string, UpgradeData> = {
  glamsterdam,
}
