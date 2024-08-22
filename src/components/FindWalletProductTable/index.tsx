import { WalletColumns } from "@/components/FindWalletProductTable/data/WalletColumns"
import { WalletFilters } from "@/components/FindWalletProductTable/data/WalletFilters"
import { WalletPersonaPresets } from "@/components/FindWalletProductTable/data/WalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

const FindWalletProductTable = ({ wallets }) => {
  const walletPersonas = WalletPersonaPresets()
  const walletFilterOptions = WalletFilters()

  return (
    <ProductTable
      columns={WalletColumns}
      data={wallets}
      filterOptions={walletFilterOptions}
      presetFilters={walletPersonas}
    />
  )
}

export default FindWalletProductTable
