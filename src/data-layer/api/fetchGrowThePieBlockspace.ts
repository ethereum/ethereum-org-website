import { LAYER2_GROWTHEPIE_IDS } from "@/data/networks/growthepieIds"

export const FETCH_GROW_THE_PIE_BLOCKSPACE_TASK_ID =
  "fetch-grow-the-pie-blockspace"

type BlockspaceData = {
  nft: number
  defi: number
  social: number
  token_transfers: number
  unlabeled: number
}

type BlockspaceResponse = {
  overview: {
    "30d": {
      nft: { data: number[] }
      defi: { data: number[] }
      social: { data?: number[] }
      token_transfers: { data: number[] }
      unlabeled: { data: number[] }
    }
  }
}

/**
 * Fetch GrowThePie blockspace data for all Layer 2 networks.
 * Returns blockspace usage data (NFT, DeFi, social, token transfers, unlabeled) for each network.
 */
export async function fetchGrowThePieBlockspace(): Promise<
  Record<string, BlockspaceData>
> {
  console.log("Starting GrowThePie blockspace data fetch")

  const blockspaceData: Record<string, BlockspaceData> = {}
  const errors: string[] = []

  for (const networkId of LAYER2_GROWTHEPIE_IDS) {
    try {
      const url = `https://api.growthepie.com/v1/chains/blockspace/${networkId}.json`
      const response = await fetch(url)

      if (!response.ok) {
        const status = response.status
        console.warn(`GrowThePie blockspace fetch failed for ${networkId}`, {
          status,
          url,
        })
        errors.push(`${networkId}: ${status}`)
        continue
      }

      const data: BlockspaceResponse = await response.json()

      blockspaceData[networkId] = {
        nft: data.overview["30d"].nft.data[4],
        defi: data.overview["30d"].defi.data[4],
        social: data.overview["30d"].social.data?.[4] || 0,
        token_transfers: data.overview["30d"].token_transfers.data[4],
        unlabeled: data.overview["30d"].unlabeled.data[4],
      }
    } catch (error) {
      console.error(`Error fetching blockspace data for ${networkId}:`, error)
      errors.push(
        `${networkId}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  const successCount = Object.keys(blockspaceData).length
  const totalCount = LAYER2_GROWTHEPIE_IDS.length

  console.log("Successfully fetched GrowThePie blockspace data", {
    successCount,
    totalCount,
    errors: errors.length > 0 ? errors : undefined,
  })

  if (errors.length > 0 && successCount === 0) {
    throw new Error(
      `Failed to fetch blockspace data for all networks: ${errors.join(", ")}`
    )
  }

  return blockspaceData
}
