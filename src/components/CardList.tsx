import { ExternalLink } from "lucide-react"
import TwImage, { type ImageProps } from "next/image"
import type { ReactNode } from "react"

import type { MatomoEventOptions } from "@/lib/types"

import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { cn } from "@/lib/utils/cn"
import * as url from "@/lib/utils/url"

import { BaseLink } from "./ui/Link"

export type CardProps = {
  title?: ReactNode
  description?: ReactNode
  caption?: ReactNode
  link?: string
  id?: string
  image?: ImageProps["src"]
  imageWidth?: number
  alt?: string
  className?: string
  customEventOptions?: MatomoEventOptions
}

const Row = ({
  title,
  description,
  caption,
  link,
  image,
  className,
  alt,
  customEventOptions,
  imageWidth = 20,
  ...props
}: CardProps) => {
  const isLink = !!link
  const isExternal = url.isExternal(link || "")

  return (
    <div
      className={cn(
        "text-text flex flex-row items-center gap-4 p-4",
        "transition-all duration-200",
        "hover:bg-background-highlight",
        className
      )}
      {...props}
    >
      {image && <TwImage src={image} alt={alt ?? ""} width={imageWidth} />}
      <div className="flex flex-1 basis-3/4 flex-col">
        {isLink ? (
          <LinkOverlay asChild>
            <BaseLink
              href={link}
              hideArrow
              className="text-body no-underline"
              customEventOptions={customEventOptions}
            >
              {title}
            </BaseLink>
          </LinkOverlay>
        ) : (
          <div>{title}</div>
        )}

        <div className="mb-0 text-sm text-body-medium">{description}</div>
      </div>
      {caption && (
        <div className="me-4 flex flex-[1_0_25%] flex-wrap items-center">
          <div className="mb-0 text-sm opacity-60">{caption}</div>
        </div>
      )}
      {isExternal && (
        <ExternalLink className="size-[1em] shrink-0 rtl:-scale-x-100" />
      )}
    </div>
  )
}

export type CardListProps = {
  items: CardProps[]
  imageWidth?: number
  customEventOptions?: MatomoEventOptions
  className?: string
}

const CardList = ({
  items,
  imageWidth,
  customEventOptions,
  className,
}: CardListProps) => (
  <div
    className={cn(
      "w-full overflow-hidden rounded-base border bg-background",
      className
    )}
  >
    {items.map((listItem, idx) => {
      const { link, id } = listItem
      const isLink = !!link
      const itemClasses = "not-last:border-b"

      return isLink ? (
        <LinkBox key={id || idx} className={itemClasses}>
          <Row
            {...listItem}
            customEventOptions={customEventOptions}
            imageWidth={imageWidth}
          />
        </LinkBox>
      ) : (
        <div key={idx} className={itemClasses}>
          <Row {...listItem} />
        </div>
      )
    })}
  </div>
)

export default CardList
