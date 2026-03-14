---
title: "Japanese Translation Quality Scoring, Review & Fix Process — PR #17132"
date: 2026-02-24
category: translation-review
severity: medium
component: public/content/translations/ja
pipeline: review-translations-local
language: ja
pr_number: 17132
file_count_reviewed: 306
overall_quality_score: 4.89
final_commit: 0b2a385fd8
tags:
  - i18n
  - japanese
  - crowdin-import
  - quality-scoring
  - parallel-review-agents
  - escaped-bold
  - tag-regression
  - duplicate-headings
  - edge-cases
  - mdx-escaping
related_prs:
  - "#17132"
related_branches:
  - i18n/import/2026-01-21T17-37-56-ja
related_docs:
  - ./crowdin-import-review-japanese-pr-17132.md
  - ./crowdin-import-review-turkish-pr-17182.md
  - ../integration-issues/crowdin-import-review-agent-calibration.md
  - ../integration-issues/review-translations-permissions.md
symptoms:
  - "Escaped bold markers (\\*\\*text\\*\\*) in 49 files from Crowdin escaping"
  - "Tag regression スマート契約 instead of スマートコントラクト in 27 tutorial files"
  - "Duplicate/concatenated headings in 8 files (12 instances)"
  - "Critical data corruption: digit dropped in ethash constant (584685552 → 5846855552)"
  - "Critical mistranslation: オラクル → 神託 (oracle mistranslated as divine message)"
  - "Critical mistranslation: ゼロ知識ロールアップ → ゼロ知識糾合 (zk-rollup garbled)"
  - "Missing heading text: ## 。 instead of ## 関係者 in governance"
  - "Broken markdown link syntax in dart/index.md"
  - "Rude imperative form: パーティーに参加しろ instead of しよう"
root_causes:
  - "Crowdin automated escaping of markdown bold markers during translation"
  - "Crowdin translator regression on established terminology (smart contract)"
  - "Heading concatenation artifacts from Crowdin segment merging"
  - "Human translator errors on technical constants and specialized terms"
  - "Tone register mismatch in imperative translations"
metrics:
  scoring_dimensions: 5
  parallel_agents: 13
  chunk_size: 25
  files_with_fixes: 89
  insertions: 169
  deletions: 169
---

# Japanese Translation Quality Scoring, Review & Fix Process — PR #17132

## Context

After the initial sanitizer phase (documented in [crowdin-import-review-japanese-pr-17132.md](./crowdin-import-review-japanese-pr-17132.md)) which fixed structural/mechanical issues, a comprehensive quality scoring review was performed on all 306 Japanese translation files in PR #17132. This second phase focused on translation accuracy, terminology consistency, and content integrity.

## Approach: Parallel Agent Quality Scoring

### Architecture

All 306 files were divided into 25-file chunks and reviewed by 13 parallel sub-agents (chunks aa through am). Each agent scored files on 5 quality dimensions:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Completeness | 1.0 | No missing sections, paragraphs, or list items vs English source |
| MDX/HTML Integrity | 1.0 | All tags balanced, no broken markup, valid frontmatter |
| Brand Name Handling | 1.0 | Ethereum, Solidity, etc. preserved correctly (not transliterated) |
| Code Block Preservation | 1.0 | Code fences, inline code, and technical constants unchanged |
| Formatting Preservation | 1.0 | Heading levels, link syntax, list structure match source |

### Results

| Chunk | Files | Score |
|-------|-------|-------|
| aa | 1–25 | 4.84 |
| ab | 26–50 | 4.91 |
| ac | 51–75 | 4.91 |
| ad | 76–100 | 4.78 |
| ae | 101–125 | 4.92 |
| af | 126–150 | 4.97 |
| ag | 151–175 | 4.79 |
| ah | 176–200 | 4.80 |
| ai | 201–225 | 4.89 |
| aj | 226–250 | 4.90 |
| ak | 251–275 | 4.91 |
| al | 276–300 | 4.97 |
| am | 301–306 | 4.98 |
| **Overall** | **306** | **4.89/5.0** |

---

## Issues Found and Fixed

### Critical Issues (6)

These required immediate, targeted fixes:

1. **Ethash data corruption** — `public/content/translations/ja/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md`
   - `584685552` → `5846855552` (digit dropped from constant)
   - Impact: Incorrect technical specification data

2. **Oracle mistranslation** — `public/content/translations/ja/developers/docs/oracles/index.md` + `src/intl/ja/page-developers-docs.json`
   - `title: "神託"` → `title: "オラクル"` (page title)
   - `"docs-nav-oracles": "神託"` → `"docs-nav-oracles": "オラクル"` (nav label)
   - Impact: "Oracle" translated as "divine message" instead of using standard katakana loanword

3. **ZK-Rollup garbling** — `src/intl/ja/glossary.json`
   - `"zk-rollup-term": "ゼロ知識糾合"` → `"zk-rollup-term": "ゼロ知識ロールアップ"`
   - Impact: Established term replaced with meaningless kanji combination

4. **Missing heading text** — `public/content/translations/ja/governance/index.md`
   - `## 。 {#who-is-involved}` → `## 関係者 {#who-is-involved}`
   - Impact: Section heading was just a period

5. **Broken markdown link** — `public/content/translations/ja/developers/docs/programming-languages/dart/index.md`
   - `[darticulate.com](https://pub.dev/packages/ethereumのEthereum 5.0.0)` → `[darticulate.comのEthereum 5.0.0](https://pub.dev/packages/ethereum)`
   - Impact: URL contained Japanese text, link text and URL were swapped

6. **MEV-Boost description** — Traced to English source, not a translation bug. Noted but not fixed in translation.

### Systematic Issues

#### Escaped Bold (49 files)

Crowdin escaped markdown bold markers during translation:

```markdown
<!-- Before (Crowdin output) -->
\*\*イーサリアム\*\* は分散型プラットフォームです

<!-- After (fixed) -->
**イーサリアム** は分散型プラットフォームです
```

Pattern: `\*\*text\*\*` → `**text**` across 49 files.

#### Tag Regression: Smart Contract (27 tutorial files)

Crowdin reverted the established term back to a literal translation:

```markdown
<!-- Before (regression) -->
スマート契約をデプロイする

<!-- After (restored) -->
スマートコントラクトをデプロイする
```

Pattern: `スマート契約` → `スマートコントラクト` in 27 tutorial files.

#### Duplicate/Concatenated Headings (8 files, 12 instances)

Crowdin segment merging produced concatenated headings:

```markdown
<!-- Before -->
## デザイン原則とは 貢献の方法 {#ways-to-contribute}

<!-- After -->
## デザイン原則とは {#ways-to-contribute}
```

Note: The anchor ID `{#ways-to-contribute}` not matching heading text `デザイン原則とは` is inherited from the English source — **not a translation bug**.

### Notable Individual Issues (7 files)

| File | Issue | Fix |
|------|-------|-----|
| `src/intl/ja/page-roadmap.json` | Duplicated sentence + typo `このになります` | Removed dupe, fixed → `ことになります` |
| `src/intl/ja/page-layer-2.json` | Garbled `複イーサリアムクライアント` | Fixed → `複数のイーサリアムクライアント` |
| `src/intl/ja/page-10-year-anniversary.json` | Rude imperative `パーティーに参加しろ` (2x) | Fixed → `パーティーに参加しよう` |
| `public/.../whitepaper/index.md` | `または` in code fence (should be English) | Restored → `or` |
| `src/intl/ja/page-community-events.json` | `ハッカソン画像` (extra word) | Fixed → `ハッカソン` |
| `public/.../run-node-raspberry-pi/index.md` | `ベス` (transliterated brand) | Restored → `Besu` |
| `public/.../how-to-mint-an-nft/index.md` | `\&lt;10分で` | Fixed → `\<10分で` (MDX-safe) |

---

## Edge Cases and False Positives

### Critical Learning: Intentional `\*\*` in EVM Opcodes

The fix agent changed `\*\*` to `**` in `evm/opcodes/index.md`. However, this file uses `\*\*` **intentionally** for exponentiation notation in markdown tables:

```markdown
| 0x0A | EXP | 指数関数 | a b → a \*\* b |
```

Here `\*\*` represents the exponentiation operator `2**256`, escaped to prevent markdown bold rendering inside the table. **This change was reverted.**

**Lesson:** Not all `\*\*` patterns are Crowdin escaping artifacts. In tables with mathematical notation, they represent literal asterisks for operators.

### Critical Learning: MDX `\<` Escaping

The English source uses `\<10 minutes` to prevent MDX from interpreting `<10` as an HTML tag. The correct Japanese equivalent is `\<10分で`, not `<10分で` (bare angle bracket) or `\&lt;10分で` (HTML entity).

**Lesson:** When English source uses `\<`, the translation must preserve this MDX escape pattern.

### Critical Learning: Heading Anchor Inheritance

Some headings have anchor IDs that don't match their translated text:

```markdown
## デザイン原則とは {#ways-to-contribute}
```

This looks wrong (the heading says "What are design principles?" but the anchor says "ways-to-contribute"). However, this mismatch is inherited from the English source file. **Do not "fix" anchor IDs — they are stable identifiers used in external links.**

### Not a Translation Bug: Lorem Ipsum in page-trillion-dollar-security

The `page-trillion-dollar-security` content contains lorem ipsum placeholder text. This matches the English source — it's intentional placeholder content, not a translation error.

---

## Prevention Strategies

### 1. Escaped Bold Pattern Filter

Add to the sanitizer to automatically fix the most common Crowdin artifact:

```typescript
function fixEscapedBold(content: string): string {
  // Skip code blocks
  const codeBlockRegex = /```[\s\S]*?```|`[^`]+`/g;
  const codeBlocks: Array<{ start: number; end: number }> = [];
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    codeBlocks.push({ start: match.index, end: match.index + match[0].length });
  }

  return content.replace(/\\\*\\\*(.+?)\\\*\\\*/g, (m, inner, offset) => {
    // Don't fix inside code blocks
    if (codeBlocks.some(b => offset >= b.start && offset < b.end)) return m;
    // Don't fix in markdown tables (likely math operators)
    const lineStart = content.lastIndexOf('\n', offset) + 1;
    const line = content.slice(lineStart, content.indexOf('\n', offset));
    if (line.trimStart().startsWith('|')) return m;
    return `**${inner}**`;
  });
}
```

Key guard: **Skip markdown table rows** to avoid the EVM opcodes false positive.

### 2. Terminology Regression Checklist

Maintain a per-language protected terms list:

```yaml
# ja-protected-terms.yaml
terms:
  - source: "smart contract"
    correct: "スマートコントラクト"
    incorrect: ["スマート契約", "賢い契約"]
  - source: "oracle"
    correct: "オラクル"
    incorrect: ["神託", "託宣"]
  - source: "zero-knowledge rollup"
    correct: "ゼロ知識ロールアップ"
    incorrect: ["ゼロ知識糾合"]
  - source: "proof of stake"
    correct: "プルーフ・オブ・ステーク"
    incorrect: ["ブルーフ・オブ・ステーク"]
```

### 3. Technical Constant Validation

For files containing numeric constants (ethash parameters, gas costs, etc.), compare all numbers in the translation against the English source. Flag any that differ.

### 4. Quality Scoring as Gate

Use the 5-dimension scoring (completeness, MDX integrity, brand names, code blocks, formatting) as a CI gate. Any file scoring below 4.0 on any dimension gets flagged for human review.

### 5. Review Checklist for Future Japanese Imports

Before committing:

- [ ] Search for `\*\*` — fix in prose, **skip in tables**
- [ ] Search for `スマート契約` — should be `スマートコントラクト`
- [ ] Search for `神託` — should be `オラクル`
- [ ] Search for `糾合` — likely garbled `ロールアップ`
- [ ] Search for `ブルーフ` — should be `プルーフ`
- [ ] Verify numeric constants in ethash, gas, and EVM pages against English source
- [ ] Check heading anchors — mismatches with text are OK if inherited from English
- [ ] Check `\<` patterns — preserve MDX escaping from English source
- [ ] Check tone — `しろ` (rude imperative) should be `しよう` (friendly volitional)

---

## Commit Summary

**Commit `0b2a385fd8`** on branch `i18n/import/2026-01-21T17-37-56-ja`:

- 89 files changed
- 169 insertions, 169 deletions
- Categories: 6 critical fixes, 49 escaped bold, 27 tag regressions, 12 duplicate heading fixes, 7 notable individual fixes, 1 revert (evm/opcodes)

---

## Related Documentation

- [Japanese Translation Import Review (Sanitizer Phase)](./crowdin-import-review-japanese-pr-17132.md) — Phase 1: sanitizer bugs and structural fixes
- [Turkish PR #17182 Review](./crowdin-import-review-turkish-pr-17182.md) — First review establishing baseline issue catalog
- [Review Agent Calibration (Czech)](../integration-issues/crowdin-import-review-agent-calibration.md) — False positive calibration learnings
- [Review Translations Permissions](../integration-issues/review-translations-permissions.md) — Pipeline sandbox permissions
- [Ethereum.org Translation Program](https://ethereum.org/en/contributing/translation-program/) — Upstream translation program docs
