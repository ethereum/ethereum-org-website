import { DappCategory, DappCategoryEnum, DappData } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

import { collectiblesDapps } from "./collectibles"
import { defiDapps } from "./defi"
import { gamingDapps } from "./gaming"
import { socialDapps } from "./social"

export const DAPPS_DATA: Record<DappCategory, DappData[]> = {
  [DappCategoryEnum.DEFI]: defiDapps,
  [DappCategoryEnum.COLLECTIBLE]: collectiblesDapps,
  [DappCategoryEnum.SOCIAL]: socialDapps,
  [DappCategoryEnum.GAMING]: gamingDapps,
  [DappCategoryEnum.BRIDGE]: [],
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

const DAPPS_STAFF_PICK_NAMES = ["Aave", "Aave", "Aave", "Aave", "Aave", "Aave"]

export const DAPPS_STAFF_PICK_DATA: DappData[] = DAPPS_STAFF_PICK_NAMES.map(
  (name) => {
    return Object.values(DAPPS_DATA)
      .flatMap((categoryDapps) => categoryDapps)
      .find((dapp) => dapp.name === name)!
  }
)

export const DAPP_TAG_VARIANTS: Record<DappCategoryEnum, TagProps["status"]> = {
  [DappCategoryEnum.DEFI]: "tag",
  [DappCategoryEnum.COLLECTIBLE]: "success",
  [DappCategoryEnum.SOCIAL]: "error",
  [DappCategoryEnum.GAMING]: "warning",
  [DappCategoryEnum.BRIDGE]: "normal",
}
