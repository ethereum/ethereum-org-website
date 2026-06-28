import { pick } from "lodash"
import { Globe } from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import LatestCard from "@/components/Latest/LatestCard"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import { BaseLink } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import { TagsInlineText } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDate } from "@/lib/utils/date"
import { getLatestArticles } from "@/lib/utils/latest"
import { getArticleByline } from "@/lib/utils/latestByline"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getFullUrl } from "@/lib/utils/url"

import { LATEST_SOURCES } from "@/data/latest/sources"

import LatestArticlesGrid from "./_components/LatestArticlesGrid"
import BlogPageJsonLD from "./page-jsonld"

// Hero and the bottom "suggest a resource" banner share one CTA pair.
// TODO: swap "submit-resource" to the news-source contributing guide once it
// lands in the repo (currently a Google Doc); see issue #18388 for the planned
// dedicated issue templates.
const CTA_BUTTONS = [
  {
    key: "page-latest-cta-submit-resource",
    href: "https://github.com/ethereum/ethereum-org-website/issues/new/choose",
  },
  {
    key: "page-latest-cta-propose-article",
    href: "/contributing/adding-articles/",
  },
] as const

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-latest")

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/latest")
  const messages = pick(allMessages, requiredNamespaces)

  const { highlights, articles, blogPosts } = await getLatestArticles(locale)

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
            variant="no-divider"
          />

          {/* Highlights */}
          {highlights.length > 0 && (
            <Section className="space-y-8 px-4 md:px-8">
              <h2>{t("page-latest-highlights-heading")}</h2>
              <Grid balanced={2} className="gap-6">
                {highlights.map((highlight) => (
                  <LatestCard
                    key={highlight.href}
                    href={highlight.href}
                    title={highlight.title}
                    image={highlight.image}
                    byline={getArticleByline(highlight)}
                    description={highlight.description}
                    meta={
                      <TagsInlineText
                        variant="light"
                        className="uppercase"
                        list={[
                          highlight.date
                            ? formatDate(highlight.date, locale, {
                                month: "short",
                              })
                            : undefined,
                        ]}
                      />
                    }
                  />
                ))}
              </Grid>
            </Section>
          )}

          {/* Latest Ethereum articles */}
          <Section className="space-y-8 px-4 md:px-8">
            <h2>{t("page-latest-articles-heading")}</h2>
            <LatestArticlesGrid articles={articles} disclaimer={disclaimer} />
          </Section>

          {/* Read more on these websites. Per-source logos live in
              /public/images/latest/sources (square assets); rounded corners are
              applied here via CSS. Sources without a logo fall back to a globe. */}
          <Section className="space-y-8 px-4 md:px-8">
            <h2>{t("page-latest-sources-heading")}</h2>
            <Grid columns={4} size="narrow">
              {LATEST_SOURCES.map((source) => (
                <BaseLink
                  key={source.feed}
                  href={source.link}
                  hideArrow
                  className="flex items-center gap-3 rounded-lg border p-2 text-body no-underline duration-100 hover:bg-background-highlight hover:text-body"
                >
                  {source.icon ? (
                    <Image
                      src={source.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-background-highlight">
                      <Globe className="size-6 text-body-medium" />
                    </span>
                  )}
                  <span className="font-bold">{source.name}</span>
                </BaseLink>
              ))}
            </Grid>
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
            <ContentFeedback />
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
