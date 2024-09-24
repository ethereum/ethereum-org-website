import { Box } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"

const EthVideo = () => {
  const src = useColorModeValue(
    "/images/ethereum-hero-light.mp4",
    "/images/ethereum-hero-dark.mp4"
  )

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
