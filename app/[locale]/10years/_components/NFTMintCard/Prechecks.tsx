import { Address } from "viem"
import { useReadContract } from "wagmi"

import MintAlreadyMinted from "./views/MintAlreadyMinted"
import Mint from "./Mint"

import { useNetworkContract } from "@/hooks/useNetworkContract"

export default function Prechecks({ address }: { address: Address }) {
  const { contractData, isSupportedNetwork } = useNetworkContract()

  // Check if the address has already minted
  const { data: hasMinted } = useReadContract({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "hasMinted",
    args: [address],
    query: {
      enabled: isSupportedNetwork,
    },
  })

  if (hasMinted) {
    return <MintAlreadyMinted />
  }

  return <Mint address={address} />
}
