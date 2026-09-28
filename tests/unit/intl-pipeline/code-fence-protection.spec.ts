/**
 * Code fence protection on both translation paths.
 *
 * A fence body is source code or reproduced program output: it must reach the
 * locale file byte-identical to English. Only a prose-tagged fence (```text
 * and friends) is translatable. Both paths leaked before this: the normalizer
 * classified an UNTAGGED fence as prose, and the incremental path sent section
 * bodies raw, fences and all.
 */

import { expect, test } from "@playwright/test"

import {
  extractCodeBlocks,
  extractCodeFencesOnly,
  restoreCodeBlocksStrict,
} from "../../../src/scripts/intl-pipeline/lib/llm/code-block-extractor"
import { normalizeContent } from "../../../src/scripts/intl-pipeline/lib/llm/content-normalizer"
import { planIncrementalBatches } from "../../../src/scripts/intl-pipeline/lib/llm/plan"
import { classifyFailure } from "../../../src/scripts/intl-pipeline/lib/quarantine"
import { verifyMarkdown } from "../../../src/scripts/intl-pipeline/lib/verify-structure"

/** The real shape of the defect: an untagged `clef` console transcript. */
const UNTAGGED = `$ clef newaccount --keystore <path>
Enter the <password>:`

const PROSE = "1. source vote: the validator made a timely vote"

const EN = `## Heading {#heading}

Prose before.

\`\`\`
${UNTAGGED}
\`\`\`

\`\`\`text
${PROSE}
\`\`\`

\`\`\`solidity
// set the owner
contract Foo { address owner; }
\`\`\`
`

// --- normalizer (full path) -------------------------------------------------

test("normalizer hides an untagged fence body from the model", () => {
  const { normalized } = normalizeContent(EN)
  expect(normalized).not.toContain("clef newaccount")
  expect(normalized).not.toContain("<password>")
})

test("normalizer keeps a text-tagged fence body translatable", () => {
  const { normalized } = normalizeContent(EN)
  expect(normalized).toContain(PROSE)
  // Wrapped, so the model translates the body but not the fence itself.
  expect(normalized).toMatch(
    /<HTML-PLACEHOLDER-CODEBLOCK-[0-9a-f]+>\n1\. source vote/
  )
})

test("normalizer hides a tagged code fence body", () => {
  const { normalized } = normalizeContent(EN)
  expect(normalized).not.toContain("address owner")
})

// --- planner (incremental path) --------------------------------------------

const plan = (
  englishContent: string,
  fileType: "markdown" | "json" = "markdown"
) =>
  planIncrementalBatches({
    filePath: "x.md",
    fileType,
    locale: "de",
    languageName: "German",
    englishContent,
    localeContent: englishContent,
    sectionIds: ["heading"],
    glossaryTerms: new Map(),
  })

test("incremental prompt carries placeholders, not fence bodies", () => {
  const prompt = plan(EN)!.batches[0].prompt
  expect(prompt).not.toContain("clef newaccount")
  expect(prompt).not.toContain("address owner")
  expect(prompt).toContain("<!-- CODE_BLOCK_0 -->")
})

test("incremental prompt still exposes a text-tagged fence", () => {
  const prompt = plan(EN)!.batches[0].prompt
  expect(prompt).toContain(PROSE)
})

test("planner reports the blocks it lifted, per section", () => {
  const { codeBlocks } = plan(EN)!
  expect([...codeBlocks.keys()]).toEqual(["heading"])
  expect(codeBlocks.get("heading")!.map((b) => b.language)).toEqual([
    "",
    "solidity",
  ])
})

test("planner leaves JSON sections alone", () => {
  const json = JSON.stringify({ heading: "some `inline` value" })
  expect(plan(json, "json")!.codeBlocks.size).toBe(0)
})

test("extraction shrinks what the budget has to pay for", () => {
  const withFences = plan(EN)!
  const withoutFences = plan(EN.replace(/```[\s\S]*?```\n\n/g, ""))!
  expect(withFences.translatableContentBytes).toBeLessThan(
    Buffer.byteLength(EN, "utf-8")
  )
  expect(withFences.translatableContentBytes).toBeGreaterThan(
    withoutFences.translatableContentBytes
  )
})

// --- restore ----------------------------------------------------------------

test("restore rebuilds the fences the model never saw", () => {
  const { prose, blocks } = extractCodeFencesOnly(EN)
  expect(restoreCodeBlocksStrict(prose, blocks, "x.md")).toBe(EN)
})

test("restore refuses a reply that dropped a placeholder", () => {
  const { prose, blocks } = extractCodeFencesOnly(EN)
  const mangled = prose.replace("<!-- CODE_BLOCK_0 -->", "")
  expect(() => restoreCodeBlocksStrict(mangled, blocks, "x.md (de)")).toThrow(
    /dropped 1 code block placeholder\(s\) \(CODE_BLOCK_0\) of 2/
  )
})

test("a dropped placeholder quarantines as a parse failure", () => {
  expect(
    classifyFailure(
      'x.md (de) section "heading": dropped 1 code block placeholder(s) (CODE_BLOCK_0) of 2'
    )
  ).toBe("parse")
})

test("extractCodeFencesOnly is extractCodeBlocks minus the prose fences", () => {
  const all = extractCodeBlocks(EN).blocks.map((b) => b.language)
  const code = extractCodeFencesOnly(EN).blocks.map((b) => b.language)
  expect(all).toEqual(["", "text", "solidity"])
  expect(code).toEqual(["", "solidity"])
})

test("block indices stay those of the original scan", () => {
  // CODE_BLOCK_1 is the prose fence, restored inline; the solidity fence keeps
  // index 2 rather than being renumbered.
  const { blocks } = extractCodeFencesOnly(EN)
  expect(blocks.map((b) => b.index)).toEqual([0, 2])
})

// --- gate -------------------------------------------------------------------

const fenceFindings = (en: string, tr: string) =>
  verifyMarkdown(en, tr, "x.md").filter((f) => f.check.startsWith("code-fence"))

test("gate flags a translated untagged fence", () => {
  const tr = EN.replace(
    "Enter the <password>:",
    "Geben Sie das <Passwort> ein:"
  )
  expect(fenceFindings(EN, tr)).toEqual([
    {
      file: "x.md",
      check: "code-fence-content",
      detail: "fence 1 (`untagged`) body differs from English",
      severity: "error",
    },
  ])
})

test("gate allows a translated code comment", () => {
  // Comments are the one translatable thing inside a code fence; 8,431 corpus
  // fences carry translated ones and flagging them would bury the real signal.
  const tr = EN.replace("// set the owner", "// den Eigentuemer setzen")
  expect(fenceFindings(EN, tr)).toEqual([])
})

test("gate flags translated code even when a comment is also translated", () => {
  const tr = EN.replace(
    "// set the owner",
    "// den Eigentuemer setzen"
  ).replace("address owner", "address eigentuemer")
  expect(fenceFindings(EN, tr).map((f) => f.detail)).toEqual([
    "fence 3 (`solidity`) body differs from English",
  ])
})

test("gate allows a translated prose fence", () => {
  const tr = EN.replace(PROSE, "1. Quellen-Stimme: der Validator hat gewaehlt")
  expect(fenceFindings(EN, tr)).toEqual([])
})

test("gate ignores trailing whitespace inside a fence", () => {
  const tr = EN.replace(
    "contract Foo { address owner; }",
    "contract Foo { address owner; }   "
  )
  expect(fenceFindings(EN, tr)).toEqual([])
})

test("gate flags a translated language tag", () => {
  const tr = EN.replace("```solidity", "```solidität")
  expect(fenceFindings(EN, tr).map((f) => f.check)).toEqual(["code-fence-lang"])
})

test("gate passes an untouched translation", () => {
  expect(fenceFindings(EN, EN.replace("Prose before.", "Vorher."))).toEqual([])
})
