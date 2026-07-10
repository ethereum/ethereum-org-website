"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"

import type { Story } from "@/lib/types"

import Twitter from "@/components/icons/twitter.svg"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

type StoryCardProps = {
  story: Story
  className?: string
  /**
   * When false, the story copy is always shown in full and the read-more
   * expander is hidden. Useful in multi-column/masonry layouts where an
   * inline height change would reflow every column. Defaults to true.
   */
  expandable?: boolean
  /**
   * When false, the story date is hidden. Defaults to true (shown on the
   * /10years page); /stories opts out.
   */
  showDate?: boolean
}

/**
 * A single community story card with a flip toggle (localized <-> original
 * language) and an optional read-more expander. Self-contained state so it
 * can be dropped into any layout (single-column list on /10years, masonry on
 * /stories).
 */
const StoryCard = ({
  story,
  className,
  expandable = true,
  showDate = true,
}: StoryCardProps) => {
  const t = useTranslations("common")
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFading, setIsFading] = useState(false)

  // No flip when the localized copy matches the original (e.g. an English
  // submission viewed in English, or a locale still falling back to English)
  const hasOriginal =
    !!story.storyOriginal && story.storyOriginal !== story.story
  const showOriginal = isFlipped && hasOriginal

  const handleFlip = () => {
    setIsFading(true)
    setTimeout(() => {
      setIsFlipped((prev) => !prev)
      setIsFading(false)
    }, 200) // 200ms fade duration
  }

  return (
    <Card variant="nested" className={cn("border", className)}>
      <CardContent
        spacing="none"
        className={cn(
          "transition-opacity duration-200",
          isFading ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="mb-4 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-hover">
              <p aria-hidden className="font-bold text-body-inverse">
                {story.name?.slice(0, 1) || "?"}
              </p>
            </div>
            <div>
              <p className="text-md font-bold text-body">{story.name}</p>
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
                "mb-1 text-body",
                expandable && !isExpanded && "line-clamp-3"
              )}
            >
              {showOriginal ? story.storyOriginal : story.story}
            </p>
            {expandable && !isExpanded && (
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
                  {t("story-card-read-more")}
                </Button>
              </div>
            )}
          </div>

          {hasOriginal && (
            <div>
              <p className="text-xs text-body-medium">
                {showOriginal
                  ? t("story-card-original-language")
                  : t("story-card-translation")}
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
                  ? t("story-card-show-translation")
                  : t("story-card-show-original")}
              </Button>
            </div>
          )}

          {showDate && (
            <p className="mt-2 text-sm text-body-medium">{story.date}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StoryCard
