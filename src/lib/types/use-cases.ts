/**
 * Types for the Use Cases Explorer (UseCaseLab API)
 */

export interface UseCase {
  id: string
  title: string
  problemStatement: string
  ideasCount: number
  projectsCount: number
  resourcesCount: number
  category: string
  markdown?: string
}

export interface UseCaseCategoriesResponse {
  [category: string]: Omit<UseCase, "category" | "markdown">[]
}

export interface UseCaseMarkdownItem {
  id: string
  title: string
  markdown: string
}
