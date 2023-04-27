// Libraries
import React from "react"
import { Box, Flex, Heading, FlexProps } from "@chakra-ui/react"

// Components
import Translation from "../Translation"
import ButtonLink from "../ButtonLink"
import AssetDownloadImage from "./AssetDownloadImage"
import AssetDownloadArtist from "./AssetDownloadArtist"

// Utils
import { getSrc, ImageDataLike } from "../../utils/image"
import { trackCustomEvent } from "../../utils/matomo"

export interface IProps extends FlexProps {
  alt: string
  artistName?: string
  artistUrl?: string
  src?: string
  title: string
  svgUrl?: string
  image?: ImageDataLike | null
}

const AssetDownload: React.FC<IProps> = ({
  alt,
  artistName,
  artistUrl,
  image,
  src,
  title,
  svgUrl,
  ...rest
}) => {
  const baseUrl = `https://ethereum.org`
  const downloadUri = src ? src : image ? getSrc(image) : ""
  const downloadUrl = `${baseUrl}${downloadUri}`

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      m={4}
      p={0}
      {...rest}
    >
      <Heading as="h4" fontSize={{ base: "md", md: "xl" }} fontWeight="500">
        {title}
      </Heading>
      <Box>
        <AssetDownloadImage image={image} alt={alt} />
        {artistName && (
          <AssetDownloadArtist artistName={artistName} artistUrl={artistUrl} />
        )}
      </Box>
      <Flex gap={5} mt={4}>
        {downloadUrl && (
          <ButtonLink
            to={downloadUrl}
            onClick={() => {
              trackCustomEvent({
                eventCategory: "asset download button",
                eventAction: "click",
                eventName: title,
              })
            }}
          >
            <Translation id="page-assets-download-download" />
            <>&nbsp;(PNG)</>
          </ButtonLink>
        )}
        {svgUrl && (
          <ButtonLink
            to={svgUrl}
            onClick={() => {
              trackCustomEvent({
                eventCategory: "asset download button",
                eventAction: "click",
                eventName: title,
              })
            }}
          >
            <Translation id="page-assets-download-download" />
            <>&nbsp;(SVG)</>
          </ButtonLink>
        )}
      </Flex>
    </Flex>
  )
}

export default AssetDownload
