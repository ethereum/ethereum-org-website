import { useCallback, useState } from "react"
import { useAccount } from "wagmi"

interface QueueState {
  mintAllowed: boolean
  estimatedTime?: number
  delaySeconds?: number
  queuePosition?: number
  currentTime?: number
}

interface QueueError {
  message: string
}

export function useNFTQueue() {
  const { address } = useAccount()
  const [queueState, setQueueState] = useState<QueueState | null>(null)
  const [error, setError] = useState<QueueError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const requestMint = useCallback(async () => {
    if (!address) {
      setError({ message: "Wallet not connected" })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/request-mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: address }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to request mint")
      }

      setQueueState(data)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }, [address])

  const checkQueueStatus = useCallback(async () => {
    if (!address) {
      setError({ message: "Wallet not connected" })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/queue-status?wallet=${encodeURIComponent(address)}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check queue status")
      }

      setQueueState(data)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }, [address])

  const reportMintSuccess = useCallback(
    async (transactionHash: string) => {
      if (!address) {
        setError({ message: "Wallet not connected" })
        return
      }

      try {
        const response = await fetch("/api/mint-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wallet: address,
            transactionHash,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to report mint success")
        }

        // Reset queue state after successful mint
        setQueueState({ mintAllowed: false })
      } catch (err) {
        console.error("Failed to report mint success:", err)
        // Don't show this error to user as the mint was successful
      }
    },
    [address]
  )

  const reset = useCallback(() => {
    setQueueState(null)
    setError(null)
  }, [])

  return {
    queueState,
    error,
    isLoading,
    requestMint,
    checkQueueStatus,
    reportMintSuccess,
    reset,
  }
}
