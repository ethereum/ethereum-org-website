"use client"

import { type ComponentProps, type ReactNode, useState } from "react"

import { Image, type ImageProps } from "@/components/Image"

type CommonProps = {
  /**
   * Rendered in place of the image when the source is missing or fails to
   * load (e.g. a transient CDN/S3 outage), instead of showing a broken image.
   */
  fallback: ReactNode
}

/**
 * Optimized via `next/image` (default). Use for local assets and remote
 * domains configured in `next.config`.
 */
type OptimizedProps = CommonProps & ImageProps & { unoptimized?: false }

/**
 * Raw `<img>` (no `next/image` optimization). Use for arbitrary external URLs
 * that aren't configured for `next/image`; sets `referrerPolicy="no-referrer"`
 * and lazy loading by default.
 */
type UnoptimizedProps = CommonProps &
  ComponentProps<"img"> & { unoptimized: true }

export type ImageWithFallbackProps = OptimizedProps | UnoptimizedProps

/**
 * Single image-with-fallback primitive shared across card thumbnails. Wraps
 * either `next/image` or a raw `<img>` and, on error or missing source,
 * degrades to a meaningful `fallback` node (icon, placeholder) rather than a
 * broken image.
 */
export const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false)
  const { fallback, unoptimized, ...rest } = props

  if (hasError || !rest.src) return <>{fallback}</>

  if (unoptimized) {
    const {
      onError,
      alt = "",
      loading = "lazy",
      ...imgProps
    } = rest as Omit<UnoptimizedProps, "fallback" | "unoptimized">
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        {...imgProps}
        onError={(e) => {
          setHasError(true)
          onError?.(e)
        }}
      />
    )
  }

  const {
    onError,
    alt = "",
    ...imageProps
  } = rest as Omit<OptimizedProps, "fallback" | "unoptimized">
  return (
    <Image
      alt={alt}
      {...imageProps}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
    />
  )
}

export default ImageWithFallback
