import { getLocale, getTranslations } from "next-intl/server"

import LatestCard from "@/components/Latest/LatestCard"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import { Section, SectionHeader } from "@/components/ui/section"
import { TagsInlineText } from "@/components/ui/tag"

import { formatDate } from "@/lib/utils/date"
import { getLatestArticles } from "@/lib/utils/latest"
import { getArticleByline } from "@/lib/utils/latestByline"

type LatestUpdatesProps = {
  className?: string
  eventCategory?: string
}

// Homepage preview of the /latest stream: the three most recent merged
// articles, rendered with the same card as the /latest grid, plus a CTA to the
// full page.
const HOMEPAGE_LATEST_COUNT = 3

const LatestUpdates = async ({
  className,
  eventCategory = "Homepage",
}: LatestUpdatesProps) => {
  const locale = await getLocale()
  const t = await getTranslations("page-index")
  const tLatest = await getTranslations("page-latest")

  const { articles } = await getLatestArticles(locale)
  const items = articles.slice(0, HOMEPAGE_LATEST_COUNT)

  // Nothing to show (e.g. no builder posts and RSS cache empty) — drop the
  // section rather than render an empty heading.
  if (items.length === 0) return null

  return (
    <Section className={className}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <SectionHeader className="mt-0 mb-0">
            {t("page-index-latest-updates-title")}
          </SectionHeader>
        </div>

        <Grid columns={3}>
          {items.map((article) => (
            <LatestCard
              key={article.href}
              href={article.href}
              title={article.title}
              image={article.image}
              byline={getArticleByline(article)}
              description={article.description}
              tags={article.tags}
              meta={
                <TagsInlineText
                  variant="light"
                  className="uppercase"
                  list={[
                    article.date
                      ? formatDate(article.date, locale, { month: "short" })
                      : undefined,
                    article.timeToRead
                      ? tLatest("page-latest-minute-read", {
                          minutes: article.timeToRead,
                        })
                      : undefined,
                  ]}
                />
              }
              customEventOptions={{
                eventCategory,
                eventAction: "click",
                eventName: article.title,
              }}
            />
          ))}
        </Grid>

        <div className="mt-12 flex justify-center">
          <ButtonLink
            href="/latest/"
            customEventOptions={{
              eventCategory,
              eventAction: "click",
              eventName: "latest updates / view more",
            }}
          >
            {t("page-index-latest-updates-cta")}
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}

export default LatestUpdates
