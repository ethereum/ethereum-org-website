"use client"

import { useMemo, useState } from "react"

import type { Story } from "@/lib/types"

import StoryCard from "@/components/StoryCard"
import { Button } from "@/components/ui/buttons/Button"
import { TagButton } from "@/components/ui/tag"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useTranslation } from "@/hooks/useTranslation"

type CommunityStoriesProps = {
  stories: Story[]
}

const STORIES_SHOWN = 12

// Stories carry one or more comma-separated category labels; split, trim and
// drop empties so each story maps to a clean list of categories.
const parseCategories = (raw?: string) =>
  (raw ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)

const CommunityStories = ({ stories }: CommunityStoriesProps) => {
  const { t } = useTranslation("page-stories")

  // Distinct categories sorted by frequency, deduped case-insensitively (the
  // mock data has casing drift, e.g. "Self-custody" vs "Self-Custody").
  const categories = useMemo(() => {
    const byKey = new Map<string, { label: string; count: number }>()
    for (const story of stories) {
      for (const category of parseCategories(story.category)) {
        const key = category.toLowerCase()
        const existing = byKey.get(key)
        if (existing) existing.count++
        else byKey.set(key, { label: category, count: 1 })
      }
    }
    return [...byKey.values()].sort((a, b) => b.count - a.count)
  }, [stories])

  const [storiesToShow, setStoriesToShow] = useState(STORIES_SHOWN)
  // Single-select, toggleable: no tag selected shows all stories; selecting one
  // filters to it, selecting another swaps, and clicking the active one clears
  // the filter (back to all).
  const [selectedTag, setSelectedTag] = useState<string>()

  const filteredStories = useMemo(() => {
    if (!selectedTag) return stories
    const selected = selectedTag.toLowerCase()
    return stories.filter((story) =>
      parseCategories(story.category)
        .map((c) => c.toLowerCase())
        .includes(selected)
    )
  }, [stories, selectedTag])

  const visibleStories = filteredStories.slice(0, storiesToShow)

  const handleTagSelect = (label: string) => {
    const isActive = label === selectedTag
    setStoriesToShow(STORIES_SHOWN)
    setSelectedTag(isActive ? undefined : label)
    trackCustomEvent({
      eventCategory: "community-stories",
      eventAction: "click",
      eventName: `story filter ${label} ${isActive ? "clear" : "apply"}`,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-center">
          {categories.map(({ label, count }) => {
            const isActive = label === selectedTag
            return (
              <TagButton
                key={label}
                variant={isActive ? "solid" : "outline"}
                status={isActive ? "tag" : "normal"}
                onClick={() => handleTagSelect(label)}
              >
                {label} ({count})
              </TagButton>
            )
          })}
        </div>
      )}

      {/* CSS multi-column gives true masonry packing with zero JS, so the
          server and client render identical markup (no hydration mismatch). */}
      <div className="gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {visibleStories.map((story, index) => (
          <StoryCard
            key={`${story.name}-${index}`}
            story={story}
            expandable={false}
            showDate={false}
            className="mb-6 break-inside-avoid"
          />
        ))}
      </div>

      {storiesToShow < filteredStories.length && (
        <div className="flex justify-center">
          <Button
            onClick={() =>
              setStoriesToShow((n) =>
                Math.min(n + STORIES_SHOWN, filteredStories.length)
              )
            }
            variant="outline"
            customEventOptions={{
              eventAction: "click",
              eventName: "stories show more community",
              eventCategory: "community-stories",
            }}
          >
            {t("page-10-year-anniversary:page-10-year-stories-show-more")}
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommunityStories
