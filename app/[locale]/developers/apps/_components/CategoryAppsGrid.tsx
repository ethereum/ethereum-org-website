"use client"

import { useMemo, useState } from "react"
import { AppWindowMac } from "lucide-react"
import Image from "next/image"

import FilterBar from "@/components/FilterBar"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { TagsInlineText } from "@/components/ui/tag"

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
          <LinkBox
            key={app.id}
            className="h-fit rounded-xl p-6 hover:bg-background-highlight"
          >
            <LinkOverlay
              href={`?appId=${app.id}`}
              scroll={false}
              className="flex gap-x-3 no-underline"
            >
              <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border">
                {app.thumbnail_url ? (
                  <Image
                    src={app.thumbnail_url}
                    alt=""
                    width={58}
                    height={58}
                  />
                ) : (
                  <AppWindowMac className="size-12" />
                )}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-body">{app.name}</p>
                <TagsInlineText
                  list={app.tags.map((tag) => tagLabels[tag])}
                  variant="light"
                  className="lowercase"
                />
              </div>
            </LinkOverlay>
          </LinkBox>
        ))}
      </div>
    </>
  )
}
