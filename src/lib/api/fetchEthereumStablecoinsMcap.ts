import { MetricReturnData } from "../types"

export type LlamaStablecoinchainsResponseItem = {
  gecko_id: string | null
  totalCirculatingUSD: Record<string, number>
  tokenSymbol: string | null
  name: string
}

export async function fetchEthereumStablecoinsMcap(): Promise<MetricReturnData> {
  const url = "https://stablecoins.llama.fi/stablecoinchains"

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.log(response.status, response.statusText)
      throw new Error("Failed to fetch llama.fi stablecoin mcap data")
    }
    const data: LlamaStablecoinchainsResponseItem[] = await response.json()

    const ethereumData = data.find(({ gecko_id }) => gecko_id === "ethereum")
    if (!ethereumData) throw new Error("Ethereum stablecoin data not found")

    const value = Object.values(ethereumData.totalCirculatingUSD).reduce(
      (acc, value) => acc + value,
      0
    )

    return { value }
  } catch (error) {
    // Will not currently break build; passes back error key
    console.error(error)
    return {
      error:
        "Something went wrong with requesting the Ethereum stablecoins data.",
    }
  }
}
