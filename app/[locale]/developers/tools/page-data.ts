import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { normalizeDeveloperToolsData } from "@/lib/utils/developerToolsData"

import type { DeveloperToolWithCategory } from "./types"

import { getDeveloperToolsData } from "@/lib/data"

/**
 * Shared server-side data preparation for the developer tools catalog pages
 * (`/developers/tools` and `/developers/tools/[category]`).
 */
export async function getToolsPageData(locale: string) {
  const [data, { contributors }, t] = await Promise.all([
    getDeveloperToolsData(),
    getAppPageContributorInfo("developers/tools", locale as Lang),
    getTranslations({ locale, namespace: "page-developers-tools" }),
  ])

  const normalizedData = normalizeDeveloperToolsData(data)
  if (!normalizedData) throw Error("No developer tools data available")

  const { taxonomy, resources } = normalizedData
  const categories = taxonomy.categories.definitions

  const subcategoryToCategory = new Map<string, string>()
  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      subcategoryToCategory.set(subcategory.id, category.id)
    }
  }

  const allTools: DeveloperToolWithCategory[] = resources.flatMap((tool) => {
    const categoryId = subcategoryToCategory.get(tool.subcategory_id)
    if (!categoryId) return []
    return [{ ...tool, categoryId }]
  })

  const countByCategory: Record<string, number> = {}
  for (const tool of allTools) {
    countByCategory[tool.categoryId] =
      (countByCategory[tool.categoryId] || 0) + 1
  }

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

  return {
    categories,
    allTools,
    countByCategory,
    categoryLabels,
    subcategoryLabels,
    tagLabels,
    contributors,
  }
}

export type ToolsPageData = Awaited<ReturnType<typeof getToolsPageData>>
