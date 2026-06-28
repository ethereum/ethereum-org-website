import type { getTranslations } from "next-intl/server"

import type { FooterLink, FooterLinkSection } from "@/lib/types"

import type { NavItem, NavSectionDetail } from "@/components/Nav/types"

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

const collectNavHrefs = (section: NavSectionDetail): Set<string> => {
  const set = new Set<string>()
  const walk = (items: NavItem[]) => {
    for (const item of items) {
      if (item.href) set.add(item.href)
      if (item.items) walk(item.items)
    }
  }
  walk(section.items)
  return set
}

/**
 * Render one top-level nav section.
 *
 * Layout:
 *   ## {label}
 *
 *   - {leaf items at top level}
 *
 *   ### {group label}
 *   - {group items}
 *
 *   ### More
 *   - {footer items not already covered}
 */
export const renderNavSection = (
  section: NavSectionDetail,
  footerSection: FooterLinkSection | undefined
): string => {
  const lines: string[] = [`## ${section.label}`, ""]

  const leaves = section.items.filter((item) => item.href)
  const groups = section.items.filter((item) => item.items)

  for (const leaf of leaves) {
    if (!leaf.href) continue
    lines.push(renderBullet(leaf.label, leaf.href, leaf.description, 0))
  }
  if (leaves.length > 0) lines.push("")

  for (const group of groups) {
    if (!group.items) continue
    lines.push(`### ${group.label}`, "")
    for (const child of group.items) {
      if (!child.href) continue
      lines.push(renderBullet(child.label, child.href, child.description, 0))
    }
    lines.push("")
  }

  if (footerSection) {
    const navHrefs = collectNavHrefs(section)
    const extra = footerSection.links.filter((link) => !navHrefs.has(link.href))
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
