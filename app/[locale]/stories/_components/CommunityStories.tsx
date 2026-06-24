"use client"

import { useMemo, useState } from "react"

import type { Story } from "@/lib/types"

import StoryCard from "@/components/StoryCard"
import { Button } from "@/components/ui/buttons/Button"
import TagFilter from "@/components/ui/tag-filter"

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

  // Distinct categories as [label, count] entries, sorted by frequency and
  // deduped case-insensitively (the data has casing drift, e.g. "Self-custody"
  // vs "Self-Custody"); the first-seen casing wins as the display label.
  const tagCounts = useMemo<Array<[string, number]>>(() => {
    const byKey = new Map<string, { label: string; count: number }>()
    for (const story of stories) {
      for (const category of parseCategories(story.category)) {
        const key = category.toLowerCase()
        const existing = byKey.get(key)
        if (existing) existing.count++
        else byKey.set(key, { label: category, count: 1 })
      }
    }
    return [...byKey.values()]
      .sort((a, b) => b.count - a.count)
      .map(({ label, count }): [string, number] => [label, count])
  }, [stories])

  const [storiesToShow, setStoriesToShow] = useState(STORIES_SHOWN)
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])

  // OR matching (case-insensitive): a story shows if any of its categories is
  // among the selected tags. An empty selection shows everything.
  const filteredStories = useMemo(() => {
    if (selectedTags.length === 0) return stories
    const selected = new Set(selectedTags.map((tag) => tag.toLowerCase()))
    return stories.filter((story) =>
      parseCategories(story.category).some((c) => selected.has(c.toLowerCase()))
    )
  }, [stories, selectedTags])

  const visibleStories = filteredStories.slice(0, storiesToShow)

  // Single-tag delta per call (chip toggle); resets pagination and tracks the
  // one changed tag.
  const handleTagsChange = (next: Array<string>) => {
    const added = next.find((tag) => !selectedTags.includes(tag))
    const removed = selectedTags.find((tag) => !next.includes(tag))

    setStoriesToShow(STORIES_SHOWN)
    setSelectedTags(next)

    if (added || removed) {
      trackCustomEvent({
        eventCategory: "community-stories",
        eventAction: "click",
        eventName: `story filter ${added ?? removed} ${added ? "apply" : "clear"}`,
      })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {tagCounts.length > 0 && (
        <TagFilter
          className="items-center lg:justify-center"
          tags={tagCounts}
          value={selectedTags}
          onChange={handleTagsChange}
        />
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
            {t("common:show-more")}
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommunityStories
