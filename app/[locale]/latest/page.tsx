import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams, RSSItem } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent } from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { mergeLatestArticles } from "@/lib/utils/latest"
import { getBlogPostsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getFullUrl } from "@/lib/utils/url"

import { LATEST_HIGHLIGHTS } from "@/data/latest/highlights"

import LatestArticlesGrid from "./_components/LatestArticlesGrid"
import SourceDirectory from "./_components/SourceDirectory"
import BlogPageJsonLD from "./page-jsonld"

import { getRSSData } from "@/lib/data"

// Hero and the bottom "suggest a resource" banner share one CTA pair.
// hrefs are placeholders for now (targets to be decided).
const CTA_BUTTONS = [
  { key: "page-latest-cta-submit-resource", href: "#" },
  { key: "page-latest-cta-propose-article", href: "#" },
] as const

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-latest")

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/latest")
  const messages = pick(allMessages, requiredNamespaces)

  const blogPosts = await getBlogPostsData(locale)

  // RSS is supplementary — a missing/unavailable feed cache should degrade to
  // builder articles only, never take down the page.
  let rssGroups: RSSItem[][] = []
  try {
    rssGroups = (await getRSSData()) ?? []
  } catch (error) {
    console.warn("Failed to load RSS data for /latest:", error)
  }

  const highlightHrefs = LATEST_HIGHLIGHTS.map((h) => h.href)
  const articles = mergeLatestArticles(blogPosts, rssGroups, highlightHrefs)

  const { contributors } = await getAppPageContributorInfo(
    "latest",
    locale as Lang
  )

  const disclaimer =
    locale !== "en" ? t("page-latest-i18n-disclaimer") : undefined

  return (
    <>
      <BlogPageJsonLD
        locale={locale}
        blogPosts={blogPosts}
        contributors={contributors}
      />
      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="mx-auto w-full max-w-screen-2xl space-y-16 pb-16 md:space-y-24">
          <PageHero
            variant="no-divider"
            breadcrumbs={{ slug: "latest" }}
            title={t("page-latest-title")}
            description={t("page-latest-subtitle")}
            buttons={[
              {
                href: CTA_BUTTONS[0].href,
                content: t(CTA_BUTTONS[0].key),
              },
              {
                href: CTA_BUTTONS[1].href,
                content: t(CTA_BUTTONS[1].key),
                variant: "outline",
              },
            ]}
          />

          {/* Highlights */}
          {LATEST_HIGHLIGHTS.length > 0 && (
            <Section className="space-y-8 px-4 md:px-8">
              <h2>{t("page-latest-highlights-heading")}</h2>
              <Grid balanced={2} className="gap-6">
                {LATEST_HIGHLIGHTS.map((highlight) => (
                  <Card
                    key={highlight.href}
                    href={highlight.href}
                    variant="nested"
                    size="lg"
                    hoverEffect="lift"
                    className="overflow-hidden border"
                  >
                    <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-md">
                      <Image
                        src={highlight.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <CardContent spacing="sm" className="flex flex-col gap-3">
                      {highlight.source && (
                        <p className="text-sm font-bold text-body-medium uppercase">
                          {highlight.source}
                        </p>
                      )}
                      <h3 className="text-2xl font-bold">{highlight.title}</h3>
                      <p className="text-body-medium">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}

          {/* Latest Ethereum articles */}
          <Section className="space-y-8 px-4 md:px-8">
            <h2>{t("page-latest-articles-heading")}</h2>
            <LatestArticlesGrid articles={articles} disclaimer={disclaimer} />
          </Section>

          {/* Read more on these websites */}
          <Section className="space-y-8 px-4 md:px-8">
            <h2>{t("page-latest-sources-heading")}</h2>
            <SourceDirectory />
          </Section>

          {/* Suggest a resource — left-aligned block mirroring the hero CTAs */}
          <Section className="space-y-6 px-4 md:px-8">
            <div className="max-w-3xl space-y-4">
              <h2>{t("page-latest-suggest-heading")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-latest-suggest-description")}
              </p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <ButtonLink href={CTA_BUTTONS[0].href}>
                {t(CTA_BUTTONS[0].key)}
              </ButtonLink>
              <ButtonLink
                href={CTA_BUTTONS[1].href}
                variant="outline"
                isSecondary
              >
                {t(CTA_BUTTONS[1].key)}
              </ButtonLink>
            </div>
          </Section>

          <Section className="px-4 md:px-8">
            <FeedbackCard />
          </Section>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-latest")

  const metadata = await getMetadata({
    locale,
    slug: ["latest"],
    title: t("page-latest-title"),
    description: t("page-latest-meta-description"),
  })

  return {
    ...metadata,
    alternates: {
      ...(metadata.alternates ?? {}),
      types: {
        "application/rss+xml": getFullUrl(locale, "/latest/feed.xml").replace(
          /\/$/,
          ""
        ),
      },
    },
  }
}

export default Page
