# Sanitizer

The post-import sanitizer normalizes translation outputs to fix Gemini-produced artifacts (BiDi mistakes, code-fence drift, brand-name mistranslations) and Crowdin-era residue. Source: `src/scripts/intl-pipeline/intl-sanitizer.ts`. Pattern catalog: `docs/solutions/integration-issues/sanitizer-test-research.md`. Tests: `tests/unit/intl-pipeline/sanitizer/`.

## When the sanitizer runs

- **Always** after Phase 4 (LLM translation) on each file+locale produced by the pipeline
- **On-demand** for targeted re-sanitization of existing locales — per-file only programmatically via `runSanitizer(filesWithContent)`; the only env-based scoping is per-language via `TARGET_LANGUAGES`
- **Per-file scope only** — never run across an entire language (hangs for 30+ min on thousands of files)

## Fix categories

Each fix function is one of:

| Category                              | Pattern                                                                 | Auto-correctable?                                |
| ------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| Brand-name mistranslations            | Gemini's transliteration of a brand differs from the canonical form     | Yes (auto-fix to canonical form per script_rule) |
| Code-fence drift                      | Translator put translated text inside ` ```python ` blocks              | Yes (split content / restore code)               |
| BiDi corruption                       | RTL languages: Latin tokens followed by punctuation flip direction      | Yes (wrap in `<span dir="ltr">`)                 |
| Backslash escaping                    | Translator inserts backslash before closing HTML tag (`\</strong>`)     | Yes (strip the backslash)                        |
| Asymmetric backticks                  | `` `code`` `` (single-open, double-close) — exposes raw HTML/JSX to MDX | Yes (rebalance)                                  |
| Backtick-wrapped markdown links       | `` `[text](/path)` `` — rendered as inline code instead of link         | Yes (strip backticks)                            |
| Orphaned closing tags                 | `</a>`, `</em>`, `</li>` without matching opener                        | Yes (strip the orphan)                           |
| Inner double quotes in JSX attribute  | `title="What is "X"?"` breaks attribute parsing                         | Yes (escape or downgrade to single quote)        |
| Junk text after heading anchors       | `{#section-id}translated-anchor-id` — Crowdin appended translated ID    | Yes (strip the junk)                             |
| Image path corruption                 | `./image.png` → `/.image.png`                                           | Yes (restore `./`)                               |
| Tilde range notation                  | `100~200` parsed as strikethrough by remark-gfm                         | Yes (convert to en-dash or `&#x7E;`)             |
| Translated GitHub `@username`         | `@axic` → `@kwaaxic`                                                    | Yes (revert)                                     |
| Crowdin `''text''` double apostrophes | Crowdin escaping artifact                                               | Yes (strip)                                      |
| Lorem ipsum placeholder               | Placeholder text left in translation                                    | No (flag as warning; manual review)              |
| Cross-script contamination            | Unexpected script characters (Devanagari in Turkish)                    | No (flag as warning; manual review)              |

## Adding a new fix function

Use the `/fix-sanitizer-bug` slash command (`.claude/commands/fix-sanitizer-bug.md`) — it is the canonical workflow and carries the implementation rules: code-block-split first, return shapes, `escapeRegex()`, word boundaries for brand names, `_testOnly` export, wiring via `applyFix`. When (not) to invoke it: `references/runbooks/fix-sanitizer-bug.md`.

## Test files

| File                                                              | Use case                                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------- |
| `tests/unit/intl-pipeline/sanitizer/standalone-fixes.spec.ts`     | Pure fix functions (no English source needed)            |
| `tests/unit/intl-pipeline/sanitizer/english-comparison.spec.ts`   | Fixes that need English source as input                  |
| `tests/unit/intl-pipeline/sanitizer/warnings.spec.ts`             | Warn-only functions (detect, don't fix)                  |
| `tests/unit/intl-pipeline/sanitizer/integration.spec.ts`          | End-to-end via `processMarkdownFile` / `processJsonFile` |
| `tests/unit/intl-pipeline/sanitizer/code-block-extractor.spec.ts` | The code-block split utility                             |

Run all sanitizer tests:

```bash
npx playwright test --project=unit tests/unit/intl-pipeline/sanitizer/
```

