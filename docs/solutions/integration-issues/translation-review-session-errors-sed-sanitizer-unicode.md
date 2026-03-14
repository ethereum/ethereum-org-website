---
title: "Russian Translation Review: Sanitizer Bugs and Unicode Handling Failures (PR #17127)"
description: "Four distinct errors encountered during Russian translation review: sed zeroing out glossary.json, sanitizer removing needed blank lines, sanitizer escaping angle brackets inside backtick code spans, and Edit tool failures on non-breaking spaces."
problem_type: integration-issues
component: i18n/sanitizer
tags:
  - translation-review
  - sanitizer
  - sed
  - unicode
  - json-corruption
  - blank-lines
  - code-spans
  - non-breaking-space
severity: high
date_discovered: 2026-02-27
pr_context: "#17127"
language: ru
affected_files:
  - src/intl/ru/glossary.json
  - public/content/translations/ru/dao/index.md
  - public/content/translations/ru/developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md
related_docs:
  - docs/solutions/build-errors/crowdin-translation-sanitizer-mdx-fence-bugs.md
  - docs/solutions/integration-issues/post-import-sanitizer-bugs-found-japanese-review.md
  - docs/solutions/integration-issues/sanitizer-test-research.md
  - docs/solutions/integration-issues/crowdin-french-import-review-pr-17125.md
---

## Summary

Four distinct failure modes encountered during the Russian translation review (PR #17127):

1. `sed -i` zeroed out `glossary.json` due to unreliable Unicode matching
2. Sanitizer collapsed intentional blank lines between headers and paragraphs
3. Sanitizer incorrectly escaped `<` to `&lt;` inside backtick code spans
4. Edit tool failed on strings containing non-breaking spaces (U+00A0)

## Error 1: sed Zeroed Out glossary.json

**Symptom:** `src/intl/ru/glossary.json` became 0 bytes after a sed command.

**Root cause:** `sed -i` with hex-escaped UTF-8 bytes (`\xc2\xa0` for non-breaking space U+00A0) failed to match the actual file content. On this failure, `sed -i` produced an empty file -- silently, with no error exit code.

**Command that caused it:**
```bash
# DO NOT USE -- this zeroed out the file
sed -i 's/\xd0\xbf\xd0\xbb\xd0\xb0\xd1\x82\xd0\xb2\xc2\xa0/\xd0\xbf\xd0\xbb\xd0\xb0\xd1\x82\xd0\xb0\xc2\xa0/' src/intl/ru/glossary.json
```

**Solution:** Use Python for Unicode-safe text replacement:
```python
data = open('file.json', 'rb').read()
fixed = data.replace('old_text'.encode(), 'new_text'.encode(), 1)
open('file.json', 'wb').write(fixed)
```

**Recovery:** Restored from git history:
```bash
git show fe932af13f:src/intl/ru/glossary.json > src/intl/ru/glossary.json
```

## Error 2: Sanitizer Removes Needed Blank Lines (dao/index.md)

**Symptom:** The sanitizer's blank line restoration logic removed a manually-added blank line between a header and the following paragraph, collapsing:

```markdown
#### Known Example {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) -- holders can delegate...
```

into:

```markdown
#### Known Example {#governance-example}[ENS](https://claim.ens.domains/delegate-ranking) -- holders can delegate...
```

**Root cause:** The sanitizer syncs blank lines to match the English source without accounting for manual review fixes that intentionally differ from the English structure.

**Solution:** Reverted the sanitizer's change:
```bash
git checkout HEAD -- public/content/translations/ru/dao/index.md
```

**Fix needed:** The sanitizer must preserve blank lines immediately following heading lines. A blank line after `#`/`##`/`###` is conventional CommonMark and must not be removed.

## Error 3: Sanitizer Escapes `<` Inside Backticks (patricia-merkle-trie)

**Symptom:** In `patricia-merkle-trie/index.md`, the sanitizer replaced `<` with `&lt;` inside inline backtick code spans:

- `` `<01>` `` became `` `&lt;01>` ``
- `` `keccak256(<6661e9...>)` `` became `` `keccak256(&lt;6661e9...>)` ``

**Root cause:** The sanitizer's angle bracket escaping logic does not check whether `<` is inside a backtick code span or fenced code block. Content inside backticks is literal code and must not be HTML-escaped.

**Fix needed:** The sanitizer must tokenize the document into code regions (backtick spans, fenced blocks) and prose regions, then apply HTML entity escaping only to prose regions.

## Error 4: Edit Tool Unicode Matching Failure

**Symptom:** Multiple attempts to use the Edit tool on glossary.json failed with "String to replace not found" even though the string appeared to match in Read output.

**Root cause:** The file contained a non-breaking space (U+00A0, bytes `C2 A0`) before the em-dash. This character is visually identical to a regular space (U+0020) in terminal output, but the Edit tool does exact byte matching.

**Diagnosis method:**
```bash
sed -n '235p' src/intl/ru/glossary.json | xxd | head -20
# Look for C2 A0 bytes (U+00A0 non-breaking space)
```

**Solution:** Use Python with explicit byte handling:
```python
data = open('file.json', 'rb').read()
fixed = data.replace(b'\xc2\xa0', b' ', 1)  # or targeted replacement
open('file.json', 'wb').write(fixed)
```

## Prevention Rules

1. **NEVER use `sed -i` on files with complex Unicode content.** Use Python.
2. **Always verify file size after modification:** `wc -c file`
3. **Always validate JSON after modification:** `python3 -c "import json; json.load(open('file'))"`
4. **Always inspect `git diff --stat` before committing** -- catches zero-byte truncation.
5. **When Edit tool fails with "string not found"**, use `xxd` to inspect for invisible Unicode characters.

## Test Cases Needed

These should be added to `tests/unit/sanitizer/`:

### 1. Inline backtick code spans -- angle brackets NOT escaped

```
Input:  Use `<Component>` in JSX.
Expected:  Use `<Component>` in JSX.
Must NOT produce:  Use `&lt;Component&gt;` in JSX.
```

### 2. Fenced code blocks -- angle brackets NOT escaped

Angle brackets inside fenced code blocks must be preserved verbatim.

### 3. Prose context -- angle brackets ARE escaped

```
Input:  Values less than <10 are rejected.
Expected:  Values less than &lt;10 are rejected.
```

### 4. Blank lines after headers are preserved

```
Input:
## Getting Started

Install the dependencies first.

Expected: identical to input (blank line preserved).
```

### 5. Sanitizer idempotency

Run the sanitizer twice on the same file. Output of pass 2 must equal output of pass 1.

## Automation Suggestions

### Pre-commit: No zero-byte translation files

```bash
find src/intl/ -name "*.json" -empty -exec echo "ERROR: Empty file: {}" \; -exec false \;
```

### CI: All JSON translation files parse correctly

```bash
for f in $(find src/intl/ -name "*.json"); do
  python3 -c "import json; json.load(open('$f', encoding='utf-8'))" || exit 1
done
```
