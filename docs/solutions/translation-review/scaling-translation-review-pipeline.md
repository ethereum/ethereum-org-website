---
title: "Scaling the Translation Review Pipeline for 24-Language Deployment"
category: translation-review
component: "post_import_sanitize.ts, review-translations.md, claude-review-translations.yml"
symptoms:
  - "Manual review of single PR (1 of 13 parts) takes 1-2 hours per language"
  - "MDX syntax errors requiring manual fixes across translated content"
  - "Brand names and product names mistranslated in target languages"
  - "href attributes being translated when they should remain unchanged"
  - "Cross-script contamination (e.g., Devanagari characters in Turkish files)"
  - "Untranslated chunks requiring back-and-forth with Gemini for re-translation"
  - "Scale challenge: ~178 exploded PRs across 20+ languages blocking production deployment"
severity: high
date: 2026-02-21
tags:
  - translation-pipeline
  - i18n
  - crowdin-integration
  - gemini-2.5-pro
  - multilingual-deployment
  - mdx-content
  - sanitization
  - glossary-management
  - quality-assurance
  - batch-processing
related_prs:
  - 17182
  - 17176
  - 17247
  - 17242
  - 17227
  - 17224
  - 17219
  - 17218
  - 17210
  - 17209
  - 17199
  - 17198
  - 17186
  - 17166
  - 17164
  - 17132
  - 17127
  - 17126
  - 17125
  - 17122
  - 17105
  - 17101
languages_affected:
  - ar
  - bn
  - cs
  - de
  - fr
  - hi
  - id
  - it
  - ja
  - ko
  - mr
  - pl
  - pt-br
  - ru
  - sw
  - ta
  - te
  - tr
  - uk
  - ur
  - vi
  - zh-tw
---

# Scaling the Translation Review Pipeline for 24-Language Deployment

## Problem Summary

The ethereum.org website has been translated into 24 languages using Gemini 2.5 Pro via Crowdin. The translations were imported and placed into PRs -- both "unexploded" (1 PR per language, ~21 total) and "exploded" (13 parts per language, ~178 total). Manual review of a single exploded PR takes 1-2 hours, involving back-and-forth between Claude (review) and Gemini (re-translation), plus fixing MDX syntax errors, brand name mistranslations, href translations, cross-script contamination, and more. Extrapolating to all remaining PRs yields 178-356 hours of manual work.

This document captures the strategic brainstorm and agreed-upon approach for scaling this process.

## Root Cause Analysis

The review bottleneck stems from several compounding factors:

1. **Insufficient automated pre-screening** -- Issues like brand name mistranslations, broken MDX syntax, and Unicode contamination pass through to human review unnecessarily. The sanitizer catches many patterns but misses several known categories.
2. **Exploded PR strategy** -- Breaking one language PR into 13 parts multiplied the review surface without multiplying reviewer capacity.
3. **No knowledge persistence** -- Each review session starts from scratch; patterns discovered in one language are not reused for the next.
4. **No build-level verification** -- Translation issues that cause MDX compilation failures are only discovered late in the process.
5. **No automated bridge back to Gemini** -- When untranslated chunks are found, there is no automated way to re-submit them for translation and re-import results.

## Solution Architecture

### Phase 1: Foundation

#### 1a. Knowledge Base Setup

Establish a persistent, local-first knowledge base to accumulate findings across review sessions:

- `~/.claude/translation-review/known-patterns.md` -- seeded from Turkish compound doc findings; documents recurring issues by type
- `~/.claude/translation-review/per-language/` -- one file per locale capturing language-specific findings (common errors, glossary deviations, script quirks)
- `~/.claude/translation-review/fetch-translation-glossary.json` -- already exported; schema: `Array<{ string_term, translation_text, language_code, total_votes }>`

Initially local; later candidates for merging into the repo for full team access.

#### 1b. Enhance `post_import_sanitize.ts`

The current sanitizer already handles: header ID sync, href fixes (block-level set comparison), broken markdown links, frontmatter dates/quoting, guillemets, escaped backticks, block component line breaks, inline component normalization, brand name warnings, and unclosed backtick repair.

Additions required:

| Addition | Description |
|---|---|
| Brand name auto-fix | Expand `PROTECTED_BRAND_NAMES` list; switch from warn-only to auto-revert |
| Cross-script contamination detector | Unicode range validation per locale (e.g., catch Devanagari characters in Turkish `.md` files) |
| MDX `<` before numbers | Escape to `&lt;` outside code blocks to prevent MDX parse failures |
| Orphaned HTML tag cleanup | Detect and remove `</a>` (and similar) without matching opener |
| Frontmatter `tags` array protection | Prevent translation of programming language names and technical tags |
| Ticker symbol correction dictionary | Catch and fix transpositions: `EHT`->`ETH`, `BSL`->`BLS`, etc. |
| Href translation coverage audit | Verify the existing href fix catches all variants (e.g., `/governance` -> `/gobernanza`) |
| Language detection on content segments | Flag paragraphs detected as English in a non-English file |

#### 1c. Update `review-translations.md` Workflow Document

Modify the review workflow to:

- Read `~/.claude/translation-review/known-patterns.md` before deploying sub-agents
- Load language-specific glossary entries from the JSON file at review start
- Add MDX compilation check as a built-in review phase (not an afterthought)
- Encode sub-agent architecture with clear separation of concerns:
  - **MDX Syntax Agent** -- validates MDX structure, component usage, escaping
  - **Brand Name Agent** -- checks protected terms against glossary and known-patterns
  - **Href Validation Agent** -- verifies internal link translations are consistent with site routing
  - **Semantic Review Agent** -- spot-checks translation quality against glossary votes
  - **Build Verification Agent** -- runs `NEXT_PUBLIC_BUILD_LOCALES=en,{lang} pnpm build`
- Document the targeted build command: `NEXT_PUBLIC_BUILD_LOCALES=en,{lang} pnpm build`

### Phase 2: Validate on One Language

Czech (`cs`) is the pilot language because it has only 3 exploded parts remaining, plus unexploded PR #17247, making it the lowest-cost full-pipeline test.

Pipeline steps:

1. Run enhanced sanitizer with all new additions enabled
2. Run sub-agent review suite with `--fix` mode
3. Execute `NEXT_PUBLIC_BUILD_LOCALES=en,cs pnpm build`
4. Document all findings to `~/.claude/translation-review/per-language/cs.md`
5. Merge, close exploded PRs
6. Accumulate patterns back into `known-patterns.md`

Success criteria: clean build, no brand name regressions, glossary alignment confirmed.

### Phase 3: Scale to Remaining Languages

**Tier A -- Finish exploded PRs (3-4 parts remaining):**
- Czech (`cs`), Traditional Chinese (`zh-tw`), Ukrainian (`uk`), Telugu (`te`)
- Strategy: complete remaining exploded parts using the validated pipeline

**Tier B -- Partially done, switch to unexploded:**
- Bengali (`bn`), German (`de`), Marathi (`mr`), Polish (`pl`), Swahili (`sw`), Tamil (`ta`), Urdu (`ur`), Turkish (`tr`)
- Strategy: use single unexploded PR per language; apply full pipeline

**Tier C -- Full review, unexploded only:**
- Arabic (`ar`), French (`fr`), Hindi (`hi`), Indonesian (`id`), Italian (`it`), Japanese (`ja`), Korean (`ko`), Russian (`ru`), Vietnamese (`vi`), Brazilian Portuguese (`pt-br`)
- Strategy: direct unexploded pipeline with knowledge base pre-loaded

### Key Architectural Decisions

| Decision | Rationale |
|---|---|
| **Prefer unexploded PRs (1 per language)** | Exploded PRs multiply human review surface; 13 parts x 2 hrs = 26 hrs per language vs. ~3 hrs for unexploded |
| **Sub-agents split by concern, not file count** | Concern-based split allows each agent to specialize its detection logic; file-count split leads to uneven workloads and missed cross-file patterns |
| **Gemini translates, Claude reviews** | Keeps the pipeline conservative and avoids introducing new translation errors during review. No automated bridge for re-translation yet. |
| **Build verification uses locale isolation** | `NEXT_PUBLIC_BUILD_LOCALES=en,{lang}` avoids building all 60+ locales on every check |
| **Knowledge base starts local** | Avoids premature repo noise; once patterns stabilize across 3-4 languages, promote to repo for team visibility |
| **Czech as pilot** | Lowest risk (fewest remaining parts), sufficient complexity to stress-test the full pipeline before scaling to Tier C languages |
| **Ralph Loop plugin under consideration** | Would enable iterate-until-build-passes automation; deferred until pipeline is stable |

### Key Code Changes

**File: `src/scripts/i18n/post_import_sanitize.ts`**

- Expand `PROTECTED_BRAND_NAMES` constant with comprehensive brand terms list
- Change brand name handling from `console.warn` to auto-revert with logging
- Add `detectCrossScriptContamination(content, locale)` -- Unicode range validation per locale
- Add `escapeMdxAngleBrackets(content)` -- targets `< N` patterns outside fenced code blocks
- Add `removeOrphanedClosingTags(content)` -- regex-based orphan HTML tag detector
- Add `protectFrontmatterTags(translatedFm, englishFm)` -- freeze tags array against English source
- Add `TICKER_CORRECTIONS: Record<string, string>` dictionary and apply in sanitize pass
- Audit and extend `fixTranslatedHrefs()` to cover all edge cases

**File: `.claude/commands/review-translations.md`**

- Add knowledge base load step at top of workflow
- Add glossary injection step per language
- Restructure sub-agent section with the 5-agent breakdown
- Add build verification as mandatory final step with exact command

## Prevention Matrix

| Issue Category | Upstream Prevention | Automated Detection | Review-Level Detection | Long-term Fix |
|---|---|---|---|---|
| **Brand name mistranslation** | Crowdin glossary with "Do Not Translate" flag; explicit list in Gemini system prompt | Token-match against protected-terms allowlist; flag phonetic/semantic variants | LLM check: "Does this translation preserve all brand names exactly?" | Crowdin TM enforcement + MTQE threshold on brand-name segments |
| **Cross-script contamination** | Crowdin project setting: enforce target locale script; Gemini script constraint | Unicode block range check per file per locale | LLM check: "Does any portion contain characters from an incompatible script?" | Per-locale Unicode allowlist enforced at import time as a hard gate |
| **MDX syntax errors** | Crowdin HTML/MDX-aware segment protection; Gemini locked segment config | MDX AST parse post-import; regex for unmatched backtick parity, `<[0-9]`, unclosed HTML | LLM check: "Any raw `<` before numbers, unmatched backtick pairs, HTML outside code blocks?" | Mandatory `mdx-compile` step in post-import; quarantine failures |
| **Semantic inversions** | Crowdin glossary entries for antonym pairs with definitions; Gemini system prompt with mutually exclusive term list | Concordance check: if source has "proof-of-work" verify translation uses correct locale term, not antonym | LLM check: "Verify all consensus mechanism terms match source meaning. Inversion is a known failure mode." | Semantic consistency test corpus per locale |
| **Translated hrefs** | Crowdin: configure internal href paths as locked/non-translatable; Gemini system prompt: "Never translate URL paths" | Extract all `href` values, compare against source file href set; any divergence is a hard failure | LLM check: "Are all internal href values identical to the source?" | Href exact-match comparison as mandatory pre-merge CI check |
| **Translated frontmatter tags** | Crowdin: mark frontmatter `tags` as non-translatable | Parse frontmatter, compare tag arrays against source; flag any tag not in source set | LLM check: "Do frontmatter tags match the source exactly?" | Frontmatter schema validation with strict allowlists |
| **Ticker/acronym typos** | Crowdin glossary: ticker symbols as "Do Not Translate"; Gemini system prompt with explicit list | Levenshtein distance check: all uppercase tokens against canonical ticker list; flag distance <= 1 | LLM check: "Are all tickers and acronyms spelled exactly as in source?" | Canonical ticker allowlist validated in CI |
| **Domain typos** | Gemini system prompt: "The domain ethereum.org must never be altered"; Crowdin: lock URL segments | Regex: extract domain strings, assert exact match against `ethereum.org` | LLM check: "Any misspelling of ethereum.org?" | Regex validation in CI, zero tolerance |
| **Untranslated content chunks** | Crowdin MT coverage threshold; Gemini system prompt: "Every segment must be translated" | Paragraph-level language detection; flag English content in non-English files above threshold | LLM check: "Are there paragraphs that appear untranslated?" | Language detection as post-import gate; failed segments queued for re-translation |
| **Wrong technical term selection** | Crowdin glossary with preferred translations per locale for high-risk terms; Gemini prompt with locale-specific terminology reference | Concordance check: verify technical terms use glossary entries, not colloquial equivalents | LLM check is primary: "Check that technical terms use established Ethereum translations" | Per-locale Ethereum technical glossary maintained as versioned data file |

## Knowledge Compounding Strategy

### Session Memory (Per-Locale)

After each language review, findings are written to `~/.claude/translation-review/per-language/[locale].md`:

- Confirmed issues by category
- False positives to suppress in future reviews
- Glossary additions/corrections
- Systemic notes (e.g., "Crowdin TM appears contaminated from Hindi batch")

### Cross-Locale Aggregation

`~/.claude/translation-review/known-patterns.md` is maintained as a rolling aggregate that:

1. Captures patterns seen across multiple locales (e.g., brand name issues in 8+ languages = systemic upstream problem)
2. Records confirmed false-positive patterns to suppress
3. Provides the context injection block for review agents

### Inter-Agent Context Injection

Each review agent receives prior findings as context:

```
Known issues confirmed in prior reviews of this locale:
- "katillik" is a mistranslation of "Solidity" -- flag all occurrences
- Cross-script contamination from Devanagari was found -- check for recurrence

Cross-locale patterns seen in 5+ languages:
- DeFi is being translated as "MeFi" -- check this locale
- Internal hrefs are being translated -- perform href audit
```

This transforms each review from a cold start into an informed continuation.

## Pipeline Hardening Recommendations (Ordered by Impact)

1. **Mandatory MDX compile gate** -- Every file must pass MDX AST parse before entering review queue. Files that fail are quarantined immediately. Highest-leverage check: fully deterministic, zero ambiguity.

2. **Href exact-match validation** -- Extract all `href` attributes from source and translated files, compare sets. Any deviation is a hard failure. Zero false-positive risk.

3. **Unicode script range validation** -- Per-locale expected Unicode block range. Catches cross-script contamination with zero ambiguity.

4. **Canonical ticker fuzzy-match** -- Levenshtein distance <= 1 check on all uppercase tokens against canonical ticker list. Catches transpositions that human reviewers and LLMs miss under volume.

5. **Language detection on content segments** -- Paragraph-level language ID on translated files. English content in non-English files above threshold flags for re-translation queue.

6. **Domain string exact-match** -- Regex for `ethereum` + TLD-like pattern. Trivial to implement, catches trust/SEO issues.

7. **Frontmatter schema validation** -- Parse with gray-matter, validate fixed fields against source. Prevents programming language names from being localized in tags.

8. **Brand name token allowlist** -- Protected-terms list with auto-revert. Requires per-locale map for terms with accepted translations vs. always-English terms.

9. **Build verification in CI** -- `NEXT_PUBLIC_BUILD_LOCALES=en,{lang} pnpm build` as required PR check. Full build catches integration failures that segment-level checks miss.

10. **Findings persistence and context injection** -- Write structured findings after each review. Inject prior findings as context for subsequent reviews. Without this, each review starts cold.

## Open Problems

### Gemini Re-Translation Gap

When untranslated chunks are detected, there is no automated round-trip back to Gemini for completion. The current workflow requires manual intervention: extract the file, submit to Gemini with glossary context, receive output, re-import into the repo branch. A proper fix requires a re-translation queue and Gemini API integration outside the Crowdin workflow.

### Semantic Inversion Detection

Detecting swapped consensus mechanism terminology (PoW/PoS) requires knowing the correct translation of both terms in every target language. No universal automated approach exists. Partial solution: build term maps for critical antonym pairs during first review of each locale and persist them.

### Wrong Technical Term Selection at Scale

Distinguishing "client (software)" from "client (customer)" requires semantic context that regex/token checks cannot provide. LLM review is the only practical detector, but at 20+ languages, LLM review cost and latency are constraints.

### Crowdin Translation Memory Contamination

Cross-script contamination (Devanagari in Turkish) suggests Crowdin TM is pulling from wrong-locale segments. Root cause is unclear without Crowdin admin access. Downstream mitigations (Unicode range gate, Gemini script constraint) are in place, but the actual fix requires auditing TM isolation per locale.

### Ralph Loop Integration

The [Ralph Loop](https://claude.com/plugins/ralph-loop) Claude Code plugin enables iterative loops where Claude works on a task repeatedly until completion. It uses a stop hook to re-feed the prompt while preserving file modifications between iterations. This maps well to the "sanitize -> review -> fix -> verify -> repeat" cycle. However, integration with worktree isolation and the multi-model pipeline (Gemini for translation, Claude for review) needs validation before adoption at scale.

## Related Documentation

### Existing Compound Docs

| Document | Location | Status |
|---|---|---|
| Turkish (tr) Review - PR #17182 | `docs/solutions/translation-review/crowdin-import-review-turkish-pr-17182.md` | On `dev` branch |
| Vietnamese (vi) Review - PR #17176 | `docs/solutions/translation-review/crowdin-import-review-vietnamese-pr-17176.md` | On `i18n/import/2026-01-27T15-06-08-vi` branch only |

### Key Codebase Files

| File | Role |
|---|---|
| `src/scripts/i18n/post_import_sanitize.ts` | Deterministic post-import sanitizer |
| `.claude/commands/review-translations.md` | Claude Code review command |
| `.github/workflows/claude-review-translations.yml` | CI workflow for automated review |
| `src/scripts/i18n/main.ts` | Import pipeline orchestrator |
| `src/scripts/i18n/config.ts` | Pipeline configuration (languages, paths, API keys) |
| `.claude/commands/netlify-build-check.md` | Build status check and MDX error analysis |
| `src/intl/[locale]/glossary.json` | Per-locale glossary files |
| `src/scripts/i18n/lib/supabase/glossary.ts` | Supabase glossary client |

### Unexploded PRs (One Per Language)

| PR | Language | State |
|---|---|---|
| #17247 | Czech (cs) | Open |
| #17242 | Traditional Chinese (zh-tw) | Open |
| #17227 | Swahili (sw) | Open |
| #17224 | Marathi (mr) | Open |
| #17219 | Telugu (te) | Open |
| #17218 | Tamil (ta) | Open |
| #17210 | Ukrainian (uk) | Open |
| #17209 | Urdu (ur) | Open |
| #17199 | Polish (pl) | Open |
| #17198 | Italian (it) | Open |
| #17186 | Bengali (bn) | Open |
| #17176 | Vietnamese (vi) | Open |
| #17166 | Korean (ko) | Open |
| #17164 | German (de) | Open |
| #17132 | Japanese (ja) | Open |
| #17127 | Russian (ru) | Open |
| #17126 | Indonesian (id) | Open |
| #17125 | French (fr) | Open |
| #17122 | Brazilian Portuguese (pt-br) | Open |
| #17105 | Arabic (ar) | Open |
| #17101 | Hindi (hi) | Open |

### Cross-References

| Source | References | Nature |
|---|---|---|
| Turkish compound doc | `post_import_sanitize.ts` | Recommends adding brand name dictionary and cross-script detector |
| Turkish compound doc | `review-translations.md` | Command that ran the review |
| Turkish compound doc | Vietnamese PR #17176 companion doc | Same MDX error patterns |
| `review-translations.md` | `netlify-build-check.md` | Review command recommends running build check for MDX errors |
| `.github/workflows/claude-review-translations.yml` | `review-translations.md` | Workflow executes the command via `claude-code-action@v1` |
| `src/scripts/i18n/docs/v0.2.0-roadmap.md` | `lib/supabase/glossary.ts` | Roadmap plans Supabase glossary sync; file already exists |
