import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { VideoData } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import ContentFeedback from "@/components/ContentFeedback"
import MainArticle from "@/components/MainArticle"
import { htmlElements } from "@/components/MdComponents"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import YouTube from "@/components/YouTube"

import { formatDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getVideoData, getVideoSlugs } from "@/lib/utils/videos"

import VideoPageJsonLD from "./page-jsonld"

import { renderSimpleMarkdown } from "@/lib/md/renderSimple"

const VideoLandingPage = async (props: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await props.params

  const t = await getTranslations("page-videos")
  setRequestLocale(locale)

  let data: VideoData | undefined
  try {
    data = await getVideoData(slug, locale)
  } catch {
    notFound()
  }

  const { frontmatter } = data
  const transcriptMdx = data.content.trim() || null

  const breadcrumbSlug =
    "/videos/" + (frontmatter.breadcrumb || slug.replaceAll("-", " "))

  return (
    <>
      <VideoPageJsonLD
        locale={locale}
        slug={slug}
        frontmatter={frontmatter}
        transcript={transcriptMdx}
      />

      <main className="max-w-4xl p-page pt-hero-2x">
        <MainArticle className="flow">
          <Breadcrumbs slug={breadcrumbSlug} startDepth={1} />

          <div className="sticky top-24 z-10 md:static">
            <YouTube
              id={frontmatter.youtubeId}
              title={frontmatter.title}
              className="max-w-full"
            />
          </div>

          <h1 className="mt-space text-h4">{frontmatter.title}</h1>

          <p className="text-lg text-body-medium">{frontmatter.description}</p>

          <p className="text-body-medium">
            {t("page-videos-date-published")}:{" "}
            {formatDate(frontmatter.uploadDate, locale, { timeZone: "UTC" })}
          </p>

          {transcriptMdx && (
            <Accordion type="single" collapsible>
              <AccordionItem value="transcript">
                <AccordionTrigger className="py-4">
                  <h2 className="text-h5">
                    {t("page-videos-view-transcript")}
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="flow text-base in-data-[state=closed]:invisible in-data-[state=closed]:h-0">
                  {await renderSimpleMarkdown(transcriptMdx, {
                    h1: htmlElements.h2,
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </MainArticle>

        {/* End-of-page actions */}
        <ContentFeedback />
      </main>
    </>
  )
}

export async function generateStaticParams() {
  const slugs = await getVideoSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await props.params

  let data
  try {
    data = await getVideoData(slug, locale)
  } catch {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }

  return await getMetadata({
    locale,
    slug: ["videos", slug],
    title: `${data.frontmatter.title} | ethereum.org`,
    description: data.frontmatter.description,
  })
}

export default VideoLandingPage
