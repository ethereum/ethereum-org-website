import { fetchRetry } from "./fetchRetry"

export type DefiTvlShareData =
  | {
      /** Ethereum L1 share of DeFi TVL across all chains, 0-1 */
      mainnetShare: number
      /** Ethereum L1 TVL divided by the next-largest chain's */
      runnerUpMultiplier: number
      timestamp: number
    }
  | { error: string }

/**
 * Ethereum's share of global DeFi TVL and its lead over the runner-up chain.
 *
 * @see https://api.llama.fi/v2/chains
 */
export async function fetchDefiTvlShare(): Promise<DefiTvlShareData> {
  const url = "https://api.llama.fi/v2/chains"

  const response = await fetchRetry(url)

  if (!response.ok) {
    console.warn("DefiLlama chains fetch non-OK", { status: response.status })
    throw new Error(`DefiLlama chains API responded with ${response.status}`)
  }

  const chains: { name: string; tvl: number }[] = await response.json()
  const sorted = [...chains].sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
  const ethereum = sorted.find(({ name }) => name === "Ethereum")
  const runnerUp = sorted.find(({ name }) => name !== "Ethereum")
  const total = sorted.reduce((sum, { tvl }) => sum + (tvl || 0), 0)

  if (!ethereum?.tvl || !runnerUp?.tvl || !total) {
    throw new Error("DefiLlama chains response is missing Ethereum TVL")
  }

  return {
    mainnetShare: ethereum.tvl / total,
    runnerUpMultiplier: ethereum.tvl / runnerUp.tvl,
    timestamp: Date.now(),
  }
}
