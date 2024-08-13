import { WalletFilters } from "@/components/FindWalletProductTable/data/WalletFilters"
import { WalletPersonaPresets } from "@/components/FindWalletProductTable/data/WalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

const FindWalletProductTable = () => {
  const walletPersonas = WalletPersonaPresets()
  const walletFilterOptions = WalletFilters()

  return (
    <ProductTable
      filterOptions={walletFilterOptions}
      presetFilters={walletPersonas}
    />
  )
}

export default FindWalletProductTable
