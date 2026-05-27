# Scoring Rubric

The translation-quality score reported by `/review-translations` uses five categories on a 0-10 scale. This reference defines each category and the scoring guide.

## The five categories

| Category | What it measures |
|---|---|
| **Brand Name Preservation** | Whether brand names follow the per-term `script_rule` from ETHGlossary (Latin where required, transliterated where established) |
| **Technical Accuracy** | Units (ETH, Gwei, Wei) handled correctly, ticker symbols not transposed, code identifiers in English, file extensions preserved |
| **Semantic Fidelity** | Translation conveys the same meaning as English; no semantic inversions (proof-of-stake ↔ proof-of-work, mainnet → "market") |
| **Terminology Consistency** | Same English term renders the same way across the document; ETHGlossary entries respected; no drift between paragraphs |
| **Tone/Register** | Formal vs informal address is consistent (de: du/Sie; fr: tu/vous; ja: casual/polite; es: tu/usted) |

Overall = average of the five (one decimal place).

## Scoring guide

| Score | Meaning |
|---|---|
| **10/10** | Perfect, no issues |
| **9/10** | Excellent, minor issues only |
| **8/10** | Good, a few notable issues |
| **7/10** | Acceptable, several issues need attention |
| **6/10 or below** | Needs significant review |

## Per-category guidance

### Brand Name Preservation

- **10**: All brand names match ETHGlossary entries for the language; no Latin where transliteration is canonical, no transliteration where Latin is canonical
- **8-9**: 1-2 brand-name deviations from ETHGlossary
- **6-7**: Multiple brand-name deviations; some critical (e.g., Solidity transliterated when policy says Latin)
- **below 6**: Systematic brand-name issues — Crowdin TM leak, ignored glossary

### Technical Accuracy

- **10**: All units, tickers, code identifiers, file extensions preserved correctly
- **8-9**: 1-2 ticker typos (EHT, BSL) or unit issues
- **6-7**: Translated units or systematic ticker problems
- **below 6**: Code identifiers translated, breaking compile/searchability

### Semantic Fidelity

- **10**: All translations convey the same meaning as English; no semantic inversions
- **8-9**: Minor phrasing differences; meaning preserved
- **6-7**: One or two notable semantic shifts that change reader understanding
- **below 6**: Semantic inversions on consensus / mainnet / validator / miner terms; reader gets a fundamentally different idea than the English

### Terminology Consistency

- **10**: Same English term renders consistently across the document; ETHGlossary entries followed
- **8-9**: 1-2 spots where the same term is rendered differently
- **6-7**: Inconsistent vocabulary across paragraphs; ETHGlossary deviations on multiple terms
- **below 6**: No discernible terminology strategy; appears patched together

### Tone/Register

- **10**: Formal/informal register is consistent throughout
- **8-9**: 1-2 lapses in formality
- **6-7**: Tone shifts mid-document (formal opening, casual middle, formal closing)
- **below 6**: Pervasive inconsistency

## Scoring report format

`/review-translations` produces a report block per language. The skill output should follow this shape:

```markdown
### {LANGUAGE_CODE} - {OVERALL_SCORE}/10

| Category | Score | Notes |
|----------|-------|-------|
| Brand Name Preservation | X/10 | ... |
| Technical Accuracy | X/10 | ... |
| Semantic Fidelity | X/10 | ... |
| Terminology Consistency | X/10 | ... |
| Tone/Register | X/10 | ... |

**Overall: X.X/10** (average of above scores)

{1-2 sentence summary of overall quality for this language}
```

## What scoring is NOT

- **Scoring is not the same as flagging critical issues.** A language can score 9.0/10 overall while still having a single critical issue that needs fix. The score is overall quality; critical issues are flagged separately.
- **Scoring is not a measure of import-time noise.** Import artifacts (duplications, stray characters, encoding issues) are pre-review concerns. The score evaluates translation quality, not import cleanliness.
- **Scoring is not used for merge decisions.** A 6/10 doesn't block merge; the PR's critical-issue list does. Scoring is a quality signal for stakeholders.

## When to refuse to score

If a language has < 5 files in the PR or you don't have a confident handle on the language (e.g., a script you genuinely can't read), report `unable to score` rather than guessing. Don't manufacture confidence.

## See also

- `references/critical-vs-warning.md` for severity rubric (separate from scoring)
- `references/agent-roles.md` for multi-agent review (structural / terminology / semantic roles align with category subsets)
- `.claude/commands/review-translations.md` for the slash command that produces these reports
