import { AppCategories, AppCategoryEnum } from "@/lib/types"

import BridgeIcon from "@/components/icons/dapps/bridge.svg"
import CollectiblesIcon from "@/components/icons/dapps/collectibles.svg"
import DeFiIcon from "@/components/icons/dapps/defi.svg"
import GamingIcon from "@/components/icons/dapps/gaming.svg"
import GovernanceIcon from "@/components/icons/dapps/governance.svg"
import PrivacyIcon from "@/components/icons/dapps/privacy.svg"
import ProductivityIcon from "@/components/icons/dapps/productivity.svg"
import SocialIcon from "@/components/icons/dapps/social.svg"

import { slugify } from "@/lib/utils/url"

export const appsCategories: AppCategories = {
  [AppCategoryEnum.DEFI]: {
    name: "DeFi",
    icon: DeFiIcon,
    slug: slugify(AppCategoryEnum.DEFI),
    description:
      "DeFi is a category of decentralized applications that allow users to lend, borrow, trade, and earn interest on their crypto assets.",
  },
  [AppCategoryEnum.COLLECTIBLE]: {
    name: "Collectibles",
    icon: CollectiblesIcon,
    slug: slugify(AppCategoryEnum.COLLECTIBLE),
    description:
      "Collectibles are digital assets that are unique and cannot be replicated.",
  },
  [AppCategoryEnum.SOCIAL]: {
    name: "Social",
    icon: SocialIcon,
    slug: slugify(AppCategoryEnum.SOCIAL),
    description:
      "Social is a category of decentralized applications that allow users to connect with others and share content.",
  },
  [AppCategoryEnum.GAMING]: {
    name: "Gaming",
    icon: GamingIcon,
    slug: slugify(AppCategoryEnum.GAMING),
    description:
      "Gaming is a category of decentralized applications that allow users to play games and earn rewards.",
  },
  [AppCategoryEnum.BRIDGE]: {
    name: "Bridge",
    icon: BridgeIcon,
    slug: slugify(AppCategoryEnum.BRIDGE),
    description:
      "Bridge is a category of decentralized applications that allow users to bridge their assets between different networks.",
  },
  [AppCategoryEnum.PRODUCTIVITY]: {
    name: "Productivity",
    icon: ProductivityIcon,
    slug: slugify(AppCategoryEnum.PRODUCTIVITY),
    description:
      "Productivity is a category of decentralized applications that allow users to be productive.",
  },
  [AppCategoryEnum.PRIVACY]: {
    name: "Privacy",
    icon: PrivacyIcon,
    slug: slugify(AppCategoryEnum.PRIVACY),
    description:
      "Privacy is a category of decentralized applications that allow users to be private.",
  },
  [AppCategoryEnum.GOVERNANCE_DAO]: {
    name: "DAO",
    icon: GovernanceIcon,
    slug: slugify(AppCategoryEnum.GOVERNANCE_DAO),
    description:
      "DAO is a category of decentralized applications that allow users to govern and create decentralized autonomous organizations.",
  },
}
