import { expect, test } from "@playwright/test"

import {
  findStructuralRegressions,
  getLlmSectionIds,
  pipeline,
} from "../../../src/scripts/intl-pipeline"

const englishA = `## Payments {#payments}

Pay with Ethereum.

## Next {#next}

Read more.
`

const localeA = `## Zahlungen {#payments}

Mit Ethereum bezahlen.

## Weiter {#next}

Mehr erfahren.
`

test("inserts new inert components into the translated section without retranslation", () => {
  const englishB = englishA.replace(
    "\n## Next {#next}",
    '\n<Divider />\n\n<QuizWidget quizKey="payments" />\n\n## Next {#next}'
  )

  expect(getLlmSectionIds(englishA, englishB, "markdown")).toEqual([])

  const result = pipeline(englishA, englishB, localeA, "markdown", () => {
    throw new Error("An inert-only change must not call the LLM")
  })

  expect(result).toContain("Mit Ethereum bezahlen.")
  expect(result).toContain('<QuizWidget quizKey="payments" />')
  expect(result).toContain("<Divider />")
  expect(result).toContain(
    'Mit Ethereum bezahlen.\n\n<Divider />\n\n<QuizWidget quizKey="payments" />'
  )
  expect(result).toContain("Mehr erfahren.")
})

test("reports a newly missing component as a structural regression", () => {
  const englishB = englishA.replace(
    "\n## Next {#next}",
    '\n<QuizWidget quizKey="payments" />\n\n## Next {#next}'
  )

  expect(
    findStructuralRegressions(englishA, localeA, englishB, localeA)
  ).toEqual(
    expect.arrayContaining([expect.objectContaining({ kind: "component" })])
  )
})

test("structural guard also catches a missing non-self-closing component", () => {
  const englishB = englishA.replace(
    "\n## Next {#next}",
    "\n<Callout>\n\n</Callout>\n\n## Next {#next}"
  )

  expect(
    findStructuralRegressions(englishA, localeA, englishB, localeA)
  ).toEqual(
    expect.arrayContaining([expect.objectContaining({ kind: "component" })])
  )
})

test("places a new component before an existing component in the same section", () => {
  const oldEnglish = englishA.replace(
    "\n## Next {#next}",
    "\n<Divider />\n\n## Next {#next}"
  )
  const newEnglish = oldEnglish.replace(
    "\n<Divider />",
    '\n<QuizWidget quizKey="payments" />\n\n<Divider />'
  )
  const oldLocale = localeA.replace(
    "\n## Weiter {#next}",
    "\n<Divider />\n\n## Weiter {#next}"
  )
  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")

  expect(result.indexOf("<QuizWidget")).toBeLessThan(
    result.indexOf("<Divider />")
  )
  expect(result.match(/<Divider \/>/g)).toHaveLength(1)
  expect(result).toContain("Mit Ethereum bezahlen.")
})

test("does not add a component when only an existing attribute changes", () => {
  const oldEnglish = englishA.replace(
    "\n## Next {#next}",
    '\n<QuizWidget quizKey="old" />\n\n## Next {#next}'
  )
  const newEnglish = oldEnglish.replace('quizKey="old"', 'quizKey="new"')
  const oldLocale = localeA.replace(
    "\n## Weiter {#next}",
    '\n<QuizWidget quizKey="old" />\n\n## Weiter {#next}'
  )
  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")

  expect(result.match(/<QuizWidget/g)).toHaveLength(1)
  expect(result).toContain('quizKey="new"')
})

test("does not duplicate a component already present in the locale", () => {
  const englishB = englishA.replace(
    "\n## Next {#next}",
    '\n<QuizWidget quizKey="payments" />\n\n## Next {#next}'
  )
  const preUpdatedLocale = localeA.replace(
    "\n## Weiter {#next}",
    '\n<QuizWidget quizKey="payments" />\n\n## Weiter {#next}'
  )

  const result = pipeline(englishA, englishB, preUpdatedLocale, "markdown")
  expect(result.match(/<QuizWidget/g)).toHaveLength(1)
})

test("adds a second instance of the same component tag", () => {
  const oldEnglish = englishA.replace(
    "\n## Next {#next}",
    '\n<QuizWidget quizKey="one" />\n\n## Next {#next}'
  )
  const newEnglish = oldEnglish.replace(
    '\n<QuizWidget quizKey="one" />',
    '\n<QuizWidget quizKey="one" />\n\n<QuizWidget quizKey="two" />'
  )
  const oldLocale = localeA.replace(
    "\n## Weiter {#next}",
    '\n<QuizWidget quizKey="one" />\n\n## Weiter {#next}'
  )
  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")

  expect(result.match(/<QuizWidget/g)).toHaveLength(2)
  expect(result).toContain('quizKey="one"')
  expect(result).toContain('quizKey="two"')
  expect(
    findStructuralRegressions(oldEnglish, oldLocale, newEnglish, result)
  ).toEqual([])
})

test("still adds a sibling when an existing component attribute also changes", () => {
  const oldEnglish = englishA.replace(
    "\n## Next {#next}",
    '\n<QuizWidget quizKey="one" />\n\n## Next {#next}'
  )
  const newEnglish = oldEnglish.replace(
    '<QuizWidget quizKey="one" />',
    '<QuizWidget quizKey="one-new" />\n\n<QuizWidget quizKey="two" />'
  )
  const oldLocale = localeA.replace(
    "\n## Weiter {#next}",
    '\n<QuizWidget quizKey="one" />\n\n## Weiter {#next}'
  )
  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")

  expect(result).toContain('quizKey="one-new"')
  expect(result).toContain('quizKey="two"')
  expect(result.match(/<QuizWidget/g)).toHaveLength(2)
})

test("copies multiline JSX without changing translated prose", () => {
  const englishB = englishA.replace(
    "\n## Next {#next}",
    '\n<QuizWidget\n  quizKey="payments"\n  compact={true}\n/>\n\n## Next {#next}'
  )
  const result = pipeline(englishA, englishB, localeA, "markdown")

  expect(result).toContain(
    '<QuizWidget\n  quizKey="payments"\n  compact={true}\n/>'
  )
  expect(result).toContain("Mit Ethereum bezahlen.")
  expect(
    findStructuralRegressions(englishA, localeA, englishB, result)
  ).toEqual([])
})

test("does not duplicate JSX in a section that is retranslated", () => {
  const englishB = englishA
    .replace("Pay with Ethereum.", "Pay instantly with Ethereum.")
    .replace(
      "\n## Next {#next}",
      '\n<QuizWidget quizKey="payments" />\n\n## Next {#next}'
    )
  const result = pipeline(englishA, englishB, localeA, "markdown", (id) => {
    if (id !== "payments") throw new Error(`Unexpected section: ${id}`)
    return 'Sofort mit Ethereum bezahlen.\n\n<QuizWidget quizKey="payments" />'
  })

  expect(result.match(/<QuizWidget/g)).toHaveLength(1)
  expect(result).toContain("Sofort mit Ethereum bezahlen.")
})

test("finds a new self-closing component after an existing paired component", () => {
  const oldEnglish = englishA.replace(
    "\n## Next {#next}",
    "\n<Callout>\n\nKeep this note.\n\n</Callout>\n\n## Next {#next}"
  )
  const newEnglish = oldEnglish.replace(
    "\n## Next {#next}",
    "\n<Divider />\n\n## Next {#next}"
  )
  const oldLocale = localeA.replace(
    "\n## Weiter {#next}",
    "\n<Callout>\n\nDiese Notiz behalten.\n\n</Callout>\n\n## Weiter {#next}"
  )
  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")

  expect(result).toContain("Diese Notiz behalten.")
  expect(result).toContain("<Divider />")
  expect(result.indexOf("</Callout>")).toBeLessThan(
    result.indexOf("<Divider />")
  )
})

test("does not consume a later addition after an inline paired component", () => {
  const oldEnglish = englishA.replace(
    "\n## Next {#next}",
    "\n<Callout>Keep this note.</Callout>\n\n## Next {#next}"
  )
  const newEnglish = oldEnglish.replace(
    "\n## Next {#next}",
    "\n<Divider />\n\n## Next {#next}"
  )
  const oldLocale = localeA.replace(
    "\n## Weiter {#next}",
    "\n<Callout>Diese Notiz behalten.</Callout>\n\n## Weiter {#next}"
  )

  expect(pipeline(oldEnglish, newEnglish, oldLocale, "markdown")).toContain(
    "<Divider />"
  )
})

test("keeps translated paragraphs in order when JSX is inserted between them", () => {
  const oldEnglish = `## A {#a}\n\nFirst paragraph.\n\nSecond paragraph.\n\n## B {#b}\n\nEnd.\n`
  const newEnglish = oldEnglish.replace(
    "\n\nSecond paragraph.",
    "\n\n<Divider />\n\nSecond paragraph."
  )
  const oldLocale = `## Ein {#a}\n\nErster Absatz.\n\nZweiter Absatz.\n\n## Zwei {#b}\n\nEnde.\n`

  expect(getLlmSectionIds(oldEnglish, newEnglish, "markdown")).toEqual([])
  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown", () => {
    throw new Error("Component-only insertion must not retranslate prose")
  })
  expect(result).toContain("Erster Absatz.\n\n<Divider />\n\nZweiter Absatz.")
  expect(
    findStructuralRegressions(oldEnglish, oldLocale, newEnglish, result)
  ).toEqual([])
})

test("places a new component immediately after the translated heading", () => {
  const oldEnglish = `## A {#a}\n\nFirst paragraph.\n\nSecond paragraph.\n\n## B {#b}\n\nEnd.\n`
  const newEnglish = oldEnglish.replace(
    "\n\nFirst paragraph.",
    "\n\n<Divider />\n\nFirst paragraph."
  )
  const oldLocale = `## Ein {#a}\n\nErster Absatz.\n\nZweiter Absatz.\n\n## Zwei {#b}\n\nEnde.\n`

  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")
  expect(result).toContain("## Ein {#a}\n\n<Divider />\n\nErster Absatz.")
  expect(result).toContain("Zweiter Absatz.")
})

test("places a new component before the second identical anchor", () => {
  const oldEnglish = `## A {#a}\n\nAlpha.\n\n<Divider />\n\nBeta.\n\n<Divider />\n\nGamma.\n\n## B {#b}\n\nEnd.\n`
  const newEnglish = oldEnglish.replace(
    "\n\n<Divider />\n\nGamma.",
    '\n\n<QuizWidget quizKey="beta" />\n\n<Divider />\n\nGamma.'
  )
  const oldLocale = `## Ein {#a}\n\nAlpha-DE.\n\n<Divider />\n\nBeta-DE.\n\n<Divider />\n\nGamma-DE.\n\n## Zwei {#b}\n\nEnde.\n`

  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")
  expect(result).toContain(
    'Beta-DE.\n\n<QuizWidget quizKey="beta" />\n\n<Divider />'
  )
  expect(result.match(/<Divider \/>/g)).toHaveLength(2)
  expect(
    findStructuralRegressions(oldEnglish, oldLocale, newEnglish, result)
  ).toEqual([])
})

test("an existing translated component attribute does not force retranslation", () => {
  const oldEnglish = `## A {#a}\n\nFirst.\n\nSecond.\n\n<Card title="Existing title" href="/x" />\n`
  const newEnglish = oldEnglish.replace(
    "\n\nSecond.",
    "\n\n<Divider />\n\nSecond."
  )
  const oldLocale = `## Ein {#a}\n\nErster.\n\nZweiter.\n\n<Card title="Übersetzter Titel" href="/x" />\n`

  expect(getLlmSectionIds(oldEnglish, newEnglish, "markdown")).toEqual([])
  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")
  expect(result).toContain('title="Übersetzter Titel"')
  expect(result).toContain("Erster.\n\n<Divider />\n\nZweiter.")
})

test("leaves uncertain paragraph placement for the structural fallback", () => {
  const oldEnglish = `## A {#a}\n\nFirst paragraph.\n\nSecond paragraph.\n`
  const newEnglish = oldEnglish.replace(
    "\n\nSecond paragraph.",
    "\n\n<Divider />\n\nSecond paragraph."
  )
  const oldLocale = `## Ein {#a}\n\nErster Absatz. Zweiter Absatz.\n`

  const result = pipeline(oldEnglish, newEnglish, oldLocale, "markdown")
  expect(result).not.toContain("<Divider />")
  expect(
    findStructuralRegressions(oldEnglish, oldLocale, newEnglish, result)
  ).toEqual(
    expect.arrayContaining([expect.objectContaining({ kind: "component" })])
  )
})
