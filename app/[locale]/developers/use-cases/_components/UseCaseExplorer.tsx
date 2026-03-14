"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

import type { UseCase } from "@/lib/types/use-cases"

import Input from "@/components/ui/input"

import {
  filterUseCasesByCategory,
  filterUseCasesByQuery,
} from "@/lib/utils/use-cases"

import { CategoryFilter } from "./CategoryFilter"
import { UseCaseCard } from "./UseCaseCard"
import { UseCaseModal } from "./UseCaseModal"

interface UseCaseExplorerProps {
  useCases: UseCase[]
  categories: string[]
}

export function UseCaseExplorer({
  useCases,
  categories,
}: UseCaseExplorerProps) {
  const t = useTranslations("page-use-cases")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  )
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredUseCases = useMemo(() => {
    let result = useCases

    // Filter by category
    result = filterUseCasesByCategory(result, selectedCategory)

    // Filter by search query (client-side for now)
    result = filterUseCasesByQuery(result, searchQuery)

    return result
  }, [useCases, selectedCategory, searchQuery])

  const handleCardClick = (useCase: UseCase) => {
    setSelectedUseCase(useCase)
    setModalOpen(true)
  }

  const handleModalClose = (open: boolean) => {
    setModalOpen(open)
    if (!open) {
      setSelectedUseCase(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body-medium" />
          <Input
            type="text"
            placeholder={t("search-placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-10"
          />
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Results count */}
      <p className="text-body-medium">
        {t("results-count", { count: filteredUseCases.length })}
      </p>

      {/* Use Cases Grid */}
      {filteredUseCases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUseCases.map((useCase) => (
            <UseCaseCard
              key={useCase.id}
              useCase={useCase}
              onClick={() => handleCardClick(useCase)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-body-medium">{t("no-results")}</p>
          <p className="mt-2 text-body-medium">{t("no-results-hint")}</p>
        </div>
      )}

      {/* Modal */}
      <UseCaseModal
        useCase={selectedUseCase}
        open={modalOpen}
        onOpenChange={handleModalClose}
      />
    </div>
  )
}
