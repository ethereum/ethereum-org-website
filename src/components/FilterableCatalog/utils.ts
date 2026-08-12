/** Add/remove an id from a multi-select array — for wiring CatalogCheckboxGroup */
export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id)
    ? ids.filter((existing) => existing !== id)
    : [...ids, id]
}
