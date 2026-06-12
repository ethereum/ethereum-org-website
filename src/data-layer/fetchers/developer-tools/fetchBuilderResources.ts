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
  const resources =
    (await resourcesResponse.json()) as BuilderResourcesCatalogResource[]
  return { resources, taxonomy }
}
