import { pick } from "lodash"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { VideoData } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import { SimpleHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { htmlElements } from "@/components/MdComponents"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"
import { formatDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getVideoData, getVideoSlugs } from "@/lib/utils/videos"

import { DEFAULT_LOCALE } from "@/lib/constants"

import VideoPageJsonLD from "./page-jsonld"

import { renderSimpleMarkdown } from "@/lib/md/renderSimple"

const VideoLandingPage = async (props: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await props.params

  const t = await getTranslations({ locale, namespace: "page-videos" })
  setRequestLocale(locale)

  let data: VideoData | undefined
  try {
    data = await getVideoData(slug, locale)
  } catch {
    notFound()
  }

  const { frontmatter } = data
  const transcriptMdx = data.content.trim() ? data.content : null

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/videos/")
  const messages = pick(allMessages, requiredNamespaces)

  const breadcrumbSlug =
    "/videos/" + (frontmatter.breadcrumb || slug.replaceAll("-", " "))

  return (
    <I18nProvider locale={locale} messages={messages}>
      <VideoPageJsonLD
        locale={locale}
        slug={slug}
        frontmatter={frontmatter}
        transcript={transcriptMdx}
      />
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug={breadcrumbSlug} startDepth={1} />}
        title={frontmatter.title}
        subtitle={
          <p className="text-lg text-body-medium">{frontmatter.description}</p>
        }
        className="max-w-3xl md:w-full"
      />

      <MainArticle className="max-w-4xl space-y-8 px-4 md:px-8">
        <h2 className="sr-only">{t("page-videos-watch-video")}</h2>
        <div className={cn("sticky top-24 z-10 md:static")}>
          <YouTube
            id={frontmatter.youtubeId}
            title={frontmatter.title}
            className="max-w-full"
          />
        </div>

        <p className="text-body-medium">
          {t("page-videos-date-published")}:{" "}
          {/* // TODO: Update to use dateTimeFormat when #17791 merged */}
          {formatDate(frontmatter.uploadDate, locale, { timeZone: "UTC" })}
        </p>

        {transcriptMdx && transcriptMdx.trim().length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="transcript">
              <AccordionTrigger className="py-4">
                <h2 className="text-xl">{t("view-transcript")}</h2>
              </AccordionTrigger>
              {/* forceMount keeps transcript in DOM for SEO crawlers */}
              <AccordionContent
                className="text-base [[data-state=closed]_&]:invisible [[data-state=closed]_&]:h-0"
                forceMount
              >
                {await renderSimpleMarkdown(transcriptMdx, {
                  h1: htmlElements.h2,
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <FeedbackCard />
      </MainArticle>
    </I18nProvider>
  )
}

// Only pre-render English video pages at build time (42 pages).
// Other locale variants render on-demand via SSR and are cached by Next.js.
// This avoids 42 slugs x 25 locales = 1,050 pages at build time.
export async function generateStaticParams() {
  const slugs = await getVideoSlugs()
  return slugs.map((slug) => ({ locale: DEFAULT_LOCALE, slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await props.params

  let data
  try {
    data = await getVideoData(slug, locale)
  } catch {
    const t = await getTranslations({ locale, namespace: "common" })
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
