import { getTranslations } from "next-intl/server"

import type { VideoFrontmatter } from "@/lib/interfaces"

import PageJsonLD from "@/components/PageJsonLD"

import { stripMarkdown } from "@/lib/utils/md"
import { toIsoDuration } from "@/lib/utils/time"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"
import { getDefaultThumbnailUrl } from "@/lib/utils/videos"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"

export default async function VideoPageJsonLD({
  locale,
  slug,
  frontmatter,
  transcript,
}: {
  locale: string
  slug: string
  frontmatter: VideoFrontmatter
  transcript: string | null
}) {
  const url = normalizeUrlForJsonLd(locale, `/videos/${slug}/`)
  const videoGalleryUrl = normalizeUrlForJsonLd(locale, "/videos/")

  const t = await getTranslations("page-videos")

  const videoObjectId = { "@id": `${url}#video` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      // Type-assertion node for "isPartOf" references
      { "@type": "VideoGallery", "@id": videoGalleryUrl },
      {
        "@type": "WebPage",
        "@id": url,
        name: frontmatter.title,
        description: frontmatter.description,
        url: url,
        inLanguage: locale,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: normalizeUrlForJsonLd(locale, "/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: t("page-videos-hero-title"),
              item: videoGalleryUrl,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: frontmatter.breadcrumb || frontmatter.title,
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: videoObjectId,
      },
      {
        "@type": "VideoObject",
        ...videoObjectId,
        name: frontmatter.title,
        description: frontmatter.description,
        uploadDate: `${frontmatter.uploadDate}T00:00:00+00:00`,
        duration: toIsoDuration(frontmatter.duration),
        isPartOf: { "@id": videoGalleryUrl },
        thumbnailUrl:
          frontmatter.customThumbnailUrl ||
          getDefaultThumbnailUrl(frontmatter.youtubeId),
        embedUrl: `https://www.youtube.com/embed/${frontmatter.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${frontmatter.youtubeId}`,
        educationalLevel: frontmatter.educationLevel,
        inLanguage: frontmatter.lang,
        creator: {
          "@type": "Person",
          name: frontmatter.author,
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        isAccessibleForFree: true,
        isFamilyFriendly: true,
        // Add transcript as plain text if available
        transcript: transcript
          ? stripMarkdown(transcript, true)
              // Escape < and / to prevent script injection (XSS protection)
              .replace(/</g, "\\u003c")
              .replace(/\//g, "\\u002f")
          : undefined,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
