# Gemini Schema Review Feedback

## Strengths (per Gemini)
- Concept-oriented architecture with stable IDs (TBX-style)
- Script strategy (script_rule + script_override) addresses CJK/RTL tension
- Contextual awareness (prose/UI/tag forms) essential for modern web apps
- CLDR plurals correctly handle Arabic dual and Slavic complex plurals

## Weaknesses Identified

### 1. Slavic Case Declensions (Important)
MorphForms lacks grammatical case support (nominative, genitive, dative, etc.).
For Russian, Polish, Czech -- "staking" changes its ending based on sentence role.
Current MorphForms is too English-centric.

### 2. Missing Localized Aliases
`aliases` only exists at top level (English). Japanese/Chinese may have multiple
valid translations for one concept. Each TranslationEntry needs its own `aliases`.

### 3. Redundancy: Entry.term vs Entry.en.term
Both exist. Top-level `term` and `en.term` can desync.
Suggestion: remove top-level `term`, always use `en.term`.

### 4. No Cross-Ref Validation
`related` and `term_family` are plain strings with no schema-level guarantee
they point to existing entry IDs.

## Field-Level Critiques

- `Entry.category` enum is brittle -- every new category requires schema update
- `Entry.id` pattern requires 2+ chars (single-char terms would fail)
- MorphForms labels ("gerund", "agent") are Western-centric
- `TranslationEntry.updated` uses "date" but top-level uses "date-time" -- inconsistent

## Scalability

- Estimated 5-8MB for full glossary JSON -- fine for backend, too heavy for single client fetch
- Need per-language API filtering
- TBX export needs custom mapper (no auto-convert)
- CSV flattening results in 50+ columns -- hard for translators in spreadsheets

## Gemini's Top 5 Suggestions (ranked)

1. **Add `aliases` to TranslationEntry** -- allow per-language alternative terms
2. **Generalize morphology / add cases** -- Slavic case support (nominative, genitive, etc.)
3. **Clarify term vs display_name** -- remove top-level `term` redundancy
4. **Add `deprecated: boolean`** -- machine-filterable flag (vs just note text)
5. **Split JSON for consumers** -- master file + per-language JSONs for API/frontend
