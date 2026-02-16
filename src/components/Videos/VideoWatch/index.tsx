import { getTranslations } from "next-intl/server"

import { LinkWithArrow } from "@/components/ui/Link"
import YouTube from "@/components/YouTube"

import { getVideoBySlug } from "@/lib/utils/videos"

interface VideoWatchProps {
  slug: string
}

const VideoWatch = async ({ slug }: VideoWatchProps) => {
  const video = await getVideoBySlug(slug)

  if (!video) {
    return null
  }

  const t = await getTranslations("page-videos")

  return (
    <div className="my-8">
      <YouTube id={video.youtubeId} title={video.title} className="mb-0" />
      <div className="mt-4 max-w-[560px]">
        <h3 className="text-lg font-semibold text-body">{video.title}</h3>
        <p className="mt-2 text-sm text-body-medium">{video.description}</p>
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
