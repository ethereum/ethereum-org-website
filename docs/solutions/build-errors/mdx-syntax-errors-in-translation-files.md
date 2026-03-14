---
title: MDX Compilation Error in Hindi Translation - Nested Quotes in JSX Attributes
date: 2026-02-11
problem_type: build_error
severity: high
components:
  - MDX compilation
  - Hindi translations
  - Crowdin import
  - Content pipeline
tags:
  - mdx
  - i18n
  - hindi
  - devanagari
  - unicode
  - translation-import
  - build-failure
  - jsx-attributes
  - quote-escaping
related_issues: []
environment:
  file: public/content/translations/hi/roadmap/merge/index.md
  branch: i18n/import/2026-01-16T15-55-59-hi
  error_code: U+0964
  error_char: "।"
symptoms:
  - "Unexpected character `।` (U+0964) in attribute name"
  - Netlify build blocked
  - Four failed automated fix attempts
  - MDX parser unable to process Hindi content
impact: Blocks Hindi translation deployment and Netlify builds
---

# MDX Compilation Error in Hindi Translation - Nested Quotes in JSX Attributes

## Problem Symptom

MDX parsing was failing during the Netlify build process with a misleading error message:

```
[Error: [next-mdx-remote] error compiling MDX:
Unexpected character `।` (U+0964) in attribute name, expected an attribute name
character such as letters, digits, `,` or `_`; `=` to initialize a value;
whitespace before attributes; or the end of the tag
```

**Affected file:** `public/content/translations/hi/roadmap/merge/index.md`
**Affected lines:** 139, 148, 158, 169
**Build impact:** Complete build failure on Netlify, blocking Hindi translation deployment

The error message incorrectly suggested the Hindi punctuation character `।` (Devanagari Danda, U+0964) was the problem, leading to four failed fix attempts.

## Investigation Steps

### What Didn't Work (4 Failed Attempts)

**Attempt 1 (Commit 2e132a3e32):**
- Fixed ONE instance of nested quotes (line 122-123)
- Left three other identical issues unfixed (lines 139, 148, 158, 169)
- Claimed to "resolve all 19 Netlify build failures" but didn't
- **Result:** Build still failed

**Attempt 2 (Commit 7c57be7c1c):**
- Moved `।` character outside markdown link
- Misunderstood the error - focused on the punctuation character
- Didn't address the actual quote nesting issue
- **Result:** Build still failed

**Attempt 3 (Commit 456392d490):**
- Fixed legitimate issues in `ethereum-forks/index.md` (malformed closing tags)
- Didn't touch `roadmap/merge/index.md` at all
- **Result:** Build still failed

**Attempt 4:** (Not committed)
- Various attempts focusing on the Hindi character itself
- **Result:** Build still failed

### What Led to the Solution

1. Examined the actual JSX structure on the failing lines
2. Recognized the pattern: all four errors had `title="text with "nested quotes""`
3. Understood that MDX parser was closing the attribute prematurely at the first inner quote
4. Realized the Hindi punctuation was a red herring - it appeared after where the parser got confused

## Root Cause

**The issue was nested double quotes in JSX attributes, NOT the Hindi punctuation character.**

The MDX parser misinterpreted the structure:

```jsx
<ExpandableCard
title="गलतफहमी: "The Merge गैस शुल्क कम करने में विफल रहा।""
contentPreview="गलत। The Merge सहमति तंत्र का एक बदलाव था...">
```

**How the parser interpreted it:**

1. Attribute starts: `title="`
2. Attribute ends prematurely at: `गलतफहमी: "`
3. Parser expects another attribute name
4. Encounters: `The` then `Merge` then `गैस` then `शुल्क` then `कम` then `करने` then `में` then `विफल` then `रहा` then `।`
5. **Error:** "Unexpected character `।`" because parser is in "expecting attribute name" state

The Devanagari Danda `।` became the scapegoat simply because it appeared where the parser was looking for an attribute name after the premature quote closure.

## Solution

**Change outer quotes to single quotes when the attribute value contains double quotes.**

### Code Fix

**Before (Broken):**
```jsx
<ExpandableCard
title="गलतफहमी: "The Merge गैस शुल्क कम करने में विफल रहा।""
contentPreview="गलत। The Merge सहमति तंत्र का एक बदलाव था...">
```

**After (Fixed):**
```jsx
<ExpandableCard
title='गलतफहमी: "The Merge गैस शुल्क कम करने में विफल रहा।"'
contentPreview="गलत। The Merge सहमति तंत्र का एक बदलाव था...">
```

### All Fixed Instances

**Line 139:**
```jsx
title='गलतफहमी: "The Merge गैस शुल्क कम करने में विफल रहा।"'
```

**Line 148:**
```jsx
title='गलतफहमी: "The Merge द्वारा लेनदेन में काफी तेजी लाई गई।"'
```

**Line 158:**
```jsx
title='गलतफहमी: "The Merge ने स्टेकिंग निकासी को सक्षम किया।"'
```

**Line 169:**
```jsx
title='गलतफहमी: "अब जब The Merge पूरा हो गया है, और निकासी सक्षम हो गई है, तो सभी स्टेकर एक साथ बाहर निकल सकते हैं।"'
```

### Key Principle

In JSX/MDX, when an attribute value contains the same quote character used to delimit the attribute, **switch the outer delimiter to the opposite quote type**. This is standard JSX syntax - the Hindi content was perfectly valid, only the quote pairing was incorrect.

## Related Issues and Documentation

### Similar Past Issues

**1. Angle Bracket Escaping Fix (Commit 76675a5717)**
- **Issue:** MDX compilation errors in 18 translated versions caused by angle brackets outside backticks
- **Pattern:** Similar translation-introduced MDX syntax errors
- **Lesson:** LLM translations don't understand MDX's JSX-aware parsing

**2. Brand Name Translation Fixes (Commits 22604c15d8, 29250ee83f)**
- **Issue:** Brand names incorrectly translated instead of staying in English
- **Pattern:** LLM translation quality issues in Hindi and Indonesian

### Related Workflows

**`/review-translations` command:**
- Comprehensive translation import review workflow
- Checks brand name preservation, technical term validation
- Recommends running `/netlify-build-check` for MDX syntax errors

**`.github/workflows/crowdin-ci.yml`:**
- Automated workflow for Crowdin translation imports
- Currently doesn't validate MDX syntax before creating PRs

### Documentation Gaps

This is the **first formal documentation** of:
- Quote escaping issues in translated MDX JSX attributes
- Systematic approach to fixing build-blocking translation syntax errors
- The misleading nature of MDX error messages with non-ASCII characters

## Prevention Strategies

### 1. Pre-Translation MDX Syntax Validation

Implement a Crowdin-compatible MDX validator that runs before content is sent to translators:

- Check for nested quotes in JSX attributes
- Verify properly closed HTML tags
- Validate block-level HTML separation from content
- Ensure valid JSX fragment syntax
- Validate component names match actual imports

**Action:** Create pre-commit hook or CI check that validates all English source `.md` files against MDX compilation rules.

### 2. Crowdin Translation Constraints

Add technical constraints to Crowdin configuration:

- Lock JSX/MDX syntax from translation
- Use placeholder protection for HTML tags and attributes
- Implement custom quality checks in Crowdin that flag:
  - Unmatched HTML tags
  - Nested quotes in attributes
  - Missing blank lines after closing tags

**Action:** Update `/src/scripts/crowdin/` tooling to enforce syntax preservation rules.

### 3. Post-Translation Automated Sanitization

Enhance the import pipeline to include:

- Automatic MDX syntax correction for common LLM translation errors
- Quote normalization in JSX attributes
- Blank line insertion after block-level HTML tags
- Component name validation against whitelist

**Action:** Create `/src/scripts/crowdin/sanitize-mdx.ts` that runs automatically after translation import and before commit.

### 4. Language-Specific Validation Rules

Non-English characters require special handling:

- Devanagari (Hindi), Chinese, Arabic, and other non-Latin scripts can introduce unexpected byte sequences
- Implement character encoding validation for JSX attributes

**Action:** Add character encoding checks to `/src/scripts/markdownChecker.ts` that validate JSX attributes containing non-ASCII text.

## Testing Recommendations

### 1. Build-Time MDX Compilation Tests

Currently missing automated tests that compile MDX files before deployment.

**Implement:**
```typescript
// tests/unit/mdx-compilation.test.ts
describe("MDX Compilation", () => {
  it("should compile all translated markdown files", async () => {
    const languages = await getTranslatedMarkdownPaths()
    for (const lang in languages) {
      for (const mdPath of languages[lang]) {
        const markdown = fs.readFileSync(mdPath, "utf-8")
        await expect(compile({ markdown, slugArray: [], locale: lang }))
          .resolves.not.toThrow()
      }
    }
  })
})
```

### 2. Pre-Merge CI Validation

Add to `.github/workflows/crowdin-ci.yml`:

```yaml
- name: Validate MDX syntax in translations
  run: pnpm test:mdx-validation

- name: Build test with imported translations
  run: NEXT_PUBLIC_BUILD_LOCALES=en,hi pnpm build
```

This would catch syntax errors before PR merge.

### 3. Crowdin Webhook Validation

Set up a Crowdin webhook that triggers validation when translations are marked "Reviewed" - provides immediate feedback to translators instead of waiting for monthly import.

### 4. Storybook MDX Preview

Extend Storybook stories to include translated content samples. Run Chromatic visual tests on stories with Hindi/Chinese/Arabic MDX content.

## Process Improvements

### 1. Translator Guidelines Enhancement

Add "Technical Syntax Preservation" section to translator's guide:
- Visual examples of correct vs. incorrect JSX attribute handling
- "Common MDX Errors" reference with language-specific issues
- Case study of this four-attempt failure and eventual solution

### 2. Automated Fix Suggestions

Build AI-powered MDX fixer that:
- Detects common LLM translation errors
- Suggests fixes with confidence scores
- Optionally auto-applies high-confidence fixes

**Action:** Create `/src/scripts/crowdin/auto-fix-mdx.ts` using regex patterns from failed fix attempts.

### 3. Reduced Translation Scope for Complex MDX

Don't translate files with heavy MDX/JSX usage:
- Identify markdown files with >10 JSX components
- Mark as "translation-restricted" in Crowdin
- Translate prose only, lock syntax

### 4. Incremental Translation Imports

Switch from monthly bulk imports to **weekly language-specific imports**:
- Easier to identify which language introduced errors
- Faster feedback to translators
- Reduces blast radius of LLM-introduced syntax errors

**Action:** Modify `postLangPRs.ts` to support triggered imports per language.

### 5. Feedback Loop to Translation Vendors

Share anonymized Hindi translation errors with Crowdin as training data. Request that their AI translation engines are trained to preserve MDX/JSX syntax.

## Key Takeaways

1. **Error messages can be misleading** - The Hindi punctuation wasn't the problem, just where the parser gave up
2. **Pattern recognition is crucial** - All four instances had the same nested quote structure
3. **LLM translations introduce systematic syntax errors** - Need validation at three checkpoints: before translation, during translation, and after translation
4. **Build validation should happen in CI** - Don't wait for Netlify to catch these errors
5. **Standard JSX rules apply in MDX** - Quote escaping works the same way as React components

## Related Files

- `public/content/translations/hi/roadmap/merge/index.md` - Fixed file
- `src/scripts/crowdin-import.ts` - Translation import pipeline
- `src/scripts/markdownChecker.ts` - Markdown validation (needs MDX enhancement)
- `.github/workflows/crowdin-ci.yml` - CI workflow (needs MDX validation step)
