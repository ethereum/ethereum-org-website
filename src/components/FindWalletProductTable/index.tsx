import { useMemo, useState } from "react"

import { FilterOption } from "@/lib/types"

import WalletSubComponent from "@/components/FindWalletProductTable/components/WalletSubComponent"
import { WalletColumns } from "@/components/FindWalletProductTable/data/WalletColumns"
import { WalletFilters } from "@/components/FindWalletProductTable/data/WalletFilters"
import { WalletPersonaPresets } from "@/components/FindWalletProductTable/data/WalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

const FindWalletProductTable = ({ wallets }) => {
  const walletPersonas = WalletPersonaPresets()
  const walletFilterOptions = WalletFilters()
  const [filters, setFilters] = useState<FilterOption[]>(walletFilterOptions)

  const filteredData = useMemo(() => {
    const activeFilterKeys: string[] = []

    filters.forEach((filter) => {
      filter.items.forEach((item) => {
        if (item.inputState === true) {
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

    if (activeFilterKeys.length === 0) {
      return wallets
    }

    return wallets.filter((item) => {
      return activeFilterKeys.every((key) => item[key])
    })
  }, [wallets, filters])

  return (
    <ProductTable
      columns={WalletColumns}
      data={filteredData}
      filters={filters}
      setFilters={setFilters}
      presetFilters={walletPersonas}
      subComponent={(wallet) => <WalletSubComponent wallet={wallet} />}
    />
  )
}

export default FindWalletProductTable
