"use client"

import * as React from "react"

import type { MatomoEventOptions, Video } from "@/lib/types"

import { Image } from "@/components/Image"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

interface VideoCardProps {
  video: Video
  className?: string
  customEventOptions?: MatomoEventOptions
}

const VideoCard = React.forwardRef<HTMLDivElement, VideoCardProps>(
  ({ video, className, customEventOptions, ...props }, ref) => {
    return (
      <BaseLink
        href={`/videos/${video.slug}/`}
        className={cn(
          "group flex flex-col overflow-hidden rounded-lg no-underline",
          "border border-body-light",
          "transition-all duration-200",
          "hover:-translate-y-0.5 hover:shadow-md",
          "motion-reduce:hover:translate-y-0",
          className
        )}
        customEventOptions={customEventOptions}
        hideArrow
      >
        <div ref={ref} {...props}>
          {/* Thumbnail */}
          <div className="aspect-video w-full overflow-hidden bg-background-highlight">
            <Image
              src={
                video.thumbnailUrl ||
                `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
              }
              alt={video.title}
              width={480}
              height={270}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 motion-reduce:group-hover:scale-100"
              loading="lazy"
            />
          </div>

          {/* Card Content */}
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h2 className="text-lg font-semibold text-body group-hover:underline">
              {video.title}
            </h2>
            <p className="line-clamp-2 text-sm text-body-medium">
              {video.description}
            </p>
            <div className="mt-auto pt-2 text-xs text-body-medium">
              <span>{video.duration}</span>
            </div>
          </div>
        </div>
      </BaseLink>
    )
  }
)
VideoCard.displayName = "VideoCard"

export default VideoCard
