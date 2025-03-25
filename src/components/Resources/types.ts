import { StaticImageData } from "next/image"

export type Item = {
  title: string
  description: string
  href: string
  imgSrc: StaticImageData
}

export type DashboardBox = {
  title: string
  metric?: React.ReactNode
  items: Item[]
  className?: string
}

export type DashboardSection = {
  key: string
  title: string
  boxes: DashboardBox[]
  icon?: React.ReactNode
}
