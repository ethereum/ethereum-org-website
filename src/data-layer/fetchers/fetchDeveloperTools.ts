import type { DeveloperApp } from "../../../app/[locale]/developers/apps/types"

import { fetchDeveloperToolsBuidlGuidl } from "./fetchDeveloperToolsBuidlGuidl"
import { fetchDeveloperToolsGitHub } from "./fetchDeveloperToolsGitHub"
import { fetchDeveloperToolsNpmJs } from "./fetchDeveloperToolsNpmJs"

/**
 * Fetches and enriches developer tools data.
 *
 * This orchestrates three data sources:
 * 1. BuidlGuidl Developer-Tooling repository (base data)
 * 2. GitHub GraphQL API (stargazers, last commit dates)
 * 3. npm API (download counts)
 *
 * Returns fully enriched DeveloperApp[] ready for consumption.
 */
export async function fetchDeveloperTools(): Promise<DeveloperApp[]> {
  console.log("Starting developer tools data enrichment pipeline")

  // Step 1: Fetch base data from BuidlGuidl
  const rawData = await fetchDeveloperToolsBuidlGuidl()
  console.log(`Fetched ${rawData.length} developer tools from BuidlGuidl`)

  // Step 2: Enrich with GitHub data (stars, last commit)
  const withGitHub = await fetchDeveloperToolsGitHub(rawData)
  console.log("Enriched with GitHub data")

  // Step 3: Enrich with npm data (download counts)
  const enrichedData = await fetchDeveloperToolsNpmJs(withGitHub)
  console.log("Enriched with npm data")

  console.log("Developer tools data enrichment complete")
  return enrichedData
}
