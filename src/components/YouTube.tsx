import React from "react"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { Box } from "@chakra-ui/react"

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

/**
 * @param {id} ID of the YouTube video
 * URLs come in format: https://www.youtube.com/watch?v=<id> or https://www.youtube.com/embed/<id>
 * e.g. For https://www.youtube.com/watch?v=H-O3r2YMWJ4 the `id` is H-O3r2YMWJ4
 * @param {start} Start time of the video in seconds
 * URLs come in format: https://www.youtube.com/watch?v=<id>&t=<start> or: https://www.youtube.com/embed/<id>?start=<start>
 * e.g. For https://www.youtube.com/watch?v=H-O3r2YMWJ4&t=123 the `start` is 123 (which means 123 seconds)
 * @returns Embedded YouTube video component
 */

type YouTubeProps = {
  id: string
  start?: string
  title?: string
}

const YouTube = ({ id, start = "0", title = "YouTube" }: YouTubeProps) => {
  const params = new URLSearchParams()
  ;+start > 0 && params.set("start", start)
  return (
    <Box as="figure" maxW={560} my={8}>
      <LiteYouTubeEmbed
        aspectHeight={9}
        aspectWidth={16}
        id={id}
        title={title}
        params={params.toString()}
        noCookie
      />
    </Box>
  )
}

export default YouTube
