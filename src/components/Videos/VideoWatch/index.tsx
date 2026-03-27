import { getTranslations } from "next-intl/server"

import type { VideoData } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"
import { LinkWithArrow } from "@/components/ui/Link"
import YouTube from "@/components/YouTube"

import { toIsoDuration } from "@/lib/utils/time"
import { getDefaultThumbnailUrl, getVideoData } from "@/lib/utils/videos"

interface VideoWatchProps {
  slug: string
  startTime?: string
}

/**
 * Server Component -- inline video embed for MDX content pages.
 * Fetches title + description from index.md frontmatter (i18n-ready).
 *
 * Registered in [locale]/[...slug]/page.tsx baseComponents (server-only context).
 * NOT imported from MdComponents/index.tsx to avoid polluting the client-safe barrel.
 */
const VideoWatch = async ({ slug, startTime }: VideoWatchProps) => {
  let data: VideoData | undefined
  try {
    data = await getVideoData(slug)
  } catch {
    return null
  }

  const { frontmatter, content } = data
  const hasTranscript = content.trim().length > 0

  const t = await getTranslations("page-videos")

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: frontmatter.title,
    description: frontmatter.description,
    thumbnailUrl:
      frontmatter.customThumbnailUrl ||
      getDefaultThumbnailUrl(frontmatter.youtubeId),
    uploadDate: `${frontmatter.uploadDate}T00:00:00+00:00`,
    duration: toIsoDuration(frontmatter.duration),
    embedUrl: `https://www.youtube.com/embed/${frontmatter.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${frontmatter.youtubeId}`,
    educationalLevel: frontmatter.educationLevel,
    isAccessibleForFree: true,
  }

  return (
    <div className="my-8 max-w-xl space-y-4">
      <PageJsonLD structuredData={videoJsonLd} />
      <YouTube
        id={frontmatter.youtubeId}
        title={frontmatter.title}
        className="mb-0"
        start={startTime}
      />
      <div className="space-y-2">
        <p className="text-lg font-semibold">{frontmatter.title}</p>
        <p className="text-body-medium">
          {frontmatter.description.split(/(?<=\.)\s/)[0]}
        </p>
        {hasTranscript && (
          <LinkWithArrow href={`/videos/${slug}/`}>
            {t("page-videos-watch-with-transcript")}
          </LinkWithArrow>
        )}
      </div>
    </div>
  )
}

export default VideoWatch
