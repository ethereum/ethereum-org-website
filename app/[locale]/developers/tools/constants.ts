import { TagProps } from "@/components/ui/tag"

type CategoryVisual = { tag: TagProps["status"] }

export const DEV_TOOL_CATEGORY_VISUALS: Partial<
  Record<string, CategoryVisual>
> = {
  "network-infrastructure": { tag: "accent-a" },
  "app-integration": { tag: "accent-b" },
  "agent-tooling": { tag: "accent-c" },
  "education-standards": { tag: "primary" },
  "contract-tooling": { tag: "tag-yellow" },
  "security-testing": { tag: "tag-red" },
}

export const DEFAULT_DEV_TOOL_CATEGORY_VISUAL: CategoryVisual = {
  tag: "tag",
}
