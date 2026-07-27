/** Add/remove an id from a multi-select array — for wiring CatalogCheckboxGroup */
export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id)
    ? ids.filter((existing) => existing !== id)
    : [...ids, id]
}

/**
 * Normalize a filter-state slot (string | string[] | undefined) to an array.
 * A single-select slot holds a bare string, so it widens to a one-item array
 * rather than being dropped.
 */
export const asArray = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) return value
  return value === undefined ? [] : [value]
}
