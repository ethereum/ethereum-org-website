"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import type { AppData } from "@/lib/types"

import AppCard from "@/components/AppCard"
import FilterBar from "@/components/FilterBar"
import { Button } from "@/components/ui/buttons/Button"

import { slugify } from "@/lib/utils/url"

type FilterableCategoryAppsGridProps = {
  apps: AppData[]
  limit?: number
}

const FilterableCategoryAppsGrid = ({
  apps,
  limit,
}: FilterableCategoryAppsGridProps) => {
  const t = useTranslations("common")
  const [filterBy, setFilterBy] = useState<string>()
  const [expanded, setExpanded] = useState(false)

  const subCategories = useMemo(
    () => [...new Set(apps.flatMap((app) => app.subCategory))],
    [apps]
  )

  const filteredApps = useMemo(
    () =>
      apps.filter((app) => {
        if (!filterBy) return true
        return app.subCategory.includes(filterBy)
      }),
    [apps, filterBy]
  )

  const isLimited =
    !filterBy && !expanded && limit && limit < filteredApps.length
  const displayApps = isLimited ? filteredApps.slice(0, limit) : filteredApps

  const getSubCategoryCount = (subCategory: string) =>
    apps.filter((app) => app.subCategory.includes(subCategory)).length

  const filterItems = subCategories.map((subCategory) => ({
    value: subCategory,
    label: `${subCategory} (${getSubCategoryCount(subCategory)})`,
  }))

  return (
    <div className="flex flex-col gap-7">
      <FilterBar
        items={filterItems}
        value={filterBy}
        onValueChange={setFilterBy}
        count={displayApps.length}
        totalCount={apps.length}
        matomoEvent={{
          eventCategory: "content_apps_grid",
          eventAction: "filter_by",
          eventName: "",
        }}
      />
      <div className="grid grid-cols-fill-4 gap-6 md:gap-12">
        {displayApps.map((app) => (
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
      {!filterBy && limit && limit < filteredApps.length && (
        <Button
          variant="outline"
          className="self-center"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? t("show-less") : t("show-all")}
        </Button>
      )}
    </div>
  )
}

export default FilterableCategoryAppsGrid
