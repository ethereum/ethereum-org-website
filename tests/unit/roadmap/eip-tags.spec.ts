/**
 * Every EIP documented on an upgrade page must have exactly one entry in that
 * upgrade's `eips[]`, and exactly one `<EipTag />` rendering it.
 *
 * Without this, adding a twelfth EIP section to the page renders no chip and
 * nothing complains — which is the silent-drift failure the data layer exists
 * to prevent, reintroduced one level down.
 *
 * "Documented" means linked from a `**Resources**` block. That is the marker
 * the page already uses to say "this section specifies this EIP", so a new
 * section written to the existing pattern is caught automatically. EIPs merely
 * name-checked in prose (the devnet list, the FAQ, the meta EIP under Further
 * reading) are deliberately out of scope — they have no section and no chip.
 */

import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import { upgrades } from "../../../src/data/upgrades"

/**
 * EIPs upstream schedules that the page does not document yet.
 *
 * This is a backlog, not a config: each entry is a section someone still has to
 * write. Listing them keeps the coverage assertion below meaningful — a *new*
 * scheduled EIP fails the build instead of being quietly absent — while not
 * failing it for gaps that already exist.
 *
 * Shrink this list by writing the section. Do not grow it to make CI pass
 * without a deliberate decision that the EIP does not warrant one.
 */
const UNDOCUMENTED: Record<string, number[]> = {
  glamsterdam: [
    7610, 7688, 7778, 7843, 7954, 7976, 7981, 8024, 8070, 8136, 8246, 8282,
  ],
}

const PAGES = [
  { slug: "glamsterdam", file: "public/content/roadmap/glamsterdam/index.md" },
]

/** EIP ids linked from a `**Resources**` block, i.e. the page's EIP sections. */
const documentedEips = (markdown: string): number[] => {
  const ids = new Set<number>()
  const lines = markdown.split("\n")

  lines.forEach((line, i) => {
    if (!line.includes("**Resources**")) return
    // A Resources block runs until the next heading.
    for (let j = i; j < lines.length && !lines[j].startsWith("#"); j++) {
      for (const m of lines[j].matchAll(
        /eips\.ethereum\.org\/EIPS\/eip-(\d+)/g
      ))
        ids.add(Number(m[1]))
    }
  })

  return [...ids].sort((a, b) => a - b)
}

/** EIP ids passed to `<EipTag upgrade="..." id={N} />` on the page. */
const taggedEips = (markdown: string, slug: string): number[] =>
  [...markdown.matchAll(/<EipTag\s+upgrade="([^"]+)"\s+id=\{(\d+)\}\s*\/>/g)]
    .filter(([, upgrade]) => upgrade === slug)
    .map(([, , id]) => Number(id))
    .sort((a, b) => a - b)

for (const { slug, file } of PAGES) {
  test.describe(`${slug} EIP chip coverage`, () => {
    const markdown = fs.readFileSync(path.join(process.cwd(), file), "utf-8")
    const documented = documentedEips(markdown)
    const tagged = taggedEips(markdown, slug)
    const inData = upgrades[slug].eips.map((e) => e.id).sort((a, b) => a - b)

    test("the page documents at least one EIP", () => {
      // Guards against the parser silently matching nothing and every
      // comparison below trivially passing.
      expect(documented.length).toBeGreaterThan(0)
    })

    test("every documented EIP has a data entry", () => {
      expect(documented.filter((id) => !inData.includes(id))).toEqual([])
    })

    test("every documented EIP has a chip", () => {
      expect(documented.filter((id) => !tagged.includes(id))).toEqual([])
    })

    test("every scheduled EIP is documented, or listed as a known gap", () => {
      const known = UNDOCUMENTED[slug] ?? []
      const missing = inData.filter(
        (id) => !documented.includes(id) && !known.includes(id)
      )
      expect(missing).toEqual([])
    })

    test("the known-gap list has no stale entries", () => {
      // A gap that got documented, or an EIP upstream dropped, should leave the
      // list — otherwise it silently stops guarding anything.
      const known = UNDOCUMENTED[slug] ?? []
      expect(
        known.filter((id) => documented.includes(id) || !inData.includes(id))
      ).toEqual([])
    })

    test("no EIP is tagged twice", () => {
      expect(tagged).toEqual([...new Set(tagged)])
    })

    test("every chip refers to a real data entry", () => {
      expect(tagged.filter((id) => !inData.includes(id))).toEqual([])
    })
  })
}
