"use client"

import { useState } from "react"

import { Image } from "@/components/Image"

interface AppCardImageProps {
  src: string
  alt: string
  className: string
  width: number
  height: number
  fallback: React.ReactNode
}

const AppCardImage = ({
  src,
  alt,
  className,
  width,
  height,
  fallback,
}: AppCardImageProps) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) return <>{fallback}</>

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => setHasError(true)}
    />
  )
}

export default AppCardImage
