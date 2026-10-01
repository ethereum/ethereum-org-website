/** Run `fn` over `items` in chunks of `concurrency`; results keep input order. */
export async function mapWithConcurrency<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency = 5
): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency)
    results.push(...(await Promise.all(chunk.map(fn))))
  }
  return results
}
