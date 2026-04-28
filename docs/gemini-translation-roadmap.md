# Gemini Translation Pipeline -- Roadmap

Status: Active plan
Last updated: 2026-03-27

---

## Current state

The initial full-repo translation pass is ~97-99% complete across 24 non-English
languages. The Gemini translation pipeline (`gemini-translations.yml`) works well
for full-file translation but has limitations as we shift to ongoing maintenance.

### What works today

- Full-file translation with glossary enforcement
- Code block extraction/restoration (`<!--CODE_BLOCK_N-->` placeholders)
- Comment translation within code blocks
- Incremental commit per language (no work lost on partial failure)
- Progress tracking and run resumption
- Post-import sanitization and transliteration
- Configurable concurrency, include/exclude paths, per-language targeting
- 100% custom header ID coverage (`{#custom-id}`) across all markdown files,
  preserved identically in translations (verified 2026-03-27)

### Gaps (being addressed)

1. ~42 file/language pairs failed during the initial pass (see "Failed files")
2. No drift detection (no way to know which translations are stale)
3. No incremental translation (every run retranslates from scratch)
4. Manual triggering (no automation for ongoing maintenance)
5. Limited error logging from the `@google/gen-ai` SDK
6. Some existing translations done with Gemini 2.5 Pro before current sanitizer
   improvements, transliteration banks, and glossary enhancements

### Cost context

- Initial full-repo pass: ~$1,500 (via Crowdin + Gemini 2.5 Pro)
- Current pipeline (direct Gemini, bypassing Crowdin): ~80% cheaper
- Estimated full sweep with current pipeline: ~$300-500
- Gemini Pro pricing (approximate):
  - Input: ~$1.25 / 1M tokens
  - Output: ~$10.00 / 1M tokens (output dominates cost)

---

## Priority 1: Fix failed files (branch: `gemini-v3`)

Close the initial pass from ~97-99% to ~100%. This is the most urgent work item.

### Failed file inventory

42 file/language pairs failed. Full list:

```
ar: glossary.json
bn: json-rpc/index.md, ethash/index.md, ethereum-forks/index.md,
    fusaka/peerdas/index.md, glossary.json, learn-quizzes.json,
    page-resources.json, page-trillion-dollar-security.json
de: ethereum-forks/index.md, whitepaper/index.md, glossary.json,
    learn-quizzes.json
id: nodes-and-clients/index.md, glamsterdam/index.md, merge/index.md,
    glossary.json, learn-quizzes.json
it: hello-world-smart-contract-fullstack/index.md, glossary.json,
    learn-quizzes.json
sw: glossary.json
ta: translatathon/index.md, json-rpc/index.md, poa/index.md,
    pos-vs-pow/index.md, ethash/index.md, web2-vs-web3/index.md,
    fusaka/peerdas/index.md, glamsterdam/index.md, glossary.json,
    learn-quizzes.json
ur: json-rpc/index.md, dagger-hashimoto/index.md, ethash/index.md,
    dapps/index.md, secret-state/index.md, ethereum-forks/index.md,
    fusaka/peerdas/index.md, pectra/maxeb/index.md, glossary.json,
    page-what-is-the-ethereum-network.json
```

### Failure pattern analysis

| Root cause             | Files affected | Details                                    |
|------------------------|----------------|--------------------------------------------|
| Token overload (>15k)  | ~7             | whitepaper (90KB), json-rpc (75KB), etc.   |
| Code block density     | ~5             | json-rpc (172 blocks), hello-world (128)   |
| Table/component density| ~5             | ethereum-forks (60 JSX + 33 tables)        |
| JSON with embedded HTML| ~3             | glossary.json (317 anchors, 540 escapes)   |

**Repeat offenders:**
- `glossary.json` -- fails for 8 languages (ar, bn, de, id, it, sw, ta, ur)
- `learn-quizzes.json` -- fails for 5 languages (bn, de, id, ta, ur)

**Languages with most failures:** Tamil (10), Urdu (10), Bengali (8)

### Fixes to implement on `gemini-v3`

#### A. Markdown: header ID-based chunking

Replace token-count-based chunking (which failed) with structure-aware chunking
using the `{#custom-id}` header anchors.

- Split at heading boundaries, grouping sections up to a token budget per chunk
- Each chunk carries its header IDs for deterministic reassembly
- Header IDs are 100% consistent across the repo and preserved in translations
- Intro content before the first heading gets a synthetic `_intro` key

#### B. JSON: namespace batching with HTML placeholder pre-parsing

Two improvements for large/complex JSON files:

1. **Batch by top-level keys**: Send ~100 key-value pairs per request (with a
   ~20 key buffer to avoid wasteful tiny final batches -- e.g., a file with 110
   keys sends one batch of 110, not 100 + 10)

2. **HTML placeholder pre-parsing**: Before translation, replace embedded HTML
   in JSON values with numbered placeholders (similar to Crowdin's `<0></0>`
   pattern but more descriptive). Restore after translation.

   ```
   Before: "A <a href=\"/glossary/#dao\">DAO</a> is..."
   After:  "A <!--HTML_1-->DAO<!--/HTML_1--> is..."
   (with restoration map stored separately)
   ```

   Validation: after restoration, verify all placeholders were preserved. Flag
   chunks with missing/duplicated placeholders for retry.

#### C. Code fence extraction audit

The `<!--CODE_BLOCK_N-->` extraction works on successful files. Investigate why
it fails on code-dense files:
- Run the extractor in isolation on failing files, inspect output
- Check for edge cases: nested fences, non-standard fence syntax, very high
  placeholder counts (>100 per file)
- May be interaction between chunking failure + code blocks (if chunking fails,
  the entire code-heavy file hits Gemini as one blob)

#### D. Error logging improvements

Add structured error logging from the `@google/gen-ai` SDK:
- Capture failure reason, response status, partial output if available
- Log per-file/per-language so failures can be triaged without re-running
- Distinguish error types: rate limit vs. content filter vs. malformed output
  vs. timeout (each needs different retry strategy)

#### E. Validation

- Retranslate the ~42 failed file/language pairs as the test case
- Compare output quality against successfully translated files of similar size

---

## Priority 2: Section hash manifest (branch: `gemini-v4`)

Build per-section content hashing infrastructure. This is the foundation for both
drift detection and incremental translation.

### Markdown: header ID-keyed section hashes

Parse each English markdown file into a tree of sections keyed by `{#custom-id}`.
Hash each section's content. Structure:

```json
{
  "public/content/roadmap/index.md": {
    "fileHash": "abc123",
    "sections": {
      "_intro": "def456",
      "what-is-the-roadmap": "ghi789",
      "why-does-ethereum-need-a-roadmap": "jkl012",
      ...
    }
  }
}
```

**Possible future optimization**: merkle trie structure where leaf hashes bubble
up to parent sections. Allows O(1) "has anything changed?" checks at the file
level, with drill-down to find exactly which sections changed. Worth considering
once the flat hash map is working, if performance demands it.

### JSON: key-level hashes

For JSON files, hash individual key-value pairs (or namespace groups for deeply
nested files). Structure:

```json
{
  "src/intl/en/glossary.json": {
    "fileHash": "mno345",
    "keys": {
      "account": "pqr678",
      "address": "stu901",
      ...
    }
  }
}
```

### Storage: manifest file

**Decision**: Use a manifest file (`src/intl/translation-manifest.json`).

- Single file, easy to query, no content file pollution
- Works for both JSON and markdown
- Can include metadata: timestamp, pipeline version, token cost, Gemini model
- Trade-off: potential merge conflicts if multiple translation PRs run
  simultaneously (mitigated by per-language PRs or lock-step merging)

---

## Priority 3: Baseline sweep + quality refresh

**Decision**: "Stamp now" approach (Option B from brainstorming).

One combined operation (~$300-500) that accomplishes two goals simultaneously:

1. **Establish baseline**: Record current English source SHAs in the manifest
   for every file/language pair. Going forward, drift is detectable by comparing
   recorded SHA against current English SHA.

2. **Quality refresh**: Retranslate everything using current best pipeline:
   - Gemini 3.1 Pro (upgraded from 2.5 Pro used in original pass)
   - Current sanitizer with all accumulated fixes
   - Transliteration banks for non-Latin script languages
   - Improved translation glossary (in development separately)

After this sweep, every translation in the repo is (a) generated by the best
available pipeline and (b) tracked in the manifest with a known English source
SHA. This is the clean foundation for incremental work going forward.

### Prerequisite: glossary and transliteration improvements

The quality refresh is most valuable after:
- Translation glossary expansion is complete (in flight)
- Transliteration bank coverage is solid for non-Latin scripts
- All Priority 1 fixes are deployed (so zero files fail)

### Approach alternatives considered

**Option A (rejected): Git history bootstrap** -- Analyze commit messages
(pattern: `i18n(pl): Crowdin translations`) to determine when each file was
last truly translated. Feasible since commits are programmatic, but complicated
by cleanup commits that are more recent than actual translation timestamps.

**Option B (selected): Stamp now, sweep forward** -- Accept that current
translations have unknown-precision freshness. Do one full sweep with current
pipeline, stamping SHAs as we go. After this, the manifest is authoritative.

**Option C (rejected): Hybrid git + LLM spot-check** -- Use git where clear,
LLM where ambiguous. More accurate bootstrap but more complexity for marginal
benefit given we want a quality refresh anyway.

---

## Priority 4: Incremental translation (branch: `gemini-v4`)

Once the manifest exists with per-section hashes, incremental translation
becomes straightforward.

### JSON: key-level diff and translate

1. Deep-diff current English JSON against manifest's recorded English version
2. Collect added and changed key paths
3. Send only those key-value pairs to Gemini for translation
4. Deep-merge translated pairs into existing translation JSON
5. Update manifest with new SHAs
6. Run sanitizer on the merged file

**Complexity**: Low. JSON key merging is deterministic and safe.

### Markdown: section-level diff and translate

1. Parse current English file into sections keyed by `{#header-id}`
2. Compare section hashes against manifest
3. For each changed section:
   a. Extract corresponding section from existing translation
   b. Send to Gemini: English section + existing translation + context
   c. Receive translated section
4. Reassemble: unchanged sections from existing translation + new translations
5. Update manifest with new SHAs
6. Run sanitizer on reassembled file

**Complexity**: Medium. The 100% header ID coverage makes this much more
feasible than initially estimated. Splicing by ID is deterministic. Edge case:
intro content before first heading (use synthetic `_intro` key).

**Fallback**: If >50% of sections changed, fall back to full-file retranslation
(the incremental overhead isn't worth it at that point).

### "Previous English version" question (resolved)

The manifest's recorded SHA IS the previous English version. When a translation
is generated, the manifest records the English source SHA. On the next
incremental run, diff current English against that SHA to identify what changed.

---

## Priority 5: Automation (branch: `gemini-v4`)

### End-state vision

```
English content merged to dev
  |
  v
Drift detection scan (automatic or cron)
  |
  v
Stale file list (per language)
  |
  v
Batching logic (group by language, thresholds, cooldown)
  |
  v
Incremental translation dispatch (Gemini 3.1 Pro)
  |
  v
Sanitizer + transliteration + review agents
  |
  v
PR(s) created, ready for human merge
```

### Graduation plan

**Phase 1 (near-term): Manual + tooling**
- Drift scan script runs manually or on cron, outputs report
- Human reviews report and manually dispatches translation
- Existing sanitizer + review pipeline handles quality

**Phase 2 (mid-term): Semi-automated**
- Nightly/weekly cron runs drift scan
- When stale count exceeds threshold, auto-dispatches translation
- Human merges resulting PRs

**Phase 3 (long-term): Full automation**
- Push to dev triggers path-filtered action (`public/content/`, `src/intl/en/`)
- Batching logic groups changes (cooldown window during active dev)
- Translation -> sanitizer -> review agents -> PR ready for human merge
- Cron job as safety net catches anything the push trigger missed
- Human stays in the loop at the merge step

### Batching considerations

- One PR per language per run (clearest for review)
- Skip whitespace-only or comment-only changes
- Cooldown: don't retranslate files translated in the last N hours
- Size cap: if >50 files stale, split into multiple runs or prioritize by traffic

---

## Branch strategy

- **`gemini-v3`**: Priority 1 (fix failed files). Patches to the existing
  pipeline: chunking, batching, HTML placeholders, error logging.
- **`gemini-v4`**: Priorities 2-5 (new infrastructure). Manifest, drift
  detection, incremental translation, automation.

---

## Related workstreams (tracked elsewhere)

- **Translation glossary expansion** -- in flight, separate task
- **Transliteration bank improvements** -- ongoing per non-Latin locale
- **Full-language retroactive cleanup** -- see `src/scripts/i18n/FUTURE.md` #9
- **Lowercase ethereum initiative** -- content standardization, tracked in
  `docs/lowercase-ethereum-plan.md`
