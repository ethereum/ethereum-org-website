"use client"

import { memo, useMemo } from "react"
import { RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"

import FilterableCatalog from "@/components/FilterableCatalog"
import type {
  CatalogFilterState,
  CatalogSetFilter,
} from "@/components/FilterableCatalog/types"
import { toggleId } from "@/components/FilterableCatalog/utils"

import { trackCustomEvent } from "@/lib/utils/matomo"
import type {
  CatalogWallet,
  WalletDeviceId,
  WalletNetwork,
} from "@/lib/utils/walletData"

import WalletCard from "./WalletCard"
import WalletFilterGroup from "./WalletFilterGroup"

const DEVICES_KEY = "devices"
const NETWORKS_KEY = "networks"
const PURCHASES_KEY = "purchases"
const LANGUAGE_KEY = "language"

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

// Legacy Matomo category preserved for trend comparability with the old
// sidebar (see the find-wallet revamp plan, decision #12).
const trackFilterToggle = (action: string, name: string) =>
  trackCustomEvent({
    eventCategory: "WalletFilterSidebar",
    eventAction: action,
    eventName: name,
  })

const WalletsResults = memo(function WalletsResults({
  wallets,
}: {
  wallets: CatalogWallet[]
}) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
      {wallets.map((wallet) => (
        <WalletCard key={wallet.slug} wallet={wallet} />
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

  // Baseline per-option counts (relative to this page's wallet set, stable while
  // nothing is selected). Selection-relative counts under AND semantics are a
  // design follow-up (revamp plan, decision #5).
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

  const filterWallet = (
    wallet: CatalogWallet,
    state: CatalogFilterState,
    query: string
  ) => {
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
  }

  const renderSidebar = ({
    state,
    setFilter,
  }: {
    state: CatalogFilterState
    setFilter: CatalogSetFilter
  }) => {
    const selectedDevices = asArray(state[DEVICES_KEY])
    const selectedNetworks = asArray(state[NETWORKS_KEY])
    const selectedPurchases = asArray(state[PURCHASES_KEY])
    const selectedLanguages = asArray(state[LANGUAGE_KEY])

    const activeCount =
      selectedDevices.length +
      selectedNetworks.length +
      selectedPurchases.length +
      selectedLanguages.length

    const reset = () => {
      setFilter(DEVICES_KEY, undefined, { scroll: false })
      setFilter(NETWORKS_KEY, undefined, { scroll: false })
      setFilter(PURCHASES_KEY, undefined, { scroll: false })
      setFilter(LANGUAGE_KEY, undefined, { scroll: false })
      trackFilterToggle("Reset button", "reset_click")
    }

    return (
      <div>
        <div className="flex items-center justify-between px-2 pb-2">
          <p className="text-sm font-bold">
            {t("page-find-wallet-filters")} ({activeCount})
          </p>
          <button
            type="button"
            onClick={reset}
            disabled={activeCount === 0}
            className="flex items-center gap-1.5 text-sm text-primary transition-opacity hover:underline disabled:pointer-events-none disabled:opacity-40"
          >
            <RotateCcw className="size-4" />
            {t("page-find-wallet-reset-filters")}
          </button>
        </div>

        <WalletFilterGroup
          locale={locale}
          label={t("page-find-wallet-device")}
          defaultOpen
          options={DEVICE_IDS.map((device) => ({
            id: device,
            label: t(DEVICE_LABEL_KEYS[device]),
            count: deviceCounts[device],
          }))}
          selectedIds={selectedDevices}
          onToggle={(optionId) => {
            setFilter(DEVICES_KEY, toggleId(selectedDevices, optionId), {
              scroll: false,
            })
            trackFilterToggle(
              optionId,
              `${optionId} ${!selectedDevices.includes(optionId)}`
            )
          }}
        />

        <WalletFilterGroup
          locale={locale}
          label={t("page-find-wallet-buy-sell-crypto")}
          defaultOpen
          options={[
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
          ]}
          selectedIds={selectedPurchases}
          onToggle={(optionId) => {
            setFilter(PURCHASES_KEY, toggleId(selectedPurchases, optionId), {
              scroll: false,
            })
            trackFilterToggle(
              optionId,
              `${optionId} ${!selectedPurchases.includes(optionId)}`
            )
          }}
        />

        <WalletFilterGroup
          locale={locale}
          label={t("page-find-wallet-network-support")}
          defaultOpen
          scrollable
          options={networks.map((network) => ({
            id: network.id,
            label: network.id,
            count: network.count,
          }))}
          selectedIds={selectedNetworks}
          onToggle={(optionId) => {
            setFilter(NETWORKS_KEY, toggleId(selectedNetworks, optionId), {
              scroll: false,
            })
            trackFilterToggle("network", optionId)
          }}
        />

        <WalletFilterGroup
          locale={locale}
          label={t("page-find-wallet-languages-supported")}
          scrollable
          options={languages.map((language) => ({
            id: language.code,
            label: language.name,
            count: language.count,
          }))}
          selectedIds={selectedLanguages}
          onToggle={(optionId) => {
            setFilter(LANGUAGE_KEY, toggleId(selectedLanguages, optionId), {
              scroll: false,
            })
            trackFilterToggle("Language search", optionId)
          }}
        />
      </div>
    )
  }

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
      renderSidebar={renderSidebar}
      renderResults={(filtered) => <WalletsResults wallets={filtered} />}
    />
  )
}
