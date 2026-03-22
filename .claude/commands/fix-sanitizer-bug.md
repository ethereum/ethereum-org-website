---
description: Guided workflow for fixing translation sanitizer bugs — triage, test, fix, verify
allowed-tools: Bash, Read, Glob, Grep, Task, Edit, Write, AskUserQuestion
argument-hint: [--language=CODE] [--issue="description"] [--file=PATH] [--skip-build]
---

# Fix Sanitizer Bug

Iterative workflow for fixing bugs in the post-import translation sanitizer (`src/scripts/i18n/post_import_sanitize.ts`). Follows a test-first approach: triage the issue, write a failing test, implement the fix, verify across languages.

## Context
- Current branch: !`git branch --show-current`
- Arguments: $ARGUMENTS
- Sanitizer: `src/scripts/i18n/post_import_sanitize.ts`
- Test files: `tests/unit/sanitizer/*.spec.ts`
- Research docs: `docs/solutions/integration-issues/`

## Phase 0: Gather Context

### Parse Flags

Extract from $ARGUMENTS:
- `LANGUAGE`: from `--language=CODE` (e.g., `ja`, `zh-tw`, `es`)
- `ISSUE_DESC`: from `--issue="..."` (brief description of the bug)
- `FILE_PATH`: from `--file=PATH` (specific file where issue was spotted)
- `SKIP_BUILD`: from `--skip-build` (skip build verification)

### Collect Information

If flags are missing, use AskUserQuestion to gather:

1. **What language?** — Which locale has the issue (e.g., `ja`, `tr`, `zh-tw`)
2. **What's the artifact?** — Exact text of the translation bug (copy-paste the broken string)
3. **Where?** — File path or general area (markdown content, JSON translations, frontmatter)
4. **English source?** — What does the correct English look like

Read the affected file and the English source to confirm the issue:
```
Translated: {FILE_PATH}
English:    {ENGLISH_EQUIVALENT_PATH}
```

**IMPORTANT:** Capture the exact broken pattern NOW before any processing. Copy the raw artifact verbatim — you'll need it for the test.

## Phase 1: Document the Problem

Append the new pattern to the research doc:

**File:** `docs/solutions/integration-issues/sanitizer-test-research.md`

Add a row to the "New Patterns" table:

```markdown
| N+1 | {PATTERN_DESCRIPTION} | {SOURCE_PR_OR_REVIEW} | `{EXACT_EXAMPLE}` | {SEVERITY} |
```

Severity guide:
- **Critical** — Breaks rendering, navigation, or MDX compilation
- **High** — Breaks links, images, or loses content
- **Medium** — Wrong text displayed, semantic errors
- **Low** — Cosmetic, formatting-only

## Phase 2: Triage — Fix, Warn, or Document Only

This is the most important decision. Use AskUserQuestion:

**"What type of fix does this need?"**

### Option A: Deterministic Fix (auto-correct)
Use when the pattern is:
- Regex-matchable with no false positives
- The correct output is always the same (no judgment needed)
- Safe to apply across all languages

Examples: escaped bold `\*\*text\*\*`, ticker typos `EHT→ETH`, date format `DD/MM/YYYY→YYYY-MM-DD`

→ Proceed to Phase 3A (write fix function + test)

### Option B: Warning Only (detect + report)
Use when:
- The pattern is detectable but the fix requires context/judgment
- Auto-fixing could cause collateral damage (see Bug #1: href substitution)
- Different files may need different resolutions

Examples: translated hrefs, missing brand names, code fence drift

→ Proceed to Phase 3B (write warn function + test)

### Option C: Document Only (not automatable)
Use when:
- The issue is semantic (wrong word choice, not a pattern)
- No reliable regex can detect it
- It needs human/AI review judgment

Examples: "Gas" → "Sprit" (gasoline) in German, tone inconsistency

→ Skip to Phase 6 (update docs only)

## Phase 3A: Write Failing Test (Fix Function)

### Determine which test file

- Pure function (no English source needed) → `tests/unit/sanitizer/standalone-fixes.spec.ts`
- Needs English comparison → `tests/unit/sanitizer/english-comparison.spec.ts`
- End-to-end through processMarkdownFile/processJsonFile → `tests/unit/sanitizer/integration.spec.ts`

### Write the test FIRST

Add a `test.describe` block for the new function. Include at minimum:

```typescript
test.describe("fixNewIssue", () => {
  test("fixes the broken pattern", () => {
    const input = "{EXACT_BROKEN_PATTERN_FROM_PHASE_0}"
    const { content, fixCount } = fixNewIssue(input)
    expect(content).toBe("{EXPECTED_CORRECT_OUTPUT}")
    expect(fixCount).toBe(1)
  })

  test("leaves correct content unchanged", () => {
    const input = "{ALREADY_CORRECT_CONTENT}"
    const { content, fixCount } = fixNewIssue(input)
    expect(content).toBe(input)
    expect(fixCount).toBe(0)
  })

  test("skips code blocks", () => {
    // If the fix operates on prose, it MUST skip code blocks
    const input = "```\n{PATTERN_INSIDE_CODE}\n```"
    const { content, fixCount } = fixNewIssue(input)
    expect(content).toBe(input)
    expect(fixCount).toBe(0)
  })
})
```

### Add import to test file

Add the new function name to the destructured import from `_testOnly` at the top of the test file.

### Verify test fails

```bash
npx playwright test --project=unit tests/unit/sanitizer/{FILE}.spec.ts
```

The new test MUST fail (function doesn't exist yet). Existing tests should still pass.

## Phase 3B: Write Failing Test (Warn Function)

Same as 3A but assert warnings instead of content changes:

```typescript
test.describe("warnNewIssue", () => {
  test("warns on broken pattern", () => {
    const warnings = warnNewIssue("{BROKEN_INPUT}", "{ENGLISH_INPUT}")
    expect(warnings.length).toBeGreaterThan(0)
    expect(warnings[0]).toContain("{EXPECTED_WARNING_SUBSTRING}")
  })

  test("no warning on clean content", () => {
    const warnings = warnNewIssue("{CLEAN_INPUT}", "{ENGLISH_INPUT}")
    expect(warnings).toHaveLength(0)
  })
})
```

Use `tests/unit/sanitizer/warnings.spec.ts` for warn-only functions.

## Phase 4: Implement the Fix

### Write the function in the sanitizer

**File:** `src/scripts/i18n/post_import_sanitize.ts`

**For fix functions** — follow the established pattern:

```typescript
function fixNewIssue(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // MANDATORY: Split to preserve code blocks
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Your fix logic here
    parts[i] = parts[i].replace(/{PATTERN}/g, () => {
      fixCount++
      return "{REPLACEMENT}"
    })
  }

  return { content: parts.join(""), fixCount }
}
```

**Critical rules:**
- ALWAYS split on code blocks first (fenced + inline)
- ALWAYS return `{ content, fixCount }` for fix functions
- ALWAYS return `string[]` for warn functions
- Use word boundaries `\b` for brand names to avoid partial matches
- Use `escapeRegex()` when building regex from dynamic strings

### Add to _testOnly export

Add the function name to the `_testOnly` export object near the bottom of the file.

### Wire into processMarkdownFile or processJsonFile

Add the function call using the `applyFix` helper pattern:

```typescript
applyFix(
  () => fixNewIssue(content),
  (n) => `Fixed ${n} new issues`
)
```

**Placement matters:** Consider whether the fix should run before or after existing fixes. Some fixes depend on others having run first.

For warn functions, add directly:
```typescript
const newWarnings = warnNewIssue(content, englishMd)
issues.push(...newWarnings)
```

## Phase 5: Run Tests and Verify

### Step 1: Unit tests

```bash
npx playwright test --project=unit tests/unit/sanitizer/
```

**All tests must pass** — both the new test and all existing 99+ tests.

If a test fails:
- New test fails → fix the implementation, not the test
- Existing test fails → your fix has a regression, investigate the interaction

### Step 2: Run sanitizer against ONLY the affected files

**CRITICAL: NEVER run the sanitizer against an entire language. It processes thousands of files and will hang for 30+ minutes. Always scope to the specific files from the PR.**

Determine which files to test from the PR context (e.g., `gaming/index.md`). Then run the sanitizer with `TARGET_FILES` to scope it to just those files:

```bash
# If TARGET_FILES env var is supported:
TARGET_FILES="public/content/translations/{LANGUAGE}/{PAGE_PATH}" \
  npx ts-node -O '{"module":"commonjs"}' ./src/scripts/i18n/post_import_sanitize.ts

# If not, write a quick inline node script that calls processMarkdownFile directly:
node -e '
const { _testOnly } = require("./src/scripts/i18n/post_import_sanitize");
const fs = require("fs");
const file = "public/content/translations/{LANGUAGE}/{PAGE_PATH}";
const content = fs.readFileSync(file, "utf8");
const result = _testOnly.processMarkdownFile(file, content);
console.log(result.issues.join("\n"));
if (result.fixed) fs.writeFileSync(file, result.content);
'
```

Check the output for:
- Your fix being applied (look for the issue label in the log)
- No unexpected fixes in other areas
- Fix count looks reasonable (not 0, not thousands)

### Step 3: Inspect the actual changes

```bash
git diff public/content/translations/{LANGUAGE}/{PAGE_PATH}
```

Verify:
- The broken pattern is corrected
- No collateral damage to surrounding content
- Changes look correct to a human reader

### Step 4: Build verification (conditional)

**Only run this if the fix touches MDX syntax** — angle brackets, tags, components, backticks.

**Skip if** `--skip-build` flag is set, or fix is purely textual (ticker corrections, brand tags, date normalization, guillemets, bold/italic escaping).

```bash
NEXT_PUBLIC_BUILD_LOCALES=en,{LANGUAGE} pnpm build
```

**NOTE:** This step requires `dangerouslyDisableSandbox: true` and significant RAM. Only use when the fix could affect MDX compilation.

### Step 5: Cross-language spot check on the SAME file only

Test the same page in 2-3 other languages to check for false positives. **NEVER run across all files for a language.**

```bash
# Test the same page path in a few other languages
for lang in es tr ja; do
  node -e "
    const { _testOnly } = require('./src/scripts/i18n/post_import_sanitize');
    const fs = require('fs');
    const file = 'public/content/translations/$lang/{PAGE_PATH}';
    if (!fs.existsSync(file)) { console.log('$lang: file not found, skipping'); process.exit(0); }
    const content = fs.readFileSync(file, 'utf8');
    const result = _testOnly.processMarkdownFile(file, content);
    console.log('$lang:', result.issues.length ? result.issues.join('; ') : 'clean');
  "
done
```

Check that your fix doesn't trigger unexpectedly in other languages.

## Phase 6: If Not Resolved

If the fix doesn't resolve the issue after Phase 5:

### Diagnose the root cause

Use AskUserQuestion:

**"What went wrong?"**

1. **Pattern mismatch** — regex doesn't match the real-world variant
   - Get more examples of the broken pattern
   - Broaden the regex
   - Add another test case for the variant
   - Go back to Phase 4

2. **Interaction effect** — another fix runs first and changes content
   - Identify which fix runs first and transforms the input
   - Reorder the fix in `processMarkdownFile` (earlier or later)
   - Add an interaction test in `integration.spec.ts`
   - Go back to Phase 4

3. **False positives in other languages** — fix breaks something elsewhere
   - Add language-specific exclusions
   - Add a cross-language test case
   - Consider making it warn-only instead
   - Go back to Phase 3

4. **Not actually automatable** — needs more context than regex can provide
   - Convert to warn function or document-only
   - Go back to Phase 2 and re-triage

## Phase 7: Update Documentation

### Update research doc

**File:** `docs/solutions/integration-issues/sanitizer-test-research.md`

If the pattern was new (not already in the table), ensure it was added in Phase 1.

If the fix worked, move the pattern from "New Patterns Not Yet Covered" to "Patterns Already Handled by Sanitizer" with the function name.

### Update existing bug docs if relevant

Check if this relates to previously documented bugs:
- `docs/solutions/integration-issues/post-import-sanitizer-bugs-found-japanese-review.md`

### Report summary

Display to user:
```
## Fix Complete

**Issue:** {ISSUE_DESCRIPTION}
**Type:** {fix | warn | document-only}
**Function:** {FUNCTION_NAME}
**Test file:** {TEST_FILE}
**Tests:** {N} new tests added, {TOTAL} total passing
**Languages verified:** {LANGUAGES_CHECKED}
**Files changed:**
  - src/scripts/i18n/post_import_sanitize.ts (fix + export)
  - tests/unit/sanitizer/{FILE}.spec.ts (new tests)
  - docs/solutions/integration-issues/sanitizer-test-research.md (documentation)
```

## Quick Reference

### Run all sanitizer tests
```bash
npx playwright test --project=unit tests/unit/sanitizer/
```

### Run sanitizer against a language
```bash
TARGET_LANGUAGES=ja npx ts-node -O '{"module":"commonjs"}' ./src/scripts/i18n/post_import_sanitize.ts
```

### Key files
| File | Purpose |
|------|---------|
| `src/scripts/i18n/post_import_sanitize.ts` | Sanitizer source (~2100 lines) |
| `tests/unit/sanitizer/standalone-fixes.spec.ts` | Tests for pure functions |
| `tests/unit/sanitizer/english-comparison.spec.ts` | Tests needing English source |
| `tests/unit/sanitizer/warnings.spec.ts` | Tests for warn-only functions |
| `tests/unit/sanitizer/integration.spec.ts` | End-to-end tests |
| `docs/solutions/integration-issues/sanitizer-test-research.md` | Pattern catalog |

### Code block awareness pattern
Every text transformation MUST use this split pattern:
```typescript
const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
const parts = content.split(codeBlockPattern)
for (let i = 0; i < parts.length; i++) {
  if (i % 2 === 1) continue // Skip code blocks
  // Transform parts[i] only
}
```

### Function signature conventions
- **Fix functions:** `(content: string) => { content: string; fixCount: number }`
- **Fix w/ English:** `(translated: string, english: string) => { content: string; fixCount: number }`
- **Warn functions:** `(content: string, ...) => string[]`
