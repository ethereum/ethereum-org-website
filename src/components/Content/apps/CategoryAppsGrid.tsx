import { getTranslations } from "next-intl/server"

import type { AppData } from "@/lib/types"
import { AppCategoryEnum } from "@/lib/types"

import AppCard from "@/components/AppCard"

import { cn } from "@/lib/utils/cn"
import { slugify } from "@/lib/utils/url"

import { getAppsData } from "@/lib/data"

function getCategoryEnum(category: string): AppCategoryEnum | undefined {
  const slug = category.toLowerCase()
  return Object.values(AppCategoryEnum).find((val) => slugify(val) === slug)
}

interface CategoryAppsGridProps {
  category: string
  limit?: number
  className?: string
}

const CategoryAppsGrid = async ({
  category,
  limit,
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

  return (
    <div className={cn("grid grid-cols-fill-4 gap-6 md:gap-12", className)}>
      {translatedApps.slice(0, limit).map((app) => (
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

export default CategoryAppsGrid
