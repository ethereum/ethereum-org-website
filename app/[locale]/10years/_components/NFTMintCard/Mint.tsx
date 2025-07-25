import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import {
  useAccount,
  useEnsName,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"

import { Button } from "@/components/ui/buttons/Button"

import MintConnect from "./views/MintConnect"
import MintError from "./views/MintError"
import MintSuccess from "./views/MintSuccess"
import Connected from "./Connected"
import QueueStatus from "./QueueStatus"

import { useNetworkContract } from "@/hooks/useNetworkContract"
import { useNFTQueue } from "@/hooks/useNFTQueue"
import { getErrorMessage } from "@/lib/torch"

type MintState =
  | "idle"
  | "checking"
  | "queued"
  | "minting"
  | "success"
  | "error"

export default function Mint() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { contractData, isSupportedNetwork } = useNetworkContract()

  const [mintState, setMintState] = useState<MintState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    queueState,
    error: queueError,
    isLoading: isQueueLoading,
    requestMint,
    checkQueueStatus,
    reportMintSuccess,
    reset: resetQueue,
  } = useNFTQueue()

  const {
    writeContract: mint,
    data: hash,
    error: writeError,
    reset: resetWriteContract,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  // Handle transaction states
  useEffect(() => {
    // Only process transaction states when wallet is connected
    if (!isConnected || !address) return

    if (isConfirming) {
      setMintState("minting")
    } else if (isConfirmed && hash) {
      setMintState("success")
      triggerConfetti()
      // Report successful mint to backend
      reportMintSuccess(hash)
    } else if (writeError) {
      setMintState("error")
      setErrorMessage(getErrorMessage(writeError))
    }
  }, [
    isConnected,
    address,
    isConfirming,
    isConfirmed,
    writeError,
    hash,
    reportMintSuccess,
  ])

  // Handle queue state changes
  useEffect(() => {
    // Only process queue states when wallet is connected
    if (!isConnected || !address) return

    if (queueError) {
      setMintState("error")
      setErrorMessage(queueError.message)
    } else if (queueState) {
      if (queueState.mintAllowed) {
        setMintState("idle") // Ready to mint
      } else if (queueState.estimatedTime) {
        setMintState("queued") // In queue
      } else {
        // Already minted
        setMintState("error")
        setErrorMessage("This wallet has already minted")
      }
    }
  }, [isConnected, address, queueState, queueError])

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

  const handleMintClick = async () => {
    if (queueState?.mintAllowed) {
      // User is allowed to mint, proceed with transaction
      handleMint()
    } else {
      // Check queue status first
      setMintState("checking")
      await requestMint()
    }
  }

  const handleMint = async () => {
    try {
      setMintState("minting")
      setErrorMessage("")

      mint({
        address: contractData.address as `0x${string}`,
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

  const handleCheckStatus = async () => {
    await checkQueueStatus()
  }

  const resetMintState = () => {
    setMintState("idle")
    setErrorMessage("")
    resetQueue()
    resetWriteContract()
  }

  if (mintState === "success") {
    return <MintSuccess txHash={hash} />
  }

  if (mintState === "error") {
    return <MintError errorMessage={errorMessage} onTryAgain={resetMintState} />
  }

  if (!isConnected || !address) {
    return <MintConnect />
  }

  if (
    mintState === "queued" &&
    queueState?.estimatedTime &&
    queueState?.delaySeconds
  ) {
    return (
      <QueueStatus
        estimatedTime={queueState.estimatedTime}
        delaySeconds={queueState.delaySeconds}
        onCheckStatus={handleCheckStatus}
        isLoading={isQueueLoading}
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {isSupportedNetwork && (
        <Button
          size="lg"
          onClick={handleMintClick}
          disabled={
            mintState === "minting" ||
            mintState === "checking" ||
            isQueueLoading
          }
        >
          {mintState === "minting" && "Minting..."}
          {mintState === "checking" && "Checking eligibility..."}
          {(mintState === "idle" || (!mintState && queueState?.mintAllowed)) &&
            "Mint NFT"}
          {!queueState && mintState === "idle" && "Check Mint Status"}
        </Button>
      )}

      <Connected address={address} ensName={ensName} />
    </div>
  )
}
