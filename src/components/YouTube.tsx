"use client"

import React from "react"
import LiteYouTubeEmbed from "react-lite-youtube-embed"

import { cn } from "@/lib/utils/cn"

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

/**
 * @param {id} ID of the YouTube video
 * URLs come in format: https://www.youtube.com/watch?v=<id> or https://www.youtube.com/embed/<id>
 * e.g., For https://www.youtube.com/watch?v=H-O3r2YMWJ4 the `id` is H-O3r2YMWJ4
 * @param {start} Start time of the video in seconds
 * URLs come in format: https://www.youtube.com/watch?v=<id>&t=<start> or: https://www.youtube.com/embed/<id>?start=<start>
 * e.g., For https://www.youtube.com/watch?v=H-O3r2YMWJ4&t=123 the `start` is 123 (which means 123 seconds)
 * @param {portrait} boolean used for YouTube Shorts using portrait orientation (default = false)
 * @returns Embedded YouTube video component
 */

type YouTubeProps = {
  id: string
  start?: string
  title?: string
  className?: string
  portrait?: boolean
} & React.ComponentProps<typeof LiteYouTubeEmbed>

const YouTube = ({
  id,
  start = "0",
  title = "YouTube",
  portrait,
  className,
  ...props
}: YouTubeProps) => {
  const params = new URLSearchParams()
  ;+start > 0 && params.set("start", start)
  return (
    <figure
      className={cn(
        "my-8 max-w-[560px]",
        portrait && "aspect-[9/16] max-h-[420px]",
        className
      )}
    >
      <LiteYouTubeEmbed
        aspectHeight={portrait ? 16 : 9}
        aspectWidth={portrait ? 9 : 16}
        id={id}
        title={title}
        params={params.toString()}
        noCookie
        {...props}
      />
    </figure>
  )
}

export default YouTube
