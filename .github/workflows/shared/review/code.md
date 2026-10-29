# Lane: code

Run `/code-review` at **medium** effort.

For a bug fix, list every code path that produces the symptom, not only the one the PR names. A path the fix misses is `should fix`. `docs/solutions/` notes can be stale; trust the code over them.

Then check the changed lines against the conventions in `AGENTS.md`. Comment bloat (multi-line explanations, design history) is a `nit`.

Report bar: `should fix` or higher needs a concrete wrong behaviour. Convention violations are nits unless they break something.
