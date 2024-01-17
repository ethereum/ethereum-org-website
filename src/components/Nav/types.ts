import { IconType } from "react-icons"

export type NavItem = {
  label: string
  description: string
  icon?: IconType
} & (
    | { items: NavItem[], href?: never }
    | { href: string, items?: never }
  )

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
