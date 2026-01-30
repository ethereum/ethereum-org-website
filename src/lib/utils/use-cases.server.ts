import type {
  UseCase,
  UseCaseCategoriesResponse,
  UseCaseMarkdownItem,
} from "@/lib/types/use-cases"

const API_BASE_URL = "https://explorer.usecaselab.org/api"

/**
 * Fetch all categories with their use cases from the API
 * Merges data from /categories and /markdown endpoints
 */
export async function getUseCasesData(): Promise<UseCase[]> {
  try {
    // Fetch both endpoints in parallel
    const [categoriesResponse, markdownResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/categories`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
      fetch(`${API_BASE_URL}/markdown`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
    ])

    if (!categoriesResponse.ok) {
      throw new Error(
        `Failed to fetch categories: ${categoriesResponse.status}`
      )
    }

    const categoriesData: UseCaseCategoriesResponse =
      await categoriesResponse.json()

    // Create a map of markdown content by id
    let markdownMap: Map<string, string> = new Map()
    if (markdownResponse.ok) {
      const markdownData: UseCaseMarkdownItem[] = await markdownResponse.json()
      markdownMap = new Map(
        markdownData.map((item) => [item.id, item.markdown])
      )
    }

    // Flatten categories into a single array with category info and markdown
    const useCases: UseCase[] = []
    for (const [category, domains] of Object.entries(categoriesData)) {
      for (const domain of domains) {
        useCases.push({
          ...domain,
          category,
          markdown: markdownMap.get(domain.id),
        })
      }
    }

    return useCases
  } catch (error) {
    console.error("Error fetching use cases:", error)
    return []
  }
}
