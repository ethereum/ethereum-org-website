import type {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
} from "@/lib/types"

export type NormalizedDeveloperToolsData = {
  taxonomy: BuilderResourcesTaxonomy
  resources: BuilderResourcesCatalogResource[]
}

/**
 * Validates the persisted developer tools payload before it is consumed by the
 * catalog pages.
 *
 * The data is produced server-side by `fetchDeveloperTools`, which validates,
 * ranks, and trims every resource down to the small frontend shape before it is
 * persisted. By the time we read it back it is a trusted `{ taxonomy, resources }`
 * envelope, so we only need a shallow shape guard here rather than a second
 * field-by-field re-parse. Returns `null` on missing or malformed data.
 */
export function normalizeDeveloperToolsData(
  data: unknown
): NormalizedDeveloperToolsData | null {
  if (!data || typeof data !== "object") return null

  const { taxonomy, resources } = data as Partial<NormalizedDeveloperToolsData>

  const hasValidTaxonomy =
    !!taxonomy &&
    typeof taxonomy === "object" &&
    Array.isArray(taxonomy.categories?.definitions)

  if (!hasValidTaxonomy || !Array.isArray(resources)) return null

  return { taxonomy, resources }
}
