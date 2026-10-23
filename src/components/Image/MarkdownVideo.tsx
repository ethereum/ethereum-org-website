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

// `#WxH` src fragment = the clip's intrinsic dimensions (`./demo.mp4#800x400`).
// Browsers strip fragments before requesting, so the asset URL stays canonical.
const parseDimensionsFragment = (src: string) => {
  const match = src.match(/#(\d+)x(\d+)$/)
  if (!match) return undefined
  return { width: Number(match[1]), height: Number(match[2]) }
}

/**
 * Short, silent, looping clip authored in markdown as `![](./x.mp4)` — the
 * modern GIF replacement. Plays only while on-screen and never autoplays under
 * `prefers-reduced-motion`; controls are always exposed so the looping motion
 * can be stopped (WCAG 2.2.2). A `#WxH` src fragment sizes the box to the
 * clip's own ratio; without one, a fixed 16:9 / 9:16 (`-portrait`) box
 * letterboxes the clip. Details: design-system skill.
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
  // A pause the user asked for has to survive scrolling away and back, or the
  // in-view effect below just restarts the clip they stopped (WCAG 2.2.2).
  const userPaused = useRef(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (shouldPlay) {
      if (userPaused.current) return
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
        controls
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        aria-label={alt || undefined}
        src={src}
        // `pause` is dispatched asynchronously, so the effect's own out-of-view
        // pause always lands on a render where `shouldPlay` is already false —
        // a pause seen while it's still true came from the user.
        onPause={() => {
          if (shouldPlay) userPaused.current = true
        }}
        onPlay={() => {
          userPaused.current = false
        }}
        // Attributes size the element before metadata loads; explicit
        // aspect-ratio reserves the box (attr mapping is unreliable on video).
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
            ? isPortrait
              ? "max-h-160 w-auto"
              : "w-full max-w-full"
            : [
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
