import { StaticImageData } from "next/image"

import { AppOnlyChainName, ChainName } from "@/lib/types"

import AbstractLogo from "@/public/images/layer-2/abstract.png"
import ImmutableZkEvmLogo from "@/public/images/layer-2/immutablezkevm.png"

export interface AppNetwork {
  name: string
  chainName: ChainName | AppOnlyChainName
  logo: StaticImageData
}

// App-only networks: referenced by apps (e.g. games) for display purposes.
// Kept separate from layer2Data so they do NOT appear on /layer-2/* pages,
// which have a higher quality bar and require L2Beat/GrowThePie coverage.
export const appOnlyNetworks: AppNetwork[] = [
  {
    name: "Abstract",
    chainName: "Abstract",
    logo: AbstractLogo,
  },
  {
    name: "Immutable zkEVM",
    chainName: "Immutable zkEVM",
    logo: ImmutableZkEvmLogo,
  },
]
