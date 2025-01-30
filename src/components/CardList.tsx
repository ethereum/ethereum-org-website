import TwImage, { type ImageProps } from "next/image"
import type { ReactNode } from "react"

import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { cn } from "@/lib/utils/cn"
import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import * as url from "@/lib/utils/url"

import { BaseLink } from "./ui/Link"

import { useRtlFlip } from "@/hooks/useRtlFlip"

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
  onClick?: () => void
}

const Card = ({
  title,
  description,
  caption,
  link,
  image,
  className,
  alt,
  onClick,
  imageWidth = 20,
  ...props
}: CardProps) => {
  const { twFlipForRtl } = useRtlFlip()
  const isLink = !!link
  const isExternal = url.isExternal(link || "")

  return (
    <div
      className={cn(
        "text-text flex flex-row items-center gap-4 border p-4",
        "transition-all duration-200",
        "hover:bg-background-highlight",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {image && <TwImage src={image} alt={alt ?? ""} width={imageWidth} />}
      <div className="flex flex-1 basis-3/4 flex-col">
        {isLink ? (
          <LinkOverlay asChild>
            <BaseLink href={link} hideArrow className="text-body no-underline">
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
      {isExternal && <span className={twFlipForRtl}>↗</span>}
    </div>
  )
}

export type CardListProps = {
  items: CardProps[]
  imageWidth?: number
  clickHandler?: (idx: string | number) => void
  customEventOptions?: MatomoEventOptions
  className?: string
}

const CardList = ({
  items,
  imageWidth,
  clickHandler = () => null,
  customEventOptions,
  className,
}: CardListProps) => (
  <div className={cn("w-full bg-background", className)}>
    {items.map((listItem, idx) => {
      const { link, id } = listItem
      const isLink = !!link

      return isLink ? (
        <LinkBox key={id || idx}>
          <Card {...listItem} imageWidth={imageWidth} />
        </LinkBox>
      ) : (
        <div key={idx}>
          <Card
            onClick={() => {
              customEventOptions && trackCustomEvent(customEventOptions)
              clickHandler(idx)
            }}
            className="mb-4"
            {...listItem}
          />
        </div>
      )
    })}
  </div>
)

export default CardList
