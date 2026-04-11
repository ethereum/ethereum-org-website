# Incremental Translation Pipeline Spec

## Goal

Given an English content change (A -> B), update all locale translations with minimum LLM usage. Changes that don't affect translatable prose are propagated deterministically by scripts. Only actual prose changes go to the LLM.

## Inputs

- **english-A**: the previous English content (retrieved via `git show {sha}:{path}`)
- **english-B**: the current English content (on disk)
- **locale-A**: the existing translation (on disk, corresponds to english-A)
- **manifest**: stored hashes from the last pipeline run (optional; used for quick "did anything change?" check)

## Output

- **locale-B**: the updated translation reflecting all changes from A -> B

## Principles

1. **Deterministic where possible.** If no prose changed, no LLM call. Ever.
2. **Minimal LLM scope.** When prose changes, send only the changed section, not the whole file. Include surrounding context but request only the replacement text.
3. **Do no harm.** Unchanged sections must be byte-for-byte identical to locale-A. The pipeline must never corrupt existing translations.
4. **Hash-based detection.** Use intl-content-tree's Merkle tree to detect exactly what changed at the node level. No regex heuristics for change detection.

---

## Phase 1: Change Detection

**Input:** english-A (string), english-B (string), format ("markdown" | "json")
**Output:** ChangeSet (from intl-content-tree's `extractChanges`)

**What it does:**
1. Parse english-A into a tree: `parseMarkdown(englishA, config)` or `parseJson(englishA, config)`
2. Parse english-B into a tree: same
3. Run `extractChanges(treeA, treeB)` to get a `ChangeSet`

**ChangeSet contains:**
- `changes`: array of `NodeChange` (action: update/add/remove, with path, elementType, contentType, old/new values)
- `relocations`: array of `NodeRelocation` (same hash, different path)
- `sectionRenames`: array of `SectionRename` (heading ID changed, content overlaps)

**Also run:** `diff(treeA, treeB)` to get the section-level `DiffResult` for quick routing:
- `unchanged`: sections with no changes at all
- `inertDrift`: sections where only inert content changed
- `structuralDrift`: sections where structure changed but no prose changed
- `translatableDrift`: sections where prose actually changed
- `added`: new sections
- `removed`: sections that no longer exist
- `renamed`: sections with same content but different ID
- `reordered`: sections in different positions

**Test assertions:**
- Given fixture-a.md and fixture-b.md, the ChangeSet contains exactly the expected changes per SPEC.md mutation table
- Given fixture-a.json and fixture-b.json, same
- No false positives (unchanged content reported as changed)
- No false negatives (actual changes missed)

---

## Phase 2: Routing

**Input:** ChangeSet, DiffResult
**Output:** Three work lists:
  1. **deterministic**: changes that can be applied by script (inert updates, structural changes, renames, removals, reorders)
  2. **llm-required**: sections that need the LLM (translatable prose changes, new sections)
  3. **no-op**: unchanged sections (do nothing)

**What it does:**
Classify each change/section into one of the three lists. The routing rules:

| DiffResult classification | Action |
|--------------------------|--------|
| unchanged | no-op |
| inertDrift | deterministic |
| structuralDrift | deterministic |
| translatableDrift | llm-required |
| added | llm-required |
| removed | deterministic (delete from locale) |
| renamed | deterministic (update heading ID) |
| reordered | deterministic (reorder sections) |

For the `ChangeSet.changes` array, each `NodeChange` is also classified:
- `contentType === "inert"` -> deterministic
- `contentType === "translatable"` and `action === "update"` -> llm-required
- `contentType === "translatable"` and `action === "add"` -> llm-required
- `contentType === "translatable"` and `action === "remove"` -> deterministic (delete)

**Test assertions:**
- Given the ChangeSet from Phase 1, routing produces the correct work lists
- Each of the 28 MD mutations and 10 JSON mutations lands in the correct list
- Zero translatable changes in the deterministic list
- Zero inert changes in the llm-required list

---

## Phase 3: Deterministic Propagation

**Input:** locale-A (string), deterministic work list, format
**Output:** locale-A with all deterministic changes applied

**What it does for markdown:**

For each deterministic change, apply to locale-A:

| Change type | How to apply |
|------------|-------------|
| Inert value update (href, src, id, etc.) | Find `oldValue` in locale file, replace with `newValue`. Use attribute name/tag context to disambiguate. |
| Heading ID rename | Find `{#old-id}` in locale file, replace with `{#new-id}` |
| Component removal (`<Divider />`) | Find the component in locale file, remove it |
| Component addition (code fence, etc.) | Find the insertion point (by section heading), insert the content from english-B |
| Attribute addition (className) | Find the component tag in locale file, add the attribute |
| Section removal | Find the section by heading ID, remove it and all content until next same-level heading |
| Section reorder | Reorder sections in locale file to match english-B order |
| Relocation | Move content from old position to new position |

**What it does for JSON:**
- Value updates: `JSON.parse`, walk to key, replace value portion, `JSON.stringify`
- Key removal: delete the key
- Key reorder: reorder keys to match english-B
- ICU variable rename: find `{oldName}` in value, replace with `{newName}`
- HTML href change in value: find `href="old"`, replace with `href="new"`

**Test assertions:**
- Each inert change from the mutation table is correctly applied
- Unchanged prose is byte-for-byte identical to locale-A
- No locale prose is modified by this phase
- Component attributes are correctly added/updated
- Heading IDs are correctly renamed
- Removed components/sections are gone
- Added structural content (code fences) is present
- Section order matches english-B

---

## Phase 4: LLM Translation

**Input:** english-B sections that need translation, locale-A (for context), llm-required work list
**Output:** translated sections (strings)

**What it does:**
For each section in the llm-required list:
1. Extract the section content from english-B (by heading ID)
2. Include surrounding context from locale-A (neighboring sections) for translation quality
3. Send to LLM with instructions:
   - Translate only the provided section
   - Preserve all markdown formatting, components, links, code fences
   - Do NOT translate component attributes, code bodies, URLs, or heading IDs
   - Return ONLY the translated section content
4. Receive translated section

For new sections (added):
1. Extract the new section from english-B
2. Send to LLM for fresh translation
3. Receive translated section

**Test assertions (with mocked LLM):**
- The mock receives exactly the sections classified as llm-required in Phase 2
- The mock receives the correct english-B content for each section
- The mock does NOT receive unchanged or inert-only sections
- The mock receives appropriate context

---

## Phase 5: Assembly

**Input:** locale-A with deterministic changes applied (from Phase 3), translated sections (from Phase 4)
**Output:** locale-B (final updated translation)

**What it does:**
Splice the LLM-translated sections into the deterministically-updated locale file:
1. For each translated section, find its position in the locale file (by heading ID)
2. Replace the old section content with the new translated content
3. For new sections, insert at the correct position (matching english-B order)

**Test assertions:**
- Final output contains all deterministic changes from Phase 3
- Final output contains all LLM translations from Phase 4
- Unchanged sections are byte-for-byte identical to locale-A
- Section order matches english-B
- No orphaned content (sections present in output but not in english-B)
- No missing content (sections in english-B but not in output)

---

## Phase 6: Manifest Update

**Input:** english-B tree, output locale file
**Output:** updated manifest (source + translation)

**What it does:**
1. Serialize english-B tree as the new source manifest
2. Record the current git SHA as `sourceCommitSha`
3. Store the manifest for next incremental run

**Test assertions:**
- Manifest rootHash matches english-B tree hash
- sourceCommitSha is populated
- Manifest version is correct

---

## End-to-End Test

**Input:** fixture-a.md, fixture-b.md, locale-a/es/fixture.md
**Mock:** LLM returns corresponding sections from locale-b/es/fixture.md
**Expected output:** locale file that has:
- All 15 inert MD mutations applied (values from english-B)
- All 3 structural MD mutations applied (components added/removed)
- 1 section rename applied (heading ID updated)
- 1 section reorder applied
- 7 translatable sections with mock LLM responses spliced in
- 1 new section with mock LLM response
- All unchanged sections preserved from locale-A

Same pattern for JSON fixtures.

---

## What this spec does NOT cover

- Gemini API integration (mocked in tests)
- GitHub Actions workflow (tested separately)
- Git operations (file retrieval via sha, committing results)
- Multi-file batching (test is per-file)
- Chunking for large files
- Post-import sanitization
- PR creation
