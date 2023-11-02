import React from "react"
import { Box, Flex, FlexProps } from "@chakra-ui/react"

import { getSrc, ImageDataLike } from "../../utils/image"
import { trackCustomEvent } from "../../utils/matomo"
import { ButtonLink } from "../Buttons"
import OldHeading from "../OldHeading"
import Translation from "../Translation"

import AssetDownloadArtist from "./AssetDownloadArtist"
import AssetDownloadImage from "./AssetDownloadImage"

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
      <OldHeading as="h4" fontSize={{ base: "md", md: "xl" }} fontWeight="500">
        {title}
      </OldHeading>
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
