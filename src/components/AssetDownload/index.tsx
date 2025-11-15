import { extname } from "path"

import { BaseHTMLAttributes } from "react"
import type { ImageProps, StaticImageData } from "next/image"

import AssetDownloadArtist from "@/components/AssetDownload/AssetDownloadArtist"
import AssetDownloadImage from "@/components/AssetDownload/AssetDownloadImage"
import { Button } from "@/components/ui/buttons/Button"
import { Flex, Stack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { useTranslation } from "@/hooks/useTranslation"

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

  const handleDownload = async (url: string, fileExtension: string) => {
    if (!url) return

    matomoHandler()

    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.${fileExtension}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Failed to download file:", error)
    }
  }

  const handleSvgDownload = () => {
    if (!svgUrl) return
    handleDownload(svgUrl, "svg")
  }

  const handleImageDownload = () => {
    const imgSrc = (image as StaticImageData).src
    if (!imgSrc) return
    const fileExt = extname(imgSrc).slice(1)
    handleDownload(imgSrc, fileExt)
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
        <Button onClick={handleImageDownload}>
          {t("page-assets-download-download")} (
          {extname(imgSrc).slice(1).toUpperCase()})
        </Button>
        {svgUrl && (
          <Button onClick={handleSvgDownload}>
            {t("page-assets-download-download")} (SVG)
          </Button>
        )}
      </Flex>
    </Stack>
  )
}

export default AssetDownload
