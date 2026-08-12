"use client"

import { memo, useMemo } from "react"

import FilterableCatalog from "@/components/FilterableCatalog"
import CatalogNavGroup from "@/components/FilterableCatalog/CatalogNavGroup"
import type {
  CatalogFilterState,
  CatalogNavGroupConfig,
} from "@/components/FilterableCatalog/types"

import type {
  DeveloperToolsCategory,
  DeveloperToolWithCategory,
} from "@/lib/utils/developerToolsData"
import { getToolKey } from "@/lib/utils/getToolKey"
import { numberFormat } from "@/lib/utils/numbers"

import ToolCard from "./ToolCard"

const SUBCATEGORY_FILTER_KEY = "subcategory"

const PATH_SEPARATOR = "\u00A0\u00A0/\u00A0\u00A0"

function formatPathSegment(value: string): string {
  return value.toLocaleUpperCase()
}

type ToolsCatalogProps = {
  locale: string
  tools: DeveloperToolWithCategory[]
  categories: DeveloperToolsCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  countByCategory: Record<string, number>
  totalCount: number
  labels: {
    searchPlaceholder: string
    allCategories: string
    resultsLabel: string
    noResults: string
  }
  currentCategoryId?: string
}

function normalize(value: string): string {
  return value.toLowerCase().trim()
}

function getCategoryLabel(
  categoryId: string,
  categoryLabels: Record<string, string>
): string {
  return categoryLabels[categoryId] || categoryId
}

function getSubcategoryLabel(
  subcategoryId: string,
  subcategoryLabels: Record<string, string>
): string {
  return subcategoryLabels[subcategoryId] || subcategoryId
}

function getToolStars(tool: DeveloperToolWithCategory): number {
  let maxStars = 0
  for (const repo of tool.repos) {
    if (typeof repo === "string") continue
    if (typeof repo.stargazers === "number" && repo.stargazers > maxStars) {
      maxStars = repo.stargazers
    }
  }
  return maxStars
}

function getToolSortScore(tool: DeveloperToolWithCategory): number {
  if (typeof tool.resource_score === "number") {
    return tool.resource_score
  }
  return getToolStars(tool)
}

type ToolsResultsProps = {
  locale: string
  tools: DeveloperToolWithCategory[]
  categories: DeveloperToolsCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
}

const ToolsResults = memo(function ToolsResults({
  locale,
  tools,
  categories,
  categoryLabels,
  subcategoryLabels,
}: ToolsResultsProps) {
  const nf = numberFormat(locale)

  const groupedTools = useMemo(() => {
    const toolsByCategory = new Map<string, DeveloperToolWithCategory[]>()
    for (const tool of tools) {
      const existing = toolsByCategory.get(tool.categoryId)
      if (existing) {
        existing.push(tool)
      } else {
        toolsByCategory.set(tool.categoryId, [tool])
      }
    }

    return categories
      .map((category) => {
        const categoryTools = toolsByCategory.get(category.id) || []
        const toolsBySubcategory = new Map<
          string,
          DeveloperToolWithCategory[]
        >()

        for (const tool of categoryTools) {
          const existing = toolsBySubcategory.get(tool.subcategory_id)
          if (existing) {
            existing.push(tool)
          } else {
            toolsBySubcategory.set(tool.subcategory_id, [tool])
          }
        }

        const subcategoryGroups = category.subcategories
          .map((subcategory) => {
            const subcategoryTools =
              toolsBySubcategory.get(subcategory.id)?.slice() || []
            subcategoryTools.sort((a, b) => {
              const scoreDiff = getToolSortScore(b) - getToolSortScore(a)
              if (scoreDiff !== 0) return scoreDiff
              return a.name.localeCompare(b.name)
            })
            return {
              subcategory,
              tools: subcategoryTools,
            }
          })
          .filter((group) => group.tools.length > 0)

        return {
          category,
          subcategoryGroups,
          count: subcategoryGroups.reduce(
            (total, group) => total + group.tools.length,
            0
          ),
        }
      })
      .filter((group) => group.count > 0)
  }, [categories, tools])

  return (
    <>
      {groupedTools.map(({ category, subcategoryGroups, count }) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-baseline gap-2 border-b pb-2">
            <h2 className="text-h4">
              {getCategoryLabel(category.id, categoryLabels)}
            </h2>
            <span className="text-xs text-body-medium">
              ({nf.format(count)})
            </span>
          </div>

          <div className="space-y-6">
            {subcategoryGroups.map(
              ({ subcategory, tools: subcategoryTools }) => (
                <div key={subcategory.id} className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-normal text-body-medium">
                      {getSubcategoryLabel(subcategory.id, subcategoryLabels)}
                    </h3>
                    <span className="text-xs text-body-medium">
                      ({nf.format(subcategoryTools.length)})
                    </span>
                  </div>
                  <div className="grid grid-cols-auto-3 gap-x-8">
                    {subcategoryTools.map((tool) => (
                      <ToolCard key={getToolKey(tool)} tool={tool} />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </>
  )
})

export default function ToolsCatalog({
  locale,
  tools,
  categories,
  categoryLabels,
  subcategoryLabels,
  countByCategory,
  totalCount,
  labels,
  currentCategoryId,
}: ToolsCatalogProps) {
  const countBySubcategory = useMemo(() => {
    const result: Record<string, number> = {}
    for (const tool of tools) {
      result[tool.subcategory_id] = (result[tool.subcategory_id] || 0) + 1
    }
    return result
  }, [tools])

  const navConfig: CatalogNavGroupConfig = {
    allLabel: labels.allCategories,
    allHref: "/developers/tools/",
    allCount: totalCount,
    items: categories.map((category) => ({
      id: category.id,
      label: getCategoryLabel(category.id, categoryLabels),
      href: `/developers/tools/categories/${category.id}/`,
      count: countByCategory[category.id] || 0,
      isCurrent: currentCategoryId === category.id,
      children: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        label: getSubcategoryLabel(subcategory.id, subcategoryLabels),
        count: countBySubcategory[subcategory.id] || 0,
      })),
    })),
  }

  const filterTool = (
    tool: DeveloperToolWithCategory,
    state: CatalogFilterState,
    query: string
  ) => {
    const subcategoryId = state[SUBCATEGORY_FILTER_KEY]
    if (
      typeof subcategoryId === "string" &&
      tool.subcategory_id !== subcategoryId
    ) {
      return false
    }

    const normalizedQuery = normalize(query)
    if (!normalizedQuery) return true

    const searchableText = [
      tool.name,
      tool.description,
      getCategoryLabel(tool.categoryId, categoryLabels),
      getSubcategoryLabel(tool.subcategory_id, subcategoryLabels),
      ...tool.tags,
    ]
      .join(" ")
      .toLowerCase()
    return searchableText.includes(normalizedQuery)
  }

  const renderResultsHeader = (state: CatalogFilterState) => {
    const raw = state[SUBCATEGORY_FILTER_KEY]
    const selectedSubcategoryId = typeof raw === "string" ? raw : undefined
    if (!currentCategoryId && !selectedSubcategoryId) return null
    return (
      <p className="text-sm text-body-medium">
        {currentCategoryId &&
          formatPathSegment(
            getCategoryLabel(currentCategoryId, categoryLabels)
          )}
        {selectedSubcategoryId &&
          `${PATH_SEPARATOR}${formatPathSegment(
            getSubcategoryLabel(selectedSubcategoryId, subcategoryLabels)
          )}`}
      </p>
    )
  }

  return (
    <FilterableCatalog
      locale={locale}
      items={tools}
      filterFn={filterTool}
      labels={{
        searchPlaceholder: labels.searchPlaceholder,
        resultsLabel: labels.resultsLabel,
        noResults: labels.noResults,
      }}
      mobileFilterSummary={{
        label: currentCategoryId
          ? getCategoryLabel(currentCategoryId, categoryLabels)
          : labels.allCategories,
        count: currentCategoryId
          ? countByCategory[currentCategoryId] || 0
          : totalCount,
      }}
      renderSidebar={({ state, setFilter, variant }) => {
        const raw = state[SUBCATEGORY_FILTER_KEY]
        return (
          <CatalogNavGroup
            locale={locale}
            config={navConfig}
            selectedChildId={typeof raw === "string" ? raw : undefined}
            onSelectChild={(childId) =>
              setFilter(SUBCATEGORY_FILTER_KEY, childId)
            }
            // Collapsed mobile trigger already names the all-resources view
            showAllItem={variant === "desktop" || !!currentCategoryId}
          />
        )
      }}
      renderResultsHeader={renderResultsHeader}
      renderResults={(filteredTools) => (
        <ToolsResults
          locale={locale}
          tools={filteredTools}
          categories={categories}
          categoryLabels={categoryLabels}
          subcategoryLabels={subcategoryLabels}
        />
      )}
    />
  )
}
