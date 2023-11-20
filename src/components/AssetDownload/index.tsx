import { Box, Flex, FlexProps } from "@chakra-ui/react"
import type { StaticImageData } from "next/image"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { ButtonLink } from "@/components/Buttons"
import OldHeading from "@/components/OldHeading"
import Translation from "@/components/Translation"

import AssetDownloadArtist from "@/components/AssetDownload/AssetDownloadArtist"
import AssetDownloadImage from "@/components/AssetDownload/AssetDownloadImage"
import { SITE_URL } from "@/lib/constants"
import { extname } from "path"

type AssetDownloadProps = {
  title: string
  alt: string
  artistName?: string
  artistUrl?: string
  image: StaticImageData
  svgUrl?: string
} & FlexProps

const AssetDownload = ({
  alt,
  artistName,
  artistUrl,
  image,
  title,
  svgUrl,
  ...props
}: AssetDownloadProps) => {
  const { href: downloadUrl } = new URL(image.src, SITE_URL)

  const matomoHandler = () => {
    trackCustomEvent({
      eventCategory: "asset download button",
      eventAction: "click",
      eventName: title,
    })
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      m={4}
      p={0}
      {...props}
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
        <ButtonLink href={downloadUrl} onClick={matomoHandler}>
          <Translation id="page-assets-download-download" />{" "}
          {extname(image.src).slice(1).toUpperCase()}
        </ButtonLink>
        {svgUrl && (
          <ButtonLink href={svgUrl} onClick={matomoHandler}>
            <Translation id="page-assets-download-download" /> (SVG)
          </ButtonLink>
        )}
      </Flex>
    </Flex>
  )
}

export default AssetDownload
