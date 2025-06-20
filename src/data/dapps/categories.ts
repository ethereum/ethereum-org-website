import { FaFolder } from "react-icons/fa"

import { DappCategories, DappCategoryEnum } from "@/lib/types"

export const dappsCategories: DappCategories = {
  [DappCategoryEnum.DEFI]: {
    name: "DeFi",
    icon: FaFolder,
    slug: DappCategoryEnum.DEFI,
    description:
      "DeFi is a category of decentralized applications that allow users to lend, borrow, trade, and earn interest on their crypto assets.",
  },
  [DappCategoryEnum.COLLECTIBLE]: {
    name: "Collectibles",
    icon: FaFolder,
    slug: DappCategoryEnum.COLLECTIBLE,
    description:
      "Collectibles are digital assets that are unique and cannot be replicated.",
  },
  [DappCategoryEnum.SOCIAL]: {
    name: "Social",
    icon: FaFolder,
    slug: DappCategoryEnum.SOCIAL,
    description:
      "Social is a category of decentralized applications that allow users to connect with others and share content.",
  },
  [DappCategoryEnum.GAMING]: {
    name: "Gaming",
    icon: FaFolder,
    slug: DappCategoryEnum.GAMING,
    description:
      "Gaming is a category of decentralized applications that allow users to play games and earn rewards.",
  },
  [DappCategoryEnum.BRIDGE]: {
    name: "Bridge",
    icon: FaFolder,
    slug: DappCategoryEnum.BRIDGE,
    description:
      "Bridge is a category of decentralized applications that allow users to bridge their assets between different networks.",
  },
}
