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
    name: "page-apps-category-defi-name",
    icon: DeFiIcon,
    slug: slugify(AppCategoryEnum.DEFI),
    description: "page-apps-category-defi-description",
    metaTitle: "page-apps-category-defi-meta-title",
    metaDescription: "page-apps-category-defi-meta-description",
  },
  [AppCategoryEnum.COLLECTIBLE]: {
    name: "page-apps-category-collectibles-name",
    icon: CollectiblesIcon,
    slug: slugify(AppCategoryEnum.COLLECTIBLE),
    description: "page-apps-category-collectibles-description",
    metaTitle: "page-apps-category-collectibles-meta-title",
    metaDescription: "page-apps-category-collectibles-meta-description",
  },
  [AppCategoryEnum.SOCIAL]: {
    name: "page-apps-category-social-name",
    icon: SocialIcon,
    slug: slugify(AppCategoryEnum.SOCIAL),
    description: "page-apps-category-social-description",
    metaTitle: "page-apps-category-social-meta-title",
    metaDescription: "page-apps-category-social-meta-description",
  },
  [AppCategoryEnum.GAMING]: {
    name: "page-apps-category-gaming-name",
    icon: GamingIcon,
    slug: slugify(AppCategoryEnum.GAMING),
    description: "page-apps-category-gaming-description",
    metaTitle: "page-apps-category-gaming-meta-title",
    metaDescription: "page-apps-category-gaming-meta-description",
  },
  [AppCategoryEnum.BRIDGE]: {
    name: "page-apps-category-bridge-name",
    icon: BridgeIcon,
    slug: slugify(AppCategoryEnum.BRIDGE),
    description: "page-apps-category-bridge-description",
    metaTitle: "page-apps-category-bridge-meta-title",
    metaDescription: "page-apps-category-bridge-meta-description",
  },
  [AppCategoryEnum.PRODUCTIVITY]: {
    name: "page-apps-category-productivity-name",
    icon: ProductivityIcon,
    slug: slugify(AppCategoryEnum.PRODUCTIVITY),
    description: "page-apps-category-productivity-description",
    metaTitle: "page-apps-category-productivity-meta-title",
    metaDescription: "page-apps-category-productivity-meta-description",
  },
  [AppCategoryEnum.PRIVACY]: {
    name: "page-apps-category-privacy-name",
    icon: PrivacyIcon,
    slug: slugify(AppCategoryEnum.PRIVACY),
    description: "page-apps-category-privacy-description",
    metaTitle: "page-apps-category-privacy-meta-title",
    metaDescription: "page-apps-category-privacy-meta-description",
  },
  [AppCategoryEnum.GOVERNANCE_DAO]: {
    name: "page-apps-category-dao-name",
    icon: GovernanceIcon,
    slug: slugify(AppCategoryEnum.GOVERNANCE_DAO),
    description: "page-apps-category-dao-description",
    metaTitle: "page-apps-category-dao-meta-title",
    metaDescription: "page-apps-category-dao-meta-description",
  },
}
