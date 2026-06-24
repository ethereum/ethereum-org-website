/**
 * Aggregate tag occurrences across a list of items into count-sorted entries.
 *
 * Generic over the item type -- pass a `getTags` selector to pull the tag list
 * off each item. Returns `[tag, count]` entries sorted by count descending;
 * ties keep first-seen order (Map iteration order + stable sort).
 *
 * Does NOT normalize tag strings (casing, trimming). Each data source stays
 * responsible for its own tag hygiene at ingestion.
 */
export const getTagCounts = <T>(
  items: T[],
  getTags: (item: T) => Array<string> | undefined
): Array<[string, number]> => {
  const counts = new Map<string, number>()

  for (const item of items) {
    for (const tag of getTags(item) ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}
