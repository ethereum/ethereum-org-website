"use client"

import { ComponentProps } from "react"

import EventFallback from "@/public/images/events/event-placeholder.png"

type CardImageProps = ComponentProps<"img">

const CardImage = ({ src, className, ...props }: CardImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt=""
    loading="lazy"
    onError={(e) => {
      e.currentTarget.onerror = null
      e.currentTarget.src = EventFallback.src
    }}
    referrerPolicy="no-referrer"
    className={className}
    {...props}
  />
)

CardImage.displayName = "CardImage"

export default CardImage
