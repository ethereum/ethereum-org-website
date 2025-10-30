import { ExternalDataMap } from "./fetchExternalData"
import { getRedisData } from "./redisClient"

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
        const redisKey = `external-data:${key}`
        const data = await getRedisData(redisKey)
        return { key, data }
      })
    )

    const dataMap = results.reduce((acc, { key, data }) => {
      if (data !== null) {
        acc[key] = data
      }
      return acc
    }, {} as ExternalDataMap)

    return Object.keys(dataMap).length > 0 ? dataMap : null
  }

  // Otherwise, you would need to scan Redis for all keys with prefix "external-data:"
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
  const redisKey = `external-data:${key}`
  return await getRedisData<T>(redisKey)
}
