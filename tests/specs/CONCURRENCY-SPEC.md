# Concurrency, Chunking, and Commit Strategy Spec

## What we're building

The translation pipeline currently processes files sequentially (one file, one language at a time). For production use with 25 languages and hundreds of content files, we need concurrent Gemini API calls, smarter chunking for large files, and clean commit history via per-language squashing.

## What success looks like

Given N files and M languages with a concurrency limit of C:
- All file/language pairs are processed with up to C concurrent Gemini API calls
- Large files are chunked by byte size (not key count) so no single Gemini call exceeds safe limits
- Each language's output is squashed into one commit as soon as that language completes
- Partial failures (one language fails) don't corrupt the target branch
- Zero-drift files produce zero Gemini calls and zero commits (already working)

## Gemini 3.1 Pro limits (reference)

- Input context: 1,048,576 tokens (~1M)
- Output limit: 65,536 tokens (~65K)
- English: ~4 chars per token
- CJK (Korean, Chinese, Japanese): ~1-2 chars per token

---

## Part 1: Concurrency

### Goal

Process all (file, language) translation tasks through a shared semaphore pool. The pool size is configurable via `GEMINI_CONCURRENCY` (workflow input, default 16).

### Task granularity

- Each Gemini API call is one task in the pool
- For files that need chunking: each chunk is its own task
- A 10-chunk file takes 10 pool slots; remaining slots serve other tasks
- Chunks for the same file are independent (they translate different portions)

### Assembly

- Chunks are assembled back into the complete file BEFORE committing
- A chunked file = N Gemini calls, 1 commit with the merged result
- The chunk is the task unit for the semaphore pool, NOT the commit unit

### Execution flow

1. Build task list: enumerate all (file, language) pairs
2. For each pair, determine if chunking is needed. If yes, expand into chunk tasks.
3. Submit all tasks to the shared semaphore pool
4. Track per-language completion: when all tasks for a language finish, trigger squash
5. After all languages complete: merge working branch into target branch

### Test assertions

- With concurrency=2 and 4 tasks, at most 2 run simultaneously
- All tasks eventually complete regardless of submission order
- Token stats accumulate correctly across concurrent tasks
- Per-language completion callback fires exactly once per language, after all its tasks finish

---

## Part 2: Chunking

### Goal

Split large files into chunks that stay safely within Gemini's output token limit. Prefer more smaller calls over fewer larger calls for reliability.

### Chunk size budget

```
MAX_CHUNK_BYTES = 65_536  (64KB)
```

At ~4 chars/token (English), 64KB = ~16K tokens input. With CJK at ~1-2 chars/token, 64KB = ~32-64K tokens -- still within the 65K output limit. This is deliberately conservative: more calls, fewer failures.

### JSON chunking (replaces current key-count approach)

**Current:** Split at 100 keys regardless of value size. Breaks when values are long strings.

**New algorithm:**
1. Iterate top-level keys in order
2. For each key, measure byte size: `key.length + JSON.stringify(value).length + overhead`
3. Accumulate into current chunk
4. When accumulated bytes exceed MAX_CHUNK_BYTES, start a new chunk
5. Minimum: at least 1 key per chunk (handles single keys exceeding budget)
6. Nested objects: measure the entire nested value as one unit

**Backward compatibility:** The HTML placeholder extraction pass runs BEFORE chunking (unchanged). Chunking operates on the placeholder-replaced content.

**Test assertions:**
- A JSON file with 50 keys averaging 2KB each (~100KB total) produces 2 chunks
- A JSON file with 3 keys where one value is 200KB produces 3 chunks (one per key)
- A JSON file under 64KB produces 1 chunk (no splitting)
- Key order is preserved across chunks
- Merged output matches original structure

### Markdown prose chunking (enhancement to current approach)

**Current:** Split at heading boundaries when > 40,000 chars (`PROSE_SIZE_THRESHOLD`).

**New:** Replace `PROSE_SIZE_THRESHOLD` with `MAX_CHUNK_BYTES` (64KB). Additionally, if a single section exceeds MAX_CHUNK_BYTES, split on paragraph boundaries within that section.

**Paragraph splitting algorithm:**
1. Split section on blank lines (`\n\n`)
2. Accumulate paragraphs into chunks up to MAX_CHUNK_BYTES
3. Each chunk includes the section heading for context
4. Minimum: at least 1 paragraph per chunk

**Test assertions:**
- A markdown file under 64KB produces 1 chunk
- A markdown file with 3 sections of 40KB each produces 3 chunks (one per section)
- A single section of 100KB splits on paragraph boundaries into 2 chunks
- Heading context is included in each chunk of a split section
- Reassembled output matches original content

### Incremental section batching

**Current:** All changed sections batched into one Gemini prompt (no size limit).

**New:** If the total byte size of TRANSLATE sections exceeds MAX_CHUNK_BYTES, split into multiple Gemini calls. Each call includes relevant CONTEXT sections for translation quality.

**Test assertions:**
- 5 small changed sections (total 10KB) produce 1 Gemini call
- 3 large changed sections (total 200KB) produce multiple calls
- CONTEXT sections are included in each call for quality
- All translated sections are available for assembly

---

## Part 3: Commit Strategy

### Goal

Protect the target branch from partial failures while preserving crash safety during long-running translations.

### Temp branch pattern

1. Pipeline creates `tmp-intl/run-MMDD-HHMM` as the working branch
2. All commit-as-you-go writes go to this branch (crash safety)
3. As each language completes all its files, immediately squash that language's commits into one
4. After ALL languages complete: merge temp branch into target branch
5. On success: delete temp branch
6. On failure: temp branch preserved with partial progress, target branch untouched

### Target branch

- Default: `intl/pending` (or user-specified via `TARGET_BRANCH`)
- Never receives partial work directly
- Only receives merged results from successful runs

### Per-language squashing

When a language completes:
1. Collect all blob SHAs committed for that language (tracked by `SharedCommitter`)
2. Create a single tree containing all files for that language
3. Create one commit: `i18n(lang): translate N files`
4. Log completion

**Squash triggers per-language, not at end of run.** This means:
- If ko finishes before es, ko is squashed immediately while es continues
- The squashed commit is on the temp branch
- Final merge to target happens after all languages are squashed

### Progress tracking

Per-language state:
```
pending -> in_progress -> complete
```

Log entry on language completion:
```
[pipeline] [ko] Complete: 5 files, 12,450 input tokens, 8,200 output tokens
[pipeline] [ko] Squashed to 1 commit
```

### Test assertions

- Single language run: temp branch created, 1 squashed commit, merged to target, temp deleted
- Multi-language run: each language squashed independently, final merge has N commits (one per language)
- Failed run: temp branch exists with partial commits, target branch unchanged
- Zero-drift run: no temp branch created, no commits

---

## Part 4: Implementation order

1. **Chunking** -- byte-size-aware splitting (can test independently with unit tests)
2. **Commit strategy** -- temp branch + per-language squash (needs GH Action test)
3. **Concurrency** -- task pool (builds on both chunking and commit strategy)

Each phase should have tests passing before moving to the next.

---

## What this spec does NOT cover

- PR creation (separate workflow step, post-merge)
- Glossary loading (already implemented)
- Sanitization (already implemented, runs post-translation)
- Manifest generation (already implemented)
- Retry logic for individual Gemini calls (already implemented in `callGeminiRaw`)
