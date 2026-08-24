"use client"

import { memo, useCallback, useMemo } from "react"

import FilterableCatalog from "@/components/FilterableCatalog"
import type { CatalogFilterState } from "@/components/FilterableCatalog/types"
import { asArray } from "@/components/FilterableCatalog/utils"

import { trackCustomEvent } from "@/lib/utils/matomo"
import type {
  CatalogWalletCard,
  WalletLanguageOption,
  WalletNetwork,
} from "@/lib/utils/walletData"

import { WALLET_DEVICE_IDS, type WalletDeviceId } from "@/data/wallets/devices"
import type { WalletPersonaId } from "@/data/wallets/personas"

import WalletCard from "./WalletCard"
import type { WalletFilterOption } from "./WalletFilterGroup"
import WalletFilters, {
  ADVANCED_KEY,
  DEVICES_KEY,
  LANGUAGE_KEY,
  NETWORKS_KEY,
  PURCHASES_KEY,
  WalletFiltersHeader,
} from "./WalletFilters"

const PURCHASE_IDS = ["buy_crypto", "withdraw_crypto"] as const

// Category kept from the old empty state for trend comparability.
const trackEmptyStateReset = () =>
  trackCustomEvent({
    eventCategory: "Wallet_empty_state",
    eventAction: "reset",
    eventName: "reset_button_clicked",
  })

/** Built on the server so no i18n runtime ships to the browser. */
export type WalletCatalogLabels = {
  catalog: {
    searchPlaceholder: string
    resultsLabel: string
    noResults: string
    noResultsDesc: string
    resetLabel: string
    filtersToggle: string
    applyLabel: string
    closeLabel: string
  }
  filter: {
    device: string
    buySell: string
    network: string
    language: string
    advanced: string
  }
  header: { filters: string; reset: string }
  buyCrypto: string
  sellCrypto: string
  devices: Record<WalletDeviceId, string>
  personas: Record<WalletPersonaId, string>
}

type WalletsCatalogProps = {
  locale: string
  wallets: CatalogWalletCard[]
  networks: WalletNetwork[]
  languages: WalletLanguageOption[]
  /** Built server-side: its labels come from the feature groups' i18n keys. */
  advancedFilters: WalletFilterOption[]
  labels: WalletCatalogLabels
}

const WalletsResults = memo(function WalletsResults({
  wallets,
  filtered,
  deviceLabels,
  personaLabels,
}: {
  wallets: CatalogWalletCard[]
  filtered: CatalogWalletCard[]
  deviceLabels: Record<WalletDeviceId, string>
  personaLabels: Record<WalletPersonaId, string>
}) {
  // Every wallet renders once and filtering toggles `hidden`: no remounts, and
  // all wallets stay in the SSR DOM for crawlers.
  const visibleSlugs = useMemo(
    () => new Set(filtered.map((wallet) => wallet.slug)),
    [filtered]
  )
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
      {wallets.map((wallet) => (
        <div key={wallet.slug} hidden={!visibleSlugs.has(wallet.slug)}>
          <WalletCard
            wallet={wallet}
            deviceLabels={deviceLabels}
            personaLabels={personaLabels}
          />
        </div>
      ))}
    </div>
  )
})

export default function WalletsCatalog({
  locale,
  wallets,
  networks,
  languages,
  advancedFilters,
  labels,
}: WalletsCatalogProps) {
  // No state here, so no re-renders — plain consts, not useMemo. Only filterFn
  // needs a stable identity, since FilterableCatalog memoizes on it.
  const deviceCounts = {} as Record<WalletDeviceId, number>
  for (const device of WALLET_DEVICE_IDS) {
    deviceCounts[device] = wallets.filter(
      (wallet) => wallet.devices[device]
    ).length
  }

  const deviceOptions = WALLET_DEVICE_IDS.map((device) => ({
    id: device,
    label: labels.devices[device],
    count: deviceCounts[device],
  }))

  const purchaseOptions = [
    {
      id: "buy_crypto",
      label: labels.buyCrypto,
      count: wallets.filter((wallet) => wallet.buy_crypto).length,
    },
    {
      id: "withdraw_crypto",
      label: labels.sellCrypto,
      count: wallets.filter((wallet) => wallet.withdraw_crypto).length,
    },
  ]

  const networkOptions = networks.map((network) => ({
    id: network.id,
    label: network.id,
    count: network.count,
  }))

  const languageOptions = languages.map((language) => ({
    id: language.code,
    label: language.name,
    count: language.count,
  }))

  const filterWallet = useCallback(function filterWallet(
    wallet: CatalogWalletCard,
    state: CatalogFilterState,
    query: string
  ) {
    const devices = asArray(state[DEVICES_KEY])
    if (!devices.every((device) => wallet.devices[device as WalletDeviceId])) {
      return false
    }

    const selectedNetworks = asArray(state[NETWORKS_KEY])
    if (
      !selectedNetworks.every((network) =>
        (wallet.supported_chains as string[]).includes(network)
      )
    ) {
      return false
    }

    const purchases = asArray(state[PURCHASES_KEY])
    if (
      !purchases.every((key) => wallet[key as (typeof PURCHASE_IDS)[number]])
    ) {
      return false
    }

    const advanced = asArray(state[ADVANCED_KEY])
    if (
      !advanced.every((flag) =>
        (wallet.advancedFlags as string[]).includes(flag)
      )
    ) {
      return false
    }

    // OR, unlike the AND-combined groups above.
    const languages = asArray(state[LANGUAGE_KEY])
    if (
      languages.length > 0 &&
      !languages.some((code) =>
        (wallet.languages_supported as string[]).includes(code)
      )
    ) {
      return false
    }

    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return true
    const haystack = [wallet.name, wallet.descriptionStripped ?? ""]
      .join(" ")
      .toLowerCase()
    return haystack.includes(normalizedQuery)
  }, [])

  return (
    <FilterableCatalog
      locale={locale}
      items={wallets}
      filterFn={filterWallet}
      mobileVariant="sheet"
      labels={labels.catalog}
      onReset={trackEmptyStateReset}
      renderSidebarHeader={({ state, setFilter }) => (
        <WalletFiltersHeader
          state={state}
          setFilter={setFilter}
          labels={labels.header}
        />
      )}
      renderSidebar={({ state, setFilter }) => (
        <WalletFilters
          locale={locale}
          state={state}
          setFilter={setFilter}
          deviceOptions={deviceOptions}
          purchaseOptions={purchaseOptions}
          networkOptions={networkOptions}
          languageOptions={languageOptions}
          advancedOptions={advancedFilters}
          labels={labels.filter}
        />
      )}
      renderResults={(filtered) => (
        <WalletsResults
          wallets={wallets}
          filtered={filtered}
          deviceLabels={labels.devices}
          personaLabels={labels.personas}
        />
      )}
    />
  )
}
