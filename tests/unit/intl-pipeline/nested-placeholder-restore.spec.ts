/**
 * normalizeContent -> reconstructFromPlaceholders must round-trip English
 * byte-for-byte; each case here once failed the gate in all 24 locales.
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

test.describe("Wrapper restore closes with the element's own tag", () => {
  for (const markdown of [
    '<p className="mt-0"><strong>Good to know</strong></p>\n',
    "<ul style={{ marginBottom: 0 }}>\n  <li>Fees <strong>~5x</strong> lower</li>\n</ul>\n",
    '<ExpandableCard title="Rewards">\n\nText.\n\n<ButtonLink href="/staking/">Stake</ButtonLink>\n\n</ExpandableCard>\n',
    'Jump <a id="top"></a> here.\n',
    "```md\n  indented first line\nsecond\n```\n",
  ]) {
    test(`round-trips ${JSON.stringify(markdown)}`, () => {
      expect(roundTrip(markdown)).toBe(markdown)
    })
  }
})

test.describe("Positional recovery of a corrupted CODE hash", () => {
  for (const markdown of [
    // `x` is held inside the image, so it never reaches the model and must
    // not count against recovering `y`.
    "![a `x` b](./p.png) and `y` text.\n",
    // Link text is sent to the model, so code inside it stays recoverable.
    "Call [`eth_call`](/developers/docs/apis/json-rpc/#eth_call) to read state.\n",
    // The same token both nested and sent.
    "![a `x` b](./p.png) and `x` text.\n",
  ]) {
    test(JSON.stringify(markdown), () => {
      const { normalized, extractions } = normalizeContent(markdown)
      const tokens = normalized.match(/<HTML-PLACEHOLDER-CODE-[a-f0-9]+ \/>/g)
      expect(tokens).toHaveLength(1)
      const corrupted = normalized.replace(
        tokens![0],
        "<HTML-PLACEHOLDER-CODE-000000 />"
      )
      expect(
        reconstructFromPlaceholders(corrupted, extractions, normalized)
      ).toBe(markdown)
    })
  }
})
