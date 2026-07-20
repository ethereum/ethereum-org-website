export type CatalogSelectOption = {
  id: string
  label: string
  count?: number
}

export type CatalogNavItem = {
  id: string
  label: string
  href: string
  count: number
  /** Marks the item matching the current route; its children render as filters */
  isCurrent?: boolean
  /** Single-select filter options shown while this item is current */
  children?: CatalogSelectOption[]
}

/**
 * Presentational data for the `CatalogNavGroup` building block: top-level
 * entries are real route links (server-rendered listing pages); the children of
 * the current entry are the single-select options. The block is controlled —
 * the consumer owns where the selected child id lives.
 */
export type CatalogNavGroupConfig = {
  allLabel: string
  allHref: string
  allCount: number
  items: CatalogNavItem[]
}

/**
 * Presentational data for the `CatalogCheckboxGroup` building block: a labelled
 * set of independent checkboxes. The block is controlled — the consumer owns
 * the selected ids and how the group combines with others (AND/OR) in `filterFn`.
 */
export type CatalogCheckboxGroupConfig = {
  label: string
  options: CatalogSelectOption[]
}

/** Selected filter values keyed by an arbitrary consumer-chosen key */
export type CatalogFilterState = Record<string, string | string[] | undefined>

export type CatalogSetFilterOptions = {
  /**
   * Scroll the results region into view after the change. Defaults to `true`
   * (right for single-select nav); pass `false` for multi-select toggles like
   * checkboxes, where scrolling on every tick is jarring.
   */
  scroll?: boolean
}

export type CatalogSetFilter = (
  key: string,
  value: string | string[] | undefined,
  options?: CatalogSetFilterOptions
) => void

export type CatalogFilterFn<TItem> = (
  item: TItem,
  state: CatalogFilterState,
  query: string
) => boolean
