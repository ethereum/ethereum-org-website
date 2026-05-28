import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { BaseLink } from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getBlogPostsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getFullUrl } from "@/lib/utils/url"

import BlogPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/developers/blog/latest-landing-hero.png"

const publishedDate = (locale: Lang, published: string) => {
  const localeTimestamp = getLocaleTimestamp(locale, published)

  return localeTimestamp !== "Invalid Date" ? (
    <span>
      <Emoji text=":calendar:" className="ms-2 me-2 text-sm" />
      {localeTimestamp}
    </span>
  ) : null
}

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-developers-blog")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/latest")
  const messages = pick(allMessages, requiredNamespaces)

  const blogPosts = await getBlogPostsData(locale)

  const { contributors } = await getAppPageContributorInfo(
    "latest",
    locale as Lang
  )

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "latest" },
    heroImg,
    title: t("page-blog-title"),
    description: t("page-blog-subtitle"),
  }

  return (
    <>
      <BlogPageJsonLD
        locale={locale}
        blogPosts={blogPosts}
        contributors={contributors}
      />
      <I18nProvider locale={locale} messages={messages}>
        <ContentHero {...heroProps} />
        <MainArticle className="mx-auto my-0 flex w-full flex-col items-center">
          <div className="my-8 w-full max-w-screen-lg shadow-table-box">
            {blogPosts.length === 0 ? (
              <p className="p-12 text-center text-body-medium">
                {t("page-blog-no-posts")}
              </p>
            ) : (
              blogPosts.map((post) => (
                <BaseLink
                  key={post.href}
                  href={post.href}
                  className="block w-full space-y-6 border-b p-8 no-underline duration-100 hover:bg-background-highlight"
                  hideArrow
                  customEventOptions={{
                    eventCategory: "builder-blog",
                    eventAction: "click",
                    eventName: post.title,
                  }}
                >
                  <h3 className="text-2xl font-semibold text-body">
                    {post.title}
                  </h3>
                  <p className="text-body-medium uppercase">
                    <Emoji text=":writing_hand:" className="me-2 text-sm" />
                    {post.author}
                    {post.team ? <> • {post.team}</> : null}
                    {post.published ? (
                      <> •{publishedDate(locale as Lang, post.published)}</>
                    ) : null}
                    {post.timeToRead ? (
                      <>
                        {" "}
                        •
                        <Emoji text=":stopwatch:" className="mx-2 text-sm" />
                        {post.timeToRead} {t("page-blog-minute-read")}
                      </>
                    ) : null}
                  </p>
                  <p className="text-body-medium">{post.description}</p>
                  <div className="flex flex-wrap">
                    {post.tags?.map((tag) => (
                      <Tag key={tag} status="tag" className="me-2 mb-2">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </BaseLink>
              ))
            )}
          </div>

          <FeedbackCard />
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

  const t = await getTranslations("page-developers-blog")

  const metadata = await getMetadata({
    locale,
    slug: ["latest"],
    title: t("page-blog-title"),
    description: t("page-blog-meta-description"),
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
