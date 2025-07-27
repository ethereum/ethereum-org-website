import { Address } from "viem"
import { useReadContract } from "wagmi"

import MintAlreadyMinted from "./views/MintAlreadyMinted"
import Mint from "./Mint"
import QueueStatus from "./QueueStatus"

import { useNetworkContract } from "@/hooks/useNetworkContract"
import { useQueueStatus } from "@/hooks/useQueueStatus"

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

  const {
    data: queueState,
    isLoading: isCheckingQueue,
    error: queueError,
    refetch,
  } = useQueueStatus(address, !hasMinted)

  if (hasMintedError) {
    return <div className="flex justify-center">Error checking minted</div>
  }

  if (hasMinted) {
    return <MintAlreadyMinted />
  }

  if (isCheckingQueue) {
    return <div className="flex justify-center">Checking eligibility...</div>
  }

  if (queueError) {
    return (
      <div className="flex justify-center text-error">
        Error checking eligibility
      </div>
    )
  }

  if (queueState) {
    if (queueState.mintAllowed) {
      return <Mint address={address} />
    } else {
      return (
        <QueueStatus
          estimatedTime={queueState.estimatedTime!}
          delaySeconds={queueState.delaySeconds!}
          onCheckStatus={refetch}
          isLoading={isCheckingQueue}
        />
      )
    }
  }

  return <Mint address={address} />
}
