# Per-Language Findings Tracking

The per-language findings file at `.claude/translation-review/per-language/{lang}.md` is a living document that accumulates review findings, fixes, and patterns specific to that language. This reference explains the convention.

## Why this file exists

Translation review work is iterative. Each PR review surfaces issues; some are pattern-worthy (recurring), some are one-off. The per-language file:

- Captures recurring patterns for the next review of that language (less re-discovery)
- Records glossary deviations the team noticed but hasn't filed against ETHGlossary yet
- Notes native-speaker review queue items
- Tracks quality scores over time (trend signal)
- Documents language-specific edge cases (e.g., Tamil's purist movement, ja chōonpu enforcement)

It is **not** the same as `.claude/translation-review/known-patterns.md`, which is the cross-language living catalog. Per-language is for things specific to one language.

## File path

```text
.claude/translation-review/per-language/{lang}.md
```

Where `{lang}` is the two-letter (or BCP-47 hyphenated) language code: `ar`, `bn`, `hi`, `ja`, `ko`, `mr`, `ru`, `ta`, `te`, `uk`, `ur`, `zh`, `zh-tw`, etc.

Only non-Latin-script languages need a file (Latin-script languages don't have transliteration nuances to track). Currently only `ar.md` exists; others should be created on first review.

## Recommended structure

The file is loose-form Markdown, but a useful template:

```markdown
# {Language} Translation Review Findings

> Last updated: YYYY-MM-DD
> Reviewer: {reviewer name or "automated"}

## Quality scores over time

| Date | PR | Files | Overall | Brand | Technical | Semantic | Consistency | Tone |
|------|----|-------|---------|-------|-----------|----------|-------------|------|
| 2026-MM-DD | #18XXX | 52 | 8.5/10 | 9/10 | 9/10 | 8/10 | 8/10 | 8/10 |

## Recurring patterns (this language)

### {Pattern name}

- Description of what the pattern looks like
- Example: ```{example bad pattern}``` -> ```{example correct pattern}```
- Status: handled by sanitizer / needs review / candidate for sanitizer fix
- First seen: YYYY-MM-DD

## Glossary follow-ups

Terms surfaced during review that need work in ETHGlossary:

- **{Term}** — issue (missing from glossary / wrong translation / low confidence / etc.). Filed against ETHGlossary: link or "pending"
- ...

## Native-speaker review queue

Items where the AI reviewer was uncertain and a native speaker should weigh in:

- {File}, {section}: {issue}. Reason for flagging: ...
- ...

## Language-specific edge cases

Things specific to this language that influence review (e.g., chōonpu enforcement for ja, Grantha consonants for ta, declension policy for ru).

## Recent fixes applied

| Date | PR | Issue | Function/Action |
|------|----|-------|----|
| 2026-MM-DD | #18XXX | Solidity transliterated to wrong form | Auto-fix via ETHGlossary lookup |
```

## When to write to this file

Phase 8 of `/review-translations` writes/updates per-language findings. After a review:

1. Append a row to the quality-scores-over-time table
2. Add any new recurring patterns
3. Update glossary follow-ups (mark filed entries as "filed", add new ones)
4. Flush completed native-speaker review items
5. Add any new edge cases discovered

## When NOT to use this file

- **Don't put cross-language patterns here.** Those go in `.claude/translation-review/known-patterns.md` and `intl-review/references/known-patterns.md`.
- **Don't put ETHGlossary policy here.** Policy lives in ETHGlossary's `docs/translation-policy.md`.
- **Don't put one-off review findings here.** Only pattern-worthy or trend-worthy items.
- **Don't reference site internals.** This file is review-team-facing; don't bake in pipeline file paths or workflow details.

## Reading prior findings during a new review

When reviewing a language, the first step is reading its per-language file (if it exists). Look for:

- Recurring patterns to spot-check first
- Glossary follow-ups that may have been resolved upstream (check ETHGlossary)
- Native-speaker queue items (resolve if you can; otherwise carry forward)
- Quality-score trend (improving / regressing / flat)

## Bootstrapping a new language file

When reviewing a language for the first time:

1. Create `.claude/translation-review/per-language/{lang}.md` using the template above.
2. Fill in the first quality-score row from the current review.
3. Leave the pattern / glossary / native-speaker sections empty; populate as findings emerge.
4. Commit alongside the review's auto-fix commits.

## Why per-language and not per-locale-pair

We track findings by target language, not by source-target pair. The English source is fixed; what varies is how the language renders it. A pattern that affects `ja` is interesting regardless of which English source file it appeared in.

## See also

- `references/known-patterns.md` for the cross-language pattern catalog
- `references/critical-vs-warning.md` for severity classification
- `.claude/translation-review/known-patterns.md` for the living cross-language doc
- `.claude/commands/review-translations.md` for the Phase 8 procedure
