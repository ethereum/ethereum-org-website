import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import Emoji from "@/components/Emoji"
import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"
import { BaseLink } from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getBlogPostsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getLocaleTimestamp } from "@/lib/utils/time"
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

  const t = await getTranslations("page-latest")

  const blogPosts = await getBlogPostsData(locale)

  const { contributors } = await getAppPageContributorInfo(
    "latest",
    locale as Lang
  )

  return (
    <>
      <BlogPageJsonLD
        locale={locale}
        blogPosts={blogPosts}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{ slug: "latest" }}
        heroImg={heroImg}
        title={t("page-latest-title")}
        description={t("page-latest-subtitle")}
        variant="no-divider"
      />

      <MainArticle className="mx-auto my-page w-full max-w-screen-lg shadow-table-box">
        {blogPosts.length === 0 ? (
          <p className="p-12 text-center text-body-medium">
            {t("page-latest-no-posts")}
          </p>
        ) : (
          blogPosts.map((post) => (
            <BaseLink
              key={post.href}
              href={post.href}
              className="flow block border-b px-page py-8 no-underline duration-100 hover:bg-background-highlight"
              hideArrow
              customEventOptions={{
                eventCategory: "builder-blog",
                eventAction: "click",
                eventName: post.title,
              }}
            >
              <h3 className="text-2xl text-body">{post.title}</h3>
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
                    {t("page-latest-minute-read", {
                      minutes: post.timeToRead,
                    })}
                  </>
                ) : null}
              </p>
              <p className="text-body-medium">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <Tag key={tag} status="tag">
                    {tag}
                  </Tag>
                ))}
              </div>
            </BaseLink>
          ))
        )}
      </MainArticle>

      {/* End-of-page actions */}
      <div className="p-page">
        <ContentFeedback />
      </div>
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
