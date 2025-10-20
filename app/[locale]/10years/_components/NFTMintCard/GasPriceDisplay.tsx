"use client"

import { cn } from "@/lib/utils/cn"

import { type GasPriceLevel, useGasPrice } from "@/hooks/useGasPrice"

const getGasLevelConfig = (level: GasPriceLevel | null) => {
  switch (level) {
    case "low":
      return {
        color: "text-green-600",
        bgColor: "bg-green-100",
        indicator: "bg-green-500",
        label: "Low",
        description: "Good time to mint!",
      }
    case "moderate":
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        indicator: "bg-yellow-500",
        label: "Moderate",
        description: "Normal gas prices",
      }
    case "high":
      return {
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        indicator: "bg-orange-500",
        label: "High",
        description: "Consider waiting for lower gas",
      }
    case "very_high":
      return {
        color: "text-red-600",
        bgColor: "bg-red-100",
        indicator: "bg-red-500",
        label: "Very High",
        description: "Wait for lower gas prices",
      }
    default:
      return {
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        indicator: "bg-gray-400",
        label: "Loading",
        description: "Fetching gas prices...",
      }
  }
}

interface GasPriceDisplayProps {
  className?: string
}

const GasPriceDisplay = ({ className }: GasPriceDisplayProps) => {
  const { error, gasLevel } = useGasPrice()

  const loading = false

  const config = getGasLevelConfig(gasLevel)

  if (error) {
    return (
      <div className={cn("text-center text-sm text-gray-500", className)}>
        <p>Unable to fetch network fees</p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Gas Price Display */}
      <div className="flex items-center justify-between rounded-lg border p-3 text-sm">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", config.indicator)} />
          <span className="font-medium">Current Network Fee:</span>
        </div>
        <div className="text-right">
          {loading ? (
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          ) : (
            <div className="flex items-center gap-1">
              <span className={cn("font-semibold", config.color)}>
                {config.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GasPriceDisplay
