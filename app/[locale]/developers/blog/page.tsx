import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

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

import BlogPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/developers/blog/builder-blog-hero.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-developers-blog")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/developers/blog")
  const messages = pick(allMessages, requiredNamespaces)

  const blogPosts = await getBlogPostsData(locale)

  const { contributors } = await getAppPageContributorInfo(
    "developers/blog",
    locale as Lang
  )

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "developers/blog", startDepth: 1 },
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
          <div className="w-full max-w-screen-lg px-8 py-10">
            {blogPosts.length === 0 ? (
              <p className="text-center text-body-medium">
                {t("page-blog-no-posts")}
              </p>
            ) : (
              <div className="rounded-2xl shadow-table-box">
                {blogPosts.map((post) => (
                  <BaseLink
                    key={post.href}
                    href={post.href}
                    className="block w-full space-y-4 border-b p-8 no-underline duration-100 hover:bg-background-highlight"
                    hideArrow
                    customEventOptions={{
                      eventCategory: "builder-blog",
                      eventAction: "click",
                      eventName: post.title,
                    }}
                  >
                    <div className="flex flex-col items-start justify-between gap-y-2 md:flex-row">
                      <h3 className="me-0 text-2xl font-semibold text-body md:me-24">
                        {post.title}
                      </h3>
                      <span className="shrink-0 text-xs text-body-medium">
                        {post.timeToRead} {t("page-blog-minute-read")}
                      </span>
                    </div>
                    <p className="text-sm text-body-medium uppercase">
                      {post.author}
                      {post.team ? ` · ${post.team}` : ""}
                      {" · "}
                      {getLocaleTimestamp(locale as Lang, post.published)}
                    </p>
                    <p className="text-body-medium">{post.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <Tag key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </BaseLink>
                ))}
              </div>
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

  return await getMetadata({
    locale,
    slug: ["developers", "blog"],
    title: t("page-blog-meta-title"),
    description: t("page-blog-meta-description"),
  })
}

export default Page
