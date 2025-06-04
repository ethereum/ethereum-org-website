import { StaticImageData } from "next/image"

export type Story = {
  storyEnglish: string
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
  description: React.ReactNode
  href: string
  linkText: string
}
