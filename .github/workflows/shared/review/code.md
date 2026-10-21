# Lane: code

Run `/code-review` at **medium** effort.

If the PR fixes a bug, check whether the bug still exists on the base branch: grep config (`next.config.js`), shared getters (`src/lib/data/`) and `docs/solutions/` (which can be stale).

- Base fully fixes it: `blocking`, naming the commit that fixed it.
- Base fixes part of it: say what is already fixed, what the PR still adds, and whether the description is now stale.

For a bug fix, list every code path that produces the symptom, not only the one the PR names. A path the fix misses is `should fix`.

Then check the changed lines against the conventions in `AGENTS.md` (loaded as your project instructions). Comment bloat (multi-line explanations, design history) is a `nit`.

Do not report what lint, type-check or Prettier already catch.
