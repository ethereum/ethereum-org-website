import type { StaticImageData } from "next/image"

import type { Framework } from "@/lib/interfaces"

import { frameworksListData } from "./frameworks-data"

import EthDiamondBlackImage from "@/public/images/assets/eth-diamond-black.png"
import FoundryImage from "@/public/images/dev-tools/foundry.png"
import HardhatImage from "@/public/images/dev-tools/hardhat.png"
import KurtosisImage from "@/public/images/dev-tools/kurtosis.png"
import ScaffoldEthImage from "@/public/images/dev-tools/scaffoldeth.png"

const imageMap: Record<string, StaticImageData> = {
  "Kurtosis Ethereum Package": KurtosisImage,
  hardhat: HardhatImage,
  brownie: EthDiamondBlackImage,
  createethapp: EthDiamondBlackImage,
  scaffoldeth: ScaffoldEthImage,
  soliditytemplate: EthDiamondBlackImage,
  foundry: FoundryImage,
}

export const frameworksList: Array<Framework> = frameworksListData.map(
  (framework) => ({
    ...framework,
    image: imageMap[framework.id] || EthDiamondBlackImage,
  })
)
