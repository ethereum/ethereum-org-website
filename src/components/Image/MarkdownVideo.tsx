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

// An optional `#WxH` fragment on the src declares the clip's intrinsic pixel
// dimensions, e.g. `![](./demo.mp4#800x400)`. The fragment is presentation
// metadata only: browsers strip it before requesting, so the asset URL stays
// canonical (one CDN/browser cache entry), and references without it — e.g.
// not-yet-repropagated translations — still play in the default box.
const parseDimensionsFragment = (src: string) => {
  const match = src.match(/#(\d+)x(\d+)$/)
  if (!match) return undefined
  return { width: Number(match[1]), height: Number(match[2]) }
}

/**
 * Renders a short, silent, looping clip authored in markdown as `![](./x.mp4)`.
 *
 * The modern GIF replacement: a `<video>` (no `next/image` — that pipeline
 * can't optimize video anyway) that only plays while on-screen
 * (battery/bandwidth) and never autoplays under `prefers-reduced-motion`
 * (where it shows controls instead).
 *
 * Sizing: when the src declares the clip's dimensions via a `#WxH` fragment,
 * the box takes the clip's own aspect ratio so it hugs the video (rounded
 * corners land on the clip, no letterbox): landscape fills the content width,
 * taller-than-wide is height-capped for inline tutorial screen-captures.
 * Without declared dimensions the box falls back to a fixed standard ratio —
 * 16:9, or 9:16 via the `-portrait` filename suffix (mirroring the `YouTube`
 * embed's `aspect-9/16 max-h-105`) — with `object-contain` letterboxing
 * off-ratio clips rather than shifting layout or distorting.
 */
const MarkdownVideo = ({
  src,
  alt,
  poster,
  orientation = "landscape",
}: MarkdownVideoProps) => {
  const dimensions = parseDimensionsFragment(src)
  const isPortrait = dimensions
    ? dimensions.height > dimensions.width
    : orientation === "portrait"

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
        // The attributes give the element its intrinsic size before video
        // metadata loads; the explicit CSS `aspect-ratio` reserves the box up
        // front (no CLS) — the spec's attribute→aspect-ratio mapping is
        // unreliable on `<video>`, and `h-auto` overrides the height attribute.
        width={dimensions?.width}
        height={dimensions?.height}
        style={
          dimensions
            ? { aspectRatio: `${dimensions.width} / ${dimensions.height}` }
            : undefined
        }
        className={cn(
          "h-auto rounded-base",
          dimensions
            ? // Box hugs the clip's own ratio; cap tall clips by height.
              isPortrait
              ? "max-h-160 w-auto"
              : "w-full max-w-full"
            : [
                // No declared dimensions: fixed standard box; `object-contain`
                // letterboxes off-ratio clips rather than shifting layout or
                // distorting.
                "object-contain",
                isPortrait
                  ? "aspect-9/16 max-h-105 w-auto"
                  : "aspect-video w-full max-w-full",
              ]
        )}
      />
    </span>
  )
}

MarkdownVideo.displayName = "MarkdownVideo"

export default MarkdownVideo
