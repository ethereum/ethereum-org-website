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

import { TagProps } from "@/components/ui/tag"

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
  { slug: "interoperability", Icon: SendToBack, tag: "accent-a" },
  { slug: "transactions", Icon: ArrowLeftRight, tag: "accent-b" },
  { slug: "analytics", Icon: ChartSpline, tag: "accent-c" },
  { slug: "education", Icon: GraduationCap, tag: "primary" },
  { slug: "sdks", Icon: Package, tag: "tag-green" },
  { slug: "contracts", Icon: CodeXml, tag: "tag-yellow" },
  { slug: "security", Icon: Shield, tag: "tag-red" },
] as const satisfies {
  slug: string
  Icon: LucideIcon
  tag: TagProps["status"]
}[]
