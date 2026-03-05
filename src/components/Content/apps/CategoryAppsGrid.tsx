import { getTranslations } from "next-intl/server"

import type { AppData } from "@/lib/types"
import { AppCategoryEnum } from "@/lib/types"

import AppCard from "@/components/AppCard"
import InlineLink from "@/components/ui/Link"

import { slugify } from "@/lib/utils/url"

import { getAppsData } from "@/lib/data"

function getCategoryEnum(category: string): AppCategoryEnum | undefined {
  const slug = category.toLowerCase()
  return Object.values(AppCategoryEnum).find((val) => slugify(val) === slug)
}

interface CategoryAppsGridProps {
  category: string
  limit?: number
}

const CategoryAppsGrid = async ({ category, limit }: CategoryAppsGridProps) => {
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

  if (!apps || apps.length === 0) {
    return (
      <p className="text-body text-body-medium">
        Apps are currently being loaded. In the meantime,{" "}
        <InlineLink href={`/apps/categories/${category.toLowerCase()}`}>
          browse all {category.toLowerCase()} apps
        </InlineLink>
        .
      </p>
    )
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
