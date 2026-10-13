import type { BuilderResourcesCatalogResource } from "@/lib/types"

import { slugify } from "@/lib/utils/url"

/**
 * Canonical mapping from a tool to its URL slug (also its React key).
 *
 * Lives in its own dependency-free module so client components (`ToolCard`,
 * `ToolsCatalog`) can use it without pulling in `developerToolsData`, which is
 * server-only (it reads content via `fs`).
 */
export const getToolKey = (
  tool: Pick<BuilderResourcesCatalogResource, "name">
): string => slugify(tool.name)
