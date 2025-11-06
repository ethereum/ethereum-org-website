import { AppCategory, AppCategoryEnum, AppData } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

/**
 * Converts date strings back to Date objects after JSON deserialization.
 * This is needed because Date objects are serialized as strings when stored in Redis/Supabase.
 */
const convertDateField = (value: unknown): Date | null => {
  if (!value) return null
  if (typeof value === "string") return new Date(value)
  if (value instanceof Date) return value
  return null
}

/**
 * Extracts and normalizes apps data from external data storage.
 * Handles date conversion from JSON strings back to Date objects.
 */
export const extractAppsData = (
  appsDataRaw:
    | { value: Record<string, unknown> }
    | { error: string }
    | undefined
): Record<AppCategory, AppData[]> => {
  if (!appsDataRaw || !("value" in appsDataRaw)) {
    return {} as Record<AppCategory, AppData[]>
  }

  return Object.fromEntries(
    Object.entries(appsDataRaw.value).map(([category, apps]) => [
      category,
      (apps as unknown[]).map((app: unknown) => {
        const appData = app as Record<string, unknown>
        return {
          ...appData,
          appOfTheWeekStartDate: convertDateField(
            appData.appOfTheWeekStartDate
          ),
          appOfTheWeekEndDate: convertDateField(appData.appOfTheWeekEndDate),
        } as AppData
      }),
    ])
  ) as Record<AppCategory, AppData[]>
}

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

export const getDevconnectApps = (appsData: Record<AppCategory, AppData[]>) => {
  const devconnectApps = Object.values(appsData)
    .flatMap((categoryDapps) => categoryDapps)
    .filter((app) => app.devconnect === "true")
  return devconnectApps
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
    .filter(
      (app) =>
        app.appOfTheWeekStartDate &&
        app.appOfTheWeekEndDate &&
        currentDate >= app.appOfTheWeekStartDate &&
        currentDate <= app.appOfTheWeekEndDate
    )
    .sort(() => Math.random() - 0.5)
  return appsOfTheWeek
}
