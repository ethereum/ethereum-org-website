import { AppCategory, AppCategoryEnum, AppData } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

import { isValidDate } from "@/lib/utils/date"

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

export const parseAppsOfTheWeek = (
  appsData: Record<AppCategory, AppData[]>
) => {
  const currentDate = new Date()
  const appsOfTheWeek = Object.values(appsData)
    .flatMap((categoryApps) => categoryApps)
    .filter((app) => {
      // Handle both Date objects and date strings (for mock data)
      const startDate = isValidDate(
        app.appOfTheWeekStartDate instanceof Date
          ? app.appOfTheWeekStartDate.toISOString()
          : (app.appOfTheWeekStartDate ?? undefined)
      )
        ? new Date(app.appOfTheWeekStartDate!)
        : null
      const endDate = isValidDate(
        app.appOfTheWeekEndDate instanceof Date
          ? app.appOfTheWeekEndDate.toISOString()
          : (app.appOfTheWeekEndDate ?? undefined)
      )
        ? new Date(app.appOfTheWeekEndDate!)
        : null

      return (
        startDate &&
        endDate &&
        currentDate >= startDate &&
        currentDate <= endDate
      )
    })
    .sort(() => Math.random() - 0.5)
  return appsOfTheWeek
}
