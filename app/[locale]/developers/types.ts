import type { StaticImageData } from "next/image"
import type { ReactNode } from "react"

type CardInfo = {
  imgSrc: StaticImageData
  imgAlt: string
  title: ReactNode
  description: ReactNode
  href: string
}

export type DevelopersPath = CardInfo & {
  button: ReactNode
  tag?: string
}

export type VideoCourse = CardInfo & {
  hours: number
}
