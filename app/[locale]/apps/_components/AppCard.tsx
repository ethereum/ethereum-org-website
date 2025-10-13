import { AppData } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"
import TruncatedText from "@/components/ui/TruncatedText"

import { APP_TAG_VARIANTS } from "@/lib/utils/apps"
import { cn } from "@/lib/utils/cn"
import { slugify } from "@/lib/utils/url"

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
  forceLightMode?: boolean
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
  forceLightMode = false,
}: AppCardProps) => {
  const cardContent = (
    <div
      className={cn(
        "flex text-body",
        isVertical ? "flex-col gap-3" : "flex-row gap-3"
      )}
      style={
        forceLightMode
          ? ({
              "--body": "var(--gray-900)",
              "--body-medium": "var(--gray-500)",
              "--body-light": "var(--gray-200)",
              "--background": "var(--white)",
              "--background-highlight": "var(--gray-50)",
              "--primary": "var(--purple-600)",
              "--primary-high-contrast": "var(--purple-800)",
              "--primary-low-contrast": "var(--purple-100)",
            } as React.CSSProperties)
          : undefined
      }
    >
      <div
        className={cn(
          "flex overflow-hidden rounded-xl",
          `w-${imageSize} h-${imageSize}`
        )}
      >
        <Image
          src={app.image}
          alt={app.name}
          className="h-full w-full rounded-xl object-contain"
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
            text={app.description}
            maxLines={2}
            className="text-body group-hover:text-body"
            matomoEvent={{
              eventCategory: matomoCategory,
              eventAction: `${matomoAction}_show_more`,
              eventName: `app description ${app.name}`,
            }}
          />
        )}
        <p className="text-sm text-body-medium">
          {app.subCategory.map((subCategory) => subCategory).join(" ·  ")}
        </p>
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
