import { MetricReturnData } from "../types"

export const fetchEthPrice = async (): Promise<MetricReturnData> => {
  const data: { ethereum: { usd: number } } = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  ).then((res) => res.json())
  const {
    ethereum: { usd },
  } = data
  if (!usd) throw new Error("Unable to fetch ETH price from CoinGecko")
  return { value: usd, timestamp: Date.now() }
}
