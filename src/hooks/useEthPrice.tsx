import axios from "axios"
import { useState, useEffect } from "react"
import { getData } from "../utils/cache"

export const useEthPrice = (): number => {
  const [ethPrice, setEthPrice] = useState<number>(0)
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getData<{ ethereum: { usd: number } }>(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        const {
          ethereum: { usd },
        } = data
        if (!usd) throw new Error("Unable to fetch ETH price from CoinGecko")
        setEthPrice(usd)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  return ethPrice
}
