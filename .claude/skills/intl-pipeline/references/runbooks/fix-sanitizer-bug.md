# Runbook: Fix Sanitizer Bug

When you have a confirmed sanitizer bug — a translation pattern that should be auto-corrected but isn't, or a false positive that corrupts content — use the `/fix-sanitizer-bug` slash command. This runbook describes the workflow it enforces.

## When to invoke

- A translation review surfaced a recurring pattern the sanitizer should handle
- A locale build fails on an MDX-syntax issue that matches a known sanitizer pattern but isn't being caught
- A new Gemini output artifact appears across multiple languages and warrants programmatic detection
- An existing sanitizer fix has a false-positive on a specific language

When NOT to invoke:

- The issue is a one-off (single file affected) — fix it manually, document in `sanitizer-test-research.md` if pattern-worthy
- The issue is at the LLM level (Gemini's output is fine, sanitizer over-corrected) — that's a fix to the existing function, not a new function
- The issue is at the policy level (ETHGlossary entry is wrong) — that's an ETHGlossary PR, not a sanitizer change

## The slash command

```
/fix-sanitizer-bug --language=ja --issue="Title attribute embedded quotes break parse" --file=public/content/translations/ja/some-page/index.md
```

Flags:

| Flag | Effect |
|---|---|
| `--language=CODE` | Target locale where the issue was spotted (ja, ko, fr, etc.) |
| `--issue="..."` | Brief description of the bug |
| `--file=PATH` | Specific file where the issue was spotted |
| `--skip-build` | Skip the build verification step (use for non-MDX-affecting fixes) |

## Workflow (what the slash command enforces)

1. **Gather context** — read the affected file and English source; capture the exact broken pattern verbatim. (Don't rely on a paraphrase.)
2. **Document the pattern** — append to `docs/solutions/integration-issues/sanitizer-test-research.md`'s "New Patterns" table.
3. **Triage: fix, warn, or document-only**:
   - **Fix** — pattern is regex-matchable, correct output is deterministic, safe across languages
   - **Warn** — pattern detectable but resolution needs judgment (e.g., translated hrefs)
   - **Document-only** — semantic issue, no reliable regex (e.g., word-choice mistakes)
4. **Write a failing test FIRST** in the appropriate spec file (see `references/sanitizer.md` for which file).
5. **Implement the fix** in `src/scripts/intl-pipeline/intl-sanitizer.ts`:
   - Function signature per category (fix / warn)
   - Code-block-split pattern is the FIRST operation
   - Word boundaries for brand-name patterns
   - `escapeRegex()` for dynamic regex
6. **Wire it in** to `processMarkdownFile` or `processJsonFile` via `applyFix` helper.
7. **Verify**:
   - Run all sanitizer tests (`npx playwright test --project=unit tests/unit/intl-pipeline/sanitizer/`)
   - Run the sanitizer on the affected file via `TARGET_FILES` (never on a whole language)
   - Spot-check 2-3 other languages on the same file
   - Run a scoped build if the fix touches MDX syntax (`NEXT_PUBLIC_BUILD_LOCALES=en,{LANG} pnpm build`)
8. **Update docs** — move the pattern from "New Patterns Not Yet Covered" to "Patterns Already Handled" in `sanitizer-test-research.md` with the function name.

## Common pitfalls

- **Forgetting the code-block split** — the most common review reject. The pattern MUST be the first operation in any text transformation, even if it feels redundant for a fix that "would never match inside code anyway."
- **Running the sanitizer unscoped** — processes thousands of files, hangs for 30+ minutes. Always use `TARGET_FILES`.
- **Adding a fix without a test** — sanitizer tests are the contract. No test → no merge.
- **False-positive across languages** — a fix tuned for one language may break another. Always spot-check at least 2-3 other languages on the same file.
- **MDX build not run** — if the fix touches angle brackets, backticks, JSX, or quoting, the locale build needs to pass. Don't skip the build-verification step for those cases.

## Quick reference

| Need | Path |
|---|---|
| Slash command source | `.claude/commands/fix-sanitizer-bug.md` |
| Sanitizer source | `src/scripts/intl-pipeline/intl-sanitizer.ts` |
| Pattern catalog | `docs/solutions/integration-issues/sanitizer-test-research.md` |
| Test files | `tests/unit/intl-pipeline/sanitizer/*.spec.ts` |
| Sanitizer overview | `references/sanitizer.md` |

## See also

- `references/sanitizer.md` for the general sanitizer reference (fix categories, structure, test files)
- `references/architecture.md` for where Phase 4 and the sanitizer sit in the pipeline
