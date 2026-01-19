import {
  ArrowLeftRight,
  ChartSpline,
  CodeXml,
  GraduationCap,
  LucideIcon,
  Package,
  SendToBack,
  Shield,
} from "lucide-react"

import type { DeveloperAppCategorySlug } from "./types"

export const DEV_APP_CATEGORY_SLUGS = {
  "Cross-Chain & Interoperability": "interoperability",
  "Transaction & Wallet Infrastructure": "transactions",
  "Data, Analytics & Tracing": "analytics",
  "Education & Community Resources": "education",
  "Client Libraries & SDKs (Front-End)": "sdks",
  "Smart Contract Development & Toolchains": "contracts",
  "Security, Testing & Formal Verification": "security",
} as const

export const CATEGORIES: {
  slug: DeveloperAppCategorySlug
  Icon: LucideIcon
}[] = [
  { slug: "interoperability", Icon: SendToBack },
  { slug: "transactions", Icon: ArrowLeftRight },
  { slug: "analytics", Icon: ChartSpline },
  { slug: "education", Icon: GraduationCap },
  { slug: "sdks", Icon: Package },
  { slug: "contracts", Icon: CodeXml },
  { slug: "security", Icon: Shield },
]
