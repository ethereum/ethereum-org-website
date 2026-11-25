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

test.describe("code fences against the baseline", () => {
  const fence = (code: string) => "```js\n" + code + "\n```"
  const EN_A = `## Setup {#setup}

Run it:

${fence("    const a = 1")}
`
  const DE_A = `## Einrichtung {#setup}

Ausführen:

${fence("const a = 1")}
`
  // English adds a fence above the one the locale already broke
  const EN_B = EN_A.replace(
    "Run it:",
    `Install:\n\n${fence("npm i")}\n\nRun it:`
  )
  const DE_B = DE_A.replace(
    "Ausführen:",
    `Installieren:\n\n${fence("npm i")}\n\nAusführen:`
  )

  test("a fence the locale already broke passes once English renumbers it", () => {
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: EN_B,
        output: DE_B,
        baseline: DE_A,
        baselineEnglish: EN_A,
        mode: "incremental",
      })
    ).toEqual([])
  })

  test("a renumbered defect is matched by content even without the baseline's English", () => {
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: EN_B,
        output: DE_B,
        baseline: DE_A,
        mode: "incremental",
      })
    ).toEqual([])
  })

  test("code the merge left stale fails although no fence moved", () => {
    const enB = EN_A.replace("const a = 1", "const a = 2")
    const de = DE_A.replace("const a = 1", "    const a = 1")
    const failures = structuralRegressions({
      destPath: "x.md",
      fileType: "markdown",
      english: enB,
      output: de,
      baseline: de,
      baselineEnglish: EN_A,
      mode: "incremental",
    })
    expect(failures).toEqual([
      "code-fence-content: fence 1 (`js`) body differs from English",
    ])
  })

  test("a language tag the locale already had wrong passes; a stale one fails", () => {
    const tag = (lang: string, code: string) =>
      "```" + lang + "\n" + code + "\n```"
    const doc = (...fences: string[]) =>
      `## Setup {#setup}\n\n${fences.join("\n\n")}\n`
    const input = {
      destPath: "x.md",
      fileType: "markdown" as const,
      mode: "incremental" as const,
    }
    const broken = tag("bash", "const a = 1")
    expect(
      structuralRegressions({
        ...input,
        english: doc(fence("npm i"), tag("sh", "    const a = 1")),
        output: doc(fence("npm i"), broken),
        baseline: doc(broken),
        baselineEnglish: doc(tag("sh", "    const a = 1")),
      })
    ).toEqual([])
    const stale = doc(tag("bash", "const a = 1"))
    expect(
      structuralRegressions({
        ...input,
        english: doc(tag("sh", "const a = 1")),
        output: stale,
        baseline: stale,
        baselineEnglish: stale,
      })
    ).toEqual(["code-fence-lang: fence 1: en=`sh` tr=`bash`"])
  })

  test("a defect is still known when English drops a fence the locale lacked", () => {
    // The locale never had English's second fence, so its fences never lined
    // up with its own English; English then deletes that fence.
    const enA = `${EN_A}\n${fence("npm test")}\n`
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: EN_A,
        output: DE_A,
        baseline: DE_A,
        baselineEnglish: enA,
        mode: "incremental",
      })
    ).toEqual([])
  })

  test("fences in subsections English reordered are out of place, not wrong", () => {
    const sub = (a: string, b: string) =>
      `## Setup {#setup}\n\n### ${a}\n\n${fence(a === "One {#one}" ? "npm i" : "npm start")}\n\n### ${b}\n\n${fence(b === "One {#one}" ? "npm i" : "npm start")}\n`
    const before = sub("One {#one}", "Two {#two}")
    const after = sub("Two {#two}", "One {#one}")
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: after,
        output: before,
        baseline: before,
        baselineEnglish: before,
        mode: "incremental",
      })
    ).toEqual([])
  })

  test("a second copy of an old defect is new", () => {
    const failures = structuralRegressions({
      destPath: "x.md",
      fileType: "markdown",
      english: `${EN_A}\n${fence("    const a = 1")}\n`,
      output: `${DE_A}\n${fence("const a = 1")}\n`,
      baseline: DE_A,
      baselineEnglish: EN_A,
      mode: "incremental",
    })
    expect(failures).toEqual([
      "code-fence-content: fence 2 (`js`) body differs from English",
    ])
  })
})

test.describe("headings against the baseline", () => {
  // zh optimistic-rollups: the locale was one heading short of the English it
  // was translated from, which only showed once English deleted a section.
  const EN_A = "## A {#a}\n\nx\n\n## B {#b}\n\ny\n\n## C {#c}\n\nz\n"
  const DE_A = "## A {#a}\n\nx\n\n## C {#c}\n\nz\n"
  const EN_B = "## A {#a}\n\nx\n\n## B {#b}\n\ny\n"
  const DE_B = "## A {#a}\n\nx\n"
  const input = {
    destPath: "x.md",
    fileType: "markdown" as const,
    english: EN_B,
    baseline: DE_A,
    mode: "incremental" as const,
  }

  test("a heading the locale was already missing is not new", () => {
    expect(
      structuralRegressions({ ...input, output: DE_B, baselineEnglish: EN_A })
    ).toEqual([])
  })

  test("a locale two headings short may lose one of the gap to an English deletion", () => {
    // English A has A/B/C/D, the locale only A/D; English B deletes B
    const enA = "## A {#a}\n\n## B {#b}\n\n## C {#c}\n\n## D {#d}\n"
    const de = "## A {#a}\n\n## D {#d}\n"
    expect(
      structuralRegressions({
        destPath: "x.md",
        fileType: "markdown",
        english: enA.replace("## B {#b}\n\n", ""),
        output: de,
        baseline: de,
        baselineEnglish: enA,
        mode: "incremental",
      })
    ).toEqual([])
  })

  test("losing one more heading is", () => {
    expect(
      structuralRegressions({
        ...input,
        english: EN_A,
        output: "## A {#a}\n\nx\n",
        baselineEnglish: EN_A,
      })
    ).toEqual(["heading-count: en=3 tr=1"])
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
