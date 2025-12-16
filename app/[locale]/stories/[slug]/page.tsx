import { pick } from "lodash"
import { ArrowLeft, MapPin, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { getMetadata } from "@/lib/utils/metadata"
import {
  formatStoryDate,
  getAllStories,
  getCategoryTranslationKey,
  getRelatedStories,
  getStoryBySlug,
} from "@/lib/utils/stories"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import StoryContent from "./_components/StoryContent"
import StoryRelated from "./_components/StoryRelated"

import { routing } from "@/i18n/routing"

interface PageProps {
  params: PageParams & { slug: string }
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = params

  setRequestLocale(locale)

  const story = getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/stories")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({ locale, namespace: "page-stories" })

  const formattedDate = formatStoryDate(story.date, locale)
  const categoryKey = getCategoryTranslationKey(story.category)
  const relatedStories = getRelatedStories(story.slug, story.category, 3)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <MainArticle className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 md:px-8">
        <ButtonLink
          href="/stories/"
          variant="ghost"
          className="mb-8 w-fit gap-2"
          hideArrow
        >
          <ArrowLeft className="size-4" />
          {t("page-stories-back-to-all")}
        </ButtonLink>

        <article>
          <header className="mb-8">
            <p className="mb-2 text-sm font-medium uppercase text-primary">
              {t(categoryKey)}
            </p>
            <h1 className="mb-4 text-3xl font-black md:text-4xl lg:text-5xl">
              {story.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-body-medium">
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>{story.location.country}</span>
              </div>
              {story.role && (
                <span className="before:mr-4 before:content-['·']">
                  {story.role}
                </span>
              )}
              <span className="before:mr-4 before:content-['·']">
                {formattedDate}
              </span>
            </div>
          </header>

          <StoryContent story={story} locale={locale as Lang} />

          {story.relatedPages.length > 0 && (
            <div className="mt-8 border-t pt-8">
              <h3 className="mb-4 text-lg font-bold">
                {t("page-stories-related-pages")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {story.relatedPages.map((page) => (
                  <ButtonLink
                    key={page}
                    href={page}
                    variant="outline"
                    size="sm"
                  >
                    {page.replace(/\//g, "")}
                  </ButtonLink>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4 border-t pt-8">
            <Share2 className="size-5" />
            <span className="font-medium">{t("page-stories-share-story")}</span>
            <div className="flex gap-2">
              <ButtonLink
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://ethereum.org/${locale}/stories/${story.slug}/`)}&text=${encodeURIComponent(`${story.name}'s story on how Ethereum changed their life`)}`}
                variant="outline"
                size="sm"
                hideArrow
              >
                {t("page-stories-share-twitter")}
              </ButtonLink>
            </div>
          </div>
        </article>

        {relatedStories.length > 0 && <StoryRelated stories={relatedStories} />}
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const stories = getAllStories()
  return routing.locales.flatMap((locale) =>
    stories.map((story) => ({
      locale,
      slug: story.slug,
    }))
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = params

  const story = getStoryBySlug(slug)

  if (!story) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "page-stories" })

  return await getMetadata({
    locale,
    slug: ["stories", slug],
    title: `${story.name}'s Story | ${t("page-stories-title")}`,
    description: story.storyEnglish.substring(0, 160) + "...",
  })
}
