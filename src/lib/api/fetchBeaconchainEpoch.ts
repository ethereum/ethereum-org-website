import type { EpochResponse } from "@/lib/types"

export const fetchBeaconchainEpoch = async (): Promise<{
  totalEthStaked: number
  validatorscount: number
}> => {
  const response = await fetch("https://beaconcha.in/api/v1/epoch/latest")
  if (!response.ok) {
    throw new Error("Failed to fetch Beaconcha.in epoch data")
  }
  const json: EpochResponse = await response.json()
  const { validatorscount, eligibleether } = json.data
  const totalEthStaked = Math.floor(eligibleether * 1e-9) // `eligibleether` value returned in `gwei`
  return {
    totalEthStaked,
    validatorscount,
  }
}
