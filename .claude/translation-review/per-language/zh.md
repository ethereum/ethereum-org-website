# Simplified Chinese (zh) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- CJK-semantic: brands translated by meaning (Ethereum=以太坊). "smart contract" correctly 智能合约 (crypto sense), NOT 智慧合约 (smartphone sense) -- verified clean.
- Verified false positives (do NOT flag): MetaMask=梅塔马斯克 and rollups=汇总 both match ETHGlossary.
- No semantic inversions, no translated hrefs, no cross-script contamination. ICU/tags intact.
- Pipeline artifact fixed; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.
