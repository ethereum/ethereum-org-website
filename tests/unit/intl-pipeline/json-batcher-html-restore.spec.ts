/**
 * JSON batcher HTML placeholder restoration -- leak regression tests.
 *
 * Background (PR #18418): the pipeline replaces attributed HTML tags
 * (e.g. <a href="...">text</a>) with content-addressed wrapper placeholders
 * <HTML-PLACEHOLDER-HTMLTAG-{hash}>text</...> before translation, then restores
 * them afterwards. In 7 locales a placeholder leaked verbatim into the shipped
 * glossary-tooltip.json because the translated value contained the SAME hash
 * placeholder MORE times than the English source had the tag (translation memory
 * / Gemini duplicated a linked phrase). The old per-entry indexOf restore
 * rebuilt only the first occurrence, leaving the surplus placeholder in place --
 * and logged no failure, so it shipped silently.
 *
 * These tests pin the two guarantees the fix must hold:
 *   1. ALL occurrences of a placeholder hash are restored (count-mismatch safe).
 *   2. Any residual `HTML-PLACEHOLDER` token after restore is reported as a
 *      failure (never a silent leak).
 */

import { expect, test } from "@playwright/test"

import {
  prepareJsonBatches,
  restoreJsonBatch,
} from "../../../src/scripts/intl-pipeline/lib/llm/json-batcher"

/** Pull the first wrapper open token (with hash) out of normalized batch text. */
function firstWrapperOpenToken(batchContent: string): string {
  const m = batchContent.match(/<HTML-PLACEHOLDER-HTMLTAG-[a-f0-9]+>/)
  if (!m) throw new Error("expected a wrapper placeholder in batch content")
  return m[0]
}

test("restores every occurrence when the translation duplicates a wrapper", () => {
  // English source: the linked tag appears exactly once.
  const source = JSON.stringify({
    "ommer-like":
      'This was common when it was a <a href="/glossary/#pow">proof-of-work</a> network.',
  })

  const prepared = prepareJsonBatches(source)
  expect(prepared.htmlExtracted).toBe(true)
  const map = prepared.placeholderMaps[0]
  const batch = prepared.batchContents[0]

  const openTok = firstWrapperOpenToken(batch)
  const hash = openTok
    .replace("<HTML-PLACEHOLDER-HTMLTAG-", "")
    .replace(">", "")
  const closeTok = `</HTML-PLACEHOLDER-HTMLTAG-${hash}>`

  // Simulate a translated batch where the wrapper pair appears TWICE (the real
  // failure mode): the model reused the linked phrase a second time.
  const parsedBatch = JSON.parse(batch) as Record<string, string>
  const onePair = `${openTok}proof-of-work${closeTok}`
  const twoPairs = `${onePair} ... and again ${onePair}`
  parsedBatch["ommer-like"] = parsedBatch["ommer-like"].replace(
    onePair,
    twoPairs
  )

  const { content, failures } = restoreJsonBatch(
    JSON.stringify(parsedBatch),
    map
  )
  const value = (JSON.parse(content) as Record<string, string>)["ommer-like"]

  // No placeholder may survive, regardless of count mismatch.
  expect(value).not.toContain("HTML-PLACEHOLDER")
  // Both occurrences must be the real anchor.
  const anchorCount = (value.match(/<a href="\/glossary\/#pow">/g) || []).length
  expect(anchorCount).toBe(2)
  expect(failures).toHaveLength(0)
})

test("round-trips a single wrapper unchanged", () => {
  const source = JSON.stringify({
    k: 'See the <a href="/glossary/#wei">wei</a> entry.',
  })
  const prepared = prepareJsonBatches(source)
  const { content, failures } = restoreJsonBatch(
    prepared.batchContents[0],
    prepared.placeholderMaps[0]
  )
  const value = (JSON.parse(content) as Record<string, string>).k
  expect(value).toContain('<a href="/glossary/#wei">wei</a>')
  expect(value).not.toContain("HTML-PLACEHOLDER")
  expect(failures).toHaveLength(0)
})

test("reports a failure rather than silently shipping a residual placeholder", () => {
  const source = JSON.stringify({
    k: 'A <a href="/glossary/#pow">proof-of-work</a> network.',
  })
  const prepared = prepareJsonBatches(source)
  const map = prepared.placeholderMaps[0]

  // Simulate a translated batch carrying an UNKNOWN-hash placeholder (no map
  // entry) -- this must be surfaced as a failure, not returned verbatim.
  const orphan =
    "<HTML-PLACEHOLDER-HTMLTAG-deadbe>orphan</HTML-PLACEHOLDER-HTMLTAG-deadbe>"
  const parsedBatch = JSON.parse(prepared.batchContents[0]) as Record<
    string,
    string
  >
  parsedBatch.k = `${parsedBatch.k} ${orphan}`

  const { content, failures } = restoreJsonBatch(
    JSON.stringify(parsedBatch),
    map
  )
  const value = (JSON.parse(content) as Record<string, string>).k

  expect(value).not.toContain("HTML-PLACEHOLDER")
  expect(failures.length).toBeGreaterThan(0)
})
