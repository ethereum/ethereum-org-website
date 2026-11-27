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

import { RunFuseExceededError } from "@/scripts/intl-pipeline/lib/llm/cost-meter"
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

    // What the model was sent: the extraction's real token.
    const sent =
      "Prefix <HTML-PLACEHOLDER-COMPONENT-abc123>Try it</HTML-PLACEHOLDER-COMPONENT-abc123> suffix"

    const result = reconstructFromPlaceholders(translated, extractions, sent)

    expect(result).toBe(
      'Prefix <ButtonLink size="sm" variant="outline" href="https://x">etiqueta traducida</ButtonLink> suffix'
    )
    // No raw placeholder token survives.
    expect(result).not.toContain("HTML-PLACEHOLDER")
  })

  test("count mismatch: does not force-restore when residuals outnumber unconsumed entries", () => {
    // Only ONE unconsumed COMPONENT extraction, but TWO residual tokens.
    const extractions = new Map<string, string>([
      ["COMPONENT:abc123", '<ButtonLink href="https://x">Try it</ButtonLink>'],
    ])
    const translated =
      "<HTML-PLACEHOLDER-COMPONENT-000000>label one</HTML-PLACEHOLDER-COMPONENT-000000> " +
      "<HTML-PLACEHOLDER-COMPONENT-111111>label two</HTML-PLACEHOLDER-COMPONENT-111111>"

    const sent =
      "<HTML-PLACEHOLDER-COMPONENT-abc123>Try it</HTML-PLACEHOLDER-COMPONENT-abc123>"

    const result = reconstructFromPlaceholders(translated, extractions, sent)

    // Counts disagree -> no guessing; residuals left untouched.
    expect(result).toBe(translated)
    expect(result).toContain("HTML-PLACEHOLDER-COMPONENT-000000")
    expect(result).toContain("HTML-PLACEHOLDER-COMPONENT-111111")
  })

  test("uncorrupted case: exact-hash path restores, fallback is a no-op", () => {
    const extractions = new Map<string, string>([
      ["LINK:def456", "[ethers.org docs](https://docs.ethers.org)"],
    ])
    // Hash matches the extraction key exactly -> exact-hash pass handles it.
    const translated =
      "Lee la <HTML-PLACEHOLDER-LINK-def456>documentación</HTML-PLACEHOLDER-LINK-def456> aquí."

    const sent =
      "Read the <HTML-PLACEHOLDER-LINK-def456>ethers.org docs</HTML-PLACEHOLDER-LINK-def456> here."

    const result = reconstructFromPlaceholders(translated, extractions, sent)

    expect(result).toBe("Lee la [documentación](https://docs.ethers.org) aquí.")
    expect(result).not.toContain("HTML-PLACEHOLDER")
  })
})

test.describe("inline-code placeholder check", () => {
  const { codePlaceholderIssues } = _testOnly
  const a = "<HTML-PLACEHOLDER-CODE-aaaaaa />"
  const b = "<HTML-PLACEHOLDER-CODE-bbbbbb />"

  test("passes when every code tag survives as often as in the source", () => {
    expect(
      codePlaceholderIssues(`${a} x ${a} ${b}`, `${b} y ${a} ${a}`)
    ).toEqual({ issues: [], off: 0 })
  })

  test("reports a dropped and a doubled tag", () => {
    expect(codePlaceholderIssues(`${a} ${b}`, `${a} ${a}`)).toEqual({
      issues: [`${a} x2 (expected x1)`, `${b} x0 (expected x1)`],
      off: 2,
    })
  })
})

test.describe("full translation re-sends lost inline code", () => {
  const { callGemini } = _testOnly
  const a = "<HTML-PLACEHOLDER-CODE-aaaaaa />"
  const b = "<HTML-PLACEHOLDER-CODE-bbbbbb />"
  const options = {
    filePath: "x.md",
    fileContent: `Call ${a} with ${b} to move the tokens between the two accounts.`,
    fileType: "markdown" as const,
    targetLanguage: "de",
    glossaryTerms: new Map<string, string>(),
    normalized: true,
  }
  const de = (codes: string[]) =>
    `Rufe ${codes.join(" mit ")} auf, um die Token zwischen den beiden Konten zu bewegen.`
  const tokensUsed = { input: 1, output: 2 }
  const raw =
    (replies: (string | Error)[], prompts: string[] = []) =>
    (prompt: string) => {
      prompts.push(prompt)
      const next = replies[prompts.length - 1]
      return next instanceof Error
        ? Promise.reject(next)
        : Promise.resolve({ text: next, tokensUsed })
    }

  test("a re-send that restores the code wins, and every attempt's tokens count", async () => {
    const prompts: string[] = []
    const r = await callGemini(
      options,
      undefined,
      raw([de([a]), de([a, b])], prompts)
    )
    expect(r.translatedContent).toBe(de([a, b]))
    expect(r.tokensUsed).toEqual({ input: 2, output: 4 })
    expect(prompts[1]).toContain("lost or repeated inline-code placeholders")
  })

  test("a failed re-send ships the reply in hand", async () => {
    const r = await callGemini(
      options,
      undefined,
      raw([de([a]), new Error("finishReason=RECITATION")])
    )
    expect(r.translatedContent).toBe(de([a]))
  })

  test("the reply that lost least ships when none is clean", async () => {
    const r = await callGemini(
      options,
      undefined,
      raw([de([a]), de([]), de([b, b])])
    )
    expect(r.translatedContent).toBe(de([a]))
  })

  test("replies rank by copies lost, not by tags affected", async () => {
    const c = "<HTML-PLACEHOLDER-CODE-cccccc />"
    const repeated = {
      ...options,
      fileContent: `Call ${a}, ${a} and ${a}, then ${b} and ${c} to move the tokens between the two accounts.`,
    }
    const lostThreeOfOne = `Rufe ${b} und ${c} auf, um die Token zwischen den beiden Konten zu bewegen.`
    const lostOneOfTwo = `Rufe ${a}, ${a} und ${a} auf, um die Token zwischen den beiden Konten zu bewegen.`
    const r = await callGemini(
      repeated,
      undefined,
      raw([lostThreeOfOne, lostOneOfTwo, lostThreeOfOne])
    )
    expect(r.translatedContent).toBe(lostOneOfTwo)
  })

  test("a reply that kept its other placeholders beats one with all the code", async () => {
    const img = "<HTML-PLACEHOLDER-IMAGE-cccccc />"
    const withImg = { ...options, fileContent: `${options.fileContent} ${img}` }
    const r = await callGemini(
      withImg,
      undefined,
      raw([`${de([a])} ${img}`, de([a, b]), de([a, b])])
    )
    expect(r.translatedContent).toBe(`${de([a])} ${img}`)
  })

  test("the run fuse still stops a re-send", async () => {
    const err = await callGemini(
      options,
      undefined,
      raw([de([a]), new RunFuseExceededError("[cost-guard] aborting run")])
    ).catch((e) => e)
    expect(err).toBeInstanceOf(RunFuseExceededError)
  })
})
