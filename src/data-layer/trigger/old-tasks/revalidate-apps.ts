import { schedules } from "@trigger.dev/sdk/v3"

import { slugify } from "@/lib/utils/url"

import { fetchApps } from "@/data-layer/fetchers/fetchApps"

import { revalidatePaths } from "./utils"

const categoriesSlugs = [
  "defi",
  "collectibles",
  "social",
  "gaming",
  "bridge",
  "productivity",
  "privacy",
  "dao",
]

export const revalidateAppsPages = schedules.task({
  id: "revalidate-apps-pages",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    // Generate dynamic paths
    const paths = ["/apps", "/apps/"]

    // Add category paths
    categoriesSlugs.forEach((category) => {
      paths.push(`/apps/categories/${category}`)
    })

    // Fetch apps data and add individual app paths
    try {
      const appsData = await fetchApps()

      Object.values(appsData)
        .flat()
        .forEach((app) => {
          const appSlug = slugify(app.name)
          paths.push(`/apps/${appSlug}`)
        })
    } catch (error) {
      console.error("Failed to fetch apps data for revalidation:", error)
      // Continue with category paths even if app fetching fails
    }

    console.log(`Revalidating ${paths.length} paths:`, paths)
    await revalidatePaths(paths)
  },
})
