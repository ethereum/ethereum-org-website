import React from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"

import darkVideo from "../assets/ethereum-hero-dark.mp4"
import lightVideo from "../assets/ethereum-hero-light.mp4"

export interface IProps {
  className?: string
  videoSrc?: string
}

const EthVideo: React.FC<IProps> = ({ className, videoSrc }) => {
  const videoFile = useColorModeValue(lightVideo, darkVideo)

  const src = videoSrc ? videoSrc : videoFile

  return (
    <Box className={className}>
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
    </Box>
  )
}

export default EthVideo
