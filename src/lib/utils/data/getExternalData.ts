import { unstable_cache } from "next/cache"

import { ExternalDataReturnData } from "@/lib/types"

import { ExternalDataMap } from "./fetchExternalData"
import { loadMockDataForKeys } from "./loadMockData"
import { getRedisData } from "./redisClient"
import { getSupabaseData } from "./supabaseClient"

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true"

/**
 * Fetches external data directly from Redis/Supabase storage.
 * This is the underlying function that will be cached by unstable_cache.
 *
 * @param keys Array of keys to retrieve.
 * @returns Promise that resolves to the external data map, or null if not found
 */
async function fetchExternalDataFromStorage(
  keys: string[]
): Promise<ExternalDataMap | null> {
  // Fetch data from Redis (with Supabase fallback) for each key
  const results = await Promise.all(
    keys.map(async (key) => {
      try {
        // Try Redis first
        let data = await getRedisData(key)

        // Fallback to Supabase if Redis returns null
        if (data === null) {
          data = await getSupabaseData(key)
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
}

/**
 * Retrieves external data using Next.js unstable_cache for build-time and runtime caching.
 * This function fetches directly from Redis/Supabase storage and uses Next.js caching
 * to avoid unnecessary database queries.
 *
 * The caching is handled internally using unstable_cache, so pages don't need to
 * worry about caching - they just call getExternalData and it's automatically cached.
 *
 * If USE_MOCK_DATA environment variable is set to "true", it will load mock data
 * from JSON files in src/data/mocks/ instead of fetching from storage.
 *
 * @param keys Array of keys to retrieve.
 * @param revalidateSeconds Revalidation time in seconds (e.g., 3600 for hourly, 86400 for daily).
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

  // Sort keys to ensure consistent cache key generation
  const sortedKeys = [...keys].sort()
  const keysString = sortedKeys.join(",")

  // Use unstable_cache to cache the fetch operation
  // The cache key includes both the keys and revalidation time to ensure proper caching
  // Revalidation time matches the requested revalidation period
  // Tags allow for cache invalidation by key using revalidateTag()
  // Note: unstable_cache creates a new cached function each time, but Next.js manages
  // the cache entries based on the keyParts, so this is efficient
  try {
    const cachedFetch = unstable_cache(
      async () => fetchExternalDataFromStorage(sortedKeys),
      ["external-data", keysString, String(revalidateSeconds)],
      {
        revalidate: revalidateSeconds,
        tags: sortedKeys.map((key) => `external-data:${key}`),
      }
    )

    return await cachedFetch()
  } catch (error) {
    console.error("Error fetching external data:", error)
    return null
  }
}
