import { schedules } from "@trigger.dev/sdk/v3"

import { slugify } from "@/lib/utils/url"

import { appsCategories } from "@/data/apps/categories"

import { revalidatePaths } from "./utils"

import { fetchApps } from "@/lib/api/fetchApps"

export const revalidateAppsPages = schedules.task({
  id: "revalidate-apps-pages",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    // Generate dynamic paths
    const paths = ["/apps", "/apps/"]

    // Add category paths
    Object.values(appsCategories).forEach((category) => {
      paths.push(`/apps/categories/${category.slug}`)
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
