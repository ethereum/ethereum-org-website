import { DappCategories, DappCategoryEnum } from "@/lib/types"

import BridgeIcon from "@/components/icons/dapps/bridge.svg"
import CollectiblesIcon from "@/components/icons/dapps/collectibles.svg"
import DeFiIcon from "@/components/icons/dapps/defi.svg"
import GamingIcon from "@/components/icons/dapps/gaming.svg"
import GovernanceIcon from "@/components/icons/dapps/governance.svg"
import PrivacyIcon from "@/components/icons/dapps/privacy.svg"
import ProductivityIcon from "@/components/icons/dapps/productivity.svg"
import SocialIcon from "@/components/icons/dapps/social.svg"

import { createSlug } from "@/lib/utils/url"

export const dappsCategories: DappCategories = {
  [DappCategoryEnum.DEFI]: {
    name: "DeFi",
    icon: DeFiIcon,
    slug: createSlug(DappCategoryEnum.DEFI),
    description:
      "DeFi is a category of decentralized applications that allow users to lend, borrow, trade, and earn interest on their crypto assets.",
  },
  [DappCategoryEnum.COLLECTIBLE]: {
    name: "Collectibles",
    icon: CollectiblesIcon,
    slug: createSlug(DappCategoryEnum.COLLECTIBLE),
    description:
      "Collectibles are digital assets that are unique and cannot be replicated.",
  },
  [DappCategoryEnum.SOCIAL]: {
    name: "Social",
    icon: SocialIcon,
    slug: createSlug(DappCategoryEnum.SOCIAL),
    description:
      "Social is a category of decentralized applications that allow users to connect with others and share content.",
  },
  [DappCategoryEnum.GAMING]: {
    name: "Gaming",
    icon: GamingIcon,
    slug: createSlug(DappCategoryEnum.GAMING),
    description:
      "Gaming is a category of decentralized applications that allow users to play games and earn rewards.",
  },
  [DappCategoryEnum.BRIDGE]: {
    name: "Bridge",
    icon: BridgeIcon,
    slug: createSlug(DappCategoryEnum.BRIDGE),
    description:
      "Bridge is a category of decentralized applications that allow users to bridge their assets between different networks.",
  },
  [DappCategoryEnum.PRODUCTIVITY]: {
    name: "Productivity",
    icon: ProductivityIcon,
    slug: createSlug(DappCategoryEnum.PRODUCTIVITY),
    description:
      "Productivity is a category of decentralized applications that allow users to be productive.",
  },
  [DappCategoryEnum.PRIVACY]: {
    name: "Privacy",
    icon: PrivacyIcon,
    slug: createSlug(DappCategoryEnum.PRIVACY),
    description:
      "Privacy is a category of decentralized applications that allow users to be private.",
  },
  [DappCategoryEnum.GOVERNANCE_DAO]: {
    name: "DAO",
    icon: GovernanceIcon,
    slug: createSlug(DappCategoryEnum.GOVERNANCE_DAO),
    description:
      "DAO is a category of decentralized applications that allow users to govern and create decentralized autonomous organizations.",
  },
}
