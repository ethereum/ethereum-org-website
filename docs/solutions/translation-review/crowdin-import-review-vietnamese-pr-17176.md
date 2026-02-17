---
title: "Crowdin Import Review: Vietnamese (vi) - PR #17176"
category: translation-review
language: vi
pr: 17176
severity: critical
date: 2026-02-17
tags: [crowdin, i18n, vietnamese, mdx, translation-quality]
quality_score: 7.2
files_reviewed: 277
files_fixed: 33
---

# Crowdin Import Translation Review: Vietnamese (vi) - PR #17176

## Problem Summary

Automated Crowdin translation import for Vietnamese introduced critical translation errors, terminology inconsistencies, and MDX syntax breakage across 277 files. The import required multi-phase review, fix application, and iterative build verification before the PR could pass Netlify deployment.

## Import Metadata

| Field | Value |
|-------|-------|
| **PR** | [#17176](https://github.com/ethereum/ethereum-org-website/pull/17176) |
| **Branch** | `i18n/import/2026-01-27T15-06-08-vi` |
| **Language** | Vietnamese (vi) |
| **Import Date** | 2026-01-27 |
| **Review Date** | 2026-02-17 |
| **Total Files** | 277 (markdown + JSON) |
| **Quality Score** | 7.2/10 |
| **Critical Issues** | 37 |
| **Warnings** | 124 |

## Review Architecture

Five parallel review agents were deployed, each assigned to a distinct file group:

| Agent | Scope | Files | Score |
|-------|-------|-------|-------|
| Core Pages | Roadmap, staking, bridges, wallets, community | ~40 | ~7.5/10 |
| Dev Docs | developers/docs/* | ~60 | ~7.8/10 |
| Tutorials | developers/tutorials/* + remaining | ~80 | ~6.5/10 |
| JSON Batch A | First half of src/intl/vi/*.json | ~23 | ~7.0/10 |
| JSON Batch B | Second half of src/intl/vi/*.json | ~23 | ~7.0/10 |

**Pitfall encountered**: JSON review agents hit Opus context limits. Solution: split JSON files into two batches of ~23 files each, and use Sonnet model for large batches if needed.

## Critical Issues Found

### 1. EVM Terminology Error (32 occurrences across 15 files)

**The Issue**: "Ethereum Virtual Machine" was translated as "Máy chủ ảo Ethereum" (Ethereum Virtual Server) instead of "Máy ảo Ethereum" (Ethereum Virtual Machine). The term "máy chủ ảo" literally means "virtual server" (VPS), fundamentally misrepresenting what the EVM is.

**Context-Dependent Ambiguity**: The `run-a-node/index.md` file legitimately uses "máy chủ ảo" to refer to actual Virtual Private Servers (VPS) for node hosting. This file was intentionally **skipped** during the fix to preserve correct VPS references.

**Files affected**: 14 files fixed (26 changes total), including:
- `developers/docs/evm/index.md` — Title, description, and body (3 case variants)
- `developers/docs/apis/json-rpc/index.md` — 5 occurrences
- `developers/docs/consensus-mechanisms/pow/mining/index.md` — 7 occurrences
- `developers/docs/smart-contracts/languages/index.md` — 4 occurrences
- `src/intl/vi/glossary.json` — Also fixed a typo variant "Mãy chủ Ảo"

**Fix applied**: Three case variants replaced across all files:
- "Máy chủ ảo" -> "Máy ảo"
- "máy chủ ảo" -> "máy ảo"
- "Máy chủ Ảo" -> "Máy Ảo"

### 2. DAO Terminology Error

"Decentralized Autonomous Organization" had "autonomous" translated as "ẩn danh" (anonymous) instead of "tự trị" (autonomous). This changes the fundamental meaning of DAOs.

### 3. Historical Fact Error

Ethereum genesis date rendered as "July 3, 2015" instead of the correct "July 30, 2015" in `page-10-year-anniversary.json`.

### 4. Semantic Inversion

"more decentralized" translated as "tập trung hơn" (more centralized) — the exact opposite meaning. Critical for blockchain messaging.

### 5. Energy Reduction Statistic

The Merge energy savings stated as "~95.95%" instead of "~99.95%" — a significant understatement.

### 6. Node Terminology

"nốt" (musical note) used instead of "nút" (node) in glossary and multiple markdown files. Corrected to match community glossary (`vi-glossary-terms.json`).

### 7. Brand Name Typos

"Etherum" and "Etherem" variants found — corrected to "Ethereum".

## MDX Syntax Errors (7 files)

After applying translation fixes, the Netlify build failed on 7 pages. Each was diagnosed by comparing against English source files.

### Error 1: `creating-a-wagmi-ui-for-your-contract/index.md`
- **Symptom**: "Unexpected closing slash `/` in tag"
- **Cause**: Misplaced backtick in JSX fragment example
- **Broken**: `` (`<> ...` </>`) ``
- **Fixed**: `` (`<> ... </>`) ``

### Error 2: `erc-721-vyper-annotated-code/index.md`
- **Symptom**: "`<tên>` tag" parsed as JSX
- **Cause**: Double backtick leaving Vietnamese word exposed
- **Broken**: `` `self.<tên biến>`` ``
- **Fixed**: `` `self.<tên biến>` ``

### Error 3: `erc20-annotated-code/index.md`
- **Symptom**: "Unexpected character `0`"
- **Cause**: Raw `<` before version number
- **Broken**: `**<0.8.0**`
- **Fixed**: `**&lt;0.8.0**`

### Error 4: `short-abi/index.md`
- **Symptom**: "Unexpected character `,`"
- **Cause**: Missing closing backtick on opcode syntax line
- **Fixed**: Added closing backtick

### Error 5: `ethereum-forks/index.md`
- **Symptom**: "`<CHAINID>` tag" + orphaned `</em>` tags
- **Cause**: Multiple issues — bare angle brackets and missing opening `<em>` tags
- **Fixes**:
  - `<CHAINID>` -> `<code>CHAINID</code>`
  - Added missing `<em>` opening tags on 4 list items (lines 449, 505, 506, 511)
- **Pitfall**: First error (`<CHAINID>`) terminated MDX parsing, hiding the `</em>` errors. Required a second build cycle to reveal them.

### Error 6: `restaking/index.md`
- **Symptom**: "Extra `</a>`"
- **Cause**: Duplicate closing anchor tag from sentence restructuring
- **Broken**: `Consensus</a>. </a>`
- **Fixed**: `Consensus.</a>`

### Error 7: `zero-knowledge-proofs/index.md`
- **Symptom**: AlertTitle rendering failure
- **Cause**: Content indentation mismatch in MDX component
- **Fixed**: Realigned AlertTitle content to match English source structure

## Key Pitfalls & Lessons Learned

### 1. Cascading MDX Errors
MDX parser terminates on the first error per file, hiding subsequent errors. The `ethereum-forks/index.md` file had 5 errors but only the first was visible until fixed. **Budget 2-4 rebuild cycles per file with MDX errors.**

### 2. Context-Dependent Terminology (VPS vs EVM)
Vietnamese "máy chủ ảo" legitimately means "virtual server" in node-hosting contexts but was incorrectly used for "virtual machine" (EVM) elsewhere. **Always check surrounding context before bulk-replacing terminology.**

### 3. Community Glossary Authority
The `vi-glossary-terms.json` file in the main repo root contains community-approved translations. When AI judgment conflicts with the glossary, **always defer to the glossary** — it represents native-speaker consensus.

### 4. JSON Agent Context Overflow
Large JSON translation files (46+ files at once) exceeded Opus model context limits. **Split JSON reviews into batches of ~20-25 files**, or use Sonnet model for JSON-heavy batches.

## Fix Progression Timeline

1. **2026-02-13**: Automated sanitizer run on vi translations (41 files)
2. **2026-02-17 13:24**: Critical translation errors fixed (26 files, 60 insertions/60 deletions)
3. **2026-02-17 13:40**: MDX syntax errors resolved (7 files, 12 insertions/11 deletions)
4. **2026-02-17**: Build verification passed

## Community Glossary Reference

Key terms from `vi-glossary-terms.json` used during review:

| English | Vietnamese (Glossary) |
|---------|-----------------------|
| dapps | các ứng dụng phi tập trung |
| proof-of-stake | bằng chứng cổ phần |
| validator | trình xác thực |
| node | nút |
| staking | đặt cọc |
| rollup | cuộn |
| smart contract | hợp đồng thông minh |
| blockchain | chuỗi khối |

## Prevention Recommendations

1. **Enhance `post_import_sanitize.ts`** to detect EVM terminology variants per language
2. **Add MDX pre-validation** to the import pipeline before PR creation
3. **Enforce brand name protection** in Crowdin glossary settings
4. **Run character-set validation** to catch cross-script contamination early
5. **Document VPS/EVM ambiguity** in Vietnamese translation guidelines for future translators

## Related Files

- **Sanitizer**: `src/scripts/i18n/post_import_sanitize.ts`
- **Review Command**: `.claude/commands/review-translations.md`
- **Community Glossary**: `vi-glossary-terms.json` (repo root)
- **CI Workflow**: `.github/workflows/claude-review-translations.yml`
