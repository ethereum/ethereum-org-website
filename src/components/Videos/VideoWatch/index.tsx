import { getTranslations } from "next-intl/server"

import type { VideoData } from "@/lib/types"

import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { LinkWithArrow } from "@/components/ui/Link"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"
import { getVideoData } from "@/lib/utils/videos"

// TODO: Accept `portrait` prop and pass to YouTube component
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
    <Card className={cn("my-8 max-w-xl border", className)}>
      <CardHeader>
        <CardBanner background="none" size="full">
          <YouTube
            id={frontmatter.youtubeId}
            title={frontmatter.title}
            start={startTime}
          />
        </CardBanner>
      </CardHeader>

      <CardContent spacing="sm">
        <CardTitle variant="semibold">{frontmatter.title}</CardTitle>
        <CardParagraph>
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
