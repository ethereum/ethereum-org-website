import { pick } from "lodash"
import type { Metadata } from "next"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { VideoWithMeta } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import SimpleHero from "@/components/Hero/SimpleHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"
import VideoGalleryFilter from "@/components/Videos/VideoGalleryFilter"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getVideos, VIDEO_CATEGORIES } from "@/lib/utils/videos"
import { getVideoMeta } from "@/lib/utils/videoTranscripts"

import { routing } from "@/i18n/routing"

const VideoGalleryPage = async (props: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const videos = await getVideos()
  const t = await getTranslations({ locale, namespace: "page-videos" })

  // Merge translatable metadata (title + description from transcript frontmatter)
  // into each video object for the client-side filter component
  const videosWithMeta: VideoWithMeta[] = await Promise.all(
    videos.map(async (video) => {
      const meta = await getVideoMeta(video.slug, locale)
      return { ...video, ...meta }
    })
  )

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/videos/")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="space-y-12">
        {/* Hero Section */}
        <SimpleHero
          breadcrumbs={<Breadcrumbs slug="videos" />}
          title={t("page-videos-hero-title")}
          subtitle={t("page-videos-hero-description")}
        />

        {/* All Videos — Client-side filter island */}
        <Section id="videos" className="space-y-6 px-4 md:px-8">
          <VideoGalleryFilter
            videos={videosWithMeta}
            categories={VIDEO_CATEGORIES}
          />
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
