import type { Video } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

/**
 * Convert duration from "H:MM:SS" or "M:SS" format to ISO 8601 (PTxHxMxS)
 */
function toIsoDuration(duration: string): string {
  const parts = duration.split(":").map(Number)
  if (parts.length === 3) {
    const [h, m, s] = parts
    return `PT${h > 0 ? `${h}H` : ""}${m}M${s}S`
  }
  if (parts.length === 2) {
    const [m, s] = parts
    return `PT${m}M${s}S`
  }
  return duration
}

/**
 * Strip MDX/Markdown syntax from transcript to produce plain text
 * for the JSON-LD transcript field.
 */
function stripMdx(mdx: string): string {
  return mdx
    .replace(/^#{1,6}\s+/gm, "") // Remove heading markers
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Bold → plain
    .replace(/\*([^*]+)\*/g, "$1") // Italic → plain
    .replace(/`([^`]+)`/g, "$1") // Inline code → plain
    .replace(/^\s*[-*+]\s+/gm, "") // List markers → plain
    .replace(/^\s*\d+\.\s+/gm, "") // Ordered list markers → plain
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links → text only
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // Images → remove
    .replace(/\n{3,}/g, "\n\n") // Collapse excess newlines
    .trim()
}

export default function VideoPageJsonLD({
  locale,
  video,
  transcript,
}: {
  locale: string
  video: Video
  transcript: string | null
}) {
  const url = normalizeUrlForJsonLd(locale, `/videos/${video.slug}/`)

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: video.title,
    description: video.description,
    uploadDate: `${video.uploadDate}T00:00:00+00:00`,
    duration: toIsoDuration(video.duration),
    thumbnailUrl:
      video.thumbnailUrl ||
      `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    educationalLevel: video.educationLevel,
    inLanguage: video.language,
    creator: {
      "@type": "Person",
      name: video.author,
    },
    publisher: ethereumFoundationOrganization,
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  }

  // Add transcript as plain text if available
  if (transcript) {
    // Escape < and / to prevent script injection (XSS protection)
    jsonLd.transcript = stripMdx(transcript)
      .replace(/</g, "\\u003c")
      .replace(/\//g, "\\u002f")
  }

  return <PageJsonLD structuredData={jsonLd} />
}
