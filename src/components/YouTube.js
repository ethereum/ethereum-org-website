import React from "react"

const YouTube = ({ id, start }) => {
  const startQuery = parseInt(start) > 0 ? `?start=${start}` : ""
  const baseUrl = "https://www.youtube.com/embed/"
  const src = baseUrl + id + startQuery
  return (
    <figure>
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
    </figure>
  )
}

export default YouTube
