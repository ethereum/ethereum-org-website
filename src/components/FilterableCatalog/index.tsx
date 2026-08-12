"use client"

import {
  type ReactNode,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react"
import { ChevronDown } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  /** Which breakpoint's copy of the filter UI is rendering; both are mounted */
  variant: "desktop" | "mobile"
}

/** Collapsed-state summary of the mobile filter panel: active selection + count */
export type CatalogMobileFilterSummary = {
  label: ReactNode
  count?: number
}

export type FilterableCatalogProps<TItem> = {
  locale: string
  items: TItem[]
  /**
   * Decides item membership from the deferred filter `state` and search `query`.
   * Pass a stable reference (defined outside render, or memoized) — it's a
   * dependency of the internal filtering memo, so a fresh function each render
   * re-runs the filter over every item on every render.
   */
  filterFn: CatalogFilterFn<TItem>
  labels: FilterableCatalogLabels
  /**
   * Filter UI, composed by the consumer from building blocks (CatalogNavGroup,
   * CatalogCheckboxGroup, …) or bespoke controls. Receives the shared filter
   * `state` and a `setFilter` writer keyed however the consumer likes.
   */
  renderSidebar: (helpers: CatalogSidebarHelpers) => ReactNode
  renderResults: (items: TItem[]) => ReactNode
  /**
   * When set, the mobile filter panel collapses behind a trigger showing this
   * summary — keeps long filter lists from pushing results off the screen.
   */
  mobileFilterSummary?: CatalogMobileFilterSummary
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
  mobileFilterSummary,
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

  const setFilter: CatalogSetFilter = (key, value, options) => {
    setSelection((prev) => ({ ...prev, [key]: value }))
    if (options?.scroll ?? true) {
      resultsTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const filteredItems = useMemo(
    () =>
      items.filter((item) => filterFn(item, deferredSelection, deferredSearch)),
    [items, filterFn, deferredSelection, deferredSearch]
  )

  // Filter UI reads live selection (not deferred) so controls reflect input
  // immediately; only the results below deferred-render.
  const renderFilters = (variant: CatalogSidebarHelpers["variant"]) =>
    renderSidebar({ state: selection, setFilter, variant })

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
              {renderFilters("desktop")}
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
            {mobileFilterSummary ? (
              <Collapsible className="rounded-xl border">
                <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm hover:bg-background-highlight focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover">
                  <span className="flex-1 text-start">
                    {mobileFilterSummary.label}
                  </span>
                  {typeof mobileFilterSummary.count === "number" && (
                    <span className="text-xs text-body-medium">
                      {nf.format(mobileFilterSummary.count)}
                    </span>
                  )}
                  <ChevronDown className="size-4 shrink-0 text-body-medium transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 p-2 pt-0">
                  {renderFilters("mobile")}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <div className="space-y-4 rounded-xl border p-2">
                {renderFilters("mobile")}
              </div>
            )}
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
