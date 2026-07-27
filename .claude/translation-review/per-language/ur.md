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

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.8/10 (after repair)

**Repaired via scoped pipeline re-run, not by hand:** `roadmap/privacy/index.md` arrived truncated at 41% (57 of 136 lines, 2 of 6 sections), ending mid-sentence on a leaked `<HTML-PLACEHOLDER-LINK-d08112` — an MDX build-breaker — and carried `EIP-۸۱۴۱` (Eastern-Arabic numerals) in an identifier at L52. Re-dispatched `intl-pipeline.yml` with `target_path=public/content/roadmap/privacy/index.md`, `target_languages=ur`, `mode=full`; result is 135 lines, all 6 headings, no placeholder, no numeral corruption. Truncation is missing *content* — regenerate it, never hand-translate.

**Clean on re-review:** no glossary deviations, no negation flips across a very negation-dense FOCIL Q&A, formal آپ register consistent. The historical `trade-off` polysemy trap (تبادلہ/swap) is correctly rendered سمجھوتہ here — an improvement over prior reviews.

**Note:** Eastern-Arabic numerals in ordinary prose (`لیئر ۲`, `۱۰، ۱۲`) are correct Urdu convention. Only ASCII-digit corruption *inside* EIP-/ERC- identifiers is a defect.
