/**
 * Redis client utility for storing and retrieving external data.
 * Supports both Upstash Redis (serverless-friendly) and regular Redis.
 */

type RedisClient = {
  set: (
    key: string,
    value: string,
    options?: { ex?: number }
  ) => Promise<string | null>
  get: (key: string) => Promise<string | null>
  del: (key: string) => Promise<number>
}

let redisClient: RedisClient | null = null
let hasWarned = false

/**
 * Initialize and return a Redis client instance.
 * Prefers Upstash Redis if environment variables are set, otherwise falls back to regular Redis (ioredis).
 */
export const getRedisClient = async (): Promise<RedisClient | null> => {
  if (redisClient) {
    return redisClient
  }

  // Try Upstash Redis first (serverless-friendly)
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (upstashUrl && upstashToken) {
    try {
      const { Redis } = await import("@upstash/redis")
      const upstashClient = new Redis({
        url: upstashUrl,
        token: upstashToken,
      })

      // Wrap Upstash client to match our RedisClient interface
      redisClient = {
        set: async (key: string, value: string, options?: { ex?: number }) => {
          if (options?.ex) {
            return await upstashClient.set(key, value, { ex: options.ex })
          }
          return await upstashClient.set(key, value)
        },
        get: async (key: string) => {
          const result = await upstashClient.get(key)
          // Upstash may parse JSON automatically, but we store strings
          // Return as-is if it's already a string, otherwise stringify
          if (result === null || result === undefined) {
            return null
          }
          return typeof result === "string" ? result : JSON.stringify(result)
        },
        del: async (key: string) => {
          return await upstashClient.del(key)
        },
      }
      return redisClient
    } catch (error) {
      console.error("Failed to initialize Upstash Redis:", error)
    }
  }

  if (!hasWarned) {
    console.warn(
      "Redis not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for Upstash, or REDIS_URL for regular Redis."
    )
    hasWarned = true
  }
  return null
}

/**
 * Store data in Redis with an optional expiration time.
 */
export const setRedisData = async (
  key: string,
  value: unknown,
  ttlSeconds?: number
): Promise<boolean> => {
  const client = await getRedisClient()
  if (!client) {
    console.warn("Redis client not available, skipping storage")
    return false
  }

  try {
    const serialized = JSON.stringify(value)
    await client.set(
      `external-data:${key}`,
      serialized,
      ttlSeconds ? { ex: ttlSeconds } : undefined
    )
    return true
  } catch (error) {
    console.error(`Failed to store data in Redis for key "${key}":`, error)
    return false
  }
}

/**
 * Retrieve data from Redis.
 */
export const getRedisData = async <T>(key: string): Promise<T | null> => {
  const client = await getRedisClient()
  if (!client) {
    return null
  }

  try {
    const data = await client.get(`external-data:${key}`)
    if (!data) {
      return null
    }
    return JSON.parse(data) as T
  } catch (error) {
    console.error(`Failed to retrieve data from Redis for key "${key}":`, error)
    return null
  }
}

/**
 * Delete data from Redis.
 */
export const deleteRedisData = async (key: string): Promise<boolean> => {
  const client = await getRedisClient()
  if (!client) {
    return false
  }

  try {
    await client.del(`external-data:${key}`)
    return true
  } catch (error) {
    console.error(`Failed to delete data from Redis for key "${key}":`, error)
    return false
  }
}

/**
 * Store external data in Redis with the standard key prefix.
 * This abstracts the Redis-specific storage logic for external data.
 *
 * @param key The data key (e.g., "beaconchainEpoch", "activPrice")
 * @param value The data value to store
 * @param ttlSeconds Optional TTL in seconds
 * @returns Promise that resolves to true if storage was successful, false otherwise
 */
export const storeRedis = async (
  key: string,
  value: unknown,
  ttlSeconds?: number
): Promise<boolean> => {
  const redisKey = `external-data:${key}`
  return await setRedisData(redisKey, value, ttlSeconds)
}
