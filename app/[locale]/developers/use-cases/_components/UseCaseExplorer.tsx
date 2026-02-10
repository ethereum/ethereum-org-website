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

  // Compute category counts for the filter tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: useCases.length }
    for (const uc of useCases) {
      counts[uc.category] = (counts[uc.category] || 0) + 1
    }
    return counts
  }, [useCases])

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
    <div>
      {/* Filter and Search — same row */}
      <div className="flex items-center gap-4 py-10">
        <div className="min-w-0 flex-1">
          <CategoryFilter
            categories={categories}
            categoryCounts={categoryCounts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="relative w-56 shrink-0">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body-medium" />
          <Input
            type="text"
            placeholder={t("search-placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[42px] w-full rounded-2xl border bg-background ps-9 text-sm shadow"
          />
        </div>
      </div>

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
