import { NextResponse } from "next/server"

import { getHourlyEthPrice, getHourlyGasPriceData } from "@/lib/data"

export const revalidate = 3600 // 1 hour

export async function GET() {
  const [gasPriceData, ethPriceData] = await Promise.all([
    getHourlyGasPriceData(),
    getHourlyEthPrice(),
  ])

  if (!gasPriceData || !ethPriceData || "error" in ethPriceData) {
    return NextResponse.json(
      { error: "Gas price or ETH price data not available" },
      { status: 502 }
    )
  }

  return NextResponse.json({
    gasPrice: gasPriceData.gasPrice,
    ethPriceUSD: ethPriceData.value,
  })
}
