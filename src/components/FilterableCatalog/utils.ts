/** Add/remove an id from a multi-select array — for wiring CatalogCheckboxGroup */
export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id)
    ? ids.filter((existing) => existing !== id)
    : [...ids, id]
}

/** Normalize a filter-state slot (string | string[] | undefined) to an array. */
export const asArray = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : []
