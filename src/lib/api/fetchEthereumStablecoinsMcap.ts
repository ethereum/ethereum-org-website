export type LlamaStablecoinchainsResponseItem = {
  gecko_id: string | null
  totalCirculatingUSD: Record<string, number>
  tokenSymbol: string | null
  name: string
}

export const fetchEthereumStablecoinsMcap = async (): Promise<
  number | { error: string }
> => {
  const url = "https://stablecoins.llama.fi/stablecoinchains"

  try {
    const response = await fetch(url)

    if (!response.ok) {
      console.error("Llama.fi fetch non-OK", {
        status: response.status,
        statusText: response.statusText,
        url,
      })
      return {
        error: `Llama.fi responded with status ${response.status}`,
      }
    }

    const data: LlamaStablecoinchainsResponseItem[] = await response.json()

    const ethereumData = data.find(({ gecko_id }) => gecko_id === "ethereum")
    if (!ethereumData) {
      return {
        error: "Ethereum stablecoin data not found",
      }
    }

    const value = Object.values(ethereumData.totalCirculatingUSD).reduce(
      (acc, val) => acc + val,
      0
    )

    return value
  } catch (error) {
    console.error("Error fetching Ethereum stablecoins market cap:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch Ethereum stablecoins market cap",
    }
  }
}
