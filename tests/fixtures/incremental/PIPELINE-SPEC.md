# Incremental Translation Pipeline Spec

## What we're building

A developer changes an English content file. The pipeline runs. For every locale:
- If the change was a URL, path, attribute, code, or structural element: the locale file is updated instantly by a script. No LLM. No cost. No delay.
- If the change was actual prose: only the specific changed section is sent to the LLM. The response is spliced back in. Everything else in the file is untouched.
- The developer doesn't think about translations. It just works.

## What success looks like

Given the test fixtures (28 markdown mutations, 10 JSON mutations across inert, translatable, structural, rename, add, remove, and reorder change types), the pipeline:
- Produces correct locale-B from locale-A for all three test languages (es, ko, ur)
- Makes zero unnecessary LLM calls (nothing sent to the LLM that a script could handle)
- Corrupts zero existing translations (unchanged content is byte-for-byte identical)
- Handles SOV languages correctly (Korean, Urdu -- inline element order differs from English)
- Handles RTL correctly (Urdu)

## Goal

Given an English content change (A -> B), update all locale translations with minimum LLM usage. Changes that don't affect translatable prose are propagated deterministically by scripts. Only actual prose changes go to the LLM.

## Inputs

- **english-A**: the previous English content (retrieved via `git show {sha}:{path}`)
- **english-B**: the current English content (on disk)
- **locale-A**: the existing translation (on disk, corresponds to english-A)
- **source manifest**: Merkle tree hashes of the English content at the time of last pipeline run (used for quick "did anything change?" check via rootHash comparison; `sourceCommitSha` enables retrieval of english-A)
- **translation manifest**: Merkle tree of the locale content, mirroring the English tree structure. Tracks per-section hashes so the pipeline knows which sections are up to date in each locale.

## Output

- **locale-B**: the updated translation reflecting all changes from A -> B

## Principles

1. **Deterministic where possible.** If no prose changed, no LLM call. Ever.
2. **Minimal LLM scope.** When prose changes, send only the specific changed section, not the whole file. Include surrounding context but request only the replacement text.
3. **Do no harm.** Unchanged sections must be byte-for-byte identical to locale-A. The pipeline must never corrupt existing translations.
4. **Hash-based detection.** Use intl-content-tree's Merkle tree to detect exactly what changed at the node level. No regex heuristics for change detection.
5. **Structural integrity.** The locale file must maintain structural parity with English. If the English has 4 links in a sentence, the locale must have 4 links. Structural mismatches (translator dropped a link, reformatted a component) are flagged for human review, not silently ignored.

---

## Phase 1: Change Detection

**Input:** english-A (string), english-B (string), format ("markdown" | "json")
**Output:** ChangeSet (from intl-content-tree's `extractChanges`), DiffResult (from `diff`)

**What it does:**
1. Parse english-A into a tree: `parseMarkdown(englishA, config)` or `parseJson(englishA, config)`
2. Parse english-B into a tree: same
3. Run `extractChanges(treeA, treeB)` to get a `ChangeSet`
4. Run `diff(treeA, treeB)` to get the section-level `DiffResult`

**ChangeSet contains:**
- `changes`: array of `NodeChange` (action: update/add/remove, with path, elementType, contentType, old/new values)
- `relocations`: array of `NodeRelocation` (same hash, different path)
- `sectionRenames`: array of `SectionRename` (heading ID changed, content overlaps)

**DiffResult contains (section-level classifications):**
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
  1. **deterministic**: sections/changes that can be applied by script (inert-only sections, structural-only sections, renames, removals, reorders)
  2. **llm-required**: sections that need the LLM (sections with translatable prose changes, new sections)
  3. **no-op**: unchanged sections (do nothing)

**What it does:**
Classify each section into one of the three lists based on the DiffResult:

| DiffResult classification | Route | Reason |
|--------------------------|-------|--------|
| unchanged | no-op | Nothing changed |
| inertDrift | deterministic | Only URLs/paths/attributes changed |
| structuralDrift | deterministic | Nodes added/removed but no prose changed |
| translatableDrift | llm-required | Prose text changed (may also contain inert changes) |
| added | llm-required | Brand new section, needs fresh translation |
| removed | deterministic | Delete from locale |
| renamed | deterministic | Update heading ID in locale |
| reordered | deterministic | Reorder sections in locale |

**Mixed sections (both inert and translatable changes):** When a section has `translatableDrift`, it goes entirely to the llm-required list. The LLM receives english-B content which already contains the correct inert values. Phase 3 does NOT apply inert changes to llm-required sections -- the LLM handoff handles everything for that section, similar to a full translation.

**Section depth and deduplication:** `diff()` recurses into nested sections. A change in an h3 will also flag its parent h2 and grandparent h1 as `translatableDrift` (because their merkled hashes changed). The pipeline must deduplicate by using only the **deepest** (most specific) sections. If a `translatableDrift` entry's path is a prefix of another entry's path, it's a parent -- skip it. Only the leaf-level entries go to the LLM.

For example, if diff returns `translatableDrift` for both `choosing-a-license` (h2) and `choosing-a-license/copyleft-licenses` (h3), only `copyleft-licenses` is sent for retranslation. The parent `choosing-a-license` is flagged only because its child changed -- its own prose may be unchanged and should be preserved from locale-A.

**Caveat:** A parent section may have BOTH its own prose change AND a child section change. In that case, both the parent's own content (excluding children) and the child section are separate LLM entries. The pipeline must handle parent-level prose separately from nested child sections.

**Frontmatter fields** are classified independently (each field is its own node in the tree):
- `description`, `title`, `alt`, `summaryPoints`, `tags` -> translatable (llm-required if changed)
- `image`, `lang`, `template`, `published` -> inert (deterministic if changed)

**Test assertions:**
- Given the ChangeSet from Phase 1, routing produces the correct work lists
- Each of the 28 MD mutations and 10 JSON mutations lands in the correct list
- Sections with mixed changes (e.g., #copyleft-licenses with both inert and translatable) go entirely to llm-required
- Frontmatter fields are classified independently
- Zero translatable changes in the deterministic list

---

## Phase 3: Deterministic Propagation

**Input:** locale-A (string), deterministic work list, english-B (string), format
**Output:** locale-A with all deterministic changes applied

**Important:** Phase 3 ONLY operates on sections in the deterministic list. Sections routed to llm-required are left untouched -- their changes (including any inert changes within them) are handled entirely by the LLM in Phase 4.

**Operation ordering for markdown:**
1. Heading ID renames (so subsequent operations can find sections by their new IDs)
2. Section removals
3. Inert value updates (scoped to deterministic sections only)
4. Structural changes (component add/remove, attribute add)
5. Section reorders (last, since it rearranges what's already been updated)

**Inert value replacement algorithm (markdown):**
Replacements must be precise, not naive find/replace:
1. Scope the replacement to the narrowest heading section (by `{#id}`)
2. Use element-type context patterns to disambiguate (e.g., `href="oldValue"` for links, `` `oldValue` `` for inline code)
3. Match by OLD VALUE, not by position. Translated sentences may reorder inline elements due to different word order (SOV languages like Korean, Urdu). The 2nd link in English may be the 4th link in Korean. Always find the element by its current value.
4. Verify the old value exists before replacing; skip with warning if not found

**SOV / inline element reordering:**
In languages with different word order (Korean, Urdu, etc.), inline elements within a sentence may appear in a different order than English. For example:

English: `Use [Remix](url1) on [Sepolia](url2) with a [block explorer](url3) to test [smart contracts](url4)`
Korean: `[smart contracts](url4)를 테스트하려면 [block explorer](url3)와 함께 [Sepolia](url2)에서 [Remix](url1)를 사용하세요`

The links are in reverse order. If `url2` changes from `sepolia.dev` to `holesky.dev`, the pipeline must find `sepolia.dev` by value, not by "the 2nd link." This applies to all inline elements: links, images, inline code, bold/emphasis, HTML tags.

**What it does for markdown:**

| Change type | How to apply |
|------------|-------------|
| Inert value update (href, src, id, etc.) | Scoped find/replace using context pattern + occurrence counting |
| Heading ID rename | Find `{#old-id}` in locale file, replace with `{#new-id}` |
| Component removal (`<Divider />`) | Find the component in locale file, remove it and normalize surrounding whitespace |
| Component/code fence addition | Find insertion point by section heading, insert content from english-B |
| Attribute addition (className) | Find the component tag in locale file by existing attributes, add the new attribute |
| Section removal | Find section by heading ID, remove heading + content until next same-level heading |
| Section reorder | Reorder sections in locale file to match english-B section order |
| Relocation | Move content from old position to new position |

**What it does for JSON:**
- Inert value updates: `JSON.parse`, walk to key, apply targeted replacement within the value string (for hrefs, ICU variables), `JSON.stringify` with 2-space indent
- Key removal: delete the key from the parsed object
- Key reorder: reorder keys to match english-B key order
- ICU variable rename: find `{oldName}` or `{oldName,` in the value string, replace with `{newName}` or `{newName,`
- HTML href/attribute change in value: find `attr="oldValue"`, replace with `attr="newValue"`

**Frontmatter (markdown):**
Frontmatter is a distinct scope (YAML key-value pairs between `---` markers). For inert frontmatter fields:
- Find the key line (e.g., `image: /old/path.png`)
- Replace the value portion only, preserving the key and any YAML formatting

**Test assertions:**
- Each inert change from the mutation table is correctly applied
- Unchanged prose is byte-for-byte identical to locale-A
- No locale prose is modified by this phase
- Component attributes are correctly added/updated
- Heading IDs are correctly renamed
- Removed components/sections are gone
- Added structural content (code fences) is present
- Whitespace is normalized after removals (no double blank lines)
- Section order matches english-B after reorder
- Sections in the llm-required list are NOT modified by this phase

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

The LLM receives english-B content, which already contains all inert values (new URLs, new attributes, etc.). The LLM is expected to preserve these as-is. This is the same behavior as a full translation -- the LLM never sees old inert values.

For new sections (added):
1. Extract the new section from english-B
2. Send to LLM for fresh translation
3. Receive translated section

For frontmatter translatable fields:
1. Extract the field value from english-B (e.g., new description text)
2. Send to LLM with the locale-A version as context
3. Receive translated value

**Test assertions (with mocked LLM):**
- The mock receives exactly the sections classified as llm-required in Phase 2
- The mock receives the correct english-B content for each section
- The mock does NOT receive unchanged or inert-only sections
- The mock does NOT receive structural-only sections
- Frontmatter translatable fields are sent individually, not as part of a section

---

## Phase 5: Assembly

**Input:** locale file with deterministic changes applied (from Phase 3), translated sections (from Phase 4), english-B (for section ordering reference)
**Output:** locale-B (final updated translation)

**What it does:**
Splice the LLM-translated sections into the deterministically-updated locale file:
1. For each translated section, find its position in the locale file (by heading ID)
2. **Section replacement**: replace the section content from its heading line to the line before the next heading (any level). This is safe because Phase 3 did not modify llm-required sections.
3. For new sections, insert at the correct position (matching english-B section order)
4. For translated frontmatter fields, replace the value in the frontmatter block

**Section boundaries:** A section's content in the locale file is defined as: from its heading line (inclusive) to the line before the next heading line of any level (exclusive). This avoids the complexity of same-level vs nested heading tracking.

**Test assertions:**
- Final output contains all deterministic changes from Phase 3
- Final output contains all LLM translations from Phase 4
- Unchanged sections are byte-for-byte identical to locale-A
- Section order matches english-B
- No orphaned content (sections present in output but not in english-B)
- No missing content (sections in english-B but not in output)
- No conflict between Phase 3 and Phase 4 outputs (they operate on disjoint sections)

---

## Phase 6: Manifest Update

**Input:** english-B tree, output locale file
**Output:** updated source manifest + updated translation manifest

There are TWO manifests per file:
- **Source manifest** (`.manifest-source.json`): Merkle tree of the English content. Used to detect what changed in English between runs. Contains `sourceCommitSha` for retrieving old English via git.
- **Translation manifest** (`.manifest-translation.json`): Merkle tree of the locale content, mirroring the English tree structure. Tracks per-section hashes so the pipeline knows which sections are up to date in each locale. Also records the structural mapping between English and locale elements, enabling the pipeline to target the correct element in the locale file when the corresponding English element changes.

**What it does:**
1. Serialize english-B tree as the new source manifest
2. Record the current git SHA as `sourceCommitSha` in the source manifest
3. Update the translation manifest to reflect the new locale state
4. Store both manifests for next incremental run

**On partial failure:** If Phase 4 fails for some sections (LLM error), do NOT update either manifest. The next run should re-detect those changes and retry. Only stamp manifests when all changes are successfully applied.

**Test assertions:**
- Source manifest rootHash matches english-B tree hash
- sourceCommitSha is populated
- Manifest version is correct
- Neither manifest is written if any phase failed

---

## End-to-End Test

Run against all three test languages to cover different script types and word orders:
- **es** (Spanish): Latin script, SVO word order (similar to English)
- **ko** (Korean): Hangul script, SOV word order (inline elements reordered)
- **ur** (Urdu): Arabic script, RTL, SOV word order

**Input:** fixture-a.md, fixture-b.md, locale-a/{lang}/fixture.md
**Mock:** LLM returns corresponding sections from locale-b/{lang}/fixture.md
**Expected output (locale-B):** locale file that has:
- All 28 MD mutations correctly reflected in the output:
  - Inert mutations in deterministic-only sections: applied by Phase 3 scripts
  - Inert mutations in llm-required sections: present because the LLM received english-B (which has the new values)
  - Structural mutations: applied by Phase 3 scripts
  - Translatable mutations: handled by mock LLM (returns from locale-B fixtures)
  - Section rename: heading ID updated by Phase 3
  - Section reorder: sections in english-B order
  - New section: mock LLM response spliced in
- All unchanged sections preserved byte-for-byte from locale-A

Same pattern for JSON fixtures (per language).

**SOV-specific assertions (ko, ur):**
- Multi-link inert propagation: when one of four links changes its href, verify the correct link is updated even though inline element order differs from English
- Inline code replacement: verify the correct inline code is updated regardless of position in the translated sentence

---

## Open questions

- **Structural mismatch handling:** When a locale file has fewer inline elements than English (e.g., Urdu drops 2 of 4 links in a sentence), this is a structural integrity violation. The pipeline should flag this for human review rather than silently skipping. How this flag is surfaced (PR comment, log warning, separate report) is TBD.
- **Duplicate inert values in one section:** If the same URL appears twice in a section and only one instance changed, match-by-value is ambiguous. May need surrounding context (the paragraph) as a tiebreaker.
- **Code fence insertion point:** When adding a structural code fence to a section, where exactly within the section? English-B position relative to other elements? Needs implementation-level definition.
- **Partial failure strategy:** Currently all-or-nothing (don't stamp manifests if any LLM call fails). Acceptable for v1 but wasteful on retry. May revisit for per-section stamping later.

---

## What this spec does NOT cover

- Gemini API integration (mocked in tests)
- GitHub Actions workflow (tested separately)
- Git operations (file retrieval via sha, committing results)
- Multi-file batching (test is per-file)
- Chunking for large files
- Post-import sanitization
- PR creation
- Image alt text translation (known gap; alt text in markdown images is not currently classified as translatable by the parser)
