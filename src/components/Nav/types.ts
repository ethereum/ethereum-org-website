import type { FC, RefObject, SVGProps } from "react"
import type { IconType } from "react-icons"

type LinkOnly = { href: string; items?: never }
type ItemsOnly = { items: NavItem[]; href?: never }
type LinkXorItems = LinkOnly | ItemsOnly

export type NavItem = {
  label: string
  description: string
  icon?: IconType | FC<SVGProps<SVGElement>>
} & LinkXorItems

export type NavSectionKey =
  | "learn"
  | "use"
  | "build"
  | "participate"
  | "research"

export type NavSectionDetail = {
  label: string
  ariaLabel: string
  items: NavItem[]
}

export type NavSections = Record<NavSectionKey, NavSectionDetail>

export type Level = 1 | 2 | 3 | 4

export type LvlRefs = Record<
  "lvl1" | "lvl2" | "lvl3",
  RefObject<HTMLDivElement>
>
