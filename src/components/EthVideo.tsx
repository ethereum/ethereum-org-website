import useColorModeValue from "@/hooks/useColorModeValue"

const EthVideo = () => {
  const src = useColorModeValue(
    "/images/ethereum-hero-light.mp4",
    "/images/ethereum-hero-dark.mp4"
  )

  return (
    <div>
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
