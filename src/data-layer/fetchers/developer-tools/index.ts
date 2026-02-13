import { fetchBuidlGuidl } from "./fetchBuidlGuidl"
import { fetchGitHub } from "./fetchGitHub"
import { fetchNpmJs } from "./fetchNpmJs"
import type {
  DeveloperTool,
  DeveloperToolsComputedSelections,
  DeveloperToolsDataEnvelope,
} from "./utils"
import {
  getHighlightsByCategory,
  getMainPageHighlights,
  getRandomPreviewsByCategory,
  transformDeveloperToolsData,
} from "./utils"

// Re-export types for consumers
export type { DeveloperToolsDataEnvelope } from "./utils"

/**
 * Fetches and enriches developer tools data.
 *
 * This orchestrates three data sources:
 * 1. BuidlGuidl Developer-Tooling repository (base data)
 * 2. GitHub GraphQL API (stargazers, last commit dates)
 * 3. npm API (download counts)
 *
 * Also computes randomized selections for highlights and previews,
 * ensuring all users see the same tools until the next daily sync.
 *
 * Returns envelope with toolsById lookup and pre-computed selections.
 */
export async function fetchDeveloperTools(): Promise<DeveloperToolsDataEnvelope> {
  console.log("Starting developer tools data enrichment pipeline")

  // Step 1: Fetch base data from BuidlGuidl
  const rawData = await fetchBuidlGuidl()
  console.log(`Fetched ${rawData.length} developer tools from BuidlGuidl`)

  // Step 2: Enrich with GitHub data (stars, last commit)
  const withGitHub = await fetchGitHub(rawData)
  console.log("Enriched with GitHub data")

  // Step 3: Enrich with npm data (download counts)
  const enrichedData = await fetchNpmJs(withGitHub)
  console.log("Enriched with npm data")

  // Step 4: Build lookup map
  const toolsById: Record<string, DeveloperTool> = Object.fromEntries(
    enrichedData.map((tool) => [tool.id, tool])
  )
  console.log(
    `Built toolsById lookup with ${Object.keys(toolsById).length} tools`
  )

  // Step 5: Compute randomized selections
  const highlightsByCategory = getHighlightsByCategory(enrichedData)
  const mainPageHighlights = getMainPageHighlights(highlightsByCategory)
  const dataByCategory = transformDeveloperToolsData(enrichedData)
  const categoryPreviews = getRandomPreviewsByCategory(dataByCategory)

  const selections: DeveloperToolsComputedSelections = {
    mainPageHighlights: mainPageHighlights.map((tool) => tool.id),
    categoryHighlights: Object.fromEntries(
      Object.entries(highlightsByCategory).map(([cat, tools]) => [
        cat,
        tools.slice(0, 3).map((tool) => tool.id),
      ])
    ) as DeveloperToolsComputedSelections["categoryHighlights"],
    categoryPreviews: Object.fromEntries(
      Object.entries(categoryPreviews).map(([cat, tools]) => [
        cat,
        tools.map((tool) => tool.id),
      ])
    ) as DeveloperToolsComputedSelections["categoryPreviews"],
    computedAt: new Date().toISOString(),
  }
  console.log(
    `Computed selections: ${selections.mainPageHighlights.length} main highlights, ` +
      `${Object.keys(selections.categoryHighlights).length} categories with highlights`
  )

  console.log("Developer tools data enrichment complete")
  return { toolsById: toolsById, selections }
}
