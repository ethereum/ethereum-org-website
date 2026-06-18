"use client"

import { useState } from "react"

import { Story } from "@/lib/types"

import StoryCard from "@/components/StoryCard"
import { Button } from "@/components/ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"

type StoriesProps = {
  stories: Story[]
}

const STORIES_SHOWN = 5

const Stories = ({ stories }: StoriesProps) => {
  const { t } = useTranslation("page-10-year-anniversary")
  const [storiesToShow, setStoriesToShow] = useState(STORIES_SHOWN)

  const visibleStories = stories.slice(0, storiesToShow)

  return (
    <div className="flex flex-1 flex-col gap-8">
      {visibleStories.map((story) => (
        <StoryCard key={story.name} story={story} />
      ))}
      {/* Show more button only if there are more stories to show */}
      {storiesToShow < stories.length && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() =>
              setStoriesToShow((n) =>
                Math.min(n + STORIES_SHOWN, stories.length)
              )
            }
            customEventOptions={{
              eventAction: "click",
              eventName: "10 year anniversary show more stories",
              eventCategory: "10-year-anniversary",
            }}
            variant="outline"
          >
            {t("common:show-more")}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Stories
