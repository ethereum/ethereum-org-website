"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { StoryCategory } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import {
  getAllCategories,
  getCategoryTranslationKey,
} from "@/lib/utils/stories"

interface StoriesFiltersProps {
  selectedCategory: StoryCategory | null
  resultCount: number
}

const StoriesFilters = ({
  selectedCategory,
  resultCount,
}: StoriesFiltersProps) => {
  const t = useTranslations("page-stories")
  const router = useRouter()
  const searchParams = useSearchParams()
  const categories = getAllCategories()

  const handleCategoryChange = (category: StoryCategory | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "solid" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(null)}
          className={cn(
            "rounded-full",
            selectedCategory === null && "text-primary-foreground bg-primary"
          )}
        >
          {t("page-stories-filter-all")}
        </Button>
        {categories.map((category) => {
          const isSelected = selectedCategory === category
          return (
            <Button
              key={category}
              variant={isSelected ? "solid" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "rounded-full",
                isSelected && "text-primary-foreground bg-primary"
              )}
            >
              {t(getCategoryTranslationKey(category))}
            </Button>
          )
        })}
      </div>
      <p className="text-sm text-body-medium">
        {t("page-stories-showing-results", { count: resultCount })}
      </p>
    </div>
  )
}

export default StoriesFilters
