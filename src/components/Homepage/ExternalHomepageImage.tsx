"use client"

import { ComponentProps } from "react"

import EventFallback from "@/public/images/events/event-placeholder.png"

type RssImageProps = ComponentProps<"img">

const ExternalHomepageImage = ({ src, className, ...props }: RssImageProps) => (
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
    crossOrigin="anonymous"
    className={className}
    {...props}
  />
)

ExternalHomepageImage.displayName = "RssImage"

export default ExternalHomepageImage
