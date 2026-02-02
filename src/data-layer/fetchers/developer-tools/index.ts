import { fetchBuidlGuidl } from "./fetchBuidlGuidl"
import { fetchGitHub } from "./fetchGitHub"
import { fetchNpmJs } from "./fetchNpmJs"
import type {
  DeveloperApp,
  DeveloperAppsComputedSelections,
  DeveloperToolsDataEnvelope,
} from "./utils"
import {
  getHighlightsByCategory,
  getMainPageHighlights,
  getRandomPreviewsByCategory,
  transformDeveloperAppsData,
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
 * ensuring all users see the same apps until the next daily sync.
 *
 * Returns envelope with appsById lookup and pre-computed selections.
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
  const appsById: Record<string, DeveloperApp> = Object.fromEntries(
    enrichedData.map((app) => [app.id, app])
  )
  console.log(`Built appsById lookup with ${Object.keys(appsById).length} apps`)

  // Step 5: Compute randomized selections
  const highlightsByCategory = getHighlightsByCategory(enrichedData)
  const mainPageHighlights = getMainPageHighlights(highlightsByCategory)
  const dataByCategory = transformDeveloperAppsData(enrichedData)
  const categoryPreviews = getRandomPreviewsByCategory(dataByCategory)

  const selections: DeveloperAppsComputedSelections = {
    mainPageHighlights: mainPageHighlights.map((app) => app.id),
    categoryHighlights: Object.fromEntries(
      Object.entries(highlightsByCategory).map(([cat, apps]) => [
        cat,
        apps.slice(0, 3).map((app) => app.id),
      ])
    ) as DeveloperAppsComputedSelections["categoryHighlights"],
    categoryPreviews: Object.fromEntries(
      Object.entries(categoryPreviews).map(([cat, apps]) => [
        cat,
        apps.map((app) => app.id),
      ])
    ) as DeveloperAppsComputedSelections["categoryPreviews"],
    computedAt: new Date().toISOString(),
  }
  console.log(
    `Computed selections: ${selections.mainPageHighlights.length} main highlights, ` +
      `${Object.keys(selections.categoryHighlights).length} categories with highlights`
  )

  console.log("Developer tools data enrichment complete")
  return { appsById, selections }
}
