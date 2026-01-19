import type { DeveloperAppsResponse } from "@/lib/types"

import { DEV_APP_CATEGORY_SLUGS } from "./constants"
import type { DeveloperAppsByCategory } from "./types"

export const transformDeveloperAppsData = (
  data: DeveloperAppsResponse[]
): DeveloperAppsByCategory => {
  const initialAcc = Object.values(DEV_APP_CATEGORY_SLUGS).reduce(
    (acc, slug) => {
      acc[slug] = []
      return acc
    },
    {} as DeveloperAppsByCategory
  )

  return data.reduce((acc, { category, ...item }) => {
    const slug = DEV_APP_CATEGORY_SLUGS[category]
    acc[slug].push(item)
    return acc
  }, initialAcc)
}
