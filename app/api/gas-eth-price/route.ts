import { NextResponse } from "next/server"

import { getHourlyEthPrice, getHourlyGasPriceData } from "@/lib/data"
import { createOptionsResponse } from "@/lib/utils/optionsResponse"

export const revalidate = 3600

export function OPTIONS() {
  return createOptionsResponse(["GET", "HEAD"])
}

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
    ethPercentChange24h: ethPriceData.percentChange24h,
  })
}
