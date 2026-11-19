import type {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
} from "@/lib/types"

import { fetchRetry } from "@/data-layer/fetchers/fetchRetry"

const TAXONOMY_URL =
  "https://raw.githubusercontent.com/ethereum/builder-resources/main/catalog/taxonomy.json"
const RESOURCES_URL =
  "https://raw.githubusercontent.com/ethereum/builder-resources/main/catalog/resources.json"

const BLAME_QUERY = `query {
  repository(owner: "ethereum", name: "builder-resources") {
    object(expression: "main") {
      ... on Commit {
        blame(path: "catalog/resources.json") {
          ranges { startingLine endingLine commit { committedDate } }
        }
      }
    }
  }
}`

/** 1-based [first, last] line of each top-level array element; skips braces inside strings. */
export function getElementLineSpans(json: string): Array<[number, number]> {
  const spans: Array<[number, number]> = []
  let depth = 0
  let line = 1
  let start = 1
  let inString = false
  let escaped = false
  for (const char of json) {
    if (char === "\n") line++
    if (inString) {
      if (escaped) escaped = false
      else if (char === "\\") escaped = true
      else if (char === '"') inString = false
      continue
    }
    if (char === '"') inString = true
    else if (char === "{" || char === "[") {
      depth++
      if (depth === 2) start = line
    } else if (char === "}" || char === "]") {
      if (depth === 2) spans.push([start, line])
      depth--
    }
  }
  return spans
}

/**
 * When each catalog entry was last edited, from a blame of resources.json.
 * Best effort: without a token or on any failure the dates are just omitted.
 */
async function fetchEntryUpdatedDates(
  json: string
): Promise<(string | undefined)[]> {
  const token = process.env.GITHUB_TOKEN_READ_ONLY
  if (!token) return []
  try {
    const response = await fetchRetry("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: BLAME_QUERY }),
    })
    if (!response.ok) throw new Error(`status ${response.status}`)
    const body = await response.json()
    const ranges: Array<{
      startingLine: number
      endingLine: number
      commit: { committedDate: string }
    }> = body.data?.repository?.object?.blame?.ranges ?? []
    const lineDates: string[] = []
    for (const { startingLine, endingLine, commit } of ranges) {
      for (let l = startingLine; l <= endingLine; l++) {
        lineDates[l] = commit.committedDate
      }
    }
    return getElementLineSpans(json).map(([first, last]) => {
      let newest: string | undefined
      for (let l = first; l <= last; l++) {
        if (lineDates[l] && (!newest || lineDates[l] > newest)) {
          newest = lineDates[l]
        }
      }
      return newest
    })
  } catch (error) {
    console.warn("builder-resources blame failed, skipping updated_at:", error)
    return []
  }
}

export async function fetchBuilderResources(): Promise<{
  resources: BuilderResourcesCatalogResource[]
  taxonomy: BuilderResourcesTaxonomy
}> {
  const [taxonomyResponse, resourcesResponse] = await Promise.all([
    fetch(TAXONOMY_URL),
    fetch(RESOURCES_URL),
  ])

  if (!taxonomyResponse.ok) {
    throw new Error(
      `builder-resources taxonomy fetch failed with status ${taxonomyResponse.status}`
    )
  }

  if (!resourcesResponse.ok) {
    throw new Error(
      `builder-resources resources fetch failed with status ${resourcesResponse.status}`
    )
  }

  const taxonomy = (await taxonomyResponse.json()) as BuilderResourcesTaxonomy
  // The catalog omits `repos` for resources without a repository (MCP
  // servers, hosted CLIs, …). Downstream enrichment iterates `repos`
  // unconditionally, so normalize it to an array at this single entry point.
  const resourcesJson = await resourcesResponse.text()
  const rawResources = JSON.parse(resourcesJson) as Array<
    Omit<BuilderResourcesCatalogResource, "repos"> &
      Partial<Pick<BuilderResourcesCatalogResource, "repos">>
  >
  const updatedDates = await fetchEntryUpdatedDates(resourcesJson)
  // Dates map by position, so a span count that disagrees means a parse mismatch.
  const datesMatch = updatedDates.length === rawResources.length
  const resources: BuilderResourcesCatalogResource[] = rawResources.map(
    (resource, i) => ({
      ...resource,
      repos: resource.repos ?? [],
      ...(datesMatch && updatedDates[i] && { updated_at: updatedDates[i] }),
    })
  )
  return { resources, taxonomy }
}
