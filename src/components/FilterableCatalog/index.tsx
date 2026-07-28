"use client"

import {
  type ReactNode,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { RotateCcw, X } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"
import { PersistentPanel } from "@/components/ui/persistent-panel"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { numberFormat } from "@/lib/utils/numbers"

import type {
  CatalogFilterFn,
  CatalogFilterState,
  CatalogSetFilter,
} from "./types"

// Fires once the query settles, so one event per search rather than per keystroke.
const SEARCH_TRACKING_DEBOUNCE_MS = 1200

export type FilterableCatalogLabels = {
  searchPlaceholder: string
  resultsLabel: string
  noResults: string
  /** Second line of the empty state. */
  noResultsDesc?: string
  /** Empty-state reset button; the button renders only when this is provided. */
  resetLabel?: string
  /** Collapsed mobile filter-bar label (required when `mobileVariant="sheet"`). */
  filtersToggle?: string
  /** Mobile "apply" button label, shown as `{applyLabel} ({count})`. */
  applyLabel?: string
  /** Accessible label for the mobile close button. */
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
  /** Optional row above the search input, outside the bordered sidebar box. */
  renderSidebarHeader?: (helpers: CatalogSidebarHelpers) => ReactNode
  renderResults: (items: TItem[]) => ReactNode
  /** Optional line rendered above the results count (e.g. an active-path breadcrumb) */
  renderResultsHeader?: (state: CatalogFilterState) => ReactNode
  /**
   * How filters are presented below `lg`. `"inline"` (default) drops the sidebar
   * into the page flow; `"sheet"` collapses it behind a "Filters" bar and needs
   * `labels.filtersToggle` / `labels.applyLabel`.
   */
  mobileVariant?: "inline" | "sheet"
  /**
   * Called after the empty-state reset has cleared both search and filters.
   * The shell owns the clearing; the consumer owns any tracking.
   */
  onReset?: () => void
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
  onReset,
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

  useEffect(() => {
    const query = search.trim()
    if (!query) return
    const timeout = setTimeout(
      () =>
        trackCustomEvent({
          eventCategory: "CatalogSearch",
          eventAction: "search",
          eventName: query,
        }),
      SEARCH_TRACKING_DEBOUNCE_MS
    )
    return () => clearTimeout(timeout)
  }, [search])

  // Clears search too, unlike the sidebar reset — an empty query is often what
  // emptied the results.
  const resetAll = useCallback(() => {
    setSearch("")
    setSelection({})
    onReset?.()
  }, [onReset])

  // Event triple kept from the old shared ProductTable sheet for trend comparability.
  const openMobileFilters = useCallback((open: boolean) => {
    setMobileFiltersOpen(open)
    trackCustomEvent({
      eventCategory: "MobileFilterToggle",
      eventAction: "Tap MobileFilterToggle",
      eventName: `show mobile filters ${open}`,
    })
  }, [])

  // Filter UI reads live selection (not deferred) so controls reflect input
  // immediately; only the results below deferred-render.
  const sidebar = renderSidebar({ state: selection, setFilter })
  const sidebarHeader = renderSidebarHeader?.({ state: selection, setFilter })

  const searchInput = (
    <Input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder={labels.searchPlaceholder}
      aria-label={labels.searchPlaceholder}
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
              {/* Not SheetTrigger: Radix would stamp an aria-controls pointing
                  at SheetContent, which this variant never renders. */}
              <button
                ref={mobileTriggerRef}
                type="button"
                onClick={() => openMobileFilters(true)}
                aria-haspopup="dialog"
                aria-expanded={mobileFiltersOpen}
                className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-start transition-colors hover:bg-background-highlight"
              >
                <span className="text-sm font-bold text-primary">
                  {labels.filtersToggle}
                </span>
                <span className="text-sm text-body-medium">
                  {nf.format(filteredItems.length)}
                </span>
              </button>

              <PersistentPanel
                open={mobileFiltersOpen}
                side="left"
                onOpenChange={openMobileFilters}
                triggerRef={mobileTriggerRef}
                aria-label={labels.filtersToggle}
                className="gap-3 p-4"
              >
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => openMobileFilters(false)}
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
                  onClick={() => openMobileFilters(false)}
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

          <p className="text-sm text-body-medium" aria-live="polite">
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
            <div className="flex flex-col items-center gap-3 rounded-xl border p-8 text-center text-body-medium">
              <p className="m-0 font-bold text-body">{labels.noResults}</p>
              {labels.noResultsDesc && (
                <p className="m-0 max-w-prose">{labels.noResultsDesc}</p>
              )}
              {labels.resetLabel && (
                <Button variant="outline" onClick={resetAll} className="mt-1">
                  <RotateCcw className="size-4" />
                  {labels.resetLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
