import type { getTranslations } from "next-intl/server"

import type { FooterLink, FooterLinkSection } from "@/lib/types"

import type { NavSectionDetail } from "@/components/Nav/types"

import { getFullUrl } from "@/lib/utils/url"

import { readFrontmatterDescription } from "./frontmatter"

export type DocLink = {
  id: string
  href?: string
  path?: string
  description?: string
  items?: DocLink[]
}

export type Translator = Awaited<ReturnType<typeof getTranslations>>

/**
 * Single bullet line. Frontmatter description wins; nav description is the
 * fallback; label-only if neither exists.
 */
export const renderBullet = (
  label: string,
  href: string,
  navDescription: string | null,
  indent = 0
): string => {
  const prefix = "  ".repeat(indent)
  const description = readFrontmatterDescription(href) ?? navDescription
  const url = getFullUrl(undefined, href)
  const tail = description ? `: ${description}` : ""
  return `${prefix}- [${label}](${url})${tail}`
}

/**
 * Render one top-level nav section.
 *
 * Layout:
 *   ## {label}
 *
 *   - {hub page, featured page}
 *
 *   ### {group label}
 *   - {group hub page, group items}
 *
 *   ### More
 *   - {footer items no menu section lists}
 */
export const renderNavSection = (
  section: NavSectionDetail,
  footerSection: FooterLinkSection | undefined,
  listedHrefs: Set<string>
): string => {
  const lines: string[] = [`## ${section.label}`, ""]
  // The featured card may spotlight a page a group lists; list it once, in its group
  const groupHrefs = new Set(
    section.groups.flatMap(({ items }) => items.map(({ href }) => href))
  )

  for (const leaf of [section.hub, section.featured]) {
    if (!leaf || (leaf !== section.hub && groupHrefs.has(leaf.href))) continue
    lines.push(renderBullet(leaf.label, leaf.href, leaf.description, 0))
  }
  lines.push("")

  for (const group of section.groups) {
    lines.push(`### ${group.label}`, "")
    if (group.href) lines.push(renderBullet(group.label, group.href, null, 0))
    for (const child of group.items) {
      lines.push(
        renderBullet(child.label, child.href, child.description ?? null, 0)
      )
    }
    lines.push("")
  }

  if (footerSection) {
    const extra = footerSection.links.filter(
      (link) => !listedHrefs.has(link.href)
    )
    if (extra.length > 0) {
      lines.push("### More", "")
      for (const link of extra) {
        lines.push(renderBullet(link.text, link.href, null, 0))
      }
      lines.push("")
    }
  }

  return lines.join("\n").replace(/\n+$/, "")
}

/**
 * Render the Legal & Policies section from Footer's dipperLinks.
 * Skips mailto: and other non-http(s) hrefs.
 */
export const renderLegalSection = (dipperLinks: FooterLink[]): string => {
  const lines = ["## Legal & Policies", ""]
  for (const link of dipperLinks) {
    if (link.href.startsWith("mailto:")) continue
    lines.push(renderBullet(link.text, link.href, null, 0))
  }
  return lines.join("\n")
}

/**
 * Render a single docs-nav node and its descendants as indented bullets.
 */
export const renderDocsNode = (
  node: DocLink,
  indent: number,
  t: Translator
): string[] => {
  const label = t(node.id)
  const href = node.href ?? node.path
  const description =
    node.description && t.has(node.description) ? t(node.description) : null

  const lines: string[] = []
  if (href) {
    lines.push(renderBullet(label, href, description, indent))
  } else {
    lines.push(`${"  ".repeat(indent)}- ${label}`)
  }

  if (node.items) {
    for (const child of node.items) {
      lines.push(...renderDocsNode(child, indent + 1, t))
    }
  }
  return lines
}
