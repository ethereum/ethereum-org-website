import type { EpochResponse, MetricReturnData } from "@/lib/types"

export const fetchEthStakedBeaconchain =
  async (): Promise<MetricReturnData> => {
    // Fetch Beaconcha.in data
    const base = "https://beaconcha.in"
    const { href } = new URL("api/v1/epoch/latest", base)

    // Get total eligible ETH staked from latest epoch endpoint
    const response = await fetch(href)
    if (!response.ok)
      throw new Error("Network response from Beaconcha.in EPOCH was not ok")
    const json: EpochResponse = await response.json()
    const { eligibleether: eligibleGwei } = json.data

    const totalEthStaked = Math.floor(eligibleGwei * 1e-9)

    return { value: totalEthStaked, timestamp: Date.now() }
  }
