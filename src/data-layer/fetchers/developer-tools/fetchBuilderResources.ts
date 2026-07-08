import type {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
} from "@/lib/types"

const TAXONOMY_URL =
  "https://raw.githubusercontent.com/ethereum/builder-resources/main/catalog/taxonomy.json"
const RESOURCES_URL =
  "https://raw.githubusercontent.com/ethereum/builder-resources/main/catalog/resources.json"

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
  const rawResources = (await resourcesResponse.json()) as Array<
    Omit<BuilderResourcesCatalogResource, "repos"> &
      Partial<Pick<BuilderResourcesCatalogResource, "repos">>
  >
  const resources: BuilderResourcesCatalogResource[] = rawResources.map(
    (resource) => ({ ...resource, repos: resource.repos ?? [] })
  )
  return { resources, taxonomy }
}
