import {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
} from "@/lib/types"

export type DeveloperTool = BuilderResourcesCatalogResource

export type DeveloperToolWithCategory = DeveloperTool & {
  categoryId: string
}

export type DeveloperToolsCategory =
  BuilderResourcesTaxonomy["categories"]["definitions"][number]
