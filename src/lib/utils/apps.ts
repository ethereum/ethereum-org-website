import { AppCategory, AppCategoryEnum, AppData } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

import { getValidDate } from "@/lib/utils/date"
import { maybeShuffle } from "@/lib/utils/random"

// Get highlighted apps (apps with highlight=true)
export const getHighlightedApps = (
  appsData: Record<AppCategory, AppData[]>,
  count?: number,
  category?: AppCategory
) => {
  const appsToFilter = category
    ? appsData[category]
    : Object.values(appsData).flatMap((categoryApps) => categoryApps)

  const highlightedApps = maybeShuffle(
    appsToFilter.filter((app) => app.highlight)
  )

  return count ? highlightedApps.slice(0, count) : highlightedApps
}

// Get discover apps (apps with discover=true)
export const getDiscoverApps = (
  appsData: Record<AppCategory, AppData[]>,
  count?: number
) => {
  const discoverApps = maybeShuffle(
    Object.values(appsData)
      .flatMap((categoryDapps) => categoryDapps)
      .filter((app) => app.discover)
  )

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

export const parseAppsOfTheWeek = (
  appsData: Record<AppCategory, AppData[]>
) => {
  const currentDate = new Date()

  const appsOfTheWeek = maybeShuffle(
    Object.values(appsData)
      .flatMap((categoryApps) => categoryApps)
      .filter((app) => {
        // Handle both Date objects and date strings (for mock data)
        const startDate = getValidDate(app.appOfTheWeekStartDate)
        const endDate = getValidDate(app.appOfTheWeekEndDate)

        return (
          startDate &&
          endDate &&
          currentDate >= startDate &&
          currentDate <= endDate
        )
      })
  )
  return appsOfTheWeek
}
