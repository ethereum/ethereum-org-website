import type { StaticImageData } from "next/image"

import type { SectionNavDetails } from "@/lib/types"

export type Item = {
  title: string
  description: string
  href: string
  imgSrc: StaticImageData
  className?: string
}

export type DashboardBox = {
  title: string
  metric?: React.ReactNode
  items: Item[]
  className?: string
}

export type DashboardSection = SectionNavDetails & {
  boxes: DashboardBox[]
}
