import { DappData } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import { DAPP_TAG_VARIANTS } from "@/data/dapps"

interface DappCardProps {
  dapp: DappData
  imageSize: number
  isVertical?: boolean
  showDescription?: boolean
  hideTag?: boolean
  disableLink?: boolean
}

const DappCard = ({
  dapp,
  imageSize,
  isVertical = false,
  showDescription = false,
  hideTag = false,
  disableLink = false,
}: DappCardProps) => {
  const cardContent = (
    <div
      className={cn(
        "flex text-body",
        isVertical ? "flex-col gap-3" : "flex-row gap-3"
      )}
    >
      <div
        className={cn(
          "flex overflow-hidden rounded-xl border p-2",
          `w-${imageSize} h-${imageSize}`
        )}
      >
        {typeof dapp.image === "string" ? (
          // Handle SVG string
          <div
            className="h-full w-full rounded-xl"
            dangerouslySetInnerHTML={{ __html: dapp.image }}
          />
        ) : (
          // Handle StaticImageData
          <Image src={dapp.image} alt={dapp.name} className="rounded-xl" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {!hideTag && (
          <Tag
            size="small"
            className="w-fit py-0"
            status={DAPP_TAG_VARIANTS[dapp.category]}
          >
            {dapp.category}
          </Tag>
        )}
        <p className="text-lg font-bold leading-none text-body group-hover:text-primary">
          {dapp.name}
        </p>
        {showDescription && (
          <p className="text-body group-hover:text-body">{dapp.description}</p>
        )}
        <p className="text-sm text-body-medium">
          {dapp.subCategory.map((subCategory) => subCategory).join(" ·  ")}
        </p>
      </div>
    </div>
  )

  if (disableLink) {
    return cardContent
  }

  return (
    <LinkBox
      className={cn("group rounded-xl p-2 hover:bg-background-highlight")}
    >
      <LinkOverlay
        href={`/dapps/${dapp.name}`}
        target="_blank"
        className="no-underline"
      >
        {cardContent}
      </LinkOverlay>
    </LinkBox>
  )
}

export default DappCard
