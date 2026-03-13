# Plan: Lowercase "ethereum" across ethereum.org

## Context

Ethereum is over 10 years old. Like the "Internet" -> "internet" transition (AP style, 2016), this initiative lowercases "Ethereum" to "ethereum" as a common noun throughout the site, signaling its maturity as public infrastructure rather than a branded product. This also aligns with the potential liberation of the ETH glyph trademark into the public domain.

## Agreed Rules (from clarifying questions)

### STAYS CAPITALIZED
- **Proper noun compounds**: Ethereum Foundation, Ethereum Cat Herders, Ethereum Classic, Ethereum Name Service, Enterprise Ethereum Alliance, Ethereum Magicians
- **Formal technical specs**: Ethereum Virtual Machine (EVM), Ethereum Improvement Proposals (EIPs), Ethereum Request for Comments (ERCs), Ethereum WebAssembly (Ewasm)
- **Event names**: Ethereum Austin, Ethereum London, Ethereum France, etc.
- **Chain identifiers**: "Ethereum Mainnet" (type-safe in code, also a proper noun)
- **Start of sentence**: "Ethereum is..." when it's the first word of a sentence
- **Direct quotations**: Preserve original capitalization from external sources

### GETS LOWERCASED
- **Standalone mid-sentence**: "building on ethereum", "using ethereum"
- **Descriptive compounds**: "ethereum network", "ethereum blockchain", "ethereum ecosystem", "ethereum community"
- **Headings and titles**: "What is ethereum?", "Use ethereum"
- **Protocol (generic)**: "the ethereum protocol" (only capitalize in formal spec context)
- **"ether" the currency**: already should have been lowercase per existing style guide
- **Transcribed/paraphrased speech**: lowercase per new standard

### SCOPE
- **Start with English** source content, then roll out to translations
- Type-safe chain identifiers in `chains.ts`/`wallet-data.ts`: UNTOUCHED
- Event names in `tenYearEventRegions.ts`: UNTOUCHED
- URLs: UNTOUCHED (always lowercase already)

## Scale

- ~38,700 total "Ethereum" occurrences across codebase
- ~36,600 in markdown content (`public/content/`)
- ~1,300 in English translation JSON (`src/intl/en/`)
- ~377 in TypeScript/TSX source (`src/`)
- Estimated ~25,000-30,000 changes needed (excluding proper nouns + sentence starts)

---

## Phase 1: Demo (this conversation)

**Goal**: Apply changes to 2 high-visibility pages so the team can see how it feels and give feedback.

### Demo pages
1. **Homepage** - the landing page
2. **What is Ethereum?** - the primary educational page (heaviest "Ethereum" density)

### Files to modify

| File | Changes | Type |
|------|---------|------|
| `src/intl/en/page-what-is-ethereum.json` | ~50 | Translation values |
| `src/intl/en/page-index.json` | ~25 | Translation values |
| `src/intl/en/common.json` | ~20 | Shared nav/UI strings |
| `src/components/Hero/HomeHero2026/index.tsx` | 4 | Hardcoded strings |
| `app/[locale]/page.tsx` | 2 | Hardcoded strings |

### Approach for each file
- **Translation JSON files**: Edit string values only (keys stay the same). Apply rules line-by-line, preserving sentence-start capitalization and proper noun compounds.
- **TSX files**: Edit hardcoded user-facing strings. Leave code identifiers, variable names, comments, URLs untouched.

### Key decisions applied in demo

Notable cases in the demo content:

| Original | New | Reasoning |
|----------|-----|-----------|
| "What is Ethereum?" | "What is ethereum?" | Heading - lowercase per rules |
| "Ethereum is a decentralized..." (sentence start) | "Ethereum is a decentralized..." | Stays - first word of sentence |
| "The Ethereum network has..." | "The ethereum network has..." | "The" starts sentence, "ethereum" is mid-sentence modifier |
| "Ethereum Foundation" | "Ethereum Foundation" | Stays - organization proper noun |
| "Ethereum Improvement Proposals" | "Ethereum Improvement Proposals" | Stays - formal standard name |
| "Ethereum Mainnet" | "Ethereum Mainnet" | Stays - proper noun + type-safe identifier |
| "on Ethereum" mid-sentence | "on ethereum" | Common noun usage |
| "Ethereum's priorities" mid-sentence | "ethereum's priorities" | Possessive common noun |
| "Ethereum takes a broader approach." (sentence start) | "Ethereum takes a broader approach." | Stays - first word of sentence |
| "Ether (ETH) is..." (sentence start) | "Ether (ETH) is..." | Stays - first word of sentence (regular capitalization) |
| "the ethereum whitepaper" | "the ethereum whitepaper" | Generic reference to document, not formal title |
| "Ethereum.org" / "ethereum.org" | "ethereum.org" | Domain name stays lowercase everywhere |

### Edge cases flagged for team discussion
1. **"Ethereum Whitepaper"** - Is this a formal document name (like "The Federalist Papers") or a generic reference? Demo uses lowercase "ethereum whitepaper" for generic usage.
2. **"Ethereum Developer Docs"** as link text - Demo lowercases to "ethereum developer docs" since it's descriptive, not an organization name.
3. **"Bitcoin" stays capitalized** throughout - Bitcoin hasn't undergone this transition. Is that intentional asymmetry? (I believe yes - this is ethereum.org's editorial choice, not a universal standard.)

### Execution method
- Work in a **git worktree** on branch `lowercase`
- Make all changes, then present a summary of what changed and what stayed capitalized (with reasoning)
- No commit unless explicitly requested

---

## Phase 2: Rules Document (after demo feedback)

Create a formal style guide addition documenting:
- The complete proper noun allowlist
- Sentence-start rules
- Edge case decisions from team feedback
- Before/after examples

This becomes the reference for Phase 3 automation.

---

## Phase 3: Automated Tooling (future conversation)

Build a categorization script that:
1. Scans all English content files for "Ethereum" / "Ether" occurrences
2. Classifies each as: `proper_noun` (skip), `sentence_start` (skip), `common_noun` (lowercase), `ambiguous` (flag)
3. Uses allowlist from Phase 2 for proper noun detection
4. Detects sentence boundaries using punctuation + position heuristics
5. Outputs a report and optionally applies changes

---

## Phase 4: Full English Rollout (future conversation)

Run script across:
- All `src/intl/en/*.json` files (~46 files, ~1,300 occurrences)
- All `public/content/**/*.md` English markdown (~36,600 occurrences)
- All `src/**/*.{ts,tsx}` with hardcoded strings (~377 occurrences)
- Manual review of flagged ambiguous cases

---

## Phase 5: Translations Rollout (future conversation)

After English source content is stable:
1. Push updated English source strings through the translations pipeline to Crowdin
2. For the 24 non-English `src/intl/[locale]/` JSON files: apply the same proper-noun-preserving logic, accounting for language-specific capitalization rules (e.g., German nouns are always capitalized; RTL languages like Arabic/Urdu have no case distinction)
3. For translated markdown in `public/content/translations/`: coordinate with Crowdin pipeline -- updated English source will trigger re-translation
4. Manual review of languages with complex capitalization (German, Turkish) to ensure proper nouns are handled correctly

---

## Phase 6: Documentation & Style Guide (future conversation)

- Update contributor style guide
- Update CLAUDE.md with lowercase-ethereum rules
- Document in a way that future content contributions follow the new standard
- Add translation-specific guidance for languages where capitalization rules differ

---

## Verification (Phase 1 Demo)

1. After changes, run `pnpm lint` to verify no lint errors introduced
2. Run `npx tsc --noEmit` to verify no TypeScript errors (important: chain names untouched)
3. Visual review: `pnpm dev` and navigate to homepage + what-is-ethereum page
4. Grep verification: confirm proper nouns were preserved
   - `grep "Ethereum Foundation"` still finds matches
   - `grep "Ethereum Mainnet"` still finds matches
   - `grep "Ethereum Improvement Proposals"` still finds matches
