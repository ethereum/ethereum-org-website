"use client"

import { useMemo, useState } from "react"
import { useLocale } from "next-intl"

import type { LatestArticle } from "@/lib/types"

import LatestCard from "@/components/Latest/LatestCard"
import { Button } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import { TagButton } from "@/components/ui/tag"

import { formatDate } from "@/lib/utils/date"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { useTranslation } from "@/hooks/useTranslation"

const INITIAL_SHOWN = 12
const SHOW_MORE_STEP = 6
const VISIBLE_CATEGORY_LIMIT = 8

type LatestArticlesGridProps = {
  articles: LatestArticle[]
  /** Localized "shown in original language" note; rendered only when set. */
  disclaimer?: string
}

type TagCount = { label: string; count: number }

const LatestArticlesGrid = ({
  articles,
  disclaimer,
}: LatestArticlesGridProps) => {
  const { t } = useTranslation("page-latest")
  const locale = useLocale()

  // Distinct categories (the persistent chip row) and topic tags (revealed via
  // "+ more"), each with a count, sorted by frequency.
  const { categories, topics } = useMemo(() => {
    const categoryCounts = new Map<string, number>()
    const topicCounts = new Map<string, number>()
    const categorySet = new Set(articles.map((a) => a.category))

    for (const article of articles) {
      categoryCounts.set(
        article.category,
        (categoryCounts.get(article.category) ?? 0) + 1
      )
      for (const tag of article.tags) {
        if (categorySet.has(tag)) continue
        topicCounts.set(tag, (topicCounts.get(tag) ?? 0) + 1)
      }
    }

    const toSorted = (map: Map<string, number>): TagCount[] =>
      [...map.entries()]
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)

    return {
      categories: toSorted(categoryCounts),
      topics: toSorted(topicCounts),
    }
  }, [articles])

  const [selectedTag, setSelectedTag] = useState<string>()
  const [shown, setShown] = useState(INITIAL_SHOWN)
  const [showAllTags, setShowAllTags] = useState(false)

  const filtered = useMemo(() => {
    if (!selectedTag) return articles
    return articles.filter((a) => a.tags.includes(selectedTag))
  }, [articles, selectedTag])

  const visible = filtered.slice(0, shown)
  const remaining = filtered.length - visible.length

  const handleTagSelect = (label: string) => {
    const isActive = label === selectedTag
    setShown(INITIAL_SHOWN)
    setSelectedTag(isActive ? undefined : label)
    trackCustomEvent({
      eventCategory: "latest-articles",
      eventAction: "click",
      eventName: `filter ${label} ${isActive ? "clear" : "apply"}`,
    })
  }

  // Categories always visible; topic tags appear behind "+ more". A selected
  // topic tag is always shown so the active filter stays visible.
  const overflowTopics = showAllTags
    ? topics
    : topics.filter((tag) => tag.label === selectedTag)
  const hiddenTopicCount = topics.length - overflowTopics.length

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-start gap-2">
        <TagButton
          variant={selectedTag ? "outline" : "solid"}
          status={selectedTag ? "normal" : "tag"}
          onClick={() => handleTagSelect(selectedTag ?? "")}
          disabled={!selectedTag}
        >
          {t("page-latest-filter-all")} ({articles.length})
        </TagButton>

        {[
          ...categories.slice(0, VISIBLE_CATEGORY_LIMIT),
          ...overflowTopics,
        ].map(({ label, count }) => {
          const isActive = label === selectedTag
          return (
            <TagButton
              key={label}
              variant={isActive ? "solid" : "outline"}
              status={isActive ? "tag" : "normal"}
              onClick={() => handleTagSelect(label)}
            >
              {label} ({count})
            </TagButton>
          )
        })}

        {hiddenTopicCount > 0 && (
          <TagButton
            variant="outline"
            status="normal"
            onClick={() => setShowAllTags(true)}
          >
            {t("page-latest:page-latest-filter-more", {
              count: hiddenTopicCount,
            })}
          </TagButton>
        )}
      </div>

      {disclaimer && <p className="text-sm text-body-medium">{disclaimer}</p>}

      <Grid columns={3}>
        {visible.map((article) => (
          <LatestCard
            key={article.href}
            href={article.href}
            title={article.title}
            image={article.image}
            byline={article.author ?? article.source}
            description={article.description}
            tags={article.tags}
            meta={
              article.date ? (
                <>
                  {formatDate(article.date, locale, { month: "short" })}
                  {article.timeToRead ? (
                    <>
                      {" · "}
                      {t("page-latest:page-latest-minute-read", {
                        minutes: article.timeToRead,
                      })}
                    </>
                  ) : null}
                </>
              ) : undefined
            }
            customEventOptions={{
              eventCategory: "latest-articles",
              eventAction: "click",
              eventName: article.title,
            }}
          />
        ))}
      </Grid>

      {remaining > 0 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() =>
              setShown((n) => Math.min(n + SHOW_MORE_STEP, filtered.length))
            }
            customEventOptions={{
              eventCategory: "latest-articles",
              eventAction: "click",
              eventName: "show more",
            }}
          >
            {t("page-latest:page-latest-see-more", { count: remaining })}
          </Button>
        </div>
      )}
    </div>
  )
}

export default LatestArticlesGrid
