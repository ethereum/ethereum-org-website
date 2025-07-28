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
    metaTitle: "List of ethereum DeFi apps — Lending, Borrowing & Yield",
    metaDescription:
      "Explore top DeFi apps on Ethereum for lending, borrowing, stablecoin issuance, credit and on-chain DEX trading.",
  },
  [AppCategoryEnum.COLLECTIBLE]: {
    name: "Collectibles",
    icon: CollectiblesIcon,
    slug: slugify(AppCategoryEnum.COLLECTIBLE),
    description:
      "Collectibles are digital assets that are unique and cannot be replicated.",
    metaTitle: "List of best NFT apps on ethereum",
    metaDescription:
      "Explore top NFT apps for buying collectibles, trading gaming skins, and discovering new digital assets across leading Ethereum marketplaces.",
  },
  [AppCategoryEnum.SOCIAL]: {
    name: "Social",
    icon: SocialIcon,
    slug: slugify(AppCategoryEnum.SOCIAL),
    description:
      "Social is a category of decentralized applications that allow users to connect with others and share content.",
    metaTitle: "Social apps on ethereum: farcaster, zora and more",
    metaDescription: "Explore best messaging and social apps on ethereum.",
  },
  [AppCategoryEnum.GAMING]: {
    name: "Gaming",
    icon: GamingIcon,
    slug: slugify(AppCategoryEnum.GAMING),
    description:
      "Gaming is a category of decentralized applications that allow users to play games and earn rewards.",
    metaTitle: "List of crypto and NFT games on ethereum",
    metaDescription:
      "Discover the best blockchain games that are fun to play. MMORPG, card games, AI gaming, RPG, casual games",
  },
  [AppCategoryEnum.BRIDGE]: {
    name: "Bridge",
    icon: BridgeIcon,
    slug: slugify(AppCategoryEnum.BRIDGE),
    description:
      "Bridge is a category of decentralized applications that allow users to bridge their assets between different networks.",
    metaTitle: "List of ethereum bridges to different networks",
    metaDescription:
      "Discover the best crypto bridge app to move your assets between different networks and layer 2s.",
  },
  [AppCategoryEnum.PRODUCTIVITY]: {
    name: "Productivity",
    icon: ProductivityIcon,
    slug: slugify(AppCategoryEnum.PRODUCTIVITY),
    description:
      "Productivity is a category of decentralized applications that allow users to be productive.",
    metaTitle: "Productivity and decentralized identity apps",
    metaDescription:
      "Explore top Ethereum apps for decentralized identity, storage, DNS, and video computing. Boost your on-chain productivity with trusted infrastructure tools.",
  },
  [AppCategoryEnum.PRIVACY]: {
    name: "Privacy",
    icon: PrivacyIcon,
    slug: slugify(AppCategoryEnum.PRIVACY),
    description:
      "Privacy is a category of decentralized applications that allow users to be private.",
    metaTitle: "Ethereum privacy apps: tornado cash and others",
    metaDescription:
      "Explore Ethereum privacy apps like Tornado Cash and others that protect user anonymity, enable private transactions, and enhance on-chain confidentiality.",
  },
  [AppCategoryEnum.GOVERNANCE_DAO]: {
    name: "DAO",
    icon: GovernanceIcon,
    slug: slugify(AppCategoryEnum.GOVERNANCE_DAO),
    description:
      "DAO is a category of decentralized applications that allow users to govern and create decentralized autonomous organizations.",
    metaTitle: "List of DAO tools on ethereum",
    metaDescription:
      "Discover top DAO tools on Ethereum for governance, treasury management, voting, and contributor coordination. Launch, manage, and grow your decentralized organization.",
  },
}
