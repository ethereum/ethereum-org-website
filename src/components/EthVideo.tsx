import { Box, useColorModeValue } from "@chakra-ui/react"

import darkVideo from "@/public/ethereum-hero-dark.mp4"
import lightVideo from "@/public/ethereum-hero-light.mp4"

const EthVideo = () => {
  const src = useColorModeValue(lightVideo, darkVideo)

  return (
    <Box>
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
