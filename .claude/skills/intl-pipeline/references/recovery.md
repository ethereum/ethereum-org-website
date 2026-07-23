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
| LLM returned garbage / refused | Check `finishReason` in logs | Retry with same content; if persistent, file/Latinize the input and retry |
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

**Historical cause (FIXED):** the `SharedCommitter` used to advance the branch ref on every per-file commit. Under the task pool's concurrency those ref updates raced and returned `422 not a fast forward`; a content commit that threw on the 422 aborted before its manifest commit, and the end-of-run squash shipped the (already-recorded) content blob without the (never-recorded) manifest. Fix: `commitFile` now only creates+records a blob and never touches the ref; the squash force-updates once; per task, manifests are built before any blob is recorded so a builder error strands nothing. Guarded by `tests/unit/intl-pipeline/commit-ref-race.spec.ts`. If you see fresh drift on a run AFTER this fix, suspect a new throw point between a content commit and its manifest commit in `main.ts` (`runFullTranslation`/`runIncremental`), not the committer.

**Recovery for a branch already in a drift state** (e.g. PR #18471): the content on the branch is correct, only the manifests are stale. Cheapest correct path is to discard and re-run clean now that the cause is fixed (the job is a few dollars and a re-run validates the fix end to end); the alternative is a `stamp_only` pass to regenerate the missing manifests against the committed content, which is fragile and only worth it to preserve an expensive run.

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
rm public/content/translations/ja/some-page/index.md.manifest-source.json
rm public/content/translations/ja/some-page/index.md.manifest-translation.json
gh workflow run intl-pipeline.yml -f target_path=public/content/some-page/index.md -f target_languages=ja
```

**Important:** delete BOTH manifests if you delete one. The translation manifest is meaningless without its source manifest companion.

## Nuclear recovery

Worst case: a whole locale is corrupted, or you want a clean sweep for a language.

**Fix:** delete all manifests for that locale and re-run full.

```bash
find public/content/translations/ja -name "*.manifest-*.json" -delete
find src/intl/ja -name "*.manifest-*.json" -delete
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

## LLM returned garbage

Gemini occasionally refuses, returns empty, or returns malformed content. The adapter at `src/scripts/intl-pipeline/lib/llm/gemini.ts` already handles retries and finishReason inspection.

If you see persistent failures for a specific file+locale combination, common culprits:

- **Safety filter false-positive** — mining/attack/security content in some non-Latin languages triggers it. Safety settings are at `BLOCK_NONE` in the adapter; if you see filter blocks anyway, the prompt may need rephrasing.
- **Output token limit** — section too large; chunking in `src/scripts/intl-pipeline/lib/llm/json-batcher.ts` should handle it, but adversarial cases can slip through. Re-running with `mode: full` for that file forces a fresh chunking pass.
- **Prompt contamination** — context from a previous section bleeds in. Re-running typically resolves; if not, isolate to one section and bisect.

For one-off failures, just re-run. For systemic failures, scope down to a single file+locale, copy the LLM call from the logs, and reproduce locally.

## Hand-edit damage assessment

Someone hand-edited a translated file. To assess damage:

1. **Was the English side unchanged when the hand-edit happened?** If yes, the manifest's English→locale mapping is still valid. The next pipeline run treats the corrected locale content as canonical. No further action needed.
2. **Was the English side changed before the hand-edit?** Then the manifest is out-of-sync with reality. The next run will either re-translate over the hand-edit or produce a merge conflict. To resolve:
   - If the hand-edit reflects the correct translation, trigger `intl-pipeline.yml` with `stamp_only: true` to refresh manifests from current state. Safe only if no pending branch exists.
   - If the hand-edit is incomplete or wrong, delete the manifests and let the pipeline re-translate.

## What this reference does NOT cover

- Test-first workflow for adding a new sanitizer fix function (see `references/runbooks/fix-sanitizer-bug.md`)
- The orchestration model for `intl/pending-{base}` (see `references/orchestration.md`)
- The phase-by-phase pipeline architecture (see `references/architecture.md`)
- Managing translation review (see the `intl-review` skill)
