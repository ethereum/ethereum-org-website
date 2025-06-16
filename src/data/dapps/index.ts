import { DappCategory, DappData } from "@/lib/types"

import { defiDapps } from "./defi"

export const DAPPS_DATA: Record<DappCategory, DappData[]> = {
  defi: defiDapps,
  collectible: [],
  social: [],
  gaming: [],
  dao: [],
  bridge: [],
}

export const VALID_DAPPS = Object.values(DAPPS_DATA).flatMap((categoryDapps) =>
  categoryDapps.map((dapp) => dapp.name)
)

const DAPPS_HIGHLIGHT_NAMES = ["Aave", "Aave", "Aave"]

export const DAPPS_HIGHLIGHT_DATA: DappData[] = DAPPS_HIGHLIGHT_NAMES.map(
  (name) => {
    return Object.values(DAPPS_DATA)
      .flatMap((categoryDapps) => categoryDapps)
      .find((dapp) => dapp.name === name)!
  }
)
