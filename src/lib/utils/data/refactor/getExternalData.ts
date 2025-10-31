import { MetricReturnData } from "@/lib/types"

import { ExternalDataMap } from "./fetchExternalData"
import { getRedisData } from "./redisClient"
import { getSupabaseData } from "./supabaseClient"

/**
 * Retrieves external data from Redis.
 *
 * @param keys Optional array of keys to retrieve. If not provided, attempts to retrieve all keys.
 * @returns Promise that resolves to the external data map, or null if not found
 */
export const getExternalData = async (
  keys?: string[]
): Promise<ExternalDataMap | null> => {
  // If specific keys are provided, retrieve only those
  if (keys && keys.length > 0) {
    const results = await Promise.all(
      keys.map(async (key) => {
        const data = await getRedisData(key)
        // const data = await getSupabaseData(key)
        return { key, data }
      })
    )

    const dataMap = results.reduce((acc, { key, data }) => {
      if (data !== null && data !== undefined) {
        acc[key] = data as MetricReturnData | Record<string, MetricReturnData>
      }
      return acc
    }, {} as ExternalDataMap)

    return Object.keys(dataMap).length > 0 ? dataMap : null
  }

  // This is more complex and typically requires knowing the keys ahead of time
  // For now, return null and require keys to be specified
  console.warn(
    "Retrieving all external data requires specifying keys. Use the keys parameter."
  )
  return null
}

/**
 * Retrieves a single external data entry from Redis.
 *
 * @param key The key of the external data entry to retrieve
 * @returns Promise that resolves to the data, or null if not found
 */
export const getExternalDataByKey = async <T = unknown>(
  key: string
): Promise<T | null> => {
  const fromRedis = await getRedisData<T>(key)
  if (fromRedis !== null) return fromRedis
  return await getSupabaseData<T>(key)
}

// Test function - run with: npx tsx src/lib/utils/data/refactor/getExternalData.ts
if (require.main === module) {
  import("dotenv/config").then(async () => {
    console.log("Testing getExternalData...")

    try {
      const data = await getExternalData(["ethPrice", "calendarEvents"]) //TODO: this should return list of endpoints to fetch from

      if (data) {
        console.log("\n✅ Successfully retrieved external data:")
        console.log(data)
      }
    } catch (error) {
      console.error("❌ Error testing getExternalData:", error)
      process.exit(1)
    }
  })
}
