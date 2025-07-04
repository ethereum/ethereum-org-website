import { DappCategories, DappCategoryEnum } from "@/lib/types"

import CategoryIcon from "@/components/icons/dapps/category.svg"

export const dappsCategories: DappCategories = {
  [DappCategoryEnum.DEFI]: {
    name: "DeFi",
    icon: CategoryIcon,
    slug: DappCategoryEnum.DEFI,
    description:
      "DeFi is a category of decentralized applications that allow users to lend, borrow, trade, and earn interest on their crypto assets.",
  },
  [DappCategoryEnum.COLLECTIBLE]: {
    name: "Collectibles",
    icon: CategoryIcon,
    slug: DappCategoryEnum.COLLECTIBLE,
    description:
      "Collectibles are digital assets that are unique and cannot be replicated.",
  },
  [DappCategoryEnum.SOCIAL]: {
    name: "Social",
    icon: CategoryIcon,
    slug: DappCategoryEnum.SOCIAL,
    description:
      "Social is a category of decentralized applications that allow users to connect with others and share content.",
  },
  [DappCategoryEnum.GAMING]: {
    name: "Gaming",
    icon: CategoryIcon,
    slug: DappCategoryEnum.GAMING,
    description:
      "Gaming is a category of decentralized applications that allow users to play games and earn rewards.",
  },
  [DappCategoryEnum.BRIDGE]: {
    name: "Bridge",
    icon: CategoryIcon,
    slug: DappCategoryEnum.BRIDGE,
    description:
      "Bridge is a category of decentralized applications that allow users to bridge their assets between different networks.",
  },
  [DappCategoryEnum.PRODUCTIVITY]: {
    name: "Productivity",
    icon: CategoryIcon,
    slug: DappCategoryEnum.PRODUCTIVITY,
    description:
      "Productivity is a category of decentralized applications that allow users to be productive.",
  },
  [DappCategoryEnum.PRIVACY]: {
    name: "Privacy",
    icon: CategoryIcon,
    slug: DappCategoryEnum.PRIVACY,
    description:
      "Privacy is a category of decentralized applications that allow users to be private.",
  },
  [DappCategoryEnum.GOVERNANCE_DAO]: {
    name: "Governance/DAO",
    icon: CategoryIcon,
    slug: DappCategoryEnum.GOVERNANCE_DAO,
    description:
      "Governance/DAO is a category of decentralized applications that allow users to govern and create decentralized autonomous organizations.",
  },
}
