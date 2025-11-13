import { ExternalDataReturnData } from "@/lib/types"

import { ExternalDataMap } from "./fetchExternalData"
import { loadMockDataForKeys } from "./loadMockData"
import { getRedisData } from "./redisClient"
import { getSupabaseData } from "./supabaseClient"

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true"

/**
 * Retrieves external data from Redis/Supabase storage.
 * Caching is handled by the storage clients (getRedisData/getSupabaseData),
 * allowing each client to implement its own caching strategy.
 *
 * If USE_MOCK_DATA environment variable is set to "true", it will load mock data
 * from JSON files in src/data/mocks/ instead of fetching from storage.
 *
 * @param keys Array of keys to retrieve.
 * @param revalidateSeconds Revalidation time in seconds (e.g., 3600 for hourly, 86400 for daily). This is passed to the storage clients for caching configuration.
 * @returns Promise that resolves to the external data map, or null if not found
 */
export const getExternalData = async (
  keys: string[],
  revalidateSeconds: number
): Promise<ExternalDataMap | null> => {
  // If mock data is enabled, load from mock files instead of storage
  if (USE_MOCK_DATA) {
    console.warn("Using mock data for external services")
    const mockDataMap = await loadMockDataForKeys(keys)
    return Object.keys(mockDataMap).length > 0 ? mockDataMap : null
  }

  // Sort keys to ensure consistent processing
  const sortedKeys = [...keys].sort()

  try {
    // Fetch data from Redis (with Supabase fallback) for each key
    const results = await Promise.all(
      sortedKeys.map(async (key) => {
        try {
          // Try Redis first (with caching)
          let data = await getRedisData(key, revalidateSeconds)

          // Fallback to Supabase if Redis returns null (with caching)
          if (data === null) {
            data = await getSupabaseData(key, revalidateSeconds)
          }

          return { key, data }
        } catch (error) {
          console.error(`Error fetching data for key "${key}":`, error)
          return { key, data: null }
        }
      })
    )

    // Build the data map
    const dataMap = results.reduce((acc, { key, data }) => {
      if (data !== null && data !== undefined) {
        acc[key] = data as
          | ExternalDataReturnData
          | Record<string, ExternalDataReturnData>
      }
      return acc
    }, {} as ExternalDataMap)

    return Object.keys(dataMap).length > 0 ? dataMap : null
  } catch (error) {
    console.error("Error fetching external data:", error)
    return null
  }
}
