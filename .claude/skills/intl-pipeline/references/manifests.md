# Manifests

The pipeline tracks state via two manifest files per translated file. This reference covers manifest structure, lifecycle, and debugging.

## File layout

Manifests are centralized under `.manifests/`, mirroring the destination path as a directory. For a translated file at `public/content/translations/{lang}/path/to/file.md`:

- `.manifests/public/content/translations/{lang}/path/to/file.md/source.json`
- `.manifests/public/content/translations/{lang}/path/to/file.md/translation.json`

Same pattern for JSON locale files: `.manifests/src/intl/{lang}/common.json/source.json`. Path construction is `getManifestPath(destPath, "source" | "translation")` in `main.ts`, rooted at `MANIFESTS_DIR` (`constants.ts`).

Moving or renaming a locale file means moving its manifest directory for every locale. Coverage is partial: a file+locale with no manifest routes to full translation rather than failing, which is also the recovery path when a manifest is deleted.

## Source manifest (`source.json`)

Content tree of the English file at the time of last pipeline run. Stores **hashes** (not content) per section/element/attribute, plus the git SHA the snapshot was taken at.

Shape:

```json
{
  "version": 2,
  "sourceFile": "public/content/some-page/index.md",
  "sourceCommitSha": "abc123def456...",
  "generatedAt": "2026-06-08T07:02:11.397Z",
  "rootHash": "sha256...",
  "tree": { ... merkle tree of English content ... }
}
```

`sourceCommitSha` is the load-bearing field: it tells the pipeline "if you want to know what English looked like when I stamped this, run `git show {sha}:{path}`."

### Schema version 2 (intl-content-tree 0.4)

Frontmatter is parsed as YAML: sequences (`tags`, `summaryPoints`, `topic`) and mappings are section nodes with one child per item, so adding, removing, rewriting, or reordering an item moves the field hash and the `rootHash`. Under v1 a block sequence hashed as an empty value and every edit to it was invisible (48 video pages had their `topic` list shrink in June 2026 and no run ever noticed). Quoted scalars now hash by their text, not their spelling, so `title: Foo` and `title: "Foo"` are the same content.

**A package bump that changes hashing (a `MANIFEST_VERSION` bump) needs a one-off `pnpm exec tsx src/scripts/intl-pipeline/migrate-manifests.ts`** (`--dry-run` to report only): it re-serializes every stored `source.json` from that manifest's own English (`git show <sourceCommitSha>:<file>`) under the current scheme, keeping `sourceCommitSha` and `generatedAt`, and moves a sibling `translation.json`'s `englishManifestHash` along with it. No LLM calls. Afterwards only files whose English really moved read as stale. Never restamp from current English instead -- that swallows exactly the changes the old scheme missed.

## Translation manifest (`translation.json`)

Records what the last translation of the pair was made against: the English source manifest's hash, the inert placeholders (links, code) Gemini returned and their values, and per-section status. It holds no hashes of the locale content. Shape (`LocaleTranslationManifest` in `lib/llm/manifest-adapter.ts`):

```json
{
  "version": 1,
  "locale": "ja",
  "translatedAt": "2026-06-08T07:02:11.397Z",
  "englishManifestHash": "25691cc45f42",
  "placeholderOrder": ["LINK-a21a82", "..."],
  "placeholderMap": { "LINK-a21a82": { "type": "...", "values": { ... } } },
  "sections": { "_all": { "translatedAt": "...", "status": "success" } }
}
```

## Manifest lifecycle

| Event                                            | Effect                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First translation of a file (no manifests exist) | Pipeline runs full translation, stamps both manifests after success                                                                                                                                                                                                                                           |
| Incremental run on an existing file              | Pipeline reads source manifest, fetches english-A via `git show`, computes delta, translates only changed sections, re-stamps both manifests after success                                                                                                                                                    |
| Phase 4 failure (LLM error)                      | Manifests are NOT stamped. Next run re-detects the changes.                                                                                                                                                                                                                                                   |
| Hand-edit to the locale (English unchanged)      | Manifests stay valid (they record English, not the locale). Next pipeline run sees corrected locale as new baseline.                                                                                                                                                                                          |
| Hand-edit reflecting English change              | Manifest now lies about the locale's relationship to English. Next run will misclassify. See `references/non-english-edits.md`.                                                                                                                                                                               |
| `stamp_only: true` workflow run                  | `source.json` rewritten from current English for pairs whose English changed; no LLM calls, no locale or `translation.json` writes. It asserts the locale is current -- stamping a locale nobody hand-fixed strands it behind English with no drift left to detect (9 files were in that state in Sept 2026). |
| Hashing scheme change (`MANIFEST_VERSION` bump)  | One-off `pnpm exec tsx src/scripts/intl-pipeline/migrate-manifests.ts` rewrites every manifest from its own recorded English. See "Schema version 2".                                                                                                                                                         |

## Manifest invariants

- Both manifests must exist together. Delete one → must delete the other → pipeline auto-runs full translation on next run for that file+locale.
- `sourceCommitSha` in source manifest must point to a real, reachable commit. If history has been rewritten (e.g., main rebased), the manifest is invalidated.
- `rootHash` in source manifest must match the hash of the English file at `sourceCommitSha`. If not, something corrupted the manifest after stamping.
- `locale` in translation manifest must match the locale directory.

## Debug commands

Common diagnostics:

```bash
# What commit was this manifest stamped at?
jq -r '.sourceCommitSha' .manifests/public/content/translations/ja/some-page/index.md/source.json

# Has English moved since the stamp?
STAMPED_SHA=$(jq -r '.sourceCommitSha' .manifests/.../source.json)
git log "$STAMPED_SHA..HEAD" -- public/content/some-page/index.md

# Compare current English hash vs stamped hash
STAMPED_HASH=$(jq -r '.rootHash' .manifests/.../source.json)
node -e "
const { parseMarkdown } = require('intl-content-tree');
const { readFileSync } = require('fs');
const tree = parseMarkdown(readFileSync('public/content/some-page/index.md', 'utf8'));
console.log(tree.rootHash);
"

# Pretty-print the English structure the pair was last synced to
jq '.tree' .manifests/.../source.json

# What the last translation was made against, and per-section status
jq '{englishManifestHash, sections}' .manifests/.../translation.json
```

## Common manifest issues

| Issue                                               | Cause                                                                    | Fix                                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Manifest references a SHA that no longer exists     | Force-push or branch deletion                                            | Delete both manifests, re-run pipeline (will full-translate)                    |
| Translation has changed but manifest hasn't         | Hand-edit; or a previous run's Phase 6 was skipped                       | English unchanged: nothing to do. To discard the edit, re-run with `mode: full` |
| Locale structure no longer matches English          | Locale was hand-edited to add/remove structural elements                 | Re-run with `mode: full` for that file+locale                                   |
| `rootHash` mismatch on supposedly-unchanged English | English file has BOM, line-ending change, or invisible whitespace change | Inspect the file with `xxd`; clean up the offending characters                  |
