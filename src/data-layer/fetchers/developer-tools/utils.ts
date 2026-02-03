import { getDayOfYear, getWeekNumber } from "@/lib/utils/date"

// Import the base DeveloperTool type from tool code (type-only import)
// This is acceptable as it's a shared data contract, not a presentation dependency
import type { DeveloperTool } from "../../../../app/[locale]/developers/tools/types"

// Re-export for convenience
export type { DeveloperTool }

// =============================================================================
// Types
// =============================================================================

/**
 * Category slug type derived from the category mapping.
 * These are URL-friendly identifiers for developer tool categories.
 */
export type DeveloperToolCategorySlug =
  | "interoperability"
  | "transactions"
  | "analytics"
  | "education"
  | "sdks"
  | "contracts"
  | "security"

/**
 * Tools grouped by category slug.
 */
export type DeveloperToolsByCategory = Record<
  DeveloperToolCategorySlug,
  DeveloperTool[]
>

/**
 * Pre-computed randomized selections for developer tools.
 * Computed daily in the trigger.dev task to ensure all users see the same selections.
 */
export interface DeveloperToolsComputedSelections {
  /** Main page highlights - top tool from 3 random categories (3 IDs) */
  mainPageHighlights: string[]
  /** Category page highlights - top 3 tools per category (7 categories × 3 = 21 IDs) */
  categoryHighlights: Record<DeveloperToolCategorySlug, string[]>
  /** Category preview tools - 5 random tools per category for main page cards (7 × 5 = 35 IDs) */
  categoryPreviews: Record<DeveloperToolCategorySlug, string[]>
  /** ISO date when selections were computed (for debugging) */
  computedAt: string
}

/**
 * Envelope type for developer tools data.
 * Contains both the tool data and pre-computed selections.
 */
export interface DeveloperToolsDataEnvelope {
  /** All tools indexed by ID for quick lookup (used by tool modal) */
  toolsById: Record<string, DeveloperTool>
  /** Pre-computed randomized selections (refreshed daily) */
  selections: DeveloperToolsComputedSelections
}

// =============================================================================
// Constants
// =============================================================================

/**
 * Maps human-readable category names to URL-friendly slugs.
 * This is the data-layer copy of the constant - no UI dependencies.
 */
export const DEV_TOOL_CATEGORY_SLUGS: Record<
  string,
  DeveloperToolCategorySlug
> = {
  "Cross-Chain & Interoperability": "interoperability",
  "Transaction & Wallet Infrastructure": "transactions",
  "Data, Analytics & Tracing": "analytics",
  "Education & Community Resources": "education",
  "Client Libraries & SDKs (Front-End)": "sdks",
  "Smart Contract Development & Toolchains": "contracts",
  "Security, Testing & Formal Verification": "security",
}

/**
 * List of all category slugs for iteration.
 */
export const DEV_TOOL_CATEGORY_SLUG_LIST: DeveloperToolCategorySlug[] = [
  "interoperability",
  "transactions",
  "analytics",
  "education",
  "sdks",
  "contracts",
  "security",
]

// Number of top tools to show in highlights section
const HIGHLIGHTS_PER_CATEGORY = 9
// Number of preview tools to show in category cards
const PREVIEWS_PER_CATEGORY = 5

// =============================================================================
// Seeded Randomization Utilities
// =============================================================================

/**
 * Seeded random number generator for deterministic randomization.
 * Uses Linear Congruential Generator algorithm.
 *
 * Why not Math.random() or timestamp?
 * - Math.random(): Non-deterministic, every user sees different highlights
 * - Timestamp: Different on every page load, causes jarring UX
 * - Seeded: Same seed = same "random" sequence = consistent highlights for all users
 */
function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

/**
 * Shuffle array using Fisher-Yates algorithm with seeded randomization.
 * Ensures deterministic shuffle: same seed always produces same order.
 */
function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  const random = seededRandom(seed)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

/**
 * Get maximum star count across all repos for an tool.
 */
function getMaxStarCount(tool: DeveloperTool): number {
  return Math.max(...tool.repos.map((repo) => repo.stargazers || 0), 0)
}

/**
 * Generate seed offset based on category name for variety across categories.
 */
function getCategorySeedOffset(category: string): number {
  return category.length
}

// =============================================================================
// Data Transformation Functions
// =============================================================================

/**
 * Transform flat array of tools into an object grouped by category slug.
 */
export function transformDeveloperToolsData(
  data: DeveloperTool[]
): DeveloperToolsByCategory {
  const initialAcc = DEV_TOOL_CATEGORY_SLUG_LIST.reduce((acc, slug) => {
    acc[slug] = []
    return acc
  }, {} as DeveloperToolsByCategory)

  return data.reduce((acc, tool) => {
    const slug = DEV_TOOL_CATEGORY_SLUGS[tool.category]
    if (slug) {
      acc[slug].push(tool)
    }
    return acc
  }, initialAcc)
}

/**
 * Get highlighted tools grouped by category.
 *
 * Algorithm:
 * 1. Filter to tools with GitHub repos updated in last 6 months + have banner/thumbnail images
 * 2. Group by category slug
 * 3. Sort each category by highest GitHub star count
 * 4. Take top 9 tools per category
 * 5. Shuffle each category's top 9 using weekly seed for deterministic rotation
 *
 * @returns Object mapping category slugs to arrays of up to 9 highlighted tools
 */
export function getHighlightsByCategory(
  tools: DeveloperTool[],
  now: Date = new Date()
): Record<DeveloperToolCategorySlug, DeveloperTool[]> {
  const sixMonthsAgo = new Date(now)
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  // Filter tools with GitHub repos updated in last 6 months and have required images
  const recentTools = tools.filter((tool) => {
    // Must have both banner and thumbnail images for highlights section
    if (!tool.banner_url || !tool.thumbnail_url) return false

    const hasGitHubRepo = tool.repos.some((repo) =>
      repo.href.includes("github.com")
    )
    if (!hasGitHubRepo) return false

    const latestUpdate = tool.repos.reduce((latest, repo) => {
      if (!repo.lastUpdated) return latest
      const date = new Date(repo.lastUpdated)
      return date > latest ? date : latest
    }, new Date(0))

    return latestUpdate > sixMonthsAgo
  })

  // Group by category slug
  const byCategory: Record<string, DeveloperTool[]> = {}
  for (const tool of recentTools) {
    const categorySlug = DEV_TOOL_CATEGORY_SLUGS[tool.category]
    if (!categorySlug) continue
    if (!byCategory[categorySlug]) {
      byCategory[categorySlug] = []
    }
    byCategory[categorySlug].push(tool)
  }

  // Get weekly seed for deterministic randomization
  const weekSeed = getWeekNumber(now)

  // Sort by stars, take top N, randomize
  const result: Record<string, DeveloperTool[]> = {}
  for (const [category, categoryTools] of Object.entries(byCategory)) {
    // Sort by highest star count
    const sorted = [...categoryTools].sort((a, b) => {
      return getMaxStarCount(b) - getMaxStarCount(a)
    })

    // Take top N and randomize
    const topN = sorted.slice(0, HIGHLIGHTS_PER_CATEGORY)
    const randomized = seededShuffle(
      topN,
      weekSeed + getCategorySeedOffset(category)
    )

    result[category] = randomized
  }

  return result as Record<DeveloperToolCategorySlug, DeveloperTool[]>
}

/**
 * Get highlights for main /developers/tools page.
 * Returns top tool from top 3 randomly-ordered categories.
 *
 * @returns Array of 3 tools (one from each of top 3 categories)
 */
export function getMainPageHighlights(
  highlightsByCategory: Record<DeveloperToolCategorySlug, DeveloperTool[]>,
  now: Date = new Date()
): DeveloperTool[] {
  const weekSeed = getWeekNumber(now)

  // Get categories with highlights
  const categoriesWithHighlights = Object.entries(highlightsByCategory).filter(
    ([, tools]) => tools.length > 0
  )

  // Randomize category order
  const randomizedCategories = seededShuffle(categoriesWithHighlights, weekSeed)

  // Take top tool from top 3 categories
  return randomizedCategories
    .slice(0, 3)
    .map(([, tools]) => tools[0])
    .filter(Boolean)
}

/**
 * Get randomized preview tools per category for main page cards.
 *
 * Simpler than highlights: no filtering, no star sorting - just shuffle and take N.
 * Uses daily seed for rotation instead of weekly.
 *
 * @param dataByCategory - Tools already grouped by category
 * @returns Same structure but with max N randomized tools per category
 */
export function getRandomPreviewsByCategory(
  dataByCategory: DeveloperToolsByCategory,
  now: Date = new Date()
): DeveloperToolsByCategory {
  const daySeed = getDayOfYear(now)

  const result = {} as DeveloperToolsByCategory

  for (const [category, tools] of Object.entries(dataByCategory)) {
    // Shuffle with daily seed + category offset for variety
    const shuffled = seededShuffle(
      tools,
      daySeed + getCategorySeedOffset(category)
    )
    // Take first N after shuffle
    result[category as DeveloperToolCategorySlug] = shuffled.slice(
      0,
      PREVIEWS_PER_CATEGORY
    )
  }

  return result
}
