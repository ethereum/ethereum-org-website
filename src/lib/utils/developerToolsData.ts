import type { getTranslations } from "next-intl/server"

import type {
  BuilderResourcesCatalogResource,
  BuilderResourcesTaxonomy,
  CatalogItem,
} from "@/lib/types"

import { formatTimeAgo } from "@/lib/utils/date"
import { getToolKey } from "@/lib/utils/getToolKey"
import { getLocalizedDescription } from "@/lib/utils/i18n-descriptions"
import { stripMarkdown } from "@/lib/utils/md"
import { numberFormat } from "@/lib/utils/numbers"
import { isExternal, toCatalogItemLink, toWebHref } from "@/lib/utils/url"

export { getToolKey }

export type DeveloperTool = BuilderResourcesCatalogResource

export type DeveloperToolWithCategory = DeveloperTool & {
  categoryId: string
  /**
   * Plain-text description (markdown stripped) for card/preview display, set by
   * `localizeToolDescriptions`. Detail views render the full markdown
   * `description` instead.
   */
  descriptionStripped?: string
}

export type DeveloperToolsCategory =
  BuilderResourcesTaxonomy["categories"]["definitions"][number]

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

const repoEntries = (tool: DeveloperTool) =>
  tool.repos.map((repo) => (typeof repo === "string" ? { href: repo } : repo))

/** External repos, most-starred first. Shared by the page, the modal and the catalog item. */
export function getRankedRepos(tool: DeveloperTool) {
  return repoEntries(tool)
    .filter((repo) => isExternal(repo.href))
    .sort((a, b) => (b.stargazers ?? -1) - (a.stargazers ?? -1))
}

/** External packages, most-downloaded first. */
export function getRankedPackages(tool: DeveloperTool) {
  return (tool.packages ?? [])
    .map((pkg) => (typeof pkg === "string" ? { href: pkg } : pkg))
    .filter((pkg) => isExternal(pkg.href))
    .sort((a, b) => (b.downloads ?? -1) - (a.downloads ?? -1))
}

/** Highest star count across a tool's repos, or 0 when none report one. */
function getToolStars(tool: DeveloperTool): number {
  let maxStars = 0
  for (const repo of repoEntries(tool)) {
    if (typeof repo.stargazers === "number" && repo.stargazers > maxStars) {
      maxStars = repo.stargazers
    }
  }
  return maxStars
}

/**
 * The only tool fields the catalog island reads: the card copy, the search
 * haystack, the grouping/filter keys, and the sort score's two inputs. The
 * index ships ~285 records, so the fields only server components touch
 * (banner, socials, website, packages, repo hrefs, raw ranking data) stay out
 * of the client payload entirely.
 */
export type ToolCardData = Pick<
  DeveloperToolWithCategory,
  | "name"
  | "description"
  | "descriptionStripped"
  | "thumbnail_url"
  | "tags"
  | "categoryId"
  | "subcategory_id"
  | "resource_score"
> & {
  /**
   * Best star count across the tool's repos, precomputed here so the client
   * sort doesn't need the repo list. Repo hrefs are never read client-side.
   */
  stargazers?: number
}

/**
 * Project a tool down to `ToolCardData`. Everything dropped here — `banner_url`,
 * `twitter`, `website`, `packages`, the raw ranking fields — is read only by
 * server components, so it never needs to cross into the client payload.
 */
export const toToolCard = (tool: DeveloperToolWithCategory): ToolCardData => {
  const stargazers = getToolStars(tool)
  return {
    name: tool.name,
    description: tool.description,
    // Omit the keys rather than serialize an undefined.
    ...(tool.descriptionStripped !== undefined && {
      descriptionStripped: tool.descriptionStripped,
    }),
    ...(tool.thumbnail_url && { thumbnail_url: tool.thumbnail_url }),
    tags: tool.tags,
    categoryId: tool.categoryId,
    subcategory_id: tool.subcategory_id,
    ...(typeof tool.resource_score === "number" && {
      resource_score: tool.resource_score,
    }),
    ...(stargazers > 0 && { stargazers }),
  }
}

/** `ethpm/ethpm-spec` from a GitHub URL, or the bare URL for other hosts. */
export const getRepoLabel = (href: string) =>
  href.replace(/^https:\/\/github\.com\//, "")

/** `ethpm` from an npm URL, or the bare URL for other registries. */
export const getPackageLabel = (href: string) =>
  href.replace(/^https:\/\/(www\.)?npmjs\.com\/package\//, "")

/** Repo hrefs, most-starred first. */
export function getToolRepoHrefs(tool: DeveloperTool): string[] {
  return repoEntries(tool)
    .slice()
    .sort((a, b) => (b.stargazers ?? -1) - (a.stargazers ?? -1))
    .map((repo) => repo.href)
}

/** Package hrefs (e.g. npm) for a tool. */
export function getToolPackageHrefs(tool: DeveloperTool): string[] {
  return (tool.packages ?? []).map((pkg) =>
    typeof pkg === "string" ? pkg : pkg.href
  )
}

/**
 * A tool's canonical external URL: its website if it has one, otherwise its
 * top repo. Many tools are repo-only, so this keeps a valid URL for them.
 * Returns `undefined` when a tool has neither.
 */
export function getToolPrimaryUrl(tool: DeveloperTool): string | undefined {
  return tool.website || getToolRepoHrefs(tool)[0] || undefined
}

/** Map every subcategory id to its parent category id. */
export function buildSubcategoryIndex(
  taxonomy: BuilderResourcesTaxonomy
): Map<string, string> {
  const index = new Map<string, string>()
  for (const category of taxonomy.categories.definitions) {
    for (const subcategory of category.subcategories) {
      index.set(subcategory.id, category.id)
    }
  }
  return index
}

/**
 * Enrich each resource with its parent `categoryId`, dropping resources whose
 * subcategory doesn't resolve to a category.
 */
export function withCategories({
  taxonomy,
  resources,
}: NormalizedDeveloperToolsData): DeveloperToolWithCategory[] {
  const subcategoryToCategory = buildSubcategoryIndex(taxonomy)
  const seenKeys = new Set<string>()
  return resources.flatMap((tool) => {
    const categoryId = subcategoryToCategory.get(tool.subcategory_id)
    if (!categoryId) return []
    // Drop slug collisions: only the first is reachable via findToolBySlug.
    const key = getToolKey(tool)
    if (seenKeys.has(key)) return []
    seenKeys.add(key)
    return [{ ...tool, categoryId }]
  })
}

/** Tally how many tools fall under each category (or subcategory) id. */
export function countTools(
  tools: DeveloperToolWithCategory[],
  key: "categoryId" | "subcategory_id"
): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const tool of tools) {
    counts[tool[key]] = (counts[tool[key]] || 0) + 1
  }
  return counts
}

/**
 * Resolve a tool by its URL slug, or `undefined`. Tool pages are flat
 * (`/developers/tools/[tool]`), so the slug is globally unique — no category
 * needed to disambiguate.
 */
export function findToolBySlug(
  tools: DeveloperToolWithCategory[],
  toolKey: string
): DeveloperToolWithCategory | undefined {
  return tools.find((tool) => getToolKey(tool) === toolKey)
}

/**
 * The tool's subcategory in catalog order (score, then stars, then name): the
 * next tool follows it and the related ones are the top of the rest.
 */
export function getToolNeighbours(
  tools: DeveloperToolWithCategory[],
  tool: DeveloperToolWithCategory,
  limit = 3
) {
  const score = (item: DeveloperTool) =>
    item.resource_score ?? getToolStars(item)
  const siblings = tools
    .filter((item) => item.subcategory_id === tool.subcategory_id)
    .sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name))
  const index = siblings.indexOf(tool)
  const next =
    siblings.length > 1 ? siblings[(index + 1) % siblings.length] : undefined
  const related = siblings
    .filter((item) => item !== tool && item !== next)
    .slice(0, limit)
  return { next, related }
}

export function toolToCatalogItem(
  tool: DeveloperToolWithCategory,
  {
    locale,
    t,
    tCommon,
    tItem,
    labels,
    next,
  }: {
    locale: string
    t: Translator
    tCommon: Translator
    tItem: Translator
    labels: ReturnType<typeof buildToolLabels>
    next?: DeveloperToolWithCategory
  }
): CatalogItem {
  const [topRepo] = getRankedRepos(tool)
  const repoLink = toCatalogItemLink("github", topRepo?.href)
  const website = toWebHref(tool.website)
  const downloads = getRankedPackages(tool).reduce(
    (sum, pkg) => sum + (pkg.downloads ?? 0),
    0
  )
  const compact = numberFormat(locale, { notation: "compact" })
  const lastUpdated = formatTimeAgo(locale, tool.updated_at)
  const subcategory =
    labels.subcategoryLabels[tool.subcategory_id] || tool.subcategory_id

  return {
    kind: "tool",
    slug: getToolKey(tool),
    name: tool.name,
    logo: tool.thumbnail_url || undefined,
    banner: tool.banner_url || undefined,
    screenshots: [],
    tags: [
      { label: labels.categoryLabels[tool.categoryId] || tool.categoryId },
      ...(topRepo?.isArchived
        ? [
            {
              label: t("page-developers-tools-archived"),
              status: "warning" as const,
            },
          ]
        : []),
    ],
    subtitle: subcategory,
    chains: [],
    description: tool.description || undefined,
    primaryLink: website
      ? { href: website, label: tItem("catalog-item-visit-website") }
      : repoLink && {
          href: repoLink.href,
          label:
            repoLink.kind === "github"
              ? tItem("catalog-item-view-on-github")
              : tItem("catalog-item-source-code"),
        },
    socialLinks: [
      toCatalogItemLink("x", tool.twitter),
      website ? repoLink : undefined,
    ].filter((link) => link !== undefined),
    infoRows: [
      { label: t("page-developers-tools-modal-type"), value: subcategory },
      typeof topRepo?.stargazers === "number" && {
        label: t("page-developers-tools-info-stars"),
        value: compact.format(topRepo.stargazers),
      },
      downloads > 0 && {
        label: t("page-developers-tools-info-downloads"),
        value: compact.format(downloads),
      },
      topRepo?.license && {
        label: t("page-developers-tools-info-license"),
        value: topRepo.license,
      },
      lastUpdated && {
        label: t("page-developers-tools-info-last-updated"),
        value: lastUpdated,
        tooltip: t("page-developers-tools-info-last-updated-tooltip"),
      },
    ].filter((row) => !!row),
    breadcrumbs: [
      { label: "ethereum.org", href: "/" },
      { label: tCommon("developers"), href: "/developers/" },
      { label: tCommon("tools"), href: "/developers/tools/" },
    ],
    next: next && {
      name: next.name,
      href: `/developers/tools/${getToolKey(next)}/`,
    },
  }
}

type Translator = Awaited<ReturnType<typeof getTranslations>>

/**
 * Swap each tool's English description for its localized one from the
 * `page-developers-tools-descriptions` namespace (falls back to English when a
 * translation is missing). Keeps rendered content in sync with the hreflang
 * alternates the tool routes already advertise. Also derives the plain-text
 * `descriptionStripped` used by cards — done here, after localization, so card
 * previews match the localized description rather than the English source.
 */
export function localizeToolDescriptions(
  tools: DeveloperToolWithCategory[],
  toolDescriptions: Translator
): DeveloperToolWithCategory[] {
  return tools.map((tool) => {
    const description = getLocalizedDescription(
      toolDescriptions,
      "tool",
      tool.name,
      tool.description
    )
    return {
      ...tool,
      description,
      descriptionStripped: stripMarkdown(description),
    }
  })
}

/**
 * Build the i18n label dictionaries (category / subcategory / tag) keyed by id,
 * derived from the taxonomy. Takes an already-scoped `page-developers-tools`
 * translator so it stays free of any data fetching.
 */
export function buildToolLabels(
  t: Translator,
  taxonomy: BuilderResourcesTaxonomy
) {
  const categories = taxonomy.categories.definitions

  const categoryLabels = Object.fromEntries(
    categories.map((category) => [
      category.id,
      t(`page-developers-tools-category-${category.id}-title`),
    ])
  )

  const subcategoryLabels = Object.fromEntries(
    categories.flatMap((category) =>
      category.subcategories.map((subcategory) => [
        subcategory.id,
        t(`page-developers-tools-subcategory-${subcategory.id}-title`),
      ])
    )
  )

  const tagLabels = Object.fromEntries(
    taxonomy.tags.map((tag) => [tag, t(`page-developers-tools-tag-${tag}`)])
  )

  return { categoryLabels, subcategoryLabels, tagLabels }
}
