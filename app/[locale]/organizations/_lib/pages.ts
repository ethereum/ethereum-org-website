import type { StaticImageData } from "next/image"

import defiImg from "@/public/images/organizations/defi-market-square-liquidity-pool.png"
import enterpriseImg from "@/public/images/organizations/financial-district-plaza-with-settlement.png"
import privacyImg from "@/public/images/organizations/frosted-glass-pavilion-private-settlement.png"
import l2StackImg from "@/public/images/organizations/layered-islands-rollup-network.png"
import smallBusinessImg from "@/public/images/organizations/shop-street-corner-digital-payments.png"
import foundersImg from "@/public/images/organizations/startup-warehouse-founders-workspace.png"
import tokenizationImg from "@/public/images/organizations/tokenization-workshop-assets-to-tokens.png"
import publicSectorImg from "@/public/images/organizations/town-hall-plaza-public-services.png"

// Each image is the page's hero image
export const organizationPages = {
  "public-sector": {
    href: "/organizations/public-sector/",
    image: publicSectorImg,
  },
  enterprise: { href: "/organizations/enterprise/", image: enterpriseImg },
  "small-business": {
    href: "/organizations/small-business/",
    image: smallBusinessImg,
  },
  founders: { href: "/organizations/founders/", image: foundersImg },
  tokenization: {
    href: "/organizations/enterprise/tokenization/",
    image: tokenizationImg,
  },
  "onchain-finance": {
    href: "/organizations/enterprise/onchain-finance/",
    image: defiImg,
  },
  "enterprise-l2s": {
    href: "/organizations/enterprise/enterprise-l2s/",
    image: l2StackImg,
  },
  privacy: { href: "/organizations/enterprise/privacy/", image: privacyImg },
} satisfies Record<string, { href: string; image: StaticImageData }>
