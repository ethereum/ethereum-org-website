---
title: "Translation href Sync Issues - Links Corrupted During Crowdin Translation"
date: "2026-02-17"
category: "integration-issues"
tags:
  - translation
  - i18n
  - crowdin
  - link-integrity
  - glossary
  - html-structure
  - json-translations
component: "src/intl/ translation JSON files"
severity: "high"
symptoms:
  - "Glossary links rendering as plain text instead of clickable anchors"
  - "Crowdin numbered placeholders (<0>, <1>) appearing in rendered content"
  - "Links pointing to wrong glossary entries"
  - "Duplicate nested <a> tags causing malformed HTML"
  - "Extra links present in translations that don't exist in English"
---

# Translation href Sync Issues

## Problem

Translation PRs imported from Crowdin frequently contain corrupted `<a href="...">` tags in JSON translation files (`src/intl/{locale}/*.json`). The canonical English JSON files embed HTML links inside translation string values (e.g., `<a href="/glossary/#validator">validator</a>`). Translators on Crowdin introduce five categories of errors:

1. **Placeholder substitution**: `<a href="/glossary/#defi">DeFi</a>` becomes `<0>DeFi</0>` (Crowdin numbered placeholder)
2. **Link removal**: `<a href="/glossary/#key">keys</a>` becomes plain text `khoa`
3. **Wrong targets**: `<a href="/glossary/#node">Node</a>` becomes `<a href="/glossary/#validator">tuy chon</a>`
4. **Nested/duplicate tags**: `<a href="..."><a href="...">text</a>`
5. **Extra links added**: Links present in translation but absent in English canonical

## First Occurrence

PR #17176 (Vietnamese translations) - 13 href issues across 4 files:
- `src/intl/vi/page-roadmap.json` (6 issues)
- `src/intl/vi/page-staking.json` (6 issues)
- `src/intl/vi/glossary-tooltip.json` (1 issue)
- `src/intl/vi/glossary.json` (1 issue)

## Investigation

### Step 1: Identify changed files
```bash
git diff dev --name-only -- 'src/intl/vi/**/*.json'
```

### Step 2: Automated comparison script
For each changed JSON file, flatten the JSON, extract all `href="..."` values from both the English (`src/intl/en/`) and translated versions, and compare using symmetric set difference:

```python
import json, re, os

def extract_urls(value):
    return re.findall(r'href="([^"]*)"', value)

def flatten(data, prefix=''):
    items = {}
    if isinstance(data, dict):
        for k, v in data.items():
            nk = f'{prefix}.{k}' if prefix else k
            if isinstance(v, (dict, list)):
                items.update(flatten(v, nk))
            elif isinstance(v, str):
                items[nk] = v
    elif isinstance(data, list):
        for i, v in enumerate(data):
            nk = f'{prefix}[{i}]'
            if isinstance(v, (dict, list)):
                items.update(flatten(v, nk))
            elif isinstance(v, str):
                items[nk] = v
    return items

# For each file, compare EN vs translated href sets per key
# Also check for: nested <a> tags, Crowdin placeholders (<0>, <1>)
```

### Step 3: Cross-check patterns
- Nested anchors: `re.search(r'<a [^>]*><a [^>]*>', value)`
- Crowdin placeholders where EN has real links: `re.search(r'<\d+>', vi_value)` when `re.search(r'<a href=', en_value)` is true

## Root Cause

1. **Crowdin editor behavior**: When translators restructure sentences, Crowdin converts `<a href="...">` tags into numbered placeholders (`<0>`, `<1>`) automatically
2. **Translator misunderstanding**: Translators don't realize HTML href values must remain unchanged
3. **Copy-paste errors**: Manual editing creates duplicate/nested anchor tags
4. **No JSON href validation**: The post-import sanitizer (`src/scripts/i18n/post_import_sanitize.ts`) validates hrefs in Markdown files but performs zero href checking on JSON translation values

## Solution

For each affected key:

1. Read the English canonical value from `src/intl/en/[file].json`
2. Read the translated value from `src/intl/{locale}/[file].json`
3. Restore the exact `<a href="...">` structure from English while keeping translated display text
4. Remove any extra links not present in English
5. Fix nested `<a>` tags by removing duplicates

### Example fix

**English** (`page-staking.json`):
```json
"page-staking-section-comparison-pools-rewards-li3": "Liquidity tokens can be held in your own wallet, used in <a href=\"/glossary/#defi\">DeFi</a> and sold..."
```

**Vietnamese BEFORE** (link removed):
```json
"page-staking-section-comparison-pools-rewards-li3": "Token thanh khoản được lưu trữ trong ví riêng của bạn, được sử dụng trong DeFi và bán đi..."
```

**Vietnamese AFTER** (link restored):
```json
"page-staking-section-comparison-pools-rewards-li3": "Token thanh khoản được lưu trữ trong ví riêng của bạn, được sử dụng trong <a href=\"/glossary/#defi\">DeFi</a> và bán đi..."
```

## Prevention

### Priority 1: Extend the sanitizer for JSON href validation

The post-import sanitizer at `src/scripts/i18n/post_import_sanitize.ts` already has robust href validation for Markdown (`fixTranslatedHrefs`, lines 232-401). The `processJsonFile` function (lines 1273-1306) only does BOM normalization, smart quote replacement, and JSON parse validation. It performs zero href checking.

Add a `validateJsonHrefs` step to `processJsonFile` that:
- Loads the corresponding English JSON file
- Extracts `href="..."` values from both EN and translated strings per key
- Flags missing, extra, wrong, nested, or placeholder hrefs
- Auto-fixes unambiguous cases (single mismatch per key)

### Priority 2: CI validation gate

Add a GitHub Actions check on PRs touching `src/intl/` that fails when href count mismatches, Crowdin placeholders, or nested anchors are detected. This should be a required status check on `dev` branch protection.

### Priority 3: Crowdin configuration

- Set JSON files to treat `<a href="...">` as protected tag pairs
- Enable built-in "Tags mismatch" and "Broken URLs" QA checks
- Add custom placeholder patterns for `href="[^"]*"` as non-editable tokens

### Priority 4: Reviewer checklist

When reviewing any PR touching `src/intl/`:
- [ ] Anchor tag count parity per JSON key (EN vs translated)
- [ ] No Crowdin numbered placeholders in output
- [ ] No nested `<a>` tags
- [ ] All `href="..."` values unchanged from English
- [ ] No extra or missing links vs English

## Related Files

- `src/scripts/i18n/post_import_sanitize.ts` - Post-import sanitizer (needs JSON href support)
- `src/scripts/i18n/lib/workflows/sanitization.ts` - Sanitization workflow runner
- `.claude/commands/review-translations.md` - Translation review slash command
- `.github/workflows/claude-review-translations.yml` - CI translation review workflow
- `docs/header-ids.md` - Related: header IDs must also not be translated
- `docs/solutions/translation-review/crowdin-import-review-vietnamese-pr-17176.md` - Full PR #17176 review post-mortem
