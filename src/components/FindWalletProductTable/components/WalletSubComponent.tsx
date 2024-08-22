import { WalletData } from "@/lib/types"

interface WalletSubComponentProps {
  wallet: WalletData
}

const WalletSubComponent = ({ wallet }: WalletSubComponentProps) => {
  console.log(wallet)
  return <p>{wallet.name}</p>
}

export default WalletSubComponent
