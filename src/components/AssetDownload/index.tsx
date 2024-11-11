import { extname } from "path"

import { BaseHTMLAttributes } from "react"
import type { ImageProps, StaticImageData } from "next/image"
import { useTranslation } from "next-i18next"

import AssetDownloadArtist from "@/components/AssetDownload/AssetDownloadArtist"
import AssetDownloadImage from "@/components/AssetDownload/AssetDownloadImage"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { ButtonLink } from "../ui/buttons/Button"
import { Flex, Stack } from "../ui/flex"

type AssetDownloadProps = {
  title: string
  alt: string
  artistName?: string
  artistUrl?: string
  image: ImageProps["src"]
  svgUrl?: string
} & BaseHTMLAttributes<HTMLDivElement>

const AssetDownload = ({
  alt,
  artistName,
  artistUrl,
  image,
  svgUrl,
  title,
  className,
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
    <Stack
      className={cn("m-4 justify-between gap-0 p-0", className)}
      {...props}
    >
      <h4 className="my-8 text-md font-medium md:text-xl">{title}</h4>
      <div>
        <AssetDownloadImage image={image} alt={alt} />
        {artistName && (
          <AssetDownloadArtist artistName={artistName} artistUrl={artistUrl} />
        )}
      </div>
      <Flex className="mt-4 gap-5">
        <ButtonLink
          href={imgSrc}
          onClick={matomoHandler}
          target="_blank"
          locale={false}
        >
          {t("page-assets-download-download")} (
          {extname(imgSrc).slice(1).toUpperCase()})
        </ButtonLink>
        {svgUrl && (
          <ButtonLink href={svgUrl} onClick={matomoHandler} target="_blank">
            {t("page-assets-download-download")} (SVG)
          </ButtonLink>
        )}
      </Flex>
    </Stack>
  )
}

export default AssetDownload
