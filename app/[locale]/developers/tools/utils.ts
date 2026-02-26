import type { TagProps } from "@/components/ui/tag"

import { DEV_TOOL_CATEGORIES } from "./constants"
import type { DeveloperToolCategorySlug } from "./types"

/**
 * Gets the tag style for a developer app category based on its slug.
 *
 * @param categorySlug - The slug identifier for the developer app category
 * @returns The tag status style associated with the category, or "tag" as the default fallback
 */
export const getCategoryTagStyle = (
  categorySlug: DeveloperToolCategorySlug
): TagProps["status"] =>
  DEV_TOOL_CATEGORIES.find(({ slug }) => slug === categorySlug)?.tag || "tag"
