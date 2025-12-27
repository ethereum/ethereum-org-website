import { useTranslations } from "next-intl"

import type { HumanityStory } from "@/lib/types"

import StoryCard from "@/components/StoryCard"

interface StoriesGridProps {
  stories: HumanityStory[]
}

const StoriesGrid = ({ stories }: StoriesGridProps) => {
  const t = useTranslations("page-stories")

  if (stories.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-body-medium">
          {t("page-stories-no-results")}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StoryCard key={story.slug} story={story} />
      ))}
    </div>
  )
}

export default StoriesGrid
