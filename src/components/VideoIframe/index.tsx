import { Box } from "@chakra-ui/react"

type VideoIframeProps = {
  src: string
  title?: string
}

const VideoIframe = ({ src, title }: VideoIframeProps) => {
  return (
    <Box as="figure" maxW={560} my={8}>
      <Box position="relative" h="0" pb="56.25%">
        <iframe
          src={src}
          title={title}
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
