import { pick } from "lodash"
import type { Metadata } from "next"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import SimpleHero from "@/components/Hero/SimpleHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import VideoCard from "@/components/Videos/VideoCard"

import { cn } from "@/lib/utils/cn"
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
      <MainArticle className="px-8 py-4">
        {/* Hero Section */}
        <SimpleHero
          breadcrumbs={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ETHEREUM.ORG</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="me-[0.625rem] ms-[0.625rem] text-gray-400">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>VIDEOS</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
          title={t("page-videos-hero-title")}
          subtitle={t("page-videos-hero-description")}
        />

        {/* Video Grid */}
        <div
          className={cn(
            "mt-12 grid gap-8",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {videos.map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>
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
