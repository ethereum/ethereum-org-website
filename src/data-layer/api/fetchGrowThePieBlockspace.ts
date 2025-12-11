import type { BlockspaceData } from "@/lib/types"

import { LAYER2_GROWTHEPIE_IDS } from "@/data/networks/growthepieIds"

export const FETCH_GROW_THE_PIE_BLOCKSPACE_TASK_ID =
  "fetch-grow-the-pie-blockspace"

type BlockspaceResponse = {
  chain_name: string
  overview: {
    "30d": {
      collectibles?: { data: number[] }
      finance?: { data: number[] }
      social?: { data: number[] }
      token_transfers?: { data: number[] }
      unlabeled?: { data: number[] }
      // Legacy structure (some networks might still use this)
      nft?: { data: number[] }
      defi?: { data: number[] }
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

      // Validate response structure
      if (!data?.overview?.["30d"]) {
        console.warn(
          `GrowThePie blockspace data structure invalid for ${networkId}`,
          { data }
        )
        errors.push(`${networkId}: Missing overview.30d`)
        continue
      }

      const overview = data.overview["30d"]

      // Handle both new structure (collectibles/finance) and legacy (nft/defi)
      const nftData = overview.collectibles?.data || overview.nft?.data
      const defiData = overview.finance?.data || overview.defi?.data
      const socialData = overview.social?.data
      const tokenTransfersData = overview.token_transfers?.data
      const unlabeledData = overview.unlabeled?.data

      // Validate required data exists
      if (!nftData || !defiData || !tokenTransfersData || !unlabeledData) {
        console.warn(
          `GrowThePie blockspace data missing required fields for ${networkId}`,
          {
            hasNft: !!nftData,
            hasDefi: !!defiData,
            hasTokenTransfers: !!tokenTransfersData,
            hasUnlabeled: !!unlabeledData,
            overviewKeys: Object.keys(overview),
          }
        )
        errors.push(`${networkId}: Missing required data fields`)
        continue
      }

      // Ensure data arrays have enough elements (need index 4)
      if (
        nftData.length < 5 ||
        defiData.length < 5 ||
        tokenTransfersData.length < 5 ||
        unlabeledData.length < 5
      ) {
        console.warn(
          `GrowThePie blockspace data arrays too short for ${networkId}`,
          {
            nftLength: nftData.length,
            defiLength: defiData.length,
            tokenTransfersLength: tokenTransfersData.length,
            unlabeledLength: unlabeledData.length,
          }
        )
        errors.push(`${networkId}: Data arrays too short`)
        continue
      }

      blockspaceData[networkId] = {
        nft: nftData[4],
        defi: defiData[4],
        social: socialData?.[4] || 0,
        token_transfers: tokenTransfersData[4],
        unlabeled: unlabeledData[4],
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
