# Critical vs Warning vs Informational

Severity rubric for translation review findings. The line determines whether an issue auto-fixes (critical), gets a manual-review flag (warning), or just gets noted (informational).

## The three tiers

| Tier | Auto-fix behavior | Examples |
|---|---|---|
| **Critical** | Auto-fixed by `/review-translations` Phase 5 (unless `--no-fix`) | MDX syntax errors, translated hrefs, ETHGlossary deviations on `keep_latin` / `always_latin` / `transliterate` terms, translated `Wei`/`Gwei`/`ETH` |
| **Warning** | Flagged in report; manual review required | Semantic shifts on `translate` terms, glossary deviations with `confidence: low`, untranslated paragraphs, tone/register lapses, cross-script contamination |
| **Informational** | Logged but not actioned | "Term not in ETHGlossary; using locale form as-is", style preferences, low-priority Crowdin-era artifacts |

## Critical criteria

An issue is critical if at least one of:

1. **Build-breaking** — `pnpm build` will fail for this locale. MDX syntax errors, missing closing tags, asymmetric backticks exposing JSX, raw `<` before tokens, image paths with `/.` corruption, JSX attribute with embedded unescaped `"`.
2. **Navigation-breaking** — internal hrefs translated (`/governance` → `/gobernanza`), anchor IDs translated, link parens stripped, backtick-wrapped markdown links.
3. **Semantically wrong** — proof-of-stake ↔ proof-of-work, "mainnet" → "market", "client" → "customer", validator ↔ miner. Wei/Gwei/ETH translated to anything.
4. **Deterministic ETHGlossary deviation** — locale form differs from the glossary entry where the entry's `script_rule` is `keep_latin`, `always_latin`, or `transliterate` (the `translation.term` field is the canonical form).
5. **Brand/programming-language/OS-platform in wrong script** — Solidity transliterated when policy is `always_latin`; Python in Devanagari; macOS in Hangul.

These are auto-fixable because the correct answer is deterministic. The auto-fix replaces the wrong form with the right one.

## Warning criteria

An issue is a warning if:

1. **Semantic shift on a `translate` / `calque` term** — meaning is judgment-based, multiple valid renderings exist, auto-fix could erase legitimate variation.
2. **ETHGlossary entry has `confidence: low`** — the glossary itself isn't sure, so the locale's form might be just as valid. Native-speaker review needed.
3. **Untranslated paragraphs** — substantial English text mid-document. Could be intentional (e.g., code blocks aren't translated, certain proper names) or accidental. Manual judgment.
4. **Tone / register inconsistency** — du/Sie mixed, tu/vous mixed, formal/casual swings. Auto-fix can't reliably pick the right register.
5. **Cross-script contamination** — Devanagari in Turkish, CJK in Arabic. May indicate Crowdin TM leak or Gemini context bleed; requires human eye to determine if it's noise or signal.
6. **Term not in ETHGlossary** — flag for upstream addition; don't auto-modify the locale's current form.
7. **Awkward phrasing that isn't wrong** — fluency concern, not correctness.

## Informational criteria

Worth noting in the report but not actioning:

1. **Style preferences** — phrasing choices that are valid but a native speaker might prefer differently.
2. **Low-priority Crowdin-era artifacts** — long-since-resolved patterns that occasionally surface.
3. **Suggestions for future glossary entries** — "this term comes up a lot and isn't in ETHGlossary yet; consider adding."
4. **Cross-language inconsistencies that are policy-correct** — e.g., Solidity is Latin in ja per `always_latin` but transliterated in pl-old-imports; the ja form is correct, the pl form is wrong. Note both, fix only the wrong one.

## Edge cases

### When `script_rule: keep_latin` meets a transliterated form in the locale

Example: ETHGlossary says `Hardhat` is `keep_latin` for all languages. Locale has `ハードハット` (Japanese transliteration). This is a **critical** issue — auto-fix to `Hardhat`.

Subtle: this also means the local transliteration banks (`.claude/translation-review/transliterations/*.json`, deprecated post-v0.3.0) sometimes have transliterated forms that DISAGREE with ETHGlossary. ETHGlossary wins. The local file's form is wrong by policy.

### When the locale uses a valid alias

ETHGlossary `aliases` includes alternative accepted forms. If the locale uses an alias rather than the primary `term`, that's NOT a deviation. Don't auto-fix.

### When `confidence: low` is the only signal

A `confidence: low` entry is the glossary saying "this is a best guess; native-speaker should verify." Don't auto-fix to it. Flag the locale's current form alongside ETHGlossary's low-confidence form; let native-speaker review decide.

### When a single character is wrong

Example: ja `イサ` where canonical is `イーサ` (missing chōonpu). Critical if it's a `transliterate` term in ETHGlossary; the auto-fix replaces. If the term isn't in ETHGlossary, it's a warning (no authority to fix against).

### Frontmatter `tags` mistakes

- Brand-name tag translated (`"solidity"` → `"솔리디티"`): critical (sanitizer should catch; if it didn't, that's a sanitizer gap).
- Concept tag reverted to English (`"smart kontrakt účty"` → `"smart contracts"`): critical (reviewer's mistake or Crowdin artifact; revert to the translated form).

## Severity is not the same as score

A locale can have one critical issue and still score 9/10 overall — the critical-issue list and the quality score are separate signals. Don't conflate them in reports.

## See also

- `references/scoring-rubric.md` for the 0-10 quality score (separate from severity)
- `references/known-patterns.md` for specific patterns with their severity assignments
- `references/ethglossary-usage.md` for the deviation severity matrix by `script_rule` and `term_role`
