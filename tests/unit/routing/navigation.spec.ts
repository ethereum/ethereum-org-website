import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import { isUpgradeShipped } from "@/lib/utils/upgrades"

import { upgrades } from "@/data/upgrades"

import common from "@/intl/en/common.json"
import {
  buildNavigation,
  getNavSectionForPath,
  getNavSectionLinks,
  NAV_UPGRADES,
} from "@/lib/nav/buildNavigation"

const messages = common as Record<string, string>

const t = (key: string) => {
  if (!(key in messages)) throw new Error(`Missing common key: ${key}`)
  return messages[key]
}

const sections = buildNavigation(t)

const internalLinks = (links: { href: string }[]) =>
  links.filter(({ href }) => href.startsWith("/"))

// Static app route, markdown page, or an app route with a [param] segment
const pageExists = (href: string) => {
  const segments = href.split("/").filter(Boolean)
  const content = path.join(process.cwd(), "public/content", ...segments)
  if (fs.existsSync(path.join(content, "index.md"))) return true

  const matchAppRoute = (dir: string, rest: string[]): boolean => {
    if (!rest.length) return fs.existsSync(path.join(dir, "page.tsx"))
    const [head, ...tail] = rest
    if (
      fs.existsSync(path.join(dir, head)) &&
      matchAppRoute(path.join(dir, head), tail)
    )
      return true
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && /^\[[^.]/.test(entry.name))
      .some((entry) => matchAppRoute(path.join(dir, entry.name), tail))
  }
  return matchAppRoute(path.join(process.cwd(), "app/[locale]"), segments)
}

test.describe("main navigation", () => {
  test("each link sits in the menu its breadcrumb root belongs to", () => {
    for (const [key, section] of Object.entries(sections)) {
      for (const { href } of internalLinks(getNavSectionLinks(section))) {
        expect(getNavSectionForPath(href), href).toBe(key)
      }
    }
  })

  test("each destination appears once", () => {
    const hrefs = Object.values(sections)
      .flatMap(getNavSectionLinks)
      .map(({ href }) => href)
    expect(hrefs.filter((href, i) => hrefs.indexOf(href) !== i)).toEqual([])
  })

  // The card moves on when Forkcast's sync marks a fork live, with no edit here
  test("each upcoming upgrade can fill the next-upgrade card", () => {
    for (const { slug, descriptionKey } of NAV_UPGRADES) {
      if (!slug) continue
      const upgrade = upgrades[slug]
      expect(upgrade, `${slug} is in the Forkcast store`).toBeDefined()
      if (upgrade && !isUpgradeShipped(upgrade))
        expect(!!descriptionKey && descriptionKey in messages, slug).toBe(true)
    }
  })

  test("each internal link resolves to a page", () => {
    const links = internalLinks(
      Object.values(sections).flatMap(getNavSectionLinks)
    )
    expect(links.filter(({ href }) => !pageExists(href))).toEqual([])
  })
})
