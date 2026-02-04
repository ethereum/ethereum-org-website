"use client"

import { ComponentProps, forwardRef } from "react"

import EventFallback from "@/public/images/events/event-placeholder.png"

type CardImageProps = ComponentProps<"img">

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ src, className, ...props }, ref) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src || EventFallback.src}
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
)

CardImage.displayName = "CardImage"

export default CardImage
