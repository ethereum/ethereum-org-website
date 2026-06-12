import type {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
} from "@/lib/types"

export interface DeveloperToolsDataEnvelope {
  taxonomy: BuilderResourcesTaxonomy
  resources: BuilderResourcesCatalogResource[]
}
