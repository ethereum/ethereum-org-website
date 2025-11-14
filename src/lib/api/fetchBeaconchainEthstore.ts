import type { EthStoreResponse } from "@/lib/types"

export const fetchBeaconchainEthstore = async (): Promise<
  number | { error: string }
> => {
  const base = "https://beaconcha.in"
  const endpoint = "api/v1/ethstore/latest"
  const { href } = new URL(endpoint, base)

  try {
    const response = await fetch(href)
    if (!response.ok) {
      console.error("Beaconcha.in fetch non-OK", {
        status: response.status,
        url: href,
      })
      return {
        error: `Beaconcha.in responded with status ${response.status}`,
      }
    }

    const json: EthStoreResponse = await response.json()
    const apr = json.data.apr
    return apr
  } catch (err: unknown) {
    console.error("Beaconcha.in fetch failed", {
      name: err instanceof Error ? err.name : undefined,
      message: err instanceof Error ? err.message : String(err),
      url: href,
    })
    return {
      error:
        err instanceof Error
          ? err.message
          : "Failed to fetch Beaconcha.in ethstore",
    }
  }
}
