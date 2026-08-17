# Runbook: a cost guard tripped

Load when a run logs `[cost-guard]`, when a file is skipped for budget, or when deciding whether a projected cost is legitimate.

## Background: what went wrong once

Run [31149083965](https://github.com/ethereum/ethereum-org-website/actions/runs/31149083965) (2026-08-07) cost **$1,108** translating 42KB of new text, and **succeeded** — so nothing alerted, and it was found five days later during a billing review.

Eight quiz PRs added 488 new keys to `src/intl/en/learn-quizzes.json`, a file that already had 744 translated strings in every locale. A file with an existing translation takes the _incremental_ path regardless of how new its content is, so the 488 new keys became TRANSLATE sections and the 744 existing ones CONTEXT. `batchSections` then computed:

```js
const translateBudget = Math.max(maxBytes - contextBytes, 1) // max(32768 - 89513, 1) = 1
```

CONTEXT is replicated into every batch, so subtracting it from a per-batch budget is a category error. With 89KB of context the subtraction went negative and the `Math.max(…, 1)` minimum-guarantee floor clamped it to 1 byte, so every section opened its own batch carrying the whole existing translation: 488 calls per locale x 24 locales = 11,712 requests, 549M input tokens, ~129KB of prompt returning ~40 output tokens each.

The failure mode gets _worse_ as translation coverage improves, which is why it stayed cheap for months.

## The bounds now in place

| Bound            | Value                                                              | Where                                                  |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| Per call         | `MAX_PROMPT_BYTES` (64KB), unless the content is irreducible       | `callGeminiRaw`, before the request                    |
| Per file+locale  | `ceil(translatableWireBytes / MAX_CHUNK_BYTES) x MAX_PROMPT_BYTES` | `createFileBudget`, checked against the assembled plan |
| Batches per file | `MAX_BATCHES_PER_FILE` (32)                                        | `buildGeminiTranslator`                                |
| Whole run        | `RUN_FUSE_USD` ($100, `INTL_MAX_COST_USD`)                         | `reserveForCall`, before each request                  |
| Provider account | OpenRouter key credit limit                                        | server-side, 402                                       |

All input-side, because prompt bytes are assembled locally and knowable before sending; output is a translation of what we sent and is capped by `GEMINI_TIMEOUT_MS`.

**The ceiling refuses prompts we could have made smaller, not content that cannot be split.** A single section or chunk already past `MAX_CHUNK_BYTES` is as small as that call gets -- `public/content/developers/docs/evm/opcodes/index.md` has one 68KB section (the opcode table) that no chunker can divide without breaking it. Such calls are sent at whatever size they are (`isIrreducibleChunk`, `PlannedBatch.irreducible`). Everything else must fit, and the planner enforces that by building the real prompts, measuring them, and shrinking the content budget until they do -- rather than predicting a size from a budget, which is how the first version of this missed the prompt's `Sections to translate:` id list by 307 bytes.

Prompt overhead (rules + glossary + capped context) is absorbed by that tightening. Today's heaviest real glossary is 184 terms / 16.4KB (`learn-quizzes.json` / ar), which fits with room to spare; overhead past roughly 53KB leaves less than `MIN_CONTENT_BUDGET_BYTES` for content and the file is refused with the glossary size named. Nothing trims or reorders glossary terms -- `/filter` already returns only terms present in the content.

Two accounting notes that matter when reading a log:

- **Thinking tokens are billed as output on both transports**, and they dominate the output bill for small incremental updates (~5,200 per call). `tokens_out` in the per-call log is the billable total on either provider, with `reasoning=` reported as a subset of it, not an addition.
- **The run fuse reserves worst-case cost for in-flight calls** (`reserveForCall`), because up to `GEMINI_CONCURRENCY` requests are outstanding at once and spend is only recorded when each resolves. Without the reservation every in-flight call could clear a fuse that one of them goes on to blow.

## Triage

### `[cost-guard] <file> (<locale>): N incremental batch(es) … over the … budget`

One file+locale was skipped; the rest of the run continued. Decide which case you are in:

1. **Genuinely large change** — a big new page, or a file whose English was restructured wholesale. Confirm with `MODE=estimate TARGET_PATH=<file> pnpm intl:estimate`: if the plan is a handful of batches and the projected cost is cents, the budget is simply tight for that shape. Rerun that file alone with `MODE=full`, which is bounded by disjoint chunking instead.
2. **Batching regression** — the error reports many batches (dozens or hundreds) for a modest amount of changed content, or the projected bytes are orders of magnitude above the budget. That is the incident's shape. Do not raise the limit; fix the batcher. `tests/unit/intl-pipeline/cost-incident.spec.ts` is the regression test.

Tell them apart by batches-per-changed-byte: a legitimate plan is roughly `changedWireBytes / 32KB` batches. Hundreds of batches for tens of KB is a bug.

### `[cost-guard] aborting run: $X spent … reached the $Y fuse`

The run stopped mid-flight; the temp branch is preserved and manifests were not stamped, so nothing is half-committed (see `references/recovery.md`). Before raising `INTL_MAX_COST_USD`, check input tokens per call in the log:

```
grep -o 'tokens_in=[0-9]*' <log> | cut -d= -f2 | sort -n | tail -5
```

Healthy is 4k–9k per call. Anything above ~50k means context is being resent per call — a bug, not a budget problem.

### `[cost-guard] prompt for … is N bytes, over the … ceiling`

A splittable prompt exceeded 64KB and reached the choke point anyway, which means the planner and the ceiling disagree -- the planner should have caught it (`overCeiling`) and refused the file first. Treat it as a bug in the planning path rather than a budget to raise.

### `[cost-guard] … cannot fit batches under the … per-call ceiling`

Prompt overhead has grown enough that tightening batches cannot make room: check the glossary term count in the message. Not a budget to raise.

### A task fails with a parse error

`parseIncrementalResponse` throwing fails that file+locale on purpose. Continuing would leave those sections untranslated, fall them back to English during assembly, commit that, and stamp the manifest -- after which no drift is detected and the English text is permanent. Every other locale's completed work is already committed to the temp branch and still merges; only this file+locale's calls are lost. A truncated response (`finish_reason: length`) is the usual cause.

## Estimating before running

```bash
pnpm intl:estimate                                             # whole tree, all locales
MODE=estimate TARGET_PATH=src/intl/en/learn-quizzes.json pnpm intl:estimate
MODE=estimate TARGET_LANGUAGES=ar,de pnpm intl:estimate
MODE=estimate ESTIMATE_MODE=full pnpm intl:estimate            # cost of a forced full run
```

Assembles every prompt, sends none, prints projected prompt bytes / requests / tokens / cost per file and the budget verdict. Exits 1 if any plan would be refused. Also available as `mode: estimate` on the workflow. Planning is shared with the pipeline (`lib/llm/plan.ts`) so the projection is the run's own arithmetic; token counts are byte-derived estimates and glossary bytes are not modelled.

## Provider selection

`LLM_PROVIDER=gemini` (direct) or `openrouter`. The workflow defaults to `openrouter`.

- **OpenRouter** — same models at list price, no inference markup, 5.5% on credit purchases. The key carries a server-side credit limit (set `limit` and `limit_reset: "daily"` when provisioning) and rejects with 402 once exhausted; credits are prepaid, so the account cannot exceed what is loaded. Each request sends `max_price` at our expected `$2/$12` so a routing change cannot raise the rate. Usage accounting is always on (the old `usage: {include: true}` flag is deprecated and ignored), so `usage.cost` and `completion_tokens_details.reasoning_tokens` come back on every call. Startup logs `limit` / `limit_remaining` and the reset window, and warns if the key has no limit.
- **Gemini direct** — no USD cap of any kind. GCP billing budgets alert, they do not stop. The only brake is a rolling 10-minute spend-rate limit by tier (Tier 1 $10, Tier 2/3 $200); the incident averaged ~$77 per 10 minutes and never came close. Startup warns about this explicitly.
- Safety settings (`BLOCK_NONE` for all four categories) are **not** sent through OpenRouter — there is no documented passthrough. Gemini 3 defaults the block threshold to Off, so it works, but it is an undocumented dependency. If empty responses or `finishReason=SAFETY` appear only on the OpenRouter path, that is the first thing to check.

## What not to do

- Do not raise `INTL_MAX_COST_USD` or the per-call ceiling to make a run pass. Both are calibrated ~30% above measured worst cases; hitting them means the call pattern changed.
- Do not restore the cron. The workflow is manual-dispatch only until the bounds have supervised runs behind them.
- Do not add an LLM call site that bypasses `callGeminiRaw` — it is the single choke point where the per-call ceiling and the run fuse are enforced.
