/**
 * Tests for code block extraction, restoration, comment parsing,
 * and prose chunking.
 */

import { expect, test } from "@playwright/test"

import {
  chunkProse,
  extractCodeBlocks,
  extractComments,
  getCommentSyntax,
  restoreCodeBlocks,
  restoreComments,
} from "@/scripts/i18n/lib/ai/code-block-extractor"

// ---------------------------------------------------------------------------
// extractCodeBlocks + restoreCodeBlocks
// ---------------------------------------------------------------------------

test.describe("extractCodeBlocks", () => {
  test("extracts a single code block", () => {
    const md = `Some prose.

\`\`\`solidity
uint256 x = 1;
\`\`\`

More prose.`

    const { prose, blocks } = extractCodeBlocks(md)

    expect(blocks).toHaveLength(1)
    expect(blocks[0].language).toBe("solidity")
    expect(blocks[0].content).toBe("uint256 x = 1;")
    expect(prose).toContain("<!-- CODE_BLOCK_0 -->")
    expect(prose).toContain("Some prose.")
    expect(prose).toContain("More prose.")
    expect(prose).not.toContain("uint256")
  })

  test("extracts multiple code blocks with correct indices", () => {
    const md = `Intro.

\`\`\`js
const a = 1;
\`\`\`

Middle.

\`\`\`python
x = 2
\`\`\`

End.`

    const { prose, blocks } = extractCodeBlocks(md)

    expect(blocks).toHaveLength(2)
    expect(blocks[0].language).toBe("js")
    expect(blocks[0].content).toBe("const a = 1;")
    expect(blocks[1].language).toBe("python")
    expect(blocks[1].content).toBe("x = 2")
    expect(prose).toContain("<!-- CODE_BLOCK_0 -->")
    expect(prose).toContain("<!-- CODE_BLOCK_1 -->")
  })

  test("handles tilde fences", () => {
    const md = `Text.

~~~bash
echo "hello"
~~~

Done.`

    const { prose, blocks } = extractCodeBlocks(md)

    expect(blocks).toHaveLength(1)
    expect(blocks[0].language).toBe("bash")
    expect(blocks[0].content).toBe('echo "hello"')
    expect(prose).toContain("<!-- CODE_BLOCK_0 -->")
  })

  test("handles code blocks with no language tag", () => {
    const md = `\`\`\`
plain code
\`\`\``

    const result = extractCodeBlocks(md)

    expect(result.blocks).toHaveLength(1)
    expect(result.blocks[0].language).toBe("")
    expect(result.blocks[0].content).toBe("plain code")
  })

  test("preserves inline code (backticks)", () => {
    const md = "Use `require()` to import and `module.exports` to export."

    const { prose, blocks } = extractCodeBlocks(md)

    expect(blocks).toHaveLength(0)
    expect(prose).toBe(md)
  })

  test("handles empty code blocks", () => {
    const md = `\`\`\`js
\`\`\``

    const result = extractCodeBlocks(md)

    expect(result.blocks).toHaveLength(1)
    expect(result.blocks[0].content).toBe("")
  })

  test("handles code blocks with complex multiline content", () => {
    const md = `\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
\`\`\``

    const result = extractCodeBlocks(md)

    expect(result.blocks).toHaveLength(1)
    expect(result.blocks[0].content).toContain("contract Token")
    expect(result.blocks[0].content).toContain("mapping(address => uint256)")
  })
})

test.describe("restoreCodeBlocks", () => {
  test("round-trips correctly", () => {
    const original = `Prose before.

\`\`\`solidity
uint256 x = 1;
\`\`\`

Prose after.`

    const { prose, blocks } = extractCodeBlocks(original)
    const restored = restoreCodeBlocks(prose, blocks)

    expect(restored).toBe(original)
  })

  test("round-trips multiple blocks", () => {
    const original = `# Title

\`\`\`js
const a = 1;
\`\`\`

Some text.

\`\`\`python
x = 2
\`\`\`

End.`

    const { prose, blocks } = extractCodeBlocks(original)
    const restored = restoreCodeBlocks(prose, blocks)

    expect(restored).toBe(original)
  })

  test("round-trips blocks with no language tag", () => {
    const original = `\`\`\`
plain code
\`\`\``

    const { prose, blocks } = extractCodeBlocks(original)
    const restored = restoreCodeBlocks(prose, blocks)

    expect(restored).toBe(original)
  })

  test("restores into translated prose", () => {
    const md = `Hello world.

\`\`\`js
const x = 1;
\`\`\``

    const { prose, blocks } = extractCodeBlocks(md)

    // Simulate translation changing the prose but not placeholders
    const translated = prose.replace("Hello world.", "مرحبا بالعالم.")
    const restored = restoreCodeBlocks(translated, blocks)

    expect(restored).toContain("مرحبا بالعالم.")
    expect(restored).toContain("const x = 1;")
  })
})

// ---------------------------------------------------------------------------
// extractComments
// ---------------------------------------------------------------------------

test.describe("extractComments", () => {
  test.describe("JS/Solidity syntax", () => {
    test("extracts single-line comments", () => {
      const code = `uint256 x = 1;
// Calculate the total
uint256 total = x + y;`

      const { comments } = extractComments(code, "solidity")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("Calculate the total")
      expect(comments[0].type).toBe("single")
      expect(comments[0].line).toBe(1)
    })

    test("extracts inline multi-line comments", () => {
      const code = `uint256 x = 1; /* initial value */`

      const { comments } = extractComments(code, "js")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("initial value")
      expect(comments[0].type).toBe("multi")
    })

    test("extracts spanning multi-line comments", () => {
      const code = `/*
 * This function mints tokens.
 * It checks the balance first.
 */
function mint() {}`

      const { comments } = extractComments(code, "solidity")

      expect(comments).toHaveLength(1)
      expect(comments[0].type).toBe("multi")
      expect(comments[0].text).toContain("This function mints tokens")
    })

    test("ignores // inside strings", () => {
      const code = `const url = "https://ethereum.org";
// Real comment
const path = 'http://localhost';`

      const { comments } = extractComments(code, "js")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("Real comment")
    })

    test("ignores /* inside strings", () => {
      const code = `const re = "/* not a comment */";
/* Real comment */`

      const { comments } = extractComments(code, "js")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("Real comment")
    })

    test("handles escaped quotes in strings", () => {
      const code = `const s = "she said \\"hello\\""; // greeting`

      const { comments } = extractComments(code, "js")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("greeting")
    })

    test("handles template literals", () => {
      const code = "const t = `some // template`; // actual comment"

      const { comments } = extractComments(code, "js")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("actual comment")
    })
  })

  test.describe("Python/Vyper syntax", () => {
    test("extracts # comments", () => {
      const code = `x = 1
# Calculate total
y = x + 2`

      const { comments } = extractComments(code, "python")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("Calculate total")
    })

    test("ignores # inside strings", () => {
      const code = `color = "#fff"
# Real comment
name = '#selector'`

      const { comments } = extractComments(code, "python")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("Real comment")
    })

    test("extracts single-line docstrings", () => {
      const code = `"""This is a docstring"""
x = 1`

      const { comments } = extractComments(code, "python")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("This is a docstring")
      expect(comments[0].type).toBe("multi")
    })
  })

  test.describe("Shell syntax", () => {
    test("extracts # comments", () => {
      const code = `#!/bin/bash
# Install dependencies
npm install`

      const { comments } = extractComments(code, "bash")

      // Shebang captured as comment too
      expect(comments.length).toBeGreaterThanOrEqual(1)
      const installComment = comments.find((c) =>
        c.text.includes("Install dependencies")
      )
      expect(installComment).toBeDefined()
    })

    test("ignores # inside strings", () => {
      const code = `echo "color is #red"
# Real comment`

      const { comments } = extractComments(code, "bash")

      expect(comments).toHaveLength(1)
      expect(comments[0].text).toBe("Real comment")
    })
  })

  test("returns empty for code with no comments", () => {
    const code = `uint256 x = 1;
uint256 y = 2;
uint256 z = x + y;`

    const { comments } = extractComments(code, "solidity")

    expect(comments).toHaveLength(0)
  })

  test("preserves line count in stripped code", () => {
    const code = `line0
// comment on line 1
line2
line3`

    const { strippedCode } = extractComments(code, "js")
    const lines = strippedCode.split("\n")

    expect(lines).toHaveLength(4)
    expect(lines[0]).toBe("line0")
    expect(lines[2]).toBe("line2")
    expect(lines[3]).toBe("line3")
  })
})

// ---------------------------------------------------------------------------
// getCommentSyntax
// ---------------------------------------------------------------------------

test.describe("getCommentSyntax", () => {
  test("maps solidity to js", () => {
    expect(getCommentSyntax("solidity")).toBe("js")
  })

  test("maps python to python", () => {
    expect(getCommentSyntax("python")).toBe("python")
  })

  test("maps bash to shell", () => {
    expect(getCommentSyntax("bash")).toBe("shell")
  })

  test("maps yaml to shell", () => {
    expect(getCommentSyntax("yaml")).toBe("shell")
  })

  test("defaults unknown to js", () => {
    expect(getCommentSyntax("unknown")).toBe("js")
  })

  test("is case insensitive", () => {
    expect(getCommentSyntax("Solidity")).toBe("js")
    expect(getCommentSyntax("PYTHON")).toBe("python")
  })
})

// ---------------------------------------------------------------------------
// restoreComments
// ---------------------------------------------------------------------------

test.describe("restoreComments", () => {
  test("restores single-line JS comments", () => {
    const code = `uint256 x = 1;

uint256 y = 2;`

    const comments: Parameters<typeof restoreComments>[1] = [
      { blockIndex: 0, line: 1, type: "single", text: "translated comment" },
    ]

    const result = restoreComments(code, comments, "js")
    expect(result).toContain("// translated comment")
  })

  test("restores single-line Python comments", () => {
    const code = `x = 1

y = 2`

    const comments: Parameters<typeof restoreComments>[1] = [
      { blockIndex: 0, line: 1, type: "single", text: "translated" },
    ]

    const result = restoreComments(code, comments, "python")
    expect(result).toContain("# translated")
  })

  test("returns code unchanged when no comments", () => {
    const code = "uint256 x = 1;"
    const result = restoreComments(code, [], "js")
    expect(result).toBe(code)
  })
})

// ---------------------------------------------------------------------------
// chunkProse
// ---------------------------------------------------------------------------

test.describe("chunkProse", () => {
  test("returns single chunk for small prose", () => {
    const prose = "Small content."
    const chunks = chunkProse(prose)

    expect(chunks).toHaveLength(1)
    expect(chunks[0]).toBe(prose)
  })

  test("splits at ## headings", () => {
    const section = "x".repeat(25_000)
    const prose = `## Section 1\n\n${section}\n\n## Section 2\n\n${section}`

    const chunks = chunkProse(prose)

    expect(chunks.length).toBeGreaterThan(1)
    expect(chunks[0]).toContain("## Section 1")
    expect(chunks[1]).toContain("## Section 2")
  })

  test("recursively splits at ### if ## chunks still too large", () => {
    const section = "x".repeat(25_000)
    // One giant ## section with ### subsections
    const prose = `## Big Section\n\n### Sub 1\n\n${section}\n\n### Sub 2\n\n${section}`

    const chunks = chunkProse(prose)

    expect(chunks.length).toBeGreaterThan(1)
  })

  test("preserves frontmatter in first chunk only", () => {
    const section = "x".repeat(25_000)
    const prose = `---\ntitle: Test\n---\n## Section 1\n\n${section}\n\n## Section 2\n\n${section}`

    const chunks = chunkProse(prose)

    expect(chunks[0]).toContain("---\ntitle: Test\n---")
    for (let i = 1; i < chunks.length; i++) {
      expect(chunks[i]).not.toContain("---\ntitle: Test\n---")
    }
  })

  test("respects custom threshold", () => {
    const prose = "## A\n\nShort.\n\n## B\n\nAlso short."
    const chunks = chunkProse(prose, 20)

    expect(chunks.length).toBeGreaterThan(1)
  })

  test("falls back to paragraph splitting", () => {
    // No headings, just paragraphs
    const para = "x".repeat(100)
    const prose = Array.from({ length: 50 }, () => para).join("\n\n")

    const chunks = chunkProse(prose, 500)

    expect(chunks.length).toBeGreaterThan(1)
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(500 + 100) // some tolerance for paragraph boundaries
    }
  })
})

// ---------------------------------------------------------------------------
// End-to-end: extract -> (simulate translate) -> restore
// ---------------------------------------------------------------------------

test.describe("end-to-end round-trip", () => {
  test("full extraction and restoration preserves structure", () => {
    const original = `---
title: My Tutorial
---

# Introduction

Some introductory text about Ethereum.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// This contract manages tokens
contract Token {
    mapping(address => uint256) public balances;

    /* Transfer tokens between accounts */
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
\`\`\`

## Usage

Call \`transfer()\` to move tokens.

\`\`\`bash
# Deploy the contract
npx hardhat deploy
\`\`\`

Done.`

    // Step 1: Extract code blocks
    const { prose, blocks } = extractCodeBlocks(original)

    expect(blocks).toHaveLength(2)
    expect(prose).not.toContain("pragma solidity")
    expect(prose).not.toContain("npx hardhat")
    expect(prose).toContain("Some introductory text")
    expect(prose).toContain("Call `transfer()` to move tokens.")

    // Step 2: Simulate prose translation (just confirm placeholders survive)
    const translatedProse = prose
      .replace(
        "Some introductory text about Ethereum.",
        "نص تمهيدي عن إيثريوم."
      )
      .replace(
        "Call `transfer()` to move tokens.",
        "استدعِ `transfer()` لنقل التوكنات."
      )
      .replace("Done.", "تم.")

    expect(translatedProse).toContain("<!-- CODE_BLOCK_0 -->")
    expect(translatedProse).toContain("<!-- CODE_BLOCK_1 -->")

    // Step 3: Restore code blocks
    const restored = restoreCodeBlocks(translatedProse, blocks)

    expect(restored).toContain("نص تمهيدي عن إيثريوم.")
    expect(restored).toContain("pragma solidity ^0.8.0;")
    expect(restored).toContain("npx hardhat deploy")
    expect(restored).toContain("```solidity")
    expect(restored).toContain("```bash")

    // Step 4: Extract comments from the solidity block
    const solidityBlock = blocks.find((b) => b.language === "solidity")!
    const { comments } = extractComments(solidityBlock.content, "solidity")

    expect(comments.length).toBeGreaterThanOrEqual(2)
    const licenseComment = comments.find((c) => c.text.includes("SPDX"))
    const managesComment = comments.find((c) =>
      c.text.includes("manages tokens")
    )
    const transferComment = comments.find((c) =>
      c.text.includes("Transfer tokens")
    )

    expect(licenseComment).toBeDefined()
    expect(managesComment).toBeDefined()
    expect(transferComment).toBeDefined()
  })
})
