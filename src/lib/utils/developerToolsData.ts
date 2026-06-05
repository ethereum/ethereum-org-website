import type {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
  DeveloperToolsRankingMetadata,
} from "@/lib/types"

import { slugify } from "@/lib/utils/url"

type UnknownData = Record<string, unknown>

export type NormalizedDeveloperToolsData = {
  taxonomy: BuilderResourcesTaxonomy
  resources: BuilderResourcesCatalogResource[]
  ranking?: DeveloperToolsRankingMetadata
  computedAt?: string
}

function asRepoArray(value: unknown): BuilderResourcesCatalogResource["repos"] {
  if (!Array.isArray(value)) return []
  const repos: BuilderResourcesCatalogResource["repos"] = []
  for (const entry of value) {
    if (typeof entry === "string") {
      repos.push(entry)
      continue
    }
    if (
      entry &&
      typeof entry === "object" &&
      "href" in entry &&
      typeof (entry as { href?: unknown }).href === "string"
    ) {
      const parsed = entry as {
        href: string
        stargazers?: unknown
        forks?: unknown
        watchers?: unknown
        subscribers?: unknown
        openIssues?: unknown
        isArchived?: unknown
        isFork?: unknown
        daysSincePush?: unknown
        officialScore?: unknown
        inferredScore?: unknown
        finalScore?: unknown
        scoreSource?: unknown
        lastUpdated?: unknown
      }
      repos.push({
        href: parsed.href,
        stargazers:
          typeof parsed.stargazers === "number" ? parsed.stargazers : undefined,
        forks: typeof parsed.forks === "number" ? parsed.forks : undefined,
        watchers:
          typeof parsed.watchers === "number" ? parsed.watchers : undefined,
        subscribers:
          typeof parsed.subscribers === "number"
            ? parsed.subscribers
            : undefined,
        openIssues:
          typeof parsed.openIssues === "number" ? parsed.openIssues : undefined,
        isArchived:
          typeof parsed.isArchived === "boolean"
            ? parsed.isArchived
            : undefined,
        isFork: typeof parsed.isFork === "boolean" ? parsed.isFork : undefined,
        daysSincePush:
          typeof parsed.daysSincePush === "number"
            ? parsed.daysSincePush
            : undefined,
        officialScore:
          typeof parsed.officialScore === "number"
            ? parsed.officialScore
            : undefined,
        inferredScore:
          typeof parsed.inferredScore === "number"
            ? parsed.inferredScore
            : undefined,
        finalScore:
          typeof parsed.finalScore === "number" ? parsed.finalScore : undefined,
        scoreSource:
          parsed.scoreSource === "official-weight" ||
          parsed.scoreSource === "github-inferred" ||
          parsed.scoreSource === "unscored"
            ? parsed.scoreSource
            : undefined,
        lastUpdated:
          typeof parsed.lastUpdated === "string" || parsed.lastUpdated === null
            ? parsed.lastUpdated
            : undefined,
      })
    }
  }
  return repos
}

function asPackageArray(
  value: unknown
): NonNullable<BuilderResourcesCatalogResource["packages"]> {
  if (!Array.isArray(value)) return []
  const packages: NonNullable<BuilderResourcesCatalogResource["packages"]> = []
  for (const entry of value) {
    if (typeof entry === "string") {
      packages.push(entry)
      continue
    }
    if (
      entry &&
      typeof entry === "object" &&
      "href" in entry &&
      typeof (entry as { href?: unknown }).href === "string"
    ) {
      const parsed = entry as { href: string; downloads?: unknown }
      packages.push({
        href: parsed.href,
        downloads:
          typeof parsed.downloads === "number" ? parsed.downloads : undefined,
      })
    }
  }
  return packages
}

function toResource(entry: UnknownData): BuilderResourcesCatalogResource {
  const subcategoryId =
    (typeof entry.subcategory_id === "string" && entry.subcategory_id) ||
    (typeof entry.subcategoryId === "string" && entry.subcategoryId) ||
    (typeof entry.categoryId === "string" && `${entry.categoryId}-general`) ||
    (typeof entry.category === "string" &&
      `${slugify(entry.category)}-general`) ||
    "uncategorized-general"

  return {
    name: typeof entry.name === "string" ? entry.name : "Unnamed tool",
    description: typeof entry.description === "string" ? entry.description : "",
    thumbnail_url:
      typeof entry.thumbnail_url === "string" || entry.thumbnail_url === null
        ? entry.thumbnail_url
        : null,
    banner_url:
      typeof entry.banner_url === "string" || entry.banner_url === null
        ? entry.banner_url
        : null,
    twitter:
      typeof entry.twitter === "string" || entry.twitter === null
        ? entry.twitter
        : null,
    repos: asRepoArray(entry.repos),
    packages: asPackageArray(entry.packages),
    tags: Array.isArray(entry.tags)
      ? entry.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    website:
      typeof entry.website === "string" || entry.website === null
        ? entry.website
        : null,
    llmstext:
      typeof entry.llmstext === "string" || entry.llmstext === null
        ? entry.llmstext
        : null,
    subcategory_id: subcategoryId,
    resource_raw_score:
      typeof entry.resource_raw_score === "number"
        ? entry.resource_raw_score
        : undefined,
    resource_score:
      typeof entry.resource_score === "number"
        ? entry.resource_score
        : undefined,
    resource_rank:
      typeof entry.resource_rank === "number" ? entry.resource_rank : undefined,
    resource_score_source:
      entry.resource_score_source === "official-weight" ||
      entry.resource_score_source === "github-inferred" ||
      entry.resource_score_source === "unscored"
        ? entry.resource_score_source
        : undefined,
  }
}

function buildFallbackTaxonomy(
  resources: BuilderResourcesCatalogResource[]
): BuilderResourcesTaxonomy {
  const subcategoryMap = new Map<
    string,
    { categoryId: string; categoryName: string }
  >()

  for (const resource of resources) {
    const subcategoryId = resource.subcategory_id
    if (subcategoryMap.has(subcategoryId)) continue
    const categoryId = subcategoryId.endsWith("-general")
      ? subcategoryId.replace(/-general$/, "")
      : "uncategorized"
    const categoryName = categoryId
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
    subcategoryMap.set(subcategoryId, { categoryId, categoryName })
  }

  const categories = new Map<
    string,
    {
      id: string
      name: string
      description: string
      subcategories: { id: string; name: string; description: string }[]
    }
  >()

  for (const [subcategoryId, meta] of subcategoryMap) {
    if (!categories.has(meta.categoryId)) {
      categories.set(meta.categoryId, {
        id: meta.categoryId,
        name: meta.categoryName,
        description: "",
        subcategories: [],
      })
    }
    categories.get(meta.categoryId)!.subcategories.push({
      id: subcategoryId,
      name: subcategoryId
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      description: "",
    })
  }

  const tags = Array.from(
    new Set(resources.flatMap((resource) => resource.tags))
  )

  return {
    categories: {
      definitions: Array.from(categories.values()),
    },
    tags,
  }
}

export function normalizeDeveloperToolsData(
  data: unknown
): NormalizedDeveloperToolsData | null {
  if (!data || typeof data !== "object") return null
  const maybe = data as UnknownData

  if (
    maybe.taxonomy &&
    typeof maybe.taxonomy === "object" &&
    Array.isArray(
      (maybe.taxonomy as BuilderResourcesTaxonomy).categories?.definitions
    ) &&
    Array.isArray(maybe.resources)
  ) {
    return {
      taxonomy: maybe.taxonomy as BuilderResourcesTaxonomy,
      resources: (maybe.resources as unknown[]).map((entry) =>
        toResource((entry || {}) as UnknownData)
      ),
      ranking:
        maybe.ranking && typeof maybe.ranking === "object"
          ? (maybe.ranking as DeveloperToolsRankingMetadata)
          : undefined,
      computedAt:
        typeof maybe.computedAt === "string" ? maybe.computedAt : undefined,
    }
  }

  if (maybe.toolsById && typeof maybe.toolsById === "object") {
    const resources = Object.values(
      maybe.toolsById as Record<string, unknown>
    ).map((entry) => toResource((entry || {}) as UnknownData))
    return {
      taxonomy: buildFallbackTaxonomy(resources),
      resources,
      ranking: undefined,
      computedAt:
        typeof maybe.computedAt === "string" ? maybe.computedAt : undefined,
    }
  }

  return null
}
