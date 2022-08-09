import React from "react"
import { useTheme } from "@emotion/react"

import darkVideo from "../assets/ethereum-hero-dark.mp4"
import lightVideo from "../assets/ethereum-hero-light.mp4"

export interface IProps {
  className?: string
  videoSrc?: string
}

const EthVideo: React.FC<IProps> = ({ className, videoSrc }) => {
  const theme = useTheme()
  const isDarkTheme = theme.isDark

  const src = videoSrc ? videoSrc : isDarkTheme ? darkVideo : lightVideo

  return (
    <div className={className}>
      <video
        id="hero-video"
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
