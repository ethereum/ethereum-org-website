# Ukrainian (uk) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- Cyrillic (brand transliteration or Latin both fine).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.4/10

**Fixed (critical):** `пропонентів блоків` -> `пропонувачів блоків` (`roadmap/privacy` L58). `пропонент` appears nowhere else in the uk tree; 26 files use `пропонувач`, 21 use `пропонувальник`.

**Not fixed (warning):** 4 Latin speaker labels (known-patterns #31); stray U+2066/U+2069 bidi isolates around "Ethereum" in `ethereum-privacy-stack-andy-guzman` L17 with no counterpart in English — invisible when rendered, but a pipeline artifact worth stripping upstream.
