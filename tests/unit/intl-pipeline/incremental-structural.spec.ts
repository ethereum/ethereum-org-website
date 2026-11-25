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
    expect(countOf(result, "/discord/")).toBeGreaterThan(0)
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

  test("an inline code span English changed but the locale kept is reported", () => {
    // evm/opcodes: the locale's table cell words the span differently, so the
    // substitution has nothing to rewrite
    const enCode = enA.replace("Beta body", "Run `npm ci`. Beta body")
    const deCode = locale.replace("Beta-Text", "`npm  ci` ausführen. Beta-Text")
    const enCodeB = enCode.replace("`npm ci`", "`pnpm i`")
    const result = pipeline(enCode, enCodeB, deCode, "markdown")
    expect(
      findStructuralRegressions(enCode, deCode, enCodeB, result).map(
        (r) => r.detail
      )
    ).toContain("`pnpm i` not updated in locale")
  })

  test("a code span count a retranslated section corrects is not reported", () => {
    // transfers-and-approval: English `approve` 1 -> 2 in a routed section the
    // locale already had at 2
    const enCode = enA.replace("Beta body", "Call `approve`. Beta body")
    const deCode = locale.replace(
      "Beta-Text",
      "`approve` und `approve` aufrufen. Beta-Text"
    )
    const enCodeB = enCode.replace(
      "Call `approve`. Beta body",
      "Call `approve`, then `approve` again. Beta body, revised"
    )
    const result = pipeline(
      enCode,
      enCodeB,
      deCode,
      "markdown",
      bodyOnlyTranslator(enCodeB)
    )
    expect(
      findStructuralRegressions(enCode, deCode, enCodeB, result).filter(
        (r) => r.kind === "code-span"
      )
    ).toEqual([])
  })

  test("a changed section the locale doesn't have is reported", () => {
    // evm/opcodes (de): the locale lost the page's only heading, so the
    // retranslated #beta had nowhere to go and the edit vanished
    const headless = locale.replace("## Beta {#beta}\n\n", "")
    const enEdited = enA.replace("Beta body", "Beta body, revised,")
    const result = pipeline(
      enA,
      enEdited,
      headless,
      "markdown",
      bodyOnlyTranslator(enEdited)
    )
    expect(
      findStructuralRegressions(enA, headless, enEdited, result).map(
        (r) => r.detail
      )
    ).toContain("{#beta} changed but not in locale")
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

// ---------------------------------------------------------------------------
// Code fence edits
// ---------------------------------------------------------------------------

test.describe("code fence edits", () => {
  // run-node-raspberry-pi: English bumped the image name inside a fence and
  // nothing else in the section, and all 24 locales kept the old command.
  const enA = `Intro with a fence:

\`\`\`shell
make old
\`\`\`

## Flash {#flash}

Flash the card.

\`\`\`shell
# unzip and flash image
unzip ethonarm_22.04.00.img.zip
\`\`\`

## Next {#next}

Done.
`
  const enB = enA
    .replace("make old", "make new")
    .replace("ethonarm_22.04.00", "ethonarm_rpi5_<version>")
  const locale = `Einleitung mit Block:

\`\`\`shell
make old
\`\`\`

## Flashen {#flash}

Die Karte flashen.

\`\`\`shell
# Image entpacken und flashen
unzip ethonarm_22.04.00.img.zip
\`\`\`

## Weiter {#next}

Fertig.
`

  test("a code-only edit sends its section and the preamble to the model", () => {
    const ids = getLlmSectionIds(enA, enB, "markdown")
    expect(ids).toContain("flash")
    expect(ids).toContain("_preamble")
    expect(ids).not.toContain("next")
  })

  // The preamble has no heading, so the model gets and returns its whole text
  const translator = (english: string) => (id: string, content: string) =>
    id === "_preamble" ? content : bodyOnly(english, id)

  test("the merged fence is English-B's code", () => {
    const result = pipeline(enA, enB, locale, "markdown", translator(enB))
    expect(result).toContain("unzip ethonarm_rpi5_<version>.img.zip")
    expect(result).not.toContain("ethonarm_22.04.00")
    expect(result).toContain("make new")
    expect(sectionOf(result, "next")).toBe("## Weiter {#next}\n\nFertig.")
    expect(findStructuralRegressions(enA, locale, enB, result)).toEqual([])
  })

  test("a changed language tag alone sends its section to the model", () => {
    // how-to-use-slither: `bash` became `sh` and nothing else in the fence moved
    const retagged = enA.replace("```shell\n# unzip", "```sh\n# unzip")
    expect(getLlmSectionIds(enA, retagged, "markdown")).toEqual(["flash"])
    const result = pipeline(
      enA,
      retagged,
      locale,
      "markdown",
      translator(retagged)
    )
    expect(result).toContain("```sh\n# unzip")
    expect(
      findStructuralRegressions(enA, locale, retagged, locale).map(
        (r) => r.kind
      )
    ).toContain("code-fence")
  })

  test("a fence the merge left stale is reported", () => {
    const regressions = findStructuralRegressions(enA, locale, enB, locale)
    expect(regressions.filter((r) => r.kind === "code-fence")).toHaveLength(4)
  })

  test("a fence already broken before the run is not reported", () => {
    // secret-state: the locale lost the fence's indentation long ago; English
    // now adds a fence in another section.
    const indented = enA.replace("make old", "    make old")
    const broken = locale // still `make old`, unindented
    const added = indented.replace("Done.", "Done.\n\n```shell\nls\n```")
    const result = pipeline(
      indented,
      added,
      broken,
      "markdown",
      translator(added)
    )
    expect(result).toContain("```shell\nls\n```")
    expect(findStructuralRegressions(indented, broken, added, result)).toEqual(
      []
    )
  })
})

// ---------------------------------------------------------------------------
// Sections with subsections
// ---------------------------------------------------------------------------

test.describe("sections with subsections", () => {
  const enA = `## Setup {#setup}

Install the package first.

\`\`\`bash
npm i old-pkg
\`\`\`

### Install {#install}

Run \`old-cmd\` to finish.

<YouTube id="aaa111" />

## Run {#run}

Pick a client.

##### Geth

Geth syncs in a day.

## Next {#next}

Done.
`
  const locale = `## Einrichtung {#setup}

Zuerst das Paket installieren.

\`\`\`bash
npm i old-pkg
\`\`\`

### Installation {#install}

Mit \`old-cmd\` abschließen.

<YouTube id="aaa111" />

## Ausführen {#run}

Einen Client wählen.

##### Geth

Geth synchronisiert an einem Tag.

## Weiter {#next}

Fertig.
`
  const translator = (english: string) => (id: string) => bodyOnly(english, id)

  test("a parent's own prose edit retranslates the parent (it used to route `prose:0`)", () => {
    // app-plasma #stage-2, roadmap/privacy #private-writes: the edit was dropped
    // and the manifest stamped
    const enB = enA.replace("Install the package first.", "Install it first.")
    expect(getLlmSectionIds(enA, enB, "markdown")).toEqual(["setup"])
    const result = pipeline(enA, enB, locale, "markdown", translator(enB))
    expect(sectionOf(result, "setup")).toContain("Install it first.")
    expect(sectionOf(result, "install")).toContain("Mit `old-cmd` abschließen.")
  })

  test("a routed parent still applies its subsections' inert edits", () => {
    const enB = enA
      .replace("npm i old-pkg", "npm i new-pkg")
      .replace("`old-cmd`", "`new-cmd`")
      .replace("aaa111", "bbb222")
    expect(getLlmSectionIds(enA, enB, "markdown")).toEqual(["setup"])
    const result = pipeline(enA, enB, locale, "markdown", translator(enB))
    expect(sectionOf(result, "setup")).toContain("npm i new-pkg")
    expect(sectionOf(result, "install")).toContain("Mit `new-cmd` abschließen.")
    expect(sectionOf(result, "install")).toContain('<YouTube id="bbb222" />')
  })

  test("a heading without an anchor travels with its section", () => {
    // run-a-node: `##### Geth` has no {#id}; the planner sends it as part of
    // #run, so the merge must replace it as part of #run too
    const enB = enA.replace("Geth syncs in a day.", "Geth syncs in hours.")
    expect(getLlmSectionIds(enA, enB, "markdown")).toEqual(["run"])
    const result = pipeline(enA, enB, locale, "markdown", translator(enB))
    expect(result.match(/^##### /gm)).toHaveLength(1)
    expect(result).toContain("Geth syncs in hours.")
    expect(findStructuralRegressions(enA, locale, enB, result)).toEqual([])
  })

  test("an inert edit under a heading without an anchor reaches the locale", () => {
    const withLink = (s: string, url: string) =>
      s.replace(/^(Geth \S+ \S+ \S+ \S+)\.$/m, `$1, see [docs](${url}).`)
    const en = withLink(enA, "https://geth.example/old")
    const de = locale.replace(
      "Geth synchronisiert an einem Tag.",
      "Geth synchronisiert an einem Tag, siehe [Doku](https://geth.example/old)."
    )
    const enB = en.replace("geth.example/old", "geth.example/new")
    const result = pipeline(en, enB, de, "markdown", translator(enB))
    expect(result).toContain("(https://geth.example/new)")
    expect(result).not.toContain("geth.example/old")
  })

  test("a subsection English adds under a section that had none is inserted", () => {
    // clear-signing: diff() reports no addition for `### Add a test file`
    const enB = enA.replace(
      "Pick a client.\n",
      "Pick a client.\n\n### Sync modes {#sync-modes}\n\nSnap or full.\n"
    )
    expect(getLlmSectionIds(enA, enB, "markdown")).toContain("sync-modes")
    const result = pipeline(enA, enB, locale, "markdown", translator(enB))
    expect(result.match(/\{#sync-modes\}/g)).toHaveLength(1)
    expect(result.indexOf("{#sync-modes}")).toBeGreaterThan(
      result.indexOf("Einen Client wählen.")
    )
    expect(result.indexOf("{#sync-modes}")).toBeLessThan(
      result.indexOf("##### Geth")
    )
    expect(findStructuralRegressions(enA, locale, enB, result)).toEqual([])
  })

  test("a new first section is inserted before the locale's first section", () => {
    // contributing/translation-program: `## How it works` became the first section
    const enB = `## Overview {#overview}\n\nRead this first.\n\n${enA}`
    const result = pipeline(enA, enB, locale, "markdown", translator(enB))
    expect(result.indexOf("{#overview}")).toBeLessThan(
      result.indexOf("{#setup}")
    )
    expect(findStructuralRegressions(enA, locale, enB, result)).toEqual([])
  })

  test("a body opening with a deeper heading keeps the section's heading", () => {
    // uniswap-v2-annotated-code: `##### _update` opens #pair-update-internal's body
    const en = enA.replace("Pick a client.\n\n", "")
    const de = locale.replace("Einen Client wählen.\n\n", "")
    const enB = en.replace("Geth syncs in a day.", "Geth syncs in hours.")
    const result = pipeline(en, enB, de, "markdown", translator(enB))
    expect(result).toContain("## Ausführen {#run}\n\n##### Geth")
    expect(findStructuralRegressions(en, de, enB, result)).toEqual([])
  })

  test("a link edit nothing applies retranslates its section", () => {
    // all-you-can-cache: every link after a fence is `link:0` again, so the
    // middle one's URL edit gets no change entry and was never applied
    const fence = (cmd: string) => "```sh\n" + cmd + "\n```"
    const links = (url: string, is = "is") =>
      [
        `[The code](https://a.example/) ${is} here.`,
        fence("forge test"),
        `[This](${url}) ${is} how.`,
        fence("forge build"),
        `[More](https://c.example/) ${is} here.`,
      ].join("\n\n")
    const en = enA.replace(
      "Install the package first.",
      links("https://old.example/x")
    )
    const de = locale.replace(
      "Zuerst das Paket installieren.",
      links("https://old.example/x", "ist")
    )
    const enB = en.replace("old.example", "new.example")
    expect(getLlmSectionIds(en, enB, "markdown")).toEqual(["setup"])
    const result = pipeline(en, enB, de, "markdown", translator(enB))
    expect(result).toContain("(https://new.example/x)")
    expect(findStructuralRegressions(en, de, enB, result)).toEqual([])
  })

  test("a value English changed in one of two places is not rewritten in both", () => {
    // videos/ethereum-staking-withdrawals: `0x00` twice, English changed one
    const en = enA.replace(
      "Pick a client.",
      "Pick `0x00` here and `0x00` there."
    )
    const de = locale.replace(
      "Einen Client wählen.",
      "Hier `0x00` und dort `0x00` wählen."
    )
    const enB = en.replace("and `0x00` there", "and `0x01` there")
    expect(getLlmSectionIds(en, enB, "markdown")).toEqual(["run"])
    const result = pipeline(en, enB, de, "markdown", translator(enB))
    expect(result.match(/`0x00`/g)).toHaveLength(1)
    expect(result.match(/`0x01`/g)).toHaveLength(1)
  })

  test("a locale heading that lost its anchor survives its neighbour's retranslation", () => {
    const de = locale.replace("## Weiter {#next}", "## Weiter")
    const enB = enA.replace("Geth syncs in a day.", "Geth syncs in hours.")
    const result = pipeline(enA, enB, de, "markdown", translator(enB))
    expect(result).toContain("## Weiter\n\nFertig.")
  })

  test("a subsection English moved is caught, not left in place", () => {
    const en = enA.replace(
      "### Install {#install}",
      "### Install {#install}\n\nFirst.\n\n### Verify {#verify}\n\nThen check."
    )
    const de = locale.replace(
      "### Installation {#install}",
      "### Installation {#install}\n\nZuerst.\n\n### Prüfen {#verify}\n\nDann prüfen."
    )
    // English moves #verify above #install
    const enB = en
      .replace("### Verify {#verify}\n\nThen check.\n\n", "")
      .replace(
        "### Install {#install}",
        "### Verify {#verify}\n\nThen check.\n\n### Install {#install}"
      )
    const result = pipeline(en, enB, de, "markdown", translator(enB))
    expect(
      findStructuralRegressions(en, de, enB, result).map((r) => r.kind)
    ).toContain("section-order")
  })

  test("a component English removed goes even when its title is translated", () => {
    // roadmap/security: matching the translated title too left de, ja and ur
    // with the card, and the dry merge on English found nothing wrong
    const card = (title: string) =>
      `<ExpandableCard title="${title}" eventCategory="/security">\n\nCard body.\n\n</ExpandableCard>`
    const en = enA.replace(
      "Pick a client.",
      `Pick a client.\n\n${card("Is Ethereum secure today?")}`
    )
    const de = locale.replace(
      "Einen Client wählen.",
      `Einen Client wählen.\n\n${card("Ist Ethereum heute sicher?")}`
    )
    const enB = en.replace(`\n\n${card("Is Ethereum secure today?")}`, "")
    const result = pipeline(en, enB, de, "markdown", translator(enB))
    expect(result).not.toContain("ExpandableCard")
  })

  test("English emptying a section's own body keeps the locale heading", () => {
    const enB = enA
      .replace("Install the package first.\n\n", "")
      .replace("```bash\nnpm i old-pkg\n```\n\n", "")
    // the model has nothing to translate, and the English fallback is the
    // English heading
    const result = pipeline(enA, enB, locale, "markdown", (_, en) => en)
    expect(result).toContain("## Einrichtung {#setup}\n\n### Installation")
  })

  test("a new section's translated heading comes back with its body", () => {
    const enB = enA.replace(
      "## Next {#next}",
      "## Troubleshooting {#troubleshooting}\n\nCheck the logs.\n\n## Next {#next}"
    )
    const result = pipeline(enA, enB, locale, "markdown", (id, en) =>
      id === "troubleshooting"
        ? "## Fehlerbehebung {#troubleshooting}\n\nDie Logs prüfen."
        : en
    )
    expect(result).toContain(
      "## Fehlerbehebung {#troubleshooting}\n\nDie Logs prüfen."
    )
  })

  test("a preamble edit the model will redo doesn't route other sections", () => {
    // javascript: the preamble's link also appears under #run; the dry merge
    // used to rewrite it there, as the real merge (which skips the preamble's
    // edits when the model redoes the preamble) never does
    const en =
      `Intro with [team](https://a.example/old) and more.\n\n${enA}`.replace(
        "Pick a client.",
        "Pick a client from [team](https://a.example/old)."
      )
    const enB = en.replace(
      "Intro with [team](https://a.example/old) and more.",
      "Intro, revised, with [team](https://a.example/new)."
    )
    expect(getLlmSectionIds(en, enB, "markdown")).toEqual(["_preamble"])
  })

  test("a prose fence retag is routed like a code fence retag", () => {
    const en = enA.replace(
      "Pick a client.",
      "Pick a client:\n\n```text\nGeth, Besu\n```"
    )
    const enB = en.replace("```text", "```txt")
    expect(getLlmSectionIds(en, enB, "markdown")).toEqual(["run"])
  })
})

// ---------------------------------------------------------------------------
// JSON routing
// ---------------------------------------------------------------------------

test.describe("JSON routing", () => {
  const A = JSON.stringify({ a: "Hello", nested: { b: "World" } }, null, 2)

  test("a new key is sent to the model", () => {
    const B = JSON.stringify(
      { a: "Hello", c: "New key", nested: { b: "World" } },
      null,
      2
    )
    expect(getLlmSectionIds(A, B, "json")).toEqual(["c"])
  })

  test("nothing changed, nothing sent", () => {
    expect(getLlmSectionIds(A, A, "json")).toEqual([])
  })
})
