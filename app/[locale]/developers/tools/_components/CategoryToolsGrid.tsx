"use client"

import { useMemo, useState } from "react"

import AppCard from "@/components/AppCard"
import FilterBar from "@/components/FilterBar"

import type { DeveloperTool, DeveloperToolTag } from "../types"

type CategoryToolsGridProps = {
  tools: DeveloperTool[]
  uniqueTags: DeveloperToolTag[]
  tagLabels: Record<DeveloperToolTag, string>
}

export default function CategoryToolsGrid({
  tools,
  uniqueTags,
  tagLabels,
}: CategoryToolsGridProps) {
  const [selectedTag, setSelectedTag] = useState<DeveloperToolTag>()

  const filteredTools = useMemo(
    () =>
      selectedTag
        ? tools.filter((tool) => tool.tags.includes(selectedTag))
        : tools,
    [tools, selectedTag]
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
        onValueChange={(value) => setSelectedTag(value as DeveloperToolTag)}
        count={filteredTools.length}
        totalCount={tools.length}
      />

      <div className="grid grid-cols-fill-3 gap-x-8">
        {filteredTools.map((tool) => (
          <AppCard
            key={tool.id}
            name={tool.name}
            thumbnail={tool.thumbnail_url}
            tags={tool.tags.map((tag) => tagLabels[tag])}
            href={`?toolId=${tool.id}`}
            layout="horizontal"
            imageSize="thumbnail"
            className="h-fit p-4"
          />
        ))}
      </div>
    </>
  )
}
