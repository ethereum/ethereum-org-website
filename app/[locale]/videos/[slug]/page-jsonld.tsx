import type { VideoFrontmatter } from "@/lib/interfaces"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { stripMarkdown } from "@/lib/utils/md"
import { toIsoDuration } from "@/lib/utils/time"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"
import { getDefaultThumbnailUrl } from "@/lib/utils/videos"

export default function VideoPageJsonLD({
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

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: frontmatter.title,
    description: frontmatter.description,
    uploadDate: `${frontmatter.uploadDate}T00:00:00+00:00`,
    duration: toIsoDuration(frontmatter.duration),
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
    publisher: ethereumFoundationOrganization,
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  }

  // Add transcript as plain text if available
  if (transcript) {
    // Escape < and / to prevent script injection (XSS protection)
    jsonLd.transcript = stripMarkdown(transcript, true)
      .replace(/</g, "\\u003c")
      .replace(/\//g, "\\u002f")
  }

  return <PageJsonLD structuredData={jsonLd} />
}
