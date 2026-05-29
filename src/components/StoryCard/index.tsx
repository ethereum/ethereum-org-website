"use client"

import { useState } from "react"

import type { Story } from "@/lib/types"

import Twitter from "@/components/icons/twitter.svg"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { useTranslation } from "@/hooks/useTranslation"

type StoryCardProps = {
  story: Story
  className?: string
}

/**
 * A single community story card with a flip toggle (English <-> original
 * language) and a read-more expander. Self-contained state so it can be
 * dropped into any layout (single-column list on /10years, masonry on
 * /stories).
 */
const StoryCard = ({ story, className }: StoryCardProps) => {
  const { t } = useTranslation("page-10-year-anniversary")
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const hasOriginal = !!story.storyOriginal
  const showOriginal = isFlipped && hasOriginal

  const handleFlip = () => {
    setIsFading(true)
    setTimeout(() => {
      setIsFlipped((prev) => !prev)
      setIsFading(false)
    }, 200) // 200ms fade duration
  }

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border bg-background p-6 transition-all duration-500",
        hasOriginal && "cursor-pointer",
        className
      )}
    >
      <div
        className={cn(
          "transition-opacity duration-200",
          isFading ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="mb-4 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-hover">
              <p aria-hidden className="font-bold">
                {story.name?.slice(0, 1) || "?"}
              </p>
            </div>
            <div>
              <p className="text-md font-bold">{story.name}</p>
              <p className="text-sm text-body-medium">{story.country}</p>
            </div>
          </div>
          {story.twitter && (
            <div className="flex items-center">
              <ButtonLink
                href={story.twitter}
                variant="ghost"
                hideArrow
                className="text-sm"
              >
                <Twitter className="text-xl text-body" />
              </ButtonLink>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p
              className={cn(
                "mb-1 line-clamp-3",
                isExpanded && "line-clamp-none"
              )}
            >
              {showOriginal ? story.storyOriginal : story.storyEnglish}
            </p>
            {!isExpanded && (
              <div className="mb-2">
                <Button
                  onClick={() => setIsExpanded(true)}
                  variant="ghost"
                  className="h-auto min-h-0 p-0 text-start text-sm"
                  customEventOptions={{
                    eventAction: "click",
                    eventName: "story card show more",
                    eventCategory: "community-stories",
                  }}
                >
                  {t("page-10-year-stories-read-more")}
                </Button>
              </div>
            )}
          </div>

          {hasOriginal && (
            <div>
              <p className="text-xs text-body-medium">
                {showOriginal
                  ? t("page-10-year-stories-original-language")
                  : t("page-10-year-stories-english-translation")}
              </p>
              <Button
                onClick={handleFlip}
                variant="ghost"
                className="h-auto min-h-0 p-0 text-start text-sm"
                customEventOptions={{
                  eventAction: "click",
                  eventName: "story card show original",
                  eventCategory: "community-stories",
                }}
              >
                {showOriginal
                  ? t("page-10-year-stories-show-english")
                  : t("page-10-year-stories-show-original")}
              </Button>
            </div>
          )}

          <p className="mt-2 text-sm text-body-medium">{story.date}</p>
        </div>
      </div>
    </div>
  )
}

export default StoryCard
