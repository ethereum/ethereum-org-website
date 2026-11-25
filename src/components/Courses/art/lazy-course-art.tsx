"use client"

import { useEffect } from "react"

import type { CourseArtId } from "@/data/courses"

import type { CourseArtProps } from "./course-art"
import { ArtFrame } from "./shared"

import { preloadable } from "@/lib/courses/preloadable"

const piece = (load: () => Promise<{ default: () => React.JSX.Element }>) =>
  preloadable(load, () => null)

const ART: Record<CourseArtId, ReturnType<typeof piece>> = {
  upgrade: piece(() => import("./course/upgrade")),
  "smart-account": piece(() => import("./course/smart-account")),
  diamond: piece(() => import("./course/diamond")),
  blocks: piece(() => import("./course/blocks")),
  coins: piece(() => import("./course/coins")),
  vault: piece(() => import("./course/vault")),
  tank: piece(() => import("./course/tank")),
  validators: piece(() => import("./course/validators")),
  contract: piece(() => import("./course/contract")),
  notebook: piece(() => import("./course/notebook")),
  mailbox: piece(() => import("./course/mailbox")),
  stamp: piece(() => import("./course/stamp")),
  vending: piece(() => import("./course/vending")),
  crate: piece(() => import("./course/crate")),
  rollup: piece(() => import("./course/rollup")),
  scale: piece(() => import("./course/scale")),
  frame: piece(() => import("./course/frame")),
  tanks: piece(() => import("./course/tanks")),
  lure: piece(() => import("./course/lure")),
  platform: piece(() => import("./course/platform")),
}

/**
 * `CourseArt` for client components, each piece its own chunk. The frame
 * renders at once, so the art holds its size while it loads.
 */
const LazyCourseArt = ({ id, tone, className }: CourseArtProps) => {
  const Art = ART[id].Component
  return (
    <ArtFrame tone={tone} className={className}>
      <Art />
    </ArtFrame>
  )
}

/** Fetches art ahead of the step or screen that shows it */
export const PreloadCourseArt = ({ ids }: { ids: CourseArtId[] }) => {
  useEffect(() => {
    // A failed preload is fetched again when the art renders
    for (const id of ids) ART[id].preload().catch(() => {})
  }, [ids])
  return null
}

export default LazyCourseArt
