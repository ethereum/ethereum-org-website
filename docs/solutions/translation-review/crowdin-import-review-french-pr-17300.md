---
title: "Crowdin Import Review: French (fr) - PR #17300"
category: translation-review
language: fr
pr: 17300
severity: critical
date: 2026-02-20
tags: [crowdin, i18n, french, mdx, build-failure]
files_reviewed: 25
files_fixed: 1
---

# Crowdin Import Translation Review: French (fr) - PR #17300

## Problem Summary

Netlify build failed on `/fr/ai-agents` due to a stray backslash (`\`) before a closing `</strong>` tag in the French translation of `ai-agents/index.md`. The backslash escaped the `/`, causing MDX to interpret `</strong>` as literal text rather than a closing tag.

## Import Metadata

| Field               | Value                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| **PR**              | [#17300](https://github.com/ethereum/ethereum-org-website/pull/17300) |
| **Branch**          | `i18n/import/2026-01-20T15-45-34-fr-part-01`                         |
| **Language**        | French (fr)                                                           |
| **Import Date**     | 2026-01-20                                                            |
| **Review Date**     | 2026-02-20                                                            |
| **Total Files**     | 25                                                                    |
| **Critical Issues** | 1                                                                     |

## Critical Issue

### Backslash Escaping Closing Tag in MDX (`ai-agents/index.md`)

**File**: `public/content/translations/fr/ai-agents/index.md` (line 67)

**Symptom**: Netlify build error:

```
Unexpected closing tag `</p>`, expected corresponding closing tag for `<strong>` (47:21-47:29)
```

**Cause**: A `\` character before the `/` in `</strong>` prevented MDX from recognizing the closing tag:

```html
<!-- Broken -->
<p className="mt-0"><strong>Bon à savoir\</strong></p>

<!-- Fixed -->
<p className="mt-0"><strong>Bon à savoir</strong></p>
```

**Root Cause**: Crowdin translation tooling or a translator inserted a backslash before the forward slash. In MDX, `\` is an escape character, so `\</strong>` becomes literal text `</strong>` rather than a closing HTML tag. MDX then sees `<strong>` opened but never closed, and the next `</p>` triggers the error.

**Fix**: Removed the single `\` character.

## Key Pitfall

### Backslash Before Closing Tags is a New MDX Failure Pattern

This is distinct from previously documented MDX errors (missing backticks, orphaned tags, raw `<` characters). The backslash escape pattern is subtle because:

1. The tag *looks* correctly formed at a glance — `<strong>Bon à savoir\</strong>` reads fine
2. The build error points to `</p>`, not `</strong>`, making the root cause non-obvious
3. The `\` may originate from Crowdin's escaping rules for special characters in HTML contexts

**Detection**: Search translated MDX files for `\</` — this pattern should never appear in valid MDX:

```bash
grep -r '\\</' public/content/translations/
```

**Prevention**: Consider adding `\</` detection to `src/scripts/i18n/post_import_sanitize.ts` as a new sanitization rule.

## Related Files

- **Sanitizer**: `src/scripts/i18n/post_import_sanitize.ts`
- **Review Command**: `.claude/commands/review-translations.md`
