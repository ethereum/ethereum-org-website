import type { UseCase } from "@/lib/types/use-cases"

/**
 * Filter use cases by category
 */
export function filterUseCasesByCategory(
  useCases: UseCase[],
  category: string | "all"
): UseCase[] {
  if (category === "all") {
    return useCases
  }
  return useCases.filter((uc) => uc.category === category)
}

/**
 * Filter use cases by search query
 */
export function filterUseCasesByQuery(
  useCases: UseCase[],
  query: string
): UseCase[] {
  if (!query.trim()) {
    return useCases
  }

  const lowerQuery = query.toLowerCase()

  return useCases.filter((useCase) => {
    const searchableText = [useCase.title, useCase.problemStatement]
      .join(" ")
      .toLowerCase()

    return searchableText.includes(lowerQuery)
  })
}
