import { DEV_APP_CATEGORY_SLUGS } from "./constants"
import type { DeveloperApp, DeveloperAppsByCategory } from "./types"

export const transformDeveloperAppsData = (
  data: DeveloperApp[]
): DeveloperAppsByCategory => {
  const initialAcc = Object.values(DEV_APP_CATEGORY_SLUGS).reduce(
    (acc, slug) => {
      acc[slug] = []
      return acc
    },
    {} as DeveloperAppsByCategory
  )

  return data.reduce((acc, app) => {
    const slug = DEV_APP_CATEGORY_SLUGS[app.category]
    acc[slug].push(app)
    return acc
  }, initialAcc)
}
