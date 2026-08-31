/**
 * Copy keys for the `/roadmap` release carousel must actually render.
 *
 * The failure is silent and expensive. `page-roadmap-fusaka-additional-*` — a
 * "Potential Additional Features" heading and three bullets — sat in
 * `page-roadmap.json` referenced by nothing, so it was translated into all 25
 * locales (100 strings) for copy no reader ever saw. By the time it was found,
 * one of its bullets described an EIP that had already shipped.
 *
 * A dropped section leaves no trace: the slide renders one heading shorter and
 * looks deliberate. Nothing else in the build notices.
 */

import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

const read = (p: string) =>
  fs.readFileSync(path.join(process.cwd(), p), "utf-8")

const messages = JSON.parse(read("src/intl/en/page-roadmap.json")) as Record<
  string,
  string
>

/**
 * Every place a `page-roadmap-*` key could be referenced. Read as text because
 * `releases.tsx` imports PNGs, which only resolve through the bundler.
 */
const sources = (() => {
  const roots = ["src", "app"]
  const files: string[] = []
  for (const root of roots) {
    const dir = path.join(process.cwd(), root)
    for (const f of fs.readdirSync(dir, {
      recursive: true,
      encoding: "utf-8",
    })) {
      // `src/intl` is the definitions, not a usage.
      if (f.startsWith("intl/") || !/\.(ts|tsx|md|mdx)$/.test(f)) continue
      const full = path.join(dir, f)
      if (fs.statSync(full).isFile()) files.push(fs.readFileSync(full, "utf-8"))
    }
  }
  return files.join("\n")
})()

/** Keys referenced as `t("...")` in the carousel's own data module. */
const rendered = new Set(
  [...read("src/data/roadmap/releases.tsx").matchAll(/t\("([^"]+)"\)/g)].map(
    ([, key]) => key
  )
)

/**
 * Which key prefixes belong to a slide, derived from the ones that do render
 * rather than hardcoded — so a new upgrade is covered the day its copy lands.
 */
const slidePrefixes = new Set(
  [...rendered]
    .map((key) => key.match(/^page-roadmap-([a-z]+)-/)?.[1])
    .filter((p): p is string => Boolean(p))
)

test("the prefix scan found the slides", () => {
  // Guards against a formatting change collapsing this to an empty set and
  // every assertion below passing vacuously.
  expect(slidePrefixes.size).toBeGreaterThan(1)
  expect(rendered.size).toBeGreaterThan(10)
})

test("no slide copy key is left unrendered", () => {
  const orphans = Object.keys(messages).filter((key) => {
    const prefix = key.match(/^page-roadmap-([a-z]+)-/)?.[1]
    if (!prefix || !slidePrefixes.has(prefix)) return false
    if (rendered.has(key)) return false
    // A key the carousel dropped may still be used by another component; only
    // one referenced nowhere at all is an orphan.
    return !sources.includes(key)
  })

  expect(orphans).toEqual([])
})
