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
MAX_CHUNK_BYTES = 32_768  (32KB)
```

At ~4 chars/token (English), 32KB = ~8K tokens input. With CJK at ~1-2 chars/token, 32KB = ~16-32K tokens input. Sized in tandem with `GEMINI_TIMEOUT_MS` (5 min) so high-expansion target languages (sw, ur, ar at ~1.5x output:input) produce output well within the timeout window. Deliberately conservative: more calls, fewer failures.

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

- A JSON file with 50 keys averaging 2KB each (~100KB total) splits into multiple chunks, each within MAX_CHUNK_BYTES
- A JSON file with 3 keys where one value is 200KB produces 3 chunks (one per key)
- A JSON file under MAX_CHUNK_BYTES produces 1 chunk (no splitting)
- Key order is preserved across chunks
- Merged output matches original structure

### Markdown prose chunking (enhancement to current approach)

**Current:** Split at heading boundaries when > 40,000 chars (`PROSE_SIZE_THRESHOLD`).

**New:** Replace `PROSE_SIZE_THRESHOLD` with `MAX_CHUNK_BYTES` (32KB). Additionally, if a single section exceeds MAX_CHUNK_BYTES, split on paragraph boundaries within that section.

**Paragraph splitting algorithm:**

1. Split section on blank lines (`\n\n`)
2. Accumulate paragraphs into chunks up to MAX_CHUNK_BYTES
3. Each chunk includes the section heading for context
4. Minimum: at least 1 paragraph per chunk

**Test assertions:**

- A markdown file under MAX_CHUNK_BYTES produces 1 chunk
- 3 sections each sized so they each fit in their own chunk produce 3 chunks (heading-boundary splits)
- A single section of 100KB splits on paragraph boundaries into 2 chunks
- Heading context is included in each chunk of a split section
- Reassembled output matches original content

### Incremental section batching

**Current:** If the total wire size of TRANSLATE sections exceeds MAX_CHUNK_BYTES, split into multiple Gemini calls. Each call carries up to MAX_CONTEXT_BYTES of CONTEXT sections for translation quality.

Three rules make this bounded, all learned from run 31149083965 ($1,108 for 42KB of new text — see `.claude/skills/intl-pipeline/references/gotchas.md`):

1. **TRANSLATE content gets the whole chunk budget.** CONTEXT is replicated into every batch, so its size must NOT be subtracted from the per-batch budget. Doing so floors the budget at 1 byte for any file whose existing translation exceeds MAX_CHUNK_BYTES, which degenerates to one call per changed section, each carrying the whole file.
2. **CONTEXT is capped, not complete.** At most MAX_CONTEXT_BYTES per batch, selected as the sections nearest in document order to that batch's TRANSLATE sections. Terminology consistency comes from the glossary, not from context volume.
3. **Batching measures wire bytes, not content bytes.** Each section is wrapped in a `<SECTION id=".." action=".." heading="..">` envelope that repeats the id twice — ~134 bytes for a JSON leaf with a long key path, which exceeds the content itself for small keys. Content-only accounting produced a 102KB prompt from a "32KB" batch on `learn-quizzes.json`. See `sectionWireBytes`.

**Test assertions:**

- 5 small changed sections (total 10KB) produce 1 Gemini call
- 3 large changed sections (total 200KB) produce multiple calls
- CONTEXT sections are included in each call for quality
- All translated sections are available for assembly
- 89KB of CONTEXT with 488 small TRANSLATE sections produces `ceil(translateWireBytes / MAX_CHUNK_BYTES)` calls, NOT one per section
- Per-batch CONTEXT never exceeds MAX_CONTEXT_BYTES
- When context must be dropped to fit, the sections nearest the batch survive

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

## Part 4: Spend bounds

### Goal

No run can cost materially more than the content it translates, whatever a future code path does wrong. Bounds are input-side because prompt bytes are assembled locally and therefore knowable before any request; output cannot be predicted, but it is a translation of what we sent and is capped by `GEMINI_TIMEOUT_MS`.

### The bounds

| Bound            | Value                                                              | Enforced                                                                                           |
| ---------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Per call         | `MAX_PROMPT_BYTES` (64KB)                                          | `callGeminiRaw`, before the request                                                                |
| Per file+locale  | `ceil(translatableWireBytes / MAX_CHUNK_BYTES) x MAX_PROMPT_BYTES` | `createFileBudget`; the assembled plan is checked before the first request, then charged per batch |
| Batches per file | `MAX_BATCHES_PER_FILE` (32)                                        | before assembly                                                                                    |
| Whole run        | `RUN_FUSE_USD` ($100, `INTL_MAX_COST_USD`)                         | before each request                                                                                |
| Provider account | OpenRouter key credit limit, optionally daily                      | server-side, 402                                                                                   |

The per-file bound is the primary one: a run's total legitimately scales with how many files and locales are in scope, so a run cap either blocks real work or is set uselessly high. Work per file does not scale that way. The denominator is the content being translated, never the file's size — a two-word change in a 200KB file gets one chunk's budget.

Retries are not charged against the file budget: they re-send the same prompt, are capped at `MAX_RETRIES` per call, and a retry storm is the run fuse's job. Charging them would fail a legitimate file for one flaky call.

`MODE=full` is bounded by construction rather than by a file budget: `chunkJson` / `chunkProse` partition the content into disjoint chunks, so total prompt bytes are file size plus per-chunk boilerplate, times at most `MAX_SPLIT_DEPTH` on retry splitting.

### Test assertions

- A plan that exceeds its file budget throws before any request, naming the file and locale
- A plan within budget does not throw, and each of its prompts is under the per-call ceiling
- The run fuse trips before the call that would cross it, using the provider's reported cost when available
- Replaying commit `3c76f545` (the incident tree) through the planner yields fewer than 10 batches per locale, all within budget, while the same budget refuses the 62MB that run actually sent

### Estimating without spending

`MODE=estimate` (`pnpm intl:estimate`) assembles every prompt a run would send, sends none, and reports projected prompt bytes, request counts, estimated tokens and cost, and the budget verdict per file+locale. It exits 1 if any plan would be refused. Planning lives in `lib/llm/plan.ts` and is shared with the pipeline, so the estimate is the run's own arithmetic rather than a parallel implementation.

---

## Part 5: Implementation order

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
