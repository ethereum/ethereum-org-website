# Runbook: Fix Sanitizer Bug

When you have a confirmed sanitizer bug — a translation pattern that should be auto-corrected but isn't, or a false positive that corrupts content — run the `/fix-sanitizer-bug` slash command (`.claude/commands/fix-sanitizer-bug.md`). The command is the canonical workflow: flags, triage (fix / warn / document-only), test-first implementation, verification. This runbook only covers when to reach for it and the pitfalls that survive the guardrails.

## When to invoke

- A translation review surfaced a recurring pattern the sanitizer should handle
- A locale build fails on an MDX-syntax issue that matches a known sanitizer pattern but isn't being caught
- A new Gemini output artifact appears across multiple languages and warrants programmatic detection
- An existing sanitizer fix has a false-positive on a specific language

When NOT to invoke:

- The issue is a one-off (single file affected) — fix it manually, document in `sanitizer-test-research.md` if pattern-worthy
- The issue is at the LLM level (Gemini's output is fine, sanitizer over-corrected) — that's a fix to the existing function, not a new function
- The issue is at the policy level (ETHGlossary entry is wrong) — that's an ETHGlossary PR, not a sanitizer change

## Common pitfalls

- **Forgetting the code-block split** — the most common review reject. The pattern MUST be the first operation in any text transformation, even if it feels redundant for a fix that "would never match inside code anyway."
- **Running the sanitizer unscoped** — processes thousands of files, hangs for 30+ minutes. Always scope: per-file via `runSanitizer(filesWithContent)`, or at minimum per-language via `TARGET_LANGUAGES=ja`.
- **Adding a fix without a test** — sanitizer tests are the contract. No test → no merge.
- **False-positive across languages** — a fix tuned for one language may break another. Always spot-check at least 2-3 other languages on the same file.
- **MDX build not run** — if the fix touches angle brackets, backticks, JSX, or quoting, the locale build needs to pass. Don't skip the build-verification step for those cases.
