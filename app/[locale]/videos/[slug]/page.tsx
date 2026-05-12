import { pick } from "lodash"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

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
  getVideoDataFromFumadocs,
  getVideoPageFromFumadocs,
  getVideoSlugsFromFumadocs,
} from "@/lib/poc-fumadocs/videos"

const VideoLandingPage = async (props: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await props.params

  const t = await getTranslations("page-videos")
  setRequestLocale(locale)

  const data = await getVideoDataFromFumadocs(slug, locale)
  if (!data) notFound()

  const { frontmatter } = data
  const transcriptPage = getVideoPageFromFumadocs(slug, locale)
  const transcriptLoaded = transcriptPage
    ? await (
        transcriptPage.data as unknown as {
          load: () => Promise<{
            body: (p: {
              components: Record<string, unknown>
            }) => React.ReactNode
            toc?: unknown[]
          }>
        }
      ).load()
    : null
  // toc presence is a reasonable proxy for "this page has transcript content"
  // — bare-metadata video pages have no markdown body and therefore no toc.
  const hasTranscript = Boolean(
    transcriptLoaded?.toc && transcriptLoaded.toc.length > 0
  )
  const TranscriptBody = transcriptLoaded?.body

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/videos/")
  const messages = pick(allMessages, requiredNamespaces)

  const breadcrumbSlug =
    "/videos/" + (frontmatter.breadcrumb || slug.replaceAll("-", " "))

  return (
    <I18nProvider locale={locale} messages={messages}>
      {/* PoC: transcript is dropped from JSON-LD because the raw markdown
          body is no longer read at request time. Rendered transcript below
          still shows for users; re-add to structured data via a fumadocs
          `_markdown` export (`includeProcessedMarkdown: true`) when needed. */}
      <VideoPageJsonLD
        locale={locale}
        slug={slug}
        frontmatter={frontmatter}
        transcript={null}
      />

      <MainArticle className="max-w-4xl space-y-8 px-4 md:px-8">
        <Breadcrumbs slug={breadcrumbSlug} startDepth={1} className="mt-11" />

        <div className="sticky top-24 z-10 md:static">
          <YouTube
            id={frontmatter.youtubeId}
            title={frontmatter.title}
            className="max-w-full"
          />
        </div>

        <div className="space-y-4">
          <h1>{frontmatter.title}</h1>

          <p className="text-lg text-body-medium">{frontmatter.description}</p>

          <p className="text-body-medium">
            {t("page-videos-date-published")}:{" "}
            {formatDate(frontmatter.uploadDate, locale, { timeZone: "UTC" })}
          </p>
        </div>

        {hasTranscript && TranscriptBody && (
          <Accordion type="single" collapsible>
            <AccordionItem value="transcript">
              <AccordionTrigger className="py-4">
                <h2 className="text-xl">{t("page-videos-view-transcript")}</h2>
              </AccordionTrigger>
              {/* forceMount keeps transcript in DOM for SEO crawlers */}
              <AccordionContent
                className="text-base [[data-state=closed]_&]:invisible [[data-state=closed]_&]:h-0"
                forceMount
              >
                <TranscriptBody
                  components={{ ...mdComponents, h1: htmlElements.h2 }}
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
  const slugs = getVideoSlugsFromFumadocs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await props.params

  const data = await getVideoDataFromFumadocs(slug, locale)
  if (!data) {
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
