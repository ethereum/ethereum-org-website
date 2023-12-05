/**
 * Run an async function only once and cache the result during build time to avoid multiple calls. The purpose is to avoid hitting external APIs rate limits.
 *
 * @param fn async function to run only once
 * @returns a new function that will run the async function only once
 *
 * @example
 *
 * const cachedFetch = runOnlyOnce(fetchSomething)
 *
 * await cachedFetch() // will fetch the data
 * await cachedFetch() // will not fetch the data, but return the cached value
 */
export function runOnlyOnce<T>(fn: () => Promise<T>) {
  let value: T | undefined

  return async (): Promise<T> => {
    if (value === undefined) {
      value = await fn()
    }

    return value
  }
}
