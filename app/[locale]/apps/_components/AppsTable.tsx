"use client"

import { useMemo, useState } from "react"

import { AppData } from "@/lib/types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import AppCard from "./AppCard"

const AppsTable = ({ apps }: { apps: AppData[] }) => {
  const [filterBy, setFilterBy] = useState("All")

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
        if (filterBy === "All") return true
        return app.subCategory.includes(filterBy)
      }),
    [apps, filterBy]
  )

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center justify-between border-b pb-2">
        <div className="flex flex-row items-center gap-2">
          <p className="whitespace-nowrap">Filter by</p>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="min-w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="All"
                className="cursor-pointer hover:bg-primary-low-contrast"
              >
                All
              </SelectItem>
              {subCategories.map((subCategory) => (
                <SelectItem
                  key={subCategory}
                  value={subCategory}
                  className="cursor-pointer hover:bg-primary-low-contrast"
                >
                  {subCategory} ({getSubCategoryCount(subCategory)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-body-medium">
            Showing{" "}
            <span className="text-body">
              (
              {filteredApps.length === apps.length
                ? apps.length
                : `${filteredApps.length}/${apps.length}`}
              )
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredApps.map((app) => (
          <div key={app.name}>
            <AppCard app={app} imageSize={14} hideTag />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppsTable
