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
 * Sidebar group whose top-level entries are real route links (server-rendered
 * listing pages), while children of the current entry act as a single-select
 * client-side filter stored under `key`.
 */
export type CatalogNavGroup = {
  type: "nav"
  /** Filter-state key the selected child id is stored under */
  key: string
  allLabel: string
  allHref: string
  allCount: number
  items: CatalogNavItem[]
}

/**
 * Sidebar group of independent checkboxes. Selected option ids are stored
 * under `key` as an array; combining semantics (AND/OR) are up to the
 * consumer's `filterFn`.
 */
export type CatalogCheckboxGroup = {
  type: "checkbox"
  key: string
  label: string
  options: CatalogSelectOption[]
}

export type CatalogFilterGroup = CatalogNavGroup | CatalogCheckboxGroup

/** Selected filter values keyed by group `key` */
export type CatalogFilterState = Record<string, string | string[] | undefined>

export type CatalogFilterFn<TItem> = (
  item: TItem,
  state: CatalogFilterState,
  query: string
) => boolean
