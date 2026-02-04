import { AppData } from "@/lib/types"

import { LinkBox, LinkOverlay } from "@/components/atoms/link-box"
import { Tag, TagsInlineText } from "@/components/atoms/tag"
import TruncatedText from "@/components/atoms/TruncatedText"
import { Image } from "@/components/molecules/Image"

import { APP_TAG_VARIANTS } from "@/lib/utils/apps"
import { cn } from "@/lib/utils/cn"
import { slugify } from "@/lib/utils/url"

import { SIZE_CLASS_MAPPING } from "@/lib/constants"

interface AppCardProps {
  app: AppData
  imageSize: number
  isVertical?: boolean
  showDescription?: boolean
  hideTag?: boolean
  disableLink?: boolean
  hoverClassName?: string
  matomoCategory: string
  matomoAction: string
}

const AppCard = ({
  app,
  imageSize,
  isVertical = false,
  showDescription = false,
  hideTag = false,
  disableLink = false,
  hoverClassName,
  matomoCategory,
  matomoAction,
}: AppCardProps) => {
  const cardContent = (
    <div
      className={cn(
        "flex text-body",
        isVertical ? "flex-col gap-3" : "flex-row gap-3"
      )}
    >
      <div
        className={cn(
          "flex overflow-hidden rounded-xl",
          SIZE_CLASS_MAPPING[imageSize]
        )}
      >
        <Image
          src={app.image}
          alt={app.name}
          className="size-full rounded-xl object-contain"
          width={imageSize * 16}
          height={imageSize * 16}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {!hideTag && (
          <Tag
            size="small"
            className="w-fit py-0"
            status={APP_TAG_VARIANTS[app.category]}
          >
            {app.category}
          </Tag>
        )}
        <p className="text-lg font-bold leading-none text-body group-hover:text-primary">
          {app.name}
        </p>
        {showDescription && (
          <TruncatedText
            className="text-body group-hover:text-body"
            matomoEvent={{
              eventCategory: matomoCategory,
              eventAction: `${matomoAction}_show_more`,
              eventName: `app description ${app.name}`,
            }}
          >
            {app.description}
          </TruncatedText>
        )}
        <TagsInlineText list={app.subCategory} variant="light" />
      </div>
    </div>
  )

  if (disableLink) {
    return cardContent
  }

  return (
    <LinkBox
      className={cn(
        "group rounded-xl p-2",
        hoverClassName || "hover:bg-background-highlight"
      )}
    >
      <LinkOverlay
        href={`/apps/${slugify(app.name)}`}
        className="no-underline"
        matomoEvent={{
          eventCategory: matomoCategory,
          eventAction: `${matomoAction}`,
          eventName: `app name ${app.name}`,
        }}
      >
        {cardContent}
      </LinkOverlay>
    </LinkBox>
  )
}

export default AppCard
