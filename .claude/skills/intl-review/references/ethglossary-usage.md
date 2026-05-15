# ETHGlossary Usage (Review Side)

Review-specific guidance for using ETHGlossary as the authority during translation review. For the pipeline-side integration (how the pipeline produces translations using ETHGlossary), see `intl-pipeline/references/ethglossary.md`.

## The authority rule

**Any translated term that differs from its ETHGlossary entry for the target language is a CRITICAL issue.** Not a warning. The auto-fix step in `/review-translations` corrects these by replacing the wrong translation with the glossary-approved form. If you don't reference ETHGlossary during review, the review is invalid.

This is the determinism backbone. Reviewers don't argue terminology with the pipeline — both pipeline and reviewer defer to ETHGlossary. Disagreements get resolved upstream (PR against `wackerow/ethglossary`), not in the locale file.

## How to query

**Preferred — per-file `/filter`:**

```bash
curl -sf -X POST "$GLOSSARY_API_URL/filter" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg text "$ENGLISH_SOURCE" --arg lang "$LANG" '{text: $text, language: $lang}')"
```

Returns only the glossary terms that appear in the English source for the file being reviewed, with translations sorted by occurrence. Avoids pulling hundreds of irrelevant terms into review context.

**Fallback — full per-language glossary:**

```bash
curl -sf "$GLOSSARY_API_URL/translations/${LANG}"
```

Use when `/filter` is unreachable or when scoring requires every term. Adds 500+ terms to review context; only do it when needed.

**Single-term lookup:**

```bash
curl -sf "$GLOSSARY_API_URL/translations/${LANG}/${TERM_ID}"
```

Intelligent term matching: aliases, avoid forms, variants all resolve to the canonical entry. Use for spot-checks during review.

## Resolving the base URL

Configured in `src/scripts/intl-pipeline/config.ts` under `GLOSSARY_API_URL`; can be overridden via env var. To extract the live value:

```bash
GLOSSARY_API_URL="${GLOSSARY_API_URL:-$(grep -oE 'https://[^"]+/api/v[0-9]+' src/scripts/intl-pipeline/config.ts | head -1)}"
```

Fetch `llms.txt` first for the canonical API surface:

```bash
GLOSSARY_HOST="${GLOSSARY_API_URL%/api/*}"
curl -sf "$GLOSSARY_HOST/llms.txt" -o /tmp/ethglossary-llms.txt
```

## What each term entry tells the reviewer

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
| Term not in ETHGlossary at all | Medium (missing data) | No — flag, suggest adding to ETHGlossary |
| Term has `translation.confidence: low` in ETHGlossary | Medium (uncertain authority) | No — flag for native-speaker review |

## What to do when a term is missing

If a review surfaces a brand / person / project / tool that ETHGlossary doesn't have:

1. Confirm it's genuinely missing (single-term endpoint returns 404; `/filter` doesn't surface it on a source file that mentions it).
2. Flag it in the review report as "missing from ETHGlossary; using locale form as-is."
3. **After the review**, open a PR against `wackerow/ethglossary` to add the entry (or file an issue if the per-language form isn't clear).
4. Note the addition in `.claude/translation-review/per-language/{lang}.md` as a follow-up item.

Don't block the review on adding the term upstream. The review's job is to report; the PR against ETHGlossary is separate work.

## What NOT to do

- **Don't argue with ETHGlossary in the locale file.** If you think the glossary is wrong, file a PR; don't leave the locale's deviation in.
- **Don't auto-fix `script_rule: translate` deviations.** Semantic translation has variance; auto-fix would erase legitimate variation. Flag for human review instead.
- **Don't query ETHGlossary from memory.** Always use the API for the actual review evaluation. Memory is for understanding patterns, not for citing specific terms.

## See also

- `intl-pipeline/references/ethglossary.md` for the pipeline-side integration (how translations are produced)
- ETHGlossary `docs/translation-policy.md` for the canonical policy
- `references/critical-vs-warning.md` for the broader severity rubric this slots into
- `.claude/commands/review-translations.md` for the slash command's full ETHGlossary integration flow
