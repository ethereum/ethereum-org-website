import { GROWTHEPIE_IDS } from "@/data/networks/networks-data"

export type GrowThePieBlockspaceData = Record<
  string,
  {
    nft: number
    defi: number
    social: number
    token_transfers: number
    unlabeled: number
  }
>

export const fetchGrowThePieBlockspace = async (): Promise<
  GrowThePieBlockspaceData | { error: string }
> => {
  const blockspaceData: GrowThePieBlockspaceData = {}

  try {
    for (const growthepieID of GROWTHEPIE_IDS) {
      try {
        const response = await fetch(
          `https://api.growthepie.com/v1/chains/blockspace/${growthepieID}.json`
        )

        if (!response.ok) {
          console.warn(
            `Failed to fetch blockspace data for ${growthepieID}:`,
            response.status,
            response.statusText
          )
          continue
        }

        const data = await response.json()

        blockspaceData[growthepieID] = {
          nft: data.overview["30d"].nft.data[4],
          defi: data.overview["30d"].defi.data[4],
          social: data.overview["30d"].social.data?.[4] || 0,
          token_transfers: data.overview["30d"].token_transfers.data[4],
          unlabeled: data.overview["30d"].unlabeled.data[4],
        }
      } catch (error) {
        console.error(
          `Error fetching blockspace data for ${growthepieID}:`,
          error
        )
        // Continue with other networks even if one fails
        continue
      }
    }

    return blockspaceData
  } catch (error) {
    console.error("Error fetching GrowThePie blockspace data:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch GrowThePie blockspace data",
    }
  }
}
