import { useState } from "react"
import { Address } from "viem"
import { useReadContract } from "wagmi"

import MintAlreadyMinted from "./views/MintAlreadyMinted"
import MintSuccess from "./views/MintSuccess"
import Mint from "./Mint"

import { useNetworkContract } from "@/hooks/useNetworkContract"

export default function Prechecks({ address }: { address: Address }) {
  const { contractData, isSupportedNetwork } = useNetworkContract()
  const [successTxHash, setSuccessTxHash] = useState<string | null>(null)

  const { data: hasMinted, error: hasMintedError } = useReadContract({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "hasMinted",
    args: [address],
    query: {
      enabled: isSupportedNetwork,
    },
  })

  const handleMintSuccess = (txHash: string) => {
    setSuccessTxHash(txHash)
  }

  if (hasMintedError) {
    return <div className="flex justify-center">Error checking minted</div>
  }

  if (successTxHash) {
    return <MintSuccess txHash={successTxHash} />
  }

  if (hasMinted) {
    return <MintAlreadyMinted />
  }

  return <Mint address={address} onSuccess={handleMintSuccess} />
}
