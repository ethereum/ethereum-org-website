import { WalletColumns } from "@/components/FindWalletProductTable/data/WalletColumns"
import { WalletFilters } from "@/components/FindWalletProductTable/data/WalletFilters"
import { WalletPersonaPresets } from "@/components/FindWalletProductTable/data/WalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

import walletsData from "@/data/wallets/wallet-data"

const FindWalletProductTable = () => {
  const walletPersonas = WalletPersonaPresets()
  const walletFilterOptions = WalletFilters()

  return (
    <ProductTable
      columns={WalletColumns}
      data={walletsData}
      filterOptions={walletFilterOptions}
      presetFilters={walletPersonas}
    />
  )
}

export default FindWalletProductTable
