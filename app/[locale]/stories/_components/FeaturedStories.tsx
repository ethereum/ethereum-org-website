import { useTranslations } from "next-intl"

import type { HumanityStory } from "@/lib/types"

import StoryCard from "@/components/StoryCard"

interface FeaturedStoriesProps {
  stories: HumanityStory[]
}

const FeaturedStories = ({ stories }: FeaturedStoriesProps) => {
  const t = useTranslations("page-stories")

  if (stories.length === 0) return null

  return (
    <section className="w-full px-4 py-8 md:px-8">
      <h2 className="mb-8 text-2xl font-bold md:text-3xl">
        {t("page-stories-featured-title")}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedStories
