import type { UseCase, UseCaseCategoriesResponse } from "@/lib/types/use-cases"

const API_BASE_URL = "https://explorer.usecaselab.org/api"

/**
 * Fetch all categories with their use cases from the API
 */
export async function getUseCasesData(): Promise<UseCase[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }

    const data: UseCaseCategoriesResponse = await response.json()

    // Flatten categories into a single array with category info
    const useCases: UseCase[] = []
    for (const [category, domains] of Object.entries(data)) {
      for (const domain of domains) {
        useCases.push({
          ...domain,
          category,
        })
      }
    }

    return useCases
  } catch (error) {
    console.error("Error fetching use cases:", error)
    return []
  }
}
