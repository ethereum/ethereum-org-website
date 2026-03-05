import { getTranslations } from "next-intl/server"

import type { AppData } from "@/lib/types"

import AppCard from "@/components/AppCard"
import InlineLink from "@/components/ui/Link"

import { slugify } from "@/lib/utils/url"

import { getAppsData } from "@/lib/data"

const CATEGORY_KEY_MAP: Record<string, string> = {
  gaming: "Gaming",
  defi: "DeFi",
  collectibles: "Collectibles",
  social: "Social",
  bridge: "Bridge",
  productivity: "Productivity",
  privacy: "Privacy",
  dao: "DAO",
}

function getSubcategoryKey(tag: string): string {
  return `subcategory-${tag
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-")}`
}

interface CategoryAppsGridProps {
  category: string
}

const CategoryAppsGrid = async ({ category }: CategoryAppsGridProps) => {
  const categoryKey = CATEGORY_KEY_MAP[category.toLowerCase()]

  if (!categoryKey) {
    console.warn(`Unknown app category: ${category}`)
    return null
  }

  let apps: AppData[] = []
  try {
    const appsData = await getAppsData()
    apps = (appsData?.[categoryKey] ?? []) as AppData[]
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
        const key = getSubcategoryKey(tag)
        return t.has(key) ? t(key) : tag
      }),
    })) as AppData[]
  } catch {
    // Translation lookup failed; render raw tags
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {translatedApps.map((app) => (
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
