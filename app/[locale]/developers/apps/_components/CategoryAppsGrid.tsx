"use client"

import { useMemo, useState } from "react"

import AppCard from "@/components/AppCard"
import FilterBar from "@/components/FilterBar"

import type { DeveloperApp, DeveloperAppTag } from "../types"

type CategoryAppsGridProps = {
  apps: DeveloperApp[]
  uniqueTags: DeveloperAppTag[]
  tagLabels: Record<DeveloperAppTag, string>
}

export default function CategoryAppsGrid({
  apps,
  uniqueTags,
  tagLabels,
}: CategoryAppsGridProps) {
  const [selectedTag, setSelectedTag] = useState<DeveloperAppTag>()

  const filteredApps = useMemo(
    () =>
      selectedTag ? apps.filter((app) => app.tags.includes(selectedTag)) : apps,
    [apps, selectedTag]
  )

  const filterItems = uniqueTags.map((tag) => ({
    value: tag,
    label: tagLabels[tag],
  }))

  return (
    <>
      <FilterBar
        items={filterItems}
        value={selectedTag}
        onValueChange={(value) => setSelectedTag(value as DeveloperAppTag)}
        count={filteredApps.length}
        totalCount={apps.length}
      />

      <div className="grid grid-cols-fill-3 gap-x-8">
        {filteredApps.map((app) => (
          <AppCard
            key={app.id}
            name={app.name}
            thumbnail={app.thumbnail_url}
            tags={app.tags.map((tag) => tagLabels[tag])}
            href={`?appId=${app.id}`}
            layout="horizontal"
            imageSize="thumbnail"
            className="h-fit p-4"
          />
        ))}
      </div>
    </>
  )
}
