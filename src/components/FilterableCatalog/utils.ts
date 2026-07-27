export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id)
    ? ids.filter((existing) => existing !== id)
    : [...ids, id]
}

/** Normalize a filter-state slot to an array; a single-select string widens. */
export const asArray = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) return value
  return value === undefined ? [] : [value]
}
