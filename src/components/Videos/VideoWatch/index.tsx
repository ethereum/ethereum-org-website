import { getTranslations } from "next-intl/server"

import type { VideoData } from "@/lib/types"

import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { LinkWithArrow } from "@/components/ui/Link"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"
import { getVideoData } from "@/lib/utils/videos"

interface VideoWatchProps {
  slug: string
  startTime?: string
  className?: string
}

/**
 * Server Component -- inline video embed for MDX content pages.
 * Fetches title + description from index.md frontmatter (i18n-ready).
 *
 * Registered in [locale]/[...slug]/page.tsx baseComponents (server-only context).
 * NOT imported from MdComponents/index.tsx to avoid polluting the client-safe barrel.
 */
const VideoWatch = async ({ slug, startTime, className }: VideoWatchProps) => {
  let data: VideoData | undefined
  try {
    data = await getVideoData(slug)
  } catch {
    return null
  }

  const { frontmatter, content } = data
  const hasTranscript = content.trim().length > 0

  const t = await getTranslations("page-videos")

  return (
    <Card
      className={cn(
        "my-8 max-w-xl space-y-4 border bg-background-highlight p-4 md:p-6",
        className
      )}
    >
      <YouTube
        id={frontmatter.youtubeId}
        title={frontmatter.title}
        className="m-0 overflow-hidden rounded-md"
        start={startTime}
      />
      <CardContent className="p-0">
        <CardTitle variant="semibold">{frontmatter.title}</CardTitle>
        <CardParagraph variant="light">
          {frontmatter.description.split(/(?<=\.)\s/)[0]}
        </CardParagraph>
        {hasTranscript && (
          <LinkWithArrow href={`/videos/${slug}/`}>
            {t("page-videos-watch-with-transcript")}
          </LinkWithArrow>
        )}
      </CardContent>
    </Card>
  )
}

export default VideoWatch
