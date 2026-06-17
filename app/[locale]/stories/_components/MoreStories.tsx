import { Timer } from "lucide-react"

import type { VideoCardData } from "@/lib/types"

import { Image } from "@/components/Image"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"

type MoreStoriesProps = {
  videos: VideoCardData[]
}

// Card markup mirrors the /videos gallery grid (intentionally duplicated).
const MoreStories = ({ videos }: MoreStoriesProps) => {
  if (videos.length === 0) return null

  return (
    <Grid columns={3}>
      {videos.map((video) => (
        <Card
          key={video.slug}
          href={`/videos/${video.slug}/`}
          variant="ghost"
          size="sm"
        >
          <CardBanner className="aspect-video h-auto">
            {video.thumbnailUrl ? (
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                width={480}
                height={270}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                loading="lazy"
              />
            ) : (
              <div className="size-full bg-background-highlight" />
            )}
          </CardBanner>
          <CardContent>
            <CardTitle>{video.title}</CardTitle>
            <CardParagraph size="sm" className="line-clamp-2">
              {video.description}
            </CardParagraph>
            <CardParagraph size="sm" className="inline-flex items-center gap-1">
              <Timer className="-ms-px mb-0.75 size-[1em]" />
              {video.duration}
            </CardParagraph>
          </CardContent>
        </Card>
      ))}
    </Grid>
  )
}

export default MoreStories
