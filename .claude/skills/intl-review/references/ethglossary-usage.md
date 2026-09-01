# ETHGlossary Usage (Review Side)

Review-specific guidance for using ETHGlossary as the authority during translation review: severity mapping, what to flag, how to interpret entries. The shared plumbing — llms.txt (the canonical API contract at `${GLOSSARY_HOST}/llms.txt`), base-URL resolution from `config.ts`, and the endpoint list — lives in `intl-pipeline/references/ethglossary.md`; read that first for anything API-mechanical.

## The authority rule

**Any translated term that differs from its ETHGlossary entry for the target language is a CRITICAL issue.** Not a warning. The auto-fix step in `/review-translations` corrects these by replacing the wrong translation with the glossary-approved form. If you don't reference ETHGlossary during review, the review is invalid.

This is the determinism backbone. Reviewers don't argue terminology with the pipeline — both pipeline and reviewer defer to ETHGlossary. If a glossary entry looks wrong during review, flag it in the report; don't patch the locale to disagree with it.

## Authority hierarchy — and what to do for items the glossary doesn't cover

ETHGlossary is the source of truth for **term translations AND for transliteration/calque/keep-Latin guidance**. Apply it in this strict order; do not substitute your own instinct:

1. **Term IS in ETHGlossary** → its per-term `script_rule` is the *only* authority for transliterate / calque / keep-latin / always-latin. Query it (`/filter` per file, or `/translations/{lang}/{termId}`). A deviation is CRITICAL.
2. **Term is NOT in ETHGlossary** (author names, brand-new products, etc.) → apply the script-aware fallback in `known-patterns.md` §1: **transliterate** into non-Latin target scripts, **keep as-is** for Latin scripts.
3. **Never infer a "default" `script_rule` for an unlisted term.** An absent entry means "use the fallback," **not** "keep Latin." Flagging a correctly-transliterated non-Latin author name (e.g. `te` "మారియో హావెల్" for "Mario Havel") as "should be Latin" is a **false positive** — the kind of fabricated critical that wastes reviewer time. When in doubt, query the API; if the term isn't there, the fallback decides, not you.

## How to query

Review-time endpoint choice (curl invocations and the full endpoint table: `intl-pipeline/references/ethglossary.md`):

- `POST /filter` per file — **preferred**; returns only the terms appearing in the English source, keeping review context small.
- `GET /translations/{lang}` — fallback when `/filter` is unreachable or scoring requires every term (500+ terms; only when needed).
- `GET /translations/{lang}/{termId}` — single-term spot-checks; aliases, avoid forms, and variants resolve to the canonical entry.

## What each term entry tells the reviewer

Field shapes are documented in llms.txt; this is the review-time interpretation.

| Field | Review use |
|---|---|
| `english.term` | The canonical English form (case-sensitive). |
| `translation.term` | The expected localized form. If the locale differs, that's a deviation. |
| `translation.confidence` | `high` / `medium` / `low`. Low-confidence entries should be flagged for native-speaker review rather than auto-fixed without inspection. |
| `script_rule` | `translate` / `calque` / `transliterate` / `keep_latin` / `always_latin` / `transliterate_with_translation`. Tells you what the locale SHOULD do. |
| `term_role` | `concept` / `brand-or-project` / `person-name` / `programming-language` / `os-platform` / `cryptographic-primitive` / `network-name` / `file-extension` / `cli-command` / `ticker-or-standard` / `identifier`. Affects severity (e.g., translated programming language → critical; translated brand → critical if `keep_latin`, otherwise check `transliterate` target form). |
| `aliases` | Variant forms that all resolve to this entry. If the locale uses an alias, it's correct. |
| `contexts.prose / heading / tag / ui / code` | Per-surface forms. Most terms are the same across contexts; some vary (e.g., transliterated in prose, Latin in code). |
| `notes`, `translation_note` | Human-authored context. Read when judging edge cases. |

## Severity guidance

| Deviation type | Severity | Auto-fix? |
|---|---|---|
| Locale form differs from `script_rule: always_latin` entry | Critical | Yes — revert to Latin |
| Locale form differs from `script_rule: keep_latin` entry | Critical | Yes — revert to Latin |
| Locale form differs from `script_rule: transliterate` entry (different from `translation.term`) | Critical | Yes — replace with `translation.term` |
| Locale form differs from `script_rule: translate` / `calque` entry | High (semantic, not deterministic) | No — flag for review |
| Term not in ETHGlossary at all | Medium (missing data) | No — flag in review report |
| Term has `translation.confidence: low` in ETHGlossary | Medium (uncertain authority) | No — flag for native-speaker review |

## What to do when a term is missing

If a review surfaces a brand / person / project / tool that ETHGlossary doesn't have:

1. Confirm it's genuinely missing (single-term endpoint returns 404; `/filter` doesn't surface it on a source file that mentions it).
2. Flag it in the review report as "missing from ETHGlossary; using locale form as-is."
3. Note it in `.claude/translation-review/per-language/{lang}.md` so the next review of that language picks it up.

Don't patch the locale to compensate, and don't author terminology locally — see `intl-pipeline/references/ethglossary.md` for how gaps get addressed upstream.

## What NOT to do

- **Don't argue with ETHGlossary in the locale file.** If you think the glossary is wrong, flag it in the report; don't leave the locale's deviation in.
- **Don't auto-fix `script_rule: translate` deviations.** Semantic translation has variance; auto-fix would erase legitimate variation. Flag for human review instead.
- **Don't query ETHGlossary from memory.** Always use the API for the actual review evaluation. Memory is for understanding patterns, not for citing specific terms.
- **Don't read endpoint shapes from this doc.** Use llms.txt for the canonical API contract.

ETHGlossary's `docs/translation-policy.md` (in the wackerow/ethglossary repo) is the canonical policy behind all of the above.
