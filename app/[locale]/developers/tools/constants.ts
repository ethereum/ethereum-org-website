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
import {
  DEV_TOOL_CATEGORY_SLUG_LIST,
  DEV_TOOL_CATEGORY_SLUGS,
  type DeveloperToolCategorySlug,
} from "@/data/developerTools"

const DEV_TOOL_CATEGORY_VISUALS: Record<
  DeveloperToolCategorySlug,
  { Icon: LucideIcon; tag: TagProps["status"] }
> = {
  interoperability: { Icon: SendToBack, tag: "accent-a" },
  transactions: { Icon: ArrowLeftRight, tag: "accent-b" },
  analytics: { Icon: ChartSpline, tag: "accent-c" },
  education: { Icon: GraduationCap, tag: "primary" },
  sdks: { Icon: Package, tag: "tag-green" },
  contracts: { Icon: CodeXml, tag: "tag-yellow" },
  security: { Icon: Shield, tag: "tag-red" },
}

export { DEV_TOOL_CATEGORY_SLUGS }

export const DEV_TOOL_CATEGORIES: {
  slug: DeveloperToolCategorySlug
  Icon: LucideIcon
  tag: TagProps["status"]
}[] = DEV_TOOL_CATEGORY_SLUG_LIST.map((slug) => ({
  slug,
  ...DEV_TOOL_CATEGORY_VISUALS[slug],
}))

export const VALID_CATEGORY_SLUGS = new Set(DEV_TOOL_CATEGORY_SLUG_LIST)
