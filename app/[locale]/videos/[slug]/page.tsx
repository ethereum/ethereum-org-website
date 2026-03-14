import { pick } from "lodash"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import FeedbackCard from "@/components/FeedbackCard"
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
import { Transcript } from "@/components/Videos"
import TranscriptContent from "@/components/Videos/Transcript/TranscriptContent"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getVideoBySlug, getVideos } from "@/lib/utils/videos"
import { getTranscript } from "@/lib/utils/videoTranscripts"

import VideoPageJsonLD from "./page-jsonld"

const VideoLandingPage = async ({
  params,
}: {
  params: { locale: string; slug: string }
}) => {
  const { locale, slug } = params

  setRequestLocale(locale)

  const video = await getVideoBySlug(slug)

  if (!video) {
    notFound()
  }

  // Fetch transcript MDX — graceful handling if not found
  let transcriptMdx: string | null = null
  try {
    transcriptMdx = await getTranscript(slug, locale)
  } catch {
    // Transcript not found — render page without accordion
    // This is expected for videos with no transcript file
  }

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/videos/")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <VideoPageJsonLD
        locale={locale}
        video={video}
        transcript={transcriptMdx}
      />
      <MainArticle className="px-8 py-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/videos/">VIDEOS</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="me-[0.625rem] ms-[0.625rem] text-gray-400">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>
                {params.slug.replaceAll("-", " ")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Video Title */}
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{video.title}</h1>

        {/* Video Description */}
        <p className="mb-8 text-lg text-body-medium">{video.description}</p>

        {/* YouTube Player */}
        <div className={cn("sticky top-24 z-10 mb-8 md:static")}>
          <YouTube
            id={video.youtubeId}
            title={video.title}
            className="max-w-3xl"
          />
        </div>

        {/* Transcript Accordion */}
        {transcriptMdx && (
          <Transcript>
            <TranscriptContent source={transcriptMdx} />
          </Transcript>
        )}

        {/* Feedback Card */}
        <FeedbackCard />
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const videos = await getVideos()
  return videos.map((video) => ({ slug: video.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const { locale, slug } = params

  const video = await getVideoBySlug(slug)

  if (!video) {
    const t = await getTranslations({ locale, namespace: "common" })
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }

  return await getMetadata({
    locale,
    slug: ["videos", slug],
    title: `${video.title} | ethereum.org`,
    description: video.description,
  })
}

export default VideoLandingPage
