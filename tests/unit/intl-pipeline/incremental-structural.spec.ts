/**
 * Structural propagation regressions -- issue #18940.
 *
 * Covers the four defects that let incremental (`auto`) mode corrupt locale
 * files: unscoped value substitutions, LLM-delegated heading lines, deleted
 * content that was never removed, and the absence of a post-assembly check.
 *
 * The three `regression/` fixtures are the real English diffs and the real `de`
 * locale file from the runs that corrupted up to 24 locales at a time (commits
 * 968c366354, 7a72aa50b4, 2e88449b8d).
 *
 * LLM mocks return body-only content, which is the production contract:
 * buildSectionList sends a section's body and passes its heading as a prompt
 * attribute, so a section's heading line never comes back in the response.
 */

import { readFileSync } from "node:fs"
import { join } from "node:path"
import { expect, test } from "@playwright/test"

import {
  findStructuralRegressions,
  getLlmSectionIds,
  pipeline,
} from "../../../src/scripts/intl-pipeline"
import { findSection } from "../../../src/scripts/intl-pipeline/pipeline"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FIXTURES = join(__dirname, "../../fixtures/incremental")
const read = (p: string) => readFileSync(join(FIXTURES, p), "utf-8")

const readCase = (name: string) => ({
  englishA: read(`regression/${name}/english-a.md`),
  englishB: read(`regression/${name}/english-b.md`),
  localeA: read(`regression/${name}/locale-a.de.md`),
})

const sectionOf = (text: string, id: string) => {
  const sec = findSection(text, id)
  return sec ? text.slice(sec.start, sec.end).trimEnd() : null
}

/** Body of an English section, heading line stripped -- what the LLM returns. */
const bodyOnly = (english: string, sectionId: string) => {
  const sec = findSection(english, sectionId)
  if (!sec) return ""
  const section = english.slice(sec.start, sec.end)
  return section.slice(section.indexOf("\n") + 1).trim()
}

/** Model that honours the body-only contract for every requested section. */
const bodyOnlyTranslator = (english: string) => (sectionId: string) =>
  bodyOnly(english, sectionId)

const headingsOf = (text: string) => {
  const out: string[] = []
  let inFence = false
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence
      continue
    }
    if (!inFence && /^#{1,6}\s/.test(line)) out.push(line)
  }
  return out
}

const countOf = (text: string, needle: string) => text.split(needle).length - 1

// ===================================================================
// Defect 3: value substitutions must be scoped to the changed section
// ===================================================================

test.describe("scoped value substitution", () => {
  const enA = `---
title: Scoping
---

## Community {#community}

Ask questions on the [chat server](https://chat.example/invite).

## Contact {#contact}

Reach the team on the [chat server](https://chat.example/invite).
`
  const enB = enA.replace(
    "Ask questions on the [chat server](https://chat.example/invite).",
    "Ask questions on the [chat server](https://forum.example/new)."
  )
  const locale = `---
title: Bereich
---

## Gemeinschaft {#community}

Stellen Sie Fragen auf dem [Chat-Server](https://chat.example/invite).

## Kontakt {#contact}

Erreichen Sie das Team auf dem [Chat-Server](https://chat.example/invite).
`

  test("rewrites only the occurrence inside the changed section", () => {
    const result = pipeline(enA, enB, locale, "markdown")
    expect(sectionOf(result, "community")).toContain(
      "https://forum.example/new"
    )
    expect(sectionOf(result, "community")).not.toContain(
      "https://chat.example/invite"
    )
    expect(sectionOf(result, "contact")).toBe(sectionOf(locale, "contact"))
  })

  test("real run 1: the untouched section keeps its Discord link", () => {
    // translation-program/index.md moved one Discord link to a GitHub issue URL;
    // the second Discord link, in {#get-in-touch}, was rewritten too.
    const { englishA, englishB, localeA } = readCase("translation-program")
    const result = pipeline(englishA, englishB, localeA, "markdown")
    expect(sectionOf(result, "get-in-touch")).toBe(
      sectionOf(localeA, "get-in-touch")
    )
    expect(countOf(result, "https://discord.gg/ethereum-org")).toBeGreaterThan(
      0
    )
  })

  test("real run 1: unrelated links are not repointed by the index cascade", () => {
    // Positional pairing reported help-us-translate's step links as changing to
    // the new gratitude paragraph's hrefs; a document-wide replace applied them.
    const { englishA, englishB, localeA } = readCase("translation-program")
    const result = pipeline(englishA, englishB, localeA, "markdown")
    expect(sectionOf(result, "guides-and-resources")).toContain(
      "/contributing/translation-program/translators-guide/"
    )
  })
})

// ===================================================================
// Defect 2: the locale's heading line is not the model's responsibility
// ===================================================================

test.describe("heading preservation", () => {
  test("real run 3: a one-sentence change keeps the section heading", () => {
    // translators-guide/index.md: single 1:1 sentence replacement dropped
    // `## Using Crowdin {#using-crowdin}` in 17 of 24 locales.
    const { englishA, englishB, localeA } = readCase("translators-guide")
    expect(getLlmSectionIds(englishA, englishB, "markdown")).toEqual([
      "using-crowdin",
    ])

    const result = pipeline(
      englishA,
      englishB,
      localeA,
      "markdown",
      bodyOnlyTranslator(englishB)
    )
    expect(result).toContain("## Nutzung von Crowdin {#using-crowdin}")
    expect(headingsOf(result)).toEqual(headingsOf(localeA))
  })

  test("real run 3: the blank line before the next heading survives", () => {
    const { englishA, englishB, localeA } = readCase("translators-guide")
    const result = pipeline(
      englishA,
      englishB,
      localeA,
      "markdown",
      bodyOnlyTranslator(englishB)
    )
    const lines = result.split("\n")
    for (const [i, line] of lines.entries()) {
      if (i > 0 && /^#{1,6}\s/.test(line)) {
        expect(lines[i - 1].trim(), `blank line before ${line}`).toBe("")
      }
    }
  })

  test("real run 2: an edited section keeps its heading and its siblings' headings", () => {
    // contributing/index.md: one bullet replaced plus a trailing sentence
    // removed; 19 of 24 locales lost {#how-to-update-content} entirely.
    const { englishA, englishB, localeA } = readCase("contributing")
    const result = pipeline(
      englishA,
      englishB,
      localeA,
      "markdown",
      bodyOnlyTranslator(englishB)
    )
    expect(result).toContain("{#how-to-update-content}")
    expect(headingsOf(result)).toEqual(headingsOf(localeA))
  })

  test("keeps the locale's translated heading text, not English", () => {
    const enA = `## Section one {#one}

Old text.
`
    const enB = `## Section one {#one}

New text with more detail.
`
    const locale = `## Abschnitt eins {#one}

Alter Text.
`
    const result = pipeline(enA, enB, locale, "markdown", () => "Neuer Text.")
    expect(result).toContain("## Abschnitt eins {#one}")
    expect(result).toContain("Neuer Text.")
    expect(result).not.toContain("Alter Text.")
  })

  test("a model-echoed heading keeps the expected anchor", () => {
    const enA = `## Section one {#one}

Old text.
`
    const enB = `## Section one {#one}

New text.
`
    const locale = `## Abschnitt eins {#one}

Alter Text.
`
    const result = pipeline(
      enA,
      enB,
      locale,
      "markdown",
      () => "## Abschnitt eins {#wrong-anchor}\n\nNeuer Text."
    )
    expect(result).toContain("## Abschnitt eins {#one}")
    expect(result).not.toContain("{#wrong-anchor}")
  })

  test("an empty model response leaves the locale section alone", () => {
    const enA = `## Section one {#one}

Old text.

## Section two {#two}

Kept.
`
    const enB = enA.replace("Old text.", "New text.")
    const locale = `## Abschnitt eins {#one}

Alter Text.

## Abschnitt zwei {#two}

Behalten.
`
    const result = pipeline(enA, enB, locale, "markdown", () => "   ")
    expect(result).toContain("## Abschnitt eins {#one}")
    expect(result).toContain("Alter Text.")
    expect(result).toContain("Behalten.")
  })
})

// ===================================================================
// Defect 1: deleted content is removed, not left behind
// ===================================================================

test.describe("removal propagation", () => {
  const enA = `---
title: Removal
---

## Alpha {#alpha}

Alpha body.

## Beta {#beta}

Beta body.

### Beta child {#beta-child}

Beta child body.

## Gamma {#gamma}

Gamma body.
`
  const locale = `---
title: Entfernung
---

## Alpha {#alpha}

Alpha-Text.

## Beta {#beta}

Beta-Text.

### Beta-Kind {#beta-child}

Beta-Kind-Text.

## Gamma {#gamma}

Gamma-Text.
`

  test("a deleted section disappears from the locale, siblings intact", () => {
    const enB = enA.replace(
      `## Beta {#beta}

Beta body.

### Beta child {#beta-child}

Beta child body.

`,
      ""
    )
    const result = pipeline(enA, enB, locale, "markdown")
    expect(result).not.toContain("{#beta}")
    expect(result).not.toContain("Beta-Text.")
    expect(result).not.toContain("{#beta-child}")
    expect(result).not.toContain("Beta-Kind-Text.")
    expect(sectionOf(result, "alpha")).toBe(sectionOf(locale, "alpha"))
    expect(sectionOf(result, "gamma")).toBe(sectionOf(locale, "gamma"))
  })

  test("a subsection English still has is never collateral damage", () => {
    // Parent heading deleted, child promoted to h2 and kept.
    const enB = enA
      .replace(
        `## Beta {#beta}

Beta body.

`,
        ""
      )
      .replace("### Beta child {#beta-child}", "## Beta child {#beta-child}")
    const result = pipeline(enA, enB, locale, "markdown")
    expect(result).not.toContain("Beta-Text.")
    expect(result).toContain("{#beta-child}")
    expect(result).toContain("Beta-Kind-Text.")
  })

  test("a deleted list item rides along with the section retranslation", () => {
    // Prose-level deletions are not matched by identifier; they change the
    // section's translatable content, so the whole section is retranslated.
    const listA = `## Steps {#steps}

1. First step.
2. Second step, to be removed.
3. Third step.

## Next {#next}

Next body.
`
    const listB = listA.replace("2. Second step, to be removed.\n", "")
    const listLocale = `## Schritte {#steps}

1. Erster Schritt.
2. Zweiter Schritt, zu entfernen.
3. Dritter Schritt.

## Weiter {#next}

Weiterer Text.
`
    expect(getLlmSectionIds(listA, listB, "markdown")).toContain("steps")

    const result = pipeline(
      listA,
      listB,
      listLocale,
      "markdown",
      () => "1. Erster Schritt.\n2. Dritter Schritt."
    )
    expect(result).toContain("## Schritte {#steps}")
    expect(result).not.toContain("Zweiter Schritt, zu entfernen.")
    expect(result).toContain("Erster Schritt.")
    expect(result).toContain("Dritter Schritt.")
    expect(sectionOf(result, "next")).toBe(sectionOf(listLocale, "next"))
  })

  test("a deleted component is removed from its own section only", () => {
    const compA = `---
title: Components
---

## Alpha {#alpha}

Alpha body.

<QuizWidget quizKey="alpha-quiz" />

## Beta {#beta}

Beta body.

<QuizWidget quizKey="beta-quiz" />
`
    const compB = compA.replace('\n<QuizWidget quizKey="alpha-quiz" />\n', "")
    const compLocale = `---
title: Komponenten
---

## Alpha {#alpha}

Alpha-Text.

<QuizWidget quizKey="alpha-quiz" />

## Beta {#beta}

Beta-Text.

<QuizWidget quizKey="beta-quiz" />
`
    const result = pipeline(compA, compB, compLocale, "markdown")
    expect(result).not.toContain('quizKey="alpha-quiz"')
    expect(result).toContain('quizKey="beta-quiz"')
    expect(result).toContain("Alpha-Text.")
    expect(result).toContain("Beta-Text.")
  })

  test("real run 1: a renamed section's body is retranslated, not left stale", () => {
    // {#help-us-translate} -> {#program-status} with the Crowdin steps and
    // <ButtonLink> deleted: all 24 locales kept the old list under the new
    // anchor because renames go to neither `added` nor `translatableDrift`.
    const { englishA, englishB, localeA } = readCase("translation-program")
    expect(getLlmSectionIds(englishA, englishB, "markdown")).toContain(
      "program-status"
    )

    const result = pipeline(
      englishA,
      englishB,
      localeA,
      "markdown",
      bodyOnlyTranslator(englishB)
    )
    expect(result).toContain("{#program-status}")
    expect(result).not.toContain("{#help-us-translate}")
    expect(result).not.toContain("crowdin.com/project/ethereum-org")
    expect(result).not.toContain("Start translating")
    expect(result).not.toContain("Melden Sie sich bei Ihrem Crowdin-Konto an")
    expect(sectionOf(result, "program-status")).toContain(
      "/contributing/translation-program/acknowledgements/"
    )
  })
})

// ===================================================================
// Defect 4: post-assembly invariants drive the full-translation fallback
// ===================================================================

test.describe("structural invariants", () => {
  const enA = `## Alpha {#alpha}

Alpha body with [link](https://a.example/).

## Beta {#beta}

Beta body with [other](https://b.example/).
`
  const enB = enA.replace("Alpha body", "Alpha body, revised,")
  const locale = `## Alpha {#alpha}

Alpha-Text mit [Link](https://a.example/).

## Beta {#beta}

Beta-Text mit [anderem](https://b.example/).
`

  test("a healthy incremental merge reports nothing", () => {
    const result = pipeline(
      enA,
      enB,
      locale,
      "markdown",
      bodyOnlyTranslator(enB)
    )
    expect(findStructuralRegressions(enA, locale, enB, result)).toEqual([])
  })

  test("a wiped section is reported (this is what triggers the fallback)", () => {
    const wiped = locale.replace(
      `## Alpha {#alpha}

Alpha-Text mit [Link](https://a.example/).

`,
      ""
    )
    const regressions = findStructuralRegressions(enA, locale, enB, wiped)
    expect(regressions.length).toBeGreaterThan(0)
    expect(regressions.some((r) => r.kind === "anchor")).toBe(true)
    expect(regressions.some((r) => r.kind === "href")).toBe(true)
  })

  test("a dropped heading is reported even when the prose is fine", () => {
    const headless = locale.replace("## Alpha {#alpha}\n\n", "")
    const regressions = findStructuralRegressions(enA, locale, enB, headless)
    expect(regressions.some((r) => r.kind === "anchor")).toBe(true)
    expect(regressions.some((r) => r.kind === "heading-count")).toBe(true)
  })

  test("stale content English removed is reported", () => {
    const enRemoved = enA.replace(
      "Beta body with [other](https://b.example/).",
      "Beta body."
    )
    const regressions = findStructuralRegressions(
      enA,
      locale,
      enRemoved,
      locale
    )
    expect(
      regressions.some(
        (r) => r.kind === "href" && r.detail.includes("https://b.example/")
      )
    ).toBe(true)
  })

  test("drift that predates the run is not reported", () => {
    // Locale files legitimately trail English; only regressions this run
    // introduced are actionable.
    const drifted = locale.replace(
      `## Beta {#beta}

Beta-Text mit [anderem](https://b.example/).
`,
      ""
    )
    const result = pipeline(
      enA,
      enB,
      drifted,
      "markdown",
      bodyOnlyTranslator(enB)
    )
    expect(findStructuralRegressions(enA, drifted, enB, result)).toEqual([])
  })

  test("JSON files are out of scope", () => {
    expect(findStructuralRegressions("{}", "{}", "{}", "{}", "json")).toEqual(
      []
    )
  })

  test("real runs 1 and 3 produce no regressions once merged correctly", () => {
    for (const name of ["translation-program", "translators-guide"]) {
      const { englishA, englishB, localeA } = readCase(name)
      const result = pipeline(
        englishA,
        englishB,
        localeA,
        "markdown",
        bodyOnlyTranslator(englishB)
      )
      expect(
        findStructuralRegressions(englishA, localeA, englishB, result),
        name
      ).toEqual([])
    }
  })

  test("real run 2: a section missing from the locale forces the fallback", () => {
    // The de file has no {#ways-to-contribute} heading, so the merge has nowhere
    // to put the rewritten bullet -- the reported reason 20 of 24 locales never
    // received it. The new href going missing is what triggers full translation.
    const { englishA, englishB, localeA } = readCase("contributing")
    const result = pipeline(
      englishA,
      englishB,
      localeA,
      "markdown",
      bodyOnlyTranslator(englishB)
    )
    const regressions = findStructuralRegressions(
      englishA,
      localeA,
      englishB,
      result
    )
    expect(
      regressions.some(
        (r) =>
          r.kind === "href" &&
          r.detail.includes(
            "https://github.com/ethereum/ethereum-org-website/issues/new/choose"
          )
      )
    ).toBe(true)
  })
})
