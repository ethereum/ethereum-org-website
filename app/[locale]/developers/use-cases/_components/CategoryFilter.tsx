"use client"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | "all"
  onSelectCategory: (category: string | "all") => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const t = useTranslations("page-use-cases")

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "transition-colors",
          selectedCategory === "all" &&
            "border-primary bg-primary/10 text-primary"
        )}
        onClick={() => onSelectCategory("all")}
      >
        {t("filter-all")}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={cn(
            "transition-colors",
            selectedCategory === category &&
              "border-primary bg-primary/10 text-primary"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
