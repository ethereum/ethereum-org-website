import { unstable_cache } from "next/cache"

import { DEV_APP_CATEGORY_SLUGS } from "./constants"
import type {
  DeveloperApp,
  DeveloperAppCategorySlug,
  DeveloperAppsByCategory,
} from "./types"

// Cache duration: 7 days in seconds
const SEVEN_DAYS = 7 * 24 * 60 * 60

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
 * Get ISO week number for a given date
 * Used as seed for deterministic weekly rotation of highlights
 *
 * Why weekly? This ensures all users see the same highlights during a given week,
 * providing consistent UX while still rotating content regularly.
 */
function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
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
  apps: DeveloperApp[]
): Record<DeveloperAppCategorySlug, DeveloperApp[]> {
  const sixMonthsAgo = new Date()
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
  const weekSeed = getWeekNumber(new Date())

  // Sort by stars, take top 9, randomize
  const result: Record<string, DeveloperApp[]> = {}
  for (const [category, categoryApps] of Object.entries(byCategory)) {
    // Sort by highest star count
    const sorted = [...categoryApps].sort((a, b) => {
      const aStars = Math.max(...a.repos.map((repo) => repo.stargazers || 0), 0)
      const bStars = Math.max(...b.repos.map((repo) => repo.stargazers || 0), 0)
      return bStars - aStars
    })

    // Take top 9 and randomize
    const top9 = sorted.slice(0, 9)
    const randomized = seededShuffle(top9, weekSeed + category.length)

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
  highlightsByCategory: Record<DeveloperAppCategorySlug, DeveloperApp[]>
): DeveloperApp[] {
  const weekSeed = getWeekNumber(new Date())

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
 * Get highlights for category page
 * Returns top 3 apps for the specified category
 */
export function getCategoryPageHighlights(
  highlightsByCategory: Record<DeveloperAppCategorySlug, DeveloperApp[]>,
  category: DeveloperAppCategorySlug
): DeveloperApp[] {
  return highlightsByCategory[category]?.slice(0, 3) || []
}

/**
 * Cached version of getHighlightsByCategory
 *
 * Uses Next.js unstable_cache to cache the computation for 7 days.
 * Since the input data (apps array) is already cached via getDeveloperToolsData(),
 * this primarily caches the sorting/filtering/randomization computation.
 *
 * Cache key includes the function name, ensuring cache invalidation when function changes.
 * Tagged for manual cache invalidation if needed via revalidateTag('developer-apps-highlights').
 */
export const getCachedHighlightsByCategory = unstable_cache(
  async (apps: DeveloperApp[]) => getHighlightsByCategory(apps),
  ["highlights-by-category"],
  {
    revalidate: SEVEN_DAYS,
    tags: ["developer-apps-highlights"],
  }
)
