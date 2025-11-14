export const fetchEthereumMarketcap = async (): Promise<
  number | { error: string }
> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true"
    )

    if (!response.ok) {
      console.error("CoinGecko fetch non-OK", {
        status: response.status,
        statusText: response.statusText,
      })
      return {
        error: `CoinGecko responded with status ${response.status}`,
      }
    }

    const data: { ethereum: { usd_market_cap: number } } = await response.json()
    const {
      ethereum: { usd_market_cap },
    } = data

    if (!usd_market_cap) {
      return {
        error: "Unable to fetch ETH market cap from CoinGecko",
      }
    }

    return usd_market_cap
  } catch (error) {
    console.error("Error fetching Ethereum market cap:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch Ethereum market cap",
    }
  }
}
