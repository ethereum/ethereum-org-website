import React from "react"
import styled from "styled-components"

const Figure = styled.figure`
  display: block;
  margin: 1rem 0;
`

/**
 * @param {id} ID of the YouTube video
 * URLs come in format: https://www.youtube.com/watch?v=<id> or https://www.youtube.com/embed/<id>
 * e.g. For https://www.youtube.com/watch?v=H-O3r2YMWJ4 the `id` is H-O3r2YMWJ4
 * @param {start} Start time of the video in seconds
 * URLs come in format: https://www.youtube.com/watch?v=<id>&t=<start> or: https://www.youtube.com/embed/<id>?start=<start>
 * e.g. For https://www.youtube.com/watch?v=H-O3r2YMWJ4&t=123 the `start` is 123 (which means 123 seconds)
 * @returns Embedded YouTube video component
 */
const YouTube = ({ id, start, title }) => {
  const startQuery = parseInt(start) > 0 ? `?start=${start}` : ""
  const baseUrl = "https://www.youtube.com/embed/"
  const src = baseUrl + id + startQuery
  return (
    <Figure>
      <iframe
        width="100%"
        height="315"
        src={src}
        frameborder="0"
        title={title || "YouTube"}
        allow="
      accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
        allowfullscreen
      ></iframe>
    </Figure>
  )
}

export default YouTube
