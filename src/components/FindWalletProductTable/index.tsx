import { WalletPersonaPresets } from "@/components/FindWalletProductTable/data/WalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

const FindWalletProductTable = () => {
  const walletPersonas = WalletPersonaPresets()
  return <ProductTable presetFilters={walletPersonas} />
}

export default FindWalletProductTable
