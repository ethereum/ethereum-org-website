# Translation Rules Reconciliation

Comparing `scripts/translation-rules.md` (this workstream) against the existing
`pre-translate-prompt.txt` (gemini-v3 workstream).

## Summary

- **No conflicts found** -- our rules extend, not contradict
- **10 overlapping topics** -- both docs cover them, compatible
- **15 new rules** from our work that could enhance the prompt
- **3 prompt-only topics** missing from our rules doc (should add)

## Overlapping Topics (Compatible)

These are covered in both documents with no contradictions:

| Topic | Our rules add | Action needed |
|-------|--------------|---------------|
| Token tickers | Nothing new | None |
| Standard identifiers | Nothing new | None |
| Code snippets | Nothing new | None |
| URLs/domains | Nothing new | None |
| File paths | Nothing new | None |
| Brand/product names | Transliteration OK in non-Latin scripts | Prompt could add this nuance |
| Usernames | Nothing new | None |
| Email addresses | Nothing new | None |
| Placeholders | Translate descriptive text inside brackets | Prompt could add this nuance |
| JSON escaping | Nothing new | None |

## New Rules (Could Enhance Prompt)

These exist only in our rules doc and should be considered for prompt integration:

| Rule | Priority | Notes |
|------|----------|-------|
| **EVM opcodes: always Latin** | High | Explicit rule missing from prompt |
| **Hex values: always Latin** | High | Implicit but not stated |
| **Publication titles: keep English or use official translation** | Medium | New guidance with nuance |
| **Client names: transliterate OK, never translate meaning** | High | "Lighthouse" must not become "Phare" |
| **Transliteration guidance for non-Latin** | High | Per-language transliteration rules |
| **First mention rule** | High | Expand acronym on first use, then use acronym |
| **UI reference rule** | Medium | Only translate UI labels if app is localized |
| **Onchain/offchain no-hyphen** | Low | ethereum.org style preference |
| **RTL handling notes** | Medium | Bidi, numerals, punctuation |
| **CLDR plural categories** | Medium | For Slavic/Arabic plural forms |
| **CJK conventions** | Medium | Katakana for loanwords, semantic for concepts |
| **Cryptographic primitive names: always Latin** | High | SHA-256, Keccak-256, etc. |
| **Network names: always Latin** | High | Sepolia, Holesky, etc. |
| **Math notation: keep as-is** | Low | Formulas stay untranslated |
| **License identifiers: always Latin** | Low | MIT, Apache-2.0, etc. |

## Prompt-Only Topics (Missing from Our Rules)

These are in `pre-translate-prompt.txt` but not in our `translation-rules.md`:

| Topic | Should we add? |
|-------|---------------|
| **Gender-neutral language** | Yes -- add to language-specific notes |
| **Formal address** | Yes -- add to language-specific notes |
| **Custom header IDs preserved** | No -- this is a build/syntax rule, not a translation rule |

## Recommendation

1. Our `translation-rules.md` should add gender-neutral and formal address guidance
2. The gemini-v3 agent could incorporate our 15 new rules into `pre-translate-prompt.txt`
3. No need to merge the documents -- they serve different purposes:
   - `translation-rules.md` = human-readable reference for translators and reviewers
   - `pre-translate-prompt.txt` = machine prompt for Gemini translation pipeline
   Both should cover the same ground but in different formats.
