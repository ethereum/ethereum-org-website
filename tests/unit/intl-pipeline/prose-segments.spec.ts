/**
 * The sanitizer skips code by splitting on a regex whose inline-code
 * alternative used to match across newlines. Because the alternation matches
 * leftmost, one stray backtick in prose paired with the first backtick of the
 * next fence, and every line in between -- headings, anchors, JSX tags -- was
 * handed back as "code" for the fixers to skip. 31 of the 40 call sites in
 * `intl-sanitizer.ts` carried their own copy of the pattern.
 */

import * as fs from "fs"
import * as path from "path"

import { expect, test } from "@playwright/test"

import { _testOnly } from "../../../src/scripts/intl-pipeline/intl-sanitizer"
import {
  CODE_SPLIT_RE,
  proseLineMask,
} from "../../../src/scripts/intl-pipeline/lib/shared-patterns"
import { verifyMarkdown } from "../../../src/scripts/intl-pipeline/lib/verify-structure"

const REPO = path.join(__dirname, "..", "..", "..")
const SANITIZER = path.join(REPO, "src/scripts/intl-pipeline/intl-sanitizer.ts")

/** Code segments are the odd indices of a split on a capturing group. */
const codeSegments = (src: string) =>
  src.split(CODE_SPLIT_RE).filter((_, i) => i % 2 === 1)

// --- the pattern itself ----------------------------------------------------

test("an inline code span never spans a newline", () => {
  const doc = [
    "Ein Preis von 5` pro Einheit.",
    "",
    "##### Wasserhähne {#}",
    "",
    "```js",
    "const x = 1",
    "```",
  ].join("\n")
  for (const seg of codeSegments(doc))
    if (!seg.startsWith("```") && !seg.startsWith("~~~"))
      expect(seg).not.toContain("\n")
})

test("a stray backtick does not swallow the headings after it", () => {
  const doc = [
    "Preis 5` pro Einheit.",
    "",
    "## Titel {#titel}",
    "",
    "`code`",
  ].join("\n")
  expect(codeSegments(doc)).toEqual(["`code`"])
})

test("a fence still segments as one block", () => {
  const doc = ["Text", "```js", "const a = `t`", "```", "Mehr"].join("\n")
  expect(codeSegments(doc)).toEqual(["```js\nconst a = `t`\n```"])
})

test("a ``` line inside a ~~~ block does not close it", () => {
  const lines = ["~~~text", "```", "## Titel", "~~~", "## Danach"]
  expect(proseLineMask(lines)).toEqual([false, false, false, false, true])
})

// --- no local copies creep back in -----------------------------------------

test("no inline-code pattern in the sanitizer can cross a newline", () => {
  const src = fs.readFileSync(SANITIZER, "utf-8")
  // Every code span in the file is written [^`\n], never [^`]. The bare class
  // is what lets one stray backtick pair with a fence far below it.
  expect(src).not.toContain("[^`]")
  // ...and the document splitters come from shared-patterns, so one fix
  // reaches all 40 call sites.
  expect(src).not.toContain("const codeBlockPattern")
})

// --- gate and fixer agree --------------------------------------------------

test("every empty anchor the gate finds, the fixer removes", () => {
  const en = ["# Titel {#titel}", "", "##### Resources", "", "Text"].join("\n")
  const shapes = [
    "##### Ressourcen {#}",
    "##### Ressourcen {#} (Fortsetzung)",
    "##### {#} Ressourcen",
    "#####\tRessourcen {#}",
    "  ##### Ressourcen {#}",
    "Ein Satz mit {#} darin.",
  ]
  for (const shape of shapes) {
    const tr = ["# Titel {#titel}", "", shape, "", "Text"].join("\n")
    const before = verifyMarkdown(en, tr, "f.md")
    expect(
      before.some((f) => f.check === "empty-anchor"),
      `gate should flag: ${shape}`
    ).toBe(true)
    const fixed = _testOnly.fixEmptyHeadingAnchors(tr).content
    expect(
      verifyMarkdown(en, fixed, "f.md").some((f) => f.check === "empty-anchor"),
      `fixer should clear: ${shape}`
    ).toBe(false)
  }
})

test("neither gate nor fixer touches {#} inside code", () => {
  const en = ["# Titel {#titel}", "", "Text"].join("\n")
  const tr = [
    "# Titel {#titel}",
    "",
    "Ein leerer Anker `{#}` bricht.",
    "",
    "```js",
    "const x = {#}",
    "```",
  ].join("\n")
  expect(
    verifyMarkdown(en, tr, "f.md").some((f) => f.check === "empty-anchor")
  ).toBe(false)
  expect(_testOnly.fixEmptyHeadingAnchors(tr).content).toBe(tr)
})

// --- corpus invariant ------------------------------------------------------

test("no English source leaves an inline code span unclosed", () => {
  // An unclosed span is what arms the bug above. PR #19476 closed the four
  // that existed; this keeps a fifth from being authored.
  const walk = (d: string): string[] =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(d, e.name)
      if (e.isDirectory()) return p.endsWith("translations") ? [] : walk(p)
      return p.endsWith(".md") ? [p] : []
    })

  const offenders: string[] = []
  for (const file of walk(path.join(REPO, "public/content"))) {
    const lines = fs.readFileSync(file, "utf-8").split("\n")
    const prose = proseLineMask(lines)
    lines.forEach((line, i) => {
      if (!prose[i]) return
      const left = line.replace(/`[^`\n]+`/g, "").replace(/``/g, "")
      if (left.includes("`"))
        offenders.push(`${path.relative(REPO, file)}:${i + 1}`)
    })
  }
  expect(offenders).toEqual([])
})
