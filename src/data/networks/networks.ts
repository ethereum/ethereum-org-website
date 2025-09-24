import { StaticImageData } from "next/image"

import { ChainName, NonEVMChainName } from "@/lib/types"

import ArbitrumLogo from "@/public/images/layer-2/arbitrum.jpg"
import BaseLogo from "@/public/images/layer-2/base.png"
import EthereumLogo from "@/public/images/layer-2/ethereum.png"
import InkLogo from "@/public/images/layer-2/ink.png"
import LineaLogo from "@/public/images/layer-2/linea.png"
import OptimismLogo from "@/public/images/layer-2/optimism.png"
import ScrollLogo from "@/public/images/layer-2/scroll.png"
import StarknetLogo from "@/public/images/layer-2/starknet.png"
import UnichainLogo from "@/public/images/layer-2/unichain.png"
import ZkSyncEraLogo from "@/public/images/layer-2/zksyncEra.jpg"

export interface Rollup {
  l2beatID: string
  growthepieID: string
  name: string
  chainName: ChainName | NonEVMChainName
  canExpand?: boolean
  logo: StaticImageData
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

export type Rollups = Rollup[]

export const ethereumNetworkData = {
  name: "Ethereum Mainnet",
  chainName: "Ethereum Mainnet",
  growthepieID: "ethereum",
  logo: EthereumLogo,
  networkMaturity: "n/a",
  canExpand: false,
}

export const layer2Data: Rollups = [
  {
    l2beatID: "arbitrum",
    growthepieID: "arbitrum",
    name: "Arbitrum One",
    chainName: "Arbitrum One",
    logo: ArbitrumLogo,
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
    logo: BaseLogo,
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
    logo: OptimismLogo,
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
    logo: ZkSyncEraLogo,
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
    logo: LineaLogo,
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
    logo: ScrollLogo,
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
    logo: StarknetLogo,
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
    logo: UnichainLogo,
    networkType: "optimistic",
    description: "page-layer-2-optimism-description",
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
    logo: InkLogo,
    networkType: "optimistic",
    description: "page-layer-2-optimism-description",
    website: "https://inkonchain.com/",
    applicationsLink: "https://inkonchain.com/apps",
    blockExplorerLink: "https://explorer.inkonchain.com/",
    bridgeLink: "https://inkonchain.com/bridge",
    l2BeatLink: "https://l2beat.com/scaling/projects/ink",
    growthepieLink: "https://www.growthepie.com/chains/ink",
    feeToken: ["ETH"],
  },
]
