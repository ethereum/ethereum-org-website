import { Address } from "viem"
import { useReadContract } from "wagmi"

import MintAlreadyMinted from "./views/MintAlreadyMinted"
import Mint from "./Mint"

import { useNetworkContract } from "@/hooks/useNetworkContract"

export default function Prechecks({ address }: { address: Address }) {
  const { contractData, isSupportedNetwork } = useNetworkContract()

  const { data: hasMinted, error: hasMintedError } = useReadContract({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "hasMinted",
    args: [address],
    query: {
      enabled: isSupportedNetwork,
    },
  })

  if (hasMintedError) {
    return <div className="flex justify-center">Error checking minted</div>
  }

  if (hasMinted) {
    return <MintAlreadyMinted />
  }

  return <Mint address={address} />
}
