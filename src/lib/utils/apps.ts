import { AppCategory, AppCategoryEnum, AppData } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

// Get highlighted apps (apps with highlight=true)
export const getHighlightedApps = (
  appsData: Record<AppCategory, AppData[]>,
  count?: number,
  category?: AppCategory
) => {
  const appsToFilter = category
    ? appsData[category]
    : Object.values(appsData).flatMap((categoryApps) => categoryApps)

  const highlightedApps = appsToFilter
    .filter((app) => app.highlight)
    .sort(() => Math.random() - 0.5)

  return count ? highlightedApps.slice(0, count) : highlightedApps
}

// Get discover apps (apps with discover=true)
export const getDiscoverApps = (
  appsData: Record<AppCategory, AppData[]>,
  count?: number
) => {
  const discoverApps = Object.values(appsData)
    .flatMap((categoryDapps) => categoryDapps)
    .filter((app) => app.discover)
    .sort(() => Math.random() - 0.5)

  return count ? discoverApps.slice(0, count) : discoverApps
}

export const APP_TAG_VARIANTS: Record<AppCategoryEnum, TagProps["status"]> = {
  [AppCategoryEnum.DEFI]: "tag",
  [AppCategoryEnum.COLLECTIBLE]: "success",
  [AppCategoryEnum.SOCIAL]: "error",
  [AppCategoryEnum.GAMING]: "warning",
  [AppCategoryEnum.BRIDGE]: "normal",
  [AppCategoryEnum.PRODUCTIVITY]: "normal",
  [AppCategoryEnum.PRIVACY]: "normal",
  [AppCategoryEnum.GOVERNANCE_DAO]: "normal",
}
