/**
 * Caches the result of an asynchronous function in memory to avoid multiple calls.
 * This helps prevent hitting external API rate limits by storing the result in memory.
 *
 * @param key A unique identifier for the cached function result
 * @param fn The asynchronous function to be cached
 * @param options Optional parameters to configure cache behavior
 * @param options.cacheTimeout The duration in milliseconds for which the cache remains valid
 * @returns A new function that returns the cached result or executes the original function if the cache is expired
 *
 * @example
 * const cachedFetch = cacheAsyncFn('uniqueKey', fetchSomething, { cacheTimeout: 60000 });
 *
 * await cachedFetch(); // Fetches and caches the data
 * await cachedFetch(); // Returns the cached data
 */

// In-memory cache object
const memoryCache: Record<string, { value: unknown; timestamp: number }> = {}

export function cacheAsyncFn<T>(
  key: string,
  fn: () => Promise<T>,
  options?: { cacheTimeout?: number }
) {
  return async (): Promise<T> => {
    const now = Date.now()
    const cachedItem = memoryCache[key]

    // Check if cache exists and is not expired
    if (cachedItem) {
      const cacheAge = now - cachedItem.timestamp
      const isCacheExpired =
        options?.cacheTimeout && cacheAge > options.cacheTimeout

      if (!isCacheExpired) {
        console.log("Cache hit", key)
        return cachedItem.value as T
      }
      console.log("Cache expired", key)
    }

    // Fetch fresh data
    console.log("Running function", key)
    const value = await fn()

    // Store in memory cache
    memoryCache[key] = { value: value, timestamp: now }
    console.log("Function result cached", key)

    return value as T
  }
}
