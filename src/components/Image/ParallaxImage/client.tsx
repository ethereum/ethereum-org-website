"use client"

import { useState } from "react"
import { ImageProps as NextImageProps } from "next/image"

import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

import { useEventListener } from "@/hooks/useEventListener"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export type ParallaxImageProps = NextImageProps & {
  className?: string
}

const ParallaxImage = ({ src, alt, className }: ParallaxImageProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEventListener("mousemove", (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10
    const y = (e.clientY / window.innerHeight - 0.5) * 10

    setPosition({ x, y })
  })

  const { prefersReducedMotion } = usePrefersReducedMotion()
  const transform = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  }
  const style = prefersReducedMotion ? {} : transform

  return (
    <Image
      src={src}
      alt={alt}
      className={cn("animate-fade-in", className)}
      style={style}
    />
  )
}

export default ParallaxImage
