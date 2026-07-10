import { StaticImageData } from "next/image"

export type StoryData = {
  /** Key in the "community-stories" namespace holding the translatable story copy */
  storyKey: string
  /** Story text verbatim as submitted (English for English submissions) */
  storyOriginal: string
  category: string
  name: string
  date: string
  country: string
  twitter: string
  region: string
}

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
