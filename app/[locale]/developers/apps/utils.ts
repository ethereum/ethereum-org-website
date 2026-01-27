import type { TagProps } from "@/components/ui/tag"

import { getDayOfYear, getWeekNumber } from "@/lib/utils/date"

import { DEV_APP_CATEGORIES, DEV_APP_CATEGORY_SLUGS } from "./constants"
import type {
  DeveloperApp,
  DeveloperAppCategorySlug,
  DeveloperAppsByCategory,
} from "./types"

// Number of top apps to show in highlights section
const HIGHLIGHTS_PER_CATEGORY = 9
// Number of preview apps to show in category cards
const PREVIEWS_PER_CATEGORY = 5

/**
 * Transform flat array of apps into an object grouped by category slug
 */
export const transformDeveloperAppsData = (
  data: DeveloperApp[]
): DeveloperAppsByCategory => {
  const initialAcc = Object.values(DEV_APP_CATEGORY_SLUGS).reduce(
    (acc, slug) => {
      acc[slug] = []
      return acc
    },
    {} as DeveloperAppsByCategory
  )

  return data.reduce((acc, app) => {
    const slug = DEV_APP_CATEGORY_SLUGS[app.category]
    acc[slug].push(app)
    return acc
  }, initialAcc)
}

/**
 * Seeded random number generator for deterministic randomization
 * Uses Linear Congruential Generator algorithm
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
 * Shuffle array using Fisher-Yates algorithm with seeded randomization
 * Ensures deterministic shuffle: same seed always produces same order
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
 * Get maximum star count across all repos for an app
 */
function getMaxStarCount(app: DeveloperApp): number {
  return Math.max(...app.repos.map((repo) => repo.stargazers || 0), 0)
}

/**
 * Generate seed offset based on category name for variety across categories
 */
function getCategorySeedOffset(category: string): number {
  return category.length
}

/**
 * Get highlighted apps grouped by category
 *
 * Algorithm:
 * 1. Filter to apps with GitHub repos updated in last 6 months + have banner/thumbnail images
 * 2. Group by category slug
 * 3. Sort each category by highest GitHub star count
 * 4. Take top 9 apps per category
 * 5. Shuffle each category's top 9 using weekly seed for deterministic rotation
 *
 * @returns Object mapping category slugs to arrays of up to 9 highlighted apps
 */
export function getHighlightsByCategory(
  apps: DeveloperApp[],
  now: Date = new Date()
): Record<DeveloperAppCategorySlug, DeveloperApp[]> {
  const sixMonthsAgo = new Date(now)
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  // Filter apps with GitHub repos updated in last 6 months and have required images
  const recentApps = apps.filter((app) => {
    // Must have both banner and thumbnail images for highlights section
    if (!app.banner_url || !app.thumbnail_url) return false

    const hasGitHubRepo = app.repos.some((repo) =>
      repo.href.includes("github.com")
    )
    if (!hasGitHubRepo) return false

    const latestUpdate = app.repos.reduce((latest, repo) => {
      if (!repo.lastUpdated) return latest
      const date = new Date(repo.lastUpdated)
      return date > latest ? date : latest
    }, new Date(0))

    return latestUpdate > sixMonthsAgo
  })

  // Group by category slug
  const byCategory: Record<string, DeveloperApp[]> = {}
  for (const app of recentApps) {
    const categorySlug = DEV_APP_CATEGORY_SLUGS[app.category]
    if (!categorySlug) continue
    if (!byCategory[categorySlug]) {
      byCategory[categorySlug] = []
    }
    byCategory[categorySlug].push(app)
  }

  // Get weekly seed for deterministic randomization
  const weekSeed = getWeekNumber(now)

  // Sort by stars, take top N, randomize
  const result: Record<string, DeveloperApp[]> = {}
  for (const [category, categoryApps] of Object.entries(byCategory)) {
    // Sort by highest star count
    const sorted = [...categoryApps].sort((a, b) => {
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

  return result as Record<DeveloperAppCategorySlug, DeveloperApp[]>
}

/**
 * Get highlights for main /developers/apps page
 * Returns top app from top 3 randomly-ordered categories
 *
 * @returns Array of 3 apps (one from each of top 3 categories)
 */
export function getMainPageHighlights(
  highlightsByCategory: Record<DeveloperAppCategorySlug, DeveloperApp[]>,
  now: Date = new Date()
): DeveloperApp[] {
  const weekSeed = getWeekNumber(now)

  // Get categories with highlights
  const categoriesWithHighlights = Object.entries(highlightsByCategory).filter(
    ([, apps]) => apps.length > 0
  )

  // Randomize category order
  const randomizedCategories = seededShuffle(categoriesWithHighlights, weekSeed)

  // Take top app from top 3 categories
  return randomizedCategories
    .slice(0, 3)
    .map(([, apps]) => apps[0])
    .filter(Boolean)
}


/**
 * Get randomized preview apps per category for main page cards
 *
 * Simpler than highlights: no filtering, no star sorting - just shuffle and take N.
 * Uses daily seed for rotation instead of weekly.
 *
 * @param dataByCategory - Apps already grouped by category
 * @returns Same structure but with max N randomized apps per category
 */
export function getRandomPreviewsByCategory(
  dataByCategory: DeveloperAppsByCategory,
  now: Date = new Date()
): DeveloperAppsByCategory {
  const daySeed = getDayOfYear(now)

  const result = {} as DeveloperAppsByCategory

  for (const [category, apps] of Object.entries(dataByCategory)) {
    // Shuffle with daily seed + category offset for variety
    const shuffled = seededShuffle(
      apps,
      daySeed + getCategorySeedOffset(category)
    )
    // Take first N after shuffle
    result[category as DeveloperAppCategorySlug] = shuffled.slice(
      0,
      PREVIEWS_PER_CATEGORY
    )
  }

  return result
}

/**
 * Gets the tag style for a developer app category based on its slug.
 *
 * @param categorySlug - The slug identifier for the developer app category
 * @returns The tag status style associated with the category, or "tag" as the default fallback
 */
export const getCategoryTagStyle = (
  categorySlug: DeveloperAppCategorySlug
): TagProps["status"] =>
  DEV_APP_CATEGORIES.find(({ slug }) => slug === categorySlug)?.tag || "tag"
