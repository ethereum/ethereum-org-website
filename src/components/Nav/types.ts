export type NavSectionKey =
  | "learn"
  | "use"
  | "build"
  | "roadmap"
  | "community"
  | "organizations"

export type NavLink = {
  label: string
  href: string
  description?: string
}

export type NavGroup = {
  id: string
  label: string
  /** Hub page for the group; the heading renders as a link to it */
  href?: string
  items: NavLink[]
}

export type NavFeatured = NavLink & {
  eyebrow: string
  description: string
}

export type NavSectionDetail = {
  label: string
  hub: NavLink & { description: string }
  featured?: NavFeatured
  groups: NavGroup[]
}

export type NavSections = Record<NavSectionKey, NavSectionDetail>
