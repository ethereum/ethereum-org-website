import { layer2Data } from "@/data/networks/networks"

export const fetchGrowThePieBlockspace = async () => {
  const blockspaceData = {}
  for (const network of layer2Data) {
    const response = await fetch(
      `https://api.growthepie.xyz/v1/chains/blockspace/${network.growthepieID}.json`
    )
    if (!response.ok) {
      continue
    }
    const data = await response.json()

    blockspaceData[network.growthepieID] = {
      nft: data.overview["30d"].nft.data[4],
      defi: data.overview["30d"].defi.data[4],
      social: data.overview["30d"].social.data[4],
      token_transfers: data.overview["30d"].token_transfers.data[4],
      unlabeled: data.overview["30d"].unlabeled.data[4],
    }
  }

  return blockspaceData
}
