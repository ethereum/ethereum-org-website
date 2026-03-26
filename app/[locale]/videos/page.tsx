import { pick } from "lodash"
import type { Metadata } from "next"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Video } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import SimpleHero from "@/components/Hero/SimpleHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import VideoGalleryFilter from "@/components/Videos/VideoGalleryFilter"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getVideos,
  getVideosByCategory,
  VIDEO_CATEGORIES,
} from "@/lib/utils/videos"

import { routing } from "@/i18n/routing"

/**
 * Renders a grid of video cards. Shared between shelf rows and the
 * "Explore all" / filtered-category grids.
 */
function VideoGrid({
  videos,
  eager = false,
}: {
  videos: Video[]
  eager?: boolean
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, index) => (
        <Card key={video.slug} href={`/videos/${video.slug}/`}>
          <CardBanner className="aspect-video h-auto">
            <Image
              src={
                video.thumbnailUrl ||
                `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
              }
              alt={video.title}
              width={480}
              height={270}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={eager && index < 3 ? "eager" : "lazy"}
            />
          </CardBanner>
          <CardContent>
            <CardTitle className="text-lg">{video.title}</CardTitle>
            <CardParagraph variant="light" size="sm" className="line-clamp-2">
              {video.description}
            </CardParagraph>
            <CardParagraph variant="light" size="sm">
              {video.duration}
            </CardParagraph>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const VideoGalleryPage = async (props: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) => {
  const { locale } = await props.params
  const { category: categoryParam } = await props.searchParams

  setRequestLocale(locale)

  const videos = await getVideos()
  const t = await getTranslations({ locale, namespace: "page-videos" })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/videos/")
  const messages = pick(allMessages, requiredNamespaces)

  // Filtered category view: ?category=use-cases
  const activeCategory = categoryParam
    ? VIDEO_CATEGORIES.find((c) => c.key === categoryParam)
    : undefined

  if (activeCategory) {
    const categoryVideos = getVideosByCategory(videos, [...activeCategory.tags])

    return (
      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="space-y-12">
          <SimpleHero
            breadcrumbs={<Breadcrumbs slug="videos" />}
            title={t(activeCategory.labelKey)}
            subtitle={t("page-videos-hero-description")}
          />

          <Section id={activeCategory.key} className="space-y-6 px-4 md:px-8">
            <ButtonLink variant="ghost" href="/videos/">
              {t("page-videos-back-to-gallery")}
            </ButtonLink>
            <VideoGrid videos={categoryVideos} eager />
          </Section>
        </MainArticle>
      </I18nProvider>
    )
  }

  // Default shelf layout
  const shelves = VIDEO_CATEGORIES.map((category) => {
    const categoryVideos = getVideosByCategory(videos, [...category.tags])
    return { category, videos: categoryVideos }
  }).filter((shelf) => shelf.videos.length >= shelf.category.minVideos)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="space-y-12">
        {/* Hero Section */}
        <SimpleHero
          breadcrumbs={<Breadcrumbs slug="videos" />}
          title={t("page-videos-hero-title")}
          subtitle={t("page-videos-hero-description")}
        />

        {/* Category Shelves */}
        {shelves.map((shelf, shelfIndex) => {
          const displayVideos = shelf.videos.slice(0, 6)
          const hasMore = shelf.videos.length > 6

          return (
            <Section
              key={shelf.category.key}
              id={shelf.category.key}
              className="space-y-6 px-4 md:px-8"
            >
              <h2 className="text-2xl font-bold">
                {t(shelf.category.labelKey)}
              </h2>
              <VideoGrid videos={displayVideos} eager={shelfIndex === 0} />
              {hasMore && (
                <div className="flex justify-center">
                  <ButtonLink
                    variant="outline"
                    isSecondary
                    href={`/videos/?category=${shelf.category.key}`}
                  >
                    {t("page-videos-view-all", {
                      count: shelf.videos.length,
                    })}
                  </ButtonLink>
                </div>
              )}
            </Section>
          )
        })}

        {/* Explore All Videos — Client-side filter island */}
        <Section id="explore-all" className="space-y-6 px-4 md:px-8">
          <h2 className="text-2xl font-bold">
            {t("page-videos-explore-all-title")}
          </h2>
          <VideoGalleryFilter videos={videos} categories={VIDEO_CATEGORIES} />
        </Section>
      </MainArticle>
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params

  const t = await getTranslations({ locale, namespace: "page-videos" })

  return await getMetadata({
    locale,
    slug: ["videos"],
    title: t("page-videos-meta-title"),
    description: t("page-videos-meta-description"),
  })
}

export default VideoGalleryPage
