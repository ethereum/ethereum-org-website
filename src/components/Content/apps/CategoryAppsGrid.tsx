import { getTranslations } from "next-intl/server"

import type { AppCategory, AppData } from "@/lib/types"
import { AppCategoryEnum } from "@/lib/types"

import AppCard from "@/components/AppCard"
import FilterableCategoryAppsGrid from "@/components/Content/apps/FilterableCategoryAppsGrid"
import { Grid } from "@/components/ui/grid"

import { getDayOfYear } from "@/lib/utils/date"
import { seededShuffle } from "@/lib/utils/random"
import { slugify } from "@/lib/utils/url"

import { getStaticAppsData } from "@/lib/data"

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
  const seed = today.getUTCFullYear() * 1000 + getDayOfYear(today)
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
   * Optional subcategory to narrow the grid (e.g. "identity", "liquid-staking").
   * Matched by slug against the category's subcategory tags. When provided,
   * the grid is pre-filtered to that subcategory and the filter UI is hidden.
   */
  subcategory?: string
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
  subcategory,
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
    const appsData = await getStaticAppsData()
    apps = (appsData?.[categoryEnum] ?? []) as AppData[]
  } catch (error) {
    console.warn(`Failed to fetch ${category} apps:`, error)
  }

  if (!apps || apps.length === 0) return null

  // Filter against raw (untranslated) tags so MDX authors pass English slugs
  if (subcategory) {
    const subcategorySlug = slugify(subcategory)
    apps = apps.filter((app) =>
      app.subCategory.some((tag) => slugify(tag) === subcategorySlug)
    )
    if (apps.length === 0) {
      console.warn(
        `No apps in category "${category}" match subcategory: ${subcategory}`
      )
      return null
    }
  }

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

  if (hideFilter || subcategory) {
    return (
      <Grid className={className}>
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
      </Grid>
    )
  }

  // Project only the fields used by the client component to reduce RSC payload
  const clientApps = sortedApps.map(
    ({ name, description, image, subCategory }) => ({
      name,
      description,
      image,
      subCategory,
    })
  )

  return (
    <div className={className}>
      <FilterableCategoryAppsGrid apps={clientApps} limit={+limit} />
    </div>
  )
}

export default CategoryAppsGrid
