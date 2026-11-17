/**
 * Regression: normalizeContent extracts HTML tags before inline code, so
 * `` `<hr />` `` stores an HTMLTAG token inside its CODE extraction. Restoring
 * in insertion order expanded the HTMLTAG key before the CODE key revealed it,
 * leaking `<HTML-PLACEHOLDER-HTMLTAG-... />` and failing the gate for the wagmi
 * tutorial in every locale.
 */

import { expect, test } from "@playwright/test"

// Side-effect import: config.ts throws on a missing GITHUB_API_TOKEN at import time.
import "./env-shim"

import { normalizeContent } from "@/scripts/intl-pipeline/lib/llm/content-normalizer"
import { _testOnly } from "@/scripts/intl-pipeline/lib/llm/gemini"

const { reconstructFromPlaceholders } = _testOnly

const roundTrip = (markdown: string) => {
  const { normalized, extractions } = normalizeContent(markdown)
  return reconstructFromPlaceholders(normalized, extractions)
}

test.describe("Nested placeholder restore", () => {
  for (const markdown of [
    "See `<hr />` here.\n",
    "Two tags, `<Greeter />` and [`<hr />` for a horizontal line](https://www.w3schools.com/tags/tag_hr.asp).\n",
    'Use `<br />` or `<img src="a.png" />`, not `<b>x</b>`.\n',
    "```tsx\n<div>\n<hr />\n```\n\nThen [`<hr />` line](https://x.y/z) and <hr />.\n",
  ]) {
    test(`round-trips ${JSON.stringify(markdown)}`, () => {
      const result = roundTrip(markdown)
      expect(result).not.toContain("HTML-PLACEHOLDER")
      expect(result).toBe(markdown)
    })
  }
})
