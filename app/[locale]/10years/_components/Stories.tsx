"use client"

import { useState } from "react"
import { FaXTwitter } from "react-icons/fa6"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

type Story = {
  name: string
  storyEnglish: string
  storyOriginal: string | null
  twitter?: string
  country: string
  date: string
}

type StoriesProps = {
  stories: Story[]
}

const STORIES_SHOWN = 5

const Stories = ({ stories }: StoriesProps) => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const [expandedStories, setExpandedStories] = useState<
    Record<number, boolean>
  >({})
  const [fading, setFading] = useState<Record<number, boolean>>({})
  const [storiesToShow, setStoriesToShow] = useState(STORIES_SHOWN)

  const handleFlip = (index: number) => {
    setFading((prev) => ({ ...prev, [index]: true }))
    setTimeout(() => {
      setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }))
      setFading((prev) => ({ ...prev, [index]: false }))
    }, 200) // 200ms fade duration
  }

  const handleExpand = (index: number) => {
    setExpandedStories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const visibleStories = stories.slice(0, storiesToShow)

  return (
    <div className="flex flex-1 flex-col gap-8">
      {visibleStories.map((story, index) => {
        const isFlipped = flippedCards[index]
        const isFading = fading[index]
        return (
          <div
            key={story.name}
            className={cn(
              "relative w-full rounded-2xl border bg-background p-6 transition-all duration-500",
              story.storyOriginal && "cursor-pointer"
            )}
          >
            <div className="relative h-full w-full">
              {/* Fade transition for face change */}
              <div
                className={cn(
                  "transition-opacity duration-200",
                  isFading && "opacity-0",
                  !isFading && "opacity-100"
                )}
              >
                {!isFlipped && (
                  <div className="flex flex-col gap-2">
                    <div className="mb-4 flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-hover">
                          <p aria-hidden className="font-bold">
                            {story.name?.slice(0, 1) || "?"}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-md font-bold">{story.name}</p>
                          <p className="text-sm text-body-medium">
                            {story.country}
                          </p>
                        </div>
                      </div>
                      {story.twitter && (
                        <div className="flex items-center">
                          <ButtonLink
                            href={story.twitter || ""}
                            variant="ghost"
                            hideArrow
                            className="text-sm"
                          >
                            <FaXTwitter className="h-5 w-5 text-body" />
                          </ButtonLink>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p
                        className={cn(
                          "mb-1 line-clamp-3",
                          expandedStories[index] && "line-clamp-none"
                        )}
                      >
                        {story.storyEnglish}
                      </p>
                      {!expandedStories[index] && (
                        <div className="mb-2">
                          <Button
                            onClick={() => handleExpand(index)}
                            variant="ghost"
                            className="h-auto min-h-0 p-0 text-start text-sm"
                            customEventOptions={{
                              eventAction: "click",
                              eventName: "10 year anniversary show more",
                              eventCategory: "10-year-anniversary",
                            }}
                          >
                            Read more
                          </Button>
                        </div>
                      )}
                    </div>
                    {story.storyOriginal && (
                      <div>
                        <p className="text-xs text-body-medium">
                          English translation
                        </p>
                        <Button
                          onClick={() => handleFlip(index)}
                          variant="ghost"
                          className="h-auto min-h-0 p-0 text-start text-sm"
                          customEventOptions={{
                            eventAction: "click",
                            eventName: "10 year anniversary show original",
                            eventCategory: "10-year-anniversary",
                          }}
                        >
                          Show original
                        </Button>
                      </div>
                    )}
                    <p className="mt-2 text-sm text-body-medium">
                      {story.date}
                    </p>
                  </div>
                )}
                {isFlipped && story.storyOriginal && (
                  <div className="flex flex-col gap-2">
                    <div className="mb-4 flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-hover">
                          <p aria-hidden className="font-bold">
                            {story.name?.slice(0, 1) || "?"}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-md font-bold">{story.name}</p>
                          <p className="text-sm text-body-medium">
                            {story.country}
                          </p>
                        </div>
                      </div>
                      {story.twitter && (
                        <div className="flex items-center">
                          <ButtonLink
                            href={story.twitter || ""}
                            variant="ghost"
                            hideArrow
                            className="text-sm"
                          >
                            <FaXTwitter className="h-5 w-5 text-body" />
                          </ButtonLink>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p
                        className={cn(
                          "mb-1 line-clamp-3",
                          expandedStories[index] && "line-clamp-none"
                        )}
                      >
                        {story.storyOriginal}
                      </p>
                      {!expandedStories[index] && (
                        <div className="mb-2">
                          <Button
                            onClick={() => handleExpand(index)}
                            variant="ghost"
                            className="h-auto min-h-0 p-0 text-start text-sm"
                            customEventOptions={{
                              eventAction: "click",
                              eventName: "10 year anniversary show more",
                              eventCategory: "10-year-anniversary",
                            }}
                          >
                            Read more
                          </Button>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-body-medium">
                        Original language
                      </p>
                      <Button
                        onClick={() => handleFlip(index)}
                        variant="ghost"
                        className="h-auto min-h-0 p-0 text-start text-sm"
                        customEventOptions={{
                          eventAction: "click",
                          eventName: "10 year anniversary show original",
                          eventCategory: "10-year-anniversary",
                        }}
                      >
                        Show English
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-body-medium">
                      {story.date}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
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
            Show more
          </Button>
        </div>
      )}
    </div>
  )
}

export default Stories
