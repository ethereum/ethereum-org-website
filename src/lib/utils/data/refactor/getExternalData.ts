import { getBaseUrl } from "@/lib/utils/url"

import { ExternalDataMap } from "./fetchExternalData"

/**
 * Retrieves external data using Next.js fetch with caching and revalidation.
 * This function wraps the Redis/Supabase data access through an API route,
 * allowing Next.js to handle caching automatically.
 *
 * @param keys Array of keys to retrieve.
 * @param revalidateSeconds Revalidation time in seconds (e.g., 3600 for hourly, 86400 for daily).
 * @returns Promise that resolves to the external data map, or null if not found
 */
export const getExternalData = async (
  keys: string[],
  revalidateSeconds: number
): Promise<ExternalDataMap | null> => {
  try {
    // Use absolute URL - required for fetch in server components
    const baseUrl = getBaseUrl()
    const url = `${baseUrl}/api/external-data?keys=${encodeURIComponent(keys.join(","))}&revalidate=${revalidateSeconds}`

    const response = await fetch(url, {
      next: {
        revalidate: revalidateSeconds,
      },
    })

    if (!response.ok) {
      // Try to get error details from response
      let errorDetails = ""
      try {
        const errorData = await response.json()
        errorDetails = JSON.stringify(errorData, null, 2)
        console.error(
          `Failed to fetch external data: ${response.status} ${response.statusText}`
        )
        console.error("Error response:", errorDetails)
      } catch {
        try {
          errorDetails = await response.text()
          console.error(
            `Failed to fetch external data: ${response.status} ${response.statusText}`
          )
          console.error("Error response (text):", errorDetails)
        } catch {
          console.error(
            `Failed to fetch external data: ${response.status} ${response.statusText} (could not read error response)`
          )
        }
      }
      return null
    }

    const dataMap: ExternalDataMap = await response.json()

    return Object.keys(dataMap).length > 0 ? dataMap : null
  } catch (error) {
    console.error("Error fetching external data:", error)
    return null
  }
}
