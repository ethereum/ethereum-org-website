"use client"

import { useCallback, useMemo } from "react"
import { RotateCcw } from "lucide-react"

import type {
  CatalogFilterState,
  CatalogSetFilter,
} from "@/components/FilterableCatalog/types"
import { toggleId } from "@/components/FilterableCatalog/utils"

import { trackCustomEvent } from "@/lib/utils/matomo"

import WalletFilterGroup, { type WalletFilterOption } from "./WalletFilterGroup"

// Shared filter-state keys, imported by WalletsCatalog's filterFn so the writer
// (setFilter here) and reader (filterWallet) stay in sync.
export const DEVICES_KEY = "devices"
export const NETWORKS_KEY = "networks"
export const PURCHASES_KEY = "purchases"
export const LANGUAGE_KEY = "language"

const asArray = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : []

// Matomo category kept from the old sidebar for trend comparability.
const trackFilterToggle = (action: string, name: string) =>
  trackCustomEvent({
    eventCategory: "WalletFilterSidebar",
    eventAction: action,
    eventName: name,
  })

type WalletFiltersLabels = {
  device: string
  buySell: string
  network: string
  language: string
  filters: string
  reset: string
}

type WalletFiltersProps = {
  locale: string
  state: CatalogFilterState
  setFilter: CatalogSetFilter
  deviceOptions: WalletFilterOption[]
  purchaseOptions: WalletFilterOption[]
  networkOptions: WalletFilterOption[]
  languageOptions: WalletFilterOption[]
  labels: WalletFiltersLabels
}

/**
 * Filter sidebar. `state` changes on every toggle so this component re-renders,
 * but each `WalletFilterGroup` is memoized and receives stable options + a
 * per-group `selectedIds`/`onToggle` (memoized on that group's own slice of the
 * state). So toggling one group only re-renders that group — the other groups
 * (notably the ~30-item network list) skip, which is what keeps INP down: the
 * per-toggle cost was Radix checkbox/Presence churn across every group at once.
 */
export default function WalletFilters({
  locale,
  state,
  setFilter,
  deviceOptions,
  purchaseOptions,
  networkOptions,
  languageOptions,
  labels,
}: WalletFiltersProps) {
  const devicesValue = state[DEVICES_KEY]
  const networksValue = state[NETWORKS_KEY]
  const purchasesValue = state[PURCHASES_KEY]
  const languageValue = state[LANGUAGE_KEY]

  const selectedDevices = useMemo(() => asArray(devicesValue), [devicesValue])
  const selectedNetworks = useMemo(
    () => asArray(networksValue),
    [networksValue]
  )
  const selectedPurchases = useMemo(
    () => asArray(purchasesValue),
    [purchasesValue]
  )
  const selectedLanguages = useMemo(
    () => asArray(languageValue),
    [languageValue]
  )

  const onToggleDevice = useCallback(
    (optionId: string) => {
      setFilter(DEVICES_KEY, toggleId(selectedDevices, optionId), {
        scroll: false,
      })
      trackFilterToggle(
        optionId,
        `${optionId} ${!selectedDevices.includes(optionId)}`
      )
    },
    [setFilter, selectedDevices]
  )

  const onTogglePurchase = useCallback(
    (optionId: string) => {
      setFilter(PURCHASES_KEY, toggleId(selectedPurchases, optionId), {
        scroll: false,
      })
      trackFilterToggle(
        optionId,
        `${optionId} ${!selectedPurchases.includes(optionId)}`
      )
    },
    [setFilter, selectedPurchases]
  )

  const onToggleNetwork = useCallback(
    (optionId: string) => {
      setFilter(NETWORKS_KEY, toggleId(selectedNetworks, optionId), {
        scroll: false,
      })
      trackFilterToggle("network", optionId)
    },
    [setFilter, selectedNetworks]
  )

  const onToggleLanguage = useCallback(
    (optionId: string) => {
      setFilter(LANGUAGE_KEY, toggleId(selectedLanguages, optionId), {
        scroll: false,
      })
      trackFilterToggle("Language search", optionId)
    },
    [setFilter, selectedLanguages]
  )

  const reset = useCallback(() => {
    setFilter(DEVICES_KEY, undefined, { scroll: false })
    setFilter(NETWORKS_KEY, undefined, { scroll: false })
    setFilter(PURCHASES_KEY, undefined, { scroll: false })
    setFilter(LANGUAGE_KEY, undefined, { scroll: false })
    trackFilterToggle("Reset button", "reset_click")
  }, [setFilter])

  const activeCount =
    selectedDevices.length +
    selectedNetworks.length +
    selectedPurchases.length +
    selectedLanguages.length

  return (
    <div>
      <div className="flex items-center justify-between px-2 pb-2">
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

      <WalletFilterGroup
        locale={locale}
        label={labels.device}
        defaultOpen
        options={deviceOptions}
        selectedIds={selectedDevices}
        onToggle={onToggleDevice}
      />

      <WalletFilterGroup
        locale={locale}
        label={labels.buySell}
        defaultOpen
        options={purchaseOptions}
        selectedIds={selectedPurchases}
        onToggle={onTogglePurchase}
      />

      <WalletFilterGroup
        locale={locale}
        label={labels.network}
        defaultOpen
        scrollable
        options={networkOptions}
        selectedIds={selectedNetworks}
        onToggle={onToggleNetwork}
      />

      <WalletFilterGroup
        locale={locale}
        label={labels.language}
        scrollable
        options={languageOptions}
        selectedIds={selectedLanguages}
        onToggle={onToggleLanguage}
      />
    </div>
  )
}
