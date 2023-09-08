import axios from "axios"
import { useState, useEffect } from "react"

export const useEthPrice = (): number => {
  const [ethPrice, setEthPrice] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        if (
          response.status !== 200 ||
          !response.data ||
          !response.data.ethereum
        )
          throw new Error("Unable to fetch ETH price from CoinGecko")
        const currentPriceUSD = response.data.ethereum.usd
        setEthPrice(currentPriceUSD)
      } catch (error) {
        console.error(error)
        setEthPrice(0)
      }
    })()
  }, [])
  return ethPrice
}
