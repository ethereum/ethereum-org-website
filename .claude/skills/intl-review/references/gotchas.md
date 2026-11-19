# Review Gotchas (Long Tail)

Patterns and pitfalls during translation review that aren't in the SKILL.md's inline section but come up enough to warrant their own reference. Phase-by-phase mechanics (worktree setup, incremental scope, PR-review submission, `--approve` vs `--comment`) live in `.claude/commands/review-translations.md` — this file only covers what the command doesn't.

## `gh` CLI in Claude Code sandbox

`gh` commands require `dangerouslyDisableSandbox: true` due to the sandbox's TLS proxy breaking HTTPS connections to `api.github.com`. Git commands work fine in sandbox (SSH protocol). If `pnpm install` or `pnpm build` fail with network/filesystem sandbox errors, retry those specific commands with `dangerouslyDisableSandbox: true`.

## Sandbox memory limits

`NEXT_PUBLIC_BUILD_LOCALES=en,{LANG} pnpm build` can hit memory limits even when scoped to two locales. If the build OOMs, increase Node memory:

```bash
NODE_OPTIONS=--max-old-space-size=8192 NEXT_PUBLIC_BUILD_LOCALES=en,{LANG} pnpm build
```

8GB usually suffices; some content-heavy locales may need more.

## ETHGlossary cache is not session-persistent

`/review-translations` fetches `/llms.txt` and per-file `/filter` results on every run. No long-term cache. Don't assume yesterday's lookup is still valid — language data can change as terms are added/refined upstream.

## Phase 8 writes per-language findings; don't skip

The Phase 8 update to `.claude/translation-review/per-language/{lang}.md` is the mechanism by which prior findings inform future reviews. Skipping it means each review starts cold. Even if findings are slim, append the quality-score row at minimum.

## Cross-language flag deduplication

If multiple languages exhibit the same pattern (e.g., 4 languages all have the same JSX attribute quote issue), report it once per language but consolidate in the "patterns" section of the report so the reader doesn't see redundant findings.

## Compound learnings

`/review-translations` Phase 8 may invoke the `compound-engineering:workflows:compound` skill (compound-engineering plugin, if installed) to capture a learning. Use when a new pattern affects multiple PRs, a sanitizer gap is identified, or a glossary entry needs upstream attention. Skip for one-offs or patterns already in `known-patterns.md` / `sanitizer-test-research.md`.
