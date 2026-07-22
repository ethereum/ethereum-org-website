"use client"

import { useCallback } from "react"
import { RotateCcw } from "lucide-react"

import type {
  CatalogFilterState,
  CatalogSetFilter,
} from "@/components/FilterableCatalog/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import {
  DEVICES_KEY,
  LANGUAGE_KEY,
  NETWORKS_KEY,
  PURCHASES_KEY,
} from "./WalletFilters"

const asArray = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : []

type WalletFiltersHeaderProps = {
  state: CatalogFilterState
  setFilter: CatalogSetFilter
  labels: { filters: string; reset: string }
}

/**
 * "Filters (N) · Reset" row shown above the search input (outside the bordered
 * group box) — rendered via FilterableCatalog's `renderSidebarHeader` slot so
 * the shared search input can sit between it and the filter groups.
 */
export default function WalletFiltersHeader({
  state,
  setFilter,
  labels,
}: WalletFiltersHeaderProps) {
  const activeCount =
    asArray(state[DEVICES_KEY]).length +
    asArray(state[NETWORKS_KEY]).length +
    asArray(state[PURCHASES_KEY]).length +
    asArray(state[LANGUAGE_KEY]).length

  const reset = useCallback(() => {
    setFilter(DEVICES_KEY, undefined, { scroll: false })
    setFilter(NETWORKS_KEY, undefined, { scroll: false })
    setFilter(PURCHASES_KEY, undefined, { scroll: false })
    setFilter(LANGUAGE_KEY, undefined, { scroll: false })
    trackCustomEvent({
      eventCategory: "WalletFilterSidebar",
      eventAction: "Reset button",
      eventName: "reset_click",
    })
  }, [setFilter])

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
