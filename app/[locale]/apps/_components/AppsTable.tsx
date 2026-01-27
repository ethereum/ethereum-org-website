"use client"

import { useMemo, useState } from "react"

import { AppData } from "@/lib/types"

import FilterBar from "@/components/FilterBar"

import AppCard from "./AppCard"

const AppsTable = ({ apps }: { apps: AppData[] }) => {
  const [filterBy, setFilterBy] = useState<string>()

  const subCategories = useMemo(
    () => [...new Set(apps.flatMap((app) => app.subCategory))],
    [apps]
  )

  const getSubCategoryCount = (subCategory: string) => {
    return apps.filter((app) => app.subCategory.includes(subCategory)).length
  }

  const filteredApps = useMemo(
    () =>
      apps.filter((app) => {
        if (!filterBy) return true
        return app.subCategory.includes(filterBy)
      }),
    [apps, filterBy]
  )

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
          eventCategory: "category_page",
          eventAction: "filter_by",
          eventName: "",
        }}
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredApps.map((app) => (
          <div key={app.name}>
            <AppCard
              app={app}
              imageSize={14}
              hideTag
              matomoCategory="category_page"
              matomoAction="apps"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppsTable
