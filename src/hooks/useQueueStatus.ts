import { Address } from "viem"
import { useQuery } from "@tanstack/react-query"

interface QueueState {
  mintAllowed: boolean
  estimatedTime?: number
  delaySeconds?: number
  queuePosition?: number
  currentTime?: number
}

export function useQueueStatus(address: Address, enabled = true) {
  return useQuery({
    queryKey: ["queue-status", address],
    queryFn: async (): Promise<QueueState> => {
      const response = await fetch(
        `/api/queue-status?wallet=${encodeURIComponent(address)}`
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to check queue status")
      }

      return result
    },
    staleTime: 5000,
    retry: 2,
    enabled,
  })
}
