import React, { useContext } from "react"
import { ThemeContext } from "styled-components"

import darkVideo from "../assets/ethereum-hero-dark.mp4"
import lightVideo from "../assets/ethereum-hero-light.mp4"

const EthVideo = ({ className, videoSrc, alt }) => {
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  const src = videoSrc ? videoSrc : isDarkTheme ? darkVideo : lightVideo

  return (
    <div className={className}>
      <video
        id="hero-video"
        alt={alt}
        width="100%"
        height="auto"
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
