import { useEffect, useState } from "react"

export const useEthPrice = (): number => {
  const [ethPrice, setEthPrice] = useState<number>(0)
  useEffect(() => {
    ;(async () => {
      try {
        const data: { ethereum: { usd: number } } = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        ).then((res) => res.json())
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
