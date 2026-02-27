---
title: "French Crowdin Translation Import: Critical Issues in 300-File Batch"
date: "2026-02-26"
category: "integration-issues"
tags:
  - crowdin
  - i18n
  - french-translation
  - sanitizer
  - quality-assurance
  - unit-tests
severity: "high"
component:
  - "i18n translation pipeline"
  - "Crowdin integration"
  - "sanitizer scripts"
symptoms:
  - "Semantic inversions in domain-specific terminology (trusted/trustless)"
  - "Translated YAML frontmatter toId values breaking in-page navigation"
  - "Translated internal href paths breaking routing"
  - "Garbled numeric identifiers (ERC-7575 -> ERC-75757)"
  - "Untranslated content blocks in otherwise-French files"
  - "Broken HTML tags across markdown and JSON files"
  - "35 critical issues across 17 of 300 files (207 markdown + 93 JSON)"
root_cause: "Crowdin's aggressive translation strategy translates protected fields and identifiers that must remain in English; lack of pre-import validation for frontmatter, hrefs, and numeric patterns"
resolution_time: "~4 hours (worktree setup, sanitizer run, 12-agent parallel review, auto-fix, scoring, PR posting)"
files_affected: 17
pre_fix_score: "7.1/10"
post_fix_score: "8.7/10"
related:
  - docs/solutions/integration-issues/crowdin-import-review-turkish-pr-17182.md
  - docs/solutions/integration-issues/crowdin-import-review-japanese-pr-17132.md
  - docs/solutions/integration-issues/crowdin-import-review-czech-pr-17547.md
  - docs/solutions/integration-issues/crowdin-import-review-agent-calibration.md
---

# French Crowdin Translation Import: Pitfalls, Fixes, and Sanitizer Enhancements

**PR:** #17125
**Language:** French (fr)
**Scope:** 300 files (207 markdown + 93 JSON)
**Date:** 2026-02-26

## Overview

This documents the full review of PR #17125, a French Crowdin translation import for ethereum.org. The review pipeline -- worktree setup, sanitizer run, 12 parallel AI review agents, auto-fix, and scoring -- uncovered 35 critical issues across 17 files. Every pitfall encountered is cataloged below, alongside the fix applied, whether the sanitizer script could handle the fix deterministically, and proposed unit tests for each deterministic case.

## Pipeline Pitfalls

### Pitfall 1: Merge Conflict in Translation JSON

**File:** `src/intl/fr/page-developers-tutorials.json`

**Problem:** Conflict between PR branch and dev branch. Dev had a newer translation ("Reinitialiser les filtres") plus 5 additional keys not in the PR.

**Fix:** Kept dev's translation value and merged the 5 new keys from PR manually.

**Sanitizer handling:** Not automatable. Merge conflicts require human judgment about which translation is authoritative.

---

### Pitfall 2: Sanitizer Argument Parsing

**Problem:** `npx tsx sanitize-pr.ts --pr=17125` failed. The script expects a positional argument, not a named flag.

**Fix:** `npx tsx sanitize-pr.ts 17125`

**Sanitizer enhancement:** Accept both `--pr=N` and positional `N`, or emit a clear error.

```ts
// Proposed test
it("should parse both flag and positional forms", () => {
  expect(parseArgs(["--pr=17125"]).pr).toBe(17125)
  expect(parseArgs(["17125"]).pr).toBe(17125)
})
```

---

### Pitfall 3: Rate Limiting on Parallel Agent Launch

**Problem:** All 12 Opus agents launched simultaneously; 11 hit API rate limits and failed.

**Fix:** Waited for reset, relaunched all 11 successfully.

**Lesson:** Stagger agent launches (2-3 per minute) or use lower-tier models for some agents. This is a process issue, not a sanitizer issue.

---

### Pitfall 4: Agent False Positives on Translated Tags

**Problem:** One agent flagged translated concept tags (e.g., "contrats intelligents") as errors.

**Fix:** No file change needed. Per policy, concept/category tags ARE intentionally translated by Crowdin; only brand-name tags must stay English.

**Lesson:** Review agent prompts must explicitly distinguish brand-name tags (must stay English) from concept tags (translation is correct).

---

## Terminology Fixes (Deterministic -- Sanitizer Could Handle)

### Pitfall 5: Acronym Transposition -- EMV -> EVM

**File:** `developers/docs/evm/opcodes/index.md` (title)

**Problem:** "EVM" rendered as "EMV" -- letter transposition.

**Pattern:** Common in Crowdin output. Known variants: EMV, EHT, BSL, ECDAS.

**Sanitizer enhancement:** Expand `TICKER_CORRECTIONS` map with acronym transpositions.

```ts
describe("fixAcronymTypos", () => {
  it("should fix EMV -> EVM", () => {
    expect(fixAcronymTypos("Opcodes pour l'EMV")).toBe("Opcodes pour l'EVM")
  })
  it("should fix EHT -> ETH", () => {
    expect(fixAcronymTypos("Send EHT to wallet")).toBe("Send ETH to wallet")
  })
  it("should not fix inside backticks", () => {
    expect(fixAcronymTypos("Use `EMV` in code")).toBe("Use `EMV` in code")
  })
})
```

---

### Pitfall 6: Proper Noun Phonetic Translation -- Ce Age -> Ice Age

**File:** `ethereum-forks/index.md`

**Problem:** "Ice Age" (Ethereum historical event) rendered as "Ce Age" -- phonetic approximation.

**Sanitizer enhancement:** Dictionary of Ethereum proper nouns that must remain in English.

```ts
describe("preserveProperNouns", () => {
  it("should fix Ce Age -> Ice Age", () => {
    expect(preserveProperNouns("repousser l'Ce Age")).toBe("repousser l'Ice Age")
  })
  it("should preserve already-correct terms", () => {
    expect(preserveProperNouns("l'Ice Age")).toBe("l'Ice Age")
  })
})
```

---

### Pitfall 7: ERC Number Digit Duplication -- ERC-75757 -> ERC-7575

**File:** `developers/docs/standards/tokens/erc-4626/index.md`

**Problem:** "ERC-7575" rendered as "ERC-75757" -- digit duplication during translation.

**Sanitizer enhancement:** Compare ERC/EIP numbers against English source; flag any mismatch.

```ts
describe("fixERCNumbers", () => {
  it("should fix digit duplication", () => {
    expect(fixERCNumbers("ERC-75757", enSource)).toBe("ERC-7575")
  })
  it("should fix prefix truncation RC-20 -> ERC-20", () => {
    expect(fixERCNumbers("RC-20", enSource)).toBe("ERC-20")
  })
  it("should preserve correct numbers", () => {
    expect(fixERCNumbers("ERC-20", enSource)).toBe("ERC-20")
  })
})
```

---

### Pitfall 8: ERC Prefix Truncation -- RC-20 -> ERC-20

**File:** `staking/pools/index.md`

**Problem:** "ERC-20" rendered as "RC-20" -- leading "E" dropped.

**Sanitizer enhancement:** Regex `\bRC-\d+\b` to catch truncated ERC references.

```ts
it("should restore truncated ERC prefix", () => {
  expect(fixERCPrefix("jetons RC-20")).toBe("jetons ERC-20")
})
```

---

### Pitfall 9: Code Identifier Translated -- faut() -> foo()

**File:** `developers/docs/standards/tokens/erc-223/index.md`

**Problem:** Placeholder `foo()` translated to French word `faut()` ("must").

**Sanitizer enhancement:** Extract inline code identifiers, compare against English source, revert mismatches that match target-language dictionary words.

```ts
describe("preserveCodeIdentifiers", () => {
  it("should fix faut() -> foo()", () => {
    expect(preserveCodeIdentifiers("`faut()`", enSource)).toBe("`foo()`")
  })
  it("should preserve correct identifiers", () => {
    expect(preserveCodeIdentifiers("`getBalance()`", enSource)).toBe("`getBalance()`")
  })
})
```

**Note:** Semi-deterministic. Requires source comparison + dictionary lookup.

---

## Structural Fixes (Deterministic -- Sanitizer Could Handle)

### Pitfall 10: Double-Escaped HTML Entity -- `\&lt;` -> `\<`

**File:** `developers/docs/networking-layer/portal-network/index.md`

**Problem:** `\&lt;` where `\<` expected. Double-escaping: HTML entity introduced during translation combined with existing backslash.

**Sanitizer enhancement:** Regex `\\&lt;` -> `\\<` and `\\&gt;` -> `\\>`.

```ts
describe("fixDoubleEscape", () => {
  it("should fix \\&lt; -> \\<", () => {
    expect(fixDoubleEscape("\\&lt;1 Go de RAM")).toBe("\\<1 Go de RAM")
  })
  it("should not touch bare entities", () => {
    expect(fixDoubleEscape("&lt;div&gt;")).toBe("&lt;div&gt;")
  })
})
```

---

### Pitfall 11: HTML Attribute Spacing -- `href = "url"` -> `href="url"`

**File:** `restaking/index.md`

**Problem:** Spaces inserted around `=` in HTML attributes, breaking link rendering.

**Sanitizer enhancement:** Regex to normalize `(\w+)\s+=\s+"` -> `$1="` within HTML tags.

```ts
describe("normalizeHrefSpacing", () => {
  it("should remove spaces around = in attributes", () => {
    expect(normalizeHrefSpacing('href = "https://example.com"')).toBe('href="https://example.com"')
  })
  it("should not modify non-HTML context", () => {
    expect(normalizeHrefSpacing("x = y + 2")).toBe("x = y + 2")
  })
})
```

---

### Pitfall 12: Translated Internal Hrefs -- `/staking/retraits/` -> `/staking/withdrawals/`

**Files:** `staking/solo/index.md`, `ethereum-forks/index.md`, `roadmap/merge/index.md`

**Problem:** Internal paths translated. Routes are always English; translated paths yield 404s.

**Sanitizer enhancement:** Extract all internal hrefs (starting with `/`), compare against English source, revert translated ones.

```ts
describe("revertTranslatedHrefs", () => {
  it("should restore translated path", () => {
    expect(revertTranslatedHrefs("/staking/retraits/", enSource)).toBe("/staking/withdrawals/")
  })
  it("should not modify external URLs", () => {
    expect(revertTranslatedHrefs("https://external.com/fr/", enSource)).toBe("https://external.com/fr/")
  })
  it("should not modify already-correct paths", () => {
    expect(revertTranslatedHrefs("/staking/withdrawals/", enSource)).toBe("/staking/withdrawals/")
  })
})
```

---

### Pitfall 13: Translated toId Anchors in YAML Frontmatter

**Files:** `ai-agents/index.md`, `restaking/index.md`, `prediction-markets/index.md`

**Problem:** YAML `toId` values translated (e.g., `que-sont-les-agents-ia`) but heading anchors use English IDs (`{#what-are-ai-agents}`). Breaks in-page navigation buttons.

**Sanitizer enhancement:** Parse frontmatter `toId` values, match against `{#anchor}` patterns in English source headings, auto-sync.

```ts
describe("matchToIdToAnchors", () => {
  it("should restore translated toId to English anchor", () => {
    const fr = { toId: "que-sont-les-agents-ia" }
    const enAnchors = ["what-are-ai-agents", "ai-agents-on-ethereum"]
    expect(matchToIdToAnchors(fr, enAnchors).toId).toBe("what-are-ai-agents")
  })
  it("should not modify already-correct toId", () => {
    const fr = { toId: "what-are-ai-agents" }
    const enAnchors = ["what-are-ai-agents"]
    expect(matchToIdToAnchors(fr, enAnchors).toId).toBe("what-are-ai-agents")
  })
})
```

---

### Pitfall 14: Displaced `</strong>` Closing Tag in JSON

**File:** `src/intl/fr/page-roadmap.json`

**Problem:** `</strong>` tag moved to wrong position in string, wrapping unintended text. EN source has `...do anything** to secure their assets.</strong>` but FR had `</strong>` after "Les opérateurs de" (next sentence).

**Sanitizer enhancement:** Compare HTML tag positions between EN and FR JSON values; flag structural mismatches.

```ts
describe("fixDisplacedTags", () => {
  it("should detect tag count mismatch", () => {
    const en = "<strong>text</strong> more"
    const fr = "<strong>text more</strong> extra"
    expect(detectTagMismatch(fr, en)).toBe(true)
  })
  it("should pass when tags match", () => {
    const en = "<strong>text</strong>"
    const fr = "<strong>texte</strong>"
    expect(detectTagMismatch(fr, en)).toBe(false)
  })
})
```

---

## Semantic Fixes (Non-Deterministic -- Requires AI Judgment)

### Pitfall 15: Trusted/Trustless Bridge Semantic Inversion

**File:** `bridges/index.md`

**Problem:** "trusted" translated as "sans risque" (risk-free) and "trustless" as "risque" (risky). Completely inverted: in Ethereum bridge terminology, a "trusted" bridge requires trust assumptions (more risk), while "trustless" minimizes trust (less risk).

**Fix:** Replaced with "de confiance" (trusted) / "sans confiance" (trustless) throughout 5 instances in the file.

**Sanitizer handling:** Cannot be fully automated. Domain-specific semantic inversions require understanding context. A glossary of high-stakes term pairs could flag for human review:

```
trusted -> de confiance  (NOT "sans risque", NOT "fiable")
trustless -> sans confiance  (NOT "risque", NOT "non fiable")
```

---

### Pitfall 16: Anonyme vs. Pseudonyme

**File:** `defi/index.md`

**Problem:** "pseudonymous" translated as "anonyme" (anonymous). Distinct privacy concepts: pseudonymous = identity obscured via pseudonym but traceable; anonymous = no identifying information exists.

**Fix:** Replaced "anonyme" with "pseudonyme".

**Sanitizer handling:** Partially automatable via glossary lookup. A known-bad-translation dictionary could flag "anonyme" where English source says "pseudonymous".

---

## Content Patches (Mixed Automatability)

### Pitfall 17: Multiple Paragraphs Left in English

**File:** `community/events/organizing/index.md`

**Problem:** 5+ paragraphs left entirely in English in an otherwise French-translated file.

**Fix:** Replaced with fully translated version from commit `2cb992ef`.

**Sanitizer enhancement:** `franc-min` language detection (already partially implemented) should flag paragraphs whose detected language is English within a French-locale file.

```ts
describe("detectWrongLanguage", () => {
  it("should flag English paragraph in French file", () => {
    expect(detectWrongLanguage(
      "This is a completely untranslated English paragraph.",
      "fr"
    )).toBe(true)
  })
  it("should pass French paragraph", () => {
    expect(detectWrongLanguage(
      "Ceci est un paragraphe en francais avec du contenu.",
      "fr"
    )).toBe(false)
  })
})
```

---

### Pitfall 18: Dev Branch Had Superior Translation

**File:** `contributing/index.md`

**Problem:** Dev branch contained a better translation than Crowdin imported.

**Fix:** Patched from dev branch version.

**Sanitizer handling:** Not automatable. Determining which of two valid translations is "better" requires human judgment.

---

### Pitfall 19: Untranslated JSON String

**File:** `src/intl/fr/page-staking.json`

**Problem:** "Deposit 32 ETH and generate your keys with assistance" left in English.

**Sanitizer enhancement:** Compare FR and EN JSON values; flag identical strings exceeding a length threshold (e.g., 20 characters), excluding brand names, URLs, and code.

```ts
describe("detectUntranslated", () => {
  it("should flag identical long strings", () => {
    expect(detectUntranslated(
      "Deposit 32 ETH and generate your keys with assistance",
      "Deposit 32 ETH and generate your keys with assistance"
    )).toBe(true)
  })
  it("should skip short brand strings", () => {
    expect(detectUntranslated("ETH", "ETH")).toBe(false)
  })
  it("should skip URLs", () => {
    expect(detectUntranslated(
      "https://ethereum.org/staking",
      "https://ethereum.org/staking"
    )).toBe(false)
  })
})
```

---

## Summary Table

| # | Issue | Deterministic? | Sanitizer Can Fix? | Has Unit Test? |
|---|-------|:-:|:-:|:-:|
| 1 | Merge conflict | No | No | N/A |
| 2 | Arg parsing | Yes | Yes (script fix) | Yes |
| 3 | Rate limiting | N/A | Process fix | N/A |
| 4 | False positive tags | No | Prompt fix | N/A |
| 5 | EMV -> EVM | Yes | Yes | Yes |
| 6 | Ce Age -> Ice Age | Yes | Yes | Yes |
| 7 | ERC-75757 -> ERC-7575 | Yes | Yes (needs source) | Yes |
| 8 | RC-20 -> ERC-20 | Yes | Yes | Yes |
| 9 | faut() -> foo() | Partial | Partial (needs source + dict) | Yes |
| 10 | `\&lt;` -> `\<` | Yes | Yes | Yes |
| 11 | `href = "url"` spacing | Yes | Yes | Yes |
| 12 | Translated internal hrefs | Yes | Yes (needs source) | Yes |
| 13 | Translated toId anchors | Yes | Yes (needs source) | Yes |
| 14 | Displaced `</strong>` | Yes | Yes (needs source) | Yes |
| 15 | Trusted/trustless inversion | No | No (glossary can flag) | N/A |
| 16 | anonyme vs pseudonyme | No | Partial (glossary) | N/A |
| 17 | Paragraphs left in English | Partial | Partial (franc-min) | Yes |
| 18 | Dev vs Crowdin quality | No | No | N/A |
| 19 | Untranslated JSON string | Yes | Yes (length threshold) | Yes |

**Key finding:** 11 of 19 pitfalls are fully deterministic and could be caught by enhanced sanitizer scripts. 3 more are partially automatable. Only 5 require human or AI judgment.

## Sanitizer Enhancement Priority

Based on impact and implementation simplicity:

1. **High priority (simple regex, high impact):**
   - Translated internal hrefs (Pitfall 12) -- 404 errors on live site
   - Translated toId anchors (Pitfall 13) -- broken navigation
   - ERC/EIP number validation (Pitfalls 7-8) -- factual errors
   - Double HTML entity escaping (Pitfall 10) -- MDX build failures

2. **Medium priority (needs source comparison):**
   - Displaced HTML tags in JSON (Pitfall 14)
   - Untranslated string detection (Pitfall 19)
   - HTML attribute spacing (Pitfall 11)

3. **Lower priority (needs dictionary/glossary):**
   - Code identifier translation (Pitfall 9)
   - Proper noun preservation (Pitfall 6)
   - Acronym transposition (Pitfall 5) -- partially implemented already

## Cross-References

- **Turkish review (PR #17182):** First comprehensive Crowdin import review establishing the baseline issue catalog
- **Japanese review (PR #17132):** Exposed 5 bugs in `post_import_sanitize.ts`, led to Phase 1 sanitizer fixes
- **Czech review (PR #17547):** Sanitizer crash on orphaned Crowdin paths; translation staleness patterns
- **Agent calibration (PR #17553):** False positive calibration for brand vs concept tags, functional code vs comments
- **Sanitizer source:** `src/scripts/i18n/post_import_sanitize.ts`
- **Sanitizer roadmap:** `src/scripts/i18n/docs/v0.2.0-roadmap.md` (planned glossary validation)
- **Knowledge base:** `~/.claude/translation-review/known-patterns.md` (11 patterns), `per-language/fr.md`
