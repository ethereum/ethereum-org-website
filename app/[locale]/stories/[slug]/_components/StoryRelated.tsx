import { useTranslations } from "next-intl"

import type { HumanityStory } from "@/lib/types"

import StoryCard from "@/components/StoryCard"

interface StoryRelatedProps {
  stories: HumanityStory[]
}

const StoryRelated = ({ stories }: StoryRelatedProps) => {
  const t = useTranslations("page-stories")

  return (
    <section className="mt-16 border-t pt-8">
      <h2 className="mb-8 text-2xl font-bold">
        {t("page-stories-related-title")}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </section>
  )
}

export default StoryRelated
