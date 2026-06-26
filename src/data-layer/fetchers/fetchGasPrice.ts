import { fetchRetry } from "./fetchRetry"

export interface GasPriceData {
  gasPrice: number
  timestamp: number
}

export async function fetchGasPrice(): Promise<GasPriceData> {
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY

  console.log("Starting gas price data fetch")

  const response = await fetchRetry(
    `https://api.etherscan.io/v2/api?chainid=1&module=gastracker&action=gasoracle&apikey=${etherscanApiKey}`
  )

  if (!response.ok) {
    throw new Error(
      `Etherscan gas tracker responded with status ${response.status}`
    )
  }

  const data = await response.json()
  const gasPrice = parseFloat(data.result?.ProposeGasPrice)

  if (!gasPrice) {
    throw new Error("Unable to parse gas price from Etherscan")
  }

  const timestamp = Date.now()

  console.log("Successfully fetched gas price data", { gasPrice, timestamp })

  return { gasPrice, timestamp }
}
