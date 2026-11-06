/**
 * The two deterministic model artifacts that blocked 27 file+locale pairs in
 * PR #19474: an invented empty `{#}` heading anchor, and a frontmatter value
 * returned with its YAML key still attached.
 */

import { parseDocument } from "yaml"
import { expect, test } from "@playwright/test"

import { _testOnly } from "../../../src/scripts/intl-pipeline/intl-sanitizer"
import {
  setFrontmatterFieldText,
  stripEmittedKeyPrefix,
} from "../../../src/scripts/intl-pipeline/lib/llm/frontmatter"

const stripAnchors = (s: string) => _testOnly.fixEmptyHeadingAnchors(s)

// --- empty {#} heading anchors ---------------------------------------------

test("strips an empty anchor", () => {
  expect(stripAnchors("##### Ressourcen {#}").content).toBe("##### Ressourcen")
})

test("strips an empty anchor with inner space", () => {
  expect(stripAnchors("##### Ressourcen {# }").content).toBe("##### Ressourcen")
})

test("a stray backtick does not hide later headings", () => {
  // The #19474 failure: inline-code matching spanned newlines, so one unpaired
  // backtick swallowed every heading up to the next one. 9 of 11 were stripped
  // and the gate failed on the rest, in all 24 locales.
  const doc = [
    "##### Ressourcen {#}",
    "",
    "Ein Preis von 5` pro Einheit.",
    "",
    "##### Wasserhähne {#}",
    "",
    "Mehr `code` hier.",
    "",
    "##### Ressourcen {#}",
  ].join("\n")
  const r = stripAnchors(doc)
  expect(r.fixCount).toBe(3)
  expect(r.content).not.toContain("{#}")
})

test("a heading containing inline code is still fixed", () => {
  expect(stripAnchors("##### Nutzung von `eth_call` {#}").content).toBe(
    "##### Nutzung von `eth_call`"
  )
})

test("an anchor that is not at end of line is stripped", () => {
  // verify-structure finds the anchor anywhere in the heading text, so an
  // end-anchored strip left these for the gate to fail on.
  expect(stripAnchors("##### Ressourcen {#} (Fortsetzung)").content).toBe(
    "##### Ressourcen (Fortsetzung)"
  )
  expect(stripAnchors("##### {#} Ressourcen").content).toBe("##### Ressourcen")
})

test("a tab after the hashes is still a heading", () => {
  expect(stripAnchors("#####\tRessourcen {#}").content).toBe(
    "#####\tRessourcen"
  )
})

test("a real anchor is left alone", () => {
  const s = "## Titel {#titel}"
  expect(stripAnchors(s).content).toBe(s)
  expect(stripAnchors(s).fixCount).toBe(0)
})

test("{#} inside a fenced block is left alone", () => {
  const s = ["```js", "const x = {#}", "```"].join("\n")
  expect(stripAnchors(s).content).toBe(s)
})

test("{#} in body text is stripped too", () => {
  // Not a heading, but still a JS expression acorn rejects -- and still an
  // `empty-anchor` finding. Leaving it was a gate failure nothing could repair.
  expect(stripAnchors("Dies ist {#} kein Heading.").content).toBe(
    "Dies ist kein Heading."
  )
})

test("{#} inside an inline code span is left alone", () => {
  const s = "Ein leerer Anker `{#}` bricht den Build."
  expect(stripAnchors(s).content).toBe(s)
  expect(stripAnchors(s).fixCount).toBe(0)
})

test("an indented heading is reached", () => {
  // verify-structure only calls a line a heading at column 0, but
  // `empty-anchor` scans the whole document, so this has to be repairable.
  expect(stripAnchors("  ### Ressourcen {#}").content).toBe("  ### Ressourcen")
})

test("a ``` line does not close a ~~~ block", () => {
  // Fence state follows the fence character; a toggle would treat the ```
  // line as a close and start editing fenced content.
  const s = ["~~~text", "```", "##### Ressourcen {#}", "~~~"].join("\n")
  expect(stripAnchors(s).content).toBe(s)
})

test("unchanged content is returned untouched", () => {
  const s = "## A {#a}\n\nText"
  expect(stripAnchors(s).content).toBe(s)
})

// --- frontmatter key echoed into the value ---------------------------------

test("strips a key the model echoed back", () => {
  expect(stripEmittedKeyPrefix("title", 'title: "Ich interviewte Luna"')).toBe(
    "Ich interviewte Luna"
  )
})

test("strips the key without quotes", () => {
  expect(stripEmittedKeyPrefix("title", "title: Ich interviewte Luna")).toBe(
    "Ich interviewte Luna"
  )
})

test("a value that merely contains a colon is untouched", () => {
  const v = "Ich interviewte Luna: ein KI-Agent"
  expect(stripEmittedKeyPrefix("title", v)).toBe(v)
})

test("a different key's name is not stripped", () => {
  const v = "description: steht hier im Text"
  expect(stripEmittedKeyPrefix("title", v)).toBe(v)
})

test("quotes are only unwrapped when they wrap the whole value", () => {
  // `"foo" and "bar"` starts and ends with a quote without being a quoted
  // string; unwrapping would hand back `foo" and "bar`.
  expect(stripEmittedKeyPrefix("title", 'title: "foo" and "bar"')).toBe(
    '"foo" and "bar"'
  )
})

test("stripping to nothing keeps the original", () => {
  expect(stripEmittedKeyPrefix("title", 'title: ""')).toBe('title: ""')
})

test("the guard reaches setFrontmatterFieldText", () => {
  const doc = parseDocument('title: "Old"\nlang: te\n')
  expect(setFrontmatterFieldText(doc, "title", 'title: "Neu"')).toBe(true)
  expect(doc.get("title")).toBe("Neu")
})

test("a ``` line inside a ~~~ block does not reopen the fence", () => {
  // A toggle would treat the inner ``` as a close and start editing fenced
  // content; verify-structure's headings() tracks the fence character, so the
  // fixer must too or the two disagree about what is code.
  const s = [
    "~~~text",
    "```",
    "##### Not a heading {#}",
    "~~~",
    "",
    "##### Real heading {#}",
  ].join("\n")
  const r = _testOnly.fixEmptyHeadingAnchors(s)
  expect(r.fixCount).toBe(1)
  expect(r.content).toContain("##### Not a heading {#}")
  expect(r.content.endsWith("##### Real heading")).toBe(true)
})
