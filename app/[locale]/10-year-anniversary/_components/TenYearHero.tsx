"use client"

import { useState } from "react"

import { Image } from "@/components/Image"

import { useEventListener } from "@/hooks/useEventListener"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import TenYearBackgroundImage from "@/public/images/10-year-anniversary/10-year-background.png"
import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-graphic.png"

const TenYearHero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEventListener("mousemove", (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10
    const y = (e.clientY / window.innerHeight - 0.5) * 10

    setPosition({ x, y })
  })

  const [prefersReducedMotion] = useMediaQuery([
    "(prefers-reduced-motion: reduce)",
  ])
  const transform = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  }
  const style = prefersReducedMotion ? {} : transform

  return (
    <div className="relative">
      <Image src={TenYearBackgroundImage} alt="10 Year Anniversary" />
      <Image
        src={TenYearGraphicImage}
        alt="10 Year Anniversary"
        className="absolute left-0 top-0 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  )
}

export default TenYearHero
