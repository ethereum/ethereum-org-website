import { StaticImageData } from "next/image"

export type AdoptionCard = {
  image: StaticImageData
  title: string
  description?: React.ReactNode
  href: string
  linkText: string
}

export type InnovationCard = {
  image: StaticImageData
  title: string
  date: string
  description1: string
  description2: string
  className?: string
}
