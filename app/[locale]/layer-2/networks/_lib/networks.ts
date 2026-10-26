import { cache } from "react"

import type { ChainName } from "@/lib/types"

import {
  compileMainnet,
  compileNetworks,
  type NetworkSources,
} from "@/lib/utils/networkData"
import { getWalletSlug } from "@/lib/utils/walletData"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"
import walletsData from "@/data/wallets/wallet-data"

import {
  getEthereumMarketcapData,
  getGrowThePieBlockspaceData,
  getGrowThePieData,
  getGrowThePieMasterData,
  getL2beatData,
} from "@/lib/data"

/** Listed networks plus Mainnet, with live metrics. Throws when a source is missing. */
export const getNetworks = cache(async () => {
  const [marketcap, growThePie, blockspace, master, l2beat] = await Promise.all(
    [
      getEthereumMarketcapData(),
      getGrowThePieData(),
      getGrowThePieBlockspaceData(),
      getGrowThePieMasterData(),
      getL2beatData(),
    ]
  )

  if (!l2beat) throw new Error("Failed to fetch L2beat data")
  if (!growThePie) throw new Error("Failed to fetch GrowThePie data")
  if (!marketcap) throw new Error("Failed to fetch Ethereum marketcap data")

  const sources: NetworkSources = {
    l2beat,
    growThePie,
    blockspace,
    master,
    ethereumMarketcap: "value" in marketcap ? marketcap.value : 0,
  }
  const wallets = walletsData.map((wallet) => ({
    slug: getWalletSlug(wallet),
    chains: wallet.supported_chains,
  }))

  return {
    networks: compileNetworks(layer2Data, sources, wallets),
    mainnet: compileMainnet(
      {
        ...ethereumNetworkData,
        chainName: ethereumNetworkData.chainName as ChainName,
      },
      sources,
      wallets
    ),
    walletsTotal: walletsData.length,
  }
})
