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
import ZircuitLogo from "@/public/images/layer-2/zircuit.png"
import ZkSyncEraLogo from "@/public/images/layer-2/zksyncEra.jpg"

/** Which value shapes a network's addresses and hashes take. */
export type AddressFormat = "evm" | "starknet"

/**
 * The explorer search results point at, which is not always the one the page links to:
 * search prefers Blockscout because it is open source, while `blockExplorerLink` stays
 * whatever that network's own users expect.
 *
 * `search` is a single route that resolves an address, transaction, block or name --
 * what Blockscout offers. Explorers without one give `address` and `tx` instead, and the
 * union makes it impossible to fill in half of a pair.
 */
export type SearchExplorer = {
  /** Shown as the section heading, e.g. "Search this address on Blockscout" */
  brand: string
  /** EIP-3770 short name, so `base:0x...` narrows to this chain. From `chains.ts`. */
  prefix?: string
} & ({ search: string } | { address: string; tx: string })

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
  /** The explorer this network's own users expect; shown on /layer-2/networks. */
  blockExplorerLink: string
  addressFormat: AddressFormat
  searchExplorer: SearchExplorer
  bridgeLink: string
  l2BeatLink: string
  growthepieLink: string
  feeToken: string[]
}

export type Rollups = Rollup[]

export const ethereumNetworkData = {
  name: "Ethereum Mainnet",
  chainName: "Ethereum Mainnet",
  addressFormat: "evm" as AddressFormat,
  searchExplorer: {
    brand: "Blockscout",
    prefix: "eth",
    search: "https://eth.blockscout.com/search-results?q=",
  },
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "arb1",
      search: "https://arbitrum.blockscout.com/search-results?q=",
    },
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "base",
      search: "https://base.blockscout.com/search-results?q=",
    },
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "oeth",
      search: "https://explorer.optimism.io/search-results?q=",
    },
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "zksync",
      search: "https://zksync.blockscout.com/search-results?q=",
    },
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "linea",
      search: "https://explorer.linea.build/search-results?q=",
    },
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "scr",
      search: "https://scroll.blockscout.com/search-results?q=",
    },
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
    addressFormat: "starknet",
    // Not EVM, and no unified search route -- a felt gives no hint whether it is a
    // contract or a transaction, so both are offered. Accounts are contracts here.
    searchExplorer: {
      brand: "Starkscan",
      address: "https://starkscan.co/contract/",
      tx: "https://starkscan.co/tx/",
    },
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "unichain",
      search: "https://unichain.blockscout.com/search-results?q=",
    },
    logo: UnichainLogo,
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
    addressFormat: "evm",
    searchExplorer: {
      brand: "Blockscout",
      prefix: "ink",
      search: "https://explorer.inkonchain.com/search-results?q=",
    },
    logo: InkLogo,
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
  {
    l2beatID: "zircuit",
    growthepieID: "zircuit",
    name: "Zircuit",
    chainName: "Zircuit Mainnet",
    addressFormat: "evm",
    // Not on Blockscout, and not an Etherscan family explorer either.
    searchExplorer: {
      brand: "Zircuit",
      prefix: "zircuit-mainnet",
      address: "https://explorer.zircuit.com/address/",
      tx: "https://explorer.zircuit.com/tx/",
    },
    logo: ZircuitLogo,
    networkType: "zk",
    description: "page-layer-2-zircuit-description",
    website: "https://zircuit.com/",
    applicationsLink: "https://www.zircuit.com/ecosystem",
    blockExplorerLink: "https://explorer.zircuit.com/",
    bridgeLink: "https://bridge.zircuit.com/",
    l2BeatLink: "https://l2beat.com/scaling/projects/zircuit",
    growthepieLink: "https://www.growthepie.com/chains/zircuit",
    feeToken: ["ETH"],
  },
]
