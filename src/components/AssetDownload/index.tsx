import { extname } from "path"

import type { StaticImageData } from "next/image"
import { useTranslations } from "next-intl"

import Emoji from "@/components/Emoji"
import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import InlineLink from "@/components/ui/Link"

// Rendered banner width by items-per-row in the parent auto-fit Grid, capped
// at the max-w-screen-2xl container; offsets track the responsive px-page.
const SIZES_PER_ROW = {
  1: "(min-width: 1536px) 1472px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)",
  2: "(min-width: 1536px) 728px, (min-width: 784px) calc(50vw - 2.5rem), (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)",
  3: "(min-width: 1536px) 480px, (min-width: 1152px) calc(33.3vw - 2rem), (min-width: 784px) calc(50vw - 2.5rem), (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)",
} as const

export type AssetDownloadProps = {
  title: string
  image: StaticImageData
  /** Defaults to title */
  alt?: string
  svgUrl?: string
  artistName?: string
  artistUrl?: string
  /** Sibling count in the parent row; keeps `sizes` matched to the cell width */
  perRow?: keyof typeof SIZES_PER_ROW
  /** Match the surrounding heading hierarchy */
  titleAs?: "h3" | "h4"
}

const AssetDownload = ({
  title,
  image,
  alt,
  svgUrl,
  artistName,
  artistUrl,
  perRow = 2,
  titleAs: TitleTag = "h3",
}: AssetDownloadProps) => {
  const t = useTranslations("page-assets")

  const fileExtension = extname(image.src).slice(1)
  const downloadName = title.replace(/\s+/g, "-").toLowerCase()
  const matomoEvent = {
    eventCategory: "asset download button",
    eventAction: "click",
    eventName: title,
  }

  return (
    <Card>
      <CardBanner size="full" fit="contain">
        <Image src={image} alt={alt ?? title} sizes={SIZES_PER_ROW[perRow]} />
      </CardBanner>
      <CardContent>
        <CardTitle asChild>
          <TitleTag>{title}</TitleTag>
        </CardTitle>
        {artistName && (
          <CardParagraph size="sm">
            <Emoji text=":artist_palette:" className="me-2 text-md" />
            {t("page-assets-download-artist")}{" "}
            {artistUrl ? (
              <InlineLink href={artistUrl}>{artistName}</InlineLink>
            ) : (
              artistName
            )}
          </CardParagraph>
        )}
      </CardContent>
      <CardFooter buttons="compact">
        <ButtonLink
          href={image.src}
          download={`${downloadName}.${fileExtension}`}
          customEventOptions={matomoEvent}
        >
          {t("page-assets-download-download")} ({fileExtension.toUpperCase()})
        </ButtonLink>
        {svgUrl && (
          <ButtonLink
            href={svgUrl}
            download={`${downloadName}.svg`}
            customEventOptions={matomoEvent}
          >
            {t("page-assets-download-download")} (SVG)
          </ButtonLink>
        )}
      </CardFooter>
    </Card>
  )
}

export default AssetDownload
