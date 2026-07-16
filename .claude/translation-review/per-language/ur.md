# Urdu (ur) -- Translation Review Findings

## PR #18772 (community-stories.json, 2026-07-10) -- 9.1/10
- CRIT fixed: bidi-isolated untranslated "March 2020" in story-dorgo-eth -> مارچ 2020 (Western digits kept, matching the file's other years). Same artifact as ar -- grep English month names on every RTL import.
- WARN (unfixed): numeral-style inconsistency -- Western 2021/400 vs native ۵/۸ in prose; ur convention doc prefers native numerals for prose but the file is mixed; left as-is pending a fleet decision.
- LRI/PDI bidi isolation marks all correctly paired across 26 keys.
