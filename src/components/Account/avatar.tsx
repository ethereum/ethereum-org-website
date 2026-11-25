"use client"

import { useEffect, useState } from "react"
import makeBlockie from "ethereum-blockies-base64"

import { cn } from "@/lib/utils/cn"

import { avatarSeed } from "@/lib/auth/display-name"

/** An account's blockie: the same picture wherever it shows, decorative */
const Avatar = ({
  accountId,
  className,
}: {
  accountId: string
  className?: string
}) => {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    void avatarSeed(accountId).then(
      (seed) => active && setSrc(makeBlockie(seed))
    )
    return () => {
      active = false
    }
  }, [accountId])

  const shape = cn("shrink-0 rounded-full", className)
  return src ? (
    // A data URL a few hundred bytes long: nothing for next/image to do
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      className={cn(shape, "[image-rendering:pixelated]")}
    />
  ) : (
    <span aria-hidden className={cn(shape, "bg-background-highlight")} />
  )
}

export default Avatar
