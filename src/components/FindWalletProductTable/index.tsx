import { useMemo, useState } from "react"

import { FilterOption } from "@/lib/types"

import { WalletColumns } from "@/components/FindWalletProductTable/data/WalletColumns"
import { WalletFilters } from "@/components/FindWalletProductTable/data/WalletFilters"
import { WalletPersonaPresets } from "@/components/FindWalletProductTable/data/WalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

import FindWalletsNoResults from "./FindWalletsNoResults"
import WalletSubComponent from "./WalletSubComponent"

const FindWalletProductTable = ({ wallets }) => {
  const walletPersonas = WalletPersonaPresets()
  const walletFilterOptions = WalletFilters()
  const [filters, setFilters] = useState<FilterOption[]>(walletFilterOptions)

  const filteredData = useMemo(() => {
    const activeFilterKeys: string[] = []
    let selectedLanguage: string

    filters.forEach((filter) => {
      filter.items.forEach((item) => {
        if (item.filterKey === "languages") {
          selectedLanguage = item.inputState as string
        } else if (item.inputState === true) {
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
  }

  return (
    <ProductTable
      columns={WalletColumns}
      data={filteredData}
      filters={filters}
      presetFilters={walletPersonas}
      resetFilters={resetFilters}
      setFilters={setFilters}
      subComponent={(wallet) => <WalletSubComponent wallet={wallet} />}
      noResultsComponent={() => (
        <FindWalletsNoResults resetFilters={resetFilters} />
      )}
    />
  )
}

export default FindWalletProductTable
