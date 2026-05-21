import { getTranslations } from "next-intl/server"

import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { LinkWithArrow } from "@/components/ui/Link"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"

import { getCompiledVideo } from "@/lib/md/getCompiledPage"

interface VideoWatchProps {
  slug: string
  startTime?: string
  className?: string
}

/**
 * Server Component -- inline video embed for MDX content pages.
 * Pulls title + description from the Velite-compiled video entry.
 *
 * Registered in [locale]/[...slug]/page.tsx baseComponents (server-only context).
 * NOT imported from MdComponents/index.tsx to avoid polluting the client-safe barrel.
 */
const VideoWatch = async ({ slug, startTime, className }: VideoWatchProps) => {
  const video = getCompiledVideo("en", slug)
  if (!video) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBody: string = (video as any).rawBody ?? ""
  const hasTranscript = rawBody.trim().length > 0

  const t = await getTranslations("page-videos")

  return (
    <Card
      className={cn(
        "my-8 max-w-xl space-y-4 border bg-background-highlight p-4 md:p-6",
        className
      )}
    >
      <YouTube
        id={video.youtubeId ?? ""}
        title={video.title ?? ""}
        className="m-0 overflow-hidden rounded-md"
        start={startTime}
      />
      <CardContent className="p-0">
        <CardTitle variant="semibold">{video.title}</CardTitle>
        <CardParagraph variant="light">
          {(video.description ?? "").split(/(?<=\.)\s/)[0]}
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
