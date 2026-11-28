# Sanitizer

The post-import sanitizer normalizes translation outputs to fix Gemini-produced artifacts (BiDi mistakes, code-fence drift, brand-name mistranslations) and Crowdin-era residue. Source: `src/scripts/intl-pipeline/intl-sanitizer.ts`. Pattern catalog: `docs/solutions/integration-issues/sanitizer-test-research.md`. Tests: `tests/unit/intl-pipeline/sanitizer/`.

## When the sanitizer runs

- **Always** after Phase 4 (LLM translation) on each file+locale produced by the pipeline
- **On-demand** for targeted re-sanitization of existing locales — per-file only programmatically via `runSanitizer(filesWithContent)`; the only env-based scoping is per-language via `TARGET_LANGUAGES`
- **Per-file scope only** — never run across an entire language (hangs for 30+ min on thousands of files)

## Fix categories

Each fix function is one of:

| Category                              | Pattern                                                                 | Auto-correctable?                              |
| ------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------- |
| Brand-name mistranslations            | A known garbled brand form listed in `BRAND_GARBLE_CORRECTIONS`         | Only the listed garbles; no ETHGlossary lookup |
| Code-fence drift                      | Translator put translated text inside ` ```python ` blocks              | Yes (split content / restore code)             |
| Translated directive comments         | `// SPDX-License-Identifier: MIT` -> `// SPDX-लाइसेंस-पहचानकर्ता: MIT`  | Yes (`restoreDirectiveComments`, from English) |
| BiDi corruption                       | RTL languages: Latin tokens followed by punctuation flip direction      | Yes (wrap in `<span dir="ltr">`)               |
| Backslash escaping                    | Translator inserts backslash before closing HTML tag (`\</strong>`)     | Yes (strip the backslash)                      |
| Asymmetric backticks                  | `` `code`` `` (single-open, double-close) — exposes raw HTML/JSX to MDX | Yes (rebalance)                                |
| Backtick-wrapped markdown links       | `` `[text](/path)` `` — rendered as inline code instead of link         | Yes (strip backticks)                          |
| Orphaned closing tags                 | `</a>`, `</em>`, `</li>` without matching opener                        | Yes (strip the orphan)                         |
| Inner double quotes in JSX attribute  | `title="What is "X"?"` breaks attribute parsing                         | Yes (escape or downgrade to single quote)      |
| Junk text after heading anchors       | `{#section-id}translated-anchor-id` — Crowdin appended translated ID    | Yes (strip the junk)                           |
| Image path corruption                 | `./image.png` → `/.image.png`                                           | Yes (restore `./`)                             |
| Tilde range notation                  | `100~200` parsed as strikethrough by remark-gfm                         | Yes (convert to en-dash or `&#x7E;`)           |
| Translated GitHub `@username`         | `@axic` → `@kwaaxic`                                                    | Yes (revert)                                   |
| Crowdin `''text''` double apostrophes | Crowdin escaping artifact                                               | Yes (strip)                                    |
| Lorem ipsum placeholder               | Placeholder text left in translation                                    | No (flag as warning; manual review)            |
| Cross-script contamination            | Unexpected script characters (Devanagari in Turkish)                    | No (flag as warning; manual review)            |

The brand-count warning in `fixProtectedBrandNames` ("Protected brand X appears Nx in English but Mx in translation") runs only for Latin-script locales. Policy keeps brands Latin everywhere (known-patterns 113), but older non-Latin pages transliterate them: enabling it there on 2026-11-27 produced 7,985 warnings across 4,251 pages (3,185 on 1,556 pages without Ethereum, Bitcoin and Beacon Chain, which follow the glossary). Turn it on once a sweep has restored Latin names.

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
