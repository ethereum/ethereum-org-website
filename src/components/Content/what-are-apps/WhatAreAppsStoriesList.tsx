"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import type { Story } from "@/lib/types"

import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"

import { cn } from "@/lib/utils/cn"

type WhatAreAppsStoriesListProps = {
  stories: Story[]
}

const WhatAreAppsStoriesList = ({ stories }: WhatAreAppsStoriesListProps) => {
  const t = useTranslations("common")
  const [expandedStories, setExpandedStories] = useState<
    Record<number, boolean>
  >({})

  const handleExpand = (index: number) => {
    setExpandedStories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <Grid className="my-16">
      {stories.map((story, index) => (
        <div
          key={story.storyKey}
          className="flex flex-col gap-4 rounded-base border bg-background p-6"
        >
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-2">
              <div>
                {story.twitter && (
                  <Image
                    src={`https://unavatar.io/twitter/${story.twitter.split("/").pop()}`}
                    alt={story.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                {!story.twitter && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-c">
                    <p className="text-lg font-bold text-white">
                      {story.name?.slice(0, 1).toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-md font-bold">{story.name}</p>
                <p className="text-sm text-body-medium">
                  {story.twitter
                    ? `@${story.twitter.split("/").pop()}`
                    : story.country}
                </p>
              </div>
            </div>
            <div>
              {story.twitter && (
                <ButtonLink
                  href={story.twitter}
                  variant="ghost"
                  className="justify-start px-0 text-body"
                  hideArrow
                >
                  <Twitter />
                </ButtonLink>
              )}
            </div>
          </div>
          <div>
            <p
              className={cn(
                "mb-1 line-clamp-6",
                expandedStories[index] && "line-clamp-none"
              )}
            >
              {story.story}
            </p>
            <Button
              onClick={() => handleExpand(index)}
              variant="ghost"
              className="h-auto min-h-0 p-0 text-start text-sm"
            >
              {expandedStories[index]
                ? t("story-card-read-less")
                : t("story-card-read-more")}
            </Button>
          </div>
          <p className="text-sm text-body-medium">{story.date}</p>
        </div>
      ))}
    </Grid>
  )
}

export default WhatAreAppsStoriesList
