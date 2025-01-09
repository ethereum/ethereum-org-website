import { StaticImageData } from "next/image"

import { ChainName, NonEVMChainName } from "@/lib/types"

import ArbitrumLogo from "@/public/images/layer-2/arbitrum.jpg"
import BaseLogo from "@/public/images/layer-2/base.png"
import BlastImage from "@/public/images/layer-2/blast.png"
import EthereumLogo from "@/public/images/layer-2/ethereum.png"
import LineaLogo from "@/public/images/layer-2/linea.png"
import ModeLogo from "@/public/images/layer-2/mode.png"
import OptimismLogo from "@/public/images/layer-2/optimism.png"
import ScrollLogo from "@/public/images/layer-2/scroll.png"
import StarknetLogo from "@/public/images/layer-2/starknet.png"
import TaikoLogo from "@/public/images/layer-2/taiko.png"
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
    description:
      "Arbitrum One is a general-purpose Optimistic Rollup built by Offchain Labs and governed by the Arbitrum DAO.",
    website: "https://arbitrum.io/rollup",
    applicationsLink: "https://portal.arbitrum.io/projects",
    blockExplorerLink: "https://arbiscan.io/",
    bridgeLink: "https://bridge.arbitrum.io/",
    l2BeatLink: "https://l2beat.com/scaling/projects/arbitrum",
    growthepieLink: "https://www.growthepie.xyz/chains/arbitrum",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "base",
    growthepieID: "base",
    name: "Base",
    chainName: "Base",
    logo: BaseLogo,
    networkType: "optimistic",
    description:
      "Base is an Optimistic Rollup built with the OP Stack. It offers a low-cost and builder-friendly way for anyone, anywhere, to build onchain.",
    website: "https://base.org/",
    applicationsLink: "https://base.org/ecosystem",
    blockExplorerLink: "https://basescan.org/",
    bridgeLink: "https://bridge.base.org/deposit",
    l2BeatLink: "https://l2beat.com/scaling/projects/base",
    growthepieLink: "https://www.growthepie.xyz/chains/base",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "optimism",
    growthepieID: "optimism",
    name: "Optimism",
    chainName: "OP Mainnet",
    logo: OptimismLogo,
    networkType: "optimistic",
    description:
      "OP Mainnet is an EVM-equivalent Optimistic Rollup. It aims to be fast, simple, and secure.",
    website: "https://optimism.io/",
    applicationsLink: "https://optimism.io/apps",
    blockExplorerLink: "https://optimistic.etherscan.io/",
    bridgeLink: "https://app.optimism.io/",
    l2BeatLink: "https://l2beat.com/scaling/projects/optimism",
    growthepieLink: "https://www.growthepie.xyz/chains/optimism",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "blast",
    growthepieID: "blast",
    name: "Blast",
    chainName: "Blast",
    logo: BlastImage,
    networkType: "optimistic",
    description:
      "Blast is an EVM-compatible Optimistic Rollup supporting native yield.",
    website: "https://blast.io/en",
    applicationsLink: "https://www.ethereum-ecosystem.com/apps?filters=blast",
    blockExplorerLink: "https://blastscan.io/",
    bridgeLink: "https://blast.io/en/bridge",
    l2BeatLink: "https://l2beat.com/scaling/projects/blast",
    growthepieLink: "https://www.growthepie.xyz/chains/blast",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "zksync2",
    growthepieID: "zksync_era",
    name: "ZKSync Era",
    chainName: "zkSync Mainnet",
    logo: ZkSyncEraLogo,
    networkType: "zk",
    description:
      "ZKsync Era is a general-purpose ZK Rollup with full EVM compatibility.",
    website: "https://zksync.io/",
    applicationsLink: "https://zksync.io/ecosystem",
    blockExplorerLink: "https://explorer.zksync.io/",
    bridgeLink: "https://portal.zksync.io/bridge/",
    l2BeatLink: "https://l2beat.com/scaling/projects/zksync-era",
    growthepieLink: "https://www.growthepie.xyz/chains/zksync-era",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "linea",
    growthepieID: "linea",
    name: "Linea",
    chainName: "Linea",
    logo: LineaLogo,
    networkType: "zk",
    description:
      "Linea is a ZK Rollup powered by Consensys zkEVM, designed to scale the Ethereum network.",
    website: "https://linea.build/",
    applicationsLink: "https://linea.build/apps",
    blockExplorerLink: "https://lineascan.build/",
    bridgeLink: "https://bridge.linea.build/",
    l2BeatLink: "https://l2beat.com/scaling/projects/linea",
    growthepieLink: "https://www.growthepie.xyz/chains/linea",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "scroll",
    growthepieID: "scroll",
    name: "Scroll",
    chainName: "Scroll",
    logo: ScrollLogo,
    networkType: "zk",
    description:
      "Scroll is ZK Rollup that extends Ethereum’s capabilities through ZK tech and EVM compatibility.",
    website: "https://scroll.io/",
    applicationsLink: "https://scroll.io/ecosystem",
    blockExplorerLink: "https://scrollscan.com",
    bridgeLink: "https://scroll.io/bridge",
    l2BeatLink: "https://l2beat.com/scaling/projects/scroll",
    growthepieLink: "https://www.growthepie.xyz/chains/scroll",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "starknet",
    growthepieID: "starknet",
    name: "Starknet",
    chainName: "Starknet",
    logo: StarknetLogo,
    networkType: "zk",
    description:
      "Starknet is a general purpose ZK Rollup based on STARKs and the Cairo VM.",
    website: "https://starknet.io",
    applicationsLink: "https://www.starknet-ecosystem.com/",
    blockExplorerLink: "https://starkscan.co/",
    bridgeLink: "https://starkgate.starknet.io/",
    l2BeatLink: "https://l2beat.com/scaling/projects/starknet",
    growthepieLink: "https://www.growthepie.xyz/chains/starknet",
    feeToken: ["ETH", "STRK"],
  },
  {
    l2beatID: "mode",
    growthepieID: "mode",
    name: "Mode",
    chainName: "Mode",
    logo: ModeLogo,
    networkType: "optimistic",
    description:
      "Mode is an OP stack Optimistic Rollup building the AIFi economy.",
    website: "https://mode.network/",
    applicationsLink: "https://mode.network/ecosystem",
    blockExplorerLink: "https://explorer.mode.network/",
    bridgeLink: "https://app.mode.network/",
    l2BeatLink: "https://l2beat.com/scaling/projects/mode",
    growthepieLink: "https://www.growthepie.xyz/chains/mode",
    feeToken: ["ETH"],
  },
  {
    l2beatID: "taiko",
    growthepieID: "taiko",
    name: "Taiko",
    chainName: "Taiko Mainnet",
    logo: TaikoLogo,
    networkType: "optimistic",
    description:
      "Taiko is a decentralized, Ethereum-equivalent ZK-EVM rollup that enables seamless cross-chain communication.",
    website: "https://taiko.xyz",
    applicationsLink: "https://taiko.xyz/ecosystem",
    blockExplorerLink: "https://taikoscan.io/",
    bridgeLink: "https://bridge.taiko.xyz/",
    l2BeatLink: "https://l2beat.com/scaling/projects/taiko",
    growthepieLink: "https://www.growthepie.xyz/chains/taiko",
    feeToken: ["ETH"],
  },
]
