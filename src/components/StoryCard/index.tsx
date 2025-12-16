import { MapPin } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import type { StoryCardProps } from "@/lib/types"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHighlight,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"
import {
  formatStoryDate,
  getCategoryTranslationKey,
  getStoryExcerpt,
} from "@/lib/utils/stories"

const StoryCard = ({ story, className }: StoryCardProps) => {
  const t = useTranslations("page-stories")
  const locale = useLocale()

  const categoryKey = getCategoryTranslationKey(story.category)
  const excerpt = getStoryExcerpt(story, 180)
  const formattedDate = formatStoryDate(story.date, locale)

  return (
    <Card
      href={`/stories/${story.slug}/`}
      className={cn(
        "flex h-full flex-col border bg-background transition-shadow hover:shadow-md",
        className
      )}
    >
      <CardHeader className="space-y-3 pb-2">
        <CardHighlight>{t(categoryKey)}</CardHighlight>
        <CardTitle className="line-clamp-2 text-xl">{story.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-body-medium">
          <MapPin className="size-4" />
          <span>
            {story.location.country}
            {story.role && ` · ${story.role}`}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between gap-4 pt-0">
        <CardDescription className="line-clamp-4 text-base leading-relaxed">
          {excerpt}
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-sm text-body-medium">{formattedDate}</span>
          <span className="text-sm font-medium text-primary">
            {t("page-stories-read-story")} →
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default StoryCard
