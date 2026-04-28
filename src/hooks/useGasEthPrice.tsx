import { useEffect, useState } from "react"

type GasEthPriceData = {
  ethPrice: number
  gasPrice: number
}

export const useGasEthPrice = (): GasEthPriceData => {
  const [data, setData] = useState<GasEthPriceData>({
    ethPrice: 0,
    gasPrice: 0,
  })
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/gas-eth-price")
        if (!res.ok) throw new Error("Failed to fetch gas/ETH price")
        const json: { ethPriceUSD: number; gasPrice: number } = await res.json()
        if (!json.ethPriceUSD) throw new Error("Unable to fetch ETH price")
        setData({ ethPrice: json.ethPriceUSD, gasPrice: json.gasPrice })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  return data
}
