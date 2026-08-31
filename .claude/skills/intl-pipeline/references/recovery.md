# Pipeline Recovery — When Things Break

Load this when "the pipeline did something wrong" — bad translation in production, corrupted manifests, build failure on a locale, pending PR stuck. Triage with the matrix below; details follow.

## Triage matrix

| Symptom | First check | Likely fix |
|---|---|---|
| Run reported "success" but content looks incomplete | Read the PR body's "N task(s) failed" block + grep the log | "Success" ships partial failures; see "Diagnosing a completed run" below |
| Lots of content changed but few/no manifests in the PR diff | Content and manifests desynced (manifest drift) | See "Manifest drift after a run" below |
| Translation looks wrong, not yet merged | Is it a glossary deviation? | Re-run pipeline targeting that file+locale; auto-fix should correct |
| Translation already merged to `dev`, looks wrong | Is the English version up to date? | Re-run with `mode: full` for that file |
| Manifest file is invalid / missing | One of the two manifests gone? | Delete both manifests for that file+locale; pipeline auto-runs full mode |
| Build fails on a locale (MDX compile error) | Is it the sanitizer's fault or content? | Triage MDX error → fix sanitizer (test-first) OR scope-fix the affected file |
| `intl/pending-{base}` PR has merge conflicts on base side | Was base force-pushed/rebased? | Don't rebase pending; merge base→pending again, or close pending and start fresh |
| LLM returned garbage / refused | Check `finishReason` in logs | See "LLM returned garbage / refused" below |
| English-locale structural mismatch (locale missing inline element vs English) | Look at the manifest's element mapping | Re-run `mode: full` for that file; pipeline regenerates from scratch |
| Hand-edit slipped through review | Was it pre- or post-English-change? | If pre-: leave it, manifest still valid. If post-: re-run pipeline; will overwrite OR conflict |

## Diagnosing a completed run

A run finished. Before trusting it, audit it — a green "success" conclusion can still hide skipped files (RECITATION etc.). This is the recipe; it's faster than reading the whole log top-to-bottom.

**1. Read the PR body first.** The pipeline's PR body carries the per-run summary and a "N task(s) failed" block with copy-paste rerun commands. That block is the authoritative list of what did NOT translate. (If the PR step itself failed — see "PR body too large" below — the body may be a hand-written recovery summary instead.)

**2. Grep the log for the high-signal lines** (logs are huge; the head is just ~30k-file checkout noise — grep, don't scroll):

```bash
gh run view <run-id> --log > /tmp/run.log
grep -iE "\[ERROR\]|##\[error\]|RECITATION|finishReason|Failed to update ref|Merge conflict|TARGET_PATH|task\(s\) failed" /tmp/run.log
# RECITATION victims (discount large chunked files like apis/json-rpc — chunk fan-out inflates counts):
grep -oE "file=public/content/[^ ]+ lang=[a-z-]+" /tmp/run.log | sort | uniq -c | sort -rn
```

**3. Verify content/manifest parity on the branch** (catches manifest drift — see next section):

```bash
git fetch origin
git diff --name-only origin/dev...origin/intl/pending-dev > /tmp/changed.txt
grep -c "content/translations/.*\.md$" /tmp/changed.txt     # translated markdown
grep -c "^src/intl/.*\.json$" /tmp/changed.txt              # translated JSON (minus manifests)
grep -c "^\.manifests/.*source\.json$" /tmp/changed.txt     # source manifests
grep -c "^\.manifests/.*translation\.json$" /tmp/changed.txt # translation manifests
```

Healthy run: every translated content file has a matching `.manifests/<destPath>/source.json` (+ `translation.json` where placeholders apply). Manifests live in `.manifests/{destPath}/` — NOT next to the locale file. If content counts vastly exceed manifest counts, you have drift.

Error-string -> source map (where to look when a signature appears):

| Log signature | Source |
|---|---|
| `Failed to update ref` / squash errors | `lib/github/commits.ts` (`SharedCommitter`) |
| `Key set mismatch` / `Suspiciously short` / refusal | `lib/llm/output-validation.ts` |
| `FINISH_REASON` / `RECITATION` | `lib/llm/gemini.ts` |
| PR body assembly / length | `lib/workflows/pr-creation.ts` |
| rate-limit backoff (403/429) | `lib/utils/fetch.ts` |

## Manifest drift after a run

**Symptom:** the PR diff shows many translated content files but few/no `.manifests/` updates (content/manifest parity check in step 3 above fails badly).

**What it means:** content shipped without its manifest. The manifest still reflects the pre-run English state, so the NEXT run sees those files as still-needing-translation and re-translates all of them — a churn loop that also blocks running the pipeline on every merge.

**Historical cause (FIXED):** a `SharedCommitter` ref race — guarded since by `tests/unit/intl-pipeline/commit-ref-race.spec.ts`. Fresh drift therefore means a NEW throw point between a content commit and its manifest commit in `main.ts` (`runFullTranslation`/`runIncremental`), not the committer.

**Recovery for a branch already in a drift state:** the content on the branch is correct, only the manifests are stale. Cheapest correct path is to discard and re-run clean; the alternative is a `stamp_only` pass to regenerate the missing manifests against the committed content, which is fragile and only worth it to preserve an expensive run.

## PR body too large

**Symptom:** the run translates fine but the pipeline's own PR-creation step fails because the auto-generated body (which lists every changed file) exceeds GitHub's 65,536-char limit. Common on full-tree runs (~900+ files).

**Recovery:** open the PR manually with a consolidated summary (per-language + per-area counts, omit the per-file list), pointing at the run. The translations are already committed to `intl/pending-{base}`; only the PR-body generation failed. Durable fix: cap/clip the body in `lib/workflows/pr-creation.ts`.

## Wedged pending branch (`intl/pending-intl-pending-*`)

**Symptom:** runs fail at the pre-flight merge gate with a doubled branch name like `intl/pending-intl-pending-dev`, and dispatch retries keep cancelling each other under the workflow's concurrency group.

**Cause:** a run was dispatched with a `target_branch`/base that produced a doubled `intl/pending-` prefix; that branch has conflicts so every retry aborts.

**Recovery:** delete the wedged branch, then re-run with the correct (blank or `dev`) base so the target resolves to plain `intl/pending-dev`.

## Bad translation (not yet merged)

The pending PR has a wrong translation. Causes: bad Gemini output, missing ETHGlossary term, false-positive sanitizer fix, prompt context confusion.

**Fix:** re-run the pipeline targeting the specific file+locale. New commit overwrites the bad translation on the pending branch.

```bash
gh workflow run intl-pipeline.yml \
  -f target_path="public/content/some-page/index.md" \
  -f target_languages="ja"
```

If the issue is a glossary deviation, the auto-fix step in `/review-translations` will catch it. If the issue is something the policy doesn't yet cover, the right fix is upstream — either add the term to ETHGlossary or correct the per-language entry there.

## Bad translation (already merged to dev)

The bad translation made it past review and is now on `dev`. The next pipeline run won't notice because the manifest matches the (bad) locale state.

**Fix:** re-run with `mode: full` for that file.

```bash
gh workflow run intl-pipeline.yml \
  -f target_path="public/content/some-page/index.md" \
  -f target_languages="ja" \
  -f mode="full"
```

`mode: full` ignores manifest state and regenerates from scratch.

## Corrupted manifests

Either manifest file is malformed, missing, or out-of-sync with the locale content (e.g., hand-edited locale + stamped manifest no longer matches).

**Fix:** delete the manifest files for the affected file+locale. The pipeline auto-detects "no manifest" and runs full translation, regenerating both manifests.

```bash
rm -r .manifests/public/content/translations/ja/some-page/index.md/
gh workflow run intl-pipeline.yml -f target_path=public/content/some-page/index.md -f target_languages=ja
```

**Important:** delete BOTH manifests if you delete one. The translation manifest is meaningless without its source manifest companion.

## Nuclear recovery

Worst case: a whole locale is corrupted, or you want a clean sweep for a language.

**Fix:** delete all manifests for that locale and re-run full.

```bash
rm -rf .manifests/public/content/translations/ja .manifests/src/intl/ja
gh workflow run intl-pipeline.yml -f target_languages=ja -f mode=full
```

This is expensive (full retranslation of the language) but always safe. Equivalent to a fresh translation sweep.

## Build failure on a locale

`pnpm build` fails for a specific locale; English builds fine. Almost always one of:

1. **MDX syntax error** — raw `<` before numeric, unclosed backtick, orphaned closing tag, JSX attribute with inner unescaped quote. The sanitizer should have caught it; if it didn't, that's a sanitizer bug.
2. **Translated href** — internal link translated (e.g., `/governance` → `/gobernanza`); the destination doesn't exist.
3. **Missing component import** — locale references a JSX component the English doesn't (or vice versa); structural drift the pipeline missed.

**Fix:**

- Run `/fix-sanitizer-bug --language={lang} --issue="..."` if the pattern is a sanitizer gap
- Otherwise: scoped manual fix on the specific file. The manifest stays valid as long as the fix doesn't propagate an English change (see `references/non-english-edits.md`).

For systemic patterns: file a sanitizer test research entry in `docs/solutions/integration-issues/sanitizer-test-research.md` and add a sanitizer fix function (test-first).

## Pending branch stuck

The `intl/pending-{base}` PR has merge conflicts you can't resolve, or the branch's history looks wrong.

**Do NOT:** rebase, squash, or force-push `intl/pending-{base}`. The pipeline depends on its history. Force-pushing breaks future drift detection because the manifests on pending refer to specific commits.

**Options:**

- If base moved forward cleanly (no conflicts with pending's translations): the next pipeline run will merge base→pending automatically.
- If there's a real conflict (someone hand-edited a locale on base, conflicting with pending's translation of the same file): close the pending PR without merging, delete the pending branch, re-run the pipeline. It creates a fresh pending from current base and translates the delta from there.

```bash
# Close pending PR (after confirming no work is lost)
gh pr close --delete-branch <pending-pr-number>
gh workflow run intl-pipeline.yml -f target_languages=<affected-langs>
```

## LLM returned garbage / refused (`finishReason`)

The Gemini adapter at `src/scripts/intl-pipeline/lib/llm/gemini.ts` checks `response.candidates[0].finishReason` after every call and handles retries. Non-STOP finish reasons are logged at WARNING level — search workflow logs for `FINISH_REASON` if a section seems to be missing translation output. Values to know:

- `STOP` — normal completion
- `MAX_TOKENS` — output truncated; section probably too large. Chunking in `src/scripts/intl-pipeline/lib/llm/json-batcher.ts` should handle it, but adversarial cases can slip through; re-running with `mode: full` for that file forces a fresh chunking pass.
- `SAFETY` — content filter blocked it. Safety settings are `BLOCK_NONE` in the adapter, but blocks can still trigger on some edge content (mining/attack descriptions in certain non-Latin languages). If `BLOCK_NONE` doesn't help, the prompt or content needs rework, not the safety settings.
- `RECITATION` — model declined to reproduce training data. **Deterministic per file+language**, NOT transient: the adapter retries the byte-identical prompt up to 3x and gets the identical `RECITATION` every time (`tokens_out=0`), then gives up. The file+lang is then skipped — it ships untranslated (keeps its prior/English state), is recorded as a failed task, and listed in the PR body's failure block. Restarting the whole run will hit the exact same combos. Recurring victims are long reference docs (consensus-mechanisms `pos`/`poa`, `defi`, `ethash`, whitepaper) in fr/es/pt-br. The real fix is upstream of a plain retry: mutate before retrying (smaller chunks, secondary model, reworded prompt) or accept the skip and handle those files out-of-band. Don't burn time expecting a re-run to clear them.
- `OTHER` — bucket catchall. Log shows full response; debug case-by-case.

For one-off malformed output, just re-run. For systemic failures, scope down to a single file+locale, copy the LLM call from the logs, and reproduce locally (prompt contamination from a neighboring section usually clears on re-run; if not, isolate to one section and bisect).

## Hand-edit damage assessment

Someone hand-edited a translated file. The fork is "was English unchanged when the edit happened?" — pre-English-change edits are fine, post-change edits desync the manifest. Full decision tree and the `stamp_only` procedure: `references/non-english-edits.md`.
