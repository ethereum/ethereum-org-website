import { cacheAsyncFn } from "./cacheAsyncFn"
import { loadMockData } from "./loadMockData"

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true"
if (USE_MOCK_DATA) console.warn("Using mock data")

if (USE_MOCK_DATA) {
  console.warn("Using mock data")
}

type DataLoaderFunction<T> = () => Promise<T>

/**
 * Creates a function that loads data from multiple asynchronous functions and caches the results.
 *
 * @param loaders An array of tuples, each containing a unique identifier and the asynchronous function to be cached
 * @param cacheTimeout Optional cache timeout in milliseconds
 * @returns A function that, when called, executes the loaders and returns a promise with the results
 *
 * @example
 * const loadData = dataLoader([
 *   ['ethPrice', fetchEthPrice],
 *   ['totalEthStaked', fetchTotalEthStaked],
 *   ['totalValueLocked', fetchTotalValueLocked],
 * ]);
 *
 * const [ethPrice, totalEthStaked, totalValueLocked] = await loadData();
 */

export function dataLoader<T extends unknown[]>(
  loaders: {
    [K in keyof T]: [string, DataLoaderFunction<T[K]>]
  },
  cacheTimeout?: number
): () => Promise<T> {
  const cachedLoaders = loaders.map(([key, loader]) => {
    const cachedLoader = cacheAsyncFn(key, loader, {
      cacheTimeout,
    })
    return async () => {
      try {
        if (USE_MOCK_DATA) return await loadMockData(key)

        return await cachedLoader()
      } catch (error) {
        console.error(`Error in dataLoader for key "${key}":`, error)
        throw error
      }
    }
  })

  return async () => {
    const results = await Promise.all(cachedLoaders.map((loader) => loader()))
    return results as T
  }
}
