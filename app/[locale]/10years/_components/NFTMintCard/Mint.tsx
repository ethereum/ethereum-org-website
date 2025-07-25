import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import {
  useAccount,
  useEnsName,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"

import { Button } from "@/components/ui/buttons/Button"

import MintAlreadyMinted from "./views/MintAlreadyMinted"
import MintConnect from "./views/MintConnect"
import MintError from "./views/MintError"
import MintSuccess from "./views/MintSuccess"
import Connected from "./Connected"

import { useNetworkContract } from "@/hooks/useNetworkContract"
import { getErrorMessage } from "@/lib/torch"

type MintState = "idle" | "minting" | "success" | "error" | "already_minted"

export default function Mint() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { contractData, isSupportedNetwork } = useNetworkContract()

  const [mintState, setMintState] = useState<MintState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    writeContract: mint,
    data: hash,
    error: writeError,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  // Check if the address has already minted
  const { data: hasMinted } = useReadContract({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "hasMinted",
    args: [address],
    query: {
      enabled: !!address && isSupportedNetwork && mintState === "idle",
    },
  })

  // Handle transaction states
  useEffect(() => {
    if (hasMinted) {
      setMintState("already_minted")
    } else if (isConfirming) {
      setMintState("minting")
    } else if (isConfirmed) {
      setMintState("success")
      triggerConfetti()
    } else if (writeError) {
      setMintState("error")
      setErrorMessage(getErrorMessage(writeError))
    }
  }, [isConfirming, isConfirmed, writeError, hasMinted])

  const triggerConfetti = () => {
    const duration = 5000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  const handleMint = async () => {
    try {
      setMintState("minting")
      setErrorMessage("")

      mint({
        address: contractData.address,
        abi: contractData.abi,
        functionName: "mint",
      })
    } catch (error) {
      setMintState("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to mint NFT"
      )
      console.error("Minting error:", error)
    }
  }

  const resetMintState = () => {
    setMintState("idle")
    setErrorMessage("")
  }

  if (mintState === "success") {
    return <MintSuccess txHash={hash} />
  }

  if (mintState === "error") {
    return <MintError errorMessage={errorMessage} onTryAgain={resetMintState} />
  }

  if (mintState === "already_minted") {
    return <MintAlreadyMinted />
  }

  if (!isConnected || !address) {
    return <MintConnect />
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {isSupportedNetwork && (
        <Button
          size="lg"
          onClick={handleMint}
          disabled={mintState === "minting"}
        >
          {mintState === "minting" ? "Minting..." : "Mint NFT"}
        </Button>
      )}

      <Connected address={address} ensName={ensName} />
    </div>
  )
}
