import type { EthStakedResponse, MetricReturnData } from "@/lib/types"

import { DUNE_API_URL } from "../constants"

const DUNE_API_KEY = process.env.DUNE_API_KEY

export const fetchTotalEthStaked = async (): Promise<MetricReturnData> => {
  if (!DUNE_API_KEY) {
    console.error("Dune API key not found")
    return { error: "Dune API key not found" }
  }

  const url = new URL(
    "api/v1/endpoints/pablop/eth-staked/results",
    DUNE_API_URL
  )

  try {
    const ethStakedResponse = await fetch(url, {
      headers: { "X-Dune-API-Key": DUNE_API_KEY },
    })
    if (!ethStakedResponse.ok) {
      console.log(ethStakedResponse.status, ethStakedResponse.statusText)
      throw new Error("Failed to fetch eth staked data")
    }

    const ethStakedJson: EthStakedResponse = await ethStakedResponse.json()
    const {
      result: { rows = [] },
    } = ethStakedJson

    const data = rows.map((row) => ({
      timestamp: new Date(row.time).getTime(),
      value: row.cum_deposited_eth,
    }))

    // data is already sorted...but just in case
    data.sort((a, b) => a.timestamp - b.timestamp)

    const { value } = data[data.length - 1]

    return {
      data,
      value,
    }
  } catch (error: unknown) {
    console.error((error as Error).message)
    return { error: (error as Error).message }
  }
}
