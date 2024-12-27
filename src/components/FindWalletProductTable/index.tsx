import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "next-i18next"

import { ChainName, FilterOption, Lang, Wallet } from "@/lib/types"

import { useWalletColumns } from "@/components/FindWalletProductTable/hooks/useWalletColumns"
import { useWalletFilters } from "@/components/FindWalletProductTable/hooks/useWalletFilters"
import { useWalletPersonaPresets } from "@/components/FindWalletProductTable/hooks/useWalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

import { trackCustomEvent } from "@/lib/utils/matomo"

import FindWalletsNoResults from "./FindWalletsNoResults"
import WalletSubComponent from "./WalletSubComponent"

const FindWalletProductTable = ({ wallets }: { wallets: Wallet[] }) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const walletPersonas = useWalletPersonaPresets()
  const walletFilterOptions = useWalletFilters()
  const [filters, setFilters] = useState<FilterOption[]>(walletFilterOptions)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const activeFilterKeys = useMemo(() => {
    const keys: string[] = []
    filters.forEach((filter) => {
      filter.items.forEach((item) => {
        if (item.inputState === true && item.options.length === 0) {
          keys.push(item.filterKey)
        }
        if (item.options?.length > 0) {
          item.options.forEach((option) => {
            if (option.inputState === true) {
              keys.push(option.filterKey)
            }
          })
        }
      })
    })
    return keys
  }, [filters])

  const filteredData = useMemo(() => {
    if (!Array.isArray(wallets)) return []

    let selectedLanguage: string = ""
    let selectedLayer2: ChainName[] = []

    filters.forEach((filter) => {
      filter.items.forEach((item) => {
        if (item.filterKey === "languages") {
          selectedLanguage = item.inputState as string
        } else if (item.filterKey === "layer_2_support") {
          selectedLayer2 = (item.inputState as ChainName[]) || []
        }
      })
    })

    return wallets
      .filter((item) => {
        return item.languages_supported.includes(selectedLanguage as Lang)
      })
      .filter((item) => {
        return (
          selectedLayer2.length === 0 ||
          selectedLayer2.every((chain) => item.supported_chains.includes(chain))
        )
      })
      .filter((item) => {
        return activeFilterKeys.every((key) => item[key])
      })
  }, [wallets, filters, activeFilterKeys])

  // Reset filters
  const resetFilters = () => {
    setFilters(walletFilterOptions)
    trackCustomEvent({
      eventCategory: "WalletFilterSidebar",
      eventAction: "Reset button",
      eventName: "reset_click",
    })
  }

  if (!isClient) {
    return null
  }

  if (!Array.isArray(wallets)) {
    return <div>Error loading wallets</div>
  }

  return (
    <ProductTable<Wallet>
      columns={useWalletColumns}
      data={filteredData}
      allDataLength={wallets.length}
      matomoEventCategory="find-wallet"
      filters={filters}
      presetFilters={walletPersonas}
      resetFilters={resetFilters}
      setFilters={setFilters}
      subComponent={(wallet, listIdx) => (
        <WalletSubComponent
          wallet={wallet}
          filters={filters}
          listIdx={listIdx}
        />
      )}
      noResultsComponent={() => (
        <FindWalletsNoResults resetFilters={resetFilters} />
      )}
      mobileFiltersLabel={t("page-find-wallet-see-wallets")}
    />
  )
}

export default FindWalletProductTable
