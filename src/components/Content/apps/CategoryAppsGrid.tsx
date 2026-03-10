import { getTranslations } from "next-intl/server"

import type { AppCategory, AppData } from "@/lib/types"
import { AppCategoryEnum } from "@/lib/types"

import AppCard from "@/components/AppCard"
import FilterableCategoryAppsGrid from "@/components/Content/apps/FilterableCategoryAppsGrid"

import { cn } from "@/lib/utils/cn"
import { getDayOfYear } from "@/lib/utils/date"
import { seededShuffle } from "@/lib/utils/random"
import { slugify } from "@/lib/utils/url"

import { getAppsData } from "@/lib/data"

function getCategoryEnum(category: string): AppCategoryEnum | undefined {
  const slug = category.toLowerCase()
  return Object.values(AppCategoryEnum).find((val) => slugify(val) === slug)
}

/**
 * Sort apps for daily-rotating display.
 * Highlighted apps surface first; both groups are shuffled with a seed
 * derived from the current date, so the order is stable for all users
 * on a given day but rotates each day.
 */
function getDailySortedApps(apps: AppData[]): AppData[] {
  const today = new Date()
  const seed = today.getFullYear() * 1000 + getDayOfYear(today)
  const highlighted = apps.filter((app) => app.highlight)
  const rest = apps.filter((app) => !app.highlight)
  return [...seededShuffle(highlighted, seed), ...seededShuffle(rest, seed)]
}

/**
 * Props for the CategoryAppsGrid component.
 */
interface CategoryAppsGridProps {
  /** The app category slug (e.g. "defi", "gaming"). Derived from AppCategoryEnum values. */
  category: Lowercase<AppCategory>
  /**
   * Maximum number of apps to display. Defaults to 9.
   * Pass `Infinity` (or `"Infinity"`) to show all apps without a limit.
   * Accepts a number or a numeric string (e.g. from MDX props).
   */
  limit?: number | string
  /** When true, renders a static grid without the subcategory filter UI. */
  hideFilter?: boolean
  className?: string
}

const CategoryAppsGrid = async ({
  category,
  limit = 9,
  hideFilter,
  className,
}: CategoryAppsGridProps) => {
  const categoryEnum = getCategoryEnum(category)

  if (!categoryEnum) {
    console.warn(`Unknown app category: ${category}`)
    return null
  }

  let apps: AppData[] = []
  try {
    const appsData = await getAppsData()
    apps = (appsData?.[categoryEnum] ?? []) as AppData[]
  } catch (error) {
    console.warn(`Failed to fetch ${category} apps:`, error)
  }

  if (!apps || apps.length === 0) return null

  // Translate subcategory tags, falling back to the raw string
  let translatedApps = apps
  try {
    const t = await getTranslations("app-subcategories")
    translatedApps = apps.map((app) => ({
      ...app,
      subCategory: app.subCategory.map((tag) => {
        const key = `subcategory-${slugify(tag)}`
        return t.has(key) ? t(key) : tag
      }),
    })) as AppData[]
  } catch {
    // Translation lookup failed; render raw tags
  }

  const sortedApps = getDailySortedApps(translatedApps)

  if (hideFilter) {
    return (
      <div className={cn("grid grid-cols-fill-4 gap-6 md:gap-12", className)}>
        {sortedApps.slice(0, +limit).map((app) => (
          <AppCard
            key={app.name}
            name={app.name}
            description={app.description}
            thumbnail={app.image}
            tags={app.subCategory}
            href={`/apps/${slugify(app.name)}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      <FilterableCategoryAppsGrid apps={sortedApps} limit={+limit} />
    </div>
  )
}

export default CategoryAppsGrid
