"use client"

import { useMemo, useState } from "react"

import type { AppData } from "@/lib/types"

import AppCard from "@/components/AppCard"
import FilterBar from "@/components/FilterBar"

import { slugify } from "@/lib/utils/url"

const FilterableCategoryAppsGrid = ({ apps }: { apps: AppData[] }) => {
  const [filterBy, setFilterBy] = useState<string>()

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
        count={filteredApps.length}
        totalCount={apps.length}
        matomoEvent={{
          eventCategory: "content_apps_grid",
          eventAction: "filter_by",
          eventName: "",
        }}
      />
      <div className="grid grid-cols-fill-4 gap-6 md:gap-12">
        {filteredApps.map((app) => (
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
    </div>
  )
}

export default FilterableCategoryAppsGrid
