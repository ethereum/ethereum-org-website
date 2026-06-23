"use client"

import { memo, useDeferredValue, useMemo, useRef, useState } from "react"
import { AppWindowMac, ChevronRight } from "lucide-react"

import AppCard from "@/components/AppCard"
import Input from "@/components/ui/input"
import { BaseLink } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

import type {
  DeveloperToolsCategory,
  DeveloperToolWithCategory,
} from "../types"
import { getToolKey } from "../utils"

type ToolsCatalogProps = {
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

function formatPathSegment(value: string): string {
  return value.toLocaleUpperCase()
}

const PATH_SEPARATOR = "\u00A0\u00A0/\u00A0\u00A0"

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

// Memoized so a filter/search re-render only re-renders cards whose tool changed
const ToolCard = memo(function ToolCard({
  tool,
}: {
  tool: DeveloperToolWithCategory
}) {
  const toolKey = getToolKey(tool)
  return (
    // content-visibility lets the browser skip layout/paint of off-screen
    // cards while keeping them in the server HTML for crawlers
    <div className="min-h-[88px] [contain-intrinsic-size:auto_88px] [content-visibility:auto]">
      <AppCard
        name={tool.name}
        nameClassName="text-base"
        description={tool.description}
        descriptionClassName="text-sm [&>p]:text-body-medium"
        descriptionMaxLines={2}
        descriptionExpandable={false}
        thumbnail={tool.thumbnail_url ?? undefined}
        fallbackIcon={
          <AppWindowMac className="size-12 text-body-medium group-hover/appcard:text-primary-hover" />
        }
        href={`?tool=${encodeURIComponent(toolKey)}`}
        layout="horizontal"
        imageSize="thumbnail"
        className="h-fit p-4"
      />
    </div>
  )
})

type CategorySidebarProps = {
  categories: DeveloperToolsCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  countByCategory: Record<string, number>
  countBySubcategory: Record<string, number>
  totalCount: number
  allCategoriesLabel: string
  currentCategoryId?: string
  selectedSubcategoryId?: string
  onSelectSubcategory: (subcategoryId?: string) => void
}

function CategorySidebar({
  categories,
  categoryLabels,
  subcategoryLabels,
  countByCategory,
  countBySubcategory,
  totalCount,
  allCategoriesLabel,
  currentCategoryId,
  selectedSubcategoryId,
  onSelectSubcategory,
}: CategorySidebarProps) {
  return (
    <div className="space-y-1">
      <BaseLink
        href="/developers/tools/"
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-start text-sm no-underline hover:bg-background-highlight",
          !currentCategoryId && "bg-background-highlight text-primary"
        )}
      >
        <span>{allCategoriesLabel}</span>
        <span className="text-xs text-body-medium">{totalCount}</span>
      </BaseLink>

      {categories.map((category) => {
        const isCurrent = currentCategoryId === category.id
        const isCategoryActive = isCurrent && !selectedSubcategoryId

        return (
          <div key={category.id} className="space-y-1">
            <BaseLink
              href={`/developers/tools/${category.id}/`}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-sm no-underline hover:bg-background-highlight",
                isCategoryActive && "bg-background-highlight text-primary"
              )}
              onClick={() => {
                if (isCurrent) onSelectSubcategory(undefined)
              }}
            >
              <ChevronRight
                className={cn(
                  "size-4 text-body-medium transition-transform",
                  isCurrent && "rotate-90"
                )}
              />
              <span className="flex-1">
                {getCategoryLabel(category.id, categoryLabels)}
              </span>
              <span className="text-xs text-body-medium">
                {countByCategory[category.id] || 0}
              </span>
            </BaseLink>
            {isCurrent && (
              <div className="ml-5 space-y-1 border-l pl-2">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-start text-xs hover:bg-background-highlight",
                      selectedSubcategoryId === subcategory.id &&
                        "bg-background-highlight text-primary"
                    )}
                    onClick={() => {
                      onSelectSubcategory(
                        selectedSubcategoryId === subcategory.id
                          ? undefined
                          : subcategory.id
                      )
                    }}
                  >
                    <span>
                      {getSubcategoryLabel(subcategory.id, subcategoryLabels)}
                    </span>
                    <span className="text-[10px] text-body-medium">
                      {countBySubcategory[subcategory.id] || 0}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ToolsCatalog({
  tools,
  categories,
  categoryLabels,
  subcategoryLabels,
  countByCategory,
  totalCount,
  labels,
  currentCategoryId,
}: ToolsCatalogProps) {
  const [search, setSearch] = useState("")
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    string | undefined
  >()
  const resultsTopRef = useRef<HTMLDivElement | null>(null)

  // Defer the heavy filter + grid render so typing and filtering stay responsive
  const deferredSearch = useDeferredValue(search)
  const deferredSubcategoryId = useDeferredValue(selectedSubcategoryId)
  const isStale =
    search !== deferredSearch || selectedSubcategoryId !== deferredSubcategoryId

  const handleSelectSubcategory = (subcategoryId?: string) => {
    setSelectedSubcategoryId(subcategoryId)
    resultsTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const countBySubcategory = useMemo(() => {
    const result: Record<string, number> = {}
    for (const tool of tools) {
      result[tool.subcategory_id] = (result[tool.subcategory_id] || 0) + 1
    }
    return result
  }, [tools])

  const filteredTools = useMemo(() => {
    const query = normalize(deferredSearch)
    return tools.filter((tool) => {
      if (
        deferredSubcategoryId &&
        tool.subcategory_id !== deferredSubcategoryId
      ) {
        return false
      }

      if (!query) return true

      const searchableText = [
        tool.name,
        tool.description,
        getCategoryLabel(tool.categoryId, categoryLabels),
        getSubcategoryLabel(tool.subcategory_id, subcategoryLabels),
        ...tool.tags,
      ]
        .join(" ")
        .toLowerCase()
      return searchableText.includes(query)
    })
  }, [
    categoryLabels,
    deferredSearch,
    deferredSubcategoryId,
    subcategoryLabels,
    tools,
  ])

  const groupedFilteredTools = useMemo(() => {
    const toolsByCategory = new Map<string, DeveloperToolWithCategory[]>()
    for (const tool of filteredTools) {
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
  }, [categories, filteredTools])

  const sidebar = (
    <CategorySidebar
      categories={categories}
      categoryLabels={categoryLabels}
      subcategoryLabels={subcategoryLabels}
      countByCategory={countByCategory}
      countBySubcategory={countBySubcategory}
      totalCount={totalCount}
      allCategoriesLabel={labels.allCategories}
      currentCategoryId={currentCategoryId}
      selectedSubcategoryId={selectedSubcategoryId}
      onSelectSubcategory={handleSelectSubcategory}
    />
  )

  return (
    <Section id="catalog" className="space-y-5">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full"
            />
            <div className="max-h-[calc(100vh-11rem)] overflow-y-auto rounded-xl border p-2">
              {sidebar}
            </div>
          </div>
        </aside>

        <div className="space-y-4 lg:-mt-5">
          <div className="space-y-3 lg:hidden">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full"
            />
            <div className="rounded-xl border p-2">{sidebar}</div>
          </div>
          <div ref={resultsTopRef} className="scroll-mt-24" />
          {(currentCategoryId || selectedSubcategoryId) && (
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
          )}

          <p className="text-sm text-body-medium">
            {labels.resultsLabel}: <strong>{filteredTools.length}</strong> /{" "}
            {tools.length}
          </p>

          <div
            className={cn(
              "space-y-8 transition-opacity",
              isStale && "opacity-60"
            )}
          >
            {groupedFilteredTools.map(
              ({ category, subcategoryGroups, count }) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-baseline gap-2 border-b pb-2">
                    <h2 className="text-xl font-bold">
                      {getCategoryLabel(category.id, categoryLabels)}
                    </h2>
                    <span className="text-xs text-body-medium">({count})</span>
                  </div>

                  <div className="space-y-6">
                    {subcategoryGroups.map(
                      ({ subcategory, tools: subcategoryTools }) => (
                        <div key={subcategory.id} className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <h3 className="text-sm font-semibold text-body-medium">
                              {getSubcategoryLabel(
                                subcategory.id,
                                subcategoryLabels
                              )}
                            </h3>
                            <span className="text-xs text-body-medium">
                              ({subcategoryTools.length})
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
              )
            )}
          </div>
          {filteredTools.length === 0 && (
            <div className="rounded-xl border p-8 text-center text-body-medium">
              No tools found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
