import { MetricReturnData } from "../types"

export const fetchEthereumMarketcap = async (): Promise<MetricReturnData> => {
  const data: { ethereum: { usd_market_cap: number } } = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true"
  ).then((res) => res.json())
  const {
    ethereum: { usd_market_cap },
  } = data
  if (!usd_market_cap)
    throw new Error("Unable to fetch ETH price from CoinGecko")
  return { value: usd_market_cap, timestamp: Date.now() }
}
