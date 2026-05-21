import { pick } from "lodash"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { VideoFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import mdComponents, { htmlElements } from "@/components/MdComponents"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import YouTube from "@/components/YouTube"

import { formatDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import VideoPageJsonLD from "./page-jsonld"

import {
  getCompiledVideo,
  getEnglishVideoSlugs,
} from "@/lib/md/getCompiledPage"
import MdxContent from "@/lib/md/MdxContent"

const VideoLandingPage = async (props: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await props.params

  const video = getCompiledVideo(locale, slug)
  if (!video) notFound()

  const t = await getTranslations("page-videos")
  setRequestLocale(locale)

  // Has-transcript check uses the raw markdown body (compiled body always
  // emits framing code even for empty input).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBody: string = (video as any).rawBody ?? ""
  const hasTranscript = rawBody.trim().length > 0

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/videos/")
  const messages = pick(allMessages, requiredNamespaces)

  const breadcrumbSlug =
    "/videos/" + (video.breadcrumb || slug.replaceAll("-", " "))

  // Promote h1 → h2 inside the transcript accordion (the page already has its
  // own h1 for the video title).
  const transcriptComponents = {
    ...mdComponents,
    h1: htmlElements.h2,
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <VideoPageJsonLD
        locale={locale}
        slug={slug}
        frontmatter={video as unknown as VideoFrontmatter}
        transcript={hasTranscript ? rawBody : null}
      />

      <MainArticle className="max-w-4xl space-y-8 px-4 md:px-8">
        <Breadcrumbs slug={breadcrumbSlug} startDepth={1} className="mt-11" />

        <div className="sticky top-24 z-10 md:static">
          <YouTube
            id={video.youtubeId ?? ""}
            title={video.title ?? ""}
            className="max-w-full"
          />
        </div>

        <div className="space-y-4">
          <h1>{video.title}</h1>

          <p className="text-lg text-body-medium">{video.description}</p>

          <p className="text-body-medium">
            {t("page-videos-date-published")}:{" "}
            {video.uploadDate
              ? formatDate(video.uploadDate, locale, { timeZone: "UTC" })
              : ""}
          </p>
        </div>

        {hasTranscript && (
          <Accordion type="single" collapsible>
            <AccordionItem value="transcript">
              <AccordionTrigger className="py-4">
                <h2 className="text-xl">{t("page-videos-view-transcript")}</h2>
              </AccordionTrigger>
              <AccordionContent className="text-base [[data-state=closed]_&]:invisible [[data-state=closed]_&]:h-0">
                <MdxContent
                  body={video.body}
                  components={transcriptComponents}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <FeedbackCard />
      </MainArticle>
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return getEnglishVideoSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await props.params

  const video = getCompiledVideo(locale, slug)
  if (!video) {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }

  return getMetadata({
    locale,
    slug: ["videos", slug],
    title: `${video.title} | ethereum.org`,
    description: video.description ?? "",
  })
}

export default VideoLandingPage
