import React from "react"
import dark from "../assets/ethereum-hero-dark.mp4"
import light from "../assets/ethereum-hero-light.mp4"

console.log(dark)

// TODO how to pass `isDarkMode`?
// https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
const EthVideo = ({ isDarkMode }) => {
  isDarkMode = false
  const src = isDarkMode ? dark : light
  return (
    <div>
      <video
        id="hero-video"
        alt={`ETH glyph video - ${isDarkMode ? "Dark" : "Light"}`}
        width="380"
        height="380"
        src={src}
        playsInline
        autoPlay
        loop
        muted
      />
    </div>
  )
}

export default EthVideo
