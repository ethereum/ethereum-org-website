# Korean (ko) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- CJK-phonetic (Hangul transliteration of brands is correct).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #45 "free-est" -> `가장 자유로우며` (liberty sense).
- `page-values-internet-list-censorship` "Access no one can block" -> `접근성`, which means *accessibility* (a11y) in Korean tech writing; the pre-PR `접근 권한` was tighter.

**Notes:**

- The collateral `갖습니다` -> `가집니다` reword on the 42-character-address sentence is **neutral** — both are standard 합니다체 forms of 가지다.
- `page-values-cost-inevitable` fixed a real prior error: old `이 모든 것이 불가피한 것은 아닙니다` was a partial negation ("not *all* of this is inevitable"); new `이 중 어느 것도` correctly renders "none of this".
