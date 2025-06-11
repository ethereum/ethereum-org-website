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
