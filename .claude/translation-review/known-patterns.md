# Known Translation Patterns & Issues

> This is a living document. Updated after each language review.
> Last updated: 2026-02-21 (seeded from Turkish PR #17182 review)

## Issue Categories

### 1. Brand Name Mistranslation (CRITICAL)

Programming language names with common-word meanings are systematically translated by Crowdin/Gemini.

**Known examples:**
- "Solidity" → "katillik" (Turkish: rigidity/firmness) — appeared in 26 tutorial files in `tags` frontmatter
- "DeFi" → "MeFi" (Turkish: letter dropped) — appeared in JSON files

**Pattern:** This is systematic, not random. Expect it in EVERY language for: Solidity, Vyper, and any brand name that has a common-word meaning in the target language.

**Where to look:** Frontmatter `tags` arrays, inline mentions in tutorial content, JSON translation strings.

### 2. Cross-Script Contamination (CRITICAL)

Crowdin translation memory leaks content from other language translations.

**Known examples:**
- "Vitalik Buterin" rendered in Devanagari (Hindi script) inside Turkish translation files
- Files affected: `learn-quizzes.json`, `page-upgrades-index.json`

**Pattern:** Crowdin TM pulls from wrong-locale segments. Check for characters outside the expected Unicode range for the target locale.

### 3. MDX Syntax Errors (CRITICAL — breaks builds)

Four predictable categories that appear in every import:

| Pattern | Example | Fix |
|---------|---------|-----|
| Raw `<` before numbers | `<5GB` in MDX context | Escape to `&lt;5GB` |
| Missing closing backtick | `` `<contract>.<function>() `` | Add closing backtick |
| Misplaced backtick exposing JSX | ``(`<> ...` </>`)`` | Fix backtick placement |
| Orphaned HTML closing tags | `</a>` from sentence restructuring | Remove orphaned tag |

**Pattern:** These same 4 patterns recur in every Crowdin import. The first two are most common.

### 4. Semantic Inversions (CRITICAL)

Technical antonym pairs get swapped during translation.

**Known examples:**
- "proof-of-stake" ↔ "proof-of-work" swapped in Turkish `roadmap/merge/index.md`
- Beacon Chain described as "proof-of-work blockchain" instead of "proof-of-stake"

**High-risk antonym pairs:**
- proof-of-work / proof-of-stake
- validator / miner
- staking / mining
- mainnet / testnet
- Layer 1 / Layer 2

### 5. Translated Hrefs (HIGH)

Internal URL paths get translated when they must stay in English.

**Known pattern:** `/governance` → `/gobernanza` (Spanish), similar in other languages.

**Rule:** ALL internal hrefs (starting with `/`) must remain exactly as in English source. The sanitizer has `fixTranslatedHrefs()` but edge cases exist when block alignment breaks down.

### 6. Wrong Technical Term Selection (HIGH)

Common dictionary translations used instead of accepted Ethereum terminology.

**Known examples:**
- "Clients" → "Müşterileri" (Turkish: Customers) — should be "İstemcileri" (computing clients)
- "Mainnet" → "Markette" (Turkish: in the market) — should be "Ana Ağ"
- "underlying blockchain" → "yatak blockchain" (Turkish: bed blockchain) — should be "altta yatan blokzincir"

**Pattern:** Always reference the community glossary. The correct term is often non-obvious (both translations are valid Turkish, but only one is accepted in the Ethereum context).

### 7. Ticker/Acronym Typos (MEDIUM)

Character transpositions in protocol acronyms.

**Known examples:**
- ETH → EHT (3 occurrences in Turkish)
- BLS → BSL (2 occurrences in Turkish)

**Pattern:** Levenshtein distance 1 from canonical form. Common with 3-letter acronyms.

### 8. Domain Typos (MEDIUM)

**Known examples:**
- "ethereum.org" → "ethererum.org" (3 files in Turkish)
- "World Wide Web" → "World Wibe Web"

### 9. Untranslated Content Chunks (HIGH)

Entire paragraphs or sections left in English within translated files.

**Pattern:** Observed in Vietnamese review — some pages only partially translated. Requires re-submission to Gemini for completion.

**Detection:** Language detection at paragraph level (franc-min library).

### 10. Frontmatter Tag Translation — Brand Names Only (MEDIUM)

Frontmatter `tags` arrays contain a mix of brand names and concept/category terms. Only **brand-name tags** must remain in English; concept tags are intentionally translated by Crowdin.

**Brand-name tag example (MUST fix):** `tags: ["solidity", ...]` → `tags: ["katillik", ...]` in Turkish tutorials. "Solidity" is a programming language name and must never be translated.

**Concept tag example (CORRECT — do NOT flag):** `tags: ["smart contracts", ...]` → `tags: ["smart kontrakt účty", ...]` in Czech, or `tags: ["testing", ...]` → `tags: ["testování", ...]`. These are generic descriptive terms that Crowdin translates intentionally.

**Rule:** Only flag translated tags that are proper nouns or brand names (programming languages, company/product names, protocol names). Generic concept/category tags (e.g., "smart contracts", "testing", "security", "deploying", "storage", "transactions", "frontend", "nodes") are expected to be in the target language.

### 11. Code Block Translation Policy (HIGH)

Code fences contain a mix of functional code and comments. Only **functional code** must stay in English; **comments** may be translated.

**Must stay English (CRITICAL):** Identifiers, variable/function names, string literals, config keys/values, console output, error messages, struct field names, TOML/JSON/YAML keys.

**May be translated (CORRECT — do NOT flag):** Code comments (`//`, `/* */`, `#`). These exist purely for reader comprehension and don't affect execution. Translated comments improve accessibility for non-English speakers.

**Example (CORRECT):** `// Veřejná proměnná typu unsigned int` inside a Solidity code block in Czech — this is a comment explaining the code and benefits from translation.

**Example (MUST fix):** `bytes("záznam již zapsán")` — this is a string literal inside Solidity that affects runtime behavior.

## Per-Language Notes

### Turkish (tr) — Reviewed PR #17182
- Quality score: 7.7/10
- 34 critical issues, 56 warnings across 301 files
- Community glossary: proof-of-stake = "hisse ispatı", mainnet = "ana ağ", client = "istemci", stablecoin = "sabit para"
- JSON Batch B agent hit context overflow with Opus — fell back to Sonnet
- See: `docs/solutions/translation-review/crowdin-import-review-turkish-pr-17182.md`

### Vietnamese (vi) — Reviewed PR #17176
- Quality score: 7.2/10
- 37 critical issues, 124 warnings across 277 files
- Same MDX error patterns as Turkish (misplaced backticks, orphaned HTML tags)
- Significant untranslated content chunks requiring Gemini re-pass
- See: `docs/solutions/translation-review/crowdin-import-review-vietnamese-pr-17176.md` (on PR branch)

## Agent Architecture Notes

- JSON files with 40+ entries can exceed Opus context window — plan for Sonnet fallback or 3-way split
- 5-agent parallel review architecture validated in Turkish review: Core Pages, Dev Docs, Tutorials, JSON Batch A, JSON Batch B
- Recommended sub-agent split for Phase 2+: MDX Syntax, Brand Names, Href Validation, Semantic Review, Build Verification
