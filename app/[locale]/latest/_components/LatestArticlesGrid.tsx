"use client"

import { useMemo, useState } from "react"
import { useLocale } from "next-intl"

import type { LatestArticle } from "@/lib/types"

import LatestCard from "@/components/Latest/LatestCard"
import { Button } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import TagFilter from "@/components/ui/tag-filter"

import { formatDate } from "@/lib/utils/date"
import { getArticleByline } from "@/lib/utils/latestByline"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getTagCounts } from "@/lib/utils/tags"

import { useTranslation } from "@/hooks/useTranslation"

const INITIAL_SHOWN = 12
const SHOW_MORE_STEP = 6
const DEFAULT_VISIBLE_TAGS = 8

type LatestArticlesGridProps = {
  articles: LatestArticle[]
  /** Localized "shown in original language" note; rendered only when set. */
  disclaimer?: string
}

const LatestArticlesGrid = ({
  articles,
  disclaimer,
}: LatestArticlesGridProps) => {
  const { t } = useTranslation("page-latest")
  const locale = useLocale()

  // Flat, count-descending tag pool. Each article's `tags` already includes its
  // category, so high-frequency categories naturally lead the row and narrower
  // topics fall behind the "show more" expander.
  const tagCounts = useMemo(
    () => getTagCounts(articles, (a) => a.tags),
    [articles]
  )

  const [selectedTags, setSelectedTags] = useState<Array<string>>([])
  const [shown, setShown] = useState(INITIAL_SHOWN)

  // OR matching: an article shows if it carries any of the selected tags. An
  // empty selection shows everything.
  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return articles
    return articles.filter((a) =>
      selectedTags.some((tag) => a.tags.includes(tag))
    )
  }, [articles, selectedTags])

  const visible = filtered.slice(0, shown)
  const remaining = filtered.length - visible.length

  // Single-tag delta per call (chip toggle); resets pagination and tracks the
  // one changed tag.
  const handleTagsChange = (next: Array<string>) => {
    const added = next.find((tag) => !selectedTags.includes(tag))
    const removed = selectedTags.find((tag) => !next.includes(tag))

    setShown(INITIAL_SHOWN)
    setSelectedTags(next)

    if (added || removed) {
      trackCustomEvent({
        eventCategory: "latest-articles",
        eventAction: "click",
        eventName: `filter ${added ?? removed} ${added ? "apply" : "clear"}`,
      })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <TagFilter
        tags={tagCounts}
        value={selectedTags}
        onChange={handleTagsChange}
        defaultVisible={DEFAULT_VISIBLE_TAGS}
      />

      {disclaimer && <p className="text-sm text-body-medium">{disclaimer}</p>}

      <Grid columns={3}>
        {visible.map((article) => (
          <LatestCard
            key={article.href}
            href={article.href}
            title={article.title}
            image={article.image}
            byline={getArticleByline(article)}
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
