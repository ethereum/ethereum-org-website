import type { VideoFrontmatter } from "@/lib/interfaces"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
  resolveAuthorsFromFrontmatter,
} from "@/lib/utils/jsonld"
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

  // Resolve a known Person or Organization if one matches the author
  // string. Otherwise fall back to an anonymous Person using the raw
  // value.
  const { graphNodes } = resolveAuthorsFromFrontmatter(frontmatter.author)
  const creator =
    graphNodes.length > 0
      ? { "@id": graphNodes[0]["@id"] }
      : { "@type": "Person" as const, name: frontmatter.author }

  const videoNode: Record<string, unknown> = {
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
    creator,
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  }

  // Add transcript as plain text if available
  if (transcript) {
    // Escape < and / to prevent script injection (XSS protection)
    videoNode.transcript = stripMarkdown(transcript, true)
      .replace(/</g, "\\u003c")
      .replace(/\//g, "\\u002f")
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ethereumFoundationOrganization,
      ethereumCommunityOrganization,
      ...graphNodes,
      videoNode,
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
