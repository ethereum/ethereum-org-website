/**
 * Machine-read comments inside code fences (known-patterns 114).
 *
 * `// SPDX-License-Identifier: MIT` came back translated in 7 locales. A
 * compiler or linter reads these lines, so every comment translation path must
 * leave them out, and the sanitizer puts back any that still come back changed.
 */

import { expect, test } from "@playwright/test"

import { _testOnly } from "../../../src/scripts/intl-pipeline/intl-sanitizer"
import {
  collectBlockComments,
  extractCodeBlocks,
  extractComments,
  restoreComments,
} from "../../../src/scripts/intl-pipeline/lib/llm/code-block-extractor"
import {
  type ContentNode,
  normalizeContent,
} from "../../../src/scripts/intl-pipeline/lib/llm/content-normalizer"
import { verifyMarkdown } from "../../../src/scripts/intl-pipeline/lib/verify-structure"

const { restoreDirectiveComments, processMarkdownFile } = _testOnly

const SOLIDITY = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// solhint-disable-next-line no-empty-blocks
contract Counter {
    uint256 count; // slither-disable-line naming-convention
    /* eslint-disable */
    // Adds one to the count
    function inc() public { count += 1; }
}`

const english = `## Example {#example}

A counter.

\`\`\`solidity
${SOLIDITY}
\`\`\`
`

const commentTexts = (code: string, language: string) =>
  extractComments(code, language).comments.map((c) => c.text)

test.describe("comment extraction skips directives", () => {
  test("Solidity: only the prose comment is translatable", () => {
    expect(commentTexts(SOLIDITY, "solidity")).toEqual([
      "Adds one to the count",
    ])
  })

  test("directive lines stay in the code, byte-identical", () => {
    const { strippedCode } = extractComments(SOLIDITY, "solidity")
    for (const line of [
      "// SPDX-License-Identifier: MIT",
      "// solhint-disable-next-line no-empty-blocks",
      "    uint256 count; // slither-disable-line naming-convention",
      "    /* eslint-disable */",
    ]) {
      expect(strippedCode.split("\n")).toContain(line)
    }
    expect(strippedCode.split("\n")).toHaveLength(SOLIDITY.split("\n").length)
  })

  test("the legacy restore path does not duplicate a directive", () => {
    const { strippedCode, comments } = extractComments(SOLIDITY, "solidity")
    const restored = restoreComments(
      strippedCode,
      comments.map((c) => ({ ...c, text: "Erhoeht den Zaehler um eins" })),
      "js"
    )
    expect(restored.match(/SPDX-License-Identifier/g)).toHaveLength(1)
    expect(restored).toContain("// Erhoeht den Zaehler um eins")
  })

  test("every listed directive is recognised", () => {
    const js = [
      "//SPDX-License-Identifier: Unlicense",
      "// solhint-enable",
      "// eslint-disable-next-line no-console",
      "// eslint-enable",
      "// prettier-ignore",
      "// @ts-ignore",
      "// @ts-expect-error wrong type on purpose",
      "// @ts-nocheck",
      "/* istanbul ignore next */",
      "// slither-disable-next-line reentrancy-eth",
      "// forgefmt: disable-next-line",
      // developers/docs/smart-contracts/anatomy
      "// solium-disable-next-line arg-overflow",
      "// solium-enable security/no-inline-assembly",
      "// ethlint-disable-line",
    ].join("\n")
    expect(commentTexts(js, "solidity")).toEqual([])
    expect(
      commentTexts('/// <reference types="node" />\nlet x // A count', "ts")
    ).toEqual(["A count"])
    expect(
      commentTexts(
        "# yaml-language-server: $schema=./schema.json\n# Node settings",
        "yaml"
      )
    ).toEqual(["Node settings"])

    const python = [
      "#!/usr/bin/env python3",
      "# -*- coding: utf-8 -*-",
      "import foo  # type: ignore",
      "x = 1  # noqa: E501",
      "#pragma version >0.3.10",
      "# Keep this one",
    ].join("\n")
    expect(commentTexts(python, "python")).toEqual(["Keep this one"])
    expect(commentTexts("#!/bin/bash\n# Install it", "bash")).toEqual([
      "Install it",
    ])
  })

  test("a multi-line directive comment stays whole", () => {
    const code = "/* eslint-disable\n   no-console */\nlog() // Print it"
    const { strippedCode, comments } = extractComments(code, "js")
    expect(comments.map((c) => c.text)).toEqual(["Print it"])
    expect(strippedCode).toContain("/* eslint-disable\n   no-console */")
  })

  test("a directive inside a block comment keeps the whole block English", () => {
    for (const block of [
      "/*\n * SPDX-License-Identifier: MIT\n * Explains the contract.\n */",
      "/* eslint-disable\n   because the generated code is long */",
    ]) {
      const code = `${block}\ncontract C {} // Empty contract`
      const { strippedCode, comments } = extractComments(code, "solidity")
      expect(comments.map((c) => c.text)).toEqual(["Empty contract"])
      expect(strippedCode).toContain(block)
    }
  })

  test("prose comments mentioning a tool are still translated", () => {
    expect(commentTexts("// Run slither on the contract", "solidity")).toEqual([
      "Run slither on the contract",
    ])
  })
})

test.describe("every comment translation path inherits the skip", () => {
  test("incremental path (collectBlockComments)", () => {
    const { blocks } = extractCodeBlocks(english)
    expect(collectBlockComments(blocks).map((f) => f.comment.text)).toEqual([
      "Adds one to the count",
    ])
  })

  test("full path (normalizer code-comment leaves)", () => {
    const leaves: string[] = []
    const visit = (node: ContentNode) => {
      if (node.type === "code-comment") leaves.push(node.content)
      if ("children" in node && node.children) node.children.forEach(visit)
    }
    normalizeContent(english).tree.forEach(visit)
    expect(leaves).toEqual(["Adds one to the count"])
  })
})

const translated = english
  .replace("// SPDX-License-Identifier: MIT", "// SPDX-लाइसेंस-पहचानकर्ता: MIT")
  .replace(
    "// solhint-disable-next-line no-empty-blocks",
    "// solhint-अगली-पंक्ति-अक्षम करें no-empty-blocks"
  )
  .replace("// Adds one to the count", "// गिनती में एक जोड़ता है")
  .replace("A counter.", "एक काउंटर।")

test.describe("sanitizer backstop", () => {
  test("restores translated directive lines from the English fence", () => {
    const { content, fixCount } = restoreDirectiveComments(translated, english)
    expect(fixCount).toBe(2)
    expect(content).toContain("// SPDX-License-Identifier: MIT")
    expect(content).toContain("// solhint-disable-next-line no-empty-blocks")
    // Ordinary comments and prose keep their translation
    expect(content).toContain("// गिनती में एक जोड़ता है")
    expect(content).toContain("एक काउंटर।")
  })

  test("leaves a fence alone when the code before the marker differs", () => {
    const moved = translated.replace(
      "// SPDX-लाइसेंस-पहचानकर्ता: MIT",
      "pragma x; // SPDX-लाइसेंस-पहचानकर्ता: MIT"
    )
    const { content } = restoreDirectiveComments(moved, english)
    expect(content).toContain("pragma x; // SPDX-लाइसेंस-पहचानकर्ता: MIT")
  })

  test("skips prose fences and `#` where it is not a comment marker", () => {
    const fence = (lang: string, body: string) =>
      `Intro.\n\n\`\`\`${lang}\n${body}\n\`\`\`\n`
    // A ```text fence is translatable prose, never restored
    const prose = restoreDirectiveComments(
      fence("text", "# Übersetzter Text: prettier-ignore"),
      fence("text", "# prettier-ignore")
    )
    expect(prose.fixCount).toBe(0)
    // `#` starts no comment in Solidity
    const solidity = restoreDirectiveComments(
      fence("solidity", "uint x = y #übersetzt"),
      fence("solidity", "uint x = y # prettier-ignore")
    )
    expect(solidity.fixCount).toBe(0)
    // ...but does in Python
    const python = restoreDirectiveComments(
      fence("python", "import foo  # Typ: ignorieren"),
      fence("python", "import foo  # type: ignore")
    )
    expect(python.content).toContain("import foo  # type: ignore")
  })

  test("restores only the directive span before a translated trailing comment", () => {
    const fence = (body: string) => `Intro.\n\n\`\`\`js\n${body}\n\`\`\`\n`
    const en = "foo(); /* eslint-disable-line no-undef */ // explain"
    // Directive intact, trailing comment translated: left alone
    const kept = fence("foo(); /* eslint-disable-line no-undef */ // erklären")
    expect(restoreDirectiveComments(kept, fence(en))).toEqual({
      content: kept,
      fixCount: 0,
    })
    // Directive translated too: only the directive comes back
    const { content, fixCount } = restoreDirectiveComments(
      fence("foo(); /* eslint-deaktivieren-Zeile no-undef */ // erklären"),
      fence(en)
    )
    expect(fixCount).toBe(1)
    expect(content).toContain(
      "foo(); /* eslint-disable-line no-undef */ // erklären"
    )
  })

  test("survives a file ending in an empty fence", () => {
    const withEmpty = (md: string) => `${md}\n\`\`\`js\n\`\`\`\n`
    const { content, fixCount } = restoreDirectiveComments(
      withEmpty(translated),
      withEmpty(english)
    )
    expect(fixCount).toBe(2)
    expect(content).toContain("// SPDX-License-Identifier: MIT")
    expect(content.endsWith("```js\n```\n")).toBe(true)
  })

  test("is a no-op on English and on a correct translation", () => {
    expect(restoreDirectiveComments(english, english)).toEqual({
      content: english,
      fixCount: 0,
    })
  })

  test("runs inside processMarkdownFile", () => {
    const result = processMarkdownFile(
      "/repo/public/content/translations/hi/developers/x/index.md",
      translated,
      new Map([["public/content/developers/x/index.md", english]])
    )
    expect(result.content).toContain("// SPDX-License-Identifier: MIT")
    expect(result.issues.join("\n")).toContain("directive comment")
  })
})

test("the fence-code gate fails a translated directive", () => {
  const found = verifyMarkdown(english, translated, "x.md").filter(
    (f) => f.check === "code-fence-content"
  )
  expect(found).toHaveLength(1)
  expect(
    verifyMarkdown(
      english,
      restoreDirectiveComments(translated, english).content,
      "x.md"
    ).filter((f) => f.check === "code-fence-content")
  ).toEqual([])
})
