# Japanese (ja) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- CJK-phonetic (Katakana transliteration of brands is correct).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.4/10

**Fixed (critical):** `ブロック提案者` -> `ブロック・プロポーザー` (`roadmap/privacy` L58, compound glossary entry). The sibling `eip-7805-focil-explained` L120 already used the correct form.

**Not fixed (warning):** same L58 sentence renders `fork-choice` as フォーク選択 while both videos use フォークチョイス, and `attesting nodes` as 証明ノード vs アテスター elsewhere. Neither is an ETHGlossary term.

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 9.2/10
- **Message softened (left unfixed, needs native call):** "winding down" rendered `縮小` ("scaling down", implies continued operation at reduced size) on the program page and `contributing/index.md`, while the same PR correctly uses `段階的に終了` in `get-involved` and `終了に向かっており` in `page-collectibles`. Not an inversion -- the next clause says the Crowdin project is closing -- but it understates the announcement on the two most-read pages.
- Aspect handling was the best of the CJK group: `でした`, `目指していました`, `貢献してきました` all correctly past without intervention.
- `〜向けに` + `利用できます` on the guides lead leaves the subject dangling; `ご利用いただけます` is correct.
