/**
 * Pre-commit gates (src/scripts/intl-pipeline/lib/gates.ts).
 *
 * Structure is judged with verify-structure's checks; incremental output only
 * has to be no worse than the locale it replaces, full output has to be clean.
 * Markdown must also compile with the site's MDX chain, and JSON must keep
 * every nested key path.
 */

import { expect, test } from "@playwright/test"

import {
  jsonDeepParity,
  mdxCompileError,
  runGates,
  structuralRegressions,
} from "../../../src/scripts/intl-pipeline/lib/gates"

const EN = `---
title: "Guide"
description: "A guide"
---

## First {#first}

Text with a [link](/first/) and <ExpandableCard title="What is 'x'?">inner</ExpandableCard>.

## Second {#second}

More text.
`

const DE_GOOD = EN.replace("Guide", "Leitfaden")
  .replace("A guide", "Ein Leitfaden")
  .replace("## First {#first}", "## Erstens {#first}")
  .replace("## Second {#second}", "## Zweitens {#second}")
  .replace("Text with a [link](/first/)", "Text mit einem [Link](/first/)")
  .replace("More text.", "Mehr Text.")

/** A locale that already lost the second anchor before this run. */
const DE_DAMAGED = DE_GOOD.replace("## Zweitens {#second}", "## Zweitens")

test.describe("structural gate", () => {
  test("clean incremental output passes", () => {
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: EN,
        output: DE_GOOD,
        baseline: DE_GOOD,
        mode: "incremental",
      })
    ).toEqual([])
  })

  test("incremental output tolerates the baseline's pre-existing damage", () => {
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: EN,
        output: DE_DAMAGED,
        baseline: DE_DAMAGED,
        mode: "incremental",
      })
    ).toEqual([])
  })

  test("incremental output that drops another anchor fails", () => {
    const worse = DE_DAMAGED.replace("## Erstens {#first}", "## Erstens")
    const failures = structuralRegressions({
      destPath: "x.md",
      fileType: "markdown",
      english: EN,
      output: worse,
      baseline: DE_DAMAGED,
      mode: "incremental",
    })
    expect(failures.some((f) => f.startsWith("heading-anchor"))).toBe(true)
  })

  test("a renamed closing tag fails (the PR #19115 shape)", () => {
    const worse = DE_GOOD.replace("</ExpandableCard>", "</ButtonLink>")
    const failures = structuralRegressions({
      destPath: "x.md",
      fileType: "markdown",
      english: EN,
      output: worse,
      baseline: DE_GOOD,
      mode: "incremental",
    })
    expect(failures.some((f) => f.startsWith("jsx-tags"))).toBe(true)
  })

  test("full translations are held to the absolute bar", () => {
    const failures = structuralRegressions({
      destPath: "x.md",
      fileType: "markdown",
      english: EN,
      output: DE_DAMAGED,
      mode: "full",
    })
    expect(failures.some((f) => f.startsWith("heading-anchor"))).toBe(true)
  })

  test("a first translation with no baseline is absolute too", () => {
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: EN,
        output: DE_GOOD,
        mode: "incremental",
      })
    ).toEqual([])
  })
})

test.describe("mdx gate", () => {
  test("valid MDX compiles", async () => {
    expect(await mdxCompileError(DE_GOOD)).toBeNull()
  })

  test("an inner double quote in a JSX attribute is caught", async () => {
    const broken = DE_GOOD.replace(
      `title="What is 'x'?"`,
      `title="Was ist "x"?"`
    )
    expect(await mdxCompileError(broken)).not.toBeNull()
  })

  test("an unclosed tag is caught", async () => {
    expect(await mdxCompileError(DE_GOOD + "\n<Foo\n")).not.toBeNull()
  })

  test("an unquoted frontmatter scalar with a colon is caught", async () => {
    const broken = DE_GOOD.replace(
      'description: "Ein Leitfaden"',
      "description: Ein: Leitfaden"
    )
    expect(await mdxCompileError(broken)).not.toBeNull()
  })
})

test.describe("json gate", () => {
  const en = JSON.stringify({
    a: "x",
    nested: { b: "y", c: { d: "z" } },
    list: ["1", "2"],
  })

  test("identical key paths pass", () => {
    const de = JSON.stringify({
      a: "X",
      nested: { b: "Y", c: { d: "Z" } },
      list: ["eins", "zwei"],
    })
    expect(jsonDeepParity(en, de)).toEqual([])
  })

  test("a key dropped inside a namespace fails (top-level parity would miss it)", () => {
    const de = JSON.stringify({
      a: "X",
      nested: { b: "Y", c: {} },
      list: ["eins", "zwei"],
    })
    const failures = jsonDeepParity(en, de)
    expect(failures.some((f) => f.includes("nested.c.d"))).toBe(true)
  })

  test("a list that changed length fails", () => {
    const de = JSON.stringify({
      a: "X",
      nested: { b: "Y", c: { d: "Z" } },
      list: ["eins"],
    })
    expect(jsonDeepParity(en, de).some((f) => f.includes("list[1]"))).toBe(true)
  })

  test("invalid JSON fails", () => {
    expect(jsonDeepParity(en, "{ not json")[0]).toMatch(/^json-parse/)
  })
})

test.describe("runGates", () => {
  test("reports every failing gate at once", async () => {
    const worse = DE_GOOD.replace("</ExpandableCard>", "</ButtonLink>").replace(
      "## Erstens {#first}",
      "## Erstens {#}"
    )
    const result = await runGates({
      destPath: "x.md",
      fileType: "markdown",
      english: EN,
      output: worse,
      baseline: DE_GOOD,
      mode: "incremental",
    })
    expect(result.ok).toBe(false)
    expect(result.failures.some((f) => f.startsWith("structure"))).toBe(true)
    expect(result.failures.some((f) => f.startsWith("mdx"))).toBe(true)
  })

  test("passes clean output", async () => {
    const result = await runGates({
      destPath: "x.md",
      fileType: "markdown",
      english: EN,
      output: DE_GOOD,
      baseline: DE_GOOD,
      mode: "incremental",
    })
    expect(result).toEqual({ ok: true, failures: [] })
  })
})
