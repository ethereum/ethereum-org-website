import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import { getBreadcrumbTrail, toBreadcrumbPath } from "@/lib/utils/breadcrumbs"

import { BREADCRUMB_HUBS, BREADCRUMB_PARENTS } from "@/data/breadcrumbs"

import common from "@/intl/en/common.json"

const messages = common as Record<string, string>

// Pages whose crumb text comes from a `label` prop (frontmatter or data), or
// that render no crumbs at all
const LABEL_FROM_PROPS = [
  "developers/tutorials/",
  "latest/",
  "stories/",
  "videos/",
]
const NO_CRUMBS = ["developers/docs"]

const contentPaths = () => {
  const root = path.join(process.cwd(), "public/content")
  const out: string[] = []
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === "translations") continue
      const full = path.join(dir, entry.name)
      if (fs.existsSync(path.join(full, "index.md")))
        out.push(path.relative(root, full))
      walk(full)
    }
  }
  walk(root)
  return out
}

const appPaths = () => {
  const root = path.join(process.cwd(), "app/[locale]")
  const out: string[] = []
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || /^[[_(]/.test(entry.name)) continue
      const full = path.join(dir, entry.name)
      if (fs.existsSync(path.join(full, "page.tsx")))
        out.push(path.relative(root, full))
      walk(full)
    }
  }
  walk(root)
  return out.filter((p) => !p.startsWith("ab-code"))
}

test.describe("getBreadcrumbTrail", () => {
  test("drops the root crumb on and below a hub", () => {
    expect(getBreadcrumbTrail("staking")[0].href).toBe("/staking/")
    expect(getBreadcrumbTrail("/defi/")).toEqual([
      { href: "/use-cases/", labelKey: "use-cases" },
      { href: "/defi/", labelKey: "defi" },
    ])
  })

  test("keeps the root crumb outside hubs", () => {
    expect(getBreadcrumbTrail("/bug-bounty/")[0]).toEqual({
      href: "/",
      labelKey: null,
    })
  })

  test("skips URL segments that have no page", () => {
    expect(
      getBreadcrumbTrail("/developers/tools/categories/security").map(
        ({ href }) => href
      )
    ).toEqual([
      "/developers/",
      "/developers/tools/",
      "/developers/tools/categories/security/",
    ])
  })

  test("uses the ancestor label override only above the leaf", () => {
    expect(getBreadcrumbTrail("/apps/").at(-1)?.labelKey).toBe("apps")
    expect(getBreadcrumbTrail("/apps/uniswap").at(-2)?.labelKey).toBe(
      "breadcrumb-all-apps"
    )
  })

  test("renders nothing for the homepage", () => {
    expect(getBreadcrumbTrail("/")).toEqual([])
  })

  test("map has no cycles and every hub is a real top-level path", () => {
    for (const key of Object.keys(BREADCRUMB_PARENTS))
      expect(() => getBreadcrumbTrail(key.replace("*", "x"))).not.toThrow()
    for (const hub of BREADCRUMB_HUBS)
      expect(hub.split("/").filter(Boolean)).toHaveLength(1)
  })

  test("every crumb label resolves to an English string", () => {
    const missing = new Set<string>()
    const pages = [...contentPaths(), ...appPaths()].filter(
      (p) => p && !NO_CRUMBS.some((prefix) => p.startsWith(prefix))
    )
    for (const page of pages) {
      const trail = getBreadcrumbTrail(page)
      const labelled = LABEL_FROM_PROPS.some((prefix) =>
        `${page}/`.startsWith(prefix)
      )
      trail.forEach(({ href, labelKey }, idx) => {
        if (!labelKey) return
        if (labelled && idx === trail.length - 1) return
        if (!(labelKey in messages)) missing.add(`${href} -> ${labelKey}`)
      })
    }
    expect([...missing].sort()).toEqual([])
  })

  test("JSON-LD trails use the visible crumb slug", () => {
    const root = path.join(process.cwd(), "app/[locale]")
    // Static prefix of a string or template literal, up to the first `${`
    const prefix = (literal: string) =>
      toBreadcrumbPath(literal.slice(1, -1).split("${")[0])
    const mismatched: string[] = []
    for (const page of appPaths()) {
      const jsonLdFile = path.join(root, page, "page-jsonld.tsx")
      if (!fs.existsSync(jsonLdFile)) continue
      const jsonLd = fs.readFileSync(jsonLdFile, "utf8")
      expect(jsonLd, page).not.toContain('"@type": "BreadcrumbList"')
      const called = jsonLd.match(
        /getBreadcrumbListJsonLd\(\s*locale,\s*("[^"]*"|`[^`]*`)/
      )?.[1]
      if (!called) continue

      const source = fs.readFileSync(path.join(root, page, "page.tsx"), "utf8")
      const constants = Object.fromEntries(
        [...source.matchAll(/const (\w+) = ("[^"]*")/g)].map((m) => [
          m[1],
          m[2],
        ])
      )
      const visible = [
        ...source.matchAll(/slug(?:=\{?|: )("[^"]*"|`[^`]*`|[A-Z_]+)/g),
      ]
        .map((m) => constants[m[1]] ?? m[1])
        .filter((literal) => /^["`]/.test(literal))
        .map(prefix)
      // Hub pages render no crumbs of their own
      if (visible.length && !visible.includes(prefix(called)))
        mismatched.push(`${page}: ${prefix(called)} vs ${visible.join(", ")}`)
    }
    expect(mismatched).toEqual([])
  })
})
