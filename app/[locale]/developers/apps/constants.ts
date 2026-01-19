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

export const DEV_APP_CATEGORY_SLUGS: Record<string, DeveloperAppCategorySlug> =
  {
    "Cross-Chain & Interoperability": "interoperability",
    "Transaction & Wallet Infrastructure": "transactions",
    "Data, Analytics & Tracing": "analytics",
    "Education & Community Resources": "education",
    "Client Libraries & SDKs (Front-End)": "sdks",
    "Smart Contract Development & Toolchains": "contracts",
    "Security, Testing & Formal Verification": "security",
  }

export const DEV_APP_CATEGORIES = [
  { slug: "interoperability", Icon: SendToBack },
  { slug: "transactions", Icon: ArrowLeftRight },
  { slug: "analytics", Icon: ChartSpline },
  { slug: "education", Icon: GraduationCap },
  { slug: "sdks", Icon: Package },
  { slug: "contracts", Icon: CodeXml },
  { slug: "security", Icon: Shield },
] as const satisfies {
  slug: string
  Icon: LucideIcon
}[]
