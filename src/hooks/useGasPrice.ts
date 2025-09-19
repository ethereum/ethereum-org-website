import { useEffect, useState } from "react"
import { usePublicClient } from "wagmi"

interface GasPriceData {
  standard: number // in gwei
  fast: number // in gwei
  instant: number // in gwei
  timestamp: number
}

interface GasPriceState {
  data: GasPriceData | null
  loading: boolean
  error: Error | null
}

// Gas price thresholds in gwei
export const GAS_THRESHOLDS = {
  LOW: 20,
  MODERATE: 40,
  HIGH: 80,
  VERY_HIGH: 150,
} as const

export type GasPriceLevel = "low" | "moderate" | "high" | "very_high"

export const getGasPriceLevel = (gasPrice: number): GasPriceLevel => {
  if (gasPrice >= GAS_THRESHOLDS.VERY_HIGH) return "very_high"
  if (gasPrice >= GAS_THRESHOLDS.HIGH) return "high"
  if (gasPrice >= GAS_THRESHOLDS.MODERATE) return "moderate"
  return "low"
}

export const useGasPrice = () => {
  const [state, setState] = useState<GasPriceState>({
    data: null,
    loading: true,
    error: null,
  })

  const publicClient = usePublicClient()

  useEffect(() => {
    const fetchGasPrice = async () => {
      if (!publicClient) return

      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        // Get current gas price from the network
        const gasPrice = await publicClient.getGasPrice()

        // Convert from wei to gwei
        const gasPriceGwei = Number(gasPrice) / 1e9

        // For simplicity, we'll use the network gas price as standard
        // and calculate fast/instant as multiples
        const gasPriceData: GasPriceData = {
          standard: Math.round(gasPriceGwei),
          fast: Math.round(gasPriceGwei * 1.2),
          instant: Math.round(gasPriceGwei * 1.5),
          timestamp: Date.now(),
        }

        setState({
          data: gasPriceData,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error("Failed to fetch gas price:", error)
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Failed to fetch gas price"),
        })
      }
    }

    fetchGasPrice()

    // Refresh gas price every 30 seconds
    const interval = setInterval(fetchGasPrice, 30000)

    return () => clearInterval(interval)
  }, [publicClient])

  const gasLevel = state.data ? getGasPriceLevel(state.data.standard) : null
  const shouldWarn = gasLevel === "high" || gasLevel === "very_high"

  return {
    ...state,
    gasLevel,
    shouldWarn,
    refresh: () => setState((prev) => ({ ...prev, loading: true })),
  }
}
