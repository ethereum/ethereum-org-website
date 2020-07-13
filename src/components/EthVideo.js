import React, { useContext } from "react"
import { ThemeContext } from "styled-components"

import darkVideo from "../assets/ethereum-hero-dark.mp4"
import lightVideo from "../assets/ethereum-hero-light.mp4"

const EthVideo = () => {
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  return (
    <div>
      <video
        id="hero-video"
        alt={`ETH glyph video - ${isDarkTheme ? "Dark" : "Light"}`}
        width="380"
        height="380"
        src={isDarkTheme ? darkVideo : lightVideo}
        playsInline
        autoPlay
        loop
        muted
      />
    </div>
  )
}

export default EthVideo
