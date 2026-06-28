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
  // Intrinsic pixel dimensions (probed at build); set the element's aspect ratio
  // so layout space is reserved up front. Omitted when probing failed.
  width?: number
  height?: number
}

/**
 * Renders a short, silent, looping clip authored in markdown as `![](./x.mp4)`.
 *
 * The modern GIF replacement: a `<video>` (no `next/image` — that pipeline can't
 * optimize video anyway) that only plays while on-screen (battery/bandwidth) and
 * never autoplays under `prefers-reduced-motion` (where it shows controls
 * instead). The element is sized to the clip's intrinsic aspect ratio so the box
 * hugs the video (rounded corners land on the clip, no letterbox): landscape
 * fills the content width, portrait is capped by height. Orientation is chosen
 * from the markdown via a `-portrait` filename suffix, mirroring the `YouTube`
 * Shorts embed; the portrait height cap is sized for inline tutorial
 * screen-captures.
 */
const MarkdownVideo = ({
  src,
  alt,
  poster,
  orientation = "landscape",
  width,
  height,
}: MarkdownVideoProps) => {
  const isPortrait = orientation === "portrait"
  // Reserve the box from the probed ratio. The `width`/`height` attributes are
  // unreliable for this on `<video>` (the spec's attr->aspect-ratio mapping is
  // broken for video, and `h-auto` overrides the height attr), so set CSS
  // `aspect-ratio` explicitly. Absent dimensions -> intrinsic sizing.
  const aspectRatio = width && height ? `${width} / ${height}` : undefined

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
        width={width}
        height={height}
        // No forced aspect ratio / `object-contain`: the box takes the clip's
        // own ratio (via `aspect-ratio` above), so it hugs the video (rounded
        // corners on the clip, no letterbox) and reserves layout space up front
        // (no CLS). Landscape fills the content width; portrait is height-capped
        // so tall clips stay reasonable.
        style={aspectRatio ? { aspectRatio } : undefined}
        className={cn(
          "h-auto rounded-base",
          isPortrait ? "max-h-160 w-auto" : "w-full max-w-full"
        )}
      />
    </span>
  )
}

MarkdownVideo.displayName = "MarkdownVideo"

export default MarkdownVideo
