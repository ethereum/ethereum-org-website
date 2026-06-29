import type { getTranslations } from "next-intl/server"

import type {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
} from "@/lib/types"

import { slugify } from "@/lib/utils/url"

export type DeveloperTool = BuilderResourcesCatalogResource

export type DeveloperToolWithCategory = DeveloperTool & {
  categoryId: string
}

export type DeveloperToolsCategory =
  BuilderResourcesTaxonomy["categories"]["definitions"][number]

export type NormalizedDeveloperToolsData = {
  taxonomy: BuilderResourcesTaxonomy
  resources: BuilderResourcesCatalogResource[]
}

/**
 * Validates the persisted developer tools payload before it is consumed by the
 * catalog pages.
 *
 * The data is produced server-side by `fetchDeveloperTools`, which validates,
 * ranks, and trims every resource down to the small frontend shape before it is
 * persisted. By the time we read it back it is a trusted `{ taxonomy, resources }`
 * envelope, so we only need a shallow shape guard here rather than a second
 * field-by-field re-parse. Returns `null` on missing or malformed data.
 */
export function normalizeDeveloperToolsData(
  data: unknown
): NormalizedDeveloperToolsData | null {
  if (!data || typeof data !== "object") return null

  const { taxonomy, resources } = data as Partial<NormalizedDeveloperToolsData>

  const hasValidTaxonomy =
    !!taxonomy &&
    typeof taxonomy === "object" &&
    Array.isArray(taxonomy.categories?.definitions)

  if (!hasValidTaxonomy || !Array.isArray(resources)) return null

  return { taxonomy, resources }
}

/** Canonical mapping from a tool to its URL slug (also its React key). */
export const getToolKey = (tool: DeveloperTool): string => slugify(tool.name)

/** Map every subcategory id to its parent category id. */
export function buildSubcategoryIndex(
  taxonomy: BuilderResourcesTaxonomy
): Map<string, string> {
  const index = new Map<string, string>()
  for (const category of taxonomy.categories.definitions) {
    for (const subcategory of category.subcategories) {
      index.set(subcategory.id, category.id)
    }
  }
  return index
}

/**
 * Enrich each resource with its parent `categoryId`, dropping resources whose
 * subcategory doesn't resolve to a category.
 */
export function withCategories({
  taxonomy,
  resources,
}: NormalizedDeveloperToolsData): DeveloperToolWithCategory[] {
  const subcategoryToCategory = buildSubcategoryIndex(taxonomy)
  return resources.flatMap((tool) => {
    const categoryId = subcategoryToCategory.get(tool.subcategory_id)
    if (!categoryId) return []
    return [{ ...tool, categoryId }]
  })
}

/** Tally how many tools fall under each category id. */
export function countToolsByCategory(
  tools: DeveloperToolWithCategory[]
): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const tool of tools) {
    counts[tool.categoryId] = (counts[tool.categoryId] || 0) + 1
  }
  return counts
}

/** Resolve a `(category, toolKey)` pair to a tool, or `undefined`. */
export function findTool(
  tools: DeveloperToolWithCategory[],
  category: string,
  toolKey: string
): DeveloperToolWithCategory | undefined {
  return tools.find(
    (tool) => tool.categoryId === category && getToolKey(tool) === toolKey
  )
}

/** Other tools in the same subcategory, excluding the tool itself. */
export function getRelatedTools(
  tools: DeveloperToolWithCategory[],
  tool: DeveloperToolWithCategory,
  limit = 6
): DeveloperToolWithCategory[] {
  const toolKey = getToolKey(tool)
  return tools
    .filter(
      (item) =>
        item.subcategory_id === tool.subcategory_id &&
        getToolKey(item) !== toolKey
    )
    .slice(0, limit)
}

type Translator = Awaited<ReturnType<typeof getTranslations>>

/**
 * Build the i18n label dictionaries (category / subcategory / tag) keyed by id,
 * derived from the taxonomy. Takes an already-scoped `page-developers-tools`
 * translator so it stays free of any data fetching.
 */
export function buildToolLabels(
  t: Translator,
  taxonomy: BuilderResourcesTaxonomy
) {
  const categories = taxonomy.categories.definitions

  const categoryLabels = Object.fromEntries(
    categories.map((category) => [
      category.id,
      t(`page-developers-tools-category-${category.id}-title`),
    ])
  )

  const subcategoryLabels = Object.fromEntries(
    categories.flatMap((category) =>
      category.subcategories.map((subcategory) => [
        subcategory.id,
        t(`page-developers-tools-subcategory-${subcategory.id}-title`),
      ])
    )
  )

  const tagLabels = Object.fromEntries(
    taxonomy.tags.map((tag) => [tag, t(`page-developers-tools-tag-${tag}`)])
  )

  return { categoryLabels, subcategoryLabels, tagLabels }
}
