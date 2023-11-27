export function cacheAsyncFn<T>(fn: () => Promise<T>) {
  let value: T | undefined

  return async (): Promise<T> => {
    if (value === undefined) {
      value = await fn()
    }

    return value
  }
}
