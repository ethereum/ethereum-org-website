"use client"

import { memo, useCallback, useMemo } from "react"

import FilterableCatalog from "@/components/FilterableCatalog"
import type { CatalogFilterState } from "@/components/FilterableCatalog/types"
import { asArray } from "@/components/FilterableCatalog/utils"

import type {
  CatalogWallet,
  WalletLanguageOption,
  WalletNetwork,
} from "@/lib/utils/walletData"

import { WALLET_DEVICE_IDS, type WalletDeviceId } from "@/data/wallets/devices"
import type { WalletPersonaId } from "@/data/wallets/personas"

import WalletCard from "./WalletCard"
import WalletFilters, {
  DEVICES_KEY,
  LANGUAGE_KEY,
  NETWORKS_KEY,
  PURCHASES_KEY,
} from "./WalletFilters"
import WalletFiltersHeader from "./WalletFiltersHeader"

const PURCHASE_IDS = ["buy_crypto", "withdraw_crypto"] as const

/**
 * All display strings the client catalog needs, built once on the server so no
 * i18n runtime ships to the browser (mirrors the dev-tools label-dict pattern).
 */
export type WalletCatalogLabels = {
  /** FilterableCatalog chrome (search, results header, mobile sheet). */
  catalog: {
    searchPlaceholder: string
    resultsLabel: string
    noResults: string
    filtersToggle: string
    applyLabel: string
    closeLabel: string
  }
  /** Filter group headers (WalletFilters). */
  filter: { device: string; buySell: string; network: string; language: string }
  /** Sidebar header row (WalletFiltersHeader). */
  header: { filters: string; reset: string }
  buyCrypto: string
  sellCrypto: string
  devices: Record<WalletDeviceId, string>
  personas: Record<WalletPersonaId, string>
}

type WalletsCatalogProps = {
  locale: string
  wallets: CatalogWallet[]
  networks: WalletNetwork[]
  languages: WalletLanguageOption[]
  labels: WalletCatalogLabels
}

const WalletsResults = memo(function WalletsResults({
  wallets,
  filtered,
  deviceLabels,
  personaLabels,
}: {
  wallets: CatalogWallet[]
  filtered: CatalogWallet[]
  deviceLabels: Record<WalletDeviceId, string>
  personaLabels: Record<WalletPersonaId, string>
}) {
  // Render every wallet once and toggle `hidden` so filtering flips a prop on
  // stable nodes instead of remounting cards, and all wallets stay in the SSR
  // DOM for crawlers.
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
  labels,
}: WalletsCatalogProps) {
  // This component holds no state and doesn't re-render on filter toggles, so
  // these are plain consts, not useMemo. Only filterFn is stabilized below,
  // since FilterableCatalog memoizes on it.
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
    wallet: CatalogWallet,
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

    // Language is OR-semantics (wallet matches if it supports any selected
    // language), unlike the AND-combined checkbox groups above.
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
