import { DappCategory, DappCategoryEnum, DappData } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

// Get highlighted dapps (dapps with highlight=true)
export const getHighlightedDapps = (
  dappsData: Record<DappCategory, DappData[]>,
  count?: number,
  category?: DappCategory
) => {
  const dappsToFilter = category
    ? dappsData[category]
    : Object.values(dappsData).flatMap((categoryDapps) => categoryDapps)

  const highlightedDapps = dappsToFilter
    .filter((dapp) => dapp.highlight)
    .sort(() => Math.random() - 0.5)

  return count ? highlightedDapps.slice(0, count) : highlightedDapps
}

// Get staff pick dapps (dapps with staffPicks=true)
export const getStaffPickDapps = (
  dappsData: Record<DappCategory, DappData[]>,
  count?: number
) => {
  const staffPickDapps = Object.values(dappsData)
    .flatMap((categoryDapps) => categoryDapps)
    .filter((dapp) => dapp.staffPicks)
    .sort(() => Math.random() - 0.5)

  return count ? staffPickDapps.slice(0, count) : staffPickDapps
}

export const DAPP_TAG_VARIANTS: Record<DappCategoryEnum, TagProps["status"]> = {
  [DappCategoryEnum.DEFI]: "tag",
  [DappCategoryEnum.COLLECTIBLE]: "success",
  [DappCategoryEnum.SOCIAL]: "error",
  [DappCategoryEnum.GAMING]: "warning",
  [DappCategoryEnum.BRIDGE]: "normal",
  [DappCategoryEnum.PRODUCTIVITY]: "normal",
  [DappCategoryEnum.PRIVACY]: "normal",
  [DappCategoryEnum.GOVERNANCE_DAO]: "normal",
}
