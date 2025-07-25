import { useEffect, useState } from "react"

import { Button } from "@/components/ui/buttons/Button"

interface QueueStatusProps {
  estimatedTime: number // Unix timestamp
  delaySeconds: number
  onCheckStatus: () => void
  isLoading?: boolean
}

export default function QueueStatus({
  estimatedTime,
  delaySeconds,
  onCheckStatus,
  isLoading = false,
}: QueueStatusProps) {
  const [remainingTime, setRemainingTime] = useState(delaySeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const remaining = Math.max(0, estimatedTime - now)
      setRemainingTime(remaining)

      // Auto-check status when time expires
      if (remaining === 0) {
        onCheckStatus()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [estimatedTime, onCheckStatus])

  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${minutes}m ${secs}s`
    } else {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return `${hours}h ${minutes}m`
    }
  }

  return (
    <div className="space-y-4 text-center">
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">
          🕐 You&apos;re in the queue
        </h3>
        <p className="mt-2 text-sm text-orange-800 dark:text-orange-200">
          High demand detected. You&apos;ve been added to the queue to ensure
          fair access for everyone.
        </p>
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold text-primary">
          {remainingTime > 0 ? formatTime(remainingTime) : "Ready to mint!"}
        </div>
        <p className="text-sm text-body-medium">
          {remainingTime > 0
            ? "Estimated wait time remaining"
            : "You can now mint your NFT"}
        </p>
      </div>

      <div className="space-y-2">
        <Button
          onClick={onCheckStatus}
          disabled={isLoading}
          size="lg"
          className="w-full"
        >
          {isLoading ? "Checking..." : "Check Status"}
        </Button>
        <p className="text-xs text-body-medium">
          This page will automatically refresh when you&apos;re ready to mint
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-1000"
            style={{
              width: `${Math.max(0, Math.min(100, ((delaySeconds - remainingTime) / delaySeconds) * 100))}%`,
            }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-body-medium">
          <span>Queued</span>
          <span>Ready</span>
        </div>
      </div>
    </div>
  )
}
