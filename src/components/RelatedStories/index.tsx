import { useTranslations } from "next-intl"

import StoryCard from "@/components/StoryCard"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { getStoriesForPage } from "@/lib/utils/stories"

interface RelatedStoriesProps {
  pagePath: string
  limit?: number
  title?: string
  className?: string
}

const RelatedStories = ({
  pagePath,
  limit = 3,
  className,
}: RelatedStoriesProps) => {
  const t = useTranslations("page-stories")
  const stories = getStoriesForPage(pagePath).slice(0, limit)

  if (stories.length === 0) return null

  return (
    <section className={className}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">
          {t("page-stories-title")}
        </h2>
        <ButtonLink href="/stories/" variant="outline" size="sm">
          View all stories
        </ButtonLink>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </section>
  )
}

export default RelatedStories
