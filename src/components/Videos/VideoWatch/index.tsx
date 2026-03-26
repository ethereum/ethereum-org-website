import { getTranslations } from "next-intl/server"

import type { VideoMeta } from "@/lib/types"

import { LinkWithArrow } from "@/components/ui/Link"
import YouTube from "@/components/YouTube"

import { getVideoBySlug } from "@/lib/utils/videos"
import { getVideoMeta } from "@/lib/utils/videoTranscripts"

interface VideoWatchProps {
  slug: string
  startTime?: string
}

/**
 * Server Component — inline video embed for MDX content pages.
 * Fetches title + description from transcript frontmatter (i18n-ready).
 *
 * Registered in [locale]/[...slug]/page.tsx baseComponents (server-only context).
 * NOT imported from MdComponents/index.tsx to avoid polluting the client-safe barrel.
 */
const VideoWatch = async ({ slug, startTime }: VideoWatchProps) => {
  const video = await getVideoBySlug(slug)

  if (!video) {
    return null
  }

  let meta: VideoMeta
  try {
    meta = await getVideoMeta(slug)
  } catch {
    return null
  }

  const t = await getTranslations("page-videos")

  return (
    <div className="my-8">
      <YouTube
        id={video.youtubeId}
        title={meta.title}
        className="mb-0"
        start={startTime}
      />
      <div className="mt-4 max-w-[560px]">
        <h3 className="text-lg font-semibold text-body">{meta.title}</h3>
        <p className="mt-2 text-sm text-body-medium">
          {meta.description.split(/(?<=\.)\s/)[0]}
        </p>
        <LinkWithArrow
          href={`/videos/${video.slug}/`}
          className="mt-3 inline-block text-sm font-medium"
        >
          {t("page-videos-watch-with-transcript")}
        </LinkWithArrow>
      </div>
    </div>
  )
}

export default VideoWatch
