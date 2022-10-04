import React from "react"
import { Box } from "@chakra-ui/react"

/**
 * @param {id} ID of the YouTube video
 * URLs come in format: https://www.youtube.com/watch?v=<id> or https://www.youtube.com/embed/<id>
 * e.g. For https://www.youtube.com/watch?v=H-O3r2YMWJ4 the `id` is H-O3r2YMWJ4
 * @param {start} Start time of the video in seconds
 * URLs come in format: https://www.youtube.com/watch?v=<id>&t=<start> or: https://www.youtube.com/embed/<id>?start=<start>
 * e.g. For https://www.youtube.com/watch?v=H-O3r2YMWJ4&t=123 the `start` is 123 (which means 123 seconds)
 * @returns Embedded YouTube video component
 */

export interface IProps {
  id: string
  start?: string
  title?: string
}

const YouTube: React.FC<IProps> = ({ id, start = "0", title = "YouTube" }) => {
  const startQuery = parseInt(start) > 0 ? `?start=${start}` : ""
  const baseUrl = "https://www.youtube.com/embed/"
  const src = baseUrl + id + startQuery
  return (
    <Box as="figure" display="block" my={4}>
      <iframe
        width="100%"
        height="315"
        src={src}
        frameBorder="0"
        title={title}
        allow="
      accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  )
}

export default YouTube
