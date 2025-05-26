"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/buttons/Button"

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
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})
  const [expandedStories, setExpandedStories] = useState<
    Record<string, boolean>
  >({})
  const [fading, setFading] = useState<Record<string, boolean>>({})
  const [clamped, setClamped] = useState<Record<string, boolean>>({})
  const [storiesToShow, setStoriesToShow] = useState(STORIES_SHOWN)

  // Refs for each story's English and original text
  const englishRefs = useRef<Record<string, HTMLParagraphElement | null>>({})
  const originalRefs = useRef<Record<string, HTMLParagraphElement | null>>({})

  // Check if the text is clamped (truncated)
  useEffect(() => {
    stories.forEach((story) => {
      const name = story.name
      // Only check if not expanded
      if (!expandedStories[name]) {
        const engRef = englishRefs.current[name]
        if (engRef) {
          setClamped((prev) => ({
            ...prev,
            [name]: engRef.scrollHeight > engRef.clientHeight,
          }))
        }
        if (story.storyOriginal) {
          const origRef = originalRefs.current[name]
          if (origRef) {
            setClamped((prev) => ({
              ...prev,
              [name + "-original"]: origRef.scrollHeight > origRef.clientHeight,
            }))
          }
        }
      } else {
        // If expanded, not clamped
        setClamped((prev) => ({
          ...prev,
          [name]: false,
          [name + "-original"]: false,
        }))
      }
    })
  }, [stories, expandedStories])

  const handleFlip = (name: string) => {
    setFading((prev) => ({ ...prev, [name]: true }))
    setTimeout(() => {
      setFlippedCards((prev) => ({ ...prev, [name]: !prev[name] }))
      setFading((prev) => ({ ...prev, [name]: false }))
    }, 200) // 200ms fade duration
  }

  const handleExpand = (name: string) => {
    setExpandedStories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const visibleStories = stories.slice(0, storiesToShow)

  return (
    <div className="flex flex-1 flex-col gap-8">
      {visibleStories.map((story) => {
        const isFlipped = flippedCards[story.name]
        const isFading = fading[story.name]
        const isClamped = clamped[story.name]
        const isClampedOriginal = clamped[story.name + "-original"]
        return (
          <div
            key={story.name}
            className={cn(
              "relative w-full rounded-2xl border bg-white p-6 transition-all duration-500",
              story.storyOriginal && "cursor-pointer"
            )}
          >
            <div className="relative h-full w-full">
              {/* Fade transition for face change */}
              <div
                className={cn(
                  "transition-opacity duration-200",
                  isFading ? "opacity-0" : "opacity-100"
                )}
              >
                {!isFlipped && (
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">{story.name}</h3>
                      <p className="text-body-medium">{story.country}</p>
                    </div>
                    <div className="flex flex-col">
                      <p
                        ref={(el) => {
                          englishRefs.current[story.name] = el
                        }}
                        className={cn(
                          "line-clamp-3",
                          expandedStories[story.name] && "line-clamp-none"
                        )}
                      >
                        {story.storyEnglish}
                      </p>
                      {isClamped && !expandedStories[story.name] && (
                        <div>
                          <Button
                            onClick={() => handleExpand(story.name)}
                            variant="ghost"
                            className="p-0 text-start text-sm"
                          >
                            {expandedStories[story.name]
                              ? "Show less"
                              : "Read more"}
                          </Button>
                        </div>
                      )}
                    </div>
                    {story.storyOriginal && (
                      <div>
                        <p className="text-sm text-body-medium">
                          English translation
                        </p>
                        <Button
                          onClick={() => handleFlip(story.name)}
                          variant="ghost"
                          className="h-auto p-0 text-start text-sm"
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
                    <div className="mt-2">
                      <h3 className="text-2xl font-bold">{story.name}</h3>
                      <p className="text-body-medium">{story.country}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p
                        ref={(el) => {
                          originalRefs.current[story.name] = el
                        }}
                        className={cn(
                          "line-clamp-3",
                          expandedStories[story.name] && "line-clamp-none"
                        )}
                      >
                        {story.storyOriginal}
                      </p>
                      {isClampedOriginal && !expandedStories[story.name] && (
                        <div>
                          <Button
                            onClick={() => handleExpand(story.name)}
                            variant="ghost"
                            className="p-0 text-start text-sm"
                          >
                            {expandedStories[story.name]
                              ? "Show less"
                              : "Read more"}
                          </Button>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-body-medium">
                        Original language
                      </p>
                      <Button
                        onClick={() => handleFlip(story.name)}
                        variant="ghost"
                        className="p-0 text-start text-sm"
                      >
                        Show English
                      </Button>
                    </div>
                    <p className="text-sm text-body-medium">{story.date}</p>
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
