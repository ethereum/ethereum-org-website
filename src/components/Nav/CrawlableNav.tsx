import { getTranslations } from "next-intl/server"

import type { NavItem } from "./types"

import { Link } from "@/i18n/navigation"
import { buildNavigation } from "@/lib/nav/buildNavigation"

function collectLinks(items: NavItem[]): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = []
  for (const item of items) {
    if (item.href) {
      links.push({ label: item.label, href: item.href })
    }
    if (item.items) {
      links.push(...collectLinks(item.items))
    }
  }
  return links
}

/**
 * Server-rendered hidden nav for search engine crawlability.
 *
 * The interactive desktop nav uses Radix NavigationMenu which unmounts
 * dropdown content when inactive, and the mobile nav is lazy-loaded on
 * interaction. Neither makes nav links available in the initial HTML.
 *
 * This component renders all nav links as plain <a> tags in the server
 * response so crawlers can discover and follow them.
 */
const CrawlableNav = async () => {
  const t = await getTranslations("common")
  const sections = buildNavigation(t)

  const allLinks = Object.values(sections).flatMap((section) =>
    collectLinks(section.items)
  )

  return (
    <nav inert className="sr-only">
      <ul>
        {allLinks.map(({ label, href }, index) => (
          <li key={`${href}-${index}`}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CrawlableNav
