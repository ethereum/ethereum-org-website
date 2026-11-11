# Lane: code

Run `/code-review` at **medium** effort.

For a bug fix, list every code path that produces the symptom, not only the one the PR names. A path the fix misses is `should fix`. Trust the code over `docs/solutions/` notes, especially ones marked `status: historical`.

Load the skill for the area the PR changes and check against it: `design-system` for UI, `data-layer` for `src/data-layer/` and `src/lib/data/`, `performance` for images, caching, rendering mode or bundle size.

Then check the changed lines against the conventions in `AGENTS.md`. Comment bloat (multi-line explanations, design history) is a `nit`.

Report bar: `should fix` or higher needs a concrete wrong behaviour. Convention violations are nits unless they break something.
