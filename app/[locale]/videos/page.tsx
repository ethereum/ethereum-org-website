import { pick } from "lodash"
import type { Metadata } from "next"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import Breadcrumbs from "@/components/Breadcrumbs"
import SimpleHero from "@/components/Hero/SimpleHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getVideos } from "@/lib/utils/videos"

import { routing } from "@/i18n/routing"

const VideoGalleryPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params

  setRequestLocale(locale)

  const videos = await getVideos()
  const t = await getTranslations({ locale, namespace: "page-videos" })

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

        {/* Video Grid */}
        <Section
          id="videos"
          className="grid grid-cols-fill-3 gap-8 px-4 md:gap-12 md:px-8"
        >
          <h2 className="sr-only">{t("page-videos-videos-section-header")}</h2>
          {videos.map((video) => (
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
                  loading="lazy"
                />
              </CardBanner>
              <CardContent>
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardParagraph
                  variant="light"
                  size="sm"
                  className="line-clamp-2"
                >
                  {video.description}
                </CardParagraph>
                <CardParagraph variant="light" size="sm">
                  {video.duration}
                </CardParagraph>
              </CardContent>
            </Card>
          ))}
        </Section>
      </MainArticle>
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-videos" })

  return await getMetadata({
    locale,
    slug: ["videos"],
    title: t("page-videos-meta-title"),
    description: t("page-videos-meta-description"),
  })
}

export default VideoGalleryPage
