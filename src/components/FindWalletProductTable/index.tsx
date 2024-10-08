import { useMemo, useState } from "react"
import { useTranslation } from "next-i18next"

import { FilterOption } from "@/lib/types"

import { useWalletColumns } from "@/components/FindWalletProductTable/hooks/useWalletColumns"
import { useWalletFilters } from "@/components/FindWalletProductTable/hooks/useWalletFilters"
import { useWalletPersonaPresets } from "@/components/FindWalletProductTable/hooks/useWalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

import { trackCustomEvent } from "@/lib/utils/matomo"

import FindWalletsNoResults from "./FindWalletsNoResults"
import WalletSubComponent from "./WalletSubComponent"

const FindWalletProductTable = ({ wallets }) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const walletPersonas = useWalletPersonaPresets()
  const walletFilterOptions = useWalletFilters()
  const [filters, setFilters] = useState<FilterOption[]>(walletFilterOptions)

  const filteredData = useMemo(() => {
    const activeFilterKeys: string[] = []
    let selectedLanguage: string

    filters.forEach((filter) => {
      filter.items.forEach((item) => {
        if (item.filterKey === "languages") {
          selectedLanguage = item.inputState as string
        } else if (item.inputState === true && item.options.length === 0) {
          activeFilterKeys.push(item.filterKey)
        }

        if (item.options && item.options.length > 0) {
          item.options.forEach((option) => {
            if (option.inputState === true) {
              activeFilterKeys.push(option.filterKey)
            }
          })
        }
      })
    })

    return wallets
      .filter((item) => {
        return item.languages_supported.includes(selectedLanguage)
      })
      .filter((item) => {
        return activeFilterKeys.every((key) => item[key])
      })
  }, [wallets, filters])

  // Reset filters
  const resetFilters = () => {
    setFilters(walletFilterOptions)
    trackCustomEvent({
      eventCategory: "WalletFilterSidebar",
      eventAction: "Reset button",
      eventName: "reset_click",
    })
  }

  return (
    <ProductTable
      columns={useWalletColumns}
      data={filteredData}
      allDataLength={wallets.length}
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
