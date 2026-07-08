# ETHGlossary Usage (Review Side)

Review-specific guidance for using ETHGlossary as the authority during translation review. For the pipeline-side integration (how the pipeline produces translations using ETHGlossary), see `intl-pipeline/references/ethglossary.md`.

## Start with llms.txt

ETHGlossary publishes a canonical agent reference at the **domain root** `${GLOSSARY_HOST}/llms.txt` (not under `/api/v1/`). Fetch this first when you need API details — endpoint shapes, parameters, and response schemas come from llms.txt, which stays in sync with the live API:

```bash
GLOSSARY_HOST="${GLOSSARY_API_URL%/api/*}"
curl -sf "$GLOSSARY_HOST/llms.txt"
```

This doc focuses on the review-specific patterns (severity mapping, what to flag); endpoint contract details live in llms.txt.

## The authority rule

**Any translated term that differs from its ETHGlossary entry for the target language is a CRITICAL issue.** Not a warning. The auto-fix step in `/review-translations` corrects these by replacing the wrong translation with the glossary-approved form. If you don't reference ETHGlossary during review, the review is invalid.

This is the determinism backbone. Reviewers don't argue terminology with the pipeline — both pipeline and reviewer defer to ETHGlossary. If a glossary entry looks wrong during review, flag it in the report; don't patch the locale to disagree with it.

## Authority hierarchy — and what to do for items the glossary doesn't cover

ETHGlossary is the source of truth for **term translations AND for transliteration/calque/keep-Latin guidance**. Apply it in this strict order; do not substitute your own instinct:

1. **Term IS in ETHGlossary** → its per-term `script_rule` is the *only* authority for transliterate / calque / keep-latin / always-latin. Query it (`/filter` per file, or `/translations/{lang}/{termId}`). A deviation is CRITICAL.
2. **Term is NOT in ETHGlossary** (author names, brand-new products, etc.) → apply the script-aware fallback in `known-patterns.md` §1: **transliterate** into non-Latin target scripts, **keep as-is** for Latin scripts.
3. **Never infer a "default" `script_rule` for an unlisted term.** An absent entry means "use the fallback," **not** "keep Latin." Flagging a correctly-transliterated non-Latin author name (e.g. `te` "మారియో హావెల్" for "Mario Havel") as "should be Latin" is a **false positive** — the kind of fabricated critical that wastes reviewer time. When in doubt, query the API; if the term isn't there, the fallback decides, not you.

## How to query

**Preferred — per-file `/filter`:**

```bash
curl -sf -X POST "$GLOSSARY_API_URL/filter" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg content "$ENGLISH_SOURCE" --arg lang "$LANG" '{content: $content, language: $lang}')"
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
GLOSSARY_HOST="${GLOSSARY_API_URL%/api/*}"
```

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

Don't patch the locale to compensate. Don't author terminology locally. Upstream coordination (whether someone files an issue or PR against ETHGlossary) is a separate maintainer task, not part of the review.

## What NOT to do

- **Don't argue with ETHGlossary in the locale file.** If you think the glossary is wrong, flag it in the report; don't leave the locale's deviation in.
- **Don't auto-fix `script_rule: translate` deviations.** Semantic translation has variance; auto-fix would erase legitimate variation. Flag for human review instead.
- **Don't query ETHGlossary from memory.** Always use the API for the actual review evaluation. Memory is for understanding patterns, not for citing specific terms.
- **Don't read endpoint shapes from this doc.** Use llms.txt for the canonical API contract.

## See also

- `intl-pipeline/references/ethglossary.md` for the pipeline-side integration (how translations are produced)
- ETHGlossary `docs/translation-policy.md` for the canonical policy
- `${GLOSSARY_HOST}/llms.txt` for the canonical API contract
- `references/critical-vs-warning.md` for the broader severity rubric this slots into
- `.claude/commands/review-translations.md` for the slash command's full ETHGlossary integration flow
