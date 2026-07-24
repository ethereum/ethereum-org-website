# Urdu (ur) -- Translation Review Findings

## PR #18868 (full pipeline import, 2026-07-22) -- 8.4/10 (lowest in fleet)
- CRIT (NOT hand-fixed, needs pipeline re-pass): `gaming/index.md` -- two whole sections (`## Gaming on Ethereum`, `## Ethereum's gaming ecosystem overview`) verbatim English between translated sections. `developers/tutorials/yellow-paper-evm/index.md` -- ~half the explanatory prose (sec 9, 9.3, 9.4, 9.4.2, 9.4.3, Opcode cost, Expanding memory cost) left English. Block-matching coverage gap, not laziness.
- WARN: "trade-off" -> تبادلہ (glossary's *swap* term) on single-slot-finality; zkEVM correctly used سمجھوتہ. Prefer سمجھوتہ / loanword ٹریڈ آف.
- WARN: pattern 29 ExpandableCard `title="Why can't we have SSF today?"` untranslated (fleet-wide, English-source `title= "` extraction gap -- not ur-specific).
- WARN: secret-leader-election title uses لیڈر (loanword) vs glossary خفیہ انتخابِ قائد (قائد). Low severity.
- WARN (recurring, fleet-decision): written-out English dates (`1st March 2023`, `May 7, 2025`) and Western digits in prose vs the ur native-numeral convention. Consistent across the roadmap set; same note as PR #18772.
- Clean: no semantic inversions, near-perfect glossary compliance (MEV expanded correctly), names transliterated to Nastaliq, domains Latin, register consistent.

## PR #18772 (community-stories.json, 2026-07-10) -- 9.1/10
- CRIT fixed: bidi-isolated untranslated "March 2020" in story-dorgo-eth -> مارچ 2020 (Western digits kept, matching the file's other years). Same artifact as ar -- grep English month names on every RTL import.
- WARN (unfixed): numeral-style inconsistency -- Western 2021/400 vs native ۵/۸ in prose; ur convention doc prefers native numerals for prose but the file is mixed; left as-is pending a fleet decision.
- LRI/PDI bidi isolation marks all correctly paired across 26 keys.
