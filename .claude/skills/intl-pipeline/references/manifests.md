# Manifests

The pipeline tracks state via two manifest files per translated file. This reference covers manifest structure, lifecycle, and debugging.

## File layout

For each translated file at `public/content/translations/{lang}/path/to/file.md`, two sibling manifests:

- `public/content/translations/{lang}/path/to/file.md.manifest-source.json`
- `public/content/translations/{lang}/path/to/file.md.manifest-translation.json`

Same pattern for JSON locale files in `src/intl/{lang}/`.

Manifests are co-located with the locale file (not centralized). Moving a locale file means moving both manifests.

## Source manifest (`.manifest-source.json`)

Content tree of the English file at the time of last pipeline run. Stores **hashes** (not content) per section/element/attribute, plus the git SHA the snapshot was taken at.

Shape:

```json
{
  "version": "1",
  "sourceCommitSha": "abc123def456...",
  "rootHash": "sha256...",
  "tree": { ... merkle tree of English content ... }
}
```

`sourceCommitSha` is the load-bearing field: it tells the pipeline "if you want to know what English looked like when I stamped this, run `git show {sha}:{path}`."

## Translation manifest (`.manifest-translation.json`)

Mirrors the source manifest's structure, but with per-section hashes of the **locale** content plus a structural map between English and locale elements. Used to:

- Detect drift in the locale itself (rare, but possible if hand-edited)
- Find the right element in the locale file when its English counterpart changes (especially for SOV languages where inline order differs)

Shape (high level):

```json
{
  "version": "1",
  "language": "ja",
  "rootHash": "sha256...",
  "tree": { ... merkle tree of locale content ... },
  "elementMap": { ... english-element-path -> locale-element-path ... }
}
```

## Manifest lifecycle

| Event | Effect |
|---|---|
| First translation of a file (no manifests exist) | Pipeline runs full translation, stamps both manifests after success |
| Incremental run on an existing file | Pipeline reads source manifest, fetches english-A via `git show`, computes delta, translates only changed sections, re-stamps both manifests after success |
| Phase 4 failure (LLM error) | Manifests are NOT stamped. Next run re-detects the changes. |
| Hand-edit to the locale (English unchanged) | Manifest map remains valid. Next pipeline run sees corrected locale as new baseline. |
| Hand-edit reflecting English change | Manifest now lies about the locale's relationship to English. Next run will misclassify. See `references/non-english-edits.md`. |
| `stamp_only: true` workflow run | Manifests regenerated from current file state, no LLM calls. Useful for "the locale is correct, the manifest is wrong" scenarios. |

## Manifest invariants

- Both manifests must exist together. Delete one → must delete the other → pipeline auto-runs full translation on next run for that file+locale.
- `sourceCommitSha` in source manifest must point to a real, reachable commit. If history has been rewritten (e.g., main rebased), the manifest is invalidated.
- `rootHash` in source manifest must match the hash of the English file at `sourceCommitSha`. If not, something corrupted the manifest after stamping.
- `language` in translation manifest must match the locale directory.

## Debug commands

Common diagnostics:

```bash
# What commit was this manifest stamped at?
jq -r '.sourceCommitSha' public/content/translations/ja/some-page/index.md.manifest-source.json

# Has English moved since the stamp?
STAMPED_SHA=$(jq -r '.sourceCommitSha' .../.manifest-source.json)
git log "$STAMPED_SHA..HEAD" -- public/content/some-page/index.md

# Compare current English hash vs stamped hash
STAMPED_HASH=$(jq -r '.rootHash' .../.manifest-source.json)
node -e "
const { parseMarkdown } = require('intl-content-tree');
const { readFileSync } = require('fs');
const tree = parseMarkdown(readFileSync('public/content/some-page/index.md', 'utf8'));
console.log(tree.rootHash);
"

# Pretty-print the manifest's structure
jq '.tree' .../.manifest-translation.json
```

## Common manifest issues

| Issue | Cause | Fix |
|---|---|---|
| Manifest references a SHA that no longer exists | Force-push or branch deletion | Delete both manifests, re-run pipeline (will full-translate) |
| Translation has changed but manifest hasn't | Hand-edit; or a previous run's Phase 6 was skipped | `stamp_only: true` to refresh from current state, OR re-run to overwrite the hand-edit |
| Manifest's element map mismatches the locale file | Locale was hand-edited to add/remove structural elements | Delete both manifests, re-run for that file+locale |
| `rootHash` mismatch on supposedly-unchanged English | English file has BOM, line-ending change, or invisible whitespace change | Inspect the file with `xxd`; clean up the offending characters |

## What this reference does NOT cover

- The hand-edit policy (see `references/non-english-edits.md`)
- The phase-by-phase usage of manifests (see `references/architecture.md`)
- Recovery procedures (see `references/recovery.md`)
- Schema migrations on manifest version bump (not currently needed; v1 is the only version)
