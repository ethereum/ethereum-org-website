import { memo } from "react"

import type { Wallet } from "@/lib/types"

interface WalletInfoProps {
  wallet: Wallet
}

const WalletInfo = ({ wallet }: WalletInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-bold">{wallet.name}</p>
    </div>
  )
}

export default memo(WalletInfo)
