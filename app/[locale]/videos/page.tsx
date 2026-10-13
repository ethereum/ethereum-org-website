import { pick } from "lodash"
import type { Metadata } from "next"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getVideos } from "@/lib/utils/videos"

import VideoGalleryFilter from "./_components/VideoGalleryFilter"
import { VIDEO_CATEGORIES } from "./constants"
import PageJsonLD from "./page-jsonld"

import { routing } from "@/i18n/routing"

const VideoGalleryPage = async (props: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const videos = await getVideos(locale)
  const t = await getTranslations("page-videos")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/videos/")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <>
      <PageJsonLD locale={locale} videos={videos} />

      <PageHero
        breadcrumbs={{ slug: "/videos/" }}
        title={t("page-videos-hero-title")}
        description={t("page-videos-hero-description")}
        variant="no-divider"
      />

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="flow p-page">
          <Section id="videos">
            <VideoGalleryFilter videos={videos} categories={VIDEO_CATEGORIES} />
          </Section>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params

  setRequestLocale(locale)

  const t = await getTranslations("page-videos")

  return await getMetadata({
    locale,
    slug: ["videos"],
    title: t("page-videos-meta-title"),
    description: t("page-videos-meta-description"),
  })
}

export default VideoGalleryPage
