/**
 * Unit tests for the positional-fallback placeholder recovery in
 * reconstructFromPlaceholders (gemini.ts).
 *
 * Regression: Gemini sometimes corrupts a placeholder's hash (observed a real
 * hash returned as `000000` / `0`). The exact-hash passes then miss and the raw
 * <HTML-PLACEHOLDER-...> token leaks into output (broke ButtonLinks in PR
 * #18429). The final pass recovers such tokens by position -- but only when the
 * residual/unconsumed counts match per type, so it never guesses.
 */

import { expect, test } from "@playwright/test"

// Side-effect import: sets placeholder tokens before the @/scripts import below,
// because config.ts throws on a missing GITHUB_API_TOKEN at import time.
import "./env-shim"

import { _testOnly } from "@/scripts/intl-pipeline/lib/llm/gemini"

const { reconstructFromPlaceholders } = _testOnly

test.describe("Placeholder positional fallback", () => {
  test("recovers a COMPONENT wrapper whose hash was corrupted to 000000", () => {
    const extractions = new Map<string, string>([
      [
        "COMPONENT:abc123",
        '<ButtonLink size="sm" variant="outline" href="https://x">Try it</ButtonLink>',
      ],
    ])
    // Gemini returned a corrupted hash and a translated label.
    const translated =
      "Prefix <HTML-PLACEHOLDER-COMPONENT-000000>etiqueta traducida</HTML-PLACEHOLDER-COMPONENT-000000> suffix"

    const result = reconstructFromPlaceholders(translated, extractions)

    expect(result).toBe(
      'Prefix <ButtonLink size="sm" variant="outline" href="https://x">etiqueta traducida</ButtonLink> suffix'
    )
    // No raw placeholder token survives.
    expect(result).not.toContain("HTML-PLACEHOLDER")
  })

  test("count mismatch: does not force-restore when residuals outnumber unconsumed entries", () => {
    // Only ONE unconsumed COMPONENT extraction, but TWO residual tokens.
    const extractions = new Map<string, string>([
      ["COMPONENT:abc123", "<ButtonLink href=\"https://x\">Try it</ButtonLink>"],
    ])
    const translated =
      "<HTML-PLACEHOLDER-COMPONENT-000000>label one</HTML-PLACEHOLDER-COMPONENT-000000> " +
      "<HTML-PLACEHOLDER-COMPONENT-111111>label two</HTML-PLACEHOLDER-COMPONENT-111111>"

    const result = reconstructFromPlaceholders(translated, extractions)

    // Counts disagree -> no guessing; residuals left untouched.
    expect(result).toBe(translated)
    expect(result).toContain("HTML-PLACEHOLDER-COMPONENT-000000")
    expect(result).toContain("HTML-PLACEHOLDER-COMPONENT-111111")
  })

  test("uncorrupted case: exact-hash path restores, fallback is a no-op", () => {
    const extractions = new Map<string, string>([
      [
        "LINK:def456",
        "[ethers.org docs](https://docs.ethers.org)",
      ],
    ])
    // Hash matches the extraction key exactly -> exact-hash pass handles it.
    const translated =
      "Lee la <HTML-PLACEHOLDER-LINK-def456>documentación</HTML-PLACEHOLDER-LINK-def456> aquí."

    const result = reconstructFromPlaceholders(translated, extractions)

    expect(result).toBe(
      "Lee la [documentación](https://docs.ethers.org) aquí."
    )
    expect(result).not.toContain("HTML-PLACEHOLDER")
  })
})
