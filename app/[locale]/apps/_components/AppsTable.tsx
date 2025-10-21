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

import { trackCustomEvent } from "@/lib/utils/matomo"

import AppCard from "./AppCard"

import useTranslation from "@/hooks/useTranslation"

const AppsTable = ({ apps }: { apps: AppData[] }) => {
  const { t } = useTranslation("page-apps")
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
      <div className="flex flex-row items-end justify-between border-b pb-2 sm:items-center">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <p className="whitespace-nowrap">{t("page-apps-filter-by")}</p>
          <Select
            value={filterBy}
            onValueChange={(value) => {
              setFilterBy(value)
              trackCustomEvent({
                eventCategory: "category_page",
                eventAction: "filter_by",
                eventName: `subcategory name ${value}`,
              })
            }}
          >
            <SelectTrigger className="min-w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="All"
                className="cursor-pointer hover:bg-primary-low-contrast"
              >
                {t("page-apps-filter-all")}
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
            {t("page-apps-showing")}{" "}
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
