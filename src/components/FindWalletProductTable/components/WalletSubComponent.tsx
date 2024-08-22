import { WalletData } from "@/lib/types"

interface WalletSubComponentProps {
  wallet: WalletData
}

const WalletSubComponent = ({ wallet }: WalletSubComponentProps) => {
  return (
    <div>
      <p>{wallet.name}</p>
    </div>
  )
}

export default WalletSubComponent
