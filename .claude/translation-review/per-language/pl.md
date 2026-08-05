# Polish (pl) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.8/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- Latin-script (brands stay Latin).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.5/10

**Fixed (critical):** `receipts` rendered in the retail sense `paragonów` (shop receipts) instead of the Ethereum sense (`ethereum-privacy-stack-andy-guzman` L105) -> `pokwitowań`. The same PR used `pokwitowań` correctly for "receipt-freeness" in `roadmap/privacy` L102.

**Not fixed (warning):** `walidatory` vs `walidatorzy` (non-personal vs personal plural) both used for validators.

## Glossary Anchors (pl)
- receipt = pokwitowanie (NEVER `paragon` — that is a shop receipt)
