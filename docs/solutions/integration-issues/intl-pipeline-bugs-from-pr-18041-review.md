---
title: "Intl-Pipeline Bugs and Followups from PR #18041 Review"
date: 2026-04-27
category: integration-issues
tags:
  - intl-pipeline
  - translations
  - i18n
  - jsx-attributes
  - mdx
  - sanitizer
  - cross-script
  - gemini
  - glossary
severity: high
component: intl-pipeline
problem_type: pipeline-quality-followup
---

## Summary

A multi-agent review of PR #18041 (`intl/pending-dev`, HEAD `4e735b32`) covering 24 languages x 5 files (2 markdown + 3 JSON) surfaced a small number of pipeline-level failure modes that produced critical, build-impacting output, plus a wider set of pattern-level concerns worth tightening in `src/scripts/intl-pipeline/`. This brief documents those findings so a follow-up engineer or agent can address them at the pipeline layer rather than relying solely on per-PR auto-fixes.

The hand-fixes for this PR have already been applied in the same commit window; this document is forward-looking. The recent commit `1fda55d6c2 fix(intl-pipeline): escape inner quotes in JSX attribute translations` is the right direction but is incomplete -- a separate corruption pattern affecting French, Russian, and Ukrainian was not caught and is documented in detail below.

## Pipeline-level bugs (must be fixed upstream)

### Bug 1: JSX attribute closing-guillemet replaced by `>` and attribute split across two lines

The most severe finding. Three languages whose body prose uses guillemets (`«...»` for fr/ru/uk) produced an `<ExpandableCard title="...">` whose closing `»` had been replaced by a literal ASCII `>` (U+003E) and whose closing `"` got pushed to the next line. The result is a JSX attribute that looks like a self-closing tag mid-attribute, and MDX parsing fails on the page entirely.

Examples (all at line 168 of `quantum-resistance/index.md`):

- `fr`: `title="Qu'est-ce que « récolter maintenant, déchiffrer plus tard >` (newline) ` ?"`
- `ru`: `title="Что такое «собирай сейчас, расшифровывай потом>` (newline) `?"`
- `uk`: `title="Що таке «збирай зараз, розшифровуй потім>` (newline) `?"`

Why this matters: this is not the same as the inner-quote case. Even after the `1fda55d6c2` patch, this corruption goes through. The pipeline emits a JSX file that will fail `pnpm build` for those locales.

Suspected cause: a step somewhere in the pipeline (possibly during sanitizer normalization, manifest stamping, or a regex that treats `>` as a tag-closer) is mangling Unicode `»` (U+00BB) to ASCII `>` (U+003E) inside JSX attribute strings, then a downstream re-formatter wraps the broken attribute. Worth tracing through `src/scripts/intl-pipeline/sanitizer*` and any post-translation rewriters.

Recommendations for the pipeline:

1. After translation and before commit, validate every JSX attribute value parses cleanly. A focused check: for each `<Component attr="...">` pattern, the attribute string must be single-line and the matching closing `"` must be on the same line as the opening `"`. Reject or log any that aren't.
2. Add a Unicode preservation check on attribute strings: `«` and `»` should appear in matched pairs in fr/ru/uk; any unpaired `»` in attribute text is a corruption signal. (English source uses ASCII so this only triggers on translated output.)
3. Consider a `pnpm build` (or scoped MDX-only build) gate per locale before committing translated files. The cost is low for 5-file batches.

### Bug 2: Inner double quotes in JSX attributes (already partially patched)

Four languages produced a JSX `title=` whose Gemini translation embedded a quoted phrase using ASCII `"` characters inside the outer `"..."` attribute, breaking the parse:

- `ar:168` -- `title="ما هو "احصد الآن، وفك التشفير لاحقًا"؟"`
- `cs:168` -- `title="Co je "posbírej teď, dešifruj později"?"`
- `pl:168` -- `title="Czym jest "zbieraj teraz, odszyfruj później"?"`
- `pt-br:168` -- `title="O que é "coletar agora, descriptografar depois"?"`

The English source on line 168 deliberately uses single quotes inside the attribute (`title="What is 'harvest now, decrypt later'?"`) to avoid this. Gemini output for these four locales swapped to double quotes for the inner phrase.

This is precisely what `1fda55d6c2` was meant to address. **Verify the patch covers this exact case** -- run the four files above through the current pipeline and confirm the inner `"` get escaped (`&quot;`) or downgraded to `'`. If the patch only handles the prompt-engineering side ("tell Gemini to use single quotes inside attribute strings"), also keep a deterministic post-processing pass that detects unescaped inner `"` in JSX attribute regex matches and rewrites them.

### Bug 3: Non-Western numerals in Markdown headings break sequence semantics and IDs

Bengali shipped 11 numbered headings using Bengali digits (`০১২৩৪৫৬৭৮৯`) where the English source used Western Arabic `0-9`:

In `public/content/translations/bn/roadmap/future-proofing/quantum-resistance/index.md`:

- L39 `### ১. কনসেনসাস ...` -- expected `### 1.`
- L55 `### ২. ডেটা প্রাপ্যতা ...` -- expected `### 2.`
- L69 `### ৩. অ্যাকাউন্ট ...` -- expected `### 3.`
- L81 `### ৪. অ্যাপ্লিকেশন-লেয়ার ...` -- expected `### 4.`

In `public/content/translations/bn/contributing/adding-videos/index.md`:

- L39 `### বিকল্প ১: ...` -- expected `1:`
- L47 `### বিকল্প ২: ...` -- expected `2:`
- L51 `#### ধাপ ১: ...` -- expected `1:`
- L61 `#### ধাপ ২: ...` -- expected `2:`
- L99 `#### ধাপ ৩: ...` -- expected `3:`
- L124 `#### ধাপ ৪: ...` -- expected `4:`
- L140 `#### ধাপ ৫: ...` -- expected `5:`

Why this matters: the English source treats the digits as part of an ordered sequence, and downstream processing (heading IDs, table-of-contents ordering, anchor links) depends on a stable Western-numeral form. Other H1-H4 IDs in the project follow the `{#lower-kebab-id}` convention which is ASCII-only, so heading IDs across translations are already English. The user-visible heading text should match this expectation.

Recommendation: add a sanitizer pass that, for each H1-H4 in translated markdown, replaces non-Western digits with `0-9` when the English source heading at the same structural position used `0-9`. The mapping is mechanical and language-agnostic (`০-৯` -> `0-9`, `೦-೯`, `௦-௯`, `౦-౯`, `॰-९`, `٠-٩`, `۰-۹`, `〇/一/二/...` for CJK numerals, etc.).

Body-prose digit handling is a separate, more nuanced policy question -- see "Open policy questions" below.

### Bug 4: Cross-script contamination in JSON

`src/intl/mr/page-app-descriptions.json:52` (`app-fileverse-dsheets-description`) contains the Bengali word `অনলাইনে` mid-sentence inside otherwise Devanagari Marathi text. Almost certainly translation-memory leak from a sibling locale (bn) at translation time.

Recommendation: post-translation, run a script-coverage check per locale. For any locale whose primary script is Devanagari (mr, hi), flag any Bengali (`U+0980-U+09FF`), Telugu (`U+0C00-U+0C7F`), Tamil (`U+0B80-U+0BFF`), etc. characters appearing in the output. Same check for other Indic and CJK locale groups. Single misplaced characters won't trigger the existing "wrong-language" detector but will show up in a script-histogram check.

### Bug 5: Glossary annotation leaks (parenthetical abbreviations injected where source had none)

Telugu shipped at least three cases where the English source had no abbreviation in parentheses but the translated output added one:

- `src/intl/te/page-learn.json:80` -- "decentralized identity" -> `వికేంద్రీకృత గుర్తింపు (did)` (English has no `(DID)`)
- `src/intl/te/page-app-descriptions.json:18` -- "wallets and dApps" -> `... (dapp)లచే` (English has no `(dApp)`)
- `src/intl/te/page-app-descriptions.json:37` -- "automated market maker" -> `స్వయంచాలక మార్కెట్ మేకర్ (amm)` (English has no `(AMM)`)

These are lowercase, suggesting the glossary lookup matched the English term, found a mapping with an abbreviation alias, and the translation step appended the alias. The abbreviations also appear lowercase, which is wrong by English convention.

Recommendation: glossary-aware translation should never inject parentheticals that aren't present in the source. If the glossary entry includes both a long form and an abbreviation, the long form alone is the substitution; the abbreviation belongs in body text only when the source already wrote it. Audit the glossary integration in `src/scripts/intl-pipeline/` for this pattern.

### Bug 6: Layer 2 / "(l2)" gloss injected in body text where source had no parenthetical

Across many languages (mr, ur, te, vi, bn, ko, fr, etc.) the pipeline produced strings like `<locale-word-for-layer-2> (l2)` in body text where the English source had `Layer 2s`, `L2 chain`, or `L2 rollup` with no parenthetical at all. This is glossary-driven (ETHGlossary maps `layer 2 (L2)` to `<localized> (l2)` per locale) but the parenthetical is being inserted into prose where the source didn't have one.

Specific examples:
- `src/intl/bn/page-app-descriptions.json` lines 6, 60, 83, 143, 151
- `src/intl/mr/page-app-descriptions.json` lines 6, 59, 60, 83, 143, 151
- `src/intl/ur/page-learn.json` lines 61, 65 + `page-app-descriptions.json` lines 83, 143, 151

The lowercase `(l2)` is also suspect -- ETHGlossary's documented intent is lowercase per its style note, but the project-wide convention treats `L2` as a brand-style acronym (uppercase).

Recommendation: same as Bug 5 -- the glossary substitution must respect the source's parenthetical state. Either the glossary's "(l2)" alias should only apply when the source string contains "(L2)", or the integration should track whether the source had the alias and skip injection otherwise.

### Bug 7: Tamil translation regressions on common technical terms

Tamil produced multiple critical-severity term inversions that suggest the model used English homographs rather than glossary entries:

- "smart contracts" -> "திறன் ஒப்பந்தங்கள்" ("skill contracts") in 7 entries of `src/intl/ta/page-app-descriptions.json` (lines 40, 108, 121, 127, 143, 145, 150). Same file uses the correct "ஸ்மார்ட் ஒப்பந்தங்கள்" elsewhere; markdown files use the correct form throughout. The inconsistency is within the same JSON file.
- "non-fungible" mistranslated as "fungus-less" (`பூஞ்சையற்ற` -- literally "without fungus") in lines 31 of `page-use-cases.json`, 109, 133 of `page-app-descriptions.json`. Also "non-transferable" (`பரிமாற்றத்தகாத`) in 80, 81, 89 of `page-app-descriptions.json`. Also "immutable" (`மாற்ற முடியாத டோக்கன்கள்`) in `page-learn.json:73`. Four distinct misrenderings of the same English term across one PR.

These patterns suggest insufficient glossary enforcement during JSON-string translation in particular. Markdown got the right terms; JSON did not. Consider: either the glossary lookup is being skipped for short JSON strings, or the JSON-translation prompt has different system instructions than the markdown one. Audit prompt parity.

## Open policy questions (need a human call before pipeline change)

These came up during review and need Doc / pipeline-owner judgment before any automated enforcement.

1. **Body-prose digit normalization.** Bengali shipped years ("২০২৬") and counts ("১০টিরও") in body prose using Bengali digits. The known-patterns.md doc says "Use Western Arabic numerals (1, 2, 3) in all non-Latin scripts" -- but the per-locale glossaries (e.g., Marathi) explicitly map "layer 2 (L2)" -> "स्तर २ (l2)" with Devanagari digit. Heading-digit normalization (Bug 3) is unambiguous; body-text normalization is not.
2. **`(l2)` casing.** ETHGlossary's lowercase `(l2)` style note vs project convention treating L2 as a proper acronym.
3. **Brand-name transliteration for Cyrillic/Indic.** Several locales transliterated Uniswap (`Юнисвоп`, `यूनिस्वॅप`, `유니스왑`) per their glossary while keeping every other brand in Latin. Glossary policy and brand-name policy disagree.
4. **Book/podcast titles.** "Proof of Stake" (Buterin/Schneider book) and "Zero Knowledge" (podcast) were translated in multiple locales when convention is to keep them in source language.

## Patterns worth adding to known-patterns.md

These showed up enough to be worth canon, even if they don't trigger pipeline changes:

- Title vs body inconsistency inside a single ExpandableCard (sw, cs, ru, es, uk all rendered "harvest now, decrypt later" two different ways inside the same FAQ entry).
- Register mixing within a single JSON file (de `page-app-descriptions.json` mixes du/Sie across ~8 entries; es `contributing/adding-videos/index.md` uses usted while every other es file uses tú).
- Single-character typos that survive translation (`मारर्च` for `मार्च` in mr `quantum-resistance/index.md:29`).
- Letter-script contamination at the codepoint level (Urdu using Arabic ك (U+0643) instead of Urdu ک (U+06A9) -- visually similar, semantically different script).

## Severity ranking for pipeline owner

1. **Bug 1 (guillemet -> `>` corruption)** -- urgent. Breaks build for affected pages.
2. **Bug 2 (inner double quotes)** -- urgent if `1fda55d6c2` doesn't fully cover. Breaks build for affected pages.
3. **Bug 3 (non-Western digits in headings)** -- high. Doesn't break build but breaks heading semantics and IDs.
4. **Bug 4 (cross-script contamination)** -- medium. Single-character contamination renders but is wrong.
5. **Bug 5/6 (glossary parenthetical injection)** -- medium. Cosmetic but pervasive.
6. **Bug 7 (Tamil term inversions)** -- high for ta specifically; suggests systemic prompt parity issue worth investigating across other Indic locales.

## Pointers

- Pipeline entry: `src/scripts/intl-pipeline/main.ts`
- Sanitizer code: `src/scripts/intl-pipeline/sanitizer*` (current sanitizer-related files)
- Pipeline spec: `tests/specs/PIPELINE-SPEC.md`
- Glossary config: `src/scripts/intl-pipeline/config.ts` (`GLOSSARY_API_URL` default)
- Recent JSX-quote escape patch: commit `1fda55d6c2`
- Source PR for these findings: #18041 (`intl/pending-dev`, HEAD `4e735b32`)
- Per-language review reports: live in chat / PR review on #18041, not committed (raw outputs from 22 of 24 review agents; zh and zh-tw were rate-limited and need re-running)
- Known-patterns reference: `.claude/translation-review/known-patterns.md`
