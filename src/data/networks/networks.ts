import { StaticImageData } from "next/image"

import { layer2DataRaw, type RollupData } from "./networks-data"

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

// Map of growthepieID to logo for easy lookup
const logoMap: Record<string, StaticImageData> = {
  arbitrum: ArbitrumLogo,
  base: BaseLogo,
  optimism: OptimismLogo,
  zksync_era: ZkSyncEraLogo,
  linea: LineaLogo,
  scroll: ScrollLogo,
  starknet: StarknetLogo,
  unichain: UnichainLogo,
  ink: InkLogo,
}

export interface Rollup extends RollupData {
  logo: StaticImageData
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

// Re-export GROWTHEPIE_IDS from networks-data (auto-derived, no manual sync needed)
export { GROWTHEPIE_IDS } from "./networks-data"

// Combine data with logos to create the full layer2Data array
export const layer2Data: Rollups = layer2DataRaw.map((network) => ({
  ...network,
  logo: logoMap[network.growthepieID],
}))
