# Review Gotchas (Long Tail)

Patterns and pitfalls during translation review that aren't in the SKILL.md's inline section but come up enough to warrant their own reference.

## `gh` CLI in Claude Code sandbox

`gh` commands require `dangerouslyDisableSandbox: true` due to the sandbox's TLS proxy breaking HTTPS connections to `api.github.com`. Git commands work fine in sandbox (SSH protocol). If `pnpm install` or `pnpm build` fail with network/filesystem sandbox errors, retry those specific commands with `dangerouslyDisableSandbox: true`.

## Worktree must be on the named PR branch, never detached HEAD

`/review-translations` Phase 1 creates a worktree at `.worktrees/pr-{PR_NUMBER}` on the PR's named branch. Don't bypass this — the build verification step depends on the named branch being checked out. Detached HEAD breaks Netlify preview lookup and confuses subsequent merge-base calculations.

## Incremental review vs full PR diff

By default, `/review-translations` reviews only files changed since the last LLM review of the PR (detected via the most recent submitted PR Review's `commit_id`). Pass `--full` to override and re-review the full PR diff.

If the prior review's `commit_id` is unreachable (e.g., force-push, rebase), the command falls back to full PR diff with a warning. Don't manually delete prior reviews to "force" a full review — use `--full` instead.

## Phase 8 writes per-language findings; don't skip

The Phase 8 update to `.claude/translation-review/per-language/{lang}.md` is the mechanism by which prior findings inform future reviews. Skipping it means each review starts cold. Even if findings are slim, append the quality-score row at minimum.

## ETHGlossary cache is not session-persistent

`/review-translations` fetches `/llms.txt` and per-file `/filter` results on every run. No long-term cache. Don't assume yesterday's lookup is still valid — language data can change as terms are added/refined upstream.

## Reading the prior submitted PR Review for `commit_id`

The command looks for the most recent PR Review whose body matches a translation-review pattern (contains "Translation Quality Review" heading, mentions multiple language codes, contains a scoring table, mentions glossary/ETHGlossary, or is signed by Claude). Bodies like "LGTM" or "approved" must NOT match.

If you're hand-submitting a review, follow the format in `.claude/commands/review-translations.md` Phase 7 so future incremental reviews can find your `commit_id`.

## `--approve` vs `--comment` on the PR review

- Use `--approve` only when the review found **zero critical issues** (whether none existed or all were auto-fixed in this run).
- Otherwise use `--comment`.
- Never use `--request-changes` — the pipeline output isn't subject to GitHub's request-changes flow.

## Submitting via `gh pr review`, not `gh pr comment`

Translation reviews MUST be submitted as proper PR Reviews (via `gh pr review`), not issue comments (`gh pr comment`). Why: the next incremental review reads each PR Review's GitHub-attached `commit_id`. Issue comments don't carry a `commit_id` and would break the incremental flow.

## Review body uses a temp file, not heredoc

```bash
gh pr review ${PR_NUMBER} --comment --body-file "$TMPDIR/pr-review-${PR_NUMBER}.md"
```

`--body` heredoc has issues with backticks inside markdown code-fence examples. Always write the body to a temp file first.

## Build verification is opt-in

`--build-local` runs a scoped `pnpm build` for the language. `--netlify-check` checks the Netlify deploy preview. Default behavior: neither runs.

If the review found MDX-syntax-related critical issues, run at least one of these before declaring the review complete. The auto-fix should resolve them; the build verifies.

## Sandbox memory limits

`NEXT_PUBLIC_BUILD_LOCALES=en,{LANG} pnpm build` can hit memory limits even when scoped to two locales. If the build OOMs, increase Node memory:

```bash
NODE_OPTIONS=--max-old-space-size=8192 NEXT_PUBLIC_BUILD_LOCALES=en,{LANG} pnpm build
```

8GB usually suffices; some content-heavy locales may need more.

## Glossary lookups: full vs filtered

- `/filter` returns terms appearing in a specific English source file. Pulls only relevant terms into context. **Use this per file** during review.
- `/translations/{lang}` returns the entire language glossary (500+ terms). **Use only when scoring or doing cross-file analysis** that needs every term.

Loading the full glossary on every file lookup bloats context and slows the agent.

## "Compound learnings" via `/workflows:compound`

If a review surfaces a recurring issue worth documenting for the team, `/review-translations` Phase 8 may invoke `/workflows:compound` to capture the learning. Use when:

- A new pattern emerges that affects multiple PRs
- A sanitizer gap is identified
- A glossary entry needs upstream attention

Skip when:

- Issue is a one-off
- Pattern is already in `known-patterns.md` or `sanitizer-test-research.md`

## Code-comment translation is allowed (don't flag)

Inside code fences:

- **Functional code** (identifiers, strings, config keys, console output, error messages emitted by code): stays English. Flag if translated.
- **Comments** (`//`, `/* */`, `#`, `--`): MAY be translated. Don't flag.

Most reviewers initially flag translated comments. Don't.

## Cross-language flag deduplication

If multiple languages exhibit the same pattern (e.g., 4 languages all have the same JSX attribute quote issue), report it once per language but consolidate in the "patterns" section of the report so the reader doesn't see redundant findings.

## See also

- `references/known-patterns.md` for the pattern catalog
- `references/scoring-rubric.md` for scoring details
- `references/critical-vs-warning.md` for severity
- `.claude/commands/review-translations.md` for the slash command's phase-by-phase logic
