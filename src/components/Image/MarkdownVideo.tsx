"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"

import { cn } from "@/lib/utils/cn"

import { useIsClient } from "@/hooks/useIsClient"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export type VideoOrientation = "landscape" | "portrait"

type MarkdownVideoProps = {
  src: string
  alt?: string
  poster?: string
  orientation?: VideoOrientation
}

/**
 * Renders a short, silent, looping clip authored in markdown as `![](./x.mp4)`.
 *
 * The modern GIF replacement: a `<video>` sized by a fixed CSS aspect ratio (no
 * CLS, no `next/image` — that pipeline can't optimize video anyway), that only
 * plays while on-screen (battery/bandwidth) and never autoplays under
 * `prefers-reduced-motion` (where it shows controls instead). Clips are
 * standardized to one of two ratios at authoring time; orientation is chosen
 * from the markdown via a `-portrait` filename suffix. Mirrors the orientation
 * handling of the `YouTube` embed (`aspect-9/16 max-h-105`).
 */
const MarkdownVideo = ({
  src,
  alt,
  poster,
  orientation = "landscape",
}: MarkdownVideoProps) => {
  const isPortrait = orientation === "portrait"

  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: "200px 0px" })
  const { prefersReducedMotion } = usePrefersReducedMotion()
  // Gate motion-dependent attributes behind mount so SSR and the first client
  // render match (no hydration mismatch); enhance afterwards.
  const isClient = useIsClient()

  const shouldPlay = isClient && inView && !prefersReducedMotion
  const showControls = isClient && prefersReducedMotion

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (shouldPlay) {
      // play() rejects if interrupted (e.g. scrolled away mid-start); ignore.
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [shouldPlay])

  return (
    <span className="flex justify-center">
      <video
        ref={ref}
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        controls={showControls}
        aria-label={alt || undefined}
        src={src}
        // `object-contain` is a safety net: a clip that isn't exactly the
        // standard ratio letterboxes inside the fixed box rather than shifting
        // layout or distorting.
        className={cn(
          "h-auto rounded-base object-contain",
          isPortrait
            ? "aspect-9/16 max-h-105 w-auto"
            : "aspect-video w-full max-w-full"
        )}
      />
    </span>
  )
}

MarkdownVideo.displayName = "MarkdownVideo"

export default MarkdownVideo
