import type { StaticImageData } from "next/image"
import type { ReactNode } from "react"

export type DevelopersPath = {
  imgSrc: StaticImageData
  imgAlt: string
  title: ReactNode
  description: ReactNode
  url: string
  button: ReactNode
  tag?: string
}
