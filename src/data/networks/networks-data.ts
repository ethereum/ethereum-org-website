import { ChainName, NonEVMChainName } from "@/lib/types"

/**
 * Network data without images (for use in ts-node scripts and data derivation).
 * This file contains the pure data structure that can be imported without image dependencies.
 */
export interface RollupData {
  l2beatID: string
  growthepieID: string
  name: string
  chainName: ChainName | NonEVMChainName
  canExpand?: boolean
  networkType: "optimistic" | "zk"
  description: string
  website: string
  applicationsLink: string
  blockExplorerLink: string
  bridgeLink: string
  l2BeatLink: string
  growthepieLink: string
  feeToken: string[]
}

export type RollupsData = RollupData[]

export const layer2DataRaw: RollupsData = [
  {
    l2beatID: "arbitrum",
    growthepieID: "arbitrum",
    name: "Arbitrum One",
    chainName: "Arbitrum One",
    networkType: "optimistic",
    description: "page-layer-2-arbitrum-description",
    website: "https://arbitrum.io/rollup",
    applicationsLink: "https://portal.arbitrum.io/projects",
    blockExplorerLink: "https://arbiscan.io/",
    bridgeLink: "https://bridge.arbitrum.io/",
    l2BeatLink: "https://l2beat.com/scaling/projects/arbitrum",
    growthepieLink: "https://www.growthepie.com/chains/arbitrum",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "base",
    growthepieID: "base",
    name: "Base",
    chainName: "Base",
    networkType: "optimistic",
    description: "page-layer-2-base-description",
    website: "https://base.org/",
    applicationsLink: "https://base.org/ecosystem",
    blockExplorerLink: "https://basescan.org/",
    bridgeLink: "https://bridge.base.org/deposit",
    l2BeatLink: "https://l2beat.com/scaling/projects/base",
    growthepieLink: "https://www.growthepie.com/chains/base",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "optimism",
    growthepieID: "optimism",
    name: "Optimism",
    chainName: "OP Mainnet",
    networkType: "optimistic",
    description: "page-layer-2-optimism-description",
    website: "https://optimism.io/",
    applicationsLink: "https://optimism.io/apps",
    blockExplorerLink: "https://optimistic.etherscan.io/",
    bridgeLink: "https://app.optimism.io/",
    l2BeatLink: "https://l2beat.com/scaling/projects/optimism",
    growthepieLink: "https://www.growthepie.com/chains/optimism",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "zksync2",
    growthepieID: "zksync_era",
    name: "ZKSync Era",
    chainName: "zkSync Mainnet",
    networkType: "zk",
    description: "page-layer-2-zksync2-description",
    website: "https://zksync.io/",
    applicationsLink: "https://zksync.io/ecosystem",
    blockExplorerLink: "https://explorer.zksync.io/",
    bridgeLink: "https://portal.zksync.io/bridge/",
    l2BeatLink: "https://l2beat.com/scaling/projects/zksync-era",
    growthepieLink: "https://www.growthepie.com/chains/zksync-era",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "linea",
    growthepieID: "linea",
    name: "Linea",
    chainName: "Linea",
    networkType: "zk",
    description: "page-layer-2-linea-description",
    website: "https://linea.build/",
    applicationsLink: "https://linea.build/apps",
    blockExplorerLink: "https://lineascan.build/",
    bridgeLink: "https://bridge.linea.build/",
    l2BeatLink: "https://l2beat.com/scaling/projects/linea",
    growthepieLink: "https://www.growthepie.com/chains/linea",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "scroll",
    growthepieID: "scroll",
    name: "Scroll",
    chainName: "Scroll",
    networkType: "zk",
    description: "page-layer-2-scroll-description",
    website: "https://scroll.io/",
    applicationsLink: "https://scroll.io/ecosystem",
    blockExplorerLink: "https://scrollscan.com",
    bridgeLink: "https://scroll.io/bridge",
    l2BeatLink: "https://l2beat.com/scaling/projects/scroll",
    growthepieLink: "https://www.growthepie.com/chains/scroll",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "starknet",
    growthepieID: "starknet",
    name: "Starknet",
    chainName: "Starknet",
    networkType: "zk",
    description: "page-layer-2-starknet-description",
    website: "https://starknet.io",
    applicationsLink: "https://www.starknet-ecosystem.com/",
    blockExplorerLink: "https://starkscan.co/",
    bridgeLink: "https://starkgate.starknet.io/",
    l2BeatLink: "https://l2beat.com/scaling/projects/starknet",
    growthepieLink: "https://www.growthepie.com/chains/starknet",
    feeToken: ["ETH", "STRK"],
  },
  {
    l2beatID: "unichain",
    growthepieID: "unichain",
    name: "Unichain",
    chainName: "Unichain",
    networkType: "optimistic",
    description: "page-layer-2-unichain-description",
    website: "https://www.unichain.org/",
    applicationsLink: "https://www.unichain.org/explore",
    blockExplorerLink: "https://uniscan.xyz/",
    bridgeLink: "https://www.unichain.org/bridge",
    l2BeatLink: "https://l2beat.com/scaling/projects/unichain",
    growthepieLink: "https://www.growthepie.com/chains/unichain",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "ink",
    growthepieID: "ink",
    name: "Ink",
    chainName: "Ink",
    networkType: "optimistic",
    description: "page-layer-2-ink-description",
    website: "https://inkonchain.com/",
    applicationsLink: "https://inkonchain.com/apps",
    blockExplorerLink: "https://explorer.inkonchain.com/",
    bridgeLink: "https://inkonchain.com/bridge",
    l2BeatLink: "https://l2beat.com/scaling/projects/ink",
    growthepieLink: "https://www.growthepie.com/chains/ink",
    feeToken: ["ETH"],
  },
]

// Automatically derive GROWTHEPIE_IDS from the data
export const GROWTHEPIE_IDS: string[] = layer2DataRaw.map(
  (network) => network.growthepieID
)
