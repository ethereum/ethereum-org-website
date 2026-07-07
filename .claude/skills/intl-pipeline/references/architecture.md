# Pipeline Architecture — Phase Walkthrough

The per-file pipeline is a deterministic pure function from English changes to a translated locale file with refreshed manifests. Six phases (plus a JSX attribute pass), each with explicit inputs/outputs and assertions. Canonical spec: `tests/specs/PIPELINE-SPEC.md` — this reference is a condensed walkthrough for debugging.

## Inputs

- **english-A**: previous English content, retrieved via `git show {sourceCommitSha}:{path}` from the stored source manifest
- **english-B**: current English content on disk
- **locale-A**: existing translation on disk, corresponding to english-A
- **source manifest** (`.manifest-source.json`): Merkle tree of english-A's content, including `sourceCommitSha`
- **translation manifest** (`.manifest-translation.json`): Merkle tree mirroring the English tree structure but with per-section locale hashes + structural element mapping

## Output

- **locale-B**: updated translation reflecting all A→B changes

## Phase 1: Change Detection

Parses english-A and english-B into content trees (`parseMarkdown` or `parseJson` from `intl-content-tree`), runs `extractChanges` and `diff` to produce:

- **ChangeSet** — node-level changes: action (`update`/`add`/`remove`), path, elementType, contentType, old/new values; plus relocations (same hash, different path) and section renames (heading ID changed, content overlaps)
- **DiffResult** — section-level classifications: `unchanged`, `inertDrift`, `structuralDrift`, `translatableDrift`, `added`, `removed`, `renamed`, `reordered`

No false positives (unchanged content reported as changed). No false negatives (actual changes missed).

## Phase 2: Routing

Classifies each section into three lists:

- **deterministic**: applied by script — `inertDrift`, `structuralDrift`, `removed`, `renamed`, `reordered`
- **llm-required**: needs Gemini — `translatableDrift`, `added`
- **no-op**: `unchanged`

Key rule: a section with `translatableDrift` goes ENTIRELY to llm-required. The LLM receives english-B content (which already has the new inert values), so Phase 3 must NOT apply inert changes to llm-required sections.

Section-depth deduplication: `diff()` propagates hash changes up the tree, so an h3 change flags h2 and h1 ancestors as `translatableDrift`. Routing must pick only the **deepest** (leaf) section per change. A parent section flagged only because a child changed must NOT be re-translated.

Frontmatter fields are classified independently per field:

- `description`, `title`, `alt`, `summaryPoints`, `tags` → translatable
- `image`, `lang`, `template`, `published` → inert

## Phase 3: Deterministic Propagation

Operates ONLY on deterministic-list sections. Ordering matters:

1. Heading ID renames first (so subsequent operations can locate sections by new IDs)
2. Section removals
3. Inert value updates (scoped to deterministic sections only)
4. Structural changes (component add/remove, attribute add)
5. Section reorders (last)

Inert replacement is precise, not naive find/replace:

- Scope to the narrowest heading section (by `{#id}`)
- Use element-type context patterns (`href="oldValue"` for links, `` `oldValue` `` for inline code)
- Match by OLD VALUE, never by position — SOV languages (Korean, Urdu) reorder inline elements
- Verify the old value exists before replacing; skip with warning if not

JSON: walk the parsed object to the target key, apply targeted replacement within the value string (hrefs, ICU variables, HTML attributes), `JSON.stringify` with 2-space indent.

Frontmatter (markdown): YAML scope. For inert fields, replace the value portion only, preserving key and YAML formatting.

## Phase 4: LLM Translation

For each llm-required section:

1. Extract section content from english-B (by heading ID)
2. Include surrounding context from locale-A (neighboring sections) for tone consistency
3. Send to Gemini with instructions: translate only this section, preserve markdown/components/links/code, do NOT translate code bodies / URLs / heading IDs
4. Receive translated section

JSX components in the normalized path are replaced with `<HTML-PLACEHOLDER-COMPONENT-* />` placeholders BEFORE the prompt is built. Translatable attribute values are extracted as separate leaves and handled by Phase 4b. Non-normalized path (JSON files) preserves component tags raw with a "preserve exactly" prompt rule.

New sections: send english-B section content, get fresh translation.

Frontmatter translatable fields: extract new value, send with locale-A context, get translated value.

## Phase 4b: JSX Attribute Translation Pass

Separate pass because the Phase 4 prompt instructs the model to preserve component tags exactly. Doing attribute-value translation in the same call is unreliable (over- or under-translates).

What it does:

1. Reuse the english-B content tree
2. Walk for `elementType === "component-attribute"` nodes
3. Filter: attribute name in the allow-list (`TRANSLATABLE_ATTRIBUTES` in `src/scripts/intl-pipeline/lib/shared-patterns.ts`: `title`, `description`, `alt`, `label`, `aria-label`, `placeholder`, `buttonLabel`, `name`, `caption`, `contentPreview`, `location`) AND value passes the translatability heuristic (rejects URLs, paths, identifiers, code)
4. **Self-healing filter**: drop leaves whose English value no longer appears in the locale file (already translated). This makes the pass idempotent — re-running on a file with already-translated attrs is a no-op.
5. Batch leaves per language. Focused prompt: component name + attribute name + English value + glossary terms; instructions = translate value naturally, preserve product names per glossary, don't translate identifiers.
6. Receive translations; map back to leaves.
7. Apply via regex-based replacement (`attr="oldValue"` → `attr="newValue"`).
8. Failure isolation: malformed batch → skip those leaves, leave file untouched for those attrs, log warning.

Manifest impact: source manifest unchanged (source didn't change); translation manifest updated to reflect translated values.

## Phase 5: Assembly

Splices LLM-translated sections (Phase 4) into the deterministically-updated locale file (Phase 3 output):

1. For each translated section, find its position by heading ID
2. **Section replacement**: replace content from its heading line (inclusive) to the line before the next heading of any level (exclusive). Safe because Phase 3 didn't modify llm-required sections.
3. For new sections, insert at the position matching english-B's section order
4. For translated frontmatter fields, replace the value in the frontmatter block

## Phase 6: Manifest Update

1. Serialize english-B tree as the new source manifest
2. Record current git SHA as `sourceCommitSha`
3. Update translation manifest to reflect new locale state
4. Store both manifests for next incremental run

**On partial failure**: do NOT update either manifest. The next run should re-detect those changes and retry. Stamp manifests only when all phases successfully completed.

## Test assertions (per phase, high level)

| Phase | What tests check |
|---|---|
| 1 | ChangeSet contains exactly the expected node changes; DiffResult sections classified correctly |
| 2 | Each fixture mutation lands in the correct work list; mixed sections route entirely to llm-required |
| 3 | Inert changes applied to correct elements (match by value, not position); unchanged prose byte-identical; llm-required sections not modified |
| 4 | Mock LLM receives only the llm-required sections; receives english-B content (not english-A) |
| 4b | Translatable attrs translated; non-translatable preserved; idempotent on re-run; malformed batch isolated |
| 5 | All deterministic + LLM changes present; unchanged sections byte-identical; section order matches english-B |
| 6 | Source manifest rootHash matches english-B tree; sourceCommitSha populated; neither manifest written on any failure |

## Open questions / known gaps

Surfaced in `tests/specs/PIPELINE-SPEC.md`; load that doc when you hit one:

- Structural mismatch handling when a locale drops inline elements vs. English (e.g., Urdu drops 2 of 4 links in a sentence). Pipeline should flag, not silently skip — exact surfacing TBD.
- Duplicate inert values within one section (same URL twice, only one changed): match-by-value is ambiguous. Surrounding paragraph context may be a tiebreaker.
- Code fence insertion point for added structural fences — needs implementation-level definition relative to other elements.
- Partial-failure strategy is currently all-or-nothing on manifest stamping. Wasteful on retry; may revisit for per-section stamping later.

## What this reference does NOT cover

- Gemini API integration details (see `references/ethglossary.md` for term lookups; `gemini.ts` for the adapter)
- GitHub Actions workflow shape (see `references/orchestration.md`)
- Multi-file batching, chunking for large files (see `tests/specs/CONCURRENCY-SPEC.md`)
- Post-import sanitizer (see `references/sanitizer.md`)
- Image alt text translation (known gap; alt text in markdown images is not classified as translatable by the current parser)
