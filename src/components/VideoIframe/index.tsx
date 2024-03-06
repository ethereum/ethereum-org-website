import { Box } from "@chakra-ui/react"

type VideoIframeProps = {
  src: string
}

const VideoIframe = ({ src }: VideoIframeProps) => {
  return (
    <Box maxW="854px">
      <Box position="relative" h="0" pb="56.25%">
        <iframe
          src={src}
          width="854"
          height="480"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    </Box>
  )
}

export default VideoIframe
