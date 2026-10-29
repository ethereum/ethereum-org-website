"use client"

import { useCallback } from "react"
import { RotateCcw } from "lucide-react"

import type { CatalogFilterState, CatalogSetFilter } from "./types"
import { asArray } from "./utils"

type CatalogFiltersHeaderProps = {
  state: CatalogFilterState
  setFilter: CatalogSetFilter
  /** The filter keys this header counts and clears. */
  keys: readonly string[]
  labels: { filters: string; reset: string }
  /** Fires after the filters are cleared, e.g. for page-specific tracking. */
  onReset?: () => void
}

/** "Filters (n) · Reset" row, rendered via FilterableCatalog's `renderSidebarHeader` slot. */
export default function CatalogFiltersHeader({
  state,
  setFilter,
  keys,
  labels,
  onReset,
}: CatalogFiltersHeaderProps) {
  const activeCount = keys.reduce(
    (total, key) => total + asArray(state[key]).length,
    0
  )

  const reset = useCallback(() => {
    for (const key of keys) {
      setFilter(key, undefined, { scroll: false })
    }
    onReset?.()
  }, [setFilter, keys, onReset])

  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-sm font-bold">
        {labels.filters} ({activeCount})
      </p>
      <button
        type="button"
        onClick={reset}
        disabled={activeCount === 0}
        className="flex items-center gap-1.5 text-sm text-primary transition-opacity hover:underline disabled:pointer-events-none disabled:opacity-40"
      >
        <RotateCcw className="size-4" />
        {labels.reset}
      </button>
    </div>
  )
}
