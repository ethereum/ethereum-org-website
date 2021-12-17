import React from "react"
import styled from "styled-components"

const Figure = styled.figure`
  display: block;
  margin: 1rem 0;
`

const YouTube = ({ id, start }) => {
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
