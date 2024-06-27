import { extname } from "path"

import type { StaticImageData } from "next/image"
import { useTranslation } from "next-i18next"
import { Box, Flex, type FlexProps } from "@chakra-ui/react"

import AssetDownloadArtist from "@/components/AssetDownload/AssetDownloadArtist"
import AssetDownloadImage from "@/components/AssetDownload/AssetDownloadImage"
import { ButtonLink } from "@/components/Buttons"
import type { ImageProps } from "@/components/Image"
import OldHeading from "@/components/OldHeading"

import { trackCustomEvent } from "@/lib/utils/matomo"

type AssetDownloadProps = {
  title: string
  alt: string
  artistName?: string
  artistUrl?: string
  image: ImageProps["src"]
  svgUrl?: string
} & FlexProps

const AssetDownload = ({
  alt,
  artistName,
  artistUrl,
  image,
  title,
  ...props
}: AssetDownloadProps) => {
  const { t } = useTranslation(["page-assets"])
  const matomoHandler = () => {
    trackCustomEvent({
      eventCategory: "asset download button",
      eventAction: "click",
      eventName: title,
    })
  }
  const imgSrc = (image as StaticImageData).src

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
        <ButtonLink
          href={imgSrc}
          onClick={matomoHandler}
          target="_blank"
          locale={false}
        >
          {t("page-assets-download-download")} (
          {extname(imgSrc).slice(1).toUpperCase()})
        </ButtonLink>
        {/* Disables SVG due to bug: https://github.com/ethereum/ethereum-org-website/issues/12267 */}
        {/* {svgUrl && (
          <ButtonLink href={svgUrl} onClick={matomoHandler} target="_blank">
            {t("page-assets-download-download")} (SVG)
          </ButtonLink>
        )} */}
      </Flex>
    </Flex>
  )
}

export default AssetDownload
