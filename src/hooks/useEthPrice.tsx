import { useEffect, useState } from "react"

export const useEthPrice = (): number => {
  const [ethPrice, setEthPrice] = useState<number>(0)
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/gas-eth-price")
        if (!res.ok) throw new Error("Failed to fetch ETH price")
        const data: { ethPriceUSD: number } = await res.json()
        if (!data.ethPriceUSD) throw new Error("Unable to fetch ETH price")
        setEthPrice(data.ethPriceUSD)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  return ethPrice
}
