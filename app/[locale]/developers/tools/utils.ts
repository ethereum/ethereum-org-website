import type { TagProps } from "@/components/ui/tag"

import { slugify } from "@/lib/utils/url"

import {
  DEFAULT_DEV_TOOL_CATEGORY_VISUAL,
  DEV_TOOL_CATEGORY_VISUALS,
} from "./constants"
import type { DeveloperTool } from "./types"

/**
 * Gets the tag style for a developer app category based on its slug.
 *
 * @param categorySlug - The slug identifier for the developer app category
 * @returns The tag status style associated with the category, or "tag" as the default fallback
 */
export const getCategoryTagStyle = (categoryId: string): TagProps["status"] =>
  DEV_TOOL_CATEGORY_VISUALS[categoryId]?.tag ||
  DEFAULT_DEV_TOOL_CATEGORY_VISUAL.tag

export const getToolKey = (tool: DeveloperTool): string => slugify(tool.name)
