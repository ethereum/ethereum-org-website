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
}

export interface UseCaseCategoriesResponse {
  [category: string]: UseCase[]
}
