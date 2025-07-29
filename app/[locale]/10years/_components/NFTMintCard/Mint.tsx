import { useEffect } from "react"
import { Address } from "viem"
import {
  useEnsName,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"

import { Button } from "@/components/ui/buttons/Button"

import MintError from "./views/MintError"
import MintSuccess from "./views/MintSuccess"
import Connected from "./Connected"

import { useNetworkContract } from "@/hooks/useNetworkContract"
import { getErrorMessage } from "@/lib/torch"

interface MintProps {
  address: Address
  onSuccess?: (txHash: string) => void
}

export default function Mint({ address, onSuccess }: MintProps) {
  const { data: ensName } = useEnsName({ address })
  const { contractData, isSupportedNetwork } = useNetworkContract()

  const {
    writeContract: mint,
    isPending: isMinting,
    data: hash,
    error: writeError,
    reset: resetWriteContract,
  } = useWriteContract()

  const {
    isSuccess: isConfirmed,
    isLoading: isReceiptLoading,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
      enabled: !!hash,
    },
  })

  useEffect(() => {
    if (isConfirmed && hash && onSuccess) {
      onSuccess(hash)
    }
  }, [isConfirmed, hash, onSuccess])

  const handleMintClick = async () => {
    mint({
      address: contractData.address as `0x${string}`,
      abi: contractData.abi,
      functionName: "mint",
    })
  }

  const resetMintState = () => {
    resetWriteContract()
  }

  if (isConfirmed && hash) {
    return <MintSuccess txHash={hash} />
  }

  if (writeError) {
    const errorMessage = getErrorMessage(writeError)
    return (
      <MintError
        errorMessage={errorMessage}
        onTryAgain={resetMintState}
        hash={hash}
      />
    )
  }

  if (receiptError) {
    const errorMessage = getErrorMessage(receiptError)
    return (
      <MintError
        errorMessage={errorMessage}
        onTryAgain={resetMintState}
        hash={hash}
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {isSupportedNetwork && (
        <>
          <Button
            size="lg"
            onClick={handleMintClick}
            disabled={isMinting || isReceiptLoading}
          >
            {isMinting || isReceiptLoading ? "Minting..." : "Mint NFT"}
          </Button>
        </>
      )}

      <Connected address={address} ensName={ensName} />
    </div>
  )
}
