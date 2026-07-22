"use client"

import {
  type ReactNode,
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"
import { PersistentPanel } from "@/components/ui/persistent-panel"
import { Section } from "@/components/ui/section"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

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
  /** Collapsed mobile filter-bar label (required when `mobileVariant="sheet"`). */
  filtersToggle?: string
  /** Mobile sheet "apply" button label, shown as `{applyLabel} ({count})`. */
  applyLabel?: string
  /** Accessible label for the mobile sheet close button. */
  closeLabel?: string
}

export type CatalogSidebarHelpers = {
  state: CatalogFilterState
  setFilter: CatalogSetFilter
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
  /**
   * Optional row rendered above the search input, outside the bordered sidebar
   * box (e.g. a "Filters (N)" count + reset control). Receives the same helpers
   * as `renderSidebar`.
   */
  renderSidebarHeader?: (helpers: CatalogSidebarHelpers) => ReactNode
  renderResults: (items: TItem[]) => ReactNode
  /** Optional line rendered above the results count (e.g. an active-path breadcrumb) */
  renderResultsHeader?: (state: CatalogFilterState) => ReactNode
  /**
   * How filters are presented below `lg`. `"inline"` (default) drops the whole
   * sidebar into the page flow. `"sheet"` collapses it to a "Filters" bar that
   * opens a slide-in panel — using Sheet (trigger) + PersistentPanel (content
   * stays mounted after first open, so the filter form isn't re-rendered on
   * every toggle). Requires `labels.filtersToggle` / `labels.applyLabel`.
   */
  mobileVariant?: "inline" | "sheet"
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
  renderSidebarHeader,
  renderResults,
  renderResultsHeader,
  mobileVariant = "inline",
  className,
}: FilterableCatalogProps<TItem>) {
  const nf = numberFormat(locale)
  const [search, setSearch] = useState("")
  const [selection, setSelection] = useState<CatalogFilterState>({})
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const resultsTopRef = useRef<HTMLDivElement | null>(null)
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null)

  // Defer the heavy filter + grid render so typing and filtering stay responsive
  const deferredSearch = useDeferredValue(search)
  const deferredSelection = useDeferredValue(selection)
  const isStale = search !== deferredSearch || selection !== deferredSelection

  // Stable identity so memoized filter controls don't re-render every keystroke
  const setFilter: CatalogSetFilter = useCallback((key, value, options) => {
    setSelection((prev) => ({ ...prev, [key]: value }))
    if (options?.scroll ?? true) {
      resultsTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [])

  const filteredItems = useMemo(
    () =>
      items.filter((item) => filterFn(item, deferredSelection, deferredSearch)),
    [items, filterFn, deferredSelection, deferredSearch]
  )

  // Filter UI reads live selection (not deferred) so controls reflect input
  // immediately; only the results below deferred-render.
  const sidebar = renderSidebar({ state: selection, setFilter })
  const sidebarHeader = renderSidebarHeader?.({ state: selection, setFilter })

  const searchInput = (
    <Input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder={labels.searchPlaceholder}
      className="w-full"
    />
  )

  return (
    <Section id="catalog" className={cn("space-y-5", className)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            {sidebarHeader}
            {searchInput}
            <div className="max-h-[calc(100vh-11rem)] overflow-y-auto rounded-xl border p-2">
              {sidebar}
            </div>
          </div>
        </aside>

        <div className="space-y-4 lg:-mt-5">
          {mobileVariant === "sheet" ? (
            <div className="lg:hidden">
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <button
                    ref={mobileTriggerRef}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-start transition-colors hover:bg-background-highlight"
                  >
                    <span className="text-sm font-bold text-primary">
                      {labels.filtersToggle}
                    </span>
                    <span className="text-sm text-body-medium">
                      {nf.format(filteredItems.length)}
                    </span>
                  </button>
                </SheetTrigger>
              </Sheet>

              <PersistentPanel
                open={mobileFiltersOpen}
                side="left"
                onOpenChange={setMobileFiltersOpen}
                triggerRef={mobileTriggerRef}
                aria-label={labels.filtersToggle}
                className="gap-3 p-4"
              >
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label={labels.closeLabel}
                    className="grid size-8 place-items-center rounded-full transition-colors hover:bg-background-highlight"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {sidebarHeader}
                  {searchInput}
                  <div className="rounded-xl border p-2">{sidebar}</div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  {labels.applyLabel} ({nf.format(filteredItems.length)})
                </Button>
              </PersistentPanel>
            </div>
          ) : (
            <div className="space-y-3 lg:hidden">
              {sidebarHeader}
              {searchInput}
              <div className="rounded-xl border p-2">{sidebar}</div>
            </div>
          )}
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
