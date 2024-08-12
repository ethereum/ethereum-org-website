import { WalletFilters } from "@/components/FindWalletProductTable/data/WalletFilters"
import { WalletPersonaPresets } from "@/components/FindWalletProductTable/data/WalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

import { WALLETS_FILTERS_DEFAULT } from "@/lib/constants"

const FindWalletProductTable = () => {
  const walletPersonas = WalletPersonaPresets()
  const walletFilters = WalletFilters()

  return (
    <ProductTable
      filters={walletFilters}
      filtersDefault={WALLETS_FILTERS_DEFAULT}
      presetFilters={walletPersonas}
    />
  )
}

export default FindWalletProductTable
