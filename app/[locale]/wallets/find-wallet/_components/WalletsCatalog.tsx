"use client"

import { memo, useCallback, useMemo } from "react"
import { useTranslations } from "next-intl"

import FilterableCatalog from "@/components/FilterableCatalog"
import type { CatalogFilterState } from "@/components/FilterableCatalog/types"

import type {
  CatalogWallet,
  WalletDeviceId,
  WalletNetwork,
} from "@/lib/utils/walletData"

import WalletCard from "./WalletCard"
import WalletFilters, {
  DEVICES_KEY,
  LANGUAGE_KEY,
  NETWORKS_KEY,
  PURCHASES_KEY,
} from "./WalletFilters"

const DEVICE_IDS: WalletDeviceId[] = [
  "desktop",
  "mobile",
  "browser",
  "hardware",
]
const DEVICE_LABEL_KEYS: Record<WalletDeviceId, string> = {
  desktop: "page-find-wallet-desktop",
  mobile: "page-find-wallet-mobile",
  browser: "page-find-wallet-browser",
  hardware: "page-find-wallet-hardware",
}
const PURCHASE_IDS = ["buy_crypto", "withdraw_crypto"] as const

type WalletLanguageOption = { code: string; name: string; count: number }

type WalletsCatalogProps = {
  locale: string
  wallets: CatalogWallet[]
  networks: WalletNetwork[]
  languages: WalletLanguageOption[]
}

const asArray = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : []

const WalletsResults = memo(function WalletsResults({
  wallets,
  filtered,
}: {
  wallets: CatalogWallet[]
  filtered: CatalogWallet[]
}) {
  // Render every wallet once and toggle visibility, so a filter change flips a
  // CSS class on stable nodes instead of unmounting/remounting card subtrees
  // (Image, tooltip, tags). Much cheaper reconciliation on interaction, and all
  // wallets stay in the SSR DOM so crawlers still index every listing + link.
  const visibleSlugs = useMemo(
    () => new Set(filtered.map((wallet) => wallet.slug)),
    [filtered]
  )
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
      {wallets.map((wallet) => (
        <div key={wallet.slug} hidden={!visibleSlugs.has(wallet.slug)}>
          <WalletCard wallet={wallet} />
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
}: WalletsCatalogProps) {
  const t = useTranslations("page-wallets-find-wallet")

  // Baseline per-option counts, relative to this page's wallet set (not the
  // current selection).
  const deviceCounts = useMemo(() => {
    const counts = {} as Record<WalletDeviceId, number>
    for (const device of DEVICE_IDS) {
      counts[device] = wallets.filter((wallet) => wallet.devices[device]).length
    }
    return counts
  }, [wallets])

  const purchaseCounts = useMemo(
    () => ({
      buy_crypto: wallets.filter((wallet) => wallet.buy_crypto).length,
      withdraw_crypto: wallets.filter((wallet) => wallet.withdraw_crypto)
        .length,
    }),
    [wallets]
  )

  // Option arrays and labels are built once here (this component doesn't
  // re-render on filter toggles — the filter state lives in FilterableCatalog),
  // so they're stable references that let the memoized filter groups skip
  // re-rendering when an unrelated group changes.
  const deviceOptions = useMemo(
    () =>
      DEVICE_IDS.map((device) => ({
        id: device,
        label: t(DEVICE_LABEL_KEYS[device]),
        count: deviceCounts[device],
      })),
    [t, deviceCounts]
  )

  const purchaseOptions = useMemo(
    () => [
      {
        id: "buy_crypto",
        label: t("page-find-wallet-buy-crypto"),
        count: purchaseCounts.buy_crypto,
      },
      {
        id: "withdraw_crypto",
        label: t("page-find-wallet-sell-for-fiat"),
        count: purchaseCounts.withdraw_crypto,
      },
    ],
    [t, purchaseCounts]
  )

  const networkOptions = useMemo(
    () =>
      networks.map((network) => ({
        id: network.id,
        label: network.id,
        count: network.count,
      })),
    [networks]
  )

  const languageOptions = useMemo(
    () =>
      languages.map((language) => ({
        id: language.code,
        label: language.name,
        count: language.count,
      })),
    [languages]
  )

  const filterLabels = useMemo(
    () => ({
      device: t("page-find-wallet-device"),
      buySell: t("page-find-wallet-buy-sell-crypto"),
      network: t("page-find-wallet-network-support"),
      language: t("page-find-wallet-languages-supported"),
      filters: t("page-find-wallet-filters"),
      reset: t("page-find-wallet-reset-filters"),
    }),
    [t]
  )

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
      labels={{
        searchPlaceholder: t("page-find-wallet-search-wallets"),
        resultsLabel: t("page-find-wallet-table-title"),
        noResults: t("page-find-wallet-empty-results-title"),
      }}
      renderSidebar={({ state, setFilter }) => (
        <WalletFilters
          locale={locale}
          state={state}
          setFilter={setFilter}
          deviceOptions={deviceOptions}
          purchaseOptions={purchaseOptions}
          networkOptions={networkOptions}
          languageOptions={languageOptions}
          labels={filterLabels}
        />
      )}
      renderResults={(filtered) => (
        <WalletsResults wallets={wallets} filtered={filtered} />
      )}
    />
  )
}
