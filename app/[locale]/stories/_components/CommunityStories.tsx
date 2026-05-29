"use client"

import { useState } from "react"

import type { Story } from "@/lib/types"

import StoryCard from "@/components/StoryCard"
import { Button } from "@/components/ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"

type CommunityStoriesProps = {
  stories: Story[]
}

const STORIES_SHOWN = 12

const CommunityStories = ({ stories }: CommunityStoriesProps) => {
  const { t } = useTranslation("page-10-year-anniversary")
  const [storiesToShow, setStoriesToShow] = useState(STORIES_SHOWN)

  const visibleStories = stories.slice(0, storiesToShow)

  return (
    <div className="flex flex-col gap-8">
      <div className="gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {visibleStories.map((story, index) => (
          <StoryCard
            key={`${story.name}-${index}`}
            story={story}
            className="mb-6 break-inside-avoid"
          />
        ))}
      </div>
      {storiesToShow < stories.length && (
        <div className="flex justify-center">
          <Button
            onClick={() =>
              setStoriesToShow((n) =>
                Math.min(n + STORIES_SHOWN, stories.length)
              )
            }
            variant="outline"
            customEventOptions={{
              eventAction: "click",
              eventName: "stories show more community",
              eventCategory: "community-stories",
            }}
          >
            {t("page-10-year-stories-show-more")}
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommunityStories
