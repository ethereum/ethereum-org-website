"use client"

import {
  type ReactNode,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react"

import Input from "@/components/ui/input"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type {
  CatalogFilterFn,
  CatalogFilterState,
  CatalogSetFilter,
} from "./types"

export type FilterableCatalogLabels = {
  searchPlaceholder: string
  resultsLabel: string
  noResults: string
}

export type CatalogSidebarHelpers = {
  state: CatalogFilterState
  setFilter: CatalogSetFilter
}

export type FilterableCatalogProps<TItem> = {
  locale: string
  items: TItem[]
  filterFn: CatalogFilterFn<TItem>
  labels: FilterableCatalogLabels
  /**
   * Filter UI, composed by the consumer from building blocks (CatalogNavGroup,
   * CatalogCheckboxGroup, …) or bespoke controls. Receives the shared filter
   * `state` and a `setFilter` writer keyed however the consumer likes.
   */
  renderSidebar: (helpers: CatalogSidebarHelpers) => ReactNode
  renderResults: (items: TItem[]) => ReactNode
  /** Optional line rendered above the results count (e.g. an active-path breadcrumb) */
  renderResultsHeader?: (state: CatalogFilterState) => ReactNode
  className?: string
}

/**
 * Client island for filterable listing pages: it owns the layout shell, the
 * search input, the filter `state` bag, and the `useDeferredValue` pipeline
 * that keeps typing/filtering responsive on large catalogs — then renders the
 * count header and no-results state. Everything divergent between pages is
 * composed in: the consumer draws its own filters (`renderSidebar`), decides
 * membership (`filterFn`, including how search matches), and owns the results
 * markup (`renderResults`).
 */
export default function FilterableCatalog<TItem>({
  locale,
  items,
  filterFn,
  labels,
  renderSidebar,
  renderResults,
  renderResultsHeader,
  className,
}: FilterableCatalogProps<TItem>) {
  const nf = numberFormat(locale)
  const [search, setSearch] = useState("")
  const [selection, setSelection] = useState<CatalogFilterState>({})
  const resultsTopRef = useRef<HTMLDivElement | null>(null)

  // Defer the heavy filter + grid render so typing and filtering stay responsive
  const deferredSearch = useDeferredValue(search)
  const deferredSelection = useDeferredValue(selection)
  const isStale = search !== deferredSearch || selection !== deferredSelection

  const setFilter: CatalogSetFilter = (key, value) => {
    setSelection((prev) => ({ ...prev, [key]: value }))
    resultsTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const filteredItems = useMemo(
    () =>
      items.filter((item) => filterFn(item, deferredSelection, deferredSearch)),
    [items, filterFn, deferredSelection, deferredSearch]
  )

  // Filter UI reads live selection (not deferred) so controls reflect input
  // immediately; only the results below deferred-render.
  const sidebar = renderSidebar({ state: selection, setFilter })

  return (
    <Section id="catalog" className={cn("space-y-5", className)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full"
            />
            <div className="max-h-[calc(100vh-11rem)] space-y-4 overflow-y-auto rounded-xl border p-2">
              {sidebar}
            </div>
          </div>
        </aside>

        <div className="space-y-4 lg:-mt-5">
          <div className="space-y-3 lg:hidden">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full"
            />
            <div className="space-y-4 rounded-xl border p-2">{sidebar}</div>
          </div>
          <div ref={resultsTopRef} className="scroll-mt-24" />
          {renderResultsHeader?.(selection)}

          <p className="text-sm text-body-medium">
            {labels.resultsLabel}:{" "}
            <strong>{nf.format(filteredItems.length)}</strong> /{" "}
            {nf.format(items.length)}
          </p>

          <div
            className={cn(
              "space-y-8 transition-opacity",
              isStale && "opacity-60"
            )}
          >
            {renderResults(filteredItems)}
          </div>
          {filteredItems.length === 0 && (
            <div className="rounded-xl border p-8 text-center text-body-medium">
              {labels.noResults}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
